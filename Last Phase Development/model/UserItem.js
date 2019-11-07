var mongoose = require('mongoose');

var UserItem_Schema = new mongoose.Schema(
    {
            Name: String,
            rating: String,
            status: String,
            category: String,
            userId: String,
            item_code: String
    },
    {collection: 'userItem'}
);

var UserItem_Schema = mongoose.model('userItem', UserItem_Schema);

module.exports = UserItem_Schema;