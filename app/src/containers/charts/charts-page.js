import React, { Component } from 'react' 
import * as actionCreators from '../../actions'
import { connect } from 'react-redux'
import { getTridentAlerts } from '../../functions/getTridentAlerts'
import { LineChart, 
				 Line, 
				 XAxis, 
				 YAxis, 
				 CartesianGrid, 
				 Tooltip, 
				 Legend,
				 PieChart,
				 Pie } from 'recharts'

export class ChartsPage extends Component {
	constructor(props){
		super(props)
		this.state = {
			selected: 0
		}
		this.handleTridentClick = this.handleTridentClick.bind(this)
	}
	componentWillMount(){
		if(!this.props.sourceIPs){
			
		}
	}
	handleTridentClick(){
		if(this.state.selected === 0){
			this.setState({selected:1})
		}else{
			let select = document.getElementById('select-box')
			let value = select.options[select.selectedIndex].value
			let trident = value.slice(value.length - 4, value.length)
			console.log(trident)
			console.log(select.options)
			getTridentAlerts(trident)
	    .then((res)=>{
		    if(res.alerts.length < 1){
		    	this.setState({selected:0})
		    }
	      this.props.tridentAlerts(res.alerts)
	      this.props.tridentSourceIPs(res.ips)
	      this.props.tridentSignatureAlerts(res.signatureAlerts)
	      this.props.tridentDestIPs(res.dest_ips)
	      this.setState({loading:false})
		  })
	  }
	}
	tridentDropDown(){
		let tridents = this.props.user.tridents
		let keys = Object.keys(tridents)
		let tridentArray=[]
		keys.map(key=>{
			tridents[key].map(t => {
				tridentArray.push(key + ' ' + t)
			})
		})
		let dropdown = tridentArray.map(trident => {
			return <option key={trident} value={trident} onChange={this.handleTridentClick}>{trident}</option>
		})
		return <select className="charts-page-trident-dropdown" id="select-box" onClick={this.handleTridentClick}>
						{dropdown}
					</select>
	}
	getDataSet(data){
		let dataSet = data.map((d, i) => {
			console.log(d)
			let set = {
				name: d.key,
				value: d.doc_count
			}
			return set
		})
		return dataSet
	}
	render(){
		let sourceIPs = this.props.sourceIPs ? this.props.sourceIPs : null
		let sourceIPData = this.getDataSet(sourceIPs)
		console.log(sourceIPData)
		return(
			<div>
				<div className="dashboard-header">
					<h2 className="dashboard-title">DASHBOARD</h2>
					<h3 className="dashboard-path">Home / Charts</h3>
				</div>
				<div className="charts-page-container">
					<div className="charts-page-tridents">
						{this.tridentDropDown()}
					</div>
					<div className="charts-page source-ip-pie-chart">
						<PieChart width={200} height={200}>
							<Pie data={sourceIPData}
									 cx={100}
									 cy={100}
									 labelLine={false}
									 outerRadius={80}
									 fill="#8884d8">
							</Pie>
						</PieChart>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	sourceIPs: state.sourceIPs,
	destIPs: state.destIPs,
	signatures: state.signatureAlerts,
	user: state.validUser,
	tridents: state.tridentArray
})

export default connect(mapStateToProps, actionCreators)(ChartsPage)