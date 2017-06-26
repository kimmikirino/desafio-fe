'use strict';

var appConfig = angular.module('appConfig', []);

appConfig.constant('basePath', '');

appConfig.constant('youtubeConfig', {
    playlistItems: 'https://www.googleapis.com/youtube/v3/playlistItems',
    videosDetails: 'https://www.googleapis.com/youtube/v3/videos',
    key: 'AIzaSyCj81y1cYBUpD-vIE4SEbHpvxxxizXwQYY',
    playVideo: 'http://www.youtube.com/embed/',
    listItems: function( part, playlistId, maxResults ) {
        return this.playlistItems + "?part=" + part + '&playlistId=' + playlistId + '&maxResults=' + maxResults +'&key=' + this.key;
    },
    videos: function( part, videoId ) {
        return this.videosDetails + "?part=" + part + '&id=' + videoId + '&key=' + this.key;
    }
});
