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
		let size = this.props.size || "small"
		let name = this.props.name || ""
		return(
			<div className={`dashboard-panel-column ${name} ${size}`}>
				<h3>{title}</h3>
				{info}
			</div>
		)
	}
}