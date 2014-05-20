'use strict';
angular.module('app.settings_ctrl', [])

    .config(function ($stateProvider) {
        // Collection States
        $stateProvider
            .state('settings_show', {
                url: '/settings/show',
                controller: 'SettingsShowCtrl',
                templateUrl: 'states/settings/show.html'
            })
            .state('settings_edit', {
                url: '/settings/edit',
                controller: 'settingsEditCtrl',
                templateUrl: 'states/settings/edit.html'
            })

    })

    .controller('SettingsShowCtrl', function ($scope, $stateParams, $ionicNavBarDelegate, angularLocalStorage) {
        $scope.settings = {server: 'http://localhost:9000'};
        $scope.editSettings = function() {
            alert("hello")
        };
    })

    .controller('settingsEditCtrl', function ($scope, $stateParams) {
        $scope.settings = {server: 'http://localhost:9000'};
    });
