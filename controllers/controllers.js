require('../model/connection');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Item = mongoose.model('item');
const NewOffer = mongoose.model('offer');
const PriseCheck = mongoose.model('priseOption');
const fs = require('fs');


router.get('/', function(req, res){
    fs.readdir('./images/MainPics/', function(err, MainPics){
        fs.readdir('images/offer Images/', function(err, offeImagesFiles){
            NewOffer.find(function(err, data3){
                PriseCheck.find(function(err, data2){
                    Item.find(function(err, data){
                        if(!err){
                            offeImagesFiles.forEach(function(){
                                res.render('./layouts/index', {
                                    itemList: data,
                                    priseCheckList: data2,
                                    offerList: data3,
                                    mainPicNum: MainPics.length
                                });
                            });
                        }   
                    }).lean();
                }).lean();
            }).lean();
        });
    });
});

router.get('/manage', function(req, res){
    fs.readdir('./images/MainPics/', function(err, MainPics){
        fs.readdir('images/offer Images/', function(err, offeImagesFiles){
            NewOffer.find(function(err, data3){
                PriseCheck.find(function(err, data2){
                    Item.find(function(err, data){
                        if(!err){
                            offeImagesFiles.forEach(function(){
                                res.render('./layouts/manage', {
                                    itemList: data,
                                    priseCheckList: data2,
                                    offerList: data3,
                                    mainPicNum: MainPics.length,
                                    offeImagesFilesList: offeImagesFiles,
                                    offeImagesFilesLength: offeImagesFiles.length
                                });
                            });
                        }   
                    }).lean();
                }).lean();
            }).lean();
        });
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


router.get('/deleteMainPic/:n/:n2', function(req, res){
    fs.unlink("images/MainPics/homePic" + req.params.n + ".jpg", function(){});
    if(req.params.n != req.params.n2)
    fs.renameSync('images/MainPics/homePic' + req.params.n2 + '.jpg', 'images/MainPics/homePic' + req.params.n + '.jpg');
});


router.get('/delOfferImage/:id', function(req, res){
    fs.unlinkSync('images/offer Images/' + req.params.id + '.jpg', function(){});
});


router.post('/addOffer', function(req, res){
    if(req.body._id == ""){
        var newOffer = new NewOffer();
        newOffer.header = req.body.header;
        newOffer.image = req.body.image;
        newOffer.text = req.body.text;
        newOffer.prise = req.body.prise;
        newOffer.save(function(err){
            if(!err) res.redirect('/manage');
        });
    }
    else{
        NewOffer.findByIdAndUpdate({_id: req.body._id}, req.body, {new: true}, function(err){
            if(!err) res.redirect('/manage');
        });
    }
});



router.get('/deleteOffer/:id', function(req, res){
    NewOffer.findByIdAndRemove(req.params.id, function(err){
        if(!err) res.redirect('/manage');
    });
});



router.get('/m', function(req, res){
    fs.readdir('images/products/', function(err, files){
        files.forEach(function(){
            res.render('./layouts/m', {
                list: files,
                length: files.length
            });
        });
    });
});

module.exports = router;