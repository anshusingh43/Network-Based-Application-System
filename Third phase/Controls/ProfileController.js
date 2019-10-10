var express = require('express');
var app = module.exports = express();
var path = require('path');
var profileOfUser = require(path.join(__dirname + '/../model/UserProfile.js'));
var userdatabase = require(path.join(__dirname + '/../model/UserDB.js'));
var itemDB = require(path.join(__dirname + '/../model/ItemDB.js'));
var url = require('url');
var session = require('express-session');

//to handle post requests
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended : false});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/../views'));
app.use('/resources', express.static(path.join(__dirname + '/../assets')));
app.use(session({secret: "Secret!"}));

var Object_User;
var Data_User;
var Details_User;
var myItemsLst;

app.post('/SignIn', urlEncodedParser, function(req, res){
    var theUser;
    var currentProfile;

    req.session.theUser = req.body;

    var userItemList = userdatabase.getUserItems(req.session.theUser.userId);//I should have an ID here
    var userDetails = userdatabase.getUserById(req.session.theUser.userId);

    if(req.session.theUser === undefined || req.session.theUser === null ||
        userItemList === undefined || userDetails === undefined) {


        res.render('SignIn', {userData : 'Invalid or No User/password provided',
            sessionData : req.session.theUser});
    } else {

        req.session.currentProfile = userItemList;

        res.render('SignIn', {userData : userDetails.firstName,
            sessionData : req.session.theUser});
    }
}
);

