(function() {
  'use strict';

  angular
    .module('myApp')
    .controller('JsController', JsController);

  /* @ngInject */
  function JsController() {
    var vm = this;

    activate();

    function activate() {
      console.log("Okay coucou");
    }
  }
})();
