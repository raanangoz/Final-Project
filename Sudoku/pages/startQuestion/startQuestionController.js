angular.module("sudokuApp")
    .controller("startQuestionController", function ($scope,$window, $http,$rootScope, $location) {
        console.log("oshshshsdhd")

        var firstName;
        var lastName;
        var userAge;
        var userRank;
        var userID;
        $scope.go = function(){

            firstName = fname.value;
            lastName = lname.value;
            userAge = age.value;
            /*var e = document.getElementById("rank");
            var userRank = e.options[e.selectedIndex].value;*/
            userRank = rank.value;
            console.log (userRank)
            if(firstName == "" || firstName == undefined){
                $window.alert('Please enter your first name');}
            else
            {
                if(lastName == "" || lastName == undefined){
                    $window.alert('Please enter your last name');}
                else {
                    if(userAge == "" || userAge == undefined){
                        $window.alert('Please enter your age');}
                    else if(!(userAge>=0 && userAge<=150))
                        $window.alert('Please enter a valid age');
                    else {
                        if (userRank != "Beginner" && userRank != "Never Tried" && userRank != "Average"
                            && userRank != "Expert") {
                            $window.alert('Please enter your rank');
                        } else {
                            $http ({
                                method: 'POST',
                                url:'http://localhost:3000/Sudoku/submitQuestinary', // submitQuestinary - name if the function in the server
                                data: {
                                    "firstName": firstName,
                                    "lastName":lastName,
                                    "userAge": userAge,
                                    "userRank": userRank

                                }})
                                .then(function(response) {

                                    //pass to Start Game
                                    $location.url('/description');



                                    $http({
                                        method:"get",
                                        url:'http://localhost:3000/Sudoku/getUserID'


                                    }).then(function(response){
                                        userID = response.data[0].maxid;
                                        console.log(userID+"kilili");
                                        $rootScope.userID= userID;
                                    })





                                    console.log("hereeeeee");
                                }, function(response) {
                                    // $scope.records = response.statusText;
                                });
                            console.log(firstName);
                            console.log(lastName);
                            console.log(userAge);
                            console.log(userRank);
                            //}
                        }
                    }
                }
            }

        }
    })