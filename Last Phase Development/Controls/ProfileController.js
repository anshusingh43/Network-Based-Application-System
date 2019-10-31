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
var ItemsOfUser = require(path.join(__dirname+'/../model/UserItem.js'));
const { check,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

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


app.post('/signIn', urlEncodedParser,
    [check('userId')
    .not().isEmpty()
    .trim()
    .escape(),
    sanitizeBody('notifyOnReply').toBoolean()
], function(req, res) {
    var theUser;
    var defaultUser;

    req.session.theUser = req.body;
    var userDetails;

    var userIdDataReg = /^-{0,1}\d+$/;

    if (userIdDataReg.test(parseInt(req.session.theUser.userId))) {

        //if number
        user.findOne({userId: parseInt(req.session.theUser.userId), password:req.session.theUser.password}, function (err, userDet) {

            if (err) throw err;
            else{
                if (userDet) {
                    userDetails = userDet;
                    req.session.currentProfile = userDetails;

                    req.session.defaultUser = "not default";
                    defaultUsr = req.session.defaultUser;

                    res.render('SignIn', {
                        userData: userDetails.firstName,
                        sessionData: req.session.theUser, defaultUsr: defaultUsr, usr: undefined
                    }
                    );

                    // ItemsOfUser.find({}, function (err, result) {
                    //     if (err) throw err;
                    //     if (result) {
                    //         var resultData = [];
                    //         for (let i = 0; i < result.length; i++) {
                    //             if (result[i].userId == userItmLst.userId) {
                    //                 resultData.push(result[i]);
                    //             }
                    //         }
                    //         req.session.currentProfile = userDetails;
                    //         res.render('MyItems', {MyItemList: req.session.theUser.item});
                    //     } else {
                    //         console.log("No data found");
                    //     }
                    // });



                    // res.render('MyItems', {MyItemList:undefined});

                } else {
                    res.render('signIn', {
                        // userData: 'Invalid or No User/password provided',
                        userData: 'Invalid credentials',
                        sessionData: req.session.theUser, defaultUsr: "not default", usr: undefined
                    });
                    //sending all the user detail
                    console.log("Error");
                }
            }

            //
        });
    } else {
        res.render('signIn', {
            // userData: 'Invalid or No User/password provided',
            userData: 'Invalid credentials',
            sessionData: req.session.theUser, defaultUsr: "not default", usr: undefined
        });
    }
});


