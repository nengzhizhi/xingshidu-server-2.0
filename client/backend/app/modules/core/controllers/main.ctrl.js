(function(){
	'use strict';
	angular
		.module('com.module.core')
		.controller('MainCtrl', function ($scope, $rootScope, $location,UserService) {
			UserService.currentUser(function (user) {
				$scope.currentUser = user;
			}, function (err) {
				$location.path('/login');
			})
		});
})();