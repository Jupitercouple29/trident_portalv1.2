import React, { Component } from 'react'
import TridentPanel from '../../components/dashboard-trident-panel'
import InfoPanel from '../../components/info-panel'
import PortalMap from '../../components/map'
import AlertPanel from '../../components/dashboard-alert-panel'
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
				<div className="dashboard-panel-container">
					<InfoPanel icon={"fa fa-clock-o fa-4x"} title={"Events Last Hour"} results={"57,830"} />
					<InfoPanel icon={"fa fa-calendar fa-4x"} title={"Last Event Time"} results={"December 18, 2017"} />
					<InfoPanel icon={"fa fa-heartbeat fa-4x"} title={"# of Ips Monitored"} results={"55"} />
					<InfoPanel icon={"fa fa-rss fa-4x"} title={"# of Tridents Online"} results={"5"} />
				</div>	
				<PortalMap />
				<div className="dashboard-panel-container">
					<TridentPanel/>
					<TridentPanel/>
				</div>
				<div className="dashboard-panel-container">
					<div className="dashboard-panel">
						<div className="alert-panel">
							
						</div>
					</div>
				</div>
			</div>
		)
	}
}