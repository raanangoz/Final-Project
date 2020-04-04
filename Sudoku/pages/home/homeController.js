angular.module("sudokuApp")
    .controller("homeController", function ($scope, $http, $location) {

        $scope.startGame = function () {

            $location.url('/startQuestion');

        }


    })