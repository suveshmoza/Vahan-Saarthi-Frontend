import React from 'react';

import { Routes, Route } from 'react-router-dom';
import {
	Home,
	PotholeRegistration,
	NavBar,
	Login,
	Admin,
	CreateAccount,
	OpenStreetMap,
} from './components';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const App = () => {
	return (
		<div>
			<NavBar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/potholeregistration" element={<PotholeRegistration />} />
				<Route path="/login" element={<Login />} />
				<Route path="/admin" element={<Admin />} />
				<Route path="/createAccount" element={<CreateAccount />} />
				<Route path="/maps" element={<OpenStreetMap />} />
			</Routes>
		</div>
	);
};

export default App;
