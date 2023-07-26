import { useState } from 'react';
import { Admin } from '../pages/Admin';

function ScheduleData() {
	const [scheduleData, setScheduleData] = useState(null);
	return (
		<>
			<Admin setScheduleData={setScheduleData} />
			{scheduleData && <div>{scheduleData}</div>}
		</>
	);
}

export default ScheduleData;
