var express = require('express');
var router = express.Router();

router.all('*', function(req, res, next) {
	res.render('index', {
		title: 'Phalanx Trident Portal',
		css:
			process.env.NODE_ENV == 'production'
				? '/css/styles.min.css'
				: 'assets/css/styles.css',
	});
});

module.exports = router;
