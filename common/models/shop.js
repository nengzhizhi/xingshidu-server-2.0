var async = require('async');
var loopback = require('loopback');

module.exports = function(Shop){
	Shop.startShare = function (id, token, cb) {
		async.waterfall([
			function validate (next) {
				Shop.findOne({
					where: {
						id: id,
						token: token
					}
				}, next);
			}, function createShare(shop, next) {
				var ctx = loopback.getCurrentContext();
				var user = ctx && ctx.get('currentUser');

				if (!user)
					return cb(new Error('请先登录！'));

				if (!shop)
					return cb(new Error('无效的店铺编号或TOKEN！'));

				Shop.app.models.Share.create({
					userId: user && user.userId,
					created: new Date(),
					shopId: shop.id
				}, function (err, share) {
					shop.updateAttributes({
						token: Math.random().toString(),
						status: 'sharing',
						shareId: share.id
					})

					next(err, share);
				})
			}
		], function (err, result){
			cb(err, result);
		})
	}

  Shop.remoteMethod('startShare', {
    accepts: [
      { arg: 'id', type: 'string' },
      { arg: 'token', type: 'string' }
    ],
    returns: { root: true },
    http: { path: '/startShare', verb: 'get' }
  })
}