import React, { Component } from 'react'
import linkedin from '../media/linkedin.png'
import facebook from '../media/facebook.png'
import twitter from '../media/twitter.png'

/**
 * Footer is use to display the footer at the bottom of every page
 */
export default class Footer extends Component {
  render(){
    return (
      <section className="portal-bottom">
        <section className="portal-footer">
          <span>@ 2017 Phalanx Secure Solutions | At the Ready Cybersecurity</span>
          <div className="linkedin-container">
            <a href="https://www.linkedin.com/company-beta/10511698" target="_blank">
              <img
                className="linkedin-icon"
                src={linkedin}
                alt="linkedin"
              />
            </a>
          </div>
          <div className="facebook-container">
            <a href="https://www.facebook.com/phalanxsecuresolutions/" target="_blank">
              <img
                className="facebook-icon"
                src={facebook}
                alt="facebook"
              />
            </a>
          </div>
          <div className="twitter-container">
            <a href="https://twitter.com/phalanx_ss" target="_blank">
              <img
                className="twitter-icon"
                src={twitter}
                alt="twitter"
              />
            </a>
          </div>
        </section>
      </section>
    )
  }
}
