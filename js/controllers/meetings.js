myApp.controller('MeetingsController',
  ['$scope', '$firebaseAuth', '$firebaseArray',
  function($scope, $firebaseAuth, $firebaseArray) {

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
