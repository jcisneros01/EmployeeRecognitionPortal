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




class SimpleLineChart extends React.Component {
    componentDidMount() {
        this.props.reports.getAwardReports('awarddatabymonth');
    }
    render() {
        console.log(this.props.reports.state)
        return (
            <ResponsiveContainer width="100%" height={320}>
                <LineChart data={this.props.reports.state.lineData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="userCount" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="awardCount" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        );
    }
 
}

export default SimpleLineChart;