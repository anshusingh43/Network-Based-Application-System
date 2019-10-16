var path = require('path');
var user = require(path.join(__dirname + '/../model/User.js'));
var profileOfUser = require(path.join(__dirname + '/../model/UserProfile.js'));
var ItemsOfUser = require(path.join(__dirname + '/../model/UserItem.js'));

/*
var listUsers = [
    new user("1", "Anshu", "Singh", "anshu234@gmail.com", "Shipra Sunsity ", "Ats Advantage",
        "New Delhi", "ND", "201013", "India"),
    new user("2", "Aastha", "Singh", "aastha211@gmail.com", "Diamond City", "Park State",
        "Udaipur", "RJ", "21342", "India")
];*/

/*var UserList1 = [
    new ItemsOfUser('B1','Paneer Chilly','BreakFast','5', 'Yes'),
    new ItemsOfUser('D3','Budha Bowl','Dinner','4', 'No'),
    new ItemsOfUser('L2','Sauted Fish','Lunch','2','Yes')
];

var UserList2 = [
    new ItemsOfUser('D3','Budha Bowl','Dinner','5', 'Yes'),
    new ItemsOfUser('L1','Chicken Rice','Dinner','5', 'No')
];

var UserProfileList = [
    new profileOfUser("1", UserList1),
    new profileOfUser("2", UserList2)
];*/

function getUsers() {
    return listUsers;
}

function getUserItems(userId) {
    var newProfileList;
    for (let i = 0; i < UserProfileList.length; i++) {
        if(UserProfileList[i].userId === userId) {
            newProfileList = UserProfileList[i].userItems;
        }
    }
    return newProfileList;
}

function getUserById(userId) {
    var Detail_User;
    for (let i = 0; i < listUsers.length; i++) {
        if(listUsers[i].userId === userId) {
            Detail_User = listUsers[i];
            break;
        }
    }
    return Detail_User;
}

module.exports.getUsers = getUsers;
module.exports.getUserItems = getUserItems;
module.exports.getUserById = getUserById;
