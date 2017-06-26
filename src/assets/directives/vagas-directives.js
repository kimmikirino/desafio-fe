'use strict';
/* global angular */

var vagas = angular.module('vagas');

vagas.directive('pageHeader', ['$rootScope', '$location',  function ( $rootScope, $location) {
    return {
        restrict: 'E',
        templateUrl:  'assets/directives/header.html',
        replace: true,
        link: function ($scope, iElm, iAttrs, controller) {
            $scope.inputFocus = function () {
                $('#search').focus();
            };

            $scope.submit = function () {
                $location.path("/videos/" + $scope.searchTitle);
            };
        }
    };
}]);

vagas.directive('tooltip', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            $(element).hover(function(){
                // on mouseenter
                $(element).tooltip('show');
            }, function(){
                // on mouseleave
                $(element).tooltip('hide');
            });
        }
    };
});
