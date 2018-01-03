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
	}
	handleItemClick(route){
		let lcRoute = route.toLowerCase()
		this.props.route(lcRoute)
		if(this.props.open && this.state.isHidden){
			// console.log('in hidden')
			this.setState({isHidden:false, expanded:true})
		}else if(this.props.open && !this.state.isHidden){
			// console.log('in not hidden')
			this.setState({isHidden:true, expanded:false})
		}
		if(this.props.open && !this.props.items){
			// console.log(lcRoute)
			this.setState({clicked:0})
			this.props.history.push(`/${lcRoute}`)
		}
	}
	handleExpandedItemsClick(route, trident){
		let tridentNum = trident.slice(trident.length - 4, trident.length)
		// console.log(tridentNum)
		localStorage.setItem('selectedTrident',tridentNum)
		let lcRoute = route.toLowerCase()
		this.props.tridentSelected(tridentNum)
		// if(this.state.clicked === 0 || this.state.clicked === tridentNum){
			// console.log('clicked = 0')
			// console.log(this.state.clicked++)
			this.props.history.push(`/${lcRoute}`)
			// this.setState({clicked:tridentNum})
		// }else{
		// 	console.log('clicked is greater than 0')
		// 	this.props.history.push(`/${lcRoute}`)
		// 	window.location.reload()
		// }	
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
		let itemArray = this.props.items ? this.getTridents(this.props.items) : null 
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