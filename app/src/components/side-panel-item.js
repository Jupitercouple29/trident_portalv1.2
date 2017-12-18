import React, { Component } from 'react'

export default class SidePanelItem extends Component {
	constructor(props){
		super(props)
		this.state = {
			isHidden: true
		}
	}
	render(){
		let display = this.props.display
		return(
			<div className="side-panel-item" onClick={this.props.handleOnClick}>
				<i className={this.props.icon}></i>
				<p className={display}>{this.props.title}</p>
			</div>
		)
	}
}