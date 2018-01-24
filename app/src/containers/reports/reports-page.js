import React, { Component } from 'react'
import "./reports-page.css"

export default class ReportsPage extends Component {
	constructor(props){
		super(props)

		this.handlePaste = this.handlePaste.bind(this)
		this.startRead = this.startRead.bind(this)
	}
	componentDidMount(){
		let dropingDiv = document.getElementById('draghere')
		dropingDiv.addEventListener('dragover', this.dragover, false)
		dropingDiv.addEventListener('dragenter', this.dragenter, false)
		dropingDiv.addEventListener('drop', this.startReadFromDrag, false)
	}
	handlePaste(e){
		console.log(e)
		e.preventDefault()
		console.log(e.clipboardData.getData('text/plain'))
		var myImage = ''
		var that = this
    var items = (e.clipboardData || e.originalEvent.clipboardData).items;
    console.log(items)
  	for (var index in items) {
	    var item = items[index];
	    console.log(item)
	    if (item.kind === 'string'){
	    	let area = document.getElementById('admin-panel-pdf')
	    	area.innerHTML = e.clipboardData.getData('text/plain')
	    }
	    if (item.kind === 'file') {
	      var blob = item.getAsFile();
	      console.log(blob)
	      var reader = new FileReader();
	      reader.onload = function(e){
	        myImage = e.target.result
	        console.log(myImage)
	       }; // data url!
	      	reader.readAsDataURL(blob);
	    }
  	}		
	}
	dragenter(e){
		e.stopPropagation()
		e.preventDefault()
	}
	dragover(e){
		e.stopPropagation()
		e.preventDefault()
	}
	startRead(e){
		var file = document.getElementById('admin-panel-pdf').files[0]
		if(file){
			this.getAsText(file)
			// console.log(file)
			// window.open(file.name, '_blank', 'fullscreen=yes')
			alert("Name: " + file.name + "\n" + "Last Modified Date: " + file.lastModifiedDate)
		}
	}
	startReadFromDrag(e){
		e.stopPropagation()
		e.preventDefault()
		let file = e.dataTransfer.files[0]
		if(file){
			let fileAttr = "Name: " + file.name + "\n" + "Last Modified Date: " + file.lastModifiedDate
			this.getAsText(file)

			// document.getElementById('draghere').text(fileAttr)
			alert(fileAttr) 
		}
	
	}
	getAsText(readFile){
		let reader = new FileReader()
		reader.readAsText(readFile, "UTF-8")
		reader.onload = this.loaded 
	}
	loaded(e){
		alert("File Loaded Successfully")
		let fileString = e.target.result
		let area = document.getElementById('op')
		area.innerHTML= fileString
	}
	render(){
		
		return(
			<div>
				<div className="dashboard-header">
					<h2 className="dashboard-title">DASHBOARD</h2>
					<h3 className="dashboard-path">Home / Reports</h3>
				</div>
				<h1>Reports Page Under Contruction</h1>
				<div className="reports-page-container">
					<div className="reports-page admin-panel">
						<label htmlFor="name" className="admin-panel-label name">Name</label>
						<input className="admin-panel-input name"></input>
						<label htmlFor="email" className="admin-panel-label email">Email</label>
						<input className="admin-panel-input email"></input>
						<input 
							className="admin-panel-pdf"
							tabIndex="0"
							type="file"
							id="admin-panel-pdf"
							onPaste={this.handlePaste}>
						</input>
						<button onClick={this.startRead}>Read</button>
						<div id="draghere">Drop Files Here</div>
						<div id="op"></div>
						<p>Copy (ctrl+c) and paste (ctrl+v) pdf file above</p>
					</div>
				</div>
			</div>
		)
	}
}