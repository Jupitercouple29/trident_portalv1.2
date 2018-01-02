import React, { Component } from 'react'
import AlertPanel from './alert-panel'

export default class AlertType extends Component {
	constructor(props){
		super(props)
		this.state = {
			alertList:[]
		}
	}
	componentWillMount(){
		this.props.alertFunc(this.props.trident,this.props.type)
		.then(res=>{
			this.setState({alertList:res.alerts})
		})
	}
	render(){
		let alert = this.state.alertList
		return(
			<div className="alert-panel-container">
				<AlertPanel alerts={alert} title={this.props.title} />
			</div>
		)
	}
}