import React, { Component } from 'react'

export default class ProfilePage extends Component {
	constructor(props){
		super(props)
		this.handlePaste = this.handlePaste.bind(this)
		this.handleAllowDrop	= this.handleAllowDrop.bind(this)
		this.handleDrop = this.handleDrop.bind(this)
		this.handleDrag = this.handleDrag.bind(this)
	}
	componentDidMount(){
		// var copy = document.queryCommandSupported('copy')
		// console.log(copy)
		// var canvas = document.getElementById('my_canvas')
		// var ctx = canvas.getContext("2d")
		
	}
	handleAllowDrop(e){
		e.preventDefault()
	}
	handleDrag(e){
		e.dataTransfer.setData("text", e.target.id)
	}
	handleDrop(e){
		e.preventDefault()
		var data = e.dataTransfer.getData('text')
		console.log(data)
		var canvas = document.getElementById('my_canvas')
		canvas.appendChild(<div>Hello</div>)
	}
	handlePaste(e){
		console.log('you just pasted')
		console.log(e)
		console.log(e.clipboardData)
		console.log(e.clipboardData.files)
		console.log(e.clipboardData.items)
		console.log(e.clipboardData.types)
		this.el = document.createElement('div',null,'Hello World')
		var canvas = document.getElementById('my_canvas')
		this.el.innerHTML = "Hello World"
		canvas.appendChild(this.el)
		
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
			<div>
				<div 
					style={{height:"400px",width:"100%",border:"1px solid grey"}}
					id="my_canvas"
					ref={canvas=>this.canvas = canvas}
					tabIndex="0"
					onFocus={this.handleFocus}
					onDragOver={this.handleAllowDrop}
					onPaste={this.handlePaste}
					onDrop={this.handleDrop}>
				</div>
					
			</div>
		)
	}
}