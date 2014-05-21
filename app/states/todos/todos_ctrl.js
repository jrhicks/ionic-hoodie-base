'use strict';
angular.module('app.todos_ctrl', [])

    .config(function ($stateProvider) {
        // Collection States
        $stateProvider
            .state('welcome.todos', {
                url: '/todos/index',
                views: {
                    'todos-tab': {
                        templateUrl: 'states/todos/index.html',
                        controller: 'TodosIndexCtrl'
                    }
                }
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
