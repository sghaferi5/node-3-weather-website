const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectortyPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// set handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectortyPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Saeid G'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: 'Saeid G'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Seid G',
        message: 'This is the help page ...'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address was not provided'
        })
    }
    request({ url: 'http://api.weatherapi.com/v1/current.json?key=8056099077e04ec9931234212211212&q=' + req.query.address + '&aqi=no', json: true },
        (error, response) => {
            if (!response.body.error) {
                console.log('It is currently ' + response.body.current.temp_c + ' degress.')
                res.send({
                    forecast: `It is ${response.body.current.temp_c} degrees`,
                    address: req.query.address,
                })
            } else {
                res.send({
                    error: 'Address was not provided'
                })
            }

        })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Help article not found.',
        name: 'Saeid G'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Page not found',
        name: 'Saeid G'
    })
})



app.listen(port, () => {
    console.log(`server is up on port ${port}`)
})