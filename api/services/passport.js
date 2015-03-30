//     var passport = require('passport'),
//         LocalStrategy = require('passport-local').Strategy,
//      bcrypt = require('bcrypt');

// passport.serializeUser(function(user, done) {
//     done(null, user.id);
//     console.log('3');
// });

// passport.deserializeUser(function(id, done) {
//     User.findById(id, function(err, user) {
//         done(err, user);
//     });
// });

// passport.use(new LocalStrategy({
//         usernameField: 'email',
//         passwordField: 'password'
//     },
//     function(email, password, done) {
//         console.log('0');
//         User.findOne({ email: email }).exec(function(err, user) {
//             if(err) { return done(err); }
//             if(!user) { return done(null, false, { message: 'Unknown user ' + email }); }
//             bcrypt.compare(password, user.encryptedPass, function(err, res) {
//                 if(!res) return done(null, false, {message: 'Invalid Password'});
//                 return done(null, user);
//             });
//         });
//     }
// ));

// // passport.serializeDriver(function(driver, done) {
// //     done(null, driver.id);
// // });

// // passport.deserializeDriver(function(id, done) {
// //     User.findById(id, function(err, driver) {
// //         done(err, driver);
// //     });
// // });

// // passport.use(new LocalStrategy({
// //         usernameField: 'email',
// //         passwordField: 'password'
// //     },
// //     function(email, password, done) {
// //         User.findOne({ email: email }).exec(function(err, driver) {
// //             if(err) { return done(err); }
// //             if(!driver) { return done(null, false, { message: 'Unknown driver ' + email }); }
// //             bcrypt.compare(password, driver.encryptedPass, function(err, res) {
// //                 if(!res) return done(null, false, {message: 'Invalid Password'});
// //                 return done(null, driver);
// //             });
// //         });
// //     }
// // ));