import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import NavBar from '../../components/nav-bar'
import SidePanel from '../../components/side-panel'
import Dashboard from '../dashboard/dashboard'
import TridentPage from '../trident/trident-page'
import SupportPage from '../support/support-page'
import ProfilePage from '../profile/profile-page'
import AlertsPage from '../alerts/alerts-page'
import ChartsPage from '../charts/charts-page'
import InfoPage from '../info/info-page'
import Reports from '../reports/reports-page'
import ClientPage from '../clients/client-page'
import SOC from '../soc/soc-page'
import LoadingPage from '../../components/loading-page'
import Footer from '../../components/footer'
import { getTridents } from '../../functions/getTridents'
import * as actionCreators from '../../actions'
import moment from 'moment'

import './portal.css'
/**
 * Portal Component that generates all assets needed for the portal.
 * This is the main Component for the application
 * props 
 *  - this.props.user = redux store validUser
 *  - this.props.page = redux store page
 *  - this.props.tridents = redux store tridentArray
 *  - this.props.pageLocation = redux action
 *  - this.props.dashboardInfo = redux action 
 */

export class Portal extends Component {
  constructor(props){
    super(props)
    this.state = {
      page:<Dashboard />,
      isLoading: true,
      loadingMessage: <div>Gathering your information...</div>,
      displaySidePanel: false
    }

    this.handleSidePanelClick = this.handleSidePanelClick.bind(this)
    this.noActivityLogout = this.noActivityLogout.bind(this)
    this.fetchAlerts = this.fetchAlerts.bind(this)
  }
  componentWillMount(){
    this.fetchAlerts()
  }
  componentDidMount(){
    let portal = document.getElementById('root')
    //event listener to detect if the user is active 
    portal.addEventListener('mousemove', this.noActivityLogout)
  }
  componentWillUnmount(){
    let portal = document.getElementById('root')
    portal.removeEventListener('mousemove', this.noActivityLogout)
  }
  componentWillReceiveProps(nextProps){
    console.log(nextProps)
    if(nextProps.location.pathname !== this.state.page){
      let pageLocation = ''
      let page = this.props.history.location.pathname;
      //this switch acts like a router and determines which page should be shown 
      //based on the sites pathname
      switch(page){
        case '/dashboard':
          pageLocation = <Dashboard fetchAlerts={this.fetchAlerts}/>
          break
        case '/trident':
          pageLocation = <TridentPage />
          break
        case '/support':
          pageLocation = <SupportPage />
          break
        case '/profile':
          pageLocation = <ProfilePage />
          break
        case '/alerts':
          pageLocation = <AlertsPage />
          break
        case '/charts':
          pageLocation = <ChartsPage />
          break
        case '/info':
          pageLocation = <InfoPage />
          break
        case '/reports':
          pageLocation = <Reports />
          break
        case '/clients':
          pageLocation = <ClientPage />
          break
        case '/soc':
          pageLocation = <SOC />
          break
        default:
          pageLocation = <Dashboard fetchAlerts={this.fetchAlerts}/>
      }
      this.setState({page})
      this.props.pageLocation(pageLocation)
    }
  }
  //calles the backend and is the initial call to retrieve alerts.
  //This function is also passed down to the dashboard and then to the AlertPanel
  //Allows the alerts to be concatenated, which allows users to query more alerts
  fetchAlerts(startFrom){
    if(this.props.history.location.pathname === '/dashboard'){
      let tridents = this.props.tridents
      let date = new Date(), date2 = new Date()
      let minusHour = date2.setHours(date2.getHours() - 1)
      let dateMinusHour = new Date(minusHour)
      let info = {
        tridents,
        date:date,
        minusHour: dateMinusHour,
        from:startFrom || 0,
        queryDate: this.props.queryDate
      }
      console.log('inside of fetchAlerts___________________________________________')
      console.log(info)
      getTridents(info)
      .then(result=>{
        console.log(result)
        this.props.dashboardInfo(result)
        this.setState({isLoading:false})
      })
      .catch((err)=>{
        this.setState({loadingMessage:
          <h1 className="loading-error">There has been a connection error.<br/><br/>
           Please try back again .
          </h1>
        })
      })
    }
  }
  //logs a user out if there is now mouse activity after 1 hour
  noActivityLogout(){
    let portal = this
    clearInterval(this.interval)
    this.interval = setInterval(function(){
      portal.props.history.push('/login')
    }, 3600000)
  }
  //sets the display panel to open and close when panel is clicked
  handleSidePanelClick(click){
    this.setState({displaySidePanel:click})
  }
  render(){
    // console.log(this.props.queryDate)
    let displaySidePanel = this.state.displaySidePanel
    let { user, page } = this.props
    const { isLoading, loadingMessage } = this.state
    const display = user && !isLoading ? page : <LoadingPage message={loadingMessage}/>
    /**
     * NavBar is set for all pages and displays the user's logo, the app title, and the current user logged in
     * SidePanel list the portal's options 
     * display is determined from this.props.page which is determined based on the sites pathname just like a router
     */
    return(
      <section className="portal">
       <NavBar 
        sidePanelClick={this.handleSidePanelClick} 
        displaySidePanel={displaySidePanel}
        fetchAlerts={this.fetchAlerts} 
        user={user}/>
       <SidePanel 
        sidePanelClick={this.handleSidePanelClick} 
        displaySidePanel={displaySidePanel} />
       <div className="portal-display">
          {display}
       </div>
       <Footer />
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  page: state.page,
  user: state.validUser,
  tridents: state.tridentArray,
  queryDate: state.queryDate
})

export default withRouter(connect(mapStateToProps, actionCreators)(Portal))
