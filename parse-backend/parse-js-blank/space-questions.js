Parse.initialize("AK26J8RDJqlwxb2wewzz4sE7dpvYJOdVstu7v6be", "RrkuVkdBBws0vADmr1kb8SkGGu1aZm49g9qsUJiX");

function getData() {
  var SpaceQuestion = Parse.Object.extend("SpaceQuestion");
  var query = new Parse.Query(SpaceQuestion);

  //Get all data
  var query = new Parse.Query(SpaceQuestion);
  query.find({
    success: function(data) {
      for (var i in data) {
        // console.log(data[i].id);
        query.get(data[i].id, {
          success: function(spaceQuestion) {
            // The object was retrieved successfully.
            var question = spaceQuestion.get("question");
            var a = spaceQuestion.get("a");
            var b = spaceQuestion.get("b");
            var c = spaceQuestion.get("c");
            var answer = spaceQuestion.get("answer");
            console.log(question + "\n" + a + "\n" + b + "\n" + c + "\n" + answer);

            var para = document.createElement("p");
            var node = document.createTextNode(question + "\n" + a + "\n" + b + "\n" + c + "\n" + answer);
            para.appendChild(node);
            var element = document.getElementById("info");
            element.appendChild(para);
          },
          error: function(object, error) {
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
          }
        });
      }
    },
    error: function(error) {
      console.log(error);
    }
  });
}


function questions() {

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
      // alert('New object created with objectId: ' + spaceQuestion.id);
      alert("Pregunta guardada");
      window.location.reload();
    },
    error: function(spaceQuestion, error) {
      // Execute any logic that should take place if the save fails.
      // error is a Parse.Error with an error code and message.
      alert('Failed to create new object, with error code: ' + error.message);
    }
  });
}
