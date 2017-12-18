import React, { Component } from 'react'

export default class DashboardMediumPanel extends Component {
	constructor(props){
		super(props)
		this.state = {

		}
		this.columns = this.columns.bind(this)
	}
	columns(num){
		let element;
		for(var i = 0; i = num; i++){
			console.log('in the loop')
			element = <div className="dashboard-alert-panel-column">
									<h3>Tridents</h3>
									<p>ATU 2409</p>
									<p>ATU 2411</p>
								</div>
			console.log(element)
			return element
		}
		
	}
	render(){
		let num = this.props.columns
		let columnItems = num ? this.columns(num) : null
		return(
			<div className="dashboard-alert-panel">
				{columnItems}
			</div>
		)
	}
}