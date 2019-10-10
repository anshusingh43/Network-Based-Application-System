
var item = function item(item_code,Name, Catalog_Category, Description,
                         Rating, ImageURL) {

    this.item_code  = item_code;
    this.Name = Name;
    this.Catalog_Category  = Catalog_Category;
    this.Description = Description;
    this.Rating  = Rating;
    this.ImageURL  = ImageURL;
};

module.exports = item;