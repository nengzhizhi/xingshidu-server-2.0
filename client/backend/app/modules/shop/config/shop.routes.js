(function(){
	'use strict';
	angular
		.module('com.module.shop')
		.config(function ($stateProvider) {
			$stateProvider
				.state('app.shop', {
					abstract: true,
					url: '/shop',
					templateUrl: 'modules/shop/views/main.html'
				})
				.state('app.shop.list', {
					url: '/list',
					templateUrl: 'modules/shop/views/list.html',
					controllerAs: 'ctrl',
					controller: function ($state, shops, ShopService) {
						this.shops = shops;
						this.deleteShop = function(id){
							ShopService.deleteShop(id, function(){
								$state.go($state.current, {}, {reload: true});
							})
						}
					},
					resolve: {
						shops: function (ShopService) {
							return ShopService.getShops();
						}
					}
				})
				.state('app.shop.add', {
					url: '/add',
					templateUrl: 'modules/shop/views/form.html',
					controllerAs: 'ctrl',
					controller: function ($state, ShopService, shop) {
						this.shop = shop;
						this.formFields = ShopService.getFormFields();
						this.formOptions = {};

						this.submit = function () {
							ShopService.updateShop(this.shop).then(function (shop) {
								$state.go('app.shops.edit');
							})
						}												
					},
					resolve: {
						shop: function () {
						}
					}
				})
				.state('app.shop.edit', {
					url: '/edit/:id',
					templateUrl: 'modules/shop/views/form.html',
					controllerAs: 'ctrl',
					controller: function ($state, shop, ShopService) {
						this.shop = shop;
						this.formFields = ShopService.getFormFields();
						this.formOptions = {};
						this.submit = function () {
							ShopService.updateShop(this.shop).then(function () {
								$state.go($state.current, {}, { reload: true });
							})
						}
					},
					resolve: {
						shop: function ($stateParams, ShopService) {
							return ShopService.getShop($stateParams.id);
						}
					}
				})
				.state('app.shop.detail', {
					url: '/detail/:id',
					templateUrl: 'modules/shop/views/detail.html',
					controllerAs: 'ctrl',
					controller: function ($rootScope, $state, $stateParams, ShopService, shop) {
					},
					resolve: {
						shop: function(ShopService, $stateParams){
							return ShopService.getShop($stateParams.id);
						}
					}
				})
		});
})();