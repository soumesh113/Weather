const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

location = process.argv[2]
if(process.argv.length==2)
{
    console.log("Please enter a location")
}
else
{
geocode(location,  (error,  {longitude, latitude, location} = {})=>
{
    if(error)
    {
         return console.log(error)
    }
    
    forecast(longitude, latitude, (error, forecastdata)=> {
        if(error)
        {
            return console.log(error)
        }
        console.log(location)
        console.log( forecastdata)
      })
      
})
}
