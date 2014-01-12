'use strict';

var posts = [
	{
		id: 1,
		title:'Awesome build system',
		description: 'We propose the implementation of a new build system that is fast.',
		inventor: 'Oliver Vinn',
		date: new Date().toString(),
		votes: 42,
		supporters: ['Oliver Vinn', 'John Doe', 'Jane Doe']
	}
];

var userVotes = [1,4,6];

var campaignsServices = angular.module('campaignsServices', ['ngResource']);
campaignsServices.factory('Campaigns', ['$resource',
  function($resource){
    return $resource('campaigns/:campaignId.json', {}, {
      query: {method:'GET', params:{campaignId:'campaigns'}, isArray:true}
    });
  }]);

var votesServices = angular.module('votesServices', ['ngResource']);
votesServices.factory('Votes', ['$resource',
  function($resource){
    return $resource('campaigns/:campaignId.json', {}, {
      query: {method:'GET', params:{campaignId:'campaigns'}, isArray:true}
    });
  }]);


var controllers = {};

controllers.CampaignsController = ['$scope', '$routeParams',
	function ($scope, $routeParams) {
		
		// If requesting a specific post
		if ($routeParams.id) {
			$scope.post = posts[$routeParams.id - 1];
		} else {
			$scope.posts = posts;
		}

		$scope.userVotes = userVotes;

		$scope.support = function (post) {
			var i = $scope.userVotes.indexOf(post.id);
			if (i > -1) {
				$scope.userVotes.splice(i, 1);
				post.votes = post.votes - 1;
				console.log('Unsupported');

			} else {
				post.votes = post.votes + 1;
				$scope.userVotes.push(post.id);
				console.log('Supported');
			}
			console.log($scope.userVotes);
		};

		$scope.userSupports = function (postId) {
			return ($scope.userVotes.indexOf(postId)>-1);
		};
	}
];
voteApp.controller('CampaignsController', controllers.CampaignsController);

controllers.CreateCampaignController = ['$scope', '$location',
	function ($scope, $location) {

		$scope.$watch('newform', function(){
    		console.log('$scope.newform', $scope.newform);
  		});

		$scope.posts = posts;
		$scope.post = {
			title: '',
			description: '',
			votes: 0,
			id: $scope.posts.length + 1
		};

		$scope.update = function (newPost) {
			console.log('Post Submitted');
			newPost.date = new Date().now;
			console.log(newPost);
			$scope.posts.push(newPost);
			$location.path('/Campaign/view/' + newPost.id);
		};

		$scope.isInvalid = function(field) {
    		return ((!$scope.newform[field].$valid) && $scope.newform[field].$dirty);
  		};
	}
];
voteApp.controller('CreateCampaignController', controllers.CreateCampaignController);

controllers.PromoteController = ['$scope',
 	function ($scope) {
 		$scope.myInterval = 5000;
 		var slides = $scope.slides = [];

   		$scope.addSlide = function() {
 	    	var newWidth = 200 + ((slides.length + (25 * slides.length)) % 150);
 	    	slides.push({
 	      		image: 'http://placekitten.com/' + newWidth + '/200',
 	      		text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
 	        	['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
 	    	});
   		};
   		for (var i=0; i<4; i++) {
     		$scope.addSlide();
   		}
 	}
 ];
voteApp.controller('PromoteController', controllers.PromoteController);

