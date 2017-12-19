import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import { Map, TileLayer } from 'react-leaflet'
// import Header from './header'
// import TridentMap from './trident-map'
import NavBar from '../../components/nav-bar'
import SidePanel from '../../components/side-panel'
import Dashboard from '../dashboard/dashboard'
import TridentPage from '../trident/trident-page'
import SupportPage from '../support/support-page'
import ProfilePage from '../profile/profile-page'
import AlertsPage from '../alerts/alerts-page'
import ChartsPage from '../charts/charts-page'
// import PortalBody from './portal-body'
// import TridentBody from './trident-body'
// import AdminBody from './admin-body'
// import AlertBody from './alert-body'
// import Footer from '../components/footer'
// import LoadingPage from '../components/loadingPage'
import * as actionCreators from '../../actions'
// import * as getInfo from '../components/getInfo'

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
    this.sidePanelResize = this.sidePanelResize.bind(this)
  }

  componentWillMount(){
    this.props.pageLocation(<Dashboard />)
    // let validUser = this.props.validUser
    // let tridents = this.props.user.tridents
    // getInfo.getTridentAlerts(tridents)
    // .then((res)=>{
    //   this.props.tridentAlerts(res.alerts)
    //   this.props.tridentSourceIPs(res.ips)
    //   this.props.tridentCurrentAlerts(res.currentAlerts)
    //   this.props.tridentDestIPs(res.dest_ips)
    //   this.setState({isLoading:false})
    // })
    // .catch((err)=>{
    //   console.log('there has been an error')
    //   console.log(err)
    //   this.setState({loadingMessage:
    //     <div>There has been a connection error.
    //       <br/>
    //       Please try back again .
    //     </div>
    //   })
    // })
  }
  
  componentDidMount(){
    let sidePanel = document.getElementsByClassName('side-panel-container')[0]
    // console.log(ReactDOM.findDOMNode(sidePanel))
    ReactDOM.findDOMNode(sidePanel).addEventListener('resize', this.timer)
  }
  
  sidePanelResize(){
     console.log(document.getElementsByClassName('side-panel-container')[0].clientWidth)
    // console.log(document.getElementsByClassName('side-panel-container')[0].clientWidth)
  }
  
  componentWillUnmount(){
    let sidePanel = document.getElementsByClassName('side-panel-container')[0]
    ReactDOM.findDOMNode(sidePanel).removeEventListener('resize', this.side)
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.location.pathname != this.state.page){
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
    // const { isLoading, loadingMessage } = this.state
    // const display = user && !isLoading ? page : <LoadingPage message={loadingMessage}/>
    // let display = page 
    return(
      <section className="portal">
       <NavBar sidePanelClick={this.handleSidePanelClick} displaySidePanel={displaySidePanel}/>
       <SidePanel sidePanelClick={this.handleSidePanelClick} displaySidePanel={displaySidePanel} />
       <div className="portal-display">
          {page}
       </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  page: state.page,
  info: state.info,
  user: state.validUser,
  ips: state.sourceIPs
})

export default connect(mapStateToProps, actionCreators)(Portal)
