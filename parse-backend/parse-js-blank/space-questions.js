Parse.initialize("AK26J8RDJqlwxb2wewzz4sE7dpvYJOdVstu7v6be", "RrkuVkdBBws0vADmr1kb8SkGGu1aZm49g9qsUJiX");

function questions(){

  var SpaceQuestion = Parse.Object.extend("SpaceQuestion");
  var spaceQuestion = new SpaceQuestion();

  spaceQuestion.set("question", document.getElementById("question").value);
  spaceQuestion.set("a", document.getElementById("a").value);
  spaceQuestion.set("b", document.getElementById("b").value);
  spaceQuestion.set("c", document.getElementById("c").value);
  spaceQuestion.set("answer", document.getElementById("answer").value);

  spaceQuestion.save(null, {
    success: function(spaceQuestion) {
      // Execute any logic that should take place after the object is saved.
      alert('New object created with objectId: ' + spaceQuestion.id);
    },
    error: function(spaceQuestion, error) {
      // Execute any logic that should take place if the save fails.
      // error is a Parse.Error with an error code and message.
      alert('Failed to create new object, with error code: ' + error.message);
    }
  });
}
