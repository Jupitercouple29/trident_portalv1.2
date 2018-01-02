import React, { Component } from 'react' 
import Columns from './dashboard-columns'

export default class TridentPanel extends Component {
	
	render(){
		let tridentArray = []
		let alertsArray = []
		let keys = this.props.tridents
		let alertKeys = Object.keys(this.props.alerts)
		Object.keys(keys).map((key) => {
      this.props.tridents[key].map((trident) => {
        tridentArray.push(key + " " + trident)
        alertKeys.map((alert,i) => {
        	if(alert == trident){
						alertsArray.push(this.props.alerts[alert].toLocaleString())
        	}
        })
      })
    })
    // console.log(tridentArray)
		return(
			<div className="dashboard-panel">
				<div className="trident-panel zoomIn">
					<Columns title={"Tridents"} info={tridentArray}/>
					<Columns title={"Alerts"} info={alertsArray}/>
				</div>
			</div>
		)
	}
}
