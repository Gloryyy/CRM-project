// Google Maps script.
const loadGoogleMaps = (callback) => {
  // Create the script tag, set the appropriate attributes
  const mapsElement = document.getElementById('googleMaps')
  if (!mapsElement) {
    const script = document.createElement('script')
    script.src = process.env.REACT_APP_GMAPS
    script.id = 'googleMaps'
    script.defer = true

    // Append the 'script' element to 'head'
    document.head.appendChild(script)
    // Triggers the callback function to set Maps ready to true after rendering the component.
    script.onload = () => {
      if (callback) {
        callback()
      }
    }
  } else {
    callback()
  }
}

// Map custom markers
const companyMarker = (googleInstance) => ({
  url: '/assets/icons/map-marker-red.png',
  scaledSize: new googleInstance.maps.Size(70, 70)
})

const candidateMarker = (googleInstance) => {
  return {
    url: '/assets/icons/map-marker-green.png',
    scaledSize: new googleInstance.maps.Size(50, 50)
  }
}

export { loadGoogleMaps, companyMarker, candidateMarker }
