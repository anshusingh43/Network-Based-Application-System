var path = require('path');
var item = require(path.join(__dirname + '/../model/Item.js'));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/MyDataApp');
var Schema = mongoose.Schema;

// var allItemList = [
//   new item(
//       'B1',
//       "Paneer Veg Sauted",
//       "Breakfast",
//       "Paneer Veg Sauted",
//       "5",
//       "../assets/images/paneerChilly.jpg"),
//   new item(
//       "L1",
//       "Chicken Rice",
//       "Lunch",
//       "Chicken Rice",
//       "4",
//       "../assets/images/Chicken_Rice.jpg"),
//   new item(
//       "D1",
//       "Lentil Soup",
//       "Dinner",
//       "Lentil Soup",
//       "3",
//       "../assets/images/Lentil_Soup.jpg"
//   ),
//   new item(
//       "B2",
//       "Avocado Toast",
//       "Breakfast",
//       "Avocado Toast",
//       "5",
//       "../assets/images/avocado_toast.jpeg"
//   ),
//   new item(
//       "L2",
//       "Sauted Fish",
//       "Lunch",
//       "Sauted Fish",
//       "2",
//       "../assets/images/Sauted_Fish.jpg"
//   ),
//   new item(
//       "D2",
//       "Salted Oats And Soyabean",
//       "Dinner",
//       "Salted Oats And Soyabean",
//       "2",
//       "../assets/images/Salted_oats_and_soyabean.jpeg"
//   ),
//   new item(
//       "B3",
//       "Oats Twisted",
//       "Breakfast",
//       "Oats Twisted",
//       "2",
//       "../assets/images/Oats_twisted.jpg"
//   ),
//   new item(
//       "L3",
//       "Veg Bowl With Humus",
//       "Lunch",
//       "Veg Bowl With Humus",
//       "1",
//       "../assets/images/Veg_bowl_with_humus.jpg"
//   ),
//   new item(
//       "D3",
//       "Budda Bowl",
//       "Dinner",
//       "Budda Bowl",
//       "3",
//       "../assets/images/Budda_Bowl.jpg"
//   )
// ];

//retrieving all items
// function getItems(){
//   // return allItemList;
//   var query = item.find();
//   return query;
// }


module.exports.getallItems = function(){
  var query = Item.find();
  return query;
}

// function getItemById(itemId){
//   for (var i = 0; i < allItemList.length; i++){
//     if(allItemList[i].item_code == itemId){
//       return allItemList[i];
//     }
//   }
// }


//getting element by ID
/*module.exports.getItem=function(id){
  var query=Item.find({itemcode:id});
  return query;
}


module.exports.getItems = getItems;*/
//module.exports.getItemById = getItemById;

