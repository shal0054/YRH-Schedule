import './App.css';
// import SignIn from './components/auth/SignIn';
// import SignUp from './components/auth/SignUp';
// import AuthDetails from './components/auth/AuthDetails.jsx';
import Calendar from './pages/Calendar';
import ScheduleData from './components/ScheduleData';

function App() {
	return (
		<div className='App'>
			{/* <SignIn />
			<SignUp />
			<AuthDetails /> */}
			<Calendar />
			<ScheduleData />
		</div>
	);
}

export default App;
