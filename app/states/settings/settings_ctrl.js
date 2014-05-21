'use strict';
angular.module('app.settings_ctrl', [])

    .config(function ($stateProvider) {
        // Collection States
        $stateProvider
            .state('welcome.settings', {
                url: '/settings/edit',
                views: {
                    'settings-tab': {
                        templateUrl: 'states/settings/edit.html',
                        controller: 'SettingsEditCtrl'
                    }
                }
            })

    })

    .controller('SettingsEditCtrl', function ($scope, $stateParams, $localStorage, hoodieAccount) {
        if(hoodieAccount.username != null)
        {
            $scope.$settings = $localStorage;
            $scope.account = hoodieAccount.username;
        }

        $scope.signOut = function(settings) {
            hoodieAccount.signOut().done(function(){
                alert("Signed Out");
            });
        };

        $scope.login = function(settings) {
            hoodieAccount.signIn(settings.username, settings.password);
        };

        $scope.signUp = function(settings)  {
            hoodieAccount.signUp(settings.username, settings.password);
        }
    });
