import React from 'react';
import data from '../testData.json';
import {
	BarChart,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	Bar,
	CartesianGrid,
	ResponsiveContainer,
} from 'recharts';

const Chart = () => {
	return (
		<ResponsiveContainer width="100%" height={350}>
			<BarChart data={data}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar dataKey="Reported" fill="#FF0000" />
				<Bar dataKey="Repaired" fill="#00FF17" />
			</BarChart>
		</ResponsiveContainer>
	);
};

export default Chart;
