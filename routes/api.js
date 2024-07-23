var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	const sample = {
		"browsers": {
			"firefox": {
				"name": "Firefox",
				"pref_url": "about:config",
				"releases": {
					"1": {
						"release_date": "2004-11-09",
						"status": "retired",
						"engine": "Gecko",
						"engine_version": "1.8"
					}
				}
			}
		}
	};
    res.send(sample);
});

module.exports = router;