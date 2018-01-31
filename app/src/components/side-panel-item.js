import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import * as actionCreators from '../actions'
import { connect } from 'react-redux'

export class SidePanelItem extends Component {
	constructor(props){
		super(props)
		this.state = {
			isHidden: true,
			expanded: false,
			clicked: 0,
			selected: false
		}
		this.handleItemClick = this.handleItemClick.bind(this)
		this.handleExpandedItemsClick = this.handleExpandedItemsClick.bind(this)
		this.configureItemsToDisplay = this.configureItemsToDisplay.bind(this)
	}
	handleItemClick(route){
		let lcRoute = route.toLowerCase()
		this.props.route(lcRoute)
		if(this.props.open && this.state.isHidden){
			this.setState({isHidden:false, expanded:true})
		}else if(this.props.open && !this.state.isHidden){
			this.setState({isHidden:true, expanded:false})
		}
		if(this.props.open && !this.props.items){
			this.setState({clicked:0})
			this.props.history.push(`/${lcRoute}`)
		}
	}
	handleExpandedItemsClick(route, name){
		if(this.props.client){
			let lcRoute = route.toLowerCase()
			localStorage.setItem('selectedClient', name)
			this.props.history.push(`/${lcRoute}`)
		}else{
			let tridentNum = name.slice(name.length - 4, name.length)
			localStorage.setItem('selectedTrident',tridentNum)
			let lcRoute = route.toLowerCase()
			this.props.tridentSelected(tridentNum)
			this.props.history.push(`/${lcRoute}`)
		}
		
	}
	displayItems(items, title, display){
		let itemsToDisplay = items.map((item) => {
			return <p 
							className={display}
							key={item} 
							onClick={this.handleExpandedItemsClick.bind(this,title,item)}>{item}
						</p>
		})
		return itemsToDisplay
	}
	configureItemsToDisplay(items){
		if(this.props.client){
			return Object.keys(items)
			// console.log(Object.keys(items))
			// console.log(items[keys[0]])
		}else{
			// console.log('tridents')
			return this.getTridents(items)
		}
	}
	displayClients(items){
		return Object.keys(items)
	}
	getTridents(tridents){
		let tridentArray = []
		let keys = Object.keys(tridents)
		keys.map(key=>{
			tridents[key].map(item=>{
				tridentArray.push(key + ' ' + item)
			})
		})
		return tridentArray
	}
	render(){
		let display = this.props.display
		let showItems = this.state.isHidden ? 'hidden' : 'show'
		let itemArray = this.props.items ? this.configureItemsToDisplay(this.props.items) : null 
		let icon = this.props.icon
		let title= this.props.title
		let selected = this.props.selected === this.props.title.toLowerCase() ? 'selected' : ''
		let chevron = this.state.expanded ? <i className={"fa fa-chevron-up"}></i> : <i className={"fa fa-chevron-down"}></i>
		let showChevron = this.props.items ?  chevron : null
		let displayItems = itemArray && Array.isArray(itemArray) ? this.displayItems(itemArray, title, display) : null
		return(
			<div className={`side-panel-item-container ${selected}`}>
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

export default withRouter(connect(null, actionCreators)(SidePanelItem))