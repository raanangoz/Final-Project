
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

            //if the user filled the two fields
            if(correctnessRank <=9 && correctnessRank >=0 && difficultyRank <=10 && difficultyRank >=1){

                //enable the next button
                document.getElementById("nextTask").disabled = false;


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

            }else {

                $window.alert("Please enter the two of the estimates");
            }


        }

        $scope.nextTask = function () {

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


        }


    })
