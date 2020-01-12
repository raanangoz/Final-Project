var express = require('express');
var DButilsAzure = require('../DButils');
var users = express.Router();
var parser = require('body-parser');
const jwt = require('jsonwebtoken');

users.use(express.json());
module.exports = users;
//for token

secret = "secret123";

users.get('/select', function (req, res) {
    DButilsAzure.execQuery('SELECT userName FROM userData')
        .then(function (result) {
            res.send(result)
        })
        .catch(function (err) {
            console.log(err)
            res.send(err)
        })
})

//login function
users.post('/login', function (req, res) {
    console.log(req.body);
    var username = req.body.username;
    var password = req.body.password;
    var query = "select password from userData where userName = '" + username + "'";
    DButilsAzure.execQuery(query)
        .then(function (result) {
            //user does not exist
            if (result.length == 0) {
                res.send("No such username")
            }
            //user exist- check password
            else if (result[0]['password'] === password){


                payload = {id: 1, name:username, admin: false};
                options = {expiresIn: "1d" };
                const token = jwt.sign(payload, secret, options);
                res.send(token);
            }
            else
                res.send("Wrong password")

        })
        .catch(function (err) {
            console.log(err)
            res.send(err)
        })


})


//register function
users.post('/register', function (req, res) {


    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var city = req.body.city;
    var country = req.body.country;
    var email = req.body.email;
    var intrest1 = req.body.intrest1;
    var intrest2 = req.body.intrest2;
    var question1 = req.body.question1;
    var question2 = req.body.question2;
    var userName = req.body.userName;
   //var userName = "osherrrr";
    var password = req.body.password;
    var answer1 = req.body.answer1;
    var answer2 = req.body.answer2;


    console.log("firstName= "+firstName);
    var userNameLength = (userName).length;
    console.log(userNameLength);
    var passwordLength = (password).length;

    var queryUserNameCheck = "select userName from userData where userName = '" + userName + "'";
    var queryCountryCheck = "select country from countries where country = '" + country + "'";

    DButilsAzure.execQuery(queryUserNameCheck)
        .then(function (result) {

            //check username
            if (result.length != 0) {
                res.send("Username exists. Please choose new one");


            }
            else {
                DButilsAzure.execQuery(queryCountryCheck)
                    .then(function (result) {
                        if (result.length == 0) {
                            res.send("please choose a valid country");
                        }
                        //country is valid
                        else {

                            var num = /[0-9]/;
                            var temp = /[@$!%*#?&^+|/~><.'";,=/`]/; 
                            var validEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        
                            //check length of username
                            if (userNameLength < 3 || userNameLength > 8 || num.test(userName) || temp.test(userName)) {
                                res.send("Username is not valid")
                                return;
                            }
             
                             //check length of password
                            else if (passwordLength < 5 || passwordLength > 10 || temp.test(password)) {  ////////////check password letters and numbers only
                                res.send("Password is not valid")
                                return;
                            }

                            //check email
                            else if(!(validEmail.test(email))){
                                res.send("Email is not valid")
                                return;

                            }

                            else {

                                var query = "INSERT INTO userData (userName, password, firstName, lastName, city, country, email,intrest1, intrest2, question1, question2, answer1, answer2) VALUES ('" + userName + "','" + password + "','" + firstName + "','" + lastName + "','" + city + "','" + country + "','" + email + "','" + intrest1 + "','" + intrest2 + "','" + question1 +"','"+question2+"','"+answer1+"','"+answer2+ "')";

                                DButilsAzure.execQuery(query)
                                    .then(function (result) {
                                        res.send("Registration completed");
                                    })
                                    .catch(function (err) {
                                        console.log(err)
                                        res.send(err)
                                    })
                            }
                        }
                    })
                    .catch(function (err) {
                        console.log(err)
                        res.send(err)
                    })

            }

        })
        .catch(function (err) {
            console.log(err)
            res.send(err)
        })

})

//user chooses a question from the two questions he entered in the register
users.post('/questionRetrival', function (req, res) {

    var username = req.body.username;
    DButilsAzure.execQuery("select question1, question2 from userData where userName = '" + username + "'")
    .then(function (result) {
         //user does not exist
         if (result.length == 0) {
            res.send("No such username")
        }else{
            res.send(result)
        }

    })
    .catch(function (err) {
        console.log(err)
        res.send(err)
    })
})

users.post('/answerRetrival', function (req, res) {

    var username = req.body.username;
    //the question the user chose to answer
    var question = req.body.question;
    var answer = req.body.answer;
    console.log(answer);

    DButilsAzure.execQuery("select answer1, answer2 from userData where userName = '" + username + "'")

    .then(function (result) {
        console.log("result="+result[0]['answer']);
         //wrong answer
         if (result[0]['answer1']!=answer && result[0]['answer2']!=answer ) {
            res.send("Wrong answer")
        }else{
            DButilsAzure.execQuery("select password from userData where userName = '" + username + "'")
            .then(function (result) {
                res.send(result)
                })
                .catch(function (err) {
                    console.log(err)
                    res.send(err)
                })
        }
    }).catch(function (err) {
        console.log(err)
        res.send(err)
    })
})

