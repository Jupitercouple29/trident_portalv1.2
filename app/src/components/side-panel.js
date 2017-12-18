import React, { Component } from 'react'
import SidePanelItem from './side-panel-item'

export default class SidePanel extends Component {
	constructor(props){
		super(props)
		this.state = {
			isHidden:true
		}
		this.handleOnClick = this.handleOnClick.bind(this)
		this.handlePanelClick = this.handlePanelClick.bind(this)
	}
	handlePanelClick(){
		this.props.sidePanelClick(true)
		// console.log(document.getElementsByClassName('side-panel-container')[0].clientWidth)
	}
	handleOnClick(){
		this.props.sidePanelClick(true)
		// this.setState({isHidden:!this.state.isHidden})
	}
	render(){
		let displaySidePanel = this.props.displaySidePanel
		let display = displaySidePanel ? 'show' : 'hidden'
		
		return (
			<div className="side-panel-container" ref='side-panel-container' onClick={this.handlePanelClick}>
				<SidePanelItem display={display} open={displaySidePanel} icon={"fa fa-home fa-lg"} title={"Dashboard"}/>
				<SidePanelItem display={display} open={displaySidePanel} icon={"fa fa-rss fa-lg"} title={"Trident"} items={["Trident 2411", "Trident 2422"]}/>
				<SidePanelItem display={display} open={displaySidePanel} icon={"fa fa-info-circle fa-lg"} title={"Support"}/>
				<SidePanelItem display={display} open={displaySidePanel} icon={"fa fa-user-o fa-lg"} title={"Profile"}/>
				<SidePanelItem display={display} open={displaySidePanel} icon={"fa fa-exclamation-triangle fa-lg"} title={"Alerts"}/>
				<SidePanelItem display={display} open={displaySidePanel} icon={"fa fa-pie-chart fa-lg"} title={"Charts"}/>
			</div>
		)
	}
}