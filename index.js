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
});

app.use(bodyP.urlencoded({
    extended: true
}));


app.use(fileUpload());

app.post('/addImage/', function(req, res){
    var file = req.files.file;
    var fileName = req.body.fileName;
    file.mv('images/products/' + fileName + '.jpg', function(err){
        if(!err) res.redirect('/manage');
    });
});




app.post('/uploadMainPic/', function(req, res){
    var file = req.files.file;
    fs.readdir('./images/MainPics/', (err, files) => {
        file.mv('images/MainPics/homePic' + parseInt(files.length+1) + '.jpg', function(err){
            if(!err) res.redirect('/manage');
        });
    });
});



app.post('/addOfferImage', function(req, res){
    var file = req.files.file;
    var fileName = req.body.fileName;
    fs.readdir('./images/offer Images/', (err, files) => {
        file.mv('images/offer Images/' + fileName + ".jpg", function(err){
            if(!err) res.redirect('/manage');
        });
    });
});





app.engine('html', exphbs({
    extname: "html",
    defaultLayout: "mainLayout"
}));

app.set('view engine', "html")

app.use('', controllers);

app.use(express.static(path.join(__dirname, '')));