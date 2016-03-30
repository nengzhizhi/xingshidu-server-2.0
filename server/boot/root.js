var qiniu = require('qiniu');
var config = require('../config.json');

module.exports = function(server) {
	qiniu.conf.ACCESS_KEY = config.QINIU_ACCESS_KEY;
	qiniu.conf.SECRET_KEY = config.QINIU_SECRET_KEY;
	var spaceName = 'xingshidu';

  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  router.get('/', server.loopback.status());
  router.get('/uptoken', function (req, res) {
  	var putPolicy = new qiniu.rs.PutPolicy(spaceName);
  	putPolicy.deadline = Date.now()/1000 + 3600;
  	res.end(JSON.stringify({
  		'uptoken': putPolicy.token()
  	}))
  })

  server.use(router);
};