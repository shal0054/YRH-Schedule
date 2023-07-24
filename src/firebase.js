// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyC2I80j5Cxqu32twPFwVgRJFwYRtYru9tc',
	authDomain: 'yrh-schedule.firebaseapp.com',
	projectId: 'yrh-schedule',
	storageBucket: 'yrh-schedule.appspot.com',
	messagingSenderId: '808230342796',
	appId: '1:808230342796:web:cdd1cc3ab72bf2ec1f2ba9',
	measurementId: 'G-LBDM0KBGSN',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
