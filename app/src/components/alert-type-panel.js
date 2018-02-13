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
 * 		message: the message to display if loading or no alerts
 * }
 */
export default class AlertType extends Component {
	constructor(props){
		super(props)
		this.state = {
			alertList:[]
		}
	}
	componentWillMount(){
		this.props.alertFunc(this.props.trident,this.props.type)
		.then(res=>{
			this.setState({alertList:res.alerts})
		})
	}
	componentWillReceiveProps(nextProps){
		if(this.props.trident !== nextProps.trident){
			this.props.alertFunc(nextProps.trident,this.props.type)
			.then(res=>{
				this.setState({alertList:res.alerts})
			})
		}
	}
	render(){
		let alert = this.state.alertList
		let message = this.props.message
		return(
			<div className="alert-panel-container">
				<AlertPanel alerts={alert} title={this.props.title} message={message} />
			</div>
		)
	}
}