import React, { Component } from 'react'
import { updateUser } from '../../functions/updateUser'
import { auth } from '../../functions/auth'
import Timezone from '../../components/timezone'
import * as actionCreators from '../../actions'
import { connect } from 'react-redux'

import ('./profile-page.css')


export class ProfilePage extends Component {
	constructor(props){
		super(props)
		this.state = {
			name: this.props.user.name,
			email: this.props.user.email,
			phone: this.props.user.phone,
			company: this.props.user.company || "N/A",
			logo: this.props.user.logo || "",
			updateMessage: ''
		}
		this.handlePaste = this.handlePaste.bind(this)
		this.handleDrop = this.handleDrop.bind(this)
		this.onFormSubmit = this.onFormSubmit.bind(this)
	}
	componentWillMount(){
		auth(this.props.user.email)
		.then(res => {
			this.setState({
				name:res.name,
				email:res.email,
				phone:res.phone,
				company:res.company,
				logo:res.logo
			})
		})
	}
	handleDrop(e){
		e.preventDefault()
		var that = this;
		var image = new Image()
		image.src = e.dataTransfer.getData('Text')
		image.onload = () => {
			var canvas = document.createElement('canvas'), context = canvas.getContext('2d')
			canvas.width = image.width
			canvas.height = image.height
			context.drawImage(image, 0, 0, image.width, image.height)
			var myImage = canvas.toDataURL('image/png')
		 	var img = document.getElementById('my-image')
      img.height = "50"
      img.width = "150"
      img.src = myImage
      that.setState({logo:myImage})
		}
	}
	handlePaste(e){
		var myImage = ''
		var that = this
    var items = (e.clipboardData || e.originalEvent.clipboardData).items;
  	for (var index in items) {
	    var item = items[index];
	    if (item.kind === 'file') {
	      var blob = item.getAsFile();
	      var reader = new FileReader();
	      reader.onload = function(e){
	        myImage = e.target.result
	        var img = document.getElementById('my-image')
	        img.height = "50"
	        img.width = "150"
	        img.src = myImage
	        that.setState({logo:myImage})
	       }; // data url!
	      	reader.readAsDataURL(blob);
	    }
  	}		
	}
	onInputChange(type, event){
    let stateVal = { }
    stateVal[type] = event.target.value
    this.setState(stateVal)
  }
	onFormSubmit(event){
    event.preventDefault()
    let info = {
    	email: this.props.user.email,
    	newEmail: this.state.email.toLowerCase(),
    	name: this.state.name,
    	company: this.state.company,
    	phone: this.state.phone,
    	logo: this.state.logo
    }
    updateUser(info)
    .then(res => {
    	if(res === 'success'){
				this.setState({updateMessage:"Update was successful"})
    	}
    })
    .catch(err => {
			this.setState({updateMessage:"Unable to update. Please try again"})
    })
    
  }
	render(){
		let name = this.state.name
		let email = this.state.email
		let company = this.state.company
		let phone = this.state.phone ? this.state.phone : 'N/A'
		let logo = this.state.logo
		return(
			<div className="profile-page-container">
				<div className="profile-page-info-container left">
					<h3 className="profile-page-header">My Profile</h3>
					<form className="profile-page-info" onSubmit={this.onFormSubmit}>
						<label 
							className="profile-page-name-label"
							htmlFor="name">
								Name
						</label>
						<input 
							className="profile-page-name-input"
							value={name}
							onChange={this.onInputChange.bind(this,'name')}/>
						<label 
							className="profile-page-email-label"
							htmlFor="email">
								E-mail
						</label>
						<input 
							className="profile-page-email-input"
							value={email}
							onChange={this.onInputChange.bind(this,'email')}/>
						<label 
							className="profile-page-company-label"
							htmlFor="company">
								Company/Reseller
						</label>
						<input 
							className="profile-page-company-input"
							value={company}
							onChange={this.onInputChange.bind(this,'company')}/>
						<label 
							className="profile-page-phone-label"
							htmlFor="phone">
								Phone
						</label>
						<input 
							className="profile-page-phone-input"
							value={phone}
							onChange={this.onInputChange.bind(this,'phone')}/>
						<button 
							className="profile-page-update-button"
							type="submit">
								Update
						</button>
						<label className="profile-page-update-message">{this.state.updateMessage}</label>
					</form>
				</div>
				<div className="profile-page-info-container right">
					<div 
						id="logo-container"
						ref={canvas=>this.canvas = canvas}
						tabIndex="0"
						onPaste={this.handlePaste}
						onDrop={this.handleDrop}>
						{this.state.logo === '' ? <p>Company Logo</p> : ''}
						<img 
							id="my-image" 
							src={logo} 
							onPaste={this.handlePaste}>
						</img>
					</div>
					<button 
						className="profile-page-update-logo-button"
						onClick={this.onFormSubmit}>
							Update Logo
						</button>
						<p>To update logo, copy (ctrl+c) and <br/> paste (ctrl+v) your logo to the box.</p>
					<div className="profile-page-notification-container">
						<label className="profile-page-timezone-label">Timezone</label>
						<Timezone />
						<label className="profile-page-notification-label">Notifications</label>
						<select className="profile-page-notification" name="notification">
							<option value="yes">Yes</option>
							<option value="no">No</option>
						</select>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	user: state.validUser
})

export default connect(mapStateToProps, actionCreators)(ProfilePage)