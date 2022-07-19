var User = require('../models/user');

exports.user_create_get = function(req, res, next) {
    res.render('sign_up');
}

exports.user_create_post = function(req, res, next) {
    res.send("Create a user post")
}

exports.user_join_get = function(req, res, next) {
    res.send("User becomes a member get")
}

exports.user_join_post = function(req, res, next) {
    res.send("User becomes a member post")
}

exports.user_admin_get = function(req, res, next) {
    res.send("User becomes an admin get")
}

exports.user_admin_post = function(req, res, next) {
    res.send("User becomes an admin post")
}