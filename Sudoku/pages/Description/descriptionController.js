angular.module("sudokuApp")
    .controller("descriptionController", function ($scope, $http, $location, $rootScope) {

        //TODO UPDATE AFTER KS PAGE
        if ($rootScope.gameInstance === 0){
            desSudokuNum.style.display = 'block';
            desSudokuColors.style.display = 'none';
            desKS1.style.display = 'none';
            desKS2.style.display = 'none';

        }

        if ($rootScope.gameInstance === 1){
            desSudokuColors.style.display = 'block';
            desSudokuNum.style.display = 'none';
            desKS1.style.display = 'none';
            desKS2.style.display = 'none';
        }


        $scope.startGame = function(){
            $location.url('sudokuGame');

        }





    })