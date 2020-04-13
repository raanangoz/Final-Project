angular.module("sudokuApp")
    .controller("homeController", function ($scope, $http, $location, $window) {



        $scope.continue = function () {

            $location.url('/startQuestion');

        }


    })