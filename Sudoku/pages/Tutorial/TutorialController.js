angular.module("sudokuApp")
    .controller("TutorialController", function ($scope, $http, $location,$rootScope) {


        //if numbers
        if($rootScope.gameInstance === 0){
            $scope.numbers = true;
            $scope.colors= false;
        }

        //if colors
        if($rootScope.gameInstance === 1){
            $scope.numbers = false;
            $scope.colors= true;
        }

        document.getElementById("prev").style.visibility = "hidden";
        var slideIndex = 1;
        showDivs(slideIndex);

        $scope.plusDivs = function (n) {
            showDivs(slideIndex += n);
        }



        function showDivs(n) {

            if(slideIndex === 1){
                document.getElementById("prev").style.visibility = "hidden";
            }else{
                document.getElementById("prev").style.visibility = "visible";
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
                document.getElementById("next").style.visibility = "hidden";
            }else{
                document.getElementById("next").style.visibility = "visible";
            }
        }

        $scope.startExam = function () {

            $location.url('/ExamBeforeGame');

        }



        //automatic
        // var slideIndex = 0;
        // showSlides();
        //
        // function showSlides() {
        //     var i;
        //     var slides = document.getElementsByClassName("mySlides");
        //     for (i = 0; i < slides.length; i++) {
        //         slides[i].style.display = "none";
        //     }
        //     slideIndex++;
        //     if (slideIndex > slides.length) {slideIndex = 1}
        //     slides[slideIndex-1].style.display = "block";
        //     setTimeout(showSlides, 20000); // Change image every 2 seconds
        // }

        // //TODO UPDATE AFTER KS PAGE
        // if ($rootScope.gameInstance === 0){  //numbers Sudoku
        //
        //
        //
        //
        // }
        //
        // if ($rootScope.gameInstance === 1){  //colors Sudoku
        //
        //
        //
        //
        //
        //
        // }

    })