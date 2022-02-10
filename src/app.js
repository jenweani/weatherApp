const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const getGeoCode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'html')
app.engine('html', require('hbs').__express)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Set routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        author: 'Dev_Doozy',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help me',
        author: 'Jay'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        author: 'Dev_Doozy'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address){
        return res.send({
            error: 'provide an address attribute in your query bitch!'
        })
    }
    getGeoCode(address, (error, {latitude, longitude} = {}) => {
        console.log('getting weather...')
        if(error){
            return res.send({ error })
        }
        return forecast(latitude, longitude, (error, response) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                address,
                forecast: response,
                location: { longitude, latitude },
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', { 
        title: '404 Page not found',
        message: 'Help page not found'})
})

app.get('*', (req, res) => {
    res.render('404', { 
        title: '404 Page not found',
        message: 'Wow such empty! NO such page' })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})