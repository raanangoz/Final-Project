angular.module("sudokuApp")
    .controller("descriptionController", function ($scope, $http, $location, $rootScope) {

        if ($rootScope.gameInstance != 1){
            desSudokuNum.style.display = 'none';

        }

        if ($rootScope.gameInstance != 2){
            desSudokuColors.style.display = 'none';
        }

        //change after KS page done
        desKS1.style.display = 'none';
        desKS2.style.display = 'none';


    })