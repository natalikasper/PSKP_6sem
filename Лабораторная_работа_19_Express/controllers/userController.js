const User = require("../models/user.js");
 
exports.addUser = function (request, response){
    console.log("Добавление пользователя");
    response.render("create.hbs");
};
exports.getUsers = function(request, response){
    response.render("users.hbs", {
        users: User.getAll()
    });
};

exports.postUser= function(request, response){
    const username = request.body.name;
    const userage = request.body.age;
    const user = new User(username, userage);
    user.save();
    console.log(user);
    response.redirect("/users");
};