'use strict';
angular.module('app.todos_ctrl', [])

    .config(function ($stateProvider) {
        // Collection States
        $stateProvider
            .state('todos', {
                url: '/todos/index',
                controller: 'TodosIndexCtrl',
                templateUrl: 'states/todos/index.html'
            })
    })

    .controller('TodosIndexCtrl', function ($scope, $stateParams, $localStorage, hoodieArray) {
        $scope.form = {};
        $scope.settings = $localStorage;
        $scope.add = function (form) {
            $scope.todos.push({
                title: form.title
            });
            $scope.form = {};
        };

        hoodieArray.bind($scope, 'todos', 'todo');
    });
