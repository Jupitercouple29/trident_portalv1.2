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
			loading: true
		}
	}
	componentWillMount(){
		let trident = localStorage.getItem('selectedTrident')
		this.setState({trident})
    getTridentAlerts(trident)
    .then((res)=>{
      this.props.tridentAlerts(res.alerts)
      this.props.tridentSourceIPs(res.ips)
      this.props.tridentSignatureAlerts(res.signatureAlerts)
      this.props.tridentDestIPs(res.dest_ips)
      this.setState({loading:false})
    })
    .catch((err)=>{
      console.log('there has been an error')
      console.log(err)
    })
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.selectedTrident !== null && nextProps.selectedTrident !== this.state.trident){
			// console.log('receiving new props')
			// console.log(nextProps.selectedTrident)
			// console.log(this.state.trident)
			let trident = nextProps.selectedTrident
			this.setState({trident})
	    getTridentAlerts([trident])
	    .then((res)=>{
	      this.props.tridentAlerts(res.alerts)
	      this.props.tridentSourceIPs(res.ips)
	      this.props.tridentSignatureAlerts(res.signatureAlerts)
	      this.props.tridentDestIPs(res.dest_ips)
	    })
	    .catch((err)=>{
	      console.log('there has been an error')
	      console.log(err)
	    })
		}
	}
	render(){
		let trident = this.state.trident 
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
				{this.state.loading ? "Loading ..." : <TridentPanel sourceIPs={sourceIPs} destIPs={destIPs} alerts={alerts} />}	
				{this.state.loading ? null : <AlertType alertFunc={getAlerts} trident={[trident]} type={"alert"} title={"Signature Events"}/>}
				{this.state.loading ? null : <AlertType alertFunc={getAlerts} trident={[trident]} type={"dns"} title={"DNS Events"}/>}
				{this.state.loading ? null : <AlertType alertFunc={getAlerts} trident={[trident]} type={"http"} title={"HTTP Events"}/>}
				{this.state.loading ? null : <AlertType alertFunc={getAlerts} trident={[trident]} type={"tls"} title={"TLS Events"}/>}
				{this.state.loading ? null : <AlertType alertFunc={getAlerts} trident={[trident]} type={"fileinfo"} title={"File Events"}/>}
				{this.state.loading ? null : <AlertType alertFunc={getAlerts} trident={[trident]} type={"ssh"} title={"SSH Events"}/>}
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