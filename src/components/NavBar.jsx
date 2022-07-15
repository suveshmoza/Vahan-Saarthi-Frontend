import React from 'react';
const NavBar = ({ amILogin }) => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container">
				<a to={'/'} className="navbar-brand mx-auto" href="/">
					<img src={require('../images/32.png')} alt="logo" />
					Vahan Saarthi
				</a>
			</div>
		</nav>
	);
};

export default NavBar;
