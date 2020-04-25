angular.module("sudokuApp")
    .controller("ExperimentOverController", function ($scope, $http, $location, $rootScope) {

        //lottery a letter for adding the code

        var  letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q"
                ,"r","s","t","u","v","w","x","y","z"];

        console.log("length= "+letters.length );
        var lotter =  Math.floor(Math.random()*letters.length);
        console.log("lotter= "+lotter);
        var letter = letters[Math.floor(Math.random()*letters.length)];
        $scope.code = letter+$rootScope.userID;

        
    })