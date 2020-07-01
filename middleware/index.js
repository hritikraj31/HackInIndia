const middlewareObj = {};
middlewareObj.isLoggedIn = function (req, res, next) {
	if (res.user) {
		return next();
	}
	if (req.isAuthenticated()) {
		req.flash(
			'success',
			'Successfully logged in. Nice to meet you ' + req.user.username
		);
		return next();
	}
	req.flash('error', 'You need to be logged in to do that.');
	res.redirect('/');
};

module.exports = middlewareObj;
