import React, { useState } from 'react';
import axios from 'axios';

let states = [
	'Andhra Pradesh',
	'Arunachal Pradesh',
	'Assam',
	'Bihar',
	'Chhattisgarh',
	'Goa',
	'Gujarat',
	'Haryana',
	'Himachal Pradesh',
	'Jammu and Kashmir',
	'Jharkhand',
	'Karnataka',
	'Kerala',
	'Madhya Pradesh',
	'Maharashtra',
	'Manipur',
	'Meghalaya',
	'Mizoram',
	'Nagaland',
	'Odisha',
	'Punjab',
	'Rajasthan',
	'Sikkim',
	'Tamil Nadu',
	'Telangana',
	'Tripura',
	'Uttarakhand',
	'Uttar Pradesh',
	'West Bengal',
	'Andaman and Nicobar Islands',
	'Chandigarh',
	'Dadra and Nagar Haveli',
	'Daman and Diu',
	'Delhi',
	'Lakshadweep',
	'Puducherry',
];

const CreateAccount = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	const [state, setState] = useState('');
	const [errors, setErrors] = useState([]);
	const [userAdded, setUserAdded] = useState(false);

	const hasError = (key) => {
		return errors.indexOf(key) !== -1;
	};

	const submitHandler = (e) => {
		e.preventDefault();

		let error = [];
		let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');

		if (email.length === 0 || !regex.test(email)) {
			error.push('email');
		}

		if (password === '' || password.length < 8) {
			error.push('password');
		}

		if (password2 !== password) {
			error.push('passwordNotSame');
		}
		if (state === '') {
			error.push('state');
		}

		setErrors(error);

		if (error.length === 0) {
			axios
				.post(REACT_APP_USER_REGISTRATION, {
					email,
					password,
					state,
				})
				.then((res) => {
					console.log(res);
				})
				.catch((err) => {
					console.log(err);
				});
			setUserAdded(true);
		}
	};

	return (
		<div className="container">
			<form
				noValidate
				className="d-flex form-group flex-column justify-content-center align-items-center login_form"
				onSubmit={submitHandler}
			>
				{userAdded && (
					<div className="my-2 alert alert-success " role="alert">
						<div>
							<i class="bi bi-check-circle-fill">
								{' '}
								New Admin added successfully
							</i>
						</div>
					</div>
				)}
				<h3>Sign up</h3>
				<div class="form-group col-md-6">
					<label for="email">Email</label>
					<input
						type="email"
						className={
							hasError('email') ? 'form-control is-invalid' : 'form-control'
						}
						id="email"
						placeholder="xyz@xyz.com"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<div className={hasError('email') ? 'inline-error-msg' : 'hidden'}>
						Please enter a valid email.
					</div>
				</div>
				<div class="form-group col-md-6">
					<label for="password">Password</label>
					<input
						type="password"
						className={
							hasError('password') ? 'form-control is-invalid' : 'form-control'
						}
						id="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<div className={hasError('password') ? 'inline-error-msg' : 'hidden'}>
						Password length should be 8 or more
					</div>
				</div>
				<div class="form-group col-md-6">
					<label for="password2">Password</label>
					<input
						type="password"
						className={
							hasError('passwordNotSame')
								? 'form-control is-invalid'
								: 'form-control'
						}
						id="password2"
						placeholder="Enter Password Again"
						value={password2}
						onChange={(e) => setPassword2(e.target.value)}
					/>
					<div
						className={
							hasError('passwordNotSame') ? 'inline-error-msg' : 'hidden'
						}
					>
						Password didn't match
					</div>
				</div>
				<div class="form-group col-md-6">
					<label for="state">State</label>
					<select
						required
						id="state"
						class="form-select"
						value={state}
						onChange={(e) => setState(e.target.value)}
					>
						<option selected>Choose...</option>
						{states.map((state) => {
							return <option>{state}</option>;
						})}
					</select>
					<div className={hasError('state') ? 'inline-error-msg' : 'hidden'}>
						Please select a state.
					</div>
				</div>
				<div class="form-group col-md-6 ">
					<button className="btn btn-success my-3 form-control" type="submit">
						Sign up
					</button>
				</div>
			</form>
		</div>
	);
};

export default CreateAccount;
