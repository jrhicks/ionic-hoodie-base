'use strict';
angular.module('app.account_ctrl', [])

    .config(function ($stateProvider) {
        // Collection States
        $stateProvider
            .state('account_show', {
                url: '/account/show',
                controller: 'AccountShowCtrl',
                templateUrl: 'states/account/show.html'
            })
            .state('account_edit', {
                url: '/account/edit',
                controller: 'AccountEditCtrl',
                templateUrl: 'states/account/edit.html'
            })

    })

    .controller('AccountShowCtrl', function ($scope, $stateParams) {
    })

    .controller('AccountEditCtrl', function ($scope, $stateParams) {
        $scope.account = {server: 'http://localhost:9000'};
    });


