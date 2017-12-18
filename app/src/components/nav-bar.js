import React, { Component } from 'react'
import logo from '../media/gbms-tech-logo.png'

export default class NavBar extends Component {
	constructor(props){
		super(props)

		this.handleHamburgerClick = this.handleHamburgerClick.bind(this)
	}

	handleHamburgerClick(){
		this.props.sidePanelClick(!this.props.displaySidePanel)
	}
	render(){
		return (
			<div className="nav-bar-container"> 
				<div className="nav-bar">
					<div className="nav-bar-left">
						<img
	            className="gbms-tech-logo"
	            src={logo}
	            alt="Phalanx Secure"
	          />
	          <div className="hamburger-container" >
	          	<i className={'fa fa-bars fa-2x'} onClick={this.handleHamburgerClick}></i>
	          </div>
					</div>
					<div className="nav-bar-middle">
						<div className="nav-bar-title">
	          	<h2> Trident Portal </h2>
	          </div>
					</div>
          <div className="nav-bar-right">
						<i className={'fa fa-user-circle fa-lg'}></i>
						<p> Willie Smith </p>
						<i className={'fa fa-sign-out fa-lg'}></i>
          </div>
				</div>
			</div>
		)
	}
}
