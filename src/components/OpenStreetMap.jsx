import React from 'react';
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';

const OpenStreetMap = ({ longitude, latitude }) => {
	return (
		<MapContainer
			center={[latitude, longitude]}
			zoom={16}
			style={{ width: '430px', height: '300px', zIndex: '10' }}
		>
			<TileLayer
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={[latitude, longitude]}>
				<Popup>Your Location.</Popup>
			</Marker>
		</MapContainer>
	);
};

export default OpenStreetMap;
