const express = require('express');
const exphbs = require('express-handlebars');
const bodyP = require('body-parser');
const socket = require('socket.io');
const path = require('path');
const fileUpload = require('express-fileupload');
const controllers = require('./controllers/controllers');
const fs = require('fs');

var app = express();
var port = process.env.PORT || 3000;
var server = app.listen(port);

var io = socket(server);

io.on('connection', function(socket){
    console.log('Socket connected');
    socket.on('reload', function(){
        io.sockets.emit('reload');
    });
    socket.on('newOrder', function(){
        io.sockets.emit('newOrder');
    });
});

app.use(bodyP.urlencoded({
    extended: true
}));


app.use(fileUpload());


app.engine('html', exphbs({
    extname: "html",
    defaultLayout: "mainLayout"
}));

app.set('view engine', "html")

app.use('', controllers);

app.use(express.static(path.join(__dirname, '')));