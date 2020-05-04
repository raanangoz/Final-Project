
angular.module("sudokuApp")
    .controller("finishQuestionController", function ($scope, $http, $location,$rootScope, $window) {
        $scope.correctnessPercents = [];

        $(document).ready(function() {
            function disablePrev() { window.history.forward() }
            window.onload = disablePrev();
            window.onpageshow = function(evt) { if (evt.persisted) disableBack() }
        });


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
        var countersArray = [];
        for(let i = 0; i <= 2; i++) {
            countersArray[i] = 0;
        }


        console.log("gameInstances[3]= "+$rootScope.gameInstancesChosen[3]);

        $scope.init = function(){
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
            //update was
            if($rootScope.gameInstance === 0 || $rootScope.gameInstance === 1 ){

                console.log("hereFinishSudoku123");
                sessionStorage.setItem("wasSudoko","true");


            }
            //update was
            if($rootScope.gameInstance === 2 || $rootScope.gameInstance === 3) {

                sessionStorage.setItem("wasKS","true");


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

                correctnessRank = $scope.rank2;
                difficultyRank = rankDifficulty.value;

                console.log("correct= "+correctnessRank);
                console.log("diffi= "+difficultyRank);

                //if the user filled the two fields
                if(correctnessRank <=$rootScope.boxes && correctnessRank >=0 && difficultyRank <=10 && difficultyRank >=1){

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

                console.log("completed= "+completed);
                if (!completed){

                    //change to *4 after the KS page
                    //TODO hen change to *4 after the KS page
                    $rootScope.gameInstance = Math.floor(Math.random() * 4);

                    while ($rootScope.gameInstancesChosen[ $rootScope.gameInstance] == true){
                        console.log("hereWhileFinish");
                        $rootScope.gameInstance = Math.floor(Math.random() * 4);
                    }


                    //everyone presentation
                    $rootScope.KSpresentation = 3;

                    if($rootScope.gameInstance=='3'){

                        console.log("here333333");

                        //0-weight presentation, 1-value presentation, 2-mix presentation
                        $rootScope.KSpresentation = Math.floor(Math.random() * 3);

                        var counterPresentation= 0;
                        updateCounter(0);
                        updateCounter(1);
                        updateCounter(2);


                        function updateCounter(KSpresentation){

                            //update the counterPresentation
                            $http ({
                                method: 'GET',
                                url:'http://localhost:3000/Knapsack/getPresentationCounter/'+KSpresentation
                            })

                                .then(function(response) {
                                    var place = "p"+KSpresentation;
                                    console.dir("response= "+response.data[0][place]);
                                    console.log("response= "+ JSON.stringify(response.data[0][place]));
                                    counterPresentation = response.data[0][place];
                                    countersArray[KSpresentation]= response.data[0][place];
                                    console.log("counterPresentation= "+counterPresentation);
                                    console.log("countersArray[0] = "+countersArray[KSpresentation]);
                                    if(KSpresentation === 2){
                                        checkCounter();
                                    }


                                }, function(response) {
                                    // $scope.records = response.statusText;
                                });


                        }


                        function checkCounter(){
                            // for (var i = 0; i <countersArray.length ; i++) {
                            //     console.log("cell1:"+countersArray[i]);
                            //
                            // }

                            console.dir("counterArray= "+countersArray);
                            var allZero=true;
                            for (var i = 0; i <countersArray.length  ; i++) {
                                if(countersArray[i] !== 0){
                                    allZero = false;
                                }

                            }
                            if(allZero){
                                $location.url('/ExperimentOver');
                            }
                            while(countersArray[$rootScope.KSpresentation] === 0){
                                console.log("herePres"+ countersArray[$rootScope.KSpresentation]);
                                $rootScope.KSpresentation = Math.floor(Math.random() * 3);
                            }


                            counterPresentation = countersArray[$rootScope.KSpresentation];

                            reduceCounter();


                        }



                        // while(counterPresentation === 0){
                        //
                        //     console.log("hereWhilecounterPresentation === 0")
                        //
                        //     console.log("KSpresentation= "+$rootScope.KSpresentation);
                        //     console.log('http://localhost:3000/Knapsack/getPresentationCounter/'+$rootScope.KSpresentation);
                        //
                        //
                        //
                        //  }

                        function reduceCounter(){

                            //reduce the counter if we chose the presentation
                            $http({

                                method: 'POST',
                                url: 'http://localhost:3000/Knapsack/updateCounterPresentation/',
                                data: {
                                    "presentation": "" + $rootScope.KSpresentation,
                                    "counterPresentation" : ""+counterPresentation

                                }
                            })
                                .then(function (response) {

                                    //add to the board 2d array

                                }, function (response) {
                                    // $scope.records = response.statusText;
                                });



                            movePage();
                        }


                    }else{
                        movePage();
                    }


                    function movePage(){


                        sessionStorage.setItem("KSProblem",Math.floor(Math.random() * 4) + 2);
                        sessionStorage.setItem("KSpresentation", ""+$rootScope.KSpresentation);
                        console.log("KSpresentationStart= "+sessionStorage.getItem("KSpresentation"));

                        if($rootScope.gameInstancesChosen[ $rootScope.gameInstance] == false){
                            console.log("number= "+$rootScope.gameInstance);
                            $rootScope.gameInstancesChosen[$rootScope.gameInstance]= true;
                            sessionStorage.setItem("gameInstance",$rootScope.gameInstance);
                            sessionStorage.setItem("gameInstancesChosen",JSON.stringify($rootScope.gameInstancesChosen));

                            console.log("gameInstanceFinish= "+sessionStorage.getItem("gameInstance"));
                            console.log("wasKSfinish= "+sessionStorage.getItem("wasKS"));

                            if((sessionStorage.getItem("gameInstance")==2 || sessionStorage.getItem("gameInstance")==3)
                                && sessionStorage.getItem("wasKS") ==='true'){
                                $location.url('/pageBeforeGame');

                            }else{
                                $location.url('/Tutorial');
                            }


                        }
                    }



                } else {

                    console.log("hereOver123456");
                    //experiment over
                    $location.url('/Feedback');
                }
            }

            $window.alert("Please answer both of the questions");
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
