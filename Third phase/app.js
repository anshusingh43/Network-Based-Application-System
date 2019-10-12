var express  = require('express');
var app = express();
var path = require('path');
var itemDB = require('./model/ItemDB.js');
var userdatabase = require('./model/UserDB.js');
var ItemsOfUser = require('./model/UserItem.js');

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
    //var category = util.getItems();
    var category = itemDB.getItems();
    var arrayOfRecipe=[];
    if(Object.keys(req.query).length===0){
        res.render('categories',{qs:category});
    } else {
        category.forEach(function(item)
        {
            if(item.Catalog_Category===req.query.Catalog_Category)
            {
                arrayOfRecipe.push(item);
            }
        });
        if(arrayOfRecipe.length!=0)
            res.render('categories',{qs:arrayOfRecipe});
        else {
            res.render('categories',{qs:category});
        }
    }
});


app.get('/MyItems', function(req,res){
    var userItmLst = req.session.currentProfile;//sending all the user specific list in userItmlst

    var action = req.query.action;
    var itemId = req.query.item_code;

    if(action === "delete"){
        for(var i=0;i<userItmLst.length;i++){
            if(userItmLst[i].item_code === itemId){
                userItmLst.splice(i, 1);
            }
        }
    }

    console.log(userItmLst);
    req.session.currentProfile = userItmLst;

    res.render('MyItems',{MyItemList:userItmLst})
});
app.get('/MyItems*', function(req,res){
    res.send('Invalid URL');
});

app.get('/SignIn', function(req,res){
    res.render('signIn',{userData : '', sessionData : ''});
});

app.get('/logOut', function(req, res){
    req.session.destroy();
    res.render('index');
});
/*
app.get('/Item', function(req,res){
    res.render('Item');
});
*/

app.get('/about', function(req,res){
    res.render('about');
});

app.get('/contact', function(req,res){
    res.render('contact');
});

app.get('/feedback', function(req,res){
    var ID  = req.query.item_code;
    var data = itemDB.getItemById(ID);
    if(data == undefined)
    {
        //var empty =util.getItems();
        var empty = itemDB.getItems();
        res.render('Item',{qs:empty});
    }
    else
    {
        res.render('feedback',{data:data});
    }
});

app.get('/feedback*', function(req,res){
    res.send('Invalid URL');
});

app.get('/itemID',function(req,res)
{
    var ID  = req.query.item_code;
    //var data =  util.getItem(ID);
    var data = itemDB.getItemById(ID);
    if(data == undefined)
    {
        var empty = util.getItems();
        res.render('categories',{qs:empty});
    }
    else
    {
        res.render('item',{data:data});
    }
});


app.post('/MyItems', urlEncodedParser, function(req, res){

    var itemId = req.query.item_code;
    var action = req.query.action;
    var selectedrate = req.body.selectRate;
    var userItmLst = req.session.currentProfile;

    if(action === "update") {
        for (var i = 0; i < userItmLst.length; i++) {
            if (userItmLst[i].item_code === itemId) {
                userItmLst[i].rating = selectedrate;
            }
        }
        req.session.currentProfile = userItmLst; //update the session with new value again
    } else if (action === "save"){
        var newItem = itemDB.getItemById(itemId);
        var additem = new ItemsOfUser(newItem.item_code, newItem.Name, newItem.Catalog_Category, newItem.Rating, "No");
            userItmLst.push(additem);
            req.session.currentProfile = userItmLst;
        }
    res.render('MyItems',{MyItemList:userItmLst})
});

app.post('/', urlEncodedParser, function(req, res){
    res.render('index');
});

app.get('/*', function(req,res){
    res.send('Invalid URL');
});

app.listen(8000,function(){
    console.log('listening on port 8000')
});
