

angular.module("sudokuApp")
    .controller("KnapsackGameController", function ($scope, $http, $location,$rootScope) {


        // var userID = $rootScope.userId;
        var PuzzleID;
        var interval;
        var GameID;
        var items;// array, for each item : weight,value,inbag
        var bagsize;
        var sizeUsed = 0;
        var valueGained = 0;

        let second = 1000;
        let minute = 1000 * 60;

        $scope.colors = false;
        $scope.typeCase = false;
        $scope.loading = true;
        $scope.message = null;


        /////////////////////~!~!~!~
        $scope.txtPos = 7;
        $scope.coin = 'https://i.imgur.com/EVPcOj6.png'
        $scope.chosen = 'https://sivim.co.il/wp-content/uploads/green-v-png-5.png'
        $scope.valueGained =0;
        $scope.sizeUsed = 0;
        /////////////////////~!~!~!~

        var gameTypeToSQL = 'knapsackTYPE1';
        // if($scope.colors)
        //     gameTypeToSQL = 'color';
        // else
        //     gameTypeToSQL = 'number';
        //load at start

        console.log("no init"+$rootScope.userID);


        $scope.move = function(field, sudokuBoard, row, col, val) {


            let stringsecond = second;
            if (second < 10)
                stringsecond = "0" + second;
            let stringminute = minute;
            if (minute < 10)
                stringminute = "0" + minute;

            $http({

                method: 'POST',
                url: 'http://localhost:3000/Knapsack/insertMove',
                data: {
                    "GameID": "" + GameID,
                    "itemWeight": + itemWeight,
                    "var itemValue": + itemValue,
                    "time": "" + stringminute + ":" + stringsecond + ""
                }
            })
                .then(function (response) {

                    //add to the board 2d array

                }, function (response) {
                    // $scope.records = response.statusText;
                });
        };

//stop after 15 minutes
        $scope.timer = function (){

            console.log("hereTimer");
            //show "game over" after 15 minutes
            setTimeout(function () {
                alert("Game Over");

            },900000);

            // let second = 1000;
            // let minute = 1000 * 60;
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

                if(gameLocation != "Game"){
                    clearInterval(interval);

                }

                if(document.getElementById("status") != null){

                    console.log("hereInnerrrr");
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


//init board and game
        $scope.init = function(){
            console.log("inittttttttttttt");
            /**
             * get board
             */
            $http ({

                method: 'GET',
                url:'http://localhost:3000/Knapsack/getBoard/1'})
                .then(function(response) {

                    PuzzleID = response.data[0].PuzzleID;
                    // $scope.sudokuBoard = board;
                    console.log(PuzzleID);
                    let stringweights = response.data[0].itemweights;
                    let stringvalues =  response.data[0].itemvalues;
                    bagsize = parseFloat(response.data[0].bagsize);
                    const weights = stringweights.split(',');
                    const values = stringvalues.split(',');
                    items = new Array (weights.length);

                    for(let index = 0 ; index < weights.length; index++){
                        items[index] = new Array(3);
                        items[index][0] = parseFloat(weights[index]);
                        items[index][1] = parseFloat(values[index]);
                        items[index][2] = false;
                    }
                    console.log(items);
                    $scope.items = items;
                    $scope.loading = false;

                    //post request for create new game in KSToUser
                    console.log(gameTypeToSQL);
                    $http ({


                        method: 'POST',
                        url:'http://localhost:3000/Knapsack/createNewGame',
                        data: {
                            "userID":""+$rootScope.userID,
                            "puzzleID":'2',
                            "type":""+gameTypeToSQL
                        }})
                        .then(function(response) {

                            $http ({
                                method: 'GET',
                                url:'http://localhost:3000/Knapsack/getGameID'
                            })
                                .then(function(response) {
                                    // GameID = response.data.length;
                                    //console.log("GameID=== "+response.data.length);
                                    GameID = Object.values(response.data[0])[0];
                                    $rootScope.GameID = GameID;
                                    $scope.bagSize=bagsize;

                                }, function(response) {
                                    // $scope.records = response.statusText;
                                });
                        }, function(response) {
                            // $scope.records = response.statusText;
                        });

                }, function(response) {
                    // $scope.records = response.statusText;
                });



        }



        $scope.finishGame = function(){

            clearInterval(interval);
            // document.getElementById("status").innerHTML = "Game Over";
            // document.getElementById("finish").hidden= true;

            //pass to the finish questionarrie
            $location.url('/finishQuestion');



        }
        $scope.coinClicked = function (item) {
            console.log(item);
            let itemWeight = item[0];
            let itemValue = item[1];
            let itemInBag = item[2];
            var type;
            if (!itemInBag)
                type = "insert";
            else
                type = "extract";
            if ((itemWeight + sizeUsed <= bagsize && itemInBag == false) || itemInBag) {//legal move

                $http({

                    method: 'POST',
                    url: 'http://localhost:3000/Knapsack/insertMove',
                    data: {
                        "GameID": "" + $rootScope.GameID,
                        "itemWeight": "" + 1,
                        "itemValue": "" + itemValue,
                        "itemSize": "" + itemWeight,
                        "type": "" + type,

                        //TODO "time": "" + stringminute + ":" + stringsecond + ""
                        "time": "00:00"
                    }
                })
                    .then(function (response) {
                        updateBag(item[0], item[1],itemInBag);
                        item[2] = !item[2];

                    }, function (response) {
                        //TODO fail
                    });
            }
            else{
                //TODO
                window.alert("impossible move, osher lets not allow click ( make the coin grey ...)");
            }

        }


        function updateBag(changedWeight, changedValue, itemInBag){//TODO osher finish coinClicked for insertion\extraction item.
            // positive values for insertion.
            //TODO handle if failed or not on parent function
            if(itemInBag) {
                changedWeight *= -1;
                changedValue *= -1;
            }
            valueGained+=changedValue;
            sizeUsed+=changedWeight;
            console.log(sizeUsed);
            console.log(valueGained);
            $scope.sizeUsed = sizeUsed;
            $scope.valueGained = valueGained;

        }
        $scope.drawCoin = function (item) {
            //console.log(item);
            if (!item)
                return $scope.coin;
            else
                return $scope.chosen;

        }
        $scope.getWeight = function (weight) {
            return weight

        }
        $scope.getValue = function (value) {
            return value

        }
        $scope.myStyle = function (item) {
            //console.log(item);

            let myObj = {
                "color" : "black",
                "position" :"absolute",
                "top" : $scope.txtPos.toString()+"%",
                "left" : "3%"

                //"font-size" : "60px",
                //"padding-right" : "20px"

            }
            if ($scope.txtPos < 23 * items.length )
                $scope.txtPos = $scope.txtPos + 30
            return myObj
        }

        $scope.timer = function (){

            console.log("hereTimer");
            //show "game over" after 15 minutes
            setTimeout(function () {
                alert("Game Over");
                $location.url('/finishQuestion');

            },900000);

            // let second = 1000;
            // let minute = 1000 * 60;
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

                if(gameLocation != "Game"){
                    clearInterval(interval);

                }

                if(document.getElementById("status") != null){

                    console.log("hereInnerrrr");
                    document.getElementById("status").innerHTML = "Time Left: "
                        + minute + "m " + second + "s ";
                }

                //game over
                if (distance < 0) {
                    clearInterval(interval);
                    document.getElementById("status").innerHTML = "Game Over";
                    $location.url('/finishQuestion');
                }

            }, 1000)



        };

    });










