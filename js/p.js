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