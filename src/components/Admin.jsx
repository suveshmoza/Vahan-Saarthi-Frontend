import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OpenStreetMap from './OSM';
import date from 'date-and-time';

const Admin = () => {
	const [longitude, setLongitude] = useState('');
	const [latitude, setLatitude] = useState('');
	const now = new Date();
	const today = date.format(now, 'hh:mm:ss A YYYY/MM/DD');
	const [reportData, setReportData] = useState([]);
	const gmapsUrl = 'https://www.google.com/maps/search/?api=1&query=';
	useEffect(() => {
		const fetchData = async () => {
			const { data } = await axios.get(process.env.REACT_APP_BACKEND_URL_2);
			setReportData(data);
		};
		const getLocation = () => {
			navigator.geolocation.getCurrentPosition((position) => {
				setLatitude(position.coords.latitude);
				setLongitude(position.coords.longitude);
			});
		};
		getLocation();
		fetchData();
	}, []);

	const initiated = (email) => {
		axios.request({
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
				'"subject":"Pothole Work Initiated"}],' +
				'"from":{"email":"TeamVahanSaarthi@VahanSaarthi.com"},' +
				'"content":[{"type":"text/plain",' +
				'"value":' +
				'"The work on the pothole reported by you has been started. It will take 2-3 days for completion"' +
				'}]}',
		});
	};

	const repaired = async (email, id) => {
		axios.request({
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
				'"subject":"Pothole Repaired"}],' +
				'"from":{"email":"TeamVahanSaarthi@VahanSaarthi.com"},' +
				'"content":[{"type":"text/plain",' +
				'"value":' +
				'"Dear Citizen the work on the reported pothole has been completed. Thank you for reporting the pothole. Let\'s make Indian roads pothole free"' +
				'}]}',
		});
		const res = await axios.delete(process.env.REACT_APP_BACKEND_URL_2 + id);
	};

	return (
		<div className="container mt-4">
			<div className="row">
				<div className="col-md-8">
					<div className="card">
						<div className="card-body text-center">
							<h5 className="card-title">Welcome Admin</h5>
							<p className="card-text">Logged in at : {today}</p>
							<a href="/" className="btn btn-danger">
								Logout
							</a>
						</div>
					</div>
					<div>
						<h2 className="text-center">Recent Reports</h2>
						{!reportData && (
							<div className="spinner-grow text-primary" role="status">
								<span className="visually-hidden">Loading...</span>
							</div>
						)}
						<div className="table-responsive">
							<table className="table">
								<thead></thead>
								<tbody>
									<tr>
										<th scope="row">
											{reportData.length > 0 &&
												reportData.map((report) => (
													<li className="list-group-item" key={report.id}>
														<div className="row">
															<div className="col-8">
																Reported by: {report.name}
																<div>Reported on: {report.reportedOn}</div>
															</div>
															<div className="col-4 d-flex text-end">
																<button
																	onClick={(e) =>
																		repaired(report.email, report.id)
																	}
																	className="btn btn-success mx-1"
																>
																	Repaired
																</button>
																<button
																	onClick={(e) => initiated(report.email)}
																	className="btn btn-warning"
																>
																	Initiated
																</button>
																<div>
																	<a
																		href={
																			gmapsUrl +
																			report.latitude +
																			'%2C' +
																			report.longitude
																		}
																		style={{ fontSize: '2rem', color: 'red' }}
																		className="bi bi-geo-alt-fill"
																	></a>
																</div>
															</div>
														</div>
													</li>
												))}
										</th>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>

				{reportData.length > 0 && (
					<div className="col-md-4">
						<OpenStreetMap
							reportData={reportData}
							long={longitude}
							lat={latitude}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default Admin;
