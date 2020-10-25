const path= require('path')
const express= require('express')
const hbs = require('hbs')
const myfuncs = require('./Utils/geocode')
const app= express()

//define paths for express configuration
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


app.use(express.static(publicDirectoryPath))

app.listen('3000', () => {
    console.log('Server is up at port 3000')
})


//handlebars engine setup and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req,res) => 
{
    res.render('index',{title:'Weather App', name: 'Vedik Shetty'})
})

app.get('/index', (req,res) => 
{
    res.render('index',{title:'Weather App', name: 'Vedik Shetty'})
})


app.get('/help', (req,res) => 
{
    res.render('help',{title:'Help Page', helptext: 'Help Topics', name: 'Vedik Shetty'})
})

app.get('/about', (req,res) => 
{
    res.render('about',{title:'About Page', name: 'Vedik Shetty'})
})

app.get('/weather', (req,res) =>
{
    if (!req.query.address)
    {
       return res.send({error: 'Error: You must provide a location', location: undefined, forecast: undefined })
    }
    myfuncs.geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error)
        {
          return res.send({error, location})
        }
       
        myfuncs.forecast(latitude, longitude, (error, forecastdata) => {
          if (error)
          {
            return res.send({error})
          }
          res.send({undefined, location, forecast: forecastdata})
        })
      })
})

app.get('/help/*', (req,res) =>
{
res.render('404',{msg: 'Help article not found', name: 'Vedik Shetty'})
})

app.get('*', (req,res) =>
{
res.render('404',{msg: 'My 404 Page!!', name: 'Vedik Shetty'})
})