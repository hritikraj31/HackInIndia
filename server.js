const express = require('express'),
	bodyparser = require('body-parser'),
	{ mongoURI, secretKey } = require('./config/key'),
	passport = require('passport'),
	User = require('./models/user'),
	mongoose = require('mongoose'),
	methodOverride = require('method-override'),
	LocalStrategy = require('passport-local'),
	indexRoute = require('./routes/api/index'),
	app_model = require('./routes/api/app_model'),
	flash = require('flash'),
	app = express();

app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

app.use(
	require('express-session')({
		secret: secretKey,
		resave: false,
		saveUninitialized: false
	})
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(flash());

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/assets'));

mongoose
	.connect(mongoURI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true
	})
	.then((res) => {
		console.log('DB Connected!');
	})
	.catch((err) => {
		console.log(err.message);
	});

app.use(function (req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});
app.use(indexRoute);
app.use(app_model);
port = process.env.PORT || 3000;
app.listen(port, process.env.IP, () =>
	console.log(`Server has start on ${port}`)
);
