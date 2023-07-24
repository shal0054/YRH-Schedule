import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../../firebase';

const SignUp = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const signUp = ev => {
		ev.preventDefault();
		createUserWithEmailAndPassword(auth, email, password)
			.then(userCredentials => {
				console.log(userCredentials);
			})
			.catch(error => {
				console.warn(error);
			});
	};

	return (
		<div className='sign-in-container'>
			<form onSubmit={signUp}>
				<h1>Create Account</h1>
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
				<button type='submit'>Sign Up</button>
			</form>
		</div>
	);
};

export default SignUp;
