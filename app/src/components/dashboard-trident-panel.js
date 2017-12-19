import React, { Component } from 'react' 
import Columns from './dashboard-columns'

export default class TridentPanel extends Component {
	// renderTridents(tridents){
	// 	let component = this.props.tridents.map((trident)=>{
	// 		return <p>{trident}</p>
	// 	})
	// 	return component
	// }
	// renderAlerts(alerts){
	// 	let component = this.props.alerts.map((alert)=>{
	// 		return <p>{alert}</p>
	// 	})
	// 	return component
	// }
	render(){
		// let tridents = this.renderTridents(this.props.tridents)
		// let alerts = this.renderAlerts(this.props.alerts)
		return(
			<div className="dashboard-panel">
				<div className="trident-panel">
					<Columns title={"Tridents"} info={["Trident 2411", "Trident 2422","Trident 2422","Trident 2422","Trident 2422","Trident 2422","Trident 2422","Trident 2422","Trident 2422","Trident 2422","Trident 2422","Trident 2422"]}/>
					<Columns title={"Alerts"} info={["2,444", "444","444","444","444","444","444","444","444","444","444","444"]}/>
				</div>
			</div>
		)
	}
}

// <div className="dashboard-alert-panel-column">
// 						<h3>Tridents</h3>
// 						{tridents}
// 					</div>
// 					<div className="dashboard-alert-panel-column">
// 						<h3>Alerts</h3>
// 						{alerts}
// 					</div>