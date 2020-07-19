const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utiles/geocode');
const forecast = require('./utiles/forecast');

const app = express();
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// way of getting the path of the html to be displayed
// Setup handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: "Arslan"
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Arslan Faisal'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Please help your self because the server is down!',
        title: 'Help',
        name: 'Arslan'
    })
})
// app.get('/help', (req, res) => {
//     res.send([{
//         name: "Arslan",
//         age: 27
//     },
//     {
//         name: "Faisal",
//         age: 57
//     }
//     ]);
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About Page</h1>');
// })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address!'
        });
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            return res.send({
                location: location,
                forecastData: forecastData,
                address: req.query.address
            });
        })

    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help Article not found!',
        title: "404",
        name: 'Arslan'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        errorMessage: '404 Page Not Found!',
        name: 'Arslan'
    });
})
// app.com
// app.com/help
// app.com/about

app.listen(port, () => {
    console.log('Server is up on port 3000');
})