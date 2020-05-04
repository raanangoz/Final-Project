
angular.module("sudokuApp")
    .controller("finishQuestionController", function ($scope, $http, $location,$rootScope, $window) {
        $scope.correctnessPercents = [];
        $rootScope.gameInstancesChosen=(JSON.parse(sessionStorage.getItem("gameInstancesChosen")));
        console.log("works?)");
        $rootScope.gameInstance = JSON.parse(sessionStorage.getItem("gameInstance"));
        $rootScope.boxes = JSON.parse(sessionStorage.getItem("boxes"));
        $rootScope.GameID = JSON.parse(sessionStorage.getItem("GameID"));
        var correctnessRank;
        var difficultyRank;
        var confident;
        var people;
        var fat;
        var answered = false;
        var op1;
        var op2;
        var op3;
        var op4;
        var sumTo100;
        $scope.arrayOfOptionNumbers = [];
        if($rootScope.gameInstance==1 || $rootScope.gameInstance==0) {
            $scope.sudokuQuestion = true;
            $scope.knapsackquestions = false;
        }
        else{
            $scope.sudokuQuestion = false;
            $scope.knapsackquestions = true;
        }
        $scope.init = function() {
            if ($scope.sudokuQuestion == true) {
                for (let i = 0; i <= $rootScope.boxes; i++) {
                    $scope.arrayOfOptionNumbers[i] = i;
                }
                // $scope.arrayOfOptionNumbers =  [...Array($rootScope.boxes+1).keys()];// create  array with numbers between 0 to x!!
                console.log("numOfBoxes= " + $rootScope.boxes);
                // for (var i = 0; i <$scope.arrayOfOptionNumbers.length ; i++) {
                //     $scope.arrayOfOptionNumbers[i]= i;
                //
                // }
                for (var i = 0; i < $scope.arrayOfOptionNumbers.length; i++) {
                    console.log("valArray= " + $scope.arrayOfOptionNumbers[i]);

                }
                console.log("arrrrray= " + $scope.arrayOfOptionNumbers);

            }
            else {//knapsack
                for (let i = 1; i <= 100; i++) {
                    $scope.correctnessPercents[i] = i;
                }

            }
        }


        if($rootScope.gameInstance== 0 || $rootScope.gameInstance== 1 ){

            //TODO 'none' the KS

        }

        $scope.submitEstimates = function () {
            if($scope.sudokuQuestion == true) {

                // $scope.$watch('rankCorrectness', function(value) {
                //     correctnessRank = value;
                // })

                //TODO hen its ok i changed?
                correctnessRank = rankCorrectness.value;
                difficultyRank = rankDifficulty.value;

                console.log("correct= " + correctnessRank);
                console.log("diffi= " + difficultyRank);

                //if the user filled the two fields
                if (correctnessRank <= $rootScope.boxes && correctnessRank >= 0 && difficultyRank <= 10 && difficultyRank >= 1) {

                    //enable the next button
                    document.getElementById("nextTask").disabled = false;


                    $http({

                        method: 'POST',
                        url: 'http://localhost:3000/Sudoku/submitFinishQuestion',
                        data: {
                            "userID": "" + sessionStorage.userID,
                            "gameID": "" + $rootScope.GameID,
                            "difficulty": "" + difficultyRank,
                            "correctness": "" + correctnessRank
                        }
                    })
                        .then(function (response) {

                        }, function (response) {

                        });
                    answered= true;
                }

                else{
                    $window.alert("Please answer all questions");
                }
            }
            else {//knapsack
                confident = confident1.value;
                difficultyRank=rankDifficulty1.value;
                people = peopleDifficulty.value;
                fat = fatItem.value;

                if (confident <= 10 && confident >= 1 && difficultyRank <= 10 && difficultyRank >= 1 &&
                    people>=1 && people <=10 && fat>=1 ) {//TODO add the last question maybe
                    if (sumTo100 == 100) {
                        document.getElementById("nextTask").disabled = false;


                        $http({

                            method: 'POST',
                            url: 'http://localhost:3000/Knapsack/submitFinishQuestion',
                            data: {
                                "userID": "" + sessionStorage.userID,
                                "gameID": "" + $rootScope.GameID,
                                "confident": "" + confident,
                                "difficultyRank": "" + difficultyRank,
                                "estimatePeopleDif":""+people,
                                "heaviestItem": "" + fat,
                                "op1": "" + op1,
                                "op2": "" + op2,
                                "op3": "" + op3,
                                "op4": "" + op4

                                // "estimateOthersCorrect": ""+correctnessPercents
                                //TODO last question add
                            }
                        })
                            .then(function (response) {

                            }, function (response) {

                            });
                        answered = true;
                    }
                    else{
                        $window.alert("Please answer the last question correctly.");
                    }
                }
                else{
                    $window.alert("Please answer all questions");
                }
            }
            //TODO added this because adding knapsack was a mess
            if(answered== true) {

                var completed = true;
                //check if the whole games completed

                for (var i = 0; i < $rootScope.gameInstancesChosen.length; i++) {
                    console.log($rootScope.gameInstancesChosen[i]);
                    if ($rootScope.gameInstancesChosen[i] == false) {
                        completed = false;
                    }

                }

                console.log("completed= " + completed);
                if (!completed) {

                    //change to *4 after the KS page
                    $rootScope.gameInstance = Math.floor(Math.random() * 2);
                    while ($rootScope.gameInstancesChosen[$rootScope.gameInstance] == true) {
                        $rootScope.gameInstance = Math.floor(Math.random() * 2);
                    }
                    if ($rootScope.gameInstancesChosen[$rootScope.gameInstance] == false) {
                        console.log("number= " + $rootScope.gameInstance);
                        $rootScope.gameInstancesChosen[$rootScope.gameInstance] = true;
                        sessionStorage.setItem("gameInstance", $rootScope.gameInstance);
                        sessionStorage.setItem("gameInstancesChosen", JSON.stringify($rootScope.gameInstancesChosen));
                        $location.url('/Tutorial');

                    }

                } else {

                    console.log("hereOver123456");
                    //experiment over
                    $location.url('/Feedback');
                }
            }

            // }else {
            //
            //     $window.alert("Please enter the two of the estimates");
            // }




        }

        $scope.nextTask = function () {


//todo ask hen

        }
        $scope.updateTotal = function(){

            op1 = document.getElementById("op1").value;
            op2 = document.getElementById("op2").value;
            op3 = document.getElementById("op3").value;
            op4 = document.getElementById("op4").value;
            $scope.totalV = Number(op1)+Number(op2)+Number(op3)+Number(op4);
            sumTo100 =  $scope.totalV;
            console.log(sumTo100);
        }


        // $scope.$watch('totalValue',function(value){
        // var element = document.getElementById("op1");
        //
        // document.getElementById("listenerSum").innerHTML = "Paragraph changed!";
        // })

        // document.getElementById("op1").addEventListener("click", displayValue);
        // function displayValue(){
        //     document.getElementById("listenerSum").innerHTML = "12";

    })
