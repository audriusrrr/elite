module.exports = function isCompany (req, res, next) {

  if (req.session.passport.user && req.session.passport.user.role == 'company' ) {
    return next();
  } else {
  	return res.send(403, { message: 'You are not company!' });
  }

};