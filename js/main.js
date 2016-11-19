//IIFE
(function() {
    "use strict";

    // permet d'initialiser une app coté JS
    angular.module('myApp', ['rzModule'])
        .controller('myController', myController);
    //permet de créer un controlleur dans une app


    /**
     * 1 Controlleur = 1 fonction
     * Fonction de mon Controlleur
     */

    function myController($scope) {

        $scope.nom = "Dinet";
        $scope.prenom = "Florent";
        $scope.salaire = "1500";
        $scope.email = "";
        $scope.isShown = false;
        $scope.isEqu = false;
        $scope.salaireState = "";
        $scope.salaireNet = 0;
        $scope.imposition = 10;
        $scope.salaireFrancs = 0;
        $scope.emailIsValid = true;
        $scope.impositionSlider = {
            value: 20,
            options: {
                floor: 0,
                ceil: 75,
                showSelectionBar: true,
                getSelectionBarColor: function(value) {
                    if (value <= 10)
                        return '#2AE02A';
                    if (value <= 20)
                        return 'yellow';
                    if (value <= 30)
                        return 'orange';
                    return 'red';
                },
                onChange: function(id,value) {
                    $scope.calcSalaire();
                    // $scope.imposition = value;
                    console.log(value);
                }
            }
        };

        $scope.modifierPrenom = function() {
            $scope.nom = "Trump";
            $scope.prenom = "Dolan";
        };

        $scope.reformater = function() {
            $scope.nom = $scope.nom.charAt(0).toUpperCase() + $scope.nom.substr(1).toLowerCase();
            $scope.nom = $scope.nom.charAt(0).toUpperCase() + $scope.nom.substr(1).toLowerCase();
            $scope.nom = $scope.nom.replace(/ /g, "-");
            $scope.salaire = $scope.salaire.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 ");
            if (!($scope.salaire.indexOf("€") >= 0)) {
                $scope.salaire = $scope.salaire + " €";
            }
        };
        $scope.testEqu = function() {
            $scope.isEqu = ($scope.nom == $scope.prenom ? true : false);
        };
        $scope.testSalaire = function() {
            if ($scope.salaire > 1000000) {
                $scope.salaireState = "color gold";
            } else if ($scope.salaire > 10000) {
                $scope.salaireState = "color green";
            } else if ($scope.salaire > 3000) {
                $scope.salaireState = "color orange";
            } else {
                $scope.salaireState = "color red";
            }
            console.log($scope.salaireState);
        };
        $scope.calcSalaire = function() {
            var salaire = parseFloat($scope.salaire.replace(/[ ,€]/, ""));
            $scope.salaireNet = parseInt(salaire - ($scope.impositionSlider.value / 100 * salaire)) + " €";

        };
        $scope.convertFrancs = function() {
            var salaire = parseFloat($scope.salaire.replace(/[ ,€]/, ""));
            $scope.salaireFrancs = salaire * 6.56;
        };
        $scope.testEmail = function() {
            var regexp = /[a-z0-9\-\_]*\@[a-z0-9\-\_]*[.com]/;
            console.log(regexp.test($scope.email));
            $scope.emailIsValid = regexp.test($scope.email);
        };

    }

}());
