angular.module("sudokuApp")
    .controller("startQuestionController", function ($scope,$window, $http,$rootScope, $location) {

        // let x = "1";
        // sessionStorage.setItem("x",x);
        // console.log(1==sessionStorage.getItem("x"));
        // console.log(1==JSON.parse(sessionStorage.getItem("x")));
        // console.log("1"==sessionStorage.getItem("x"));
        // console.log("1"==JSON.parse(sessionStorage.getItem("x")));
            // function preventBack(){window.history.forward();}
            // setTimeout("preventBack()", 0);
            // window.onunload=function(){null};
            //
            if(window.onbeforeunload = function(event) {
                // do some stuff here, like reloading your current state
                //this would work only if the user chooses not to leave the page
                console.log("refresjed");
                return 'why would you do that???';
            })


                $(document).ready(function() {
                    function disablePrev() { window.history.forward() }
                    window.onload = disablePrev();
                    window.onpageshow = function(evt) { if (evt.persisted) disableBack() }
                });

            //
            // window.history = function(event) {
            //     // do some stuff here, like reloading your current state
            //     //this would work only if the user chooses not to leave the page
            //     return 'why would you do that???';
            // }

            var userWorkerID;
            var userAge;
            var userGender;
            var userHand;
            var userEducation;

            // var g= $scope.gender.value;
            // console.log("g= "+g);

            //two arrays for the lottery between the games
            $rootScope.gameInstance = 1;
            sessionStorage.setItem("gameInstance","1");
            // let gameInstancesChosen= {false,false,true,true};
            // 0-sudokuNumbers, 1-sudokuColors, 2-KS1, 3-KS2 TODO change to false
            $rootScope.gameInstancesChosen = [false, false, true, true];
            sessionStorage.setItem("gameInstancesChosen",JSON.stringify($rootScope.gameInstancesChosen));
            //boolean for the familiarity question
            $rootScope.wasSudoko=0;
            $rootScope.wasKS=0;
            sessionStorage.setItem("wasSudoko","0");
            sessionStorage.setItem("wasKS","0");

            //for check the worker ID
            var lettersAndNumbers = /^[0-9a-zA-Z]+$/;

            $scope.go = function () {

                userWorkerID = workerID.value;
                userAge = age.value;
                userGender = $scope.gender;
                console.log("gender= " + userGender);
                userHand = $scope.hand;
                console.log("hand= " + userHand);
                userEducation = $scope.education;
                console.log("education= " + userEducation);


                if (userWorkerID == "" || userWorkerID == undefined || !(userWorkerID.match(lettersAndNumbers))) {
                    $window.alert('Please enter a valid Worker ID');
                } else {
                    if (userAge == "" || userAge == undefined) {
                        $window.alert('Please enter your Age');
                    } else if (!(userAge >= 0 && userAge <= 150))
                        $window.alert('Please enter a valid Age');
                    else {
                        if (userGender == "" || userGender == undefined) {
                            $window.alert('Please enter your Gender');
                        } else if (userHand == "" || userHand == undefined) {
                            $window.alert('Please enter your strong hand');
                        } else if (userEducation == "" || userEducation == undefined) {
                            $window.alert('Please enter your Education');
                        } else {

                            $http({
                                method: 'POST',
                                url: 'http://localhost:3000/Sudoku/submitQuestinary', // submitQuestinary - name if the function in the server
                                data: {
                                    "workerID": userWorkerID,
                                    "age": userAge,
                                    "gender": userGender,
                                    "hand": userHand,
                                    "education": userEducation

                                }
                            })
                                .then(function (response) {


                                    $http({
                                        method: "get",
                                        url: 'http://localhost:3000/Sudoku/getUserID'


                                    }).then(function (response) {
                                        let userID = response.data[0].maxid;
                                        $rootScope.userID = userID;
                                        sessionStorage.setItem("userID",userID);

                                        //TODO change to *4 after the KS page
                                        let gameInstance = ""+Math.floor(Math.random() * 2);
                                        $rootScope.gameInstance = gameInstance;
                                        $rootScope.gameInstancesChosen[gameInstance] = true;
                                        sessionStorage.setItem("gameInstancesChosen",JSON.stringify($rootScope.gameInstancesChosen));
                                        sessionStorage.setItem("gameInstance",JSON.stringify(gameInstance));
                                        console.log("number= " + $rootScope.gameInstance);
                                        //pass to Start Game
                                        console.log(JSON.parse(sessionStorage.getItem("gameInstance")));
                                        console.log((sessionStorage.getItem("gameInstance")));
                                        $location.url('/Tutorial');

                                    })



                                }, function (response) {
                                    // $scope.records = response.statusText;
                                });

                        }
                    }

                }

            }

        }
    )