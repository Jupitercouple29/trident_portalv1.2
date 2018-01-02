import React, { Component } from 'react' 
import * as actionCreators from '../../actions'
import { connect } from 'react-redux'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

export class ChartsPage extends Component {
	render(){
		return(
			<div>
				<div className="dashboard-header">
					<h2 className="dashboard-title">DASHBOARD</h2>
					<h3 className="dashboard-path">Home / Charts</h3>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	sourceIPs: state.sourceIPs,
	destIPs: state.destIPs,
	signatures: state.signatureAlerts
})

export default connect(mapStateToProps, actionCreators)(ChartsPage)