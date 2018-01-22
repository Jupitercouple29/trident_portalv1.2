import React, { Component } from 'react'
import Columns from './dashboard-columns'
import { getItemClicked } from '../functions/getItemClicked'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actionCreators from '../actions'

export class TridentPanel extends Component {
	constructor(props){
		super(props)
		this.state = {
			message:this.props.message
		}
		this.handleOnclick = this.handleOnclick.bind(this)
	}
	handleOnclick(title, info){
		let trident = localStorage.getItem('selectedTrident')
		getItemClicked(trident, title, info)
		.then(res => {
			this.props.infoAlerts(res)
			this.props.history.push('/info')
		})
	}
	componentWillReceiveProps(nextProp){
		if(this.props.message !== nextProp.message){
			this.setState({message:nextProp.message})
		}
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
		return alerts
	}
	render(){
		let sourceIPArray = this.distributeArrays(this.props.sourceIPs)
		let destIPArray = this.distributeArrays(this.props.destIPs)
		let alertsArray = this.distributeSignatures(this.props.alerts)
		let message = this.props.message
		let showAlerts = alertsArray && alertsArray.length >= 1 ? alertsArray : message
		return(
			<div className="trident-panel-container">
				<div className="trident-panel small">
					<Columns 
						title={"Source IPs"} 
						info={sourceIPArray[0]} 
						name={"source_ip"}
						message={message}
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
							{showAlerts}
						</div>
					</div>
				</div>
				<div className="trident-panel small">
					<Columns 
						title={"Destination IPs"} 
						info={destIPArray[0]} 
						name={"destination_ip"}
						message={message}
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