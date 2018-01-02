import React, { Component } from 'react'

export default class Rows extends Component {
	renderRow(props){
		let row = props.titles.map((title,i)=>{
			return <div key={"dashboard" + title} className="dashboard-panel-row-item">
							<h3>{title}</h3>
							<p>{props.info[i]}</p>
						</div>
		})
		return row
	}
	render(){
		let row = this.renderRow(this.props)
		return (
			<div className="dashboard-panel-row">
				{row}
			</div>
		)
	}
}