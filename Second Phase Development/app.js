var express  = require('express');
var app = express();


app.set('view engine', 'ejs');//setting the view engine
var util = require('./util');

//set the path for static files to be accessible (in this case, our static file is in assets, therefore assets)
app.use('/assets', express.static('assets'));

app.get('/', function(req,res){
  res.render('index');
});

app.get('/index', function(req,res){
  res.render('index');
});

// app.get('/categories', function(req,res){
//   res.render('categories');
// });

app.get('/categories', function(req,res){
  var category = util.getItems();
    var arrayOfRecipe=[];
    if(Object.keys(req.query).length===0){
        res.render('categories',{qs:category});
      }
    else
    {
        category.forEach(function(item)
        {
            if(item.Catalog_Category===req.query.Catalog_Category)
                {
                    arrayOfRecipe.push(item);
                }
              });
              console.log(arrayOfRecipe);
              if(arrayOfRecipe.length!=0)
              res.render('categories',{qs:arrayOfRecipe});
              else {
                res.render('categories',{qs:category});
              }
      }
});

app.get('/MyItems', function(req,res){
  res.render('MyItems');
});
app.get('/MyItems*', function(req,res){
  res.send('Invalid URL');
});
app.get('/Item', function(req,res){
  res.render('Item');
});

app.get('/about', function(req,res){
  res.render('about');
});

app.get('/contact', function(req,res){
  res.render('contact');
});

app.get('/feedback', function(req,res){
  var ID  = req.query.item_code;
  var data =  util.getItem(ID);
    if(data == undefined)
        {
            var empty =util.getItems();
            res.render('Item',{qs:empty});
        }
    else
        {
            res.render('feedback',{data:data});
        }
});

app.get('/feedback*', function(req,res){
  res.send('Invalid URL');
});

app.get('/itemID',function(req,res)
{
  var ID  = req.query.item_code;
  var data =  util.getItem(ID);
    if(data == undefined)
        {
            var empty = util.getItems();
            res.render('categories',{qs:empty});
        }
    else
        {
  res.render('item',{data:data});
        }
});

app.get('/*', function(req,res){
  res.send('Invalid URL');
});

app.listen(8080,function(){
    console.log('listening on port 8080')
});
