import React, { Component } from 'react'
import logo from '../media/gbms-tech-logo.png'
import DCILogo from '../media/DCI_logo.jpg'
import AISLogo from '../media/AIS_logo.jpg'
import { withRouter } from 'react-router-dom'

/**
 * NavBar is used to display a friendly navigation bar at the top of the page
 * props {
 * 		sidePanelClick: function to handle opening the side panel,
 * 		displaySidePanel: opens and closes sidepanel (true or false),
 * 		user: the users data
 * }
 */
export class NavBar extends Component {
	constructor(props){
		super(props)
		this.state = {
			logo: logo
		}
		this.handleHamburgerClick = this.handleHamburgerClick.bind(this)
		this.signOut = this.signOut.bind(this)
	}
	componentWillMount(){
		// console.log(this.props.user)
		if(this.props.user.seller === "DCI_logo"){
			this.setState({logo:DCILogo})
		}else if (this.props.user.seller === "AIS_logo"){
			this.setState({logo:AISLogo})
		}else if (this.props.user.logo){
			this.setState({logo:this.props.user.logo})
		}
	}
	handleHamburgerClick(){
		this.props.sidePanelClick(!this.props.displaySidePanel)
	}
	signOut(){
		localStorage.removeItem('jwt')
		localStorage.removeItem('selectedTrident')
		this.props.history.push('/login')
	}
	render(){
		let userName = this.props.user.name || "unavailable"
		let pageLogo = this.state.logo
		return (
			<div className="nav-bar-container"> 
				<div className="nav-bar">
					<div className="nav-bar-left">
						<img
	            className="gbms-tech-logo"
	            src={pageLogo}
	            alt="Phalanx Secure"
	          />
	          <div className="hamburger-container" >
	          	<i className={'fa fa-bars fa-2x'} onClick={this.handleHamburgerClick}></i>
	          </div>
					</div>
					<div className="nav-bar-middle">
						<div className="nav-bar-title">
	          	<h2> Trident CyberSecurity Monitoring Platform </h2>
	          </div>
					</div>
          <div className="nav-bar-right">
						<i className={'fa fa-user-circle fa-lg'}></i>
						<p>{userName}</p>
						<i className={'fa fa-sign-out fa-lg'} onClick={this.signOut}></i>
          </div>
				</div>
			</div>
		)
	}
}

export default withRouter(NavBar)