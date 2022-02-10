const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=be0ea2ef9ac1c22b28f812f229c323e7&query=${latitude},${longitude}&units=f`
    request.get({url, json: true}, (error, response) =>{
        if(error){
            callback('Unable to connect to weather service.', undefined)
        }else if (response.body.error){
            callback(`unable to find location because ${response.body.error.code}`, undefined)
        }
        else{
            let body = response.body.current
            let output = `It is currently ${body.temperature} degrees out in ${response.body.location.name}. There is a ${body.precip}% chance of ${body.weather_descriptions[0]}`
            callback(undefined, output)
        } 
    })
}

module.exports = forecast