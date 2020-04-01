var express = require('express');
var DButilsAzure = require('../DButils');
var Knapsack = express.Router();
var parser = require('body-parser');
const jwt = require('jsonwebtoken');

Knapsack.use(express.json());
module.exports = Knapsack;

var cors = require('cors');
Knapsack.use(cors());