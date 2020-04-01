let app = angular.module('sudokuApp', ["ngRoute"]);



// config routes
app.config(function($routeProvider)  {

    $routeProvider
    // homepage
        .when('/', {
            // this is a template
            templateUrl: 'pages/home/home.html',
            controller : 'homeController as homeCtrl'
        })
        .when('/sudokuGame', {
            // this is a template
            templateUrl: 'pages/sudokuGame/sudokuGame.html',
            controller : 'sudokuGameController as gameCtrl'
        })

        //
        .when('/startQuestion', {
            // this is a template
            templateUrl: 'pages/startQuestion/startQuestion.html',
            controller : 'startQuestionController as questionCtrl'
        })

        .when('/finishQuestion', {
            // this is a template
            templateUrl: 'pages/finishQuestion/finishQuestion.html',
            controller : 'finishQuestionController as finishQuestionCtrl'
        })
        // // about
        // .when('/about', {
        //     // this is a template url
        //     templateUrl: 'pages/about/about.html',
        //     controller : 'aboutController as abtCtrl'
        // })
        // // poi
        // .when('/poi', {
        //     templateUrl: 'pages/poi/poi.html',
        //     controller : 'poiController as poiCtrl'
        // })
        // // .when('/httpRequest', {
        // //     templateUrl: 'pages/http/request.html',
        // //     controller : 'httpController as httpCtrl'
        // // })
        //
        // .when('/login', {
        //     templateUrl: 'pages/login/login.html',
        //     controller : 'loginController as loginCtrl'
        // })
        //
        // .when('/register', {
        //     templateUrl: 'pages/register/register.html',
        //     controller : 'registerController as regCtrl'
        // })
        // .when('/loggedIn', {
        //     templateUrl: 'pages/loggedIn/loggedIn.html',
        //     controller : 'loggedInController as logeedInCtrl'
        // })
        // .when('/favorites', {
        //     templateUrl: 'pages/favorites/favorites.html',
        //     controller : 'favoritesController as favoritesCtrl'
        // })
        // .when('/logOut', {
        //     templateUrl: 'pages/logout/logout.html',
        //     controller : 'logoutController as logoutCtrl'
        // })
        // other
        .otherwise({ redirectTo: '/' });
});