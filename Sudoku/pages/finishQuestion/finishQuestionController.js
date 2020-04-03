
angular.module("sudokuApp")
    .controller("finishQuestionController", function ($scope, $http, $location,$rootScope, $window) {


        var correctnessRank;
        var difficultyRank;

        $scope.submitEstimates = function () {


            correctnessRank = rankCorrectness.value;
            difficultyRank = rankDifficulty.value;

            if ((correctnessRank != "Perfect" && correctnessRank != "Correct" && correctnessRank != "Load Enhancement"
                && correctnessRank != "Not Correct") || (difficultyRank != "Very Easy" && difficultyRank != "Easy" && difficultyRank != "Medium"
                && difficultyRank != "Hard" && difficultyRank != "Very Hard" )) {
                $window.alert("Please enter the two of the estimates");

            //if the user filled the two fields
            }else{

                $http ({

                    method: 'POST',
                    url:'http://localhost:3000/Sudoku/submitFinishQuestion',
                    data: {
                        "userID":""+$rootScope.userID,
                        "gameID":""+$rootScope.GameID,
                        "difficulty":""+difficultyRank,
                        "correctness":""+correctnessRank
                    }})
                    .then(function(response) {

                    }, function(response) {

                    });

            }




        }


    })
