import React, { Component } from 'react'
import AlertPanel from '../../components/alert-panel'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as actionCreators from '../../actions'

export class InfoPage extends Component{
	componentWillMount(){
		console.log(this.props.info)
		if(this.props.info.length < 1){
			this.props.history.push('/trident')
		}
	}
	render(){
		return(
			<div className="info-page-container">
				<AlertPanel alerts={this.props.info} title="Info Page" size="large"/>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	info:state.info
})

export default withRouter(connect(mapStateToProps, actionCreators)(InfoPage))