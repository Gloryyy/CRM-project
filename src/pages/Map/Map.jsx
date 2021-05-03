/* global google */
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { GMap } from 'primereact/gmap'
import {
  loadGoogleMaps,
  companyMarker,
  candidateMarker
} from '../../helpers/gmaps'

const candidates = [
  {
    name: 'Márcio Duarte',
    img: 'marcio.jpg',
    tags: ['Java', 'SCRUM Master', 'PHP', 'C'],
    local: 'Maternusstraße, 14, 50996 Köln',
    contact: '+49 152 2641 1141',
    coord: {
      lat: 50.8926273,
      lng: 6.9928004
    }
  },
  {
    name: 'Alper Ece',
    img: 'alper.png',
    tags: ['Java', 'SCRUM Master', 'PHP', 'C'],
    local: 'Maternusstraße, 14, 50996 Köln',
    contact: '+49 152 2641 1141',
    coord: {
      lat: 50.9111614,
      lng: 6.9520442
    }
  },
  {
    name: 'Younes',
    img: 'younes.png',
    tags: ['Java', 'Frontend', 'Business Intelligence'],
    local: 'Straße, 4, 30196 Düsseldorf',
    contact: '+49 122 2001 3141',
    coord: {
      lat: 51.2233899,
      lng: 6.7974234
    }
  },
  {
    name: 'Majd',
    img: 'majd.png',
    tags: ['JavaScript', 'Software tester', 'React', 'HTML5'],
    local: 'Straße, 8, 34093  Düsseldorf',
    contact: '+49 131 0041 0142',
    coord: {
      lat: 51.2178903,
      lng: 6.7667823
    }
  }
]

class Map extends Component {
  constructor({ location }) {
    super()
    this.state = {
      googleMapsIsReady: false,
      dialogVisible: false,
      markerTitle: '',
      overlays: null,
      selectedPosition: null,
      companyData: location.state.company
    }
    this.onOverlayClick = this.onOverlayClick.bind(this)
    this.onMapReady = this.onMapReady.bind(this)
  }

  componentDidMount() {
    loadGoogleMaps(() => {
      // Work to do after the library loads.
      this.setState({ googleMapsIsReady: true })
    })
  }

  onOverlayClick(event) {
    const isMarker = event.overlay.getTitle !== undefined
    if (isMarker) {
      const title = event.overlay.getTitle()
      this.infoWindow = this.infoWindow || new google.maps.InfoWindow()
      this.infoWindow.setContent(
        `<div>
          <div id='${title}' class='marker-title'>${title} </div>
          <img  class='marker-image' src='/assets/images/${event.overlay.photo}'>
        </div>`
      )
      this.infoWindow.open(event.map, event.overlay)
    }
  }

  onMapReady(event) {
    const overlays = [
      // First marker is the main one ex:(company)
      new google.maps.Marker({
        position: {
          lat: +this.state.companyData.coord.lat,
          lng: +this.state.companyData.coord.lng
        },
        icon: companyMarker(google),
        title: this.state.companyData.name,
        photo: `companies/${this.state.companyData.img}`
      })
    ]
    // It creats the markers around the main marker
    candidates.forEach((candidate) => {
      overlays.push(
        new google.maps.Marker({
          position: { lat: candidate.coord.lat, lng: candidate.coord.lng },
          icon: candidateMarker(google),
          title: candidate.name,
          photo: candidate.img
        })
      )
    })
    this.setState({ overlays })
  }

  render() {
    const options = {
      center: {
        lat: +this.state.companyData.coord.lat,
        lng: +this.state.companyData.coord.lng
      },
      zoom: 12
    }

    if (this.state.googleMapsIsReady === false) {
      return ''
    }

    return (
      <div id="google-map">
        <div className="content-section implementation">
          <GMap
            overlays={this.state.overlays}
            options={options}
            style={{ width: '100%', minHeight: '85vh' }}
            onMapReady={this.onMapReady}
            onOverlayClick={this.onOverlayClick}
            /* onMapClick={() => {
              console.log(this.state.overlays)
            }} */
          />
        </div>
      </div>
    )
  }
}

export default withRouter(Map)
