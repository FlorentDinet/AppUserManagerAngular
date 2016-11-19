// IIFE
(function(){

  "use strict";

  angular.module('app', [])
          .controller('main', main);

          function main($scope){
              $scope.nombre = 0;
              $scope.nbDeFois = 0;

              $scope.augmenter = function(){
                $scope.nombre++;
                $scope.nbDeFois++;
              }

              $scope.setCent = function(){
                $scope.nombre = 100;
                $scope.nbDeFois = 100;
              }
          }

  }());
