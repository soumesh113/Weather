const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const request = require('request')
const app = express()

app.use(express.static(path.join(__dirname, '../public')))
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
app.set('views', viewsPath);
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)
app.get('', (req, res)=>
{
    res.render('index', {
        title: 'Weather',
        name: 'Soumesh Khare'
    })
})
app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About me',
        name: 'Soumesh Khare'
    })
})
app.get('/help', (req, res)=>{
    res.render('help', {
        message: 'For help, contact Soumesh',
        title: 'Help',
        name: 'Soumesh Khare'
    })
})
app.get('/weather', (req, res)=>
{
    if(!req.query.address)
    {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address,  (error,  {longitude, latitude, location} = {})=>
    {
    if(error)
    {
         return res.send({error})
    }
    
    forecast(longitude, latitude, (error, forecastdata)=> {
        if(error)
        {
            return res.send({error})
        }
        res.send({
            location: location,
            forecast : forecastdata
        })
        
      })
    })
      
})
    

app.get('/products', (req, res) => {
    if(!req.query.search){
          return res.send({
            error: 'You must provide a search term'
          })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404', {
        title: '404',
        name: 'Soumesh Khare',
        message: 'Help article not found'
    })
})
app.get('*', (req,res)=>{
       res.render('404', {
        title: '404',
        message: 'Page not found',
        name: 'Soumesh Khare'
       })
})
app.listen(3000, ()=>
{
    console.log('Server is up on port 3000.')
})