import React, { Component } from 'react'
import * as actionCreators from '../../actions'
import PortalMap from '../../components/map'
import TridentPanel from '../../components/trident-panel'
import AlertType from '../../components/alert-type-panel'
import { connect } from 'react-redux'
// import { getTridentAlerts } from '../../functions/getTridentAlerts'
import { getAlerts } from '../../functions/getAlerts'

import './trident-page.css'

export class TridentPage extends Component {
	componentWillMount(){
		// let trident = localStorage.getItem('selectedTrident')
  //   getTridentAlerts([trident])
  //   .then((res)=>{
  //     this.props.tridentAlerts(res.alerts)
  //     this.props.tridentSourceIPs(res.ips)
  //     this.props.tridentSignatureAlerts(res.signatureAlerts)
  //     this.props.tridentDestIPs(res.dest_ips)
  //   })
  //   .catch((err)=>{
  //     console.log('there has been an error')
  //     console.log(err)
  //   })
	}
	render(){
		let trident = localStorage.getItem('selectedTrident') 
		let sourceIPs = this.props.sourceIPs
		let destIPs = this.props.destIPs
		let alerts = this.props.signature
		return(
			<div className="trident-page-container">
				<div className="dashboard-header">
					<h2 className="dashboard-title">DASHBOARD</h2>
					<h3 className="dashboard-path">Home / Trident</h3>
				</div>	
				<PortalMap trident={trident}/>
				<TridentPanel sourceIPs={sourceIPs} destIPs={destIPs} alerts={alerts} />
				<AlertType alertFunc={getAlerts} trident={[trident]} type={"dns"} title={"DNS Events"}/>
				<AlertType alertFunc={getAlerts} trident={[trident]} type={"http"} title={"HTTP Events"}/>
				<AlertType alertFunc={getAlerts} trident={[trident]} type={"tls"} title={"TLS Events"}/>
				<AlertType alertFunc={getAlerts} trident={[trident]} type={"alert"} title={"Signature Events"}/>
				<AlertType alertFunc={getAlerts} trident={[trident]} type={"fileinfo"} title={"File Events"}/>
				<AlertType alertFunc={getAlerts} trident={[trident]} type={"ssh"} title={"SSH Events"}/>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	sourceIPs: state.sourceIPs,
	destIPs: state.destIPs,
	signature : state.signatureAlerts
})

export default connect(mapStateToProps, actionCreators)(TridentPage)