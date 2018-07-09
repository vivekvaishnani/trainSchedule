 
  
  // Initialize Firebase
// Initialize Firebase
var config = {
    apiKey: "AIzaSyAncsqbaWpbUFLa9-NxSNOY786CHee7W40",
    authDomain: "train-7837b.firebaseapp.com",
    databaseURL: "https://train-7837b.firebaseio.com",
    projectId: "train-7837b",
    storageBucket: "train-7837b.appspot.com",
    messagingSenderId: "834514876567"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train-schedule").on("click", function(event){

    event.preventDefault();

    var trainName = $("#train-name").val().trim();
    var trainDestination = $("#destination").val().trim();
    var firstTrainTime = $("#first-train-time").val().trim()
    var trainFrequency = $("#train-frequency").val().trim()

    // var firstTrainTime = moment($("#first-train-time").val().trim(),"hh:mm a").format('LT');
    // var trainFrequency = moment($("#first-train-time").val().trim(),"mm").minutes(Number);
    
    
    

    var trainData = {

        trainName: trainName,
        trainDestination: trainDestination,
        firstTrainTime: firstTrainTime,
        trainFrequency: trainFrequency

    };

    database.ref().push(trainData);


    console.log(trainData.trainName);
    console.log(trainData.trainDestination);
    console.log(trainData.firstTrainTime);
    console.log(trainData.trainFrequency);

    alert("Train schedule successfully added");

    $("#train-name").val("");
    $("#destination").val()("");
    $("#first-train-name").val("");
    $("#trainFrequency").val("");
        
  })

  




  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().trainName;
    var trainDestination = childSnapshot.val().trainDestination;
    var firstTrainTime = childSnapshot.val().firstTrainTime;
    var trainFrequency = childSnapshot.val().trainFrequency;
  
    // Employee Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(firstTrainTime);
    console.log(trainFrequency);
  
    
     
    var trainTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(trainTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    
    // Difference between the times
    var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);    

    // Time apart (remainder)
    var tRemainder = diffTime % trainFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = trainFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var nextTrainFormatted = moment(nextTrain).format("hh:mm");

    
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFrequency),
      $("<td>").text(nextTrainFormatted),
      $("<td>").text(tMinutesTillTrain),
      
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });


    // Trying to setup a clear table function  //

  // $("#clear-train-schedule").on("click", function(event){

  //   event.preventDefault();

  //   database.ref().on("remove", function(childSnapshot) {

  //     ref.remove();


  //       console.log(childSnapshot.val());

  //   });

  // });