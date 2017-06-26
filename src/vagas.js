'use strict';
/* global angular, confirm */

var vagas = angular.module('vagas', [
  'ngRoute',
  'compiledTemplates',
  'videos'
]);

vagas.config(['$routeProvider', '$httpProvider', '$sceDelegateProvider',
    function($routeProvider, $httpProvider, $sceDelegateProvider) {

      $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'http://www.youtube.com/embed/**'
      ]);
      $routeProvider
        .otherwise({
            redirectTo: '/trending'
        });
    }
]);
