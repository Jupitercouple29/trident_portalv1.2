import React, { Component } from 'react'
import AlertPanel from '../../components/alert-panel'
import { connect } from 'react-redux'
import * as actionCreators from '../../actions'

export class InfoPage extends Component{
	renderInfo(){
		
	}
	render(){
		return(
			<div className="info-page-container">
				<AlertPanel alerts={this.props.info} title="Info Page"/>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	info:state.info
})

export default connect(mapStateToProps, actionCreators)(InfoPage)