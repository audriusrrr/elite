/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var passport = require('passport'),
     LocalStrategy = require('passport-local').Strategy,
     bcrypt = require('bcrypt');

module.exports = {

    login: function(req, res) {
        res.view('admin/signin');
    },
    process: function(req, res) {
    	passport.use(new LocalStrategy({
    	        usernameField: 'email',
    	        passwordField: 'password'
    	    },
    	    function(email, password, done) {

    	        User.findOne({ email: email }).exec(function(err, user) {
    	            if(err) { return done(err); }
    	            if(!user) { return done(null, false, { message: 'Unknown user ' + email }); }
    	            bcrypt.compare(password, user.encryptedPass, function(err, res) {
    	                if(!res) return done(null, false, {message: 'Invalid Password'});
    	                return done(null, user);
    	            });
    	        });
    	    }
    	));
        passport.authenticate('local', function(err, user, info) {

            if( (err)||(!user) ) {
                return res.send({
                    message: 'login failed'
                });
                res.send(err);
            }
            req.logIn(user, function(err) {
                if(err) res.send(err);

                res.redirect('admin/dashboard');
            });
        }) (req, res);
        passport.serializeUser(function(user, done) {
		    done(null, {
		    	'id': user.id,
		    	'role': user.role
		    });

		});
		passport.deserializeUser(function(id, done) {
		    User.findById(id, function(err, user) {
		        done(err, user);
		    });
		});
    },
    dlogin: function(req, res) {
        res.view('driver/signin');
    },
    dprocess: function(req, res) {
    	passport.use(new LocalStrategy({
    	        usernameField: 'email',
    	        passwordField: 'password'
    	    },
    	    function(email, password, done) {

    	        Driver.findOne({ email: email }).exec(function(err, user) {
    	            if(err) { return done(err); }
    	            if(!user) { return done(null, false, { message: 'Unknown user ' + email }); }
    	            bcrypt.compare(password, user.encryptedPass, function(err, res) {
    	                if(!res) return done(null, false, {message: 'Invalid Password'});
    	                return done(null, user);
    	            });
    	        });
    	    }
    	));
        passport.authenticate('local', function(err, user, info) {
            if( (err)||(!user) ) {
                return res.send({
                    message: 'login failed'
                });
                res.send(err);
            }
            req.logIn(user, function(err) {
                if(err) res.send(err);
                res.redirect('driver/jobs/');
            });
        }) (req, res);
        passport.serializeUser(function(user, done) {
		    done(null, {
		    	'id': user.id,
		    	'role': user.role
		    });

		});
		passport.deserializeUser(function(id, done) {
            Driver.findById(id, function(err, user) {
		        done(err, user);
		    });
		});
    },
    clogin: function(req, res) {
        res.view('company/signin');
    },
    cprocess: function(req, res) {
    	passport.use(new LocalStrategy({
    	        usernameField: 'email',
    	        passwordField: 'password'
    	    },
    	    function(email, password, done) {

    	        Company.findOne({ email: email }).exec(function(err, user) {
    	            if(err) { return done(err); }
    	            if(!user) { return done(null, false, { message: 'Unknown user ' + email }); }
    	            bcrypt.compare(password, user.encryptedPass, function(err, res) {
    	                if(!res) return done(null, false, {message: 'Invalid Password'});
    	                return done(null, user);
    	            });
    	        });
    	    }
    	));
        passport.authenticate('local', function(err, user, info) {
            if( (err)||(!user) ) {
                return res.send({
                    message: 'login failed'
                });
                res.send(err);
            }
            req.logIn(user, function(err) {
                if(err) res.send(err);
                res.redirect('company/orders/');
            });
        }) (req, res);
        passport.serializeUser(function(user, done) {
		    done(null, {
		    	'id': user.id,
		    	'role': user.role
		    });

		});
		passport.deserializeUser(function(id, done) {
		    Company.findById(id, function(err, user) {
		        done(err, user);
		    });
		});
    },

    logout: function(req, res) {
        req.logOut();
        res.redirect('/');
    },
    logoutc: function(req, res) {
        req.logOut();
        res.redirect('/company');
    },
    logoutd: function(req, res) {
        req.logOut();
        res.redirect('/driver');
    }
};
