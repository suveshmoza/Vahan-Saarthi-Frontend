import React, { useState, useEffect } from 'react';
import date from 'date-and-time';
import axios from 'axios';
import OpenStreetMap from './OpenStreetMap';

export default function PotholeRegistration() {
	const now = new Date();
	const reportedOn = date.format(now, 'hh:mm:ss A YYYY/MM/DD');
	const potholeSize = ['Low', 'Medium', 'High'];
	const [longitude, setLongitude] = useState('');
	const [latitude, setLatitude] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [showMaps, setShowMaps] = useState(false);
	const [reportSubmitted, setReportSubmitted] = useState(false);
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [errors, setErrors] = useState([]);

	useEffect(() => {
		const getLocation = () => {
			navigator.geolocation.getCurrentPosition((position) => {
				setLatitude(position.coords.latitude);
				setLongitude(position.coords.longitude);
			});
		};
		getLocation();
	});

	const autoFillUserLocation = async () => {
		const response = await axios.get(
			'http://api.openweathermap.org/geo/1.0/reverse',
			{
				params: {
					lat: latitude,
					lon: longitude,
					appid: process.env.REACT_APP_GEOCODING_API_KEY,
				},
			}
		);
		setShowMaps(true);
		setCity(response.data[0].name);
		setState(response.data[0].state);
		console.log('auto fill location called');
		console.log(response);
	};

	const hasError = (key) => {
		return errors.indexOf(key) !== -1;
	};

	const options1 = {
		method: 'POST',
		url: process.env.REACT_APP_EMAIL_URL,
		headers: {
			'content-type': 'application/json',
			'X-RapidAPI-Key': process.env.REACT_APP_EMAIL_API_KEY,
			'X-RapidAPI-Host': process.env.REACT_APP_EMAIL_API_HOST,
		},
		data:
			'{"personalizations":[{"to":[{"email":' +
			String(email).replace(/^/, '"').replace(/$/, '"') +
			'}],' +
			'"subject":"Pothole Report Added Successfully"}],' +
			'"from":{"email":"TeamVahanSaarthi@VahanSaarthi.com"},' +
			'"content":[{"type":"text/plain",' +
			'"value":' +
			'"Thanks your for reporting the pothole. We have received your report. It will take 1-2 weeks to work on your report. Let\'s make Indian roads pothole free - Team Vahan-Saarthi"' +
			'}]}',
	};

	const submitHandler = (e) => {
		e.preventDefault();

		let error = [];

		if (name === '') {
			error.push('name');
		}
		const re = /^[6-9]{1}[0-9]{9}$/;
		if (!re.test(phoneNumber) && phoneNumber.length !== 10) {
			error.push('phoneNumber');
		}

		let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');

		if (email.length === 0 || !regex.test(email)) {
			error.push('email');
		}

		if (longitude === '') {
			error.push('inputCity');
		}

		if (latitude === '') {
			error.push('inputState');
		}

		setErrors(error);

		if (error.length === 0) {
			axios
				.request(options1)
				.then(function (response) {
					console.log(response.data);
				})
				.catch(function (error) {
					console.error(error);
				});

			axios
				.post(process.env.REACT_APP_BACKEND_URL_1, {
					name,
					phoneNumber,
					reportedOn,
					latitude,
					longitude,
					email,
				})
				.catch((err) => {
					console.log(err);
				});
			setReportSubmitted(true);
		}
	};

	return (
		<div id="pothole-registration" className="my-2 container potholeform">
			<div
				className="alert alert-warning d-flex align-items-center"
				role="alert"
			>
				<div>
					<i className="bi bi-info-circle-fill"></i> Your City and State will be
					auto-filled after clicking on Detect Location.
				</div>
			</div>
			<form
				noValidate
				onSubmit={submitHandler}
				className="container d-flex flex-column justify-content-center align-items-stretch"
			>
				{reportSubmitted && (
					<div
						className="alert alert-success d-flex align-items-center"
						role="alert"
					>
						<div>
							<i className="bi bi-check-circle-fill"></i> Report added
							successfully! For updates on your report keep checking your email
							regularly.
						</div>
					</div>
				)}
				<div>
					<label htmlFor="name" className="form-label">
						Name
					</label>
					<input
						type="text"
						value={name}
						name="name"
						className={
							hasError('name') ? 'form-control is-invalid' : 'form-control'
						}
						id="name"
						required
						onChange={(e) => setName(e.target.value)}
					/>
					<div className={hasError('name') ? 'inline-error-msg' : 'hidden'}>
						Please enter a valid name.
					</div>
				</div>
				<div>
					<label htmlFor="contact" className="form-label">
						Phone number
					</label>
					<div className="input-group">
						<span className="input-group-text" id="basic-addon1">
							+91
						</span>
						<input
							type="tel"
							value={phoneNumber}
							name="phoneNumber"
							className={
								hasError('phoneNumber')
									? 'form-control is-invalid'
									: 'form-control'
							}
							minLength={10}
							maxLength={10}
							id="contact"
							required
							onChange={(e) => setPhoneNumber(e.target.value)}
						/>
					</div>

					<div>
						<label htmlFor="email">Email</label>
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
					<div
						className={hasError('phoneNumber') ? 'inline-error-msg' : 'hidden'}
					>
						Please enter a valid phone number starting with +91.
					</div>
				</div>
				<div>
					<div>
						<button
							className="form-control btn btn-primary my-2 form-label"
							type="button"
							onClick={autoFillUserLocation}
						>
							<i className="bi bi-geo-alt-fill"></i> Detect Location
						</button>
						<div
							className={hasError('detectLoc') ? 'inline-error-msg' : 'hidden'}
						>
							Click the button to pin your location on Maps.
						</div>
						{showMaps && (
							<OpenStreetMap longitude={longitude} latitude={latitude} />
						)}
					</div>
				</div>

				<div>
					<label htmlFor="inputCity" className="form-label">
						City
					</label>
					<input
						type="text"
						required
						value={city}
						className={
							hasError('inputCity') ? 'form-control is-invalid' : 'form-control'
						}
						id="inputCity"
						onChange={(e) => setCity(e.target.value)}
					/>
					<div
						className={hasError('inputCity') ? 'inline-error-msg' : 'hidden'}
					>
						Please enter a valid City.
					</div>
				</div>
				<div>
					<label htmlFor="inputState" className="form-label">
						State
					</label>
					<input
						type="text"
						required
						value={state}
						className={
							hasError('inputState')
								? 'form-control is-invalid'
								: 'form-control'
						}
						id="inputState"
						onChange={(e) => setState(e.target.value)}
					/>
					<div
						className={hasError('inputState') ? 'inline-error-msg' : 'hidden'}
					>
						Please enter a valid State.
					</div>
				</div>
				<div>
					<button
						type="submit"
						className="btn btn-danger my-3 form-label form-control"
					>
						Submit <i className="bi bi-cloud-plus-fill"> </i>
					</button>
				</div>
			</form>
		</div>
	);
}
