import React, { Component } from 'react'
import AlertPanelItem from './alert-panel-item'

/**
 * AlertPanel is the panel to display alerts inside of.
 * props {
 *    alerts: an array of alerts,
 *    message: message to display if no alerts or loading,
 *    title: the title of the alert panel,
 *    size: the size of the alert panel {small, medium, large}
 * }
 */
export default class AlertPanel extends Component {
	constructor(props){
		super(props)
    this.state = {
      alertList: [],
      message: this.props.message
    }
		this.showAlerts = this.showAlerts.bind(this)
	}
	componentWillReceiveProps(nextProps){
    if(this.props.message !== nextProps.message){
      this.setState({message:nextProps.message})
    }
  }
	showAlerts(){
		if(this.props.alerts){
			let listAlerts = this.props.alerts.map((a, i)=>{
			 let source = a._source
			 return <AlertPanelItem alert={source} key={i} alertKey={i}/>
		  })
		return listAlerts
    }
	}
  render(){
    let alertList = this.showAlerts()
    let size = this.props.size
    let message = this.props.message
    let showAlerts = this.props.alerts && this.props.alerts.length < 1 ? message : alertList
    return(
     	<div className={`alert-panel ${size}`}>
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
					{showAlerts}
        </div>
      </div>
    )
  }
}