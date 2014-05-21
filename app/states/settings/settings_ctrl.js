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

    .controller('SettingsEditCtrl', function ($scope, $stateParams, $localStorage) {
        $scope.$settings = $localStorage;

        $scope.signOut = function(settings) {
            var hoodie = new Hoodie();
            hoodie.account.signOut().done(function(){
                alert("Signed Out");
            });
        };

        $scope.login = function(settings) {
            var hoodie = new Hoodie();
            hoodie.account.signIn(settings.username, settings.password).done(function(){
                alert("hello");
            });
        };
        $scope.signUp = function(settings)  {
            alert(settings.username);
            alert(settings.password);
            var hoodie = new Hoodie();
            hoodie.account.signUp(settings.username, settings.password).done(function(){
                alert("hello");
            });
        }
    });
