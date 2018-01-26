import React, { Component } from 'react'
import { getReports } from '../../functions/getReports'
import { postReport } from '../../functions/postReport'
import { connect } from 'react-redux'
import "./reports-page.css"

export class ReportsPage extends Component {
	constructor(props){
		super(props)
		this.state = {
			pdf: '',
			trident:'',
			email:''
		}
		this.handlePaste = this.handlePaste.bind(this)
		this.startRead = this.startRead.bind(this)
		this.startReadFromDrag = this.startReadFromDrag.bind(this)
	}
	componentWillMount(){
		getReports(this.props.user.email)
		.then(res => {
			console.log(res)
			this.setState({
				files: res
			})
		})
		.catch(err => {
			console.log(err)
			this.setState({
				files: 'No files listed'
			})
		})
	}
	componentDidMount(){
		let dropingDiv = document.getElementById('draghere')
		dropingDiv.addEventListener('dragover', this.dragover, false)
		dropingDiv.addEventListener('dragenter', this.dragenter, false)
		dropingDiv.addEventListener('drop', this.startReadFromDrag, false)
	}
	onInputChange(type, event){
    let stateVal = { }
    stateVal[type] = event.target.value
    this.setState(stateVal)
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
			// let fileURL = window.URL.createObjectURL(file)
			// console.log(fileURL)
			// window.open(file,'resizable,scrollbar')
			// this.setState({
			// 	pdf:`http://docs.google.com/gview?url=${fileURL}.pdf&embedded=true`
			// })
			let info = {
				email:this.props.user.email,
				file: file
			}
			console.log(info)
			postReport(info)
			.then(res => {
				console.log(res)
			})
			.catch(err => {
				console.log(err.error)
			})
			this.getAsText(file)
			// console.log(file)
			// window.open(file.name, '_blank', 'fullscreen=yes')
			// alert("Name: " + file.name + "\n" + "Last Modified Date: " + file.lastModifiedDate)
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
		// area.innerHTML= fileString
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
						<label htmlFor="name" className="admin-panel-label name">Trident</label>
						<input 
							id="name"
							type="input"
							className="admin-panel-input name"
							placeholder="ex: Perc 2411"
							value={this.state.trident}
							onChange={this.onInputChange.bind(this,'trident')}
						></input>
						<label htmlFor="email" className="admin-panel-label email">User's Email</label>
						<input 
							id="email"
							type="email"
							className="admin-panel-input email"
							placeholder="email@email.com"
							value={this.state.email}
							onChange={this.onInputChange.bind(this,'email')}
						></input>
						<input 
							className="admin-panel-pdf"
							tabIndex="0"
							type="file"
							id="admin-panel-pdf"
							onPaste={this.handlePaste}>
						</input>
						<button onClick={this.startRead}>Read</button>
						<div 
							id="draghere"
							onDragOver={this.dragover}
							onDragEnter={this.dragenter}
							onDrop={this.startReadFromDrag}
						>Drop Files Here
						</div>
						<div id="op"></div>
						<p>Copy (ctrl+c) and paste (ctrl+v) pdf file above</p>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	user: state.validUser
})

export default connect(mapStateToProps)(ReportsPage)
// <iframe src={this.state.pdf} style={{width:"600px",height:"500px"}} frameboarder="0"></iframe>
