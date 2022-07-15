import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
	const navigate = useNavigate();

	const [errors, setErrors] = useState([]);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setIsLoading] = useState(false);
	const [success, setSuccess] = useState(true);
	const hasError = (key) => {
		return errors.indexOf(key) !== -1;
	};

	const onLogin = (e) => {
		e.preventDefault();
		setIsLoading(true);
		let error = [];

		let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');

		if (email.length === 0 || !regex.test(email)) {
			error.push('email');
			setIsLoading(false);
		}

		if (password === '') {
			error.push('password');
			setIsLoading(false);
		}

		setErrors(error);

		if (error.length === 0) {
			const userAuth = async () => {
				const { data } = await axios.get(
					process.env.REACT_APP_USER_REGISTRATION
				);
				for (let i = 0; i < data.length; i++) {
					if (data[i].email === email && data[i].password === password) {
						navigate('/admin');
					}
				}
				setIsLoading(false);
				setSuccess(false);
			};
			userAuth();
		}
	};

	return (
		<div className="container login d-flex flex-column justify-content-center align-items-center ">
			{!success && (
				<div
					className="alert alert-danger d-flex align-items-center"
					role="alert"
				>
					<div>
						<i class="bi bi-check-circle-fill"> </i>
						Please enter valid Email and Password
					</div>
				</div>
			)}
			<form noValidate onSubmit={onLogin} className=" login_form">
				<h2 className="text-center">Login</h2>
				<div>
					<label htmlFor="email" className="form-label">
						Email
					</label>
					<input
						type="email"
						placeholder="sample@xyz.com	"
						className={
							hasError('email') ? 'form-control is-invalid' : 'form-control'
						}
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<div className={hasError('email') ? 'inline-error-msg' : 'hidden'}>
						Please enter a valid email.
					</div>
				</div>
				<div>
					<label htmlFor="password" className="form-label">
						Password
					</label>
					<input
						type="password"
						value={password}
						placeholder="•••••••"
						className={
							hasError('password') ? 'form-control is-invalid' : 'form-control'
						}
						id="contact"
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<div className={hasError('password') ? 'inline-error-msg' : 'hidden'}>
						Incorrect Password
						<br />
					</div>
				</div>
				<button
					onClick={(e) => {
						onLogin;
					}}
					type="submit"
					className="btn btn-success btn-block form-label my-2 form-control"
				>
					{loading && (
						<div className="spinner-border text-light" role="status">
							<span className="visually"> </span>
						</div>
					)}
					{!loading && <h6 style={{ display: 'inline' }}>Login</h6>}
				</button>
			</form>
		</div>
	);
};

export default Login;
