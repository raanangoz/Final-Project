angular.module("sudokuApp")
    .controller("TutorialController", function ($scope, $http, $location,$rootScope) {

        let familiarityAgainNextSudoku;
        let familiarityAgainPrevSudoku;

        $rootScope.familiarity = 0;
        sessionStorage.setItem("familiarity","0");
        $rootScope.gameInstance=JSON.parse(sessionStorage.getItem("gameInstance"));
        $rootScope.wasSudoko = JSON.parse(sessionStorage.getItem("wasSudoko"));

        $scope.init = function () {

            familiarityAgainNextSudoku = false;
            familiarityAgainPrevSudoku = false;
            //if numbers
            console.log("wassudoko)");
            console.log($rootScope.gameInstance);
            if($rootScope.gameInstance == 0){
                console.log("its 0");
                $scope.numbers = true;
                $scope.colors= false;
                $rootScope.wasSudoko++;
                sessionStorage.setItem("wasSudoko",$rootScope.wasSudoko);
                console.log(sessionStorage.getItem("wasSudoko"));
            }

            //if colors
            if($rootScope.gameInstance == 1){
                console.log("its 1");
                $scope.numbers = false;
                $scope.colors= true;
                $rootScope.wasSudoko++;
                sessionStorage.setItem("wasSudoko",$rootScope.wasSudoko);
                console.log(sessionStorage.getItem("wasSudoko"));
            }

            if($rootScope.gameInstance === 2 || $rootScope.gameInstance === 3 ){
                $scope.numbers = false;
                $scope.colors= false;
                $scope.ks= true;
                $rootScope.wasKS++;

            }


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
            sessionStorage.setItem("familiarity",value);


        });



        $scope.startExam = function () {

            $location.url('/ExamBeforeGame');

        }




    })