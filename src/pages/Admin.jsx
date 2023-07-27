import { useState } from 'react';
/**
 * Google sheet URL example:
 * https://docs.google.com/spreadsheets/d/1GEU4rCZoDK-6oev5DMvBQrYK3U9RPtgH36elxRYKoMM/edit#gid=1832526413
 */

// TODO(developer): Set to client ID and API key from the Developer Console
const CLIENT_ID =
	'84466830408-54j3q58872a6h127r9je6qd5266jqqj5.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDZyi1CV8Q0zgPWr5bzv4-uDWZVL-trvF8';

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC =
	'https://sheets.googleapis.com/$discovery/rest?version=v4';

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly';

let tokenClient;

export const Admin = ({ setScheduleData }) => {
	const [gSheetUrl, setGsheetUrl] = useState('');
	const [sheetId, setSheetId] = useState('');
	const [gapiInited, setGapiInited] = useState(false);
	const [gisInited, setGisInited] = useState(false);
	const [isSignedIn, setIsSigned] = useState(false);

	/**
	 * Callback after api.js is loaded.
	 */
	function gapiLoaded() {
		window.gapi.load('client', initializeGapiClient);
	}

	/**
	 * Callback after the API client is loaded. Loads the
	 * discovery doc to initialize the API.
	 */
	async function initializeGapiClient() {
		await window.gapi.client.init({
			apiKey: API_KEY,
			discoveryDocs: [DISCOVERY_DOC],
		});
		setGapiInited(true);
	}

	/**
	 * Callback after Google Identity Services are loaded.
	 */
	function gisLoaded() {
		tokenClient = window.google.accounts.oauth2.initTokenClient({
			client_id: CLIENT_ID,
			scope: SCOPES,
			callback: '', // defined later
		});
		setGisInited(true);
	}

	/**
	 *  Sign in the user upon button click.
	 */
	function handleAuthClick() {
		tokenClient.callback = async resp => {
			if (resp.error !== undefined) {
				throw resp;
			}
			setIsSigned(true);
			document.getElementById('authorize_button').style.visibility = 'hidden';
			await getScheduleData();
		};

		if (window.gapi.client.getToken() === null) {
			// Prompt the user to select a Google Account and ask for consent to share their data
			// when establishing a new session.
			tokenClient.requestAccessToken({ prompt: 'consent' });
		} else {
			// Skip display of account chooser and consent dialog for an existing session.
			tokenClient.requestAccessToken({ prompt: '' });
		}
	}

	/**
	 *  Sign out the user upon button click.
	 */
	function handleSignoutClick() {
		const token = window.gapi.client.getToken();
		if (token !== null) {
			window.google.accounts.oauth2.revoke(token.access_token);
			window.gapi.client.setToken('');
			setGapiInited(false);
			setGisInited(false);
			document.getElementById('authorize_button').innerText = 'Authorize';
			document.getElementById('signout_button').style.visibility = 'hidden';
		}
	}

	/**
	 * Print the names and majors of students in a sample spreadsheet:
	 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
	 */
	async function getScheduleData() {
		let response;
		try {
			// Fetch first 10 files
			response = await window.gapi.client.sheets.spreadsheets.values.get({
				spreadsheetId: sheetId,
				range: 'August!A1:S40',
			});
		} catch (err) {
			console.warn(err.message);
			return;
		}
		const range = response.result;
		if (!range || !range.values || range.values.length === 0) {
			console.warn('No values found.');
			return;
		}

		setScheduleData(range.values);
	}

	const handleSubmit = ev => {
		ev.preventDefault();
		gapiLoaded();
		gisLoaded();
		setSheetId(gSheetUrl.split('/')[5]);
	};

	return (
		<div style={{ padding: '1rem' }}>
			{!gapiInited && !gisInited && (
				<form onSubmit={handleSubmit}>
					<label htmlFor='gSheetUrl'>Enter Google Sheet URL </label>
					<input
						type='url'
						name='gSheetUrl'
						onChange={ev => setGsheetUrl(ev.target.value)}
					/>
					<button type='submit'>Submit</button>
				</form>
			)}
			{gapiInited && gisInited && (
				<div id='authorize_button'>
					<p>Authorize Access to Google Sheets</p>
					<button onClick={handleAuthClick}>Authorize</button>
				</div>
			)}
			{isSignedIn && (
				<button id='signout_button' onClick={handleSignoutClick}>
					Sign Out
				</button>
			)}
		</div>
	);
};
