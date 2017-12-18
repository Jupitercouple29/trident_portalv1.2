import React, { Component } from 'react'
import { Map, TileLayer, Circle, Marker, Tooltip } from 'react-leaflet'

export default class PortalMap extends Component {
	render(){
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
          </Map>
        </section>
      </section>
		)
	}
}