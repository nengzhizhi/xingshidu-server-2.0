(function(){
	'use strict';
	angular
		.module('com.module.core')
		.controller('RouteCtrl', function ($location) {
			$location.path('/app/home');
		})
})();