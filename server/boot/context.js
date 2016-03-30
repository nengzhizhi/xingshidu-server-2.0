var loopback = require('loopback');

module.exports = function (app) {
	app.use(loopback.context());
	app.use(loopback.token({
		model: app.models.accessToken
	}));

	app.use(function setCurrentUser (req, res, next) {
		if (!req.accessToken) {
			return next();
		}

		var loopbackContext = loopback.getCurrentContext();
		if (!!loopbackContext) {
			loopbackContext.set('currentUser', {
				userId: req.accessToken.userId
			});
		}
		next();
	})
}