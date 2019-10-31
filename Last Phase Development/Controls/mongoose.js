var mongoose = require('mongoose');

var connection = mongoose.connect('mongodb://localhost:27017/MyDataApp', { useNewUrlParser: true });

// make this available in application
module.exports = mongoose;
module.exports = connection;
