angular.module("sudokuApp")
    .controller("startQuestionController", function ($scope,$window, $http,$rootScope, $location) {
        console.log("oshshshsdhd")

        // function preventBack(){window.history.forward();}
        // setTimeout("preventBack()", 0);
        // window.onunload=function(){null};
        //
        window.onbeforeunload = function(event) {
            // do some stuff here, like reloading your current state
            //this would work only if the user chooses not to leave the page
            return 'why would you do that???';
        }

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
        // 0-sudokuNumbers, 1-sudokuColors, 2-KS1, 3-KS2 TODO change to false
        $rootScope.gameInstancesChosen = [false, false, true, true];
        //boolean for the familiarity question
        $rootScope.wasSudoko=0;
        $rootScope.wasKS=0;

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

                                    //TODO change to *4 after the KS page
                                    $rootScope.gameInstance = Math.floor(Math.random() * 2);
                                    $rootScope.gameInstancesChosen[$rootScope.gameInstance] = true;

                                    console.log("number= " + $rootScope.gameInstance);
                                    //pass to Start Game
                                    $location.url('/Tutorial');


                                    $http({
                                        method: "get",
                                        url: 'http://localhost:3000/Sudoku/getUserID'


                                    }).then(function (response) {
                                        userID = response.data[0].maxid;
                                        console.log(userID + "kilili");
                                        $rootScope.userID = userID;
                                    })


                                    console.log("hereeeeee");
                                }, function (response) {
                                    // $scope.records = response.statusText;
                                });

                        }
                    }

                }

            }

        }
    )