//IIFE
(function() {
    "use strict";

    // permet d'initialiser une app coté JS
    angular.module('appUsers', ['lumx'])
        .controller('UsersCtrl', UsersCtrl)
        .filter('triParAge', function() {
            // In the return function, we must pass in a single parameter which will be the data we will work on.
            // We have the ability to support multiple other parameters that can be passed into the filter optionally
            return function(input, sens) {
                console.log("tri en cours");

                // if (tri) {

                input.sort(function(a, b) {
                    if (a.age < b.age) {
                        return -1;
                    } else if (a.age > b.age) {
                        return 1;
                    } else {
                        return 0;
                    }

                });

                if (sens == "desc") {
                    input.reverse();
                }

                // }
                console.log(input);
                return input;

            };

        });

    //permet de créer un controlleur dans une app


    /**
     * 1 Controlleur = 1 fonction
     * Fonction de mon Controlleur
     */

    function UsersCtrl($scope, $http, $filter) {


        // console.log('Scope chargé');
        $scope.isavatarUrlValide = true;
        $scope.tri = "";
        $scope.triOptions = [{
            label: 'Jeunes',
            value: "asc"
        }, {
            label: 'Vieux',
            value: "desc"
        }];
        $scope.users = [{
            nom: 'Dinet',
            prenom: 'Florent',
            sexe: true,
            age: 70,
            ville: 'Lyon',
            avatarUrl: 'http://api.adorable.io/avatars/40/florent.png',
        }, {
            nom: 'Gropius',
            prenom: 'Walter',
            sexe: true,
            age: 68,
            ville: 'Berlin',
            avatarUrl: 'http://api.adorable.io/avatars/40/Walter.png',

        }, {
            nom: 'Moholy nagy',
            prenom: 'wazinsky',
            sexe: true,
            age: 56,
            ville: 'Stains',
            avatarUrl: 'http://api.adorable.io/avatars/40/wazinsky.png',

        }, {
            nom: 'Bardot',
            prenom: 'Brigitte',
            sexe: false,
            age: 75,
            ville: 'Saint-Tropez',
            avatarUrl: 'http://api.adorable.io/avatars/40/brigitte.png',

        }];
        $scope.selectedRows = 0;
        $scope.dataTableThead = [{
            name: 'nom',
            label: 'Nom',
            sortable: true
        }, {
            name: 'prenom',
            label: 'Prenom',
            sortable: true
        }, {
            name: 'sexe',
            label: 'Sexe',
            sortable: true,
        }, {
            name: 'age',
            label: 'Age',
            sortable: true
        }, {
            name: 'ville',
            label: 'Ville',
            sortable: true
        }];
        $scope.advancedDataTableThead = angular.copy($scope.dataTableThead);
        $scope.advancedDataTableThead.unshift({
            name: 'avatarUrl',
            format: function(row) {
                return '<img src="' + row.avatarUrl + '" width="40" height="40" class="img-round">';
            }
        });

        $scope.$on('lx-data-table__select', updateActions);
        $scope.$on('lx-data-table__unselect', updateActions);
        $scope.$on('lx-data-table__sort', updateSort);

        ////////////

        function updateActions(_event, _selectedRows) {
          console.log(_selectedRows);
          console.log($scope.selectedRows);
            $scope.selectedRows = _selectedRows;
            console.log("-------- selected rows : ------");
        }

        function updateSort(_event, _column) {
            console.log(_column);
            $scope.users = $filter('orderBy')($scope.users, _column.name, _column.sort === 'desc' ? true : false);
        }

        $scope.ajouterUser = function() {
            console.log('formulaire envoyé');
            $scope.users.push({
                nom: $scope.nom,
                prenom: $scope.prenom,
                sexe: $scope.sexe,
                age: $scope.age,
                ville: $scope.ville,
                avatarUrl: $scope.avatarUrl
            });

            $scope.nom = '';
            $scope.prenom = '';
            $scope.sexe = '';
            $scope.age = '';
            $scope.ville = '';

        };
        $scope.$watch($scope.selectedRows, updateActions);
        $scope.supprimerUser = function() {
            // console.log(unwantedRows);

            for (var i = 0; i < $scope.selectedRows.length; i++) {
              console.log($scope.selectedRows[i]);
              console.log($scope.users.indexOf($scope.selectedRows[i]));
              if ($scope.users.indexOf($scope.selectedRows[i]) !== -1){
                $scope.users.splice($scope.users.indexOf($scope.selectedRows[i]), 1);
              }
            }
            $scope.selectedRows=null;

            selectedRows.unselectAll($scope.users);

            console.log("selectedRows "+ $scope.selectedRows);


            // function testSiEgalASelection(element) {
            //     for (var j = 0; j < unwantedRowsNames.length+1; j++) {
            //       console.log(unwantedRowsNames);
            //         console.log(element.nom + " compare à : " + unwantedRowsNames[j]);
            //         if (element.nom == unwantedRowsNames[j]) {
            //             return false;
            //         }
            //         return true;
            //     }
            // }
            // $scope.users = $scope.users.filter(testSiEgalASelection);
            // $scope.selectedRows = $scope.selectedRows.filter(testSiEgalASelection);


            // console.log(users[{nom}]);
            // $scope.users[{nom}.indexOf()].indexOf();
            // function findUserRow(element) {
            //     return element.nom === nom;
            // }
            //
            // var id = $scope.users.findIndex(findUserRow);
            //
            // console.log(id);
            //
            // $scope.users.splice(id, 1);

        };
        $scope.validateAvatarUrl = function() {
            var regex = /[a-z0-9.-_]*(.png)/;
            $scope.isavatarUrlValide = regex.test($scope.avatarUrl);
            console.log($scope.isavatarUrlValide);
        };


        // // Simple GET request example:
        // $http({
        //     method: 'GET',
        //     url: 'https://randomuser.me/api/'
        // }).then(function successCallback(response) {
        //     // this callback will be called asynchronously
        //     // when the response is available
        // }, function errorCallback(response) {
        //     // called asynchronously if an error occurs
        //     // or server returns response with an error status.
        // });

        // $http.get('https://randomuser.me/api/', config).then(successCallback, errorCallback);

        $http.get("https://randomuser.me/api/")
            .then(function(response) {
                $scope.myWelcome = response.data;
                // console.log($scope.myWelcome);
            });

    }

})();
