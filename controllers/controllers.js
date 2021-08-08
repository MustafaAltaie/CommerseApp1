require('../model/connection');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Item = mongoose.model('item');
const NewOffer = mongoose.model('offer');
const PriseCheck = mongoose.model('priseOption');
const NewEmployee = mongoose.model('employee');
const fs = require('fs');


router.get('/', function(req, res){
    fs.readdir('./images/MainPics/', function(err, MainPics){
        fs.readdir('images/offer Images/', function(err, offeImagesFiles){
            NewOffer.find(function(err, data3){
                PriseCheck.find(function(err, data2){
                    Item.find(function(err, data){
                        NewEmployee.find(function(err, employeeData){
                            if(!err){
                                offeImagesFiles.forEach(function(){
                                    res.render('./layouts/index', {
                                        itemList: data,
                                        priseCheckList: data2,
                                        offerList: data3,
                                        mainPicNum: MainPics.length,
                                        offeImagesFilesList: offeImagesFiles,
                                        offeImagesFilesLength: offeImagesFiles.length,
                                        employeeList: employeeData
                                    });
                                });
                            }
                        }).lean();
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
                        NewEmployee.find(function(err, employeeData){
                            if(!err){
                                offeImagesFiles.forEach(function(){
                                    res.render('./layouts/manage', {
                                        itemList: data,
                                        priseCheckList: data2,
                                        offerList: data3,
                                        mainPicNum: MainPics.length,
                                        offeImagesFilesList: offeImagesFiles,
                                        offeImagesFilesLength: offeImagesFiles.length,
                                        employeeList: employeeData
                                    });
                                });
                            }
                        }).lean();
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
            var file = req.files.file;
            file.mv('images/products/' + req.body.imgSrc + '.jpg', function(){
                res.redirect('/manage');
            });
        }); 
    }
    else{
        Item.findByIdAndUpdate({_id: req.body._id}, req.body, {new: true}, function(err){
            if(!err) res.redirect('/manage');
        });
    }
});





router.get('/deleteItem/:id/:fileName', function(req, res){
    Item.findByIdAndRemove(req.params.id, function(err){
        fs.unlinkSync('images/products/' + req.params.fileName, function(){});
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


router.post('/uploadMainPic/', function(req, res){
    var file = req.files.file;
    fs.readdir('./images/MainPics/', (err, files) => {
        file.mv('images/MainPics/homePic' + parseInt(files.length+1) + '.jpg', function(err){
            if(!err) res.redirect('/manage');
        });
    });
});

router.get('/deleteMainPic/:n/:n2', function(req, res){
    fs.unlink("images/MainPics/homePic" + req.params.n + ".jpg", function(){});
    if(req.params.n != req.params.n2)
    fs.renameSync('images/MainPics/homePic' + req.params.n2 + '.jpg', 'images/MainPics/homePic' + req.params.n + '.jpg');
    res.redirect('/manage');
});


router.post('/addOfferImage', function(req, res){
    var file = req.files.file;
    var fileName = req.body.fileName;
    fs.readdir('./images/offer Images/', (err, files) => {
        file.mv('images/offer Images/' + fileName + ".jpg", function(err){
            if(!err) res.redirect('/manage');
        });
    });
});

router.get('/delOfferImage/:id', function(req, res){
    fs.unlinkSync('images/offer Images/' + req.params.id + '.jpg', function(){});
    res.redirect('/manage');
});


router.get('/editOfferImage/:oldName/:newName', function(req, res){
    fs.renameSync('images/offer Images/' + req.params.oldName, 'images/offer Images/' + req.params.newName);
    res.redirect('/manage');
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


router.post('/addEmployee', function(req, res){
    var newEmployee = new NewEmployee();
    newEmployee.name = req.body.employeeName;
    newEmployee.info = req.body.employeeInfo;
    newEmployee.save(function(){
        var file = req.files.file;
        file.mv('images/Employees/' + req.body.employeeName + '.jpg', function(){
            res.redirect('/manage');
        });
    });
});


router.get('/deleteEmployee/:id/:imgName', function(req, res){
    NewEmployee.findByIdAndRemove(req.params.id, function(){
        fs.unlinkSync('images/Employees/' + req.params.imgName + '.jpg', function(){});
        res.redirect('/manage');
    });
});

module.exports = router;