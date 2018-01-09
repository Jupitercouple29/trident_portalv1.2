import React, { Component } from 'react'
import TridentPanel from '../../components/dashboard-trident-panel'
import InfoPanel from '../../components/info-panel'
import PortalMap from '../../components/map'
import AlertPanel from '../../components/alert-panel'
import LoadingPage from '../../components/loading-page'
import { getTridents } from '../../functions/getTridents'
import { getNumOfAlerts } from '../../functions/getNumOfAlerts'
import { formatDate } from '../../functions/formatDate'
import * as actionCreators from '../../actions'
import { connect } from 'react-redux'
import './dashboard.css'

export class Dashboard extends Component {
	constructor(props){
		super(props)
		this.state = {
			numAlerts: {},
			isLoading: true,
      loadingMessage: <h1 className="loading-message">Gathering your information...</h1>,
      alertMessage: "Loading..."
		}
	}
	componentWillMount(){
		let tridents = this.props.tridents
		getNumOfAlerts(tridents)
		.then(result => {
			this.setState({numAlerts:result})
		})
	}

	render(){
		// console.log(this.props.dashboardInfo)
		let eventsLastHour = this.props.dashboard.alertsLastHour ? this.props.dashboard.alertsLastHour.toLocaleString() : 0
		let lastEventTime = this.props.dashboard.lastEventTime ? formatDate(this.props.dashboard.lastEventTime) : formatDate(new Date())
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
						<InfoPanel icon={"fa fa-heartbeat fa-4x"} title={"# of Ips Monitored"} results={"55"} />
						<InfoPanel icon={"fa fa-rss fa-4x"} title={"# of Tridents Online"} results={numTridents} />
					</div>
				</div>	
				<PortalMap />
				<div className="dashboard-panel-container">
					<TridentPanel alerts={this.state.numAlerts} tridents={this.props.user.tridents} message={message}/>
					<TridentPanel alerts={this.state.numAlerts} tridents={this.props.user.tridents} message={message}/>
				</div>
				<div className="dashboard-panel-container">
					<div className="dashboard-panel">
					 <AlertPanel alerts={this.props.dashboard.alerts} title={"Current Events"} message={message}/>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	dashboard: state.dashboardProps,
	user: state.validUser,
	tridents: state.tridentArray
})

export default connect(mapStateToProps, actionCreators)(Dashboard)