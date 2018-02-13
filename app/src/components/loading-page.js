import React, { Component } from 'react'
import TridentImage from '../media/trident_logo3.png'

/**
 * LoadingPage is displayed after the use logs in and while the data 
 * is being fetched from the backend.
 * props {
 *  message: the message to display when loading
 * }
 */
export default class LoadingPage extends Component {
  render(){
    let message = this.props.message
    return(
      <div className="loading-page-container">
        <section className="loading-page-message">
          {message}
        </section>
        <img
        className="loading-page-img"
        src={TridentImage}
        height={'300px'}
        width={'300px'}
        alt={'Loading....'}
        />
      </div>
    )
  }
}
