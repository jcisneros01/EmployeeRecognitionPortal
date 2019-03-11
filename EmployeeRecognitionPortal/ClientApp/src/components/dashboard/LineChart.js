import React from 'react';
import { 
    ResponsiveContainer, 
    LineChart, 
    Line, 
    XAxis, 
    YAxis,
    Tooltip, 
    CartesianGrid, 
    Legend
 } from 'recharts';

const data = [
  { name: 'Mon', Users: 2200, Awards: 3400 },
  { name: 'Tue', Users: 1280, Awards: 2398 },
  { name: 'Wed', Users: 5000, Awards: 4300 },
  { name: 'Thu', Users: 4780, Awards: 2908 },
  { name: 'Fri', Users: 5890, Awards: 4800 },
  { name: 'Sat', Users: 4390, Awards: 3800 },
  { name: 'Sun', Users: 4490, Awards: 4300 },
];


function SimpleLineChart() {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <Tooltip />
        <Legend  />
        <Line type="monotone" dataKey="Users" stroke="#82ca9d" />
        <Line type="monotone" dataKey="Awards" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default SimpleLineChart;