import React, { Component } from 'react'
import Columns from './dashboard-columns'
import { getItemClicked } from '../functions/getItemClicked'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actionCreators from '../actions'

export class TridentPanel extends Component {
	constructor(props){
		super(props)
		this.handleOnclick = this.handleOnclick.bind(this)
		this.handleAlertClick = this.handleAlertClick.bind(this)
	}
	handleOnclick(title, info){
		console.log(title)
		console.log(info)
		let trident = localStorage.getItem('selectedTrident')
		getItemClicked(trident, title, info)
		.then(res => {
			console.log(res)
			this.props.infoAlerts(res)
			this.props.history.push('/info')
		})
	}
	handleAlertClick(info){
		console.log(info)
	}
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
												<p 
													className="trident-panel-alert-name medium"
													onClick={this.handleOnclick.bind(this,"alert.signature.keyword",a.key)}>
													{a.key}
												</p>
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
					<Columns 
						title={"Source IPs"} 
						info={sourceIPArray[0]} 
						name={"source_ip"}
						clicked={this.handleOnclick}/>
					<Columns 
						title={"Total # of Alerts"} 
						info={sourceIPArray[1]} 
						name={"source-ips-count"}/>
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
					<Columns 
						title={"Destination IPs"} 
						info={destIPArray[0]} 
						name={"destination_ip"}
						clicked={this.handleOnclick}/>
					<Columns 
						title={"Total # of Alerts"} 
						info={destIPArray[1]} 
						name={"dest-ips-count"}/>
				</div>
			</div>
		)
	}
}

export default withRouter(connect(null, actionCreators)(TridentPanel))