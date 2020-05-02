angular.module("sudokuApp")
    .controller("ExperimentOverController", function ($scope, $http, $location, $rootScope) {

        //lottery a letter for adding the code

            $scope.code= 0;
            var  letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q"
                    ,"r","s","t","u","v","w","x","y","z"];

            var letter = letters[Math.floor(Math.random()*letters.length)];

            $scope.init = function () {

                    $scope.code = letter+sessionStorage.userID;
                    console.log("compCode= "+$scope.code);

                    //documentation
                    $http({

                            method: 'POST',
                            url: 'http://localhost:3000/Sudoku/updateCompletionCode ',
                            data: {
                                    "userID": ""+ sessionStorage.userID,
                                    "compCode": ""+ $scope.code

                            }
                    })
                        .then(function (response) {


                        }, function (response) {
                                // $scope.records = response.statusText;
                        });


            }




    })