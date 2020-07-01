const User = require('../../models/user'),
	express = require('express'),
	passport = require('passport'),
	router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
	res.render('home');
});

router.post('/login', function (req, res, next) {
	passport.authenticate('local', function (err, user) {
		if (err) {
			return next(err);
		} else if (!user) {
			req.flash('error', 'Invalid username or password!');
			console.log('invalid username');
			return res.redirect('/');
		} else {
			req.logIn(user, function (err) {
				if (err) {
					return next(err);
				}
				req.flash(
					'success',
					'Hi ' + user.username + '. Successfully Logged You in'
				);
				return res.redirect('/inner');
			});
		}
	})(req, res, next);
});

router.post('/register', function (req, res) {
	var newUser = new User({ username: req.body.username });
	User.register(newUser, req.body.password, function (err, user) {
		if (err) {
			req.flash('error', err.message);
			console.log(err);
			return res.redirect('/register');
		}
		passport.authenticate('local')(req, res, function () {
			req.flash('success', 'Welcome to Notes App ' + user.username);
			res.redirect('/inner');
		});
	});
});

router.get('/logout', function (req, res) {
	req.logOut();
	req.flash('success', 'Successfully logged you out');
	res.redirect('/');
});

module.exports = router;
