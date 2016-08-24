var app = angular.module('myApp', ['ngAnimate']);

app.controller('AppCtrl', ['$scope', '$http', function($scope, $http){
   console.log('controller works properly');
var refresh = function(){
   $http.get('/contactlist').success(function(docs){
   	console.log('recieve the data that wanted');//console.log(docs);
   	$scope.contactlist = docs;
   });
};
refresh();

   $scope.add = function(){
   	console.log($scope.contact);
   	var aa={
   		name:$scope.contact.name,
   	    email:$scope.contact.email,
     	number:$scope.contact.number
     };
   	console.log(aa);
   	$http.post('/contactlist', aa).success(function(docs){
   		console.log('item is added');
   		refresh();
   		$scope.contact ="";
   	});
   };

   $scope.remove = function(id){
   	console.log(id);
   	$http.delete('/contactlist/' + id).success(function(docs){
   		console.log(docs);
   		refresh();
   	});
   };

   $scope.edit = function(id){
   	console.log(id);
   	$http.get('/contactlist/' + id).success(function(docs){
   		console.log(docs);
   		$scope.contact = docs;
   	});
   };

   $scope.update = function(){
   	console.log($scope.contact._id);
   	$http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(docs){
   		refresh();
   		$scope.contact="";
   	});
   };

   $scope.clean = function(){
   	$scope.contact="";
   }


}]);