import React, { Component } from 'react'
import TridentImage from '../media/trident_logo3.png'

export default class LoadingPage extends Component {
  render(){
    let message = this.props.message
    return(
      <div className="loading-page-container">
        <h3 className="loading-page-message">
          {message}
        </h3>
        <img
        className="loading-page-img"
        src={TridentImage}
        height={'500px'}
        width={'500px'}
        alt={'Loading....'}
        />
      </div>
    )
  }
}
