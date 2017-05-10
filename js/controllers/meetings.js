myApp.controller('MeetingsController',
  ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray',
  function($scope, $rootScope, $firebaseAuth, $firebaseArray) {

    // reference to database
    var ref = firebase.database().ref();
    // reference authentication (gives access to different properties)
    var auth = $firebaseAuth();

    // handles when the state of authentication changes for a user
    auth.$onAuthStateChanged(function(authUser) {
      if(authUser) {
        var meetingsRef = ref.child('users').child(authUser.uid).child('meetings');
        var meetingsInfo = $firebaseArray(meetingsRef);

        $scope.meetings = meetingsInfo;

        meetingsInfo.$loaded().then(function(data) {
          $rootScope.howManyMeetings = meetingsInfo.length;
        }); // make sure meeting data is loaded

        meetingsInfo.$watch(function(data) {
          $rootScope.howManyMeetings = meetingsInfo.length;
        }); // watch to see if variable changes through user interaction with app

        $scope.addMeeting = function() {
          meetingsInfo.$add({
            name: $scope.meetingname,
            date: firebase.database.ServerValue.TIMESTAMP
          }).then(function() {
            $scope.meetingname='';
          }); //promise
        } //addMeeting

        $scope.deleteMeeting = function(key) {
          meetingsInfo.$remove(key);
        } //deleteMeeting

      } //authUser
    }); //onAuthStateChanged

}]); //myApp.controller
