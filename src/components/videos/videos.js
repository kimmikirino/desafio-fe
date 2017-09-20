'use strict';
/* global angular, confirm */

var videos = angular.module('videos', ['ngRoute', 'videosServices', 'videosDirectives', 'appConfig']);

videos.config(['$routeProvider', '$httpProvider',
    function($routeProvider, $httpProvider) {
        $httpProvider.defaults.withCredentials = true;

        $routeProvider
            .when('/trending', {
                templateUrl: 'components/videos/trending.html',
                controller: 'trendingController'
            })
            .when('/videos/:searchName?', {
                templateUrl: 'components/videos/videos.html',
                controller: 'videosController'
            });
    }
]);

/************************************************************************************************
 * Controllers
 ************************************************************************************************/

videos.controller('trendingController', ['$scope', '$rootScope','videosServices', 'youtubeConfig',
    function($scope, $rootScope, videosServices, youtubeConfig ) {
        $scope.countVideos = 5;
        $scope.loading = true;
        $scope.loadingMoreVideos = false;
        $scope.videoSelected = '';
        $scope.videoInfo = {};
        $scope.videosList = [];

        var concatId = function (array) {
            return array.map( function (elem) {
                return elem.snippet.resourceId.videoId;
            }).join(',');
        };

        var selectVideo = function (data) {
            $scope.videoSelected = data.id;
            $scope.videoStatistics = data.statistics;
            $scope.videoDetails = data.snippet;
            $scope.url = youtubeConfig.playVideo + $scope.videoSelected;
        };

        videosServices.getVideos($scope.countVideos).then( function (data) {
            $scope.videos = data.data.items;
            let concatVideos = concatId($scope.videos);

            videosServices.getVideoStatistic(concatVideos).then( function (videoData) {
                $scope.loading = false;
                angular.merge($scope.videos, videoData.data.items);
                selectVideo($scope.videos[0]);
                $scope.videos.splice(0, 1);
                $scope.videosList = $scope.videos;
            }, function error (errorData) {
                console.log(data);
            });
        }, function error (data) {
            console.log(data);
        });

        $scope.playVideo = function (video) {
            selectVideo(video);
        };

        $scope.moreVideos = function () {
            $scope.loadingMoreVideos = true;
            $scope.countVideos = $scope.countVideos + 5;
            videosServices.getVideos($scope.countVideos).then( function (data) {
                $scope.videosList = data.data.items;
                let concatVideos = concatId($scope.videosList);
                videosServices.getVideoStatistic(concatVideos).then( function  (videoData) {
                    angular.merge($scope.videosList, videoData.data.items);
                    $scope.loadingMoreVideos = false;
                }, function error (errorData) {
                    console.log(data);
                });
            }, function error (data) {
                console.log(data);
            });
        };
    }
]);

videos.controller('videosController', ['$scope', '$routeParams','$location', 'videosServices', 'youtubeConfig', '$filter',
    function($scope, $routeParams, $location, videosServices, youtubeConfig, $filter ) {
        $scope.loading = true;
        $scope.countVideos = 12;
        $scope.loadingMoreVideos = false;
        $scope.searchName = {
            snippet: {
                title: $routeParams.searchName
            }
        };

        if ($routeParams.searchName) {
            $scope.countVideos = 50;
        }

        var concatId = function (array) {
            return array.map( function (elem) {
                return elem.snippet.resourceId.videoId;
            }).join(',');
        };

        var selectVideo = function (data) {
            $scope.videoSelected = data.id;
            $scope.videoStatistics = data.statistics;
            $scope.videoDetails = data.snippet;
            $scope.url = youtubeConfig.playVideo + $scope.videoSelected;
        };

        videosServices.getVideos($scope.countVideos).then( function (data) {
            $scope.videosListAll = data.data.items;
            $scope.pageInfo = data.data.pageInfo;
            let concatVideos = concatId($scope.videosListAll);
            videosServices.getVideoStatistic(concatVideos).then( function  (videoData) {
                $scope.loading = false;
                angular.merge($scope.videosListAll, videoData.data.items);
                $scope.videosList = $scope.videosListAll;
                console.log($scope.videosList);
            }, function error (errorData) {
                console.log(data);
            });
        }, function error (data) {
            console.log(data);
        });

        $scope.moreVideos = function () {
            $scope.loadingMoreVideos = true;
            $scope.countVideos = $scope.pageInfo.totalResults;
            videosServices.getVideos($scope.countVideos).then( function (data) {
                console.log(data);
                $scope.videosList = data.data.items;
                let concatVideos = concatId($scope.videosList);
                videosServices.getVideoStatistic(concatVideos).then( function  (videoData) {
                    angular.merge($scope.videosList, videoData.data.items);
                    $scope.loadingMoreVideos = false;
                }, function (errorData) {
                    console.log(data);
                });
            }, function (data) {
                console.log(data);
            });
        };

        $scope.playVideo = function (video) {
            selectVideo(video);
        };
    }
]);
