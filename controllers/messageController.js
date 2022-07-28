var Message = require('../models/message');

exports.index = function(req, res, next) {
    Message.find({})
    .exec(function(err, messages) {
        if (err) { return next(err) }
        res.render('index', {title: "ClubHouse", messages: messages, user: req.user})
    });
}

exports.message_create_get = function(req, res, next) {
    res.render('create_message');
}

exports.message_create_post = function(req, res, next) {
    var message = new Message({
        title: req.body.title,
        text: req.body.text,
        user: req.user._id,
        time: new Date()
    })
    message.save(function(err) {
        if (err) { return next(err)}
        res.redirect('/')
    })
}

exports.message_delete_get = function(req, res, next) {
    res.send("Delete a message get")
}

exports.message_delete_post = function(req, res, next) {
    res.send("Delete a message post")
}