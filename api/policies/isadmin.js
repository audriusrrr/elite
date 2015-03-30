module.exports = function isAdmin (req, res, next) {

  if (req.session.passport.user && req.session.passport.user.role == 'admin' ) {
    return next();
  } else {
  	return res.send(403, { message: 'You are not the admin we were looking for!' });
  }

};