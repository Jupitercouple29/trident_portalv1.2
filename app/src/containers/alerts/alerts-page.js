import React, { Component } from 'react' 
import AlertPanel from '../../components/alert-panel'
import PortalMap from '../../components/map'
import * as actionCreators from '../../actions'
import { connect } from 'react-redux'

import './alerts-page.css'

export class AlertsPage extends Component {
	constructor(props){
		super(props)
		this.state = {
			heading:<h1>Please select an Alert from the map above</h1>
		}
	}
	componentWillReceiveProps(nextProps){
		if(this.props.alerts !== nextProps.alerts){
			let location = nextProps.alerts[0]._source.geoip.location
    	let lat = location ? location.lat : null
    	let lon = location ? location.lon : null
			this.setState({heading:<h1>Map Alerts for Latitude: {lat} and Longitude: {lon}</h1>})
		}
	}
	render(){
		let alerts = this.props.alerts
		let trident = localStorage.getItem('selectedTrident') 
    let alertHeading = this.state.heading
		return(
			 <div className="map-alerts-container">
			 	<div className="dashboard-header">
					<h2 className="dashboard-title">DASHBOARD</h2>
					<h3 className="dashboard-path">Home / Alerts</h3>
				</div>
			 	<PortalMap trident={trident}/>
        <div className="map-alerts-header">
        	{alertHeading} 
        </div>
        <AlertPanel alerts={alerts} />
      </div>
		)
	}
}

const mapStateToProps = (state) => ({
	alerts: state.locationAlerts
})

export default connect(mapStateToProps, actionCreators)(AlertsPage)