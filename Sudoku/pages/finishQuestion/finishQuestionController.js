
angular.module("sudokuApp")
    .controller("finishQuestionController", function ($scope, $http, $location,$rootScope, $window) {


        var correctnessRank;
        var difficultyRank;

        if($rootScope.gameInstance== 0 || $rootScope.gameInstance== 1 ){

            //TODO 'none' the KS

        }

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

                        var completed = true;
                        //check if the whole games completed
                        for (var i = 0; i <$rootScope.gameInstancesChosen.length ; i++) {
                            if($rootScope.gameInstancesChosen[i]=== false){
                                completed = false;
                            }

                        }

                        console.log("completed= "+completed);
                        if (!completed){

                            //change to *4 after the KS page
                            $rootScope.gameInstance = Math.floor(Math.random() * 2);
                            while ($rootScope.gameInstancesChosen[ $rootScope.gameInstance] === true){
                                $rootScope.gameInstance = Math.floor(Math.random() * 2);
                            }
                            if($rootScope.gameInstancesChosen[ $rootScope.gameInstance] === false){
                                console.log("number= "+$rootScope.gameInstance);
                                $rootScope.gameInstancesChosen[$rootScope.gameInstance]= true;
                                $location.url('/description');

                            }

                        }else{

                            console.log("hereOver123456");
                            //experiment over
                            $location.url('/ExperimentOver');
                        }





                    }, function(response) {

                    });

            }




        }


    })
