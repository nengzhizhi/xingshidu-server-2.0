(function(){
	'use strict';
	angular
		.module('com.module.shop')
		.service('ShopService', function (CoreService, Shop, Interaction) {
			this.getShops = function () {
				return Shop.find().$promise;
			}

			this.getShop = function (id) {
				return Shop.findById({ id: id }).$promise;
			}

			this.updateShop = function (shop, successCb, cancelCb) {
				return Shop.upsert(shop).$promise.then(function () {
					CoreService.alertSuccess('保存成功！', '', successCb);
				}, function (err) {
					CoreService.alertError('保存失败！', err && err.statusText, cancelCb);
				})				
			}

			this.deleteShop = function (id, successCb, cancelCb) {
				CoreService.confirm('确定删除？', '删除后无法恢复', function () {
					Shop.deleteById(id).$promise.then(function () {
						CoreService.alertSuccess('删除成功！', '', successCb);
					}, function (err) {
						CoreService.alertError('删除失败！', err, cancelCb);
					});
				})
			}

			this.getFormFields = function () {
				return [
					{
						key: 'name',
						type: 'input',
						templateOptions: {
							label: '店铺名称',
							required: true
						}
					}
				];
			}		
		})
})();		
