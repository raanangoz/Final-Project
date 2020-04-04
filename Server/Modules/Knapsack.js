var express = require('express');
var DButilsAzure = require('../DButils');
var Knapsack = express.Router();
var parser = require('body-parser');
const jwt = require('jsonwebtoken');

Knapsack.use(express.json());
module.exports = Knapsack;

var cors = require('cors');
Knapsack.use(cors());

Knapsack.post('/createNewGame', function (req, res) {
    var userID = req.body.userID;
    var puzzleID = req.body.puzzleID;
    var type = req.body.type;
    var insertQuery = "insert into KSToUser (PuzzleID, UserID, GameType) values ('"+puzzleID+"','"+userID+"','"+type+"')";
    DButilsAzure.execQuery(insertQuery)
        .then(function (result) {
            res.send(result)

        })
        .catch(function (err) {
            console.log("here errorrrrr")
            res.send(err)
        })

})

Knapsack.post('/insertMove', function (req, res) {//TODO MAYBE DELETEMOVE ASWELL

    var GameID = req.body.GameID;
    console.log(GameID);
    //TODO item ID?
    var itemID= null;
    var itemWeight = req.body.itemWeight;
    var itemValue = req.body.itemValue;
    var query = "select *  from runningKS where gameID='"+GameID+"'";
    var stepID;
    var steptype = "insert";
    var time = req.body.time;//TODO CLIENT SEND 4 DIGITS OF TIME LEFT/ TIME PASSED?
    DButilsAzure.execQuery(query)
        .then(function (getResult) {
            console.log("successssssssssssssssssssssssssssssssssssss");
            // stepID = getResult.rowsAffected();
            // console.log(stepID);
            stepID = getResult.length+1;
            console.log(stepID);
            var postQuery = "insert into runningKS values ('"+GameID+"','"+ stepID+"','"+ steptype+"','"+time+"','"+itemID+"','"+itemWeight +"','"+itemValue +"')";
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
})

Sudoku.get('/getUserID', function (req, res) {//TODO DUPLICATED CODE

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