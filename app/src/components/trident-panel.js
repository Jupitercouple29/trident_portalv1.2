import React, { Component } from 'react'
import Columns from './dashboard-columns'
import { getItemClicked } from '../functions/getItemClicked'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actionCreators from '../actions'

/**
 * TridentPanel is used to display source ip's, destination ip's, and signature alerts
 */
export class TridentPanel extends Component {
	constructor(props){
		super(props)
		this.state = {
			message:this.props.message
		}
		this.handleOnclick = this.handleOnclick.bind(this)
	}
	//handles clicking of the item 
	handleOnclick(title, data){
		console.log('item has been clicked in the trident panel')
		let trident = localStorage.getItem('selectedTrident')
		let info = {
			trident: trident,
			title: title,
			data: data,
			queryDate: this.props.queryDate
		}
		console.log(info)
		getItemClicked(info)
		.then(res => {
			this.props.infoAlerts(res)
			this.props.history.push('/info')
		})
	}
	componentWillReceiveProps(nextProp){
		// messge to be displayed if loading or no data
		if(this.props.message !== nextProp.message){
			this.setState({message:nextProp.message})
		}
	}
	//configures the list of source ip's and destination ip's to be displayed
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
	//configures the list of signature alerts to be displayed
	distributeSignatures(array){
		let alerts = array.map((a,i) => {
			return <div key={a.key + i} className="trident-panel-alert">
							<p 
								className="trident-panel-alert-name medium"
								onClick={this.handleOnclick.bind(this,"alert.signature.keyword",a.key)}>
								{a.key}
							</p>
							<p className="trident-panel-alert-total small">{a.doc_count.toLocaleString()}</p>
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
				<div className="trident-panel">
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
				<div className="trident-panel">
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
				<div className="trident-panel">
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

const mapStateToProps = (state) => ({
	queryDate: state.queryDate
})

export default withRouter(connect(mapStateToProps, actionCreators)(TridentPanel))