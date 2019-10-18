var express  = require('express');
var app = express();
var path = require('path');
var itemDB = require('./model/ItemDB.js');
var userdatabase = require('./model/UserDB.js');
var ItemsOfUser = require('./model/UserItem.js');
var item = require('./model/Item.js');
const { check,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

console.log(path.join(__dirname + '/Controls/mongoose.js'));
var mongoose = require(path.join(__dirname + '/Controls/mongoose.js'));
var url = require('url');

app.set('view engine', 'ejs');//setting the view engine
var util = require('./Controls/util');

var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended : false});

//set the path for static files to be accessible (in this case, our static file is in assets, therefore assets)
app.use('/assets', express.static('assets'));

//Require controller modules.
console.log(path.join(__dirname + '/ProfileController'));
var profileController = require('./Controls/ProfileController');
app.use(profileController);

app.get('/', function(req,res){
    res.render('index');
});

app.get('/index', function(req,res){
    res.render('index');
});

// app.get('/categories', function(req,res){
//   res.render('categories');
// });

app.get('/categories', function(req,res){

    item.find({}, function(err, allItems) {
        if (err) throw err;

        if (allItems) {
            var category = [];
            var arrayOfRecipe=[];

            for(var i=0; i < allItems.length; i++){

                category.push(allItems[i]);
            }

            if(Object.keys(req.query).length === 0){
                res.render('categories',{qs:category});
            } else {
                category.forEach(function(itemX)
                {
                    if(itemX.Catalog_Category === req.query.Catalog_Category)
                    {
                        arrayOfRecipe.push(itemX);
                    }
                });

                if(arrayOfRecipe.length!=0)
                    res.render('categories',{qs:arrayOfRecipe});
                else {
                    res.render('categories',{qs:category});
                }
            }

        } else {

            console.log("Error occurred in fetching data/No data found.");
        }
    });

});


app.get('/MyItems', function(req,res){
    var userItmLst = req.session.currentProfile;//sending signed in user profile

    var action = req.query.action;
    var itemId = req.query.item_code;

    if(action === "delete") {
        return deleteButtonAction(req, res, itemId);
    }

    if(userItmLst == undefined){
        return userNotSignedIn(req, res);
    } else {
        return getuseritems(req, res, userItmLst);
    }

});

function deleteButtonAction(req, res, itemId) {

    ItemsOfUser.findOneAndDelete(
        {item_code : itemId},
        function (err, doc) {
            if (err) {
                throw err;
            } else {

                req.query.action = "";
                res.redirect('back');
            }
        }
    );
}

function userNotSignedIn(req, res) {

    res.render('MyItems', {MyItemList:undefined});
}

function getuseritems(req, res, userItmLst){

    ItemsOfUser.find({}, function (err, result) {
        if (err) throw err;
        if (result) {
            var resultData = [];
            for (let i = 0; i < result.length; i++) {
                if (result[i].userId == userItmLst.userId) {
                    resultData.push(result[i]);
                }
            }
            res.render('MyItems', {MyItemList: resultData});
        } else {
            console.log("No data found");
        }
    });
}

app.get('/MyItems*', function(req,res){
    res.send('Invalid URL');
});

app.get('/SignIn', function(req,res){
    //res.render('signIn',{userData : '', sessionData : ''});

    var userSignedIn = req.session.currentProfile;

    if(userSignedIn === undefined){
        res.render('signIn',{userData : '', sessionData : ''});
    } else {
        res.render('signIn', {
            userData: userSignedIn.firstName,
            sessionData: req.session.theUser, defaultUsr: defaultUsr, usr: undefined
        });
    }

});

app.get('/logOut', function(req, res){
    req.session.destroy();
    res.render('index');
});

app.get('/about', function(req,res){
    res.render('about');
});

app.get('/contact', function(req,res){
    res.render('contact');
});

app.get('/feedback', function(req,res){

    var itemId = req.query.item_code;

    item.find({}, function (err, doc) {  // callback
        if (err) {
            throw err;
        }
        if(doc){

            for(let i=0;i<doc.length;i++){
                if(doc[i].item_code == itemId){
                    res.render('feedback',{data:doc[i]});
                    return;
                }
            }
            res.render('Item',{qs:doc});
        } else {
            //render or give some message
            console.log("No data");

        }
    });

});

function updateButtonAction(req, res, itemId, updatedVal) {

    ItemsOfUser.findOneAndUpdate(
        {item_code : itemId},
        {rating : updatedVal},
        {upsert: false, new: true, runValidators: true}, // options
        function (err, doc) {
            if (err) {
                throw err;
            } else {

                req.query.action = "";
                var userItmLst = req.session.currentProfile;
                ItemsOfUser.find({}, function (err, result) {
                    if (err) throw err;
                    if (result) {
                        var resultData = [];
                        for (let i = 0; i < result.length; i++) {
                            if (result[i].userId == userItmLst.userId) {
                                resultData.push(result[i]);
                            }
                        }
                        res.render('MyItems', {MyItemList: resultData});
                    } else {
                        console.log("No data found");
                    }
                });

            }
        }
    );
}


app.get('/feedback*', function(req,res){
    res.send('Invalid URL');
});

app.get('/itemID',function(req,res)
{

    var ID  = req.query.item_code;

    item.find({}, function(err, result) {
        if (err) throw err;
        if (result) {
            let data;
            let category = [];
            for(let i = 0; i < result.length; i++){

                category.push(result[i]);
                if(result[i].item_code === ID){
                    data = result[i];
                }
            }

            if(data != null || data != undefined){
                res.render('item',{data:data});
            }else {
                res.render('categories', {qs: category});
            }
        } else {
            console.log("No data");
        }
    });
});


app.post('/MyItems', urlEncodedParser, function(req, res){

    var itemId = req.query.item_code;
    var action = req.query.action;
    var selectedrate = req.body.selectRate;
    var userItmLst = req.session.currentProfile;

    if(action === "update") {
        return updateButtonAction(req, res, itemId, selectedrate);

    } else if (action === "save"){
        return saveNewitem(req, res);

    }

    if(userItmLst == undefined){
        return userNotSignedIn(req, res);
    } else {
        return getuseritems(req, res, userItmLst);
    }

});

function saveNewitem(req, res){
    var ID  = req.query.item_code;
    var userItmLst = req.session.currentProfile;

    item.find({}, function(err, result) {
        if (err) throw err;
        if (result) {
            let data;
            let category = [];
            for(let i = 0; i < result.length; i++){

                category.push(result[i]);
                if(result[i].item_code === ID){
                    data = new ItemsOfUser({
                        Name: result[i].Name,
                        rating: result[i].rating,
                        status: "Yes",
                        category: result[i].Catalog_Category,
                        userId: userItmLst.userId,
                        item_code: result[i].item_code
                    });
                }
            }

            data.save(function (err) {
                    if (!err) {
                        //render to My Items page

                        ItemsOfUser.find({}, function (err, result) {
                            if (err) throw err;
                            if (result) {
                                var resultData = [];
                                for (let i = 0; i < result.length; i++) {
                                    if (result[i].userId == userItmLst.userId) {
                                        resultData.push(result[i]);
                                    }
                                }
                                res.render('MyItems', {MyItemList: resultData});
                            } else {
                                console.log("No data found");
                            }
                        });
                    } else {
                        console.log("Error is saving")
                    }
                }
            );
            /*if(data != null || data != undefined){
                res.render('item',{data:data});
            }else {
                res.render('categories', {qs: category});
            }*/
        } else {
            console.log("No data");
        }
    });
}

app.post('/', urlEncodedParser, function(req, res){
    res.render('index');
});

app.get('/*', function(req,res){
    res.send('Invalid URL');
});

app.listen(8080,function(){
    console.log('listening on port 8080')
});
