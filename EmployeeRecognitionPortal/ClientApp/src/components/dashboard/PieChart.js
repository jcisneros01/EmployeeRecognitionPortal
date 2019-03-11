import React from 'react'; 
import { Pie} from 'react-chartjs-2';

class PieChart extends React.Component {
	componentDidMount(){
		this.props.reports.getAwardReports('countbytype');
	}
    render() {
        const { awards } = this.props.reports.state
        console.log("pie",this.props);
		const data = {
			labels: awards.labels,
			datasets: [{
				data: awards.counts,
				backgroundColor: [
				'#FF6384',
				'#36A2EB'
				],
				hoverBackgroundColor: [
				'#FF6384',
				'#36A2EB'
				]
			}]
		};
		
		const optionsPie = {
			legend: {
				position: 'bottom'
			}
		}
        return (
			<div>
				<h2>Employee Awards</h2>
                    <Pie data={data} options={optionsPie}/>
                </div>
		)
	}
}

export default PieChart;