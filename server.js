const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');


app.use((req, res, next) => {
    var now = new Date().toString();

    // console.log(`${now}: ${req.method} ${req.url}`);
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFileSync('server.log', log + '\n');
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
 //   res.send('<h1>hello world</h1>');
    // res.send({
    //     name: 'Alan',
    //     Likes: [
    //         'Biking', 
    //         'video games',
    //         'foods'
    //     ]
    // })
    res.render('home.hbs', {
        pageTitle: 'Home page from injection',
        welcomeMessage: 'Welcome home buddy'
    });
});

app.get('/about', (req, res) => {
    //res.send('<h1>About page</h1>')
    res.render('about.hbs', {
        pageTitle: 'About page from injection'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'This is an error message'
    });
});

app.listen(3000);
