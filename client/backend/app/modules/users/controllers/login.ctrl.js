(function(){
	'use strict';
	angular
		.module('com.module.users')
		.controller('LoginCtrl', function ($state, $scope, User) {
			$scope.account = '';
			$scope.password = '';
			$scope.errorMsg = '';

			$scope.login = function () {
				User.login({
					username: $scope.account,
					password: $scope.password
				}, function (user) {
					$state.go('app.home');
				}, function (response) {
					$scope.errorMsg = '用户名或密码错误！';
				});


				// //FIXME
				// $state.go('app.home');
			}
		})
})();
