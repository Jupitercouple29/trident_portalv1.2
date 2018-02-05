import React, { Component } from 'react'
import { Map, TileLayer, Circle, Tooltip } from 'react-leaflet'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as actionCreaters from '../actions'
import { getMapCoords } from '../functions/getMapCoords'
import { getMapAlert } from '../functions/getMapAlert'
import { getClientMapAlert } from '../functions/getClientMapAlert'

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
  }

  componentWillMount(){
    if(this.props.history.location.pathname === '/trident' && this.props.trident){

      getMapCoords([this.props.trident])
      .then(res => {
        this.setState({coords: res})
      })
    }else if(this.props.coords){
        this.setState({coords:this.props.coords})
    }else if(this.props.tridents){
      getMapCoords(this.props.tridents)
      .then(res => {
        this.setState({coords: res})
      })
    }
  }

  componentWillReceiveProps(nextProps){
    if(this.props.trident !== nextProps.trident){
      getMapCoords([nextProps.trident])
      .then(res => {
        this.setState({coords: res})
      })
    }
    if(this.props.coords && this.props.coords !== nextProps.coords){
      this.setState({coords:nextProps.coords})
    }
    // let leafletMap = this.leafletMap.leafletElement
    // let tileLayer = this.tileLayer
    // leafletMap.on('mouseover', () => {
      // <Marker position={[39.109818, -76.840439]} />
    // })
  }

  handleAlertClick(lat,long){
    let info = {}
    info.lat = lat
    info.long = long
    if(this.props.history.location.pathname === '/clients'){
      info.trident = [localStorage.getItem('selectedTrident')]
      info.ipArray = this.props.ipArray
      getClientMapAlert(info)
      .then(res => {
        this.props.mapAlerts(res)
      })
    }else if(this.props.history.location.pathname === '/trident' && this.props.trident){
      info.trident = [this.props.trident]
      getMapAlert(info)
      .then((res)=>{
        this.props.mapAlerts(res)
        // this.props.history.push('/alerts')
      })
    }else{
      info.trident = this.props.tridents
      getMapAlert(info)
      .then((res)=>{
        this.props.mapAlerts(res)
        // console.log(res)
        // this.props.history.push('/alerts')
      })
    }
    // console.log(info)
   
  }

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
  info:state.info
})

export default withRouter(connect(mapStateToProps, actionCreaters)(PortalMap))