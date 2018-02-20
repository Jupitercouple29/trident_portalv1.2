import React, { Component } from 'react'
import AlertPanel from '../../components/alert-panel'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { getTwoWay } from '../../functions/getTwoWay'
 
import 'react-datepicker/dist/react-datepicker.css';
import './soc-page.css'

export default class SOC extends Component {
	constructor(props){
		super(props)
		this.state = {
			twoWay:[],
			trident:'',
			index:'',
			ip:'',
			time:'',
			date: moment(),
			message:<h2>Fill in form above</h2>,
			eval:[],
			evalMessage:<h1>No Data </h1>,
			showContextMenu: false
		}
		this.getTwoWay = this.getTwoWay.bind(this)
		this.onInputChange = this.onInputChange.bind(this)
		this.onFormSubmit = this.onFormSubmit.bind(this)
	}
	getTwoWay(trident,startFrom){

	}
	onInputChange(type, event){
		// console.log(type)
		// console.log(event)
		if(type === 'date'){
			this.setState({date:event})
		}else{
	    let stateVal = { }
	    stateVal[type] = event.target.value
	    this.setState(stateVal)
	  }
  }
  onFormSubmit(event){
  	event.preventDefault()
  	let { trident, index, ip, time, date } = this.state 
  	let info = {trident, index, date, ip, time}
  	this.setState({message:<h2>Loading...</h2>})
  	console.log(info)
		getTwoWay(info)
		.then(res => {
			console.log(res)
			this.setState({twoWay:res})
		})
  }
	render(){
		let { message, evalMessage } = this.state
		console.log(this.state)
		return (
			<div className="soc-page-container">
				<form onSubmit={this.onFormSubmit}>
					<label>Trident #</label>
					<input 
						className="input-trident"
						id="trident"
						value={this.state.tridentInput}
						onChange={this.onInputChange.bind(this,'trident')}
						type="text"/>
					<label>Start Index</label>
					<input 
						className="input-index"
						id="index"
						value={this.state.index}
						onChange={this.onInputChange.bind(this,'index')}
						type="text"/>
					<label>IP Address</label>
					<input 
						className="input-ip"
						id="ip"
						value={this.state.ip}
						onChange={this.onInputChange.bind(this,'ip')}
						type="text"/>
					<label>Time</label>
					<input 
						className="input-time"
						id="time"
						value={this.state.time}
						onChange={this.onInputChange.bind(this,'time')}
						type="text"/>
					<label>Date</label>
					<DatePicker 
						selected={this.state.date} 
						onChange={this.onInputChange.bind(this,'date')} 
						minDate={moment().subtract(7,'days')}
						maxDate={moment()}/>
					<button>Search</button>
				</form>
				<div className="soc-page-traffic-container">
					<AlertPanel alerts={this.state.twoWay} title="Two Way Traffic" message={message}/>
				</div>
				<div className="soc-page-eval-container">
					<AlertPanel 
						alerts={this.state.eval} 
						title="Saved Alerts" 
						message={evalMessage}/>
				</div>
			</div>
		)
	}
}