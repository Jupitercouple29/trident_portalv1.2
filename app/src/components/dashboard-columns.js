import React, { Component } from 'react'

export default class Columns extends Component {
	constructor(props){
		super(props)
		this.renderInfo = this.renderInfo.bind(this)
	}
	renderInfo(info){
		let component = info.map((i, index) => {
			return <p 
							onClick={this.props.clicked ? this.props.clicked.bind(this,this.props.name,i) : null} 
							key={index}>
								{i}
							</p>
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