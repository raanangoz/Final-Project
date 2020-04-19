angular.module("sudokuApp")
    .controller("pageBeforeGameController", function ($scope, $http, $location, $window) {

        $scope.start= function () {

            $location.url('/sudokuGame');

        }


    })