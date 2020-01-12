var express = require('express');
var app = express();
var DButilsAzure = require('./DButils');
// var users = require('./Modules/Users');
// var POI = require('./Modules/POI');
// var favorites = require('./Modules/Favorites');

// app.use('/Users', users);
// app.use('/POI', POI);
// app.use('/Favorites', favorites);
var cors = require('cors');
app.use(cors());

var port = 3000;
app.use(express.json());
app.listen(port, function () {
    console.log('Example app listening on port ' + port);
});



app.get('/select', function (req, res) {
    DButilsAzure.execQuery('SELECT firstName FROM users')
        .then(function (result) {
            res.send(result)

        })
        .catch(function (err) {
            console.log(err)
            res.send(err)
        })
})


app.get('/getBoard/:dif', function (req, res) {
    var dif = req.params.dif;
    var type = req.params.type;
    DButilsAzure.execQuery("SELECT * FROM sodukoInstance where difficult='"+dif+"'")
     // var query = "select orderPOI from userData where userName='"+username+"'";
        .then(function (result) {
            res.send(result)


        })
        .catch(function (err) {
            console.log(err)
            res.send(err)
        })
})


app.post('/createNewGame', function (req, res) {

    console.log("why 2 times ");
    var userID = req.body.userID;
    var puzzleID = req.body.puzzleID;
    var type = req.body.type;
    var insertQuery = "insert into SudokuToUser (PuzzleID, UserID, GameType) values ('"+puzzleID+"','"+userID+"','"+type+"')";
    DButilsAzure.execQuery(insertQuery)
    // (intrestName, userName, date, reviewDescription, rank) values ('"+interestName+"','"+username+"','"+fullDate+"','"+description+"','"+rank+"')";

    // var query = "select orderPOI from userData where userName='"+username+"'";
        .then(function (result) {
            res.send(result)


        })
        .catch(function (err) {
            console.log(err)
            res.send(err)
        })

    // var getQuery = "select GameID from SudokuToUser "
    // DButilsAzure.execQuery(queryCountryCheck)
})


app.get('/getGameID', function (req, res) {

    var query = "select * from SudokuToUser";
    DButilsAzure.execQuery(query)
    // (intrestName, userName, date, reviewDescription, rank) values ('"+interestName+"','"+username+"','"+fullDate+"','"+description+"','"+rank+"')";

    // var query = "select orderPOI from userData where userName='"+username+"'";
        .then(function (result) {
            res.send(result)


        })
        .catch(function (err) {
            console.log(err)
            res.send(err)
        })




})

app.post('/insertMove', function (req, res) {//TODO MAYBE DELETEMOVE ASWELL

    var GameID = req.body.GameID;
    var stepValueAndCords = req.body.stepValueAndCords;//rowcolval
    var query = "select *  from runningSudoku where gameID='"+GameID+"'";
    var stepID;
    var steptype = "insert";
    var time = req.body.time;//TODO CLIENT SEND 4 DIGITS OF TIME LEFT/ TIME PASSED?
    DButilsAzure.execQuery(query)
    // (intrestName, userName, date, reviewDescription, rank) values ('"+interestName+"','"+username+"','"+fullDate+"','"+description+"','"+rank+"')";

    // var query = "select orderPOI from userData where userName='"+username+"'";
        .then(function (getResult) {
            console.log("successssssssssssssssssssssssssssssssssssss");
            // stepID = getResult.rowsAffected();
            // console.log(stepID);
            stepID = getResult.length+1;
            console.log(stepID);
            var postQuery = "insert into runningSudoku values ('"+GameID+"','"+ stepID+"','"+ steptype+"','"+time+"','"+stepValueAndCords +"')";

            console.log("starting second query");
            console.log(postQuery);
            DButilsAzure.execQuery(postQuery)
                .then(function (postQueryResult) {
                    res.send(postQueryResult)


                })
                .catch(function (postQueryResult) {
                    console.log(postQueryResult)
                    res.send(postQueryResult)
                })



        })
        .catch(function (getResultErrr) {
            console.log(getResultErrr)
            res.send(getResultErrr)
        })



    // (intrestName, userName, date, reviewDescription, rank) values ('"+interestName+"','"+username+"','"+fullDate+"','"+description+"','"+rank+"')";

    // var query = "select orderPOI from userData where userName='"+username+"'";


})

app.post('/submitQuestinary', function (req, res) {
    var fName = req.body.firstName;
    var lName = req.body.lastName;
    var age = req.body.userAge;
    var rank = req.body.userRank;
    var postQuery = "insert into users values ('"+fName+"','"+ lName+"','"+ age+"','"+rank+"')";
    DButilsAzure.execQuery(postQuery)
    // var query = "select orderPOI from userData where userName='"+username+"'";
        .then(function (result) {
            res.send(result)

        })
        .catch(function (err) {
            console.log(err)
            res.send(err)
        })
})

app.get('/getUserID', function (req, res) {

    var query = "select max (userID) as maxid from users";
    DButilsAzure.execQuery(query)
    // (intrestName, userName, date, reviewDescription, rank) values ('"+interestName+"','"+username+"','"+fullDate+"','"+description+"','"+rank+"')";

    // var query = "select orderPOI from userData where userName='"+username+"'";
        .then(function (result) {
            console.log(result)
            console.log(result)
            res.send(result)


        })
        .catch(function (err) {
            console.log(err)
            res.send(err)
        })

})








































