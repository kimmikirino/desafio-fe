'use strict';
/* global angular, NaN , TL, moment*/

var videosDirectives = angular.module('videosDirectives', ['compiledTemplates', 'appConfig', 'ngRoute']);

videosDirectives.directive('playVideo', ['$routeParams', '$filter', function ($routeParams, $filter) {
    // Runs during compile
    return {
        restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
        templateUrl: 'components/videos/partials/playVideo.html',
        replace: false,
        scope: {url: '@', title: '@', viewcount: '@', publishedat: '@', description:'@'},
        link: function ($scope, iElm, iAttrs, controller) {
            $scope.dateFormat = "dd 'de' MMMM 'de' yyyy";
        }
    };
}]);

videosDirectives.directive('playList', ['$routeParams', '$location', function ($routeParams, $location) {
    // Runs during compile
    return {
        restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
        templateUrl: 'components/videos/partials/playList.html',
        replace: true,
        scope: {url: '@', title: '@', viewcount: '@'},
        link: function ($scope, iElm, iAttrs, controller) {
        }
    };
}]);
