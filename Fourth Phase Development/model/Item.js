var mongoose = require('mongoose');

var item_Schema = new mongoose.Schema(
    {
        item_code: String,
        Name: String,
        Catalog_Category: String,
        description: String,
        rating: String,
        imageUrl: String
    },
    {collection: 'item'}
);

var item = mongoose.model('item', item_Schema);

module.exports = item;