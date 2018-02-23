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
      alerts:[],
      message: this.props.message,
      page: 1,
      pageLocBegin: 0,
      pageLocEnd: 50
    }
		this.showAlerts = this.showAlerts.bind(this)
    this.pagination = this.pagination.bind(this)
	}
  //setState on alerts if alerts are available and call pagination to 
  // display the alerts in the panel
  componentDidMount(){
    this.setState({alerts:this.props.alerts}, () => {
      this.pagination(this.state.page)
    })
  }
  //listen for change in messag and alerts from props
	componentWillReceiveProps(nextProps){
    //the message to appear in the panel when no alerts are available
    //or when loading page
    if(this.props.message !== nextProps.message){
      this.setState({message:nextProps.message})
    }
    //check for new alert props from parent 
    if(this.props.alerts !== nextProps.alerts){
      let page
      if(nextProps.alerts && nextProps.alerts.length % 1000 === 0){
        page = this.state.page
      }else page = 1
      //store alerts in state to allow re-render of new props
      this.setState({alerts:nextProps.alerts,page},() => {
        //after setting state call pagination to update alerts
        this.pagination(this.state.page)
      })
    }
  }
  //loops through the alerts and attaches each alert to an 
  //AlertPanelItem component for display in the panel
	showAlerts(){
    let listAlerts = []
		if(this.state.alerts && this.state.alerts.length){
			listAlerts = this.state.alerts.map((a, i)=>{
			 let source = a._source
			 return <AlertPanelItem 
                alert={source} 
                key={i} 
                alertKey={i}
                saveAlert={this.props.saveAlert}/>
		  })
		return listAlerts
    }else{
      return listAlerts
    }
	}
  //displays the alerts through pagination allowing 50 alerts to be 
  //shown at a time
  pagination(page){
    // console.log('clicked the page')
    let pageLocEnd = page * 50;
    let pageLocBegin = page * 50
    let alerts = this.showAlerts()
    if(alerts.length){
      if(pageLocEnd > alerts.length) pageLocEnd = alerts.length
      let pagination = alerts.slice((pageLocBegin - 50), pageLocEnd)
      this.setState({alertList:pagination,page,pageLocBegin, pageLocEnd},()=>{
        // console.log(this.state.alertList)
        // console.log('here is the alertList')
      })
    }
  }
  //since we are only retrieving 1000 alerts at a time, this function calls 
  //the back end to retrieve the next bunch of alerts 1000 at a time.
  getMoreAlerts(startFrom){
    if(startFrom){
      this.props.fetchAlerts(startFrom)
    }
  }
  render(){
    let alertList = this.state.alertList
    let size = this.props.size
    let message = this.props.message
    let showAlerts = this.state.alerts && this.state.alerts.length < 1 ? message : alertList
    let startFrom = this.state.alerts && this.state.alerts.length % 1000 === 0 ? this.state.alerts.length : null
    let totalAlerts = this.props.totalAlerts ? <span> Alerts {this.props.totalAlerts.toLocaleString()} </span> : null
    /**
    * - alert-panel-bottom is only displayed if there are more than 50 alerts to display
    * - Previous button is only displayed when page is greater than 1
    * - Next button is displayed if page * 50 is less than this.state.alerts.length
    * - Next group button is only displayed if there are more alerts to retrieve from the 
    *   backend and will be replaced with the next button after more alerts are retrieved.
    *   This is done by taking the modulus of 1000.
    * - pageLoc is the current list of alerts that is being displayed (ex. 51 - 100)
    */
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
        {this.props.alerts && this.props.alerts.length > 50 ?
          <div className="alert-panel-bottom">
            {this.state.page - 1 > 0 ? 
              <button
                className="alert-panel-pagination-previous"
                onClick={this.pagination.bind(this,this.state.page - 1)}>
                {"Previous"}
              </button>
            :
            null
            }
            <button 
              className="alert-panel-pagination">
              {this.state.pageLocBegin - 49 + " to " + this.state.pageLocEnd} 
            </button>
            {this.state.page * 50 < this.state.alerts.length ? 
              <button 
                className="alert-panel-pagination-next"
                onClick={this.pagination.bind(this,this.state.page + 1)}>
                {"Next"}
              </button>
            :
              startFrom !== null ?
                <button 
                  className="alert-panel-pagination-more"
                  onClick={this.getMoreAlerts.bind(this, startFrom)}>
                  {"Next Group"}
                </button>
                : 
                null
            }
            <span>{totalAlerts}</span>
          </div>
          :
          null
        }  
      </div>
    )
  }
}