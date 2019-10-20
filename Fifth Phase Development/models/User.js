var mongoose = require('mongoose');

var user_schema =new mongoose.Schema(
    {
        userId: Number,
        firstName: String,
        lastName: String,
        emailAddress: String,
        password: Number,
        address1Field: String,
        address2Field: String,
        city: String,
        state: String,
        postCode: String,
        country: String
        },  { collection: 'user'}
);

module.exports = mongoose.model('user', user_schema);
;