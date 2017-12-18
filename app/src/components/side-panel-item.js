import React, { Component } from 'react'

export default class SidePanelItem extends Component {
	constructor(props){
		super(props)
		this.state = {
			isHidden: true
		}
		this.handleItemClick = this.handleItemClick.bind(this)
	}

	handleItemClick(){
		if(this.props.open){
			this.setState({isHidden:!this.state.isHidden})
		}
	}

	displayItems(items){
		let itemsToDisplay = items.map((item) => {
			return <p key={item}>{item}</p>
		})
		return itemsToDisplay
	}
	render(){
		let display = this.props.display
		let showItems = this.state.isHidden ? 'hidden' : 'show'
		let items = this.props.items
		let displayItems = items && Array.isArray(items) ? this.displayItems(items) : null
		return(
			<div className="side-panel-item-container">
				<div className="side-panel-item" onClick={this.handleItemClick}>
					<i className={this.props.icon}></i>
					<p className={display}>{this.props.title}</p>
				</div>
				<div className={`side-panel-item-expanded ${showItems}`}>
					{displayItems}
				</div>
			</div>
		)
	}
}