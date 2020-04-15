angular.module("sudokuApp")
    .controller("TutorialController", function ($scope, $http, $location,$rootScope) {

        // var slideIndex = 1;
        // showSlides(slideIndex);
        //
        // // Next/previous controls
        // $scope.plusSlides = function (n) {
        //
        //     showSlides(slideIndex = slideIndex+  n);
        // }
        //
        // // Thumbnail image controls
        // $scope.currentSlide = function (n) {
        //
        //     showSlides(slideIndex = n);
        //
        // }
        //
        // function showSlides(n) {
        //
        //     var i;
        //     var slides = document.getElementsByClassName("mySlides");
        //     var dots = document.getElementsByClassName("dot");
        //     if (n > slides.length) {slideIndex = 1}
        //     if (n < 1) {slideIndex = slides.length}
        //     for (i = 0; i < slides.length; i++) {
        //         slides[i].style.display = "none";
        //     }
        //     for (i = 0; i < dots.length; i++) {
        //         dots[i].className = dots[i].className.replace(" active", "");
        //     }
        //     slides[slideIndex-1].style.display = "block";
        //     dots[slideIndex-1].className += " active";
        // }

        var slideIndex = 1;
        showDivs(slideIndex);


        $scope.plusDivs = function (n) {
            showDivs(slideIndex += n);
        }



        function showDivs(n) {
            var i;
            var x = document.getElementsByClassName("mySlides");
            if (n > x.length) {slideIndex = 1}
            if (n < 1) {slideIndex = x.length} ;
            for (i = 0; i < x.length; i++) {
                x[i].style.display = "none";
            }
            x[slideIndex-1].style.display = "block";
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