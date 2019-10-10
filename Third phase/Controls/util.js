var item = require('../model/ItemDB.js');

var getItems = function()
{
  var items =
  [
    item.Paneer_Veg_Sauted,
    item.Chicken_Rice,
    item.Lentil_Soup,
    item.Avocado_Toast,
    item.Sauted_Fish,
    item.Salted_Soyaoats,
    item.Oats_Twisted,
    item.Veg_Bowl_With_Humus,
    item.Budda_Bowl,
    item.Beery_Merry,
    item.Mushroom_Chicken,
    item.Egg_white_Salad,
    item.Eggitarian_Twist,
    item.Chicken_Tikka,
    item.SalsaVeg_Burito

  ];
  return items;
};

var getItem = function(item_code)
{

var itemId = item_code;

if(itemId == 'B1'){
  return item.Paneer_Veg_Sauted;
}
else if(itemId == 'L1'){
  return item.Chicken_Rice;
}
else if(itemId == 'D1'){
  return item.Lentil_Soup;
}
else if(itemId == 'B2'){
  return item.Avocado_Toast;
}
else if(itemId == 'L2'){
  return item.Sauted_Fish;
}
else if(itemId == 'D2'){
  return item.Salted_Soyaoats;
}
else if(itemId == 'B3'){
  return item.Oats_Twisted;
}
else if(itemId == 'L3'){
  return item.Veg_Bowl_With_Humus;
}
else if(itemId == 'D3'){
  return item.Budda_Bowl;
}
else if(itemId == 'B4'){
  return item.Beery_Merry;
}
else if(itemId == 'L4'){
  return item.Mushroom_Chicken;
}
else if(itemId == 'D4'){
  return item.Egg_white_Salad;
}
else if(itemId == 'B5'){
  return item.Eggitarian_Twist;
}
else if(itemId == 'L5'){
  return item.SalsaVeg_Burito;
}
else if(itemId == 'D5'){
  return item.Chicken_Tikka;
}
else {
  console.log("No match found")
}
};

module.exports.getItems = getItems;

module.exports.getItem = getItem;
