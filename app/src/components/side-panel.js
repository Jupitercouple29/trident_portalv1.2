import React, { Component } from 'react'
import SidePanelItem from './side-panel-item'
import { connect } from 'react-redux'
import * as actionCreators from '../actions'
import { withRouter } from 'react-router-dom'


export class SidePanel extends Component {
	constructor(props){
		super(props)
		this.state = {
			isHidden:true,
			isActive:true,
			route:''
		}
		this.handlePanelClick = this.handlePanelClick.bind(this)
		this.routeClicked = this.routeClicked.bind(this)
	}
	componentWillReceiveProps(nextProps){
		let name = this.props.history.location.pathname
		let route = name.slice(1,name.length)
		this.setState({route})
	}
	handlePanelClick(){
		this.props.sidePanelClick(true)
	}
	routeClicked(route){
		this.setState({route:route})
	}
	render(){
		let displaySidePanel = this.props.displaySidePanel
		let display = displaySidePanel ? 'show' : 'hidden'
		return (
			<div className="side-panel-container" ref='side-panel-container' onClick={this.handlePanelClick}>
				<SidePanelItem 
					display={display}
					route={this.routeClicked}
					selected={this.state.route}
					open={displaySidePanel} 
					icon={"fa fa-home fa-lg"} 
					title={"Dashboard"}/>
				<SidePanelItem 
					display={display}
					route={this.routeClicked}
					selected={this.state.route}
					open={displaySidePanel} 
					icon={"fa fa-rss fa-lg"} 
					title={"Trident"} 
					items={this.props.user.tridents}/>
				<SidePanelItem 
					display={display}
					route={this.routeClicked}
					selected={this.state.route} 
					open={displaySidePanel} 
					icon={"fa fa-info-circle fa-lg"} 
					title={"Support"}/>
				<SidePanelItem 
					display={display} 
					route={this.routeClicked}
					selected={this.state.route}
					open={displaySidePanel} 
					icon={"fa fa-user-o fa-lg"} 
					title={"Profile"}/>
				<SidePanelItem 
					display={display} 
					route={this.routeClicked}
					selected={this.state.route}
					open={displaySidePanel} 
					icon={"fa fa-exclamation-triangle fa-lg"} 
					title={"Alerts"}/>
				<SidePanelItem 
					display={display}
					route={this.routeClicked}
					selected={this.state.route}
					open={displaySidePanel} 
					icon={"fa fa-pie-chart fa-lg"} 
					title={"Charts"}/>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	user: state.validUser,
	tridents: state.tridentArray
})

export default withRouter(connect(mapStateToProps, actionCreators)(SidePanel))