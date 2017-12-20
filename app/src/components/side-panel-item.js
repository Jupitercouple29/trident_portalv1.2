import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

export class SidePanelItem extends Component {
	constructor(props){
		super(props)
		this.state = {
			isHidden: true,
			expanded: false
		}
		this.handleItemClick = this.handleItemClick.bind(this)
		this.handleExpandedItemsClick = this.handleExpandedItemsClick.bind(this)
	}

	handleItemClick(route){
		let lcRoute = route.toLowerCase()
		if(this.props.open && this.state.isHidden){
			this.setState({isHidden:false, expanded:true})
		}else if(this.props.open && !this.state.isHidden){
			this.setState({isHidden:true, expanded:false})
		}
		if(this.props.open && !this.props.items){
			console.log(lcRoute)
			this.props.history.push(`/${lcRoute}`)
		}
	}

	handleExpandedItemsClick(route){
		let lcRoute = route.toLowerCase()
		this.props.history.push(`/${lcRoute}`)
	}

	displayItems(items, title){
		let itemsToDisplay = items.map((item) => {
			return <p key={item} onClick={this.handleExpandedItemsClick.bind(this,title)}>{item}</p>
		})
		return itemsToDisplay
	}
	render(){
		let display = this.props.display
		let showItems = this.state.isHidden ? 'hidden' : 'show'
		let items = this.props.items
		let icon = this.props.icon
		let title= this.props.title
		let chevron = this.state.expanded ? <i className={"fa fa-chevron-up"}></i> : <i className={"fa fa-chevron-down"}></i>
		let showChevron = this.props.items ?  chevron : null
		let displayItems = items && Array.isArray(items) ? this.displayItems(items, title) : null
		return(
			<div className="side-panel-item-container">
				<div className="side-panel-item" onClick={this.handleItemClick.bind(this,title)}>
					<i className={icon}></i>
					<p className={`side-panel-item-title ${display}`}>{title}{showChevron}</p>
				</div>
				<div className={`side-panel-item-expanded ${showItems}`}>
					{displayItems}
				</div>
			</div>
		)
	}
}

export default withRouter(SidePanelItem)