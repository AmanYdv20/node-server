const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

app.use(express.static(__dirname + '/home'));

app.use((req, res, next)=> {
  var time = new Date().toString();
  var log = `${time}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n');
  next();
});
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});



app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeMessage: 'Welcome to my webpage',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About this page',
    currentYear: new Date().getFullYear(),
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
