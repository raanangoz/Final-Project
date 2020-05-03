
angular.module("sudokuApp")
    .controller("finishQuestionController", function ($scope, $http, $location,$rootScope, $window) {

        $rootScope.gameInstancesChosen=(JSON.parse(sessionStorage.getItem("gameInstancesChosen")));
        console.log("works?)");
        $rootScope.gameInstance = JSON.parse(sessionStorage.getItem("gameInstance"));
        $rootScope.boxes = JSON.parse(sessionStorage.getItem("boxes"));
        $rootScope.GameID = JSON.parse(sessionStorage.getItem("GameID"));
        var correctnessRank;
        var difficultyRank;
        $scope.arrayOfOptionNumbers = [];

        $scope.init = function(){
            for(let i = 0; i <= $rootScope.boxes; i++) {
                $scope.arrayOfOptionNumbers[i] = i;
            }
            // $scope.arrayOfOptionNumbers =  [...Array($rootScope.boxes+1).keys()];// create  array with numbers between 0 to x!!
            console.log("numOfBoxes= "+ $rootScope.boxes);
            // for (var i = 0; i <$scope.arrayOfOptionNumbers.length ; i++) {
            //     $scope.arrayOfOptionNumbers[i]= i;
            //
            // }
            for (var i = 0; i <$scope.arrayOfOptionNumbers.length ; i++) {
                console.log("valArray= "+$scope.arrayOfOptionNumbers[i]);

            }
            console.log("arrrrray= "+$scope.arrayOfOptionNumbers);

        }


        if($rootScope.gameInstance== 0 || $rootScope.gameInstance== 1 ){

            //TODO 'none' the KS

        }

        $scope.submitEstimates = function () {

            // $scope.$watch('rankCorrectness', function(value) {
            //     correctnessRank = value;
            // })

            correctnessRank = $scope.rank2;
            difficultyRank = rankDifficulty.value;

            console.log("correct= "+correctnessRank);
            console.log("diffi= "+difficultyRank);

            //if the user filled the two fields
            if(correctnessRank <=$rootScope.boxes && correctnessRank >=0 && difficultyRank <=10 && difficultyRank >=1){

                //enable the next button
                document.getElementById("nextTask").disabled = false;


                $http ({

                    method: 'POST',
                    url:'http://localhost:3000/Sudoku/submitFinishQuestion',
                    data: {
                        "userID":""+sessionStorage.userID,
                        "gameID":""+$rootScope.GameID,
                        "difficulty":""+difficultyRank,
                        "correctness":""+correctnessRank
                    }})
                    .then(function(response) {

                    }, function(response) {

                    });

                var completed = true;
                //check if the whole games completed

                for (var i = 0; i <$rootScope.gameInstancesChosen.length ; i++) {
                    console.log($rootScope.gameInstancesChosen[i]);
                    if($rootScope.gameInstancesChosen[i]== false){
                        completed = false;
                    }

                }

                console.log("completed= "+completed);
                if (!completed){

                    //change to *4 after the KS page
                    $rootScope.gameInstance = Math.floor(Math.random() * 2);
                    while ($rootScope.gameInstancesChosen[ $rootScope.gameInstance] == true){
                        $rootScope.gameInstance = Math.floor(Math.random() * 2);
                    }
                    if($rootScope.gameInstancesChosen[ $rootScope.gameInstance] == false){
                        console.log("number= "+$rootScope.gameInstance);
                        $rootScope.gameInstancesChosen[$rootScope.gameInstance]= true;
                        sessionStorage.setItem("gameInstance",$rootScope.gameInstance);
                        sessionStorage.setItem("gameInstancesChosen",JSON.stringify($rootScope.gameInstancesChosen));
                        $location.url('/Tutorial');

                    }

                }else{

                    console.log("hereOver123456");
                    //experiment over
                    $location.url('/ExperimentOver');
                }

            }else {

                $window.alert("Please enter the two of the estimates");
            }




        }

        $scope.nextTask = function () {




        }


    })
