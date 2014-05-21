'use strict';

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app', ['ionic',
                       'hoodie',
                       'ui.router',
                       'app.todos_ctrl',
                       'app.settings_ctrl',
                       'ngStorage'
    ])

    .run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
          // Set the statusbar to use the default style, tweak this to
          // remove the status bar on iOS or change it to use white instead of dark colors.
          StatusBar.styleDefault();
        }
      })
    })

    .config(function(hoodieProvider) {
        hoodieProvider.url('http://localhost:9000');
    })

    .config(function ($urlRouterProvider) {
        $urlRouterProvider.otherwise('todos/index');
    });
