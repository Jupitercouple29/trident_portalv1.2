import React, { Component } from 'react'
import AlertPanelItem from './alert-panel-item'

export default class AlertPanel extends Component {
	constructor(props){
		super(props)
    this.state = {
      alertList: [],
      message: this.props.message,
      page: 1,
      pageLoc: 50
    }
		this.showAlerts = this.showAlerts.bind(this)
    this.pagination = this.pagination.bind(this)
	}
  componentWillMount(){
    this.pagination(1)
  }
	componentWillReceiveProps(nextProps){
    if(this.props.message !== nextProps.message){
      this.setState({message:nextProps.message})
    }
  }
  // shouldComponentUpdate(nextProps, nextState){
  //   if(this.props.alerts !== nextProps.alerts){
  //     return true
  //   }elseelse{
  //     return false
  //   }
  // }
	showAlerts(){
		if(this.props.alerts){
			let listAlerts = this.props.alerts.map((a, i)=>{
			 let source = a._source
			 return <AlertPanelItem alert={source} key={i} alertKey={i}/>
		  })
		return listAlerts
    }
	}
  pagination(page){
    console.log('clicked the page')
    let pageLoc = page * 50;
    let alerts = this.showAlerts()
    let pagination = alerts.slice((pageLoc - 50), pageLoc)
    console.log(pagination)
    this.setState({alertList:pagination,page,pageLoc},()=>{console.log(this.state.page)})
  }
  render(){
    console.log('called render in alert-panel')
    let alertList = this.state.alertList
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
        {this.props.alerts.length > 50 ?
          <div className="alert-panel-bottom">
            <button
              className="alert-panel-pagination-previous"
              onClick={this.pagination.bind(this,this.state.page - 1)}>
              {"Previous"}
            </button>
            <button 
              className="alert-panel-pagination">
              {this.state.pageLoc - 49 + " to " + this.state.pageLoc} 
            </button>
            <button 
              className="alert-panel-pagination-next"
              onClick={this.pagination.bind(this,this.state.page + 1)}>
              {"Next"}
            </button>
          </div>
          :
          null
        }  
      </div>
    )
  }
}