import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Map, TileLayer } from 'react-leaflet'
// import Header from './header'
// import TridentMap from './trident-map'
// import NavBar from '../components/navBar'
// import PortalBody from './portal-body'
// import TridentBody from './trident-body'
// import AdminBody from './admin-body'
// import AlertBody from './alert-body'
// import Footer from '../components/footer'
// import LoadingPage from '../components/loadingPage'
import * as actionCreators from '../../actions'
// import * as getInfo from '../components/getInfo'

/**
 * Portal Component that generates all assets needed for the portal.
 * This is the main Component for the application
 */

export class Portal extends Component {
  constructor(props){
    super(props)
    this.state = {
      // page:<PortalBody />,
      isLoading: true,
      loadingMessage: <div>Gathering your information...</div>
    }
  }

  componentWillMount(){
    // this.props.pageLocation(<PortalBody />)
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
  
  componentWillReceiveProps(nextProps){
    // if(nextProps.location.pathname != this.state.page){
    //   let pageLocation = ''
    //   let page = this.props.history.location.pathname;
    //   switch(page){
    //     case '/portal':
    //       pageLocation = <PortalBody />
    //       break
    //     case '/trident':
    //       pageLocation = <TridentBody />
    //       break
    //     case '/admin':
    //       pageLocation = <AdminBody />
    //       break
    //     case '/alerts':
    //       pageLocation = <AlertBody />
    //       break
    //     default:
    //       pageLocation = <PortalBody />
    //   }
    //   this.setState({page})
    //   this.props.pageLocation(pageLocation)
    // }
  }
  render(){
    // const { user, page } = this.props
    // const { isLoading, loadingMessage } = this.state
    // const display = user && !isLoading ? page : <LoadingPage message={loadingMessage}/>
    return(
      <section className="portal">
       Hello
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
