import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../../firebase';

const SignIn = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const signIn = ev => {
		ev.preventDefault();
		signInWithEmailAndPassword(auth, email, password)
			.then(userCredentials => {
				console.log(userCredentials);
			})
			.catch(error => {
				console.warn(error);
			});
	};

	return (
		<div className='sign-in-container'>
			<form onSubmit={signIn}>
				<h1>Log In to your Account</h1>
				<input
					type='email'
					placeholder='Enter your email address'
					value={email}
					onChange={ev => setEmail(ev.target.value)}
				/>
				<input
					type='password'
					placeholder='Enter your password'
					value={password}
					onChange={ev => setPassword(ev.target.value)}
				/>
				<button type='submit'>Log In</button>
			</form>
		</div>
	);
};

export default SignIn;
