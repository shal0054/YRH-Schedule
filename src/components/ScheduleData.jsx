import { useState, useEffect } from 'react';
import { Admin } from '../pages/Admin';

function ScheduleData() {
	const [scheduleData, setScheduleData] = useState(null);

	useEffect(() => {
		makeCalendarEvents(scheduleData);
	}, [scheduleData]);

	return (
		<>
			<Admin setScheduleData={setScheduleData} />
			{scheduleData && <div>{scheduleData}</div>}
		</>
	);
}

function makeCalendarEvents(scheduleData) {
	if (!scheduleData) return;

	let calendarEvents = [];
	let headerRow;
	let eventGuid = 0;

	scheduleData.forEach((row, i) => {
		if (i === 0) {
			headerRow = row;
			return;
		}
		let dateStr;
		row.forEach((doc, j) => {
			if (j === 0) {
				dateStr = new Date(doc).toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today;
				return;
			}

			if (!doc) return;

			let event = {};
			const shiftName = headerRow[j];

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
					event.end = dateStr + 'T08:00:00';
					break;
				case 'Vacation':
					event.start = dateStr;
					break;
				default:
					event.start = dateStr;
			}

			event.id = eventGuid++;
			event.title = `${shiftName} — Dr. ${doc}`;

			calendarEvents.push(event);
		});
	});

	console.log(calendarEvents);
	return JSON.stringify(calendarEvents);
}

export default ScheduleData;
