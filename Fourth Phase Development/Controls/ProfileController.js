var express = require('express');
var app = module.exports = express();
var path = require('path');
var profileOfUser = require(path.join(__dirname + '/../model/UserProfile.js'));
var userdatabase = require(path.join(__dirname + '/../model/UserDB.js'));
var itemDB = require(path.join(__dirname + '/../model/ItemDB.js'));
var url = require('url');
var session = require('express-session');
var mongoose = require(path.join(__dirname + '/../Controls/mongoose.js'));
var user = require(path.join(__dirname+'/../model/User.js'))

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


app.post('/signIn', urlEncodedParser, function(req, res) {
    var theUser;
    var defaultUser;

    // for validation
    req.assert('userId','Invalid Email ID').trim().isEmail();
    req.assert('password','Invalid Password').trim().matches(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/);
    var errors=req.validationErrors();

    if(errors){
        res.render('signin',{message:'2'});
        console.log("Here, initial signin errors.");
    }
    //till above line was the new validation code
    req.session.theUser = req.body;
    var userDetails;

    var userIdDataReg = /^-{0,1}\d+$/;

    if (userIdDataReg.test(req.session.theUser.userId)) {

        //if number
        user.findOne({userId: req.session.theUser.userId}, function (err, userDet) {
            if (err) throw err;
            if (userDet) {
                userDetails = userDet;
                req.session.currentProfile = userDetails;

                req.session.defaultUser = "not default";
                defaultUsr = req.session.defaultUser;

                res.render('signIn', {
                    userData: userDetails.firstName,
                    sessionData: req.session.theUser, defaultUsr: defaultUsr, usr: undefined
                });

            } else {
                res.render('signIn', {
                    userData: 'Invalid or No User/password provided',
                    sessionData: req.session.theUser, defaultUsr: "not default", usr: undefined
                });
                //sending all the user detail
                console.log("Error");
            }
            //req.session.currentProfile = userDetails;
        });
    } else {
        res.render('signIn', {
            userData: 'Invalid or No User/password provided',
            sessionData: req.session.theUser, defaultUsr: "not default", usr: undefined
        });
    }
});


