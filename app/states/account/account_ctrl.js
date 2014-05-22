'use strict';
angular.module('app.account_ctrl', [])

    .config(function ($stateProvider) {
        // Collection States
        $stateProvider
            .state('welcome.account', {
                url: '/account/index',
                views: {
                    'account-tab': {
                        templateUrl: 'states/account/index.html',
                        controller: 'AccountIndexCtrl'
                    }
                }
            })

    })

    .controller('AccountIndexCtrl', function ($scope, $stateParams, $localStorage, hoodieAccount) {
        $scope.username = hoodieAccount.username;

        $scope.signOut = function() {
            console.log("signOut");
            hoodieAccount.signOut().then( function() {
                $scope.username = hoodieAccount.username
            } )
        };

        $scope.signIn = function(settings) {
            hoodieAccount.signIn(settings.username, settings.password).then( function() {
                $scope.username = hoodieAccount.username
            } )
        };

        $scope.signUp = function(settings)  {
            hoodieAccount.signUp(settings.username, settings.password);
        }
    });
