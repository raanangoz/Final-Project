angular.module("sudokuApp")
    .controller("TutorialController", function ($scope, $http, $location,$rootScope) {

        var familiarityAgainNext;
        var familiarityAgainPrev;

        $rootScope.familiarity = 0;

        $scope.init = function () {

            familiarityAgainNext = false;
            familiarityAgainPrev = false;
            //if numbers
            if($rootScope.gameInstance === 0){
                $scope.numbers = true;
                $scope.colors= false;
                $rootScope.wasSudoko++;
            }

            //if colors
            if($rootScope.gameInstance === 1){
                $scope.numbers = false;
                $scope.colors= true;
                $rootScope.wasSudoko++;
            }

            //TODO add KS cases

        }


        document.getElementById("prev").style.visibility = "hidden";
        var slideIndex = 1;
        showDivs(slideIndex);


        $scope.plusDivs = function (n) {
            showDivs(slideIndex += n, n);
            familiarityAgainNext = false;
            familiarityAgainPrev = false;

        }

        function next(){

            showDivs(slideIndex += 1,1);
            familiarityAgainNext = true;

        }

        function prev(){

            showDivs(slideIndex -= 1, -1);
            familiarityAgainPrev = true;

        }



        function showDivs(n, z) {

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

            if( z === -1 && slideIndex === x.length-1 && !familiarityAgainPrev ){
                if($rootScope.wasSudoko > 1){
                    prev();

                }

            }else{

                if(slideIndex === x.length-1 && !familiarityAgainNext ){
                    console.log("hereIFFFF");
                    //if it's the second instance of the sudoku
                    if($rootScope.wasSudoko > 1){
                        next();


                    //first instance oc sudoku
                    }else{
                            document.getElementById("next").style.visibility = "hidden";

                    }

                }

            }





        }




        $scope.$watch('familiar', function(value) {

            console.log("familiarity= "+value);
            document.getElementById("next").style.visibility = "visible";

            $rootScope.familiarity = value;

            //documentation
            // $http({
            //
            //     method: 'POST',
            //     url: 'http://localhost:3000/Sudoku/submitFamiliarityQuestion',
            //     data: {
            //         "gameID": ""+$scope.GameID,
            //         "userID": ""+ $scope.userID,
            //         "familiarity":  ""+value
            //     }
            // })
            //     .then(function (response) {
            //
            //
            //     }, function (response) {
            //         // $scope.records = response.statusText;
            //     });

        });





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