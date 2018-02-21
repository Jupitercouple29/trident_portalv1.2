import React, { Component } from 'react'
import { formatDate } from '../functions/formatDate'
import { showDNSAlert } from '../functions/showDNSAlert'
import { showTLSAlert } from '../functions/showTLSAlert'
import { showHTTPAlert } from '../functions/showHTTPAlert'
import { showSIGAlert } from '../functions/showSIGAlert'
import { showFILEAlert } from '../functions/showFILEAlert'
import { showSSHAlert } from '../functions/showSSHAlert'

/**
 * AlertPanelItem displays each alert inside of the panel. 
 * props {
 * 		alert: a single alert,
 * 		alertKey: key used to differentiate each alert
 * }
 */
export default class AlertPanelItem extends Component {
	constructor(props){
		super(props)
		this.state = {
			isHidden: true,
			showContextMenu:false
		}
		this.handleClick = this.handleClick.bind(this)
		this.handleBlur = this.handleBlur.bind(this)
		this.handleContextMenu = this.handleContextMenu.bind(this)
	}
	//opens and closes the row of data
	handleClick(){
		this.setState({isHidden:!this.state.isHidden})
	}
	//close the context menu
	handleBlur(event){
		this.setState({showContextMenu:false})
	}
	//displays a custom context menu
	handleContextMenu(event){
  	console.log('hello onContextMenu')
  	if(window.location.pathname === '/soc'){
	  	event.preventDefault()
	  	event.persist()
	  	this.setState({showContextMenu: true}, () => {
	  		const clickX = event.clientX;
		    const clickY = event.clientY;
		    const screenW = window.innerWidth;
		    const screenH = window.innerHeight;
		    const rootW = this.root.offsetWidth;
		    const rootH = this.root.offsetHeight;
		    
		    const right = (screenW - clickX) > rootW;
		    const left = !right;
		    const top = (screenH - clickY) > rootH;
		    const bottom = !top;
		    
		    if (right) {
		    	console.log('right')
		    	console.log(clickX)
		    	console.log(clickY)
		    	console.log(event.target)
		        this.root.style.left = `${clickX + 5}px`;
		    }
		    
		    if (left) {
		    	console.log('left')
		        this.root.style.left = `${clickX - rootW - 5}px`;
		    }
		    
		    if (top) {
		    	console.log('top')
		        this.root.style.top = `${clickY + 5}px`;
		    }
		    
		    if (bottom) {
		    		console.log('bottom')
		        this.root.style.top = `${clickY - rootH - 5}px`;
		    }
	  	})
	  }
  	
  }
	render(){
		let source = this.props.alert
		let date = formatDate(source.timestamp)
		let sourceIP = source.source_ip
		let destIP = source.destination_ip
		let trident = source.filename
		let event = source.event_type
		let showEvent
		if(event === 'dns'){
			showEvent = showDNSAlert(source)
		}else if(event === 'tls'){
			showEvent = showTLSAlert(source)
		}else if(event === 'http'){
			showEvent = showHTTPAlert(source)
		}else if(event === 'alert'){
			showEvent = showSIGAlert(source)
		}else if(event === 'fileinfo'){
			showEvent = showFILEAlert(source)
		}else if(event === 'ssh'){
			showEvent = showSSHAlert(source)
		}
		return(
			<div 
				className="alert-panel-expanded-container"
				onContextMenu={this.handleContextMenu}
				tabIndex={0}
				onBlur={this.handleBlur}>
				<div key={this.props.alertKey} className="alert-panel-item-container" onClick={this.handleClick}>
					<a className="alert-panel-link">
						<div className="alert-panel-item date">
							{date}
						</div>
						<div className="alert-panel-item trident">
							{trident}
						</div>
						<div className="alert-panel-item source-ip">
							{sourceIP}
						</div>
						<div className="alert-panel-item dest-ip">
							{destIP}
						</div>
						<div className="alert-panel-item event-type">
							{event}
						</div>
					</a>
				</div>
				<div className="alert-panel-expanded-item-container">
					{this.state.isHidden ? null : showEvent }
				</div>
				{this.state.showContextMenu ? 
				<div ref={ref => {this.root = ref}} className="contextMenu">
          <div className="contextMenu--option">Delete Alert</div>
          <div className="contextMenu--option">Save Alert</div>
          <div className="contextMenu--option">Highlight Alert</div>
          <div className="contextMenu--option contextMenu--option__disabled">View full version</div>
          <div className="contextMenu--option">Settings</div>
          <div className="contextMenu--separator" />
          <div className="contextMenu--option">About this app</div>
        </div>
        :
        null}
			</div>
		)
	}
}