const request = require('postman-request')

const getGeoCode = (address, callback) => {
    const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiamF5aGFkZHkiLCJhIjoiY2t6OGNyY2FiMWhpZDJvcnhrMjAwYW9meCJ9.tBk644F_hRpKKFyg-rtXgg`

    request.get({ url: geocodeURL, json: true}, (error, response) => {
        if(error){
            callback('unable to connect to location services!', undefined)
            console.log('Unable to connect to geolocator service.')
        }else if (response.body.features.length == 0){
            callback('unable to find location. Try another search.', undefined)
        }else{
            const latitude = response.body.features[0].center[1].toString()
            const longitude = response.body.features[0].center[0].toString()
            console.log(`Coordinates: ${latitude}, ${longitude}`)
            callback(undefined, {latitude, longitude})
        }
    })
}

module.exports = getGeoCode