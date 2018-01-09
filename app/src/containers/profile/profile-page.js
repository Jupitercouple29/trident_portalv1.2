import React, { Component } from 'react'

import ('./profile-page.css')


export default class ProfilePage extends Component {
	constructor(props){
		super(props)
		this.handlePaste = this.handlePaste.bind(this)
		this.handleAllowDrop	= this.handleAllowDrop.bind(this)
		this.handleDrop = this.handleDrop.bind(this)
		this.handleDrag = this.handleDrag.bind(this)
		// this.getDataUri = this.getDataUri.bind(this)
	}
	componentDidMount(){
		
	}
	handleAllowDrop(e){
		e.preventDefault()
	}
	handleDrag(e){
		e.dataTransfer.setData("text", e.target.id)
	}
	
	handleDrop(e){
		e.preventDefault()
		// console.log('you just dropped something')
		// console.log(e)
		// console.log(e.dataTransfer)
		// console.log(e.dataTransfer)
		// console.log(e.dataTransfer)
		// console.log(e.dataTransfer.files)
		console.log(e.dataTransfer.getData('Text'))
		var image = new Image()
		image.src = e.dataTransfer.getData('Text')
		image.onload = () => {
			var canvas = document.createElement('canvas'), context = canvas.getContext('2d')
			canvas.width = image.width
			canvas.height = image.height
			context.drawImage(image, 0, 0, image.width, image.height)
			console.log(canvas.toDataURL('image/png'))
			var myImage = canvas.toDataURL('image/png')
		 	var img = document.getElementById('my-image')
      img.height = "100"
      img.width = "250"
      img.src = myImage
		}
		// this.getDataUri(e.dataTransfer.getData('Text'), (dataUri) => {
		// 	console.log(dataUri)
		// } )
	}
	handlePaste(e){
		console.log('you just pasted')
		console.log(e)
		console.log(e.clipboardData)
		console.log(e.clipboardData.dataTransfer)
		console.log(e.clipboardData.files)
		console.log(e.clipboardData.items)
		console.log(e.clipboardData.types)
		var myImage = ''
    var items = (e.clipboardData || e.originalEvent.clipboardData).items;
  	console.log(JSON.stringify(items)); // will give you the mime types
  	for (var index in items) {
	    var item = items[index];
	    console.log(item)
	    if (item.kind === 'file') {
	      var blob = item.getAsFile();
	      console.log(blob)
	      var reader = new FileReader();
	      reader.onload = function(e){
	        console.log(e.target.result)
	        myImage = e.target.result
	        var img = document.getElementById('my-image')
	        img.height = "100"
	        img.width = "250"
	        img.src = myImage
	       }; // data url!
	      	reader.readAsDataURL(blob);
	    }
  	}
		// var canvas = document.createElement('canvas')
		
		// var ctx = canvas.getContext('2d')
		// var img = new Image()
		// img.onload = () => { ctx.drawImage(img,0,0)}
		
		// // this.el.innerHTML = "Hello World"
		// myDiv.appendChild(canvas)
		
	}

	handleFocus(e){
		console.log(e)
	}
	keyBoardListener(evt) {
    if (evt.ctrlKey) {
      switch(evt.keyCode) {
        case 67: // c
          // copy(evt.target);
          console.log('c')
          break;
        case 86: // v
          // paste(evt.target);
          console.log('v')
          break;
      }
    }
	}
	render(){
		return(
			<div className="profile-page-container">
				<div className="profile-page-info-container left">
					<h3 className="profile-page-header">My Profile</h3>
					<div className="profile-page-info">
						<label className="profile-page-name-label">Name</label>
						<input className="profile-page-name-input"/>
						<label className="profile-page-email-label">E-mail</label>
						<input className="profile-page-email-input"/>
						<label className="profile-page-company-label">Company/Reseller</label>
						<input className="profile-page-company-input"/>
						<label className="profile-page-phone-label">Phone</label>
						<input className="profile-page-phone-input"/>
						<button className="profile-page-update-button">Update</button>
					</div>
				</div>
				<div className="profile-page-info-container right">
					<div 
						id="logo-container"
						ref={canvas=>this.canvas = canvas}
						tabIndex="0"
						onFocus={this.handleFocus}
						onDragOver={this.handleAllowDrop}
						onPaste={this.handlePaste}
						onDrop={this.handleDrop}>
						<img id="my-image"></img>
					</div>
					<button className="profile-page-update-logo-button">Update Logo</button>
					<div className="profile-page-notification-container">
						<label className="profile-page-timezone-label">Timezone</label>
						<input className="profile-page-timezone-input"/>
						<label className="profile-page-notification-label">Notifications</label>
						<input className="profile-page-notification-input"/>
					</div>
				</div>
			</div>
		)
	}
}