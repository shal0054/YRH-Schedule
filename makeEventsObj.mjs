import { scheduleData } from './scheduleData.mjs';
// console.log(scheduleData[0].rowData[1].values[1]);
makeCalendarEvents(scheduleData);

function makeCalendarEvents(scheduleData) {
	if (scheduleData.length === 0) return;

	let calendarEvents = [];
	let eventGuid = 0;

	scheduleData.forEach(month => {
		let headerRow = [];
		month.rowData.forEach((row, i) => {
			if (i === 0) {
				row.values.forEach(header => {
					headerRow.push(header.formattedValue);
				});
				return;
			}
			let dateStr;
			row.values.forEach((doc, j) => {
				if (j === 0) {
					if (!doc.formattedValue) return;
					dateStr = new Date(doc.formattedValue)
						.toISOString()
						.replace(/T.*$/, ''); // YYYY-MM-DD of dateStr;
					return;
				}

				if (!doc.formattedValue) return;
				const bgColorObj = doc.backgroundColor;

				function getRgbStr(bgColorObj) {
					const red = bgColorObj.red ? bgColorObj.red : 0;
					const green = bgColorObj.green ? bgColorObj.green : 0;
					const blue = bgColorObj.blue ? bgColorObj.blue : 0;

					return `rgb(${red * 255} ${green * 255} ${blue * 255})`;
				}

				let event = {};
				const shiftName = headerRow[j];

				event.id = eventGuid++;
				event.title = `${shiftName} — Dr. ${doc.formattedValue}`;
				event.backgroundColor = getRgbStr(bgColorObj);

				switch (shiftName) {
					case 'IM On Call 8am-5pm':
					case 'ICU Days':
					case 'YRH Hospitalist':
					case 'ECGs':
					case 'Dialysis':
					case 'CV Clinic':
					case 'Stress Tests':
					case 'IM Resident Call 8am-5pm':
					case 'IM Resident Clinics':
					case 'IM Resident ICU/ Hospitalist':
					case 'IM Resident Stress Tests':
						event.start = dateStr + 'T08:00:00';
						event.end = dateStr + 'T17:00:00';
						break;
					case 'IM on Call 5pm-8am':
					case 'ICU Nights':
					case 'IM Resident Call 5pm-8am':
						event.start = dateStr + 'T17:00:00';
						event.end = nextDay(dateStr) + 'T08:00:00';
						break;
					case 'Vacation':
						event.start = dateStr;
						break;
					default:
						event.start = dateStr;
				}

				calendarEvents.push(event);
			});
		});
	});

	console.log(calendarEvents);
	console.log(JSON.stringify(calendarEvents));
}

function nextDay(dateStr) {
	const date = new Date(dateStr);
	const tomorrow = date.setDate(date.getDate() + 1);
	return new Date(tomorrow).toISOString().replace(/T.*$/, '');
}
