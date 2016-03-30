(function(){
	'use strict';
	angular
	.module('com.module.users')
	.service('UserService', function ($state, User) {
		this.currentUser = function (successCb, errorCb) {
			return User.getCurrent(successCb, errorCb);
		}
	})
})();