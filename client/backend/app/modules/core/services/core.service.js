(function(){
  'use strict';
  angular
    .module('com.module.core')
    .service('CoreService', function (SweetAlert) {
      this.alert = function (title, text) {
        SweetAlert.swal(title, text);
      }

      this.alertSuccess = function (title, text, confirmCb) {
        SweetAlert.swal({
          title: title,
          text: text,
          type: 'success'
        }, function (){
          !!confirmCb && confirmCb();
        });
      }

      this.alertError = function (title, text, confirmCb) {
        SweetAlert.swal({
          title: title,
          text: text,
          type: 'error'
        }, function (){
          !!confirmCb && confirmCb();
        });
      }

      this.confirm = function (title, text, successCb, cancelCb) {
        SweetAlert.swal({
          title: title,
          text: text,
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          closeOnCancel: true
        }, function (confirmed) {
          if (confirmed) {
            successCb();
          } else {
            !!cancelCb && cancelCb();
          }
        })
      }
    })
})();
