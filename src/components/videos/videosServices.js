'use strict';
/* global angular */
var videosServices = angular.module('videosServices', ['appConfig', 'videosAPI']);

videosServices.service('videosServices', ['videosAPI', function (videosAPI) {
  this.getVideos = function (maxResults) {
    var params = {
      part: 'snippet, contentDetails',
      playlistId: 'PLQCmSnNFVYnTD5p2fR4EXmtlR6jQJMbPb',
      maxResults: maxResults
    };
    return videosAPI.getVideos(params.part, params.playlistId, params.maxResults);
  };

  this.getVideoStatistic = function (videoId) {
    var params = {
      part: 'statistics',
    };
    return videosAPI.getVideoStatistic(params.part, videoId);
  };
}]);
