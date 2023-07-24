import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS, createEventId } from './events';

const Calendar = () => {
	return (
		<FullCalendar
			plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
			headerToolbar={{
				left: 'today',
				center: 'title prev,next',
				right: 'dayGridMonth,timeGridWeek,timeGridDay',
			}}
			initialView='dayGridMonth'
			initialEvents={INITIAL_EVENTS}
		/>
	);
};

export default Calendar;
