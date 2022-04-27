import express from "express"
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { geocode } from "./utils/geocode.js";
import { forecast } from './utils/forecast.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = process.env.PORT || 3000

const app = express()
app.use(express.static(path.join(__dirname, '../public')))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/news', (req, res) => {
    res.render('news')
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'error message'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location }) => {
        if (error) {
            return res.send({ error: 1 })
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

app.get('/news/*', (req, res) => {
    res.render('404', {
        errorMess: '404 news'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMess: '404 page'
    })
})

app.listen(port)