import React from 'react';
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';

const OpenStreetMap = ({ reportData, long, lat }) => {
	const position = [lat, long];
	return (
		<MapContainer
			center={position}
			zoom={16}
			style={{ width: '430px', height: '475px', zIndex: '12' }}
		>
			<TileLayer
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>

			{reportData &&
				reportData.map((report) => (
					<Marker
						key={report.id}
						position={new Array(report.latitude, report.longitude)}
					>
						<Popup>Reported on: {report.reportedOn}</Popup>
					</Marker>
				))}
		</MapContainer>
	);
};

export default OpenStreetMap;
