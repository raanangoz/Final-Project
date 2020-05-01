angular.module("sudokuApp")
    .controller("TutorialController", function ($scope, $http, $location,$rootScope) {

        var familiarityAgainNextSudoku;
        var familiarityAgainPrevSudoku;

        $rootScope.familiarity = 0;

        $scope.init = function () {

            familiarityAgainNextSudoku = false;
            familiarityAgainPrevSudoku = false;
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
            familiarityAgainNextSudoku = false;
            familiarityAgainPrevSudoku = false;

        }

        function next(){

            showDivs(slideIndex += 1,1);
            familiarityAgainNextSudoku = true;

        }

        function prev(){

            showDivs(slideIndex -= 1, -1);
            familiarityAgainPrevSudoku = true;

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

            //hide the prev button in the last page
            if(slideIndex === x.length){
                document.getElementById("prev").style.visibility = "hidden";
            }

            if( z === -1 && slideIndex === x.length-1 && !familiarityAgainNextSudoku ){

                if($rootScope.wasSudoko > 1){
                    prev();

                }

            }else{

                if(slideIndex === x.length-1 && !familiarityAgainNextSudoku ){
                    console.log("hereIFFFF");
                    //if it's the second instance of the sudoku
                    if($rootScope.wasSudoko > 1){
                        next();


                    //first instance of sudoku
                    }else{
                            document.getElementById("next").style.visibility = "hidden";

                    }

                }

            }


        }


        $scope.$watch('familiar', function(value) {

            console.log("familiarity= "+value);
            document.getElementById("next").style.visibility = "visible";
            if (value !== undefined){
                document.getElementById("next").innerHTML = "Submit and continue";
                document.getElementById("next").style.width = "80px";
                document.getElementById("next").style.height = "65px";
            }



            $rootScope.familiarity = value;


        });



        $scope.startExam = function () {

            $location.url('/ExamBeforeGame');

        }




    })