const request = require('request')
const forecast = (longitude, latitude, callback)=> {
     const url = 'http://api.weatherstack.com/current?access_key=e9a5f89e555539ee3af4aac44f730824&query=' + latitude +',' + longitude + '&units=f'
     const json = true
     request({url, json}, (error, {body} = {})=> {
    
        if(error)
        {
            callback('Cannot connect to weather service', undefined)
        }
        else if(body.error)
        {
            callback('Cannot find location', undefined)
        }
        else
        {
            callback(undefined, body.current.weather_descriptions[0] + ' It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.')}
     })
}
module.exports = forecast