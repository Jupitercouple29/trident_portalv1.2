import React, { Component } from 'react'
import * as actionCreators from '../../actions'
import PortalMap from '../../components/map'
import TridentPanel from '../../components/trident-panel'
import AlertType from '../../components/alert-type-panel'
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
	componentWillReceiveProps(nextProps){
		if(nextProps.selectedTrident !== null && nextProps.selectedTrident !== this.state.trident){
			let trident = nextProps.selectedTrident
			this.setState({trident})
	    getTridentAlerts(trident)
	    .then((res)=>{
	    	if(res.alerts.length < 1){
	    		this.setState({alertMessage:<div className="no-tridents">Trident is unavailable </div>})
	    	}
	      this.props.tridentAlerts(res.alerts)
	      this.props.tridentSourceIPs(res.ips)
	      this.props.tridentSignatureAlerts(res.signatureAlerts)
	      this.props.tridentDestIPs(res.dest_ips)
	    })
		}
	}
	render(){
		let trident = this.state.trident 
		let sourceIPs = this.props.sourceIPs
		let destIPs = this.props.destIPs
		let alerts = this.props.signature
		let message = this.state.alertMessage
		return(
			<div className="trident-page-container">
				<div className="dashboard-header">
					<h2 className="dashboard-title">DASHBOARD</h2>
					<h3 className="dashboard-path">Home / Trident</h3>
				</div>	
				<PortalMap trident={trident}/>
				<TridentPanel sourceIPs={sourceIPs} destIPs={destIPs} alerts={alerts} message={message} />
				<AlertType alertFunc={getAlerts} trident={trident} type={"alert"} title={"Signature Events"} message={message}/>
				<AlertType alertFunc={getAlerts} trident={trident} type={"dns"} title={"DNS Events"} message={message} />
				<AlertType alertFunc={getAlerts} trident={trident} type={"http"} title={"HTTP Events"} message={message} />
				<AlertType alertFunc={getAlerts} trident={trident} type={"tls"} title={"TLS Events"} message={message} />
				<AlertType alertFunc={getAlerts} trident={trident} type={"fileinfo"} title={"File Events"} message={message} />
				<AlertType alertFunc={getAlerts} trident={trident} type={"ssh"} title={"SSH Events"} message={message} />
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	sourceIPs: state.sourceIPs,
	destIPs: state.destIPs,
	signature : state.signatureAlerts,
	selectedTrident: state.selectedTrident
})

export default connect(mapStateToProps, actionCreators)(TridentPage)