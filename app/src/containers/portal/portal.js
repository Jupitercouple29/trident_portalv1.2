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

import './portal.css'
/**
 * Portal Component that generates all assets needed for the portal.
 * This is the main Component for the application
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
  }
  componentWillMount(){
    let tridents = this.props.tridents
    getTridents(tridents)
    .then(result=>{
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
  componentDidMount(){
    let portal = document.getElementById('root')
    portal.addEventListener('mousemove', this.noActivityLogout)
  }
  noActivityLogout(){
    let portal = this
    clearInterval(this.interval)
    this.interval = setInterval(function(){
      portal.props.history.push('/login')
    }, 3600000)
  }
  componentWillUnmount(){
    let portal = document.getElementById('root')
    portal.removeEventListener('mousemove', this.noActivityLogout)
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.location.pathname !== this.state.page){
      let pageLocation = ''
      let page = this.props.history.location.pathname;
      switch(page){
        case '/dashboard':
          pageLocation = <Dashboard />
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
          pageLocation = <Dashboard />
      }
      this.setState({page})
      this.props.pageLocation(pageLocation)
    }
  }

  handleSidePanelClick(click){
    this.setState({displaySidePanel:click})
  }
  render(){
    let displaySidePanel = this.state.displaySidePanel
    let { user, page } = this.props
    const { isLoading, loadingMessage } = this.state
    const display = user && !isLoading ? page : <LoadingPage message={loadingMessage}/>
    return(
      <section className="portal">
       <NavBar sidePanelClick={this.handleSidePanelClick} displaySidePanel={displaySidePanel} user={user}/>
       <SidePanel sidePanelClick={this.handleSidePanelClick} displaySidePanel={displaySidePanel} />
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
  tridents: state.tridentArray
})

export default withRouter(connect(mapStateToProps, actionCreators)(Portal))
