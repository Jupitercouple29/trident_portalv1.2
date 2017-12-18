import React, { Component } from 'react'
import SidePanelItem from './side-panel-item'

export default class SidePanel extends Component {
	constructor(props){
		super(props)
		this.state = {
			isHidden:true
		}
		this.handleOnClick = this.handleOnClick.bind(this)
	}
	handleOnClick(){
		this.props.sidePanelClick(true)
		// this.setState({isHidden:!this.state.isHidden})
	}
	render(){
		let displaySidePanel = this.props.displaySidePanel
		let display = displaySidePanel ? 'show' : 'hidden'
		return (
			<div className="side-panel-container">
				<SidePanelItem display={display} handleOnClick={this.handleOnClick} icon={"fa fa-home fa-lg"} title={"Dashboard"}/>
				<SidePanelItem display={display} handleOnClick={this.handleOnClick} icon={"fa fa-exclamation-triangle fa-lg"} title={"Alerts"}/>
				<SidePanelItem display={display} handleOnClick={this.handleOnClick} icon={"fa fa-pie-chart fa-lg"} title={"Charts"}/>
			</div>
		)
	}
}