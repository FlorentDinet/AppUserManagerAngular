//IIFE
(function() {
    "use strict";

    // permet d'initialiser une app coté JS
    angular.module('myApp', ['rzModule','lumx'])
        .controller('SalaryCtrl', SalaryCtrl);
    //permet de créer un controlleur dans une app


    /**
     * 1 Controlleur = 1 fonction
     * Fonction de mon Controlleur
     */

    function SalaryCtrl($scope) {

        $scope.vars = {
          nom : "Dinet",
          prenom : "Florent",
          salaire : "1500",
          email:"",
          selectImpositions : [10,20,30,40,50,75]
        };
        // $scope.nom = "Dinet";
        // $scope.prenom = "Florent";
        $scope.salaire = "1500";
        $scope.email = "";
        $scope.isShown = true;
        $scope.isEqu = false;
        $scope.salaireState = "";
        $scope.salaireNet = 0;
        $scope.imposition = 10;
        $scope.salaireFrancs = 0;
        $scope.emailIsValid = true;
        $scope.impositionSlider = {
          test: "hello",
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
                        return "$amber-600";
                    return 'red';
                },
                onChange: function(id,value) {
                    $scope.calcSalaire();
                    // $scope.imposition = value;
                    // console.log(value);
                }
            }
        };

        $scope.modifierPrenom = function() {
            $scope.vars.nom = "Trump";
            $scope.vars.prenom = "Dolan";
        };

        $scope.reformater = function() {
            $scope.vars.nom = $scope.vars.nom.charAt(0).toUpperCase() + $scope.vars.nom.substr(1).toLowerCase();
            $scope.vars.nom = $scope.vars.nom.charAt(0).toUpperCase() + $scope.vars.nom.substr(1).toLowerCase();
            $scope.vars.nom = $scope.vars.nom.replace(/ /g, "-");
            $scope.vars.salaire = $scope.vars.salaire.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 ");
            if (!($scope.vars.salaire.indexOf("€") >= 0)) {
                $scope.vars.salaire = $scope.vars.salaire + " €";
            }
        };
        $scope.testEqu = function() {
            $scope.isEqu = ($scope.vars.nom == $scope.vars.prenom ? true : false);
            console.log($scope.vars.nom + " " + $scope.vars.prenom);
        };
        $scope.testSalaire = function() {
            if ($scope.vars.salaire > 1000000) {
                $scope.salaireState = "color gold";
            } else if ($scope.vars.salaire > 10000) {
                $scope.salaireState = "color green";
            } else if ($scope.vars.salaire > 3000) {
                $scope.salaireState = "color orange";
            } else {
                $scope.salaireState = "color red";
            }
            console.log($scope.salaireState);
        };
        $scope.calcSalaire = function() {
            var salaire = parseFloat($scope.vars.salaire.replace(/[ ,€]/, ""));
            $scope.salaireNet = parseInt(salaire - ($scope.impositionSlider.value / 100 * salaire)) + " €";

        };
        $scope.convertFrancs = function() {
            var salaire = parseFloat($scope.vars.salaire.replace(/[ ,€]/, ""));
            $scope.salaireFrancs = salaire * 6.56;
        };
        $scope.testEmail = function() {
            var regexp = /[a-z0-9.-_]+@[a-z.]+\.com/;
            console.log($scope.vars.email);
            console.log(regexp.test($scope.vars.email));
            $scope.emailIsValid = regexp.test($scope.vars.email);
        };

    }

}());
