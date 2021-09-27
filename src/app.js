const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
const port =  process.env.PORT || 3000
console.log(__dirname)
console.log(__filename)

const publicDirPath = path.join(__dirname,'../public')

const viewsPath = path.join(__dirname,'../templates/views')

const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')

app.set('views',viewsPath)

hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Dushyant Chauhan'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req,res) => {

    res.send({
        products:[]
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        errorMessage:'Page Not Found'
    })
})

app.listen(3000,() => {
    console.log('server is up on port 3000')
})

