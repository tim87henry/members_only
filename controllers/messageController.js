var Message = require('../models/message');

exports.index = function(req, res, next) {
    Message.find({}).populate('user')
    .exec(function(err, messages) {
        console.log("HOME PAGE ::   "+messages);
        if (err) { return next(err) }
        res.render('index', {title: "ClubHouse", messages: messages, user: req.user})
    });
}

exports.message_create_get = function(req, res, next) {
    res.render('create_message');
}

exports.message_create_post = function(req, res, next) {
    console.log("MESSAGE IS "+req.user)
    var message = new Message({
        title: req.body.title,
        text: req.body.text,
        user: req.user,
        time: new Date()
    })
    console.log("SAVED IS "+message)
    message.save(function(err) {
        if (err) { return next(err)}
        res.redirect('/')
    })
}

exports.message_delete_get = function(req, res, next) {
    Message.findById(req.params.id)
    .exec(function(err, message) {
        if (err) { return next(err); }
        res.render('delete_message', {message:message});
    })
}

exports.message_delete_post = function(req, res, next) {
    console.log("DELETE MESSAGE ::  "+req.params.id)
    Message.findByIdAndRemove(req.params.id)
    .exec(function(err) {
        if(err) { return next(err); }
        res.redirect('/');
    })
}