var User = require('../models/user');
const {body, validationResult, check} = require('express-validator');

exports.user_create_get = function(req, res, next) {
    res.render('sign_up');
}

exports.user_create_post = [
    body('first_name', 'Please enter first name').trim().isLength({ min: 1}).escape(),
    body('last_name', 'Please enter last name').trim().isLength({ min: 1}).escape(),
    body('username', 'Please enter username').trim().isLength({ min: 1}).escape(),
    body('password', 'Please enter password').trim().isLength({ min: 1}).escape(),
    check(
        'custom_password',
        'Password confirmation field must have the same value as the password field',
    )
    .exists()
    .custom((value, { req }) => value === req.body.password),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('sign_up', {errors: errors.array()});
        } else {
            var user = new User(
                {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    username: req.body.username,
                    password: req.body.password,
                    country: req.body.country,
                    is_member: false,
                    is_admin: false
                }
            );
    
            user.save(function(err) {
                if (err) { return next(err)}
                res.redirect('/')
            })
        }
}]

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