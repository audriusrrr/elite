module.exports = function isDriver (req, res, next) {

  if (req.session.passport.user && req.session.passport.user.role == 'driver' ) {
    return next();
  } else {
  	return res.send(403, { message: 'You are not driver the driver we were looking for!' });
  }

};