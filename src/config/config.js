'use strict';

var appConfig = angular.module('appConfig', []);

appConfig.constant('basePath', '');

appConfig.constant('youtubeConfig', {
    playlistItems: 'https://www.googleapis.com/youtube/v3/playlistItems',
    videosDetails: 'https://www.googleapis.com/youtube/v3/videos',
    key: 'AIzaSyCj81y1cYBUpD-vIE4SEbHpvxxxizXwQYY',
    playVideo: 'http://www.youtube.com/embed/',
    playlistId: 'PLQCmSnNFVYnTD5p2fR4EXmtlR6jQJMbPb',
    listItems: function( part, maxResults ) {
        return this.playlistItems + "?part=" + part + '&playlistId=' + this.playlistId + '&maxResults=' + maxResults +'&key=' + this.key;
    },
    videos: function( part, videoId ) {
        return this.videosDetails + "?part=" + part + '&id=' + videoId + '&key=' + this.key;
    }
});
