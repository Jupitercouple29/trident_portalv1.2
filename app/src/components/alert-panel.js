import React, { Component } from 'react'
import { formatDate } from '../functions/formatDate'
import { configureAlertType } from '../functions/configureAlertType'
import AlertPanelItem from './alert-panel-item'

export default class AlertPanel extends Component {
	constructor(props){
		super(props)
    this.state = {
      alertList: []
    }
		this.showAlerts = this.showAlerts.bind(this)
		this.handleClick = this.handleClick.bind(this)
	}
	handleClick(){
		
	}
	showAlerts(){
		if(this.props.alerts){
			let listAlerts = this.props.alerts.map((a, i)=>{
			let source = a._source
			return <AlertPanelItem alert={source} key={i} alertKey={i}/>
		})
		return listAlerts
		}else if(this.props.alertFunc){
      // return configureAlertType(this.props.alertFunc, this.props.trident)
      // .then(res=>console.log(alert))
    }
	}
  render(){
    let alertList = this.showAlerts()
    return(
     	<div className="alert-panel">
        <div className="alert-panel-header">
          <h3>{this.props.title}</h3>
        </div>
        <div className="alert-panel-label-container">
          <label className="alert-panel-label date">Date</label>
          <label className="alert-panel-label trident">Trident</label>
          <label className="alert-panel-label source-ip">Source IP</label>
          <label className="alert-panel-label dest-ip">Destination IP</label>
          <label className="alert-panel-label event-type">Event Type</label>
        </div>
        <div className="alert-panel-alerts-container">
					{alertList}
        </div>
      </div>
    )
  }
}