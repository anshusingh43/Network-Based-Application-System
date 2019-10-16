# Network-Based-Application-System
This repository have all the code I used from start to build my webApp. I have used Node.js and javascript with html and CSS.

My webApp name is HEALTHYU where food and health enthusiast can contribute in sharing their recipe or liking someone's and saving them later in their MyRecipe cart. They can rate the recipe they like and pin the recipe in the cart section that they have tried it and liked it. It is the easiest way to find all the delicious recipe from other food+health blogger and you can showcase your food skills too by adding the recipe to your page so that other's can see it, like it and save it for their use.

Lets get started!

In the first phase of project, I created static pages for my Homepage which is the main page of my app. We then have Categories page which will show us different food items seperated in 3 different categories - Breakfast, Lunch and Dinner. Item page will show us the detail of particular food item selected from the Category page like Ratings,Description, Ingredients used and the recipe for the selected food item. MyItems page will open up MyRecipe tab where one can see theirs cart which have saved food items and the ratings, button to update the ratings or to delete that items from the cart.

The second phase has sub-category to work on -
1. Converted existing pages to the EJS template.
2. Created a module view where we have a common Main pages i.e header, navigation and footer for all the pages in it.
3. Created 2 more pages i.e. about.ejs and contact.ejs with little description.
4. Created a JS page named ItemDB.js inside model where I have hard coded vlaues ( hard coded database for now) and made the connection with other pages.
5. Created util.js, the last page for the connection of database to my rest of the page and fetching the hard coded value from ItemDB.js.
