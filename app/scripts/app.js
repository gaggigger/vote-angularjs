'use strict';

var voteApp = angular.module('voteApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'campaignsServices',
  'ui.bootstrap'
]);

voteApp.config(['$locationProvider', '$routeProvider',
  function ($locationProvider, $routeProvider) {
    //$locationProvider.html5Mode(true);
    $routeProvider.when('/Campaign/all',
    {
      controller: 'CampaignsController',
      templateUrl:'/views/posts.html'
    })
    .when('/Campaign/view/:id',
    {
      controller: 'CampaignsController',
      templateUrl:'/views/view.html'
    })
    .when('/Campaign/new',
    {
      controller: 'CreateCampaignController',
      templateUrl:'/views/create.html'
    })
    .when('/Campaign/promote',
    {
      controller: 'PromoteController',
      templateUrl:'/views/promo.html'
    })
    .otherwise({ redirectTo: '/Campaign/all' });
  }
]);
