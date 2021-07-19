const express = require('express');
const exphbs = require('express-handlebars');
const bodyP = require('body-parser');
const path = require('path');
const controllers = require('./controllers/controllers');

var app = express();
var port = process.env.PORT || 3000;
app.listen(port);

app.use(bodyP.urlencoded({
    extended: true
}));

app.engine('html', exphbs({
    extname: "html",
    defaultLayout: "mainLayout"
}));

app.set('view engine', "html")

app.use('', controllers);

app.use(express.static(path.join(__dirname, '')));