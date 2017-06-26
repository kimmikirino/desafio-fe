'use strict';
/* global angular, $http, topicType, youtubeConfig */
var videosAPI = angular.module('videosAPI', ['ngResource', 'appConfig']);

videosAPI.service('videosAPI', ['youtubeConfig', '$http', function(youtubeConfig, $http){

    this.getVideos = function(part, playlistId, maxResults){
        return $http({
                    method : 'GET',
                    url : youtubeConfig.listItems(part, playlistId, maxResults)
                });
    };

    this.getVideoStatistic = function(part, videoId){
        return $http({
                    method : 'GET',
                    url : youtubeConfig.videos(part, videoId)
                });
    };
}]);
