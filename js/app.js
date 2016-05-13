var app = angular.module("sampleApp", ["firebase"]);

app.factory("chatMessages", ["$firebaseArray",
  function($firebaseArray) {
    // create a reference to the database where we will store our data
    var randomRoomId = Math.round(Math.random() * 100000000);
//    var ref = new Firebase("https://docs-sandbox.firebaseio.com/af/array/full/" + randomRoomId);
    var ref = new Firebase("https://alexilist.firebaseio.com/messages");
//      https://alexilist.firebaseio.com

    return $firebaseArray(ref);
  }
]);

app.controller("ChatCtrl", ["$scope", "chatMessages",
  function($scope, chatMessages) {
      
    $scope.isGabbi = false; 
    $scope.isAlex = false; 
      
    $scope.user = "";
      
    $scope.selectUser = function(u)
    {
        
        if (u == 'G')
        {
//            alert("Gabbi chosen");
            $scope.isGabbi= true; 
            $scope.isAlex = false; 
//            alert($scope.isGabbi);
            $scope.user = "Gabbi";
            selectUserToggle('gabbi-icon');
        }
        
        else if (u == 'A')
        {
//            alert ("Alex chosen"); 
            $scope.isAlex = true; 
            $scope.isGabbi = false; 
//            alert($scope.isAlex);
            $scope.user = "Alex";
            selectUserToggle('alex-icon');
        }
        
//        alert($scope.user);
        
    }

    $scope.messages = chatMessages;

    $scope.addMessage = function() {
      // $add on a synchronized array is like Array.push() except it saves to the database!
      $scope.messages.$add({
        from: $scope.user,
        content: $scope.message,
        timestamp: Firebase.ServerValue.TIMESTAMP, 
      });

      $scope.message = "";
    };

    // if the messages are empty, add something for fun!
//    $scope.messages.$loaded(function() {
//      if ($scope.messages.length === 0) {
//        $scope.messages.$add({
//          from: "Uri",
//          content: "Hello!",
//          timestamp: Firebase.ServerValue.TIMESTAMP
//        });
//      }
//    });
  }
]);

function selectUserToggle(id)
{
    var elem = document.getElementById(id); 
    
    if (id == 'gabbi-icon')
    {
        elem.classList.add('fullcolor-icon');
        document.getElementById('alex-icon').classList.remove('fullcolor-icon');
    }
    
    else 
    {
        elem.classList.add('fullcolor-icon');
        document.getElementById('gabbi-icon').classList.remove('fullcolor-icon');
    }
    
}