var Message = require('../models/message');

exports.index = function(req, res, next) {
    Message.find({})
    .exec(function(err, messages) {
        if (err) { return next(err) }
        res.render('index', {title: "ClubHouse", messages: [{"title":"First post", "text":"First comment"},{"title":"Slow", "text":"Missed by an inch"}]})
    });
}

exports.message_create_get = function(req, res, next) {
    res.send("Create new message get")
}

exports.message_create_post = function(req, res, next) {
    res.send("Create new message post")
}

exports.message_delete_get = function(req, res, next) {
    res.send("Delete a message get")
}

exports.message_delete_post = function(req, res, next) {
    res.send("Delete a message post")
}