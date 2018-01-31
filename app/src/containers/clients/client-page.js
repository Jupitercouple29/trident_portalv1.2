import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as actionCreators from '../../actions'
import PortalMap from '../../components/map'
import AlertPanel from '../../components/alert-panel'
import { getClientAlerts } from '../../functions/getClientAlerts'

export class ClientPage extends Component {
	constructor(props){
		super(props)
		this.state = {
			coords: [],
			alerts: [],
			message: "Loading...",
			client: localStorage.getItem('selectedClient')
		}
		this.getClientInfo = this.getClientInfo.bind(this)
	}
	componentWillMount(){
		let client = localStorage.getItem('selectedClient')
		this.getClientInfo(client)
	}
	shouldComponentUpdate(nextProps, nextState){
		console.log(this.props.history.location)
		let client = localStorage.getItem('selectedClient')
		if(this.state.client !== client){
			console.log('shouldComponentUpdate')
			this.getClientInfo(client)
			this.setState({client:client,coords:[],alerts:[]})
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
				console.log(trident)
				ipArray = this.props.user.ips[key]
				getClientAlerts(trident	,ipArray)
				.then(res => {
					this.setState({coords:res.coordsArray, alerts:res.alerts})
					// console.log(res)
				})
				.catch(err => {
					// console.log(err)
					this.setState({message:"Alerts unavailable"})
				})
			}
		})	
	}
	render(){
		// console.log(this.props.user.ips)
		let { coords, message, alerts	} = this.state

		console.log(coords)
		return (
			<div>
				<PortalMap coords={coords}/>
				<div className="dashboard-panel-container">
					<div className="dashboard-panel">
					 <AlertPanel alerts={alerts} title={"Current Events"} message={message}/>
					</div>
				</div>		
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	user: state.validUser
})

export default withRouter(connect(mapStateToProps, actionCreators)(ClientPage))