import React, { Component } from 'react'

export default class Columns extends Component {
	renderInfo(info){
		let component = info.map((i, index) => {
			return <p key={index}>{i}</p>
		})
		return component
	}
	render(){
		let title = this.props.title
		let info = this.renderInfo(this.props.info)
		return(
			<div className="dashboard-alert-panel-column">
				<h3>{title}</h3>
				{info}
			</div>
		)
	}
}