import { useEffect, useState } from 'react';
import { Admin } from '../pages/Admin';

function ScheduleData() {
	const [scheduleData, setScheduleData] = useState(null);

	useEffect(() => {
		if (scheduleData)
			setScheduleData(prevData => {
				let newData = [...prevData, (prevData[0][0] = 'Date')];
				return newData;
			});
	}, []);

	return (
		<>
			<Admin setScheduleData={setScheduleData} />
			{scheduleData && <div>{scheduleData[0][0]}</div>}
		</>
	);
}

export default ScheduleData;
