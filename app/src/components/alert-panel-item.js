import React, { Component } from 'react'
import { formatDate } from '../functions/formatDate'
import { showDNSAlert } from '../functions/showDNSAlert'
import { showTLSAlert } from '../functions/showTLSAlert'
import { showHTTPAlert } from '../functions/showHTTPAlert'
import { showSIGAlert } from '../functions/showSIGAlert'
import { showFILEAlert } from '../functions/showFILEAlert'
import { showSSHAlert } from '../functions/showSSHAlert'

export default class AlertPanelItem extends Component {
	constructor(props){
		super(props)
		this.state = {
			isHidden: true
		}
		this.handleClick = this.handleClick.bind(this)
	}
	handleClick(){
		this.setState({isHidden:!this.state.isHidden})
	}
	render(){
		let source = this.props.alert
		let date = formatDate(source.timestamp)
		let sourceIP = source.source_ip
		// let sourcePort = source.source_port
		// let proto = source.proto
		let destIP = source.destination_ip
		// let destPort = source.destination_port
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
			<div className="alert-panel-expanded-container">
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
			</div>
		)
	}
}