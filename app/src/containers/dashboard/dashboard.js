import React, { Component } from 'react'
import DashboardSmallPanel from '../../components/dashboard-small-panel'
import DashboardMediumPanel from '../../components/dashboard-medium-panel'
import PortalMap from '../../components/map'
import './dashboard.css'

export default class Dashboard extends Component {
	constructor(props){
		super(props)
		this.state = {

		}
	}

	render(){

		return (
			<div className="dashboard-container">
				<div className="dashboard-header">
					<h2 className="dashboard-title">DASHBOARD</h2>
					<h3 className="dashboard-path">Home / Dashboard</h3>
				</div>
				<div className="dashboard-info-panel-container">
					<DashboardSmallPanel icon={"fa fa-clock-o fa-4x"} title={"Events Last Hour"} results={"57,830"} />
					<DashboardSmallPanel icon={"fa fa-calendar fa-4x"} title={"Last Event Time"} results={"December 18, 2017"} />
					<DashboardSmallPanel icon={"fa fa-heartbeat fa-4x"} title={"# of Ips Monitored"} results={"55"} />
					<DashboardSmallPanel icon={"fa fa-rss fa-4x"} title={"# of Tridents Online"} results={"5"} />
				</div>	
				<PortalMap />
				<div className="dashboard-alert-panel-container">
					<div className="dashboard-alert-panel">
						<div className="dashboard-alert-panel-column">
							<h3>Tridents</h3>
							<p>ATU 2409</p>
							<p>ATU 2411</p>
						</div>
						<div className="dashboard-alert-panel-column">
							<h3>Alerts</h3>
							<p>1,444</p>
							<p>444</p>
						</div>
					</div>
					<div className="dashboard-alert-panel">
						<div className="dashboard-alert-panel-column">
							<h3>Tridents</h3>
							<p>ATU 2409</p>
							<p>ATU 2411</p>
						</div>
						<div className="dashboard-alert-panel-column">
							<h3>Alerts</h3>
							<p>1,444</p>
							<p>444</p>
						</div>
					</div>
				</div>
			</div>
		)
	}
}