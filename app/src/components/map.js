import React, { Component } from 'react'
import { Map, TileLayer, Circle, Tooltip } from 'react-leaflet'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as actionCreaters from '../actions'
import { getMapCoords } from '../functions/getMapCoords'
import { getMapAlert } from '../functions/getMapAlert'
import { getClientMapAlert } from '../functions/getClientMapAlert'

/**
 * PortalMap is used to display a map with all of the alerts significant 
 * to the info passed in.
 * props {
 *  trident: trident,
 *  tridents: array of tridents,
 *  coords: array of coordinates,
 * }
 */
export class PortalMap extends Component {
  constructor(props){
    super(props)
    this.state = {
      coords:[],
      circleRadius:70000
    }
    this.showMapAlerts = this.showMapAlerts.bind(this)
    this.handleAlertClick = this.handleAlertClick.bind(this)
    this.handleZoom = this.handleZoom.bind(this)
    this.fetchMapAlerts = this.fetchMapAlerts.bind(this)
  }
  componentWillMount(){
    if(this.props.history.location.pathname === '/trident' && this.props.trident){
      let info = {
        tridents: [this.props.trident],
        queryDate: this.props.queryDate
      }
      this.fetchMapAlerts(info)
      // getMapCoords(info)
      // .then(res => {
      //   this.setState({coords: res})
      // })
    }else if(this.props.coords){
        this.setState({coords:this.props.coords})
    }else if(this.props.tridents){
      let info = {
        tridents: this.props.tridents,
        queryDate: this.props.queryDate
      }
      this.fetchMapAlerts(info)
      // getMapCoords(info)
      // .then(res => {
      //   this.setState({coords: res})
      // })
    }
  }
  componentWillReceiveProps(nextProps){
    let path = this.props.history.location.pathname
    if(this.props.trident !== nextProps.trident){
      let info = {
        tridents: [nextProps.trident],
        queryDate: this.props.queryDate
      }
      this.fetchMapAlerts(info)
      // getMapCoords(info)
      // .then(res => {
      //   this.setState({coords: res})
      // })
    }
    if(this.props.coords && this.props.coords !== nextProps.coords){
      this.setState({coords:nextProps.coords})
    }
    // get new coordinates when a new date is searched on the dashboard page
    if(nextProps.newSearch && path === '/dashboard'){
      console.log('newSearch in the map _________________________')
      let info = {
        tridents: this.props.tridents,
        queryDate: this.props.queryDate
      }
      this.fetchMapAlerts(info)
    }else if(nextProps.newSearch && path === '/trident'){
      console.log('newSearch in the map for trident page ')
      let info = {
        tridents: [this.props.trident],
        queryDate: this.props.queryDate
      }
      console.log(info)
      this.fetchMapAlerts(info)
    }
  }
  //call to backend to get coordinates for the map
  fetchMapAlerts(info){
    getMapCoords(info)
    .then(res => {
      this.setState({coords: res})
    })
    .catch(err => {
      console.log('there has been an error in the backend')
    })
  }
  //allows user to click on marker and then a call to the backend is made to 
  //gather data on that specific alert
  handleAlertClick(lat,long){
    let info = {}
    info.lat = lat
    info.long = long
    if(this.props.history.location.pathname === '/clients'){
      info.trident = [localStorage.getItem('selectedTrident')]
      info.ipArray = this.props.ipArray
      info.queryDate = this.props.queryDate
      getClientMapAlert(info)
      .then(res => {
        this.props.mapAlerts(res)
      })
    }else if(this.props.history.location.pathname === '/trident' && this.props.trident){
      info.trident = [this.props.trident]
      getMapAlert(info)
      .then((res)=>{
        this.props.mapAlerts(res)
      })
    }else{
      info.trident = this.props.tridents
      getMapAlert(info)
      .then((res)=>{
        this.props.mapAlerts(res)
      })
    }   
  }
  //creates a marker on the map for each coordinate 
  showMapAlerts(){
    let key = 0
    let that = this
    let { circleRadius, coords } = this.state 
    let Circles = coords.map(c => {
      let lat = c[0]
      let long = c[1]
      let count = c[2]
      let color = "#F64F34"
      if(count > 1000){
        color = "red"
      }
      return <Circle
                key={key++}
                ref={lat + long}
                center={[lat, long]}
                radius={circleRadius}
                color={color}
                onClick={that.handleAlertClick.bind(that,lat,long)}>
                <Tooltip>
                  <div className="map-tooltip-container">
                    <div className="map-tooltip-coords">
                       Lat: {lat} , Lon: {long}
                    </div>
                    <div className="map-tooltip-count">
                      count: {count}
                    </div>
                  </div>
                </Tooltip>
              </Circle>
      })
    return Circles
  }
  //resizes markers based on zoom level
  handleZoom(e){
    let zoom = e.target._zoom
    let circleRadius = 200000/zoom
    if(zoom >= 6 && zoom <= 13) circleRadius = 100000/Math.pow((zoom - 2),2)
    else if(zoom > 13 && zoom < 17) circleRadius = 10000/Math.pow((zoom - 2),2)
    else if(zoom > 17) circleRadius = 5000/Math.pow((zoom - 2),2)
    this.setState({circleRadius})
  }
	render(){
    let coords = this.state.coords
    let mapAlerts = coords && coords.length ? this.showMapAlerts() : null
		return(
			<section className="portal-map-container">
        <section className="portal-map" id="mapid" ref="map">
          <Map
            center={[39.2605, -76.6711]}
            zoom={3}
            onZoom={this.handleZoom}
            scrollWheelZoom={false}
            ref={m => { this.leafletMap = m; }}>
            <TileLayer
              attribution={process.env.REACT_APP_MAPBOX_ATTRIBUTION}
              url={process.env.REACT_APP_MAPBOX_URL}
              id={'mapbox.streets'}
              accessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            />
            {mapAlerts}
          </Map>
        </section>
      </section>
		)
	}
}

const mapStateToProps = (state) => ({
  tridents: state.tridentArray,
  ipArray: state.ipArray,
  info: state.info,
  queryDate: state.queryDate,
  newSearch: state.newSearch
})

export default withRouter(connect(mapStateToProps, actionCreaters)(PortalMap))