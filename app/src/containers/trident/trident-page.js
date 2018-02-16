import React, { Component } from 'react'
import * as actionCreators from '../../actions'
import PortalMap from '../../components/map'
import TridentPanel from '../../components/trident-panel'
import AlertType from '../../components/alert-type-panel'
import AlertPanel from '../../components/alert-panel'
import { connect } from 'react-redux'
import { getTridentAlerts } from '../../functions/getTridentAlerts'
import { getAlerts } from '../../functions/getAlerts'

import './trident-page.css'

export class TridentPage extends Component {
	constructor(props){
		super(props)
		this.state = {
			trident: null,
			loading: true,
			alertMessage:<div className="loading-message"> Loading... </div>
		}
	}
	componentWillMount(){
		let trident = localStorage.getItem('selectedTrident')
		this.setState({trident})
    getTridentAlerts(trident)
    .then((res)=>{
	    if(res.alerts && res.alerts.length < 1){
	    	this.setState({alertMessage:<div className="no-tridents">Trident is unavailable </div>})
	    }
      this.props.tridentAlerts(res.alerts)
      this.props.tridentSourceIPs(res.ips)
      this.props.tridentSignatureAlerts(res.signatureAlerts)
      this.props.tridentDestIPs(res.dest_ips)
      this.setState({loading:false})
    })
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.selectedTrident !== null && nextProps.selectedTrident !== this.state.trident){
			let trident = nextProps.selectedTrident
			this.setState({trident, loading:true})
	    getTridentAlerts(trident)
	    .then((res)=>{
	    	if(res.alerts.length < 1){
	    		this.setState({alertMessage:<div className="no-tridents">Trident is unavailable </div>})
	    	}
	      this.props.tridentAlerts(res.alerts)
	      this.props.tridentSourceIPs(res.ips)
	      this.props.tridentSignatureAlerts(res.signatureAlerts)
	      this.props.tridentDestIPs(res.dest_ips)
	      this.setState({loading:false})
	    })
		}
	}
	render(){
		let { trident, loading } = this.state 
		let sourceIPs = loading ? [] : this.props.sourceIPs
		let destIPs = loading ? [] : this.props.destIPs
		let alerts = loading ? [] : this.props.signature
		let message = this.state.alertMessage
		let mapMessage = <h2>Please select an alert from the map</h2>
		return(
			<div className="trident-page-container">
				<div className="dashboard-header">
					<h2 className="dashboard-title">DASHBOARD</h2>
					<h3 className="dashboard-path">Home / Trident</h3>
				</div>	
				<PortalMap trident={trident}/>
				<TridentPanel sourceIPs={sourceIPs} destIPs={destIPs} alerts={alerts} message={message} />
				<AlertPanel alerts={this.props.alerts} title={"Map Events"} message={mapMessage}/>
				<AlertType 
					alertFunc={getAlerts} 
					trident={trident} 
					type={"alert"} 
					loading={loading}
					title={"Signature Events"} 
					message={message}/>
				<AlertType
					alertFunc={getAlerts} 
					trident={trident} 
					type={"dns"} 
					loading={loading}
					title={"DNS Events"} 
					message={message} />
				<AlertType 
					alertFunc={getAlerts} 
					trident={trident} 
					type={"http"} 
					loading={loading}
					title={"HTTP Events"} 
					message={message} />
				<AlertType 
					alertFunc={getAlerts} 
					trident={trident} 
					type={"tls"} 
					loading={loading}
					title={"TLS Events"} 
					message={message} />
				<AlertType 
					alertFunc={getAlerts} 
					trident={trident} 
					type={"fileinfo"}
					loading={loading} 
					title={"File Events"} 
					message={message} />
				<AlertType 
					alertFunc={getAlerts} 
					trident={trident} 
					type={"ssh"}
					loading={loading} 
					title={"SSH Events"} 
					message={message} />
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	sourceIPs: state.sourceIPs,
	destIPs: state.destIPs,
	signature : state.signatureAlerts,
	selectedTrident: state.selectedTrident,
	alerts: state.locationAlerts
})

export default connect(mapStateToProps, actionCreators)(TridentPage)