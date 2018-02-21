import React, { Component } from 'react'
import TridentPanel from '../../components/dashboard-trident-panel'
import InfoPanel from '../../components/info-panel'
import PortalMap from '../../components/map'
import AlertPanel from '../../components/alert-panel'
import { getNumOfAlerts } from '../../functions/getNumOfAlerts'
import { formatDate } from '../../functions/formatDate'
import * as actionCreators from '../../actions'
import { connect } from 'react-redux'
import './dashboard.css'

/**
 * Dashboard is the first component to be displayed
 * props 
 * 	- dashboard = object containing alertsLastHour, lastEventTime, numOfIPs, 
 */
export class Dashboard extends Component {
	constructor(props){
		super(props)
		this.state = {
			numAlerts: {},
			isLoading: true,
      loadingMessage: <h1 className="loading-message">Gathering your information...</h1>,
      alertMessage: "Loading...",
      alertList:[]
		}
		this.fetchAlerts = this.fetchAlerts.bind(this)
	}
	componentWillMount(){
		let tridents = this.props.tridents
		getNumOfAlerts(tridents)
		.then(result => {
			this.setState({numAlerts:result,alertList:this.props.dashboard.alerts})
		})
	}
	componentWillReceiveProps(nextProps){
		// console.log(nextProps)
		if(this.props.dashboard !== nextProps.dashboard && !this.props.newSearch ){
			let alertList = this.state.alertList
			let newAlertList = alertList.concat(nextProps.dashboard.alerts)
			this.setState({alertList:newAlertList})
		}else if(this.props.dashboard !== nextProps.dashboard && this.props.newSearch){
			console.log('inside of componentWillReceiveProps')
			console.log(nextProps.dashboard.alerts)
			this.setState({alertList:nextProps.dashboard.alerts})
			this.props.isNewSearch(false)
		}
	}
	fetchAlerts(startFrom){
		this.props.fetchAlerts(startFrom)
	}
	render(){
		console.log(this.props)
		let dashboard = this.props.dashboard
		let tridents = this.props.user.tridents
		let numAlerts = this.state.numAlerts
		let eventsLastHour = dashboard.alertsLastHour ? dashboard.alertsLastHour.toLocaleString() : 0
		let lastEventTime = dashboard.lastEventTime ? formatDate(dashboard.lastEventTime) : formatDate(new Date())
		let numOfIPs = dashboard.numOfIPs ? dashboard.numOfIPs.toLocaleString() : 0
		let numTridents = this.props.tridents.length ? this.props.tridents.length : 0
		let message = this.state.alertMessage
		return (
			<div className="dashboard-container">
				<div className="dashboard-header">
					<h2 className="dashboard-title">DASHBOARD</h2>
					<h3 className="dashboard-path">Home / Dashboard</h3>
				</div>
				<div className="dashboard-panel-container">
					<div className="dashboard-panel-container left">
						<InfoPanel icon={"fa fa-clock-o fa-4x"} title={"Events Last Hour"} results={eventsLastHour} />
						<InfoPanel icon={"fa fa-calendar fa-4x"} title={"Last Event Time"} results={lastEventTime} />
					</div>
					<div className="dashboard-panel-container right">
						<InfoPanel icon={"fa fa-heartbeat fa-4x"} title={"# of Ips Monitored"} results={numOfIPs} />
						<InfoPanel icon={"fa fa-rss fa-4x"} title={"# of Tridents Online"} results={numTridents} />
					</div>
				</div>	
				<PortalMap />
				<div className="dashboard-panel-container">
					<TridentPanel alerts={numAlerts} tridents={tridents} message={message}/>
					<TridentPanel alerts={numAlerts} tridents={tridents} message={message}/>
				</div>
				<div className="dashboard-panel-container">
					<div className="dashboard-panel">
						<AlertPanel 
					 		alerts={this.state.alertList} 
					 		title={"Current Events"} 
					 		message={message}
					 		totalAlerts={dashboard.totalAlerts}
					 		fetchAlerts={this.fetchAlerts}/>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	dashboard: state.dashboardProps,
	user: state.validUser,
	tridents: state.tridentArray,
	newSearch: state.newSearch
})

export default connect(mapStateToProps, actionCreators)(Dashboard)