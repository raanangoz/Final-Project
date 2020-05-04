angular.module("sudokuApp")
    .controller("FeedbackController", function ($scope,$window, $http,$rootScope, $location) {


            $scope.go = function () {
                let exam = $scope.exam;
                let tutorial = $scope.tutorial;
                let other = $scope.other;
                let games = $scope.games;

                if ($scope.exam == undefined)
                    exam = "a";
                if ($scope.tutorial == undefined)
                    tutorial = "a";
                if ($scope.other == undefined)
                    other = "a";
                if ($scope.games == undefined)
                    games = "a";

                $http({

                    method: 'POST',
                    url: 'http://localhost:3000/updateRecommendations',
                    data: {
                        "userID": ""+ sessionStorage.userID,
                        "exam":exam,
                        "tutorial":tutorial,
                        "games":games,
                        "other":other

                    }
                })
                    .then(function (response) {


                    }, function (response) {
                        // $scope.records = response.statusText;
                    });
                $location.url('/ExperimentOver');


            }
        });