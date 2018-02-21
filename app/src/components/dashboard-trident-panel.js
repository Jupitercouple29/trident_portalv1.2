import React, { Component } from 'react' 
import Columns from './dashboard-columns'

/**
 * TridentPanel is used to display each trident and the number of alerts 
 * for each trident. 
 * props {
 * 		alerts: array of key value pairs {trident:number of alerts},
 * 		tridents: array of user tridents
 * }
 */
export default class TridentPanel extends Component {
	render(){
		let tridentArray = []
		let alertsArray = []
		let keys = this.props.tridents
		if(this.props.alerts !== undefined){
			// console.log(this.props.alerts)
			// console.log(this.props.tridents)
			let alertKeys = Object.keys(this.props.alerts)
			Object.keys(keys).map((key) => {
	      this.props.tridents[key].map((trident) => {
	        tridentArray.push(key + " " + trident)
	        alertKeys.map((alert,i) => {
	        	if(alert == trident){
							alertsArray.push(this.props.alerts[alert].toLocaleString())
	        	}
	        })
	      })
	    })
		}
		return(
			<div className="dashboard-panel">
				<div className="trident-panel zoomIn">
					<Columns title={"Tridents"} info={tridentArray}/>
					<Columns title={"Alerts"} info={alertsArray}/>
				</div>
			</div>
		)
	}
}
