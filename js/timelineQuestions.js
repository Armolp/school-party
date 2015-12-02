Parse.initialize("AK26J8RDJqlwxb2wewzz4sE7dpvYJOdVstu7v6be", "RrkuVkdBBws0vADmr1kb8SkGGu1aZm49g9qsUJiX");

var Timeline = Parse.Object.extend("Timeline");
var Timeline = new Timeline();

function getData() {
  var query = new Parse.Query(Timeline);
  query.find({
    success: function(data) {
      for (var i in data) {
        query.get(data[i].id, {
          success: function(Timeline) {
            

            var a = Timeline.get("a");
            var b = Timeline.get("b");
            var c = Timeline.get("c");
            var e = Timeline.get("e");
            var d = Timeline.get("d");
            var questionObject = {};
          
            questionObject.a = a;
            questionObject.b = b;
            questionObject.c = c;
            questionObject.d = d;
            questionObject.e=e;
            window.questionTimeline = window.questionTimeline || [];
            window.questionTimeline.push(questionObject);
           
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

window.onload = getData;