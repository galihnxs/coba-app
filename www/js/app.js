// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('coba-app', ['ionic','LocalStorageModule'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
//add prefix to avoid overwritten
app.config(function(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('coba-app');
});

//Set up main controller
app.controller('main',

    //Use ionic modal and inject local storage service
    //into this controller
    function($scope,$ionicModal,localStorageService){
      var taskData = 'task';
      //No need to test data anymore
      $scope.tasks=[];
      //Task scope with empty object
      $scope.task={};

/*BUILDING CRUD for Task*/
      //Create and load modal for all tasks
      $ionicModal.fromTemplateUrl('new-task-modal.html',{
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal){
        $scope.newTaskModal = modal;
      });
      $scope.openModal = function() {
        $scope.newTaskModal.show();
      };
      $scope.closeModal = function() {
        $scope.newTaskModal.hide();
      };

      //Get task from local storage
      $scope.getTasks = function(){
        //If there are array of tasks in localStorageService
        //return it
        if(localStorageService.get(taskData)){
          $scope.tasks=localStorageService.get(taskData);
        }else{
        //Else, create an array of tasks
          $scope.tasks=[];
        }
      }

      //Creates a new task
      $scope.createTask = function(){
        //Masukan
        $scope.tasks.push($scope.task);
        localStorageService.set(taskData,$scope.tasks);
        $scope.task = {};
        //close new task modal
        $scope.newTaskModal.hide();
      }
      //Removes a task
      $scope.removeTask = function(index){
        $scope.tasks.splice(index,1);
        localStorageService.set(taskData,$scope.tasks);
      }
      //Update a task when completed
      $scope.completedTask = function(index){
        if(index !== -1){
          $scope.tasks[index].completed = true;
        }
        localStorageService.set(taskData,$scope.tasks);
      }
});
