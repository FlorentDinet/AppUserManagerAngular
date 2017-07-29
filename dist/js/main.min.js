(function() {
    "use strict";


    /**
     * Déclaration de l'application routeApp
     */
    var routeApp = angular.module('routeApp', [
        // Dépendances du "module"
        'ngRoute',
        'routeAppControllers',
        'rzModule',
        'lumx',
        'ngMap'
    ]);

    /**
     * Configuration du module principal : routeApp
     */
    routeApp.config(['$routeProvider',
        function($routeProvider) {

            // Système de routage
            $routeProvider
                .when('/salary', {
                    templateUrl: 'partials/salary-partial.html',
                    controller: 'SalaryCtrl'
                })
                .when('/users', {
                    templateUrl: 'partials/users-partial.html',
                    controller: 'UsersCtrl'
                })
                .otherwise({
                    redirectTo: '/users'
                });
        }
    ]);

    /**
     * Définition des contrôleurs
     */
    var routeAppControllers = angular.module('routeAppControllers', []);

    /////// SALARY /////////

    routeAppControllers.controller('SalaryCtrl', ['$scope',

        //permet de créer un controlleur dans une app


        /**
         * 1 Controlleur = 1 fonction
         * Fonction de mon Controlleur
         */

        function($scope) {

            $scope.vars = {
                nom: "Dinet",
                prenom: "Florent",
                salaire: "1500",
                email: "",
                selectImpositions: [10, 20, 30, 40, 50, 75]
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
                    onChange: function(id, value) {
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
    ]);

    /////////// USERS //////////

    routeAppControllers.controller('UsersCtrl', UsersCtrl)
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
                // console.log(input);
                return input;

            };

        })
        .filter('onlyAdultFilter', function() {
            console.log("filter les adultes en cours");
            return function(input,onOff) {
console.log(onOff);
console.log("input du filter",input);
                function suffisammentGrand(element) {
                  return element.age >= 30 && element.age <40;
                }
                if(onOff) {
                  input = input.filter(suffisammentGrand);
                }
                // console.log(input);
                return input;
            };


        });

    //permet de créer un controlleur dans une app


    /**
     * 1 Controlleur = 1 fonction
     * Fonction de mon Controlleur
     */

    function UsersCtrl($scope, $http, $filter, LxNotificationService, NgMap) {

      var vm = $scope;

        $scope.notify = notify;

        function notify(_type) {
            if (_type === 'simple') {
                LxNotificationService.notify('Lorem Ipsum');
            } else if (_type === 'sticky') {
                LxNotificationService.notify('Lorem Ipsum', undefined, true);
            } else if (_type === 'icon') {
                LxNotificationService.notify('Lorem Ipsum', 'android');
            } else if (_type === 'color') {
                LxNotificationService.notify('Lorem Ipsum', 'android', false, 'yellow');
            } else if (_type === 'info') {
                LxNotificationService.info('Lorem Ipsum');
            } else if (_type === 'success') {
                LxNotificationService.success('Success');
            } else if (_type === 'warning') {
                LxNotificationService.warning('Lorem Ipsum');
            } else if (_type === 'error') {
                LxNotificationService.error('Lorem Ipsum');
            }
        }

        $scope.vars = {
            nom: '',
            prenom: '',
            sexe: '',
            age: '',
            ville: '',
            avatarUrl: ''
        };

        $scope.onlyAdult = false;

        $scope.howMuchToShow = {
            value: 10,
            options: {
                floor: 0,
                ceil: 20,
                showSelectionBar: true,
                onChange: function(id, value) {
                    // console.log($scope.users);
                    // $scope.users = $filter('limitTo')($scope.users, value, 0);
                    // $scope.imposition = value;
                    // console.log(value);
                }
            }
        };


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
        $scope.users = [];
        $scope.usersUntouched = $scope.users;
        // $scope.users = [{
        //     nom: 'Dinet',
        //     prenom: 'Florent',
        //     sexe: true,
        //     age: 7,
        //     ville: 'Lyon',
        //     avatarUrl: 'http://api.adorable.io/avatars/40/florent.png',
        // }, {
        //     nom: 'Gropius',
        //     prenom: 'Walter',
        //     sexe: true,
        //     age: 68,
        //     ville: 'Berlin',
        //     avatarUrl: 'http://api.adorable.io/avatars/40/Walter.png',
        //
        // }, {
        //     nom: 'Moholy nagy',
        //     prenom: 'wazinsky',
        //     sexe: true,
        //     age: 56,
        //     ville: 'Stains',
        //     avatarUrl: 'http://api.adorable.io/avatars/40/wazinsky.png',
        //
        // }, {
        //     nom: 'Bardot',
        //     prenom: 'Brigitte',
        //     sexe: false,
        //     age: 75,
        //     ville: 'Saint-Tropez',
        //     avatarUrl: 'http://api.adorable.io/avatars/40/brigitte.png',
        //
        // }];
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
            // console.log(_selectedRows);
            // console.log($scope.selectedRows);
            $scope.selectedRows = _selectedRows;
            // console.log("-------- selected rows : ------");
        }

        function updateSort(_event, _column) {
            // console.log(_column);
            $scope.users = $filter('orderBy')($scope.users, _column.name, _column.sort === 'desc' ? true : false);
        }

        $scope.$watch('onlyAdult', showOnlyAdult);

        function showOnlyAdult() {
          console.log("show only en route");
            // console.log("untouched");
            // console.log($scope.usersUntouched);
            // console.log("users");
            // console.log($scope.users);
                // usersUntouched = $scope.users;
                // $scope.users = $filter('onlyAdultFilter')($scope.users);
                console.log('on filtre');
                $scope.users = $filter('onlyAdultFilter')($scope.usersUntouched,$scope.onlyAdult);
        }

        // $scope.filteredUsers = function () {
        //   var users = $scope.users;
        //   var onlyAdults = $scope.onlyAdults;
        //   var howMuch = $scope.howMuchToShow.value;
        //   console.log(users,onlyAdults,howMuch);
        //   if (onlyAdults) {
        //     users = $filter('onlyAdultFilter')(users);
        //   }
        //   return users.slice(0,howMuch);
        // };

        $scope.ajouterUser = function() {
            console.log('formulaire envoyé');
            console.log($scope.vars.nom);
            $scope.users.push({
                nom: $scope.vars.nom,
                prenom: $scope.vars.prenom,
                sexe: $scope.vars.sexe,
                age: $scope.vars.age,
                ville: $scope.vars.ville,
                avatarUrl: $scope.vars.avatarUrl
            });

            $scope.vars.nom = '';
            $scope.prenom = '';
            $scope.sexe = '';
            $scope.age = '';
            $scope.ville = '';

            notify('success');

        };
        $scope.supprimerUser = function() {
            // console.log(unwantedRows);

            for (var i = 0; i < $scope.selectedRows.length; i++) {
                // console.log($scope.selectedRows[i]);
                // console.log($scope.users.indexOf($scope.selectedRows[i]));
                if ($scope.users.indexOf($scope.selectedRows[i]) !== -1) {
                    $scope.users.splice($scope.users.indexOf($scope.selectedRows[i]), 1);
                }
            }
            $scope.selectedRows = null;

            // lxDataTable.toggleAllSelected();
            // console.log("selectedRows " + $scope.selectedRows);


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

        NgMap.getMap().then(function(map) {
            // console.log(map.getCenter());
            $scope.map = map;
            console.log($scope.map);
            // console.log('markers', $scope.map.markers);
            // console.log('shapes', $scope.map.shapes);
        });


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

        $http.get("https://randomuser.me/api/?results=20")
            .then(function(response) {
                var jsonData = response.data.results;
                // console.log(jsonData);

                for (var i = 0; i < jsonData.length; i++) {
                    var dob = jsonData[i].dob;
                    dob = dob.substring(10, 0);
                    dob = dob.split("-");
                    dob = dob.join();

                    moment.updateLocale('en', {
                        relativeTime: {
                            future: "in %s",
                            past: "%s ago",
                            s: "seconds",
                            m: "a minute",
                            mm: "%d minutes",
                            h: "an hour",
                            hh: "%d hours",
                            d: "a day",
                            dd: "%d days",
                            M: "a month",
                            MM: "%d months",
                            y: "a year",
                            yy: "%d"
                        }
                    });

                    var age = moment(dob, "YYYYMMDD").fromNow(true); // 5 years ago

                    $scope.users.push({
                        nom: jsonData[i].name.first,
                        prenom: jsonData[i].name.last,
                        sexe: jsonData[i].gender,
                        age: age,
                        ville: jsonData[i].location.city,
                        avatarUrl: jsonData[i].picture.large,
                        position: jsonData[i].location.city
                    });
                    $scope.usersUntouched = $scope.users;
                }
            });

    }






})();
