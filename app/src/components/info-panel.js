import React, { Component } from 'react' 

/**
 * InfoPanel is used to display information panels at the top of the dashboard page
 * props {
 * 		icon: fontawesome icon to display,
 * 		title: the panel's title,
 * 		results: the results to display
 * }
 */
export default class InfoPanel extends Component {
	render(){
		let icon = this.props.icon
		let title = this.props.title
		let results = this.props.results
		return(
			<div className="dashboard-panel">
				<div className="info-panel zoomIn">
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