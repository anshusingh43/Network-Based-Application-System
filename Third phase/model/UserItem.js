var userItem = function userItem(item_code,item,category, rating, madeIt) {

    this.item_code = item_code;
    this.item  = item;
    this.category = category;
    this.rating = rating;
    this.madeIt = madeIt;
}

module.exports = userItem;  