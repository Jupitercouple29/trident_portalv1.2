import React, { Component } from 'react'
import Columns from './dashboard-columns'

export default class TridentPanel extends Component {

	distributeArrays(array){
		let keys = []
		let total = []
		let newArray = []
		array.map((a,i) => {
			keys.push(a.key)
			total.push(a.doc_count)
		})
		newArray.push(keys,total)
		return newArray	
	}
	distributeSignatures(array){
		let alerts = array.map((a,i) => {
								return <div key={a.key + i} className="trident-panel-alert">
												<p className="trident-panel-alert-name medium">{a.key}</p>
												<p className="trident-panel-alert-total small">{a.doc_count}</p>
											</div>
							})
		// console.log(alerts)
		return alerts
	}
	render(){
		let sourceIPArray = this.distributeArrays(this.props.sourceIPs)
		let destIPArray = this.distributeArrays(this.props.destIPs)
		let alertsArray = this.distributeSignatures(this.props.alerts)
		return(
			<div className="trident-panel-container">
				<div className="trident-panel small">
					<Columns title={"Source IPs"} info={sourceIPArray[0]}/>
					<Columns title={"Total # of Alerts"} info={sourceIPArray[1]}/>
				</div>
				<div className="trident-panel medium">
					<div className="trident-panel-alerts-container">
						<div className="trident-panel-alerts-headers">
							<h3 className="trident-panel-header medium">Current Events</h3>
							<h3 className="trident-panel-header small">Total</h3>
						</div>
						<div className="trident-panel-alerts">
							{alertsArray}
						</div>
					</div>
				</div>
				<div className="trident-panel small">
					<Columns title={"Destination IPs"} info={destIPArray[0]} />
					<Columns title={"Total # of Alerts"} info={destIPArray[1]} />
				</div>
			</div>
		)
	}
}