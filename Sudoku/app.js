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
        .when('/game', {
            // this is a template
            templateUrl: 'pages/game/game.html',
            controller : 'gameController as gameCtrl'
        })

        //
        .when('/question', {
            // this is a template
            templateUrl: 'pages/question/question.html',
            controller : 'questionController as questionCtrl'
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