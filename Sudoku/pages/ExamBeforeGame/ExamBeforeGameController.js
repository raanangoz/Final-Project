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
            var q = Math.floor(Math.random() * 10) + 1;


            $http({
                method: "get",
                url: 'http://localhost:3000/Sudoku/getSudokuNumQuestion/1'


            }).then(function (response) {
                console.log(response.data[0].question);
                $scope.Q1 = response.data[0].question;
                $scope.imageSrc = response.data[0].image;
                $scope.op1 = response.data[0].option1;
                $scope.op2 = response.data[0].option2;


            }, function (response) {
                // $scope.records = response.statusText;
            });

        }

        $scope.submit = function () {

            $location.url('/pageBeforeGame');

        }


    })