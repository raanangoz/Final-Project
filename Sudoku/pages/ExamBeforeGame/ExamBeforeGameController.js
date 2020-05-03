angular.module("sudokuApp")
    .controller("ExamBeforeGameController", function ($scope, $http, $location, $window) {


        // document.getElementById("prevExam").style.visibility = "hidden";
        var slideIndex = 1;
        showDivs(slideIndex);
        var printedQuestions = [];
        var questionsFromServer = [];
        var numberOfQuestionsInDB = 10;
        var numberOfQuestionsToAsk = 5;
        $scope.plusDivs = function (n) {
            showDivs(slideIndex += n);
        }



        function showDivs(n) {

            // if(slideIndex === 1){
            //     document.getElementById("prevExam").style.visibility = "hidden";
            // }else{
            //     document.getElementById("prevExam").style.visibility = "visible";
            // }


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

            $http({
                method: "get",
                url: 'http://localhost:3000/Sudoku/getSudokuNumQuestion/'

            }).then(function (response) {

                for (var i = 0; i < numberOfQuestionsInDB; i++) {
                    printedQuestions.push(false);
                }
                for(let que = 0; que < numberOfQuestionsToAsk; que++) {
                    var q = Math.floor(Math.random() * numberOfQuestionsInDB) ;
                    while(printedQuestions[q]==true)
                        q = Math.floor(Math.random() * numberOfQuestionsInDB) ;
                    printedQuestions[q]=true;
                    questionsFromServer.push(response.data[q]);

                }

                $scope.question0 = questionsFromServer[0];
                $scope.question1 = questionsFromServer[1];
                $scope.question2 = questionsFromServer[2];
                $scope.question3 = questionsFromServer[3];
                $scope.question4 = questionsFromServer[4];



            }, function (response) {
                // $scope.records = response.statusText;
            });

        }

        $scope.submit = function () {

            let answers = [];

            // let answer = document.querySelector('input[name!="null"]');
            // console.log(document.querySelector('input[name="op"]:checked').value);
            let answer0 = $scope.a;
            console.log(answer0);
            let answer1 = $scope.b;
            console.log(answer1);
            let answer2 = $scope.c;
            console.log(answer2);
            let answer3 = $scope.d;
            console.log(answer3);
            let answer4 = $scope.e;
            console.log(answer4);

            if(answer0=== undefined || answer1===undefined || answer2=== undefined || answer3===undefined){
                window.alert("You have to answer every question before press 'Submit'");

            }

            else if(answer0==questionsFromServer[0].correctAnswer&&
                answer1==questionsFromServer[1].correctAnswer&&
                answer2==questionsFromServer[2].correctAnswer&&
                answer3==questionsFromServer[3].correctAnswer){
            $location.url('/pageBeforeGame');
            }

            else{
                window.alert("You did not answer all the questions correctly. \n" +
                    "You are redirected to the tutorial.")
                $location.url('/Tutorial');
            }

        }

    })