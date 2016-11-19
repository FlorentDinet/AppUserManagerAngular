// IIFE
(function(){

  "use strict";

  //angular.module() permet d'initialiser une App coté JS
  // [] qui me permettra d'ajouter d'autres modules en dépendances
  angular.module('myApp', ['rzModule']).controller('myController', myController);
          // permet de crée un controlleur dans une App

  /**
   * 1 Controlleur = 1 fonction
   * Fonction de mon Controlleur
   * $scope est objet définissant la scope de mon controlleur
   */
  function myController($scope){
    $scope.nom = "Boyer";
    $scope.prenom = "Julien";
    $scope.impot = 10;

    $scope.modifierPrenom = function(){
      $scope.prenom = "Donald";
    }

    $scope.visibleDetail = false;
    $scope.seeDetail = function(){
        $scope.visibleDetail = true;
    }

    $scope.augmentationImposition = function(){
      // https://docs.angularjs.org/api/ng/function/angular.copy
      console.log($scope.augmImpot);
      $scope.impot = parseInt($scope.impot) + parseInt($scope.augmImpot);
    }

    $scope.classBase = "alert-primary";

    $scope.changeClass = function(){
      console.log('coucou');
     if ($scope.salaire >= 1000000) {
       $scope.classBase = "alert-info";
     } else if ($scope.salaire < 1000) {
       $scope.classBase = "alert-danger";
     } else if ($scope.salaire > 1000 && $scope.salaire < 2000) {
        $scope.classBase = "alert-warning";
     } else if ($scope.salaire > 2000 && $scope.salaire < 10000) {
        $scope.classBase = "alert-success";
     }
   };

   $scope.salaireFranc = 0;

   $scope.convertirFranc = function(){
     if($scope.franc === true){
       $scope.salaireFranc = $scope.salaire * 6.55957;
     }
   }
   // watch permet d'oberver le changement d'une variable en scope
   // et executer une fonction
   $scope.$watch('salaire', $scope.convertirFranc);
   $scope.$watch('salaire', $scope.changeClass);
   $scope.$watch('salaire', $scope.net);
   $scope.$watch('impot', $scope.net);


   $scope.isEmailInValid = false;

   $scope.checkemail = function(){
      var regex = /.com$/i
      if(!regex.test($scope.email)){
        $scope.isEmailInValid = true;
      }else{
        $scope.isEmailInValid = false;
      }

   }


   $scope.net = function(){
     $scope.salaire = $scope.salaire - ($scope.salaire * $scope.impot / 100);
   }

    $scope.formattage = function(){
      $scope.nom = $scope.nom[0].toUpperCase() +  $scope.nom.slice(1).toLowerCase();

      $scope.prenom = $scope.prenom[0].toUpperCase() +  $scope.prenom.slice(1).toLowerCase().replace(' ','-');

      $scope.salaire = Intl.NumberFormat().format($scope.salaire) + ' €';
    }



    $scope.changeTaux = function(){
      $scope.impot = $scope.taux;
    }



    //
    /// + Ajouter le champs input text Salaire
    /// Si le Salaire est supérieur à 1 000 000€ et que le nom est Trumppremiere
    /// Afficher "Je suis président" dans une alert boostrapp

    // Créer un boutton "Voir le détail" pour afficher le nom, le prénom et le salaire dans une div Jumbotron

    // Créer un bouton "Reformatter" qui permet au clique de formatter
      /*+ le Nom avec la premiere lettre en majuscule
      + le Prénom avec la premiere lettre en majuscule
      et les espaces remplacés par des tirets
      + Le Salaire formatter en € avec des espaces et virgules
*/
    // Ajouter un champs "Imposition" en pourcentage qui va modifier au keyup la valeur du Salaire brut en net automatiquement


    //


  }


}());
