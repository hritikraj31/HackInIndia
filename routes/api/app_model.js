const express = require('express'),
	middleware = require('../../middleware/index'),
	router = express.Router({ mergeParams: true }),
	path = require('path'),
	run = require('../../pythonrelated/pyinterface'),
	multer = require('multer');

const storage = multer.diskStorage({
	destination: './assets/uploads/',
	filename: function (req, file, cb) {
		cb(
			null,
			file.fieldname + '-' + Date.now() + path.extname(file.originalname)
		);
	}
});

const upload = multer({
	storage: storage
}).single('imgupld');

router.post('/uploadimage', middleware.isLoggedIn, (req, res) => {
	upload(req, res, (err) => {
		if (err) {
			console.log(err);
		} else {
			(async () => {
				try {
					const args = [];
					args.push(req.file.path);
					console.log(JSON.stringify(args));
					const output = await run(args);
					res.json({ msg: output[0] + '' });
				} catch (e) {
					console.log(e.stack);
				}
			})();
		}
	});
});

router.get('/inner', middleware.isLoggedIn, (req, res) => {
	res.render('inner');
});

module.exports = router;
