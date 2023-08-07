import { useState } from 'react';
/**
 * Google sheet URL example:
 * https://docs.google.com/spreadsheets/d/1GEU4rCZoDK-6oev5DMvBQrYK3U9RPtgH36elxRYKoMM/edit#gid=1832526413
 */

// TODO:(developer): Set to client ID and API key from the Developer Console
const CLIENT_ID =
	'84466830408-54j3q58872a6h127r9je6qd5266jqqj5.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDZyi1CV8Q0zgPWr5bzv4-uDWZVL-trvF8';

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC =
	'https://sheets.googleapis.com/$discovery/rest?version=v4';

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly';

export const Admin = ({ setScheduleData }) => {
	const [gSheetUrl, setGsheetUrl] = useState('');

	/**
	 * Callback after api.js is loaded.
	 */
	function handleClientLoad() {
		window.gapi.load('client:auth2', initClient);
	}

	function initClient() {
		window.gapi.client
			.init({
				apiKey: API_KEY,
				clientId: CLIENT_ID,
				scope: SCOPES,
				discoveryDocs: [
					'https://sheets.googleapis.com/$discovery/rest?version=v4',
				],
			})
			.then(function () {
				window.gapi.auth2
					.getAuthInstance()
					.isSignedIn.listen(updateSignInStatus);
				updateSignInStatus(
					window.gapi.auth2.getAuthInstance().isSignedIn.get()
				);
			});
	}

	function updateSignInStatus(isSignedIn) {
		if (isSignedIn) {
			getAllSheets();
		}
	}

	function handleSignInClick(event) {
		window.gapi.auth2.getAuthInstance().signIn();
	}

	/**
	 *  Sign out the user upon button click.
	 */
	function handleSignoutClick(event) {
		window.gapi.auth2.getAuthInstance().signOut();
	}

	async function getAllSheets() {
		let response;
		try {
			response = await window.gapi.client.sheets.spreadsheets.get({
				spreadsheetId: gSheetUrl.split('/')[5],
				ranges: [
					'January!A1:S40',
					'February!A1:S40',
					'March!A1:S40',
					'April!A1:S40',
					'May!A1:S40',
					'June!A1:S40',
					'July!A1:S40',
					'August!A1:S40',
					'September!A1:S40',
					'October!A1:S40',
					'November!A1:S40',
					'December!A1:S40',
				],
				includeGridData: true,
			});
		} catch (err) {
			console.warn(err.message);
			return;
		}
		const range = response.result;
		if (!range || !range.valueRanges || range.valueRanges.length === 0) {
			console.warn('No values found.');
			return;
		}
		console.log(range);
		// setScheduleData(range.valueRanges);
	}

	const handleSubmit = ev => {
		ev.preventDefault();
		handleClientLoad();
	};

	return (
		<div style={{ padding: '1rem' }}>
			<form onSubmit={handleSubmit}>
				<label htmlFor='gSheetUrl'>Enter Google Sheet URL </label>
				<input
					type='url'
					name='gSheetUrl'
					onChange={ev => setGsheetUrl(ev.target.value)}
				/>
				<button type='submit'>Submit</button>
			</form>
			<div id='authorize_button'>
				<p>Authorize Access to Google Sheets</p>
				<button onClick={handleSignInClick}>Authorize</button>
			</div>

			<button id='signout_button' onClick={handleSignoutClick}>
				Sign Out
			</button>
		</div>
	);
};
