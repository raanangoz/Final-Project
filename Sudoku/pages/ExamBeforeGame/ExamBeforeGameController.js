angular.module("sudokuApp")
    .controller("ExamBeforeGameController", function ($scope, $http, $location, $window) {


        document.getElementById("prevExam").style.visibility = "hidden";
        var slideIndex = 1;
        showDivs(slideIndex);

        $scope.plusDivs = function (n) {
            showDivs(slideIndex += n);
        }



        function showDivs(n) {

            if(slideIndex === 1){
                document.getElementById("prevExam").style.visibility = "hidden";
            }else{
                document.getElementById("prevExam").style.visibility = "visible";
            }


            var i;
            var x = document.getElementsByClassName("mySlides");
            if (n > x.length) {slideIndex = 1}
            if (n < 1) {slideIndex = x.length} ;
            for (i = 0; i < x.length; i++) {
                x[i].style.display = "none";
            }
            x[slideIndex-1].style.display = "block";
            if(slideIndex === x.length){
                document.getElementById("nextExam").style.visibility = "hidden";
            }else{
                document.getElementById("nextExam").style.visibility = "visible";
                getSudokuQuestion();
            }
        }



        function getSudokuQuestion(){

            //TODO lottery number between 1-10


            $http({
                method: "get",
                url: 'http://localhost:3000/Sudoku/getSudokuNumQuestion/'


                //TODO raanan 10 QUESTION, 5 RANDOM
            }).then(function (response) {
                var questionsFromServer = [];
                var printedQuestions = [];
                for (var i = 0; i < 7; i++) {
                    printedQuestions.push(false);
                }
                for(let que = 0; que < 3; que++) {
                    var q = Math.floor(Math.random() * 6) + 1;
                    while(printedQuestions[q]==true)
                        q = Math.floor(Math.random() * 6) + 1;
                    printedQuestions[q]=true;
                    // $scope.Q1 = response.data[q].question;
                    // $scope.imageSrc = response.data[q].image;
                    // $scope.op1 = response.data[q].option1;
                    // $scope.op2 = response.data[q].option2;
                    // $scope.op3 = response.data[q].option3;
                    // $scope.op4 = response.data[q].option4;
                    questionsFromServer.push(response.data[q]);


                }

                $scope.questions = questionsFromServer;


            }, function (response) {
                // $scope.records = response.statusText;
            });

        }

        $scope.submit = function () {

            console.log(document.querySelector('input[name="op"]:checked').value);

            $location.url('/pageBeforeGame');

        }


    })