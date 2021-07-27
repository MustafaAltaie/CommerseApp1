const mongoose = require('mongoose');


var newItem = new mongoose.Schema({
    catigory: {type: String},
    gender: {type: String},
    prise: {type: String},
    imgSrc: {type: String},
    text: {type: String}
});
mongoose.model('item', newItem);


var newCheck = new mongoose.Schema({
    priseCheckbox: {type: String}
});
mongoose.model('priseOption', newCheck);