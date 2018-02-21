import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as actionCreators from '../../actions'
import PortalMap from '../../components/map'
import AlertPanel from '../../components/alert-panel'
import TridentPanel from '../../components/trident-panel'
import { getClientAlerts } from '../../functions/getClientAlerts'

/**
 * Client Page is used to search alerts by client IP's
 */
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
		//get the client name ex. VADAF
		let client = localStorage.getItem('selectedClient')
		this.getClientInfo(client)
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.newSearch){
			let client = localStorage.getItem('selectedClient')
			console.log('componentWillReceiveProps in the client page')
			this.getClientInfo(client)
			this.setState({
				coords:[],
				alerts:[],
				source_ips:[],
				dest_ips:[],
				signatures:[],
				message:<div className="loading-message">Loading...</div>
			})
		}
	}
	shouldComponentUpdate(nextProps, nextState){
		let client = localStorage.getItem('selectedClient')
		//if user selects another client than update the panel
		if(this.state.client !== client){
			this.getClientInfo(client)
			//reset the data to [] to allow panel to load new data
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
	//call to back end to fetch data for the provided client
	getClientInfo(client){
		let ipArray
		//the list of client names ex. ['VADOF','VADVS','VITA AD']
		let keys = Object.keys(this.props.user.ips)
		keys.map(key => {
			//if client name equals one of the keys
			if(client === key){
				//get the client trident that matches the name supplied
				let trident = this.props.user.client ? this.props.user.client[key] : 2426
				//set the selected trident
				localStorage.setItem('selectedTrident', trident)
				//a list of ips that belongs to this client
				ipArray = this.props.user.ips[key]
				//store the list of ips to application state
				this.props.ips(ipArray)
				let info = {
					trident: trident,
					ipArray: ipArray,
					queryDate: this.props.queryDate
				}
				//call to backend to get the alerts for the given trident and list of ips
				getClientAlerts(info)
				.then(res => {
					let message
					//if no results display message of no events
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
					this.props.isNewSearch(false)
				})
				.catch(err => {
					console.log(err)
					this.setState({message:"Alerts unavailable"})
				})
			}
		})	
	}
	render(){
		console.log(this.props)
		let { coords, message, alerts, source_ips, dest_ips, signatures	} = this.state
		let mapMessage = <h2>Please select an alert from the map</h2>
		/**
		 * PortalMap displays the alerts for the provided client
		 * Trident panel displays the Source IP's, Signature Alerts, and Destination IP's
		 * First Alert Panel displays the most current alerts from the query
		 * Second Alert Panel is for map alerts, when a user clicks on an alert from the map
		 * - this.props.alerts comes from the reducer locationAlerts and action mapAlerts that is 
		 *   triggered in the map component.
		 */
		return (
			<div>
				<PortalMap coords={coords}/>
				<div className="dashboard-panel-container">
					<div className="dashboard-panel">
						<TridentPanel sourceIPs={source_ips} destIPs={dest_ips} alerts={signatures} message={message} />
					 	<AlertPanel alerts={alerts} title={"Current Events"} message={message}/>
					 	<AlertPanel alerts={this.props.alerts} title={"Map Events"} message={mapMessage}/>
					</div>
				</div>		
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	user: state.validUser,
	alerts: state.locationAlerts,
	queryDate: state.queryDate,
	newSearch: state.newSearch
})

export default withRouter(connect(mapStateToProps, actionCreators)(ClientPage))