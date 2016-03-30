(function(){
	'use strict';
	angular
		.module('com.module.users')
		.config(function ($stateProvider) {
			$stateProvider
				.state('login', {
					url: '/login',
					templateUrl: 'modules/users/views/login.html',
					controller: 'LoginCtrl',
					controllerAs: 'ctrl'
				})
				.state('logout', {
					url: '/logout',
					controllerAs: 'ctrl',
					controller: function (User, LoopBackAuth, $state) {
						User.logout({ "access_token": LoopBackAuth.accessTokenId }, function () {
							$state.go('login');
						})
					}
				})
				.state('app.users', {
					abstract: true,
					url: '/users',
					templateUrl: 'modules/users/views/main.html'
				})				
				.state('app.users.list', {
					url: '/list',
					controllerAs: 'ctrl',
					templateUrl: 'modules/users/views/list.html',
					controller: function (User) {
					}
				})				
		})
})();