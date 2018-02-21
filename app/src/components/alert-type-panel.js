import React, { Component } from 'react'
import AlertPanel from './alert-panel'

/**
 * AlertType is used to display the AlertPanel but takes in an alertFunc function
 * that is used to call the backend to gather the alerts for that particular type 
 * of AlertPanel. 
 * props {
 * 		alertFunc: function passed down to call the backend to gather alerts,
 * 		trident: the trident,
 * 		type: the event_type,
 * 		title: the title of the AlertPanel,
 * 		loading: true or false,
 * 		message: the message to display if loading or no alerts
 * }
 */
export default class AlertType extends Component {
	constructor(props){
		super(props)
		this.state = {
			alertList:[]
		}
		this.fetchAlerts = this.fetchAlerts.bind(this)
		this.fetchMoreAlerts = this.fetchMoreAlerts.bind(this)
	}
	componentWillMount(){
		let info = {
			trident:this.props.trident,
			type: this.props.type,
			from: this.props.from || 0,
			queryDate: this.props.queryDate
		}
		this.fetchAlerts(info)
	}
	componentWillReceiveProps(nextProps){
		if(this.props.trident !== nextProps.trident){
			let info = {
				trident:nextProps.trident,
				type: this.props.type,
				from:nextProps.from || 0,
				queryDate: nextProps.queryDate || this.props.queryDate
			}
			this.fetchAlerts(info)
		}else if(this.props.loading !== nextProps.loading){
			let info = {
				trident: this.props.trident,
				type: this.props.type,
				from: this.props.from || 0,
				queryDate: nextProps.queryDate || this.props.queryDate
			}
			this.fetchAlerts(info)
		}
	}
	//call to backend to get alerts only retrieves 1000 alerts at a time 
	fetchAlerts(info){
		this.props.alertFunc(info)
		.then(res => {
			this.setState({alertList: res.alerts})
		})
	}
	//call to backend to fetch more alerts after first 1000 alerts
	fetchMoreAlerts(startFrom){
		let info = {
			trident:this.props.trident,
			type:this.props.type,
			from:startFrom
		}
		this.props.alertFunc(info)
			.then(res=>{
				let alertList = this.state.alertList
				let newAlertList = alertList.concat(res.alerts)
				console.log(newAlertList)
				console.log(res.alerts)
				this.setState({alertList:newAlertList})
			})
	}
	render(){
		let alert = this.props.loading ? [] : this.state.alertList
		let message = this.props.message
		return(
			<div className="alert-panel-container">
				<AlertPanel 
					alerts={alert} 
					title={this.props.title} 
					message={message} 
					fetchAlerts={this.fetchMoreAlerts}/>
			</div>
		)
	}
}