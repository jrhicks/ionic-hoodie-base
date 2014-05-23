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
            .state('welcome.signup', {
                url: '/account/signup',
                views: {
                    'account-tab': {
                        templateUrl: 'states/account/signup.html',
                        controller: 'AccountSignupCtrl'
                    }
                }
            })

    })

    .controller('AccountIndexCtrl', function ($scope, $stateParams, $localStorage, $ionicLoading, hoodieAccount, toaster) {
        $scope.account = hoodieAccount;

        $scope.signOut = function() {
            $ionicLoading.show({template: 'Signing Out <i class="ion-loading-c" />'});

            $scope.account = hoodieAccount;
            hoodieAccount.signOut()
                .then(
                function() {
                    $ionicLoading.hide();
                    $scope.account = hoodieAccount;
                },
                function() {
                    $ionicLoading.hide();
                    $scope.account = hoodieAccount;
                })
        };

        $scope.signIn = function(settings) {
            $ionicLoading.show({template: 'Signing In <i class="ion-loading-c" />'});
            hoodieAccount.signIn(settings.username, settings.password)
                .then(
                    function() {
                        $ionicLoading.hide();
                        $scope.account = hoodieAccount;
                    },
                    function() {
                        $ionicLoading.hide();
                        toaster.pop('failure', "Login Failed", "Please check your username and password and try again.");
                        $scope.account = hoodieAccount;
                    }
                )
            };

        $scope.signUp = function(settings)  {
            hoodieAccount.signUp(settings.username, settings.password);
        }
    })

    .controller('AccountSignupCtrl', function ($scope, $ionicNavBarDelegate, hoodieAccount) {

        $scope.form = {};

        $scope.cancel = function() {
            $ionicNavBarDelegate.back();
        };

        $scope.signUp = function(form) {
            console.log("signUp Button pushed");
            hoodieAccount.signOut();
            hoodieAccount.signUp(form.username, form.password).then( function() {
                console.log("signUp");
                $ionicNavBarDelegate.back();
            } )
        };

    });

