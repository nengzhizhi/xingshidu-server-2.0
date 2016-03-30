var async = require('async');
var _ = require('lodash');

module.exports = function (app) {
  var loopback = require('loopback');

  var userModel = app.models.user;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;

  var users = {
    "administrator": [
      { email: 'nengzhizhi@126.com', username: 'administrator' , password: 'testpass' }
    ]
  }

  for (var key in users) {
    Role.findOrCreate({ name: key }, function (err, role) {
      async.each(users[key], function (user, callback) {
        userModel.findOrCreate(user, function(err, user) {
          if (!!err) {
            return callback(err);
          }

          role.principals.create({
            principalType: RoleMapping.USER,
            principalId: user.id
          }, callback);
        });
      }, function (err) {
        if (!!err) {
          //console.log(err);
        }
      })
    })
  }
}
