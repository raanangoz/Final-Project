

angular.module("sudokuApp")
    .controller("gameController", function ($scope, $http, $location) {

        // var userID = $rootScope.userId;
        var PuzzleID;
        var interval;
        var GameID;

        $scope.typeCase = false;
        $scope.loading = true;
        $scope.message = null;

        //load at start

        $http ({

            method: 'GET',
            url:'http://localhost:3000/getBoard/1'})
            .then(function(response) {

                PuzzleID = response.data[0].PuzzleID;
                const boardString = response.data[0].board;
                // console.log(response.data)
                // console.log("boardString = "+boardString);
                const numbersArray = boardString.split(',');
                let board = [], rowSliced;
                for(let i = 0; i < 81; i = i + 9) {
                    rowSliced = numbersArray.slice(i, i + 9);
                    board.push(rowSliced);
                }

                // console.log("board = " + board);
                // console.log("zzz= "+JSON.stringify(response.data[0].board,4,null));
                $scope.sudokuBoard = board;

                /** replace the zeros with white spaces */
                for(var i= 0; i< $scope.sudokuBoard.length; i++){

                    angular.forEach($scope.sudokuBoard[i], function (val, key) {
                        if( val == 0){
                            $scope.sudokuBoard[i][key] = '';
                        }


                    });

                }


                $scope.loading = false;


            }, function(response) {
                // $scope.records = response.statusText;
            });


        //post request for create new game in SudokuToUser
        $http ({


            method: 'POST',
            url:'http://localhost:3000/createNewGame',
            data: {
                "userID":'66778888',
                "puzzleID":'2',
                "type":"color"
            }})
            .then(function(response) {
            }, function(response) {
                // $scope.records = response.statusText;
            });


        $http ({


            method: 'GET',
            url:'http://localhost:3000/getGameID',
          })
            .then(function(response) {
                GameID = response.data.length;
                console.log(response.data.length);
            }, function(response) {
                // $scope.records = response.statusText;
            });










        // $http.get("https://afternoon-mountain-94217.herokuapp.com/sudoku/")
        //     .then(function(response) {
        //         //First function handles success
        //
        //         $scope.sudokuBoard = response.data.sudokuBoard;
        //         console.log("board= "+response.data.sudokuBoard);
        //         let tempArray = [[1,2,3], [4,5,6]];
        //         console.log("board2= "+tempArray);
        //
        //         /** replace the zeros with white spaces */
        //         for(var i= 0; i< $scope.sudokuBoard.length; i++){
        //
        //             angular.forEach($scope.sudokuBoard[i], function (val, key) {
        //                 if( val == 0){
        //                     $scope.sudokuBoard[i][key] = '';
        //                 }
        //                 if(val == 1){
        //                    //$scope.sudokuBoard[i][key].style.backgroundColor = "blue";
        //                    console.log( $scope.$parent.$index);
        //                 }
        //             });
        //
        //         }
        //
        //         $scope.loading = false;
        //
        //     }, function(response) {
        //         //Second function handles error
        //         $scope.message = "Something went wrong. Could not fetch sudoku data.";
        //     });


        $scope.move = function(field, sudokuBoard, row, col, val) {

            $scope.sudokuBoard[row][col]= Number(val);


            // if(val == 1){
            //     $scope.sudokuBoard[row][col]= 1;
            // }

            //
            //
            //
            //     $scope.conflictRow = null;
            //     $scope.conflictCol = null;
            //
            //     if( val != '') {
            //
            //         var data = {
            //             sudokuBoard : sudokuBoard,
            //             moveRow : row,
            //             moveColumn : col,
            //             moveValue : val
            //
            //         }
            //
            //         $http.put('https://afternoon-mountain-94217.herokuapp.com/sudoku/', JSON.stringify(data) )
            //             .then(
            //
            //                 function(response){
            //                     console.log(response);
            //                     $scope.message = response.statusText;
            //                     if(response.statusText == "OK" && response.data.gameOver == true){
            //                         $scope.message = "You won!"
            //                     }
            //                     //setting values to null if the response is OK
            //                     //$scope.conflictRow = null;
            //                     //$scope.conflictCol = null;
            //                 },
            //                 function(response){
            //                     //setting values to null if the response is bad request
            //
            //                     $scope.message = response.statusText;
            //                     // invalid response
            //                     if(response.statusText == "Conflict"){
            //                         //$scope.conflict = true;
            //                         $scope.conflictRow = response.data.conflictRow;
            //                         $scope.conflictCol = response.data.conflictColumn;
            //                     }
            //                 }
            //             );
            //     }
        };

        //stop after 15 minutes
        $scope.timer = function (){

            //show "game over" after 15 minutes
            setTimeout(function () {
                alert("Game Over");

            },900000);

            let second = 1000;
            let minute = 1000 * 60;
            let countDown = new Date();

            //define the time + 15 minutes
            countDown.setMinutes ( countDown.getMinutes() + 15 );

            //init an interval of countdown
            interval= setInterval(function() {

                let now = new Date().getTime();
                let distance = countDown - now;

                minute = Math.floor((distance % (60 *60 *1000)) / (60*1000));
                second = Math.floor((distance % (60 *1000)) / 1000);

                var length = $location.absUrl().length;
                var gameLocation = $location.absUrl().substring(length-4,length);
                // console.log("length= "+length);
                // console.log("yes: "+$location.absUrl().substring(length-4,length));

                if(gameLocation != "game"){
                    clearInterval(interval);

                }

                if(document.getElementById("status") != null){

                    document.getElementById("status").innerHTML = "Time Left: "
                        + minute + "m " + second + "s ";
                }

                //game over
                if (distance < 0) {
                    clearInterval(interval);
                    document.getElementById("status").innerHTML = "Game Over";
                }

            }, 1000)


        };

        $scope.finishGame = function(){

            clearInterval(interval);
            document.getElementById("status").innerHTML = "Game Over";
            document.getElementById("finish").hidden= true;


        }

        $scope.color = function (field,row,col) {

            if(field==1){

                // console.log("input= "+sudokuBoard);
                // console.log("field= "+field);
                //field.style.backgroundColor = "blue";
                //sudokuBoard[$parent.$index][$index].style.backgroundColor= "blue";
                console.log("row= "+row);
                console.log("col= "+col);
                //$scope.sudokuBoard[row][col].style.backgroundColor = "blue";
                //document.getElementById("board")[row][col].style.backgroundColor = "blue";
                console.log("ans= "+document.getElementById("temp"));
                document.getElementById("temp").style.backgroundColor = "blue";
                // $scope.putColor = {
                //
                //     "color" : "white",
                //     "background-color" : "coral",
                //     "font-size" : "10",
                //     "padding" : "50px"
                // }
            }



        }

        $scope.changeType = function () {
            $scope.typeCase = !$scope.typeCase;
            $http ({

                method: 'GET',
                url:'http://localhost:3000/getBoard/1'}).then(function(response) {
                const boardString = response.data[0].board;
                // console.log("boardString = "+boardString);
                const numbersArray = boardString.split(',');
                let board = [], rowSliced;
                for(let i = 0; i < 81; i = i + 9) {
                    rowSliced = numbersArray.slice(i, i + 9);
                    board.push(rowSliced);
                }

                // console.log("board = " + board);
                // console.log("zzz= "+JSON.stringify(response.data[0].board,4,null));
                $scope.sudokuBoard = board;

                /** replace the zeros with white spaces */
                for(var i= 0; i< $scope.sudokuBoard.length; i++){

                    angular.forEach($scope.sudokuBoard[i], function (val, key) {
                        if( val == 0){
                            $scope.sudokuBoard[i][key] = '';
                        }

                        if(val==1){
                            // console.log("here111111");
                            // $scope.sudokuBoard[$scope.row][$scope.index] =1;
                            // $scope.sudokuBoard[i][key] = '';
                            $scope.sudokuBoard[i][key] = 1;
                        }
                        if(val==2){
                            // console.log("here2222222");
                            $scope.sudokuBoard[i][key] = 2;
                        }
                        if(val==3){
                            $scope.sudokuBoard[i][key] = 3;
                        }
                        if(val==4){
                            $scope.sudokuBoard[i][key] = 4;
                        }
                        if(val==5){
                            $scope.sudokuBoard[i][key] = 5;
                        }
                        if(val==6){
                            $scope.sudokuBoard[i][key] = 6;
                        }
                        if(val==7){
                            $scope.sudokuBoard[i][key] = 7;
                        }
                        if(val==8){
                            $scope.sudokuBoard[i][key] = 8;
                        }
                        if(val==9){
                            $scope.sudokuBoard[i][key] = 9;
                        }

                    });

                }


                $scope.loading = false;


            }, function(response) {
                // $scope.records = response.statusText;
            });

        }


    });










