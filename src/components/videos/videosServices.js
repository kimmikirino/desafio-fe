'use strict';
/* global angular */
var videosServices = angular.module('videosServices', ['appConfig', 'videosAPI']);

videosServices.service('videosServices', ['videosAPI', function (videosAPI) {
  this.getVideos = function (maxResults) {
    var params = {
      part: 'snippet, contentDetails',
      maxResults: maxResults
    };
    return videosAPI.getVideos(params.part, params.maxResults);
  };

  this.getVideoStatistic = function (videoId) {
    var params = {
      part: 'statistics',
    };
    return videosAPI.getVideoStatistic(params.part, videoId);
  };
}]);
