require('../model/connection');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Item = mongoose.model('item');
const PriseCheck = mongoose.model('priseOption');
const fs = require('fs');



router.get('/', function(req, res){
    fs.readdir('./images/MainPics/', function(err, files){
        PriseCheck.find(function(err, data2){
            Item.find(function(err, data){
                if(!err){
                    res.render('./layouts/index', {
                        itemList: data,
                        priseCheckList: data2,
                        mainPicNum: files.length
                    });
                }
            }).lean();
        }).lean();
    });
});

router.get('/manage', function(req, res){
    fs.readdir('./images/MainPics/', function(err, files){
        PriseCheck.find(function(err, data2){
            Item.find(function(err, data){
                if(!err){
                    res.render('./layouts/manage', {
                        itemList: data,
                        priseCheckList: data2,
                        mainPicNum: files.length
                    });
                }
            }).lean();
        }).lean();
    });
});

router.post('/addItem', function(req, res){
    if(req.body._id == ""){
       var item = new Item();
        item.catigory = req.body.catigory;
        item.gender = req.body.gender;
        item.prise = req.body.prise;
        item.imgSrc = req.body.imgSrc;
        item.text = req.body.text;
        item.save(function(err){
            if(!err) res.redirect('/manage');
        }); 
    }
    else{
        Item.findByIdAndUpdate({_id: req.body._id}, req.body, {new: true}, function(err){
            if(!err) res.redirect('/manage');
        });
    }
});

router.get('/deleteItem/:id', function(req, res){
    Item.findByIdAndRemove(req.params.id, function(err){
        res.redirect('/manage');
    });
});



router.post('/newPriseCheckbox', function(req, res){
    if(req.body._id == ""){
        var priseCheck = new PriseCheck();
        priseCheck.priseCheckbox = req.body.priseCheckbox;
        priseCheck.save(function(err){
            if(!err) res.redirect('/manage');
        });
    }
    else{
        PriseCheck.findByIdAndUpdate({_id: req.body._id}, req.body, {new: true}, function(err){
            if(!err) res.redirect('/manage');
        });
    }
});



router.get('/deletePriseCheck/:id', function(req, res){
    PriseCheck.findByIdAndRemove(req.params.id, function(err){
        if(!err) res.redirect('/manage');
    });
});

module.exports = router;