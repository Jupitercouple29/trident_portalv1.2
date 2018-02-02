import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as actionCreators from '../../actions'
import PortalMap from '../../components/map'
import AlertPanel from '../../components/alert-panel'
import TridentPanel from '../../components/trident-panel'
import { getClientAlerts } from '../../functions/getClientAlerts'

export class ClientPage extends Component {
	constructor(props){
		super(props)
		this.state = {
			coords: [],
			alerts: [],
			source_ips:[],
			dest_ips:[],
			signatures:[],
			message: <div className="loading-message">Loading...</div>,
			client: localStorage.getItem('selectedClient')
		}
		this.getClientInfo = this.getClientInfo.bind(this)
	}
	componentWillMount(){
		let client = localStorage.getItem('selectedClient')
		this.getClientInfo(client)
	}
	shouldComponentUpdate(nextProps, nextState){
		let client = localStorage.getItem('selectedClient')
		if(this.state.client !== client){
			this.getClientInfo(client)
			this.setState({
				client:client,
				coords:[],
				alerts:[],
				source_ips:[],
				dest_ips:[],
				signatures:[],
				message:<div className="loading-message">Loading...</div>
			})
			return true
		}
		return true
	}
	getClientInfo(client){
		let ipArray
		let keys = Object.keys(this.props.user.ips)
		keys.map(key => {
			if(client === key){
				let trident = this.props.user.client ? this.props.user.client[key] : 2426
				localStorage.setItem('selectedTrident', trident)
				ipArray = this.props.user.ips[key]
				this.props.ips(ipArray)
				getClientAlerts(trident	,ipArray)
				.then(res => {
					let message
					if(!res.source_ips.length || !res.dest_ips.length || !res.signatures.length){
						message = <div className="unavailable-message">No Events</div>
					}
					this.setState({
						coords:res.coordsArray, 
						alerts:res.alerts, 
						source_ips:res.source_ips,
						dest_ips:res.dest_ips,
						signatures:res.signatures,
						message
					})
				})
				.catch(err => {
					console.log(err)
					this.setState({message:"Alerts unavailable"})
				})
			}
		})	
	}
	render(){
		let { coords, message, alerts, source_ips, dest_ips, signatures	} = this.state
		console.log(this.props.alerts)
		let mapMessage = <h2>Please select an alert from the map</h2>
		return (
			<div>
				<PortalMap coords={coords}/>
				<div className="dashboard-panel-container">
					<div className="dashboard-panel">
						<TridentPanel sourceIPs={source_ips} destIPs={dest_ips} alerts={signatures} message={message} />
					 	<AlertPanel alerts={alerts} title={"Current Events"} message={message}/>
					 	<AlertPanel alerts={this.props.alerts} title={"Map Alerts"} message={mapMessage}/>
					</div>
				</div>		
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	user: state.validUser,
	alerts: state.locationAlerts
})

export default withRouter(connect(mapStateToProps, actionCreators)(ClientPage))