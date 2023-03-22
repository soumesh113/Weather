const request = require('request')
const geocode = (address, callback) => {
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic291bWVzaCIsImEiOiJjbGViYjdjd3MxN2swM3dtZXZzam5zcDJvIn0.WU7BU8ck7eLOcDlJUjtSig'
    const json = true
    request({url, json}, (error, response)=> {
       const {features} = response.body
      if(error)
      {
          callback('Unable to connect to location services!', undefined)
      }
      else if(features.length===0)
      {
          callback('Unable to find location!', undefined)
      }
      else
      {
        latitude = features[0].center[1]
        longitude = features[0].center[0]
        location = features[0].place_name
          callback(undefined, {
              latitude,
              longitude,
              location
          })
      }
    })
  }
  module.exports = geocode