import React, { Component } from 'react'

export default class Columns extends Component {
	constructor(props){
		super(props)
		this.state = {
			message:this.props.message
		}
		this.renderInfo = this.renderInfo.bind(this)
	}
	componentWillReceiveProps(nextProps){
		if(this.props.message !== nextProps.message){
			this.setState({message:nextProps.message})
		}
	}
	renderInfo(info){
		let component = info.map((i, index) => {
			return <p 
							onClick={this.props.clicked ? this.props.clicked.bind(this,this.props.name,i) : null} 
							key={index}>
								{i}
							</p>
		})
		return component
	}
	render(){
		let title = this.props.title
		let info = this.renderInfo(this.props.info)
		let size = this.props.size || "small"
		let name = this.props.name || ""
		let message = this.props.message
		let showInfo = info && info.length > 1 ? info : message
		return(
			<div className={`dashboard-panel-column ${name} ${size}`}>
				<h3>{title}</h3>
				{showInfo}
			</div>
		)
	}
}