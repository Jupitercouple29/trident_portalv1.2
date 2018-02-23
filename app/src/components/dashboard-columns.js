import React, { Component } from 'react'

/**
 * Columns is used to display columns of data.
 * props {
 * 		message: the message to display if loading or no data,
 * 		clicked: function to handle onclick,
 * 		name: added to the className of the column,
 * 		title: the column title,
 * 		size: the size of the column {small, medium, large}
 * }
 */
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
	// renders the info into the column
	renderInfo(info){
		let component = info.map((i, index) => {
			return <p 
							onClick={this.props.clicked ? this.props.clicked.bind(this,this.props.name,i) : null} 
							className="dashboard-columns-item"
							key={index}>
								{i.toLocaleString()}
							</p>
		})
		return component
	}
	render(){
		let title = this.props.title
		let info = this.props.info ? this.renderInfo(this.props.info) : null
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