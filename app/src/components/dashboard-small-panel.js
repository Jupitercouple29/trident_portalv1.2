import React, { Component } from 'react'

export default class DashboardSmallPanel extends Component {
	render(){
		let icon = this.props.icon
		let title = this.props.title
		let results = this.props.results
		return (
					<div className="info-panel-container">
						<div className="info-panel">
							<i className={icon}></i>
							<div className="info-panel-content">
								<p className="info-panel-title">{title}</p>
								<p className="info-panel-results">{results}</p>
							</div>
						</div>
					</div>
		)
	}
}