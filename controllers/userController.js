var User = require('../models/user');
const {body, validationResult, check} = require('express-validator');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) { 
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect password" });
        }
      });
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

exports.user_create_get = function(req, res, next) {
    res.render('sign_up', {title: "Sign Up"});
}

exports.user_create_post = [
    body('first_name', 'Please enter first name').trim().isLength({ min: 1}).escape(),
    body('last_name', 'Please enter last name').trim().isLength({ min: 1}).escape(),
    body('username', 'Please enter username').trim().isLength({ min: 1}).escape(),
    body('password', 'Please enter password').trim().isLength({ min: 1}).escape(),
    check('password').exists(),
    check(
        'confirm_password',
        'Password confirmation field must have the same value as the password field',
    )
    .exists()
    .custom((value, { req }) => value === req.body.password),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('sign_up', {errors: errors.array(), title: "Sign Up"});
        } else {
                 bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
                if (err) { 
                    return next(err);
                } else {
                    var user = new User(
                    {
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        username: req.body.username,
                        password: hashedPassword,
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
            });
        }
    }
]

exports.user_sign_in_get = function(req, res, next) {
    res.render('sign_in', {title: "Sign In"})
}

exports.user_sign_in_post = passport.authenticate("local",{
    successRedirect: "/",
    failureRedirect: "/"
});

exports.user_sign_out = function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err);}
    res.redirect('/');
  });
}

exports.user_join_get = function(req, res, next) {
    res.render('join_club', {error: "", title: "Join Club"});
}

exports.user_join_post = function(req, res, next) {
    if (req.body.password === 'forzamilan') {
        User.update({_id: req.params.id},{
            is_member: true
        }, function(err, resp) {
            if (err) { return next(err); }
            res.redirect("/")
        })
    } else {
        res.render('join_club', {error: "Wrong passcode. Not a member yet.", title: "Join Club"})
    }
}

exports.user_admin_get = function(req, res, next) {
    res.render('become_admin', {title: "Upgrade yourself"});
}

exports.user_admin_post = function(req, res, next) {
    User.update({_id: req.params.id},{
        is_admin: true
    }, function(err, resp) {
        if (err) { return next(err); }
        res.redirect("/");
    });
}