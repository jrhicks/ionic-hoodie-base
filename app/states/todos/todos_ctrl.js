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

    .controller('TodosIndexCtrl', function ($scope, $stateParams, hoodieArray) {
        $scope.form = {};

        $scope.add = function (form) {
            $scope.todos.push({
                title: form.title
            });
            $scope.form = {};
        };

        hoodieArray.bind($scope, 'todos', 'todo');
    });
