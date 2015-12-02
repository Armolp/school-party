Parse.initialize("AK26J8RDJqlwxb2wewzz4sE7dpvYJOdVstu7v6be", "RrkuVkdBBws0vADmr1kb8SkGGu1aZm49g9qsUJiX");

var Memory = Parse.Object.extend("Memory");
var Memory = new Memory();

function getDataMemory() {
  var query = new Parse.Query(Memory);
  query.find({
    success: function(data) {
      for (var i in data) {
        query.get(data[i].id, {
          success: function(Memory) {
            // The object was retrieved successfully.
            var question = Memory.get("question");

            var p1 = Memory.get("PreguntaUno");
            var p2= Memory.get("PreguntaDos");
            var p3= Memory.get("PreguntaTres");
            var p4 = Memory.get("PreguntaCuatro");
            var p5= Memory.get("PreguntaCinco");
            var p6= Memory.get("PreguntaSeis");
            var p7 = Memory.get("Preguntasiete");
            var p8= Memory.get("PreguntaOcho");
            var p9= Memory.get("Pregunta9");
             var r1 = Memory.get("r1");
            var r2= Memory.get("r2");
            var r3= Memory.get("r3");
            var r4 = Memory.get("r4");
            var r5= Memory.get("r5");
            var r6= Memory.get("r6");
            var r7 = Memory.get("r7");
            var r8= Memory.get("r8");
            var r9= Memory.get("r9");

            
            var questionObject = {};
            questionObject.p1 = p1;
            questionObject.p2 = p2;
            questionObject.p3= p3;
            questionObject.p4 = p4;
            questionObject.p5 = p5;
            questionObject.p6= p6;
            questionObject.p7 = p7;
            questionObject.p8 =p8;
            questionObject.p9= p9;
            questionObject.r1 = r1;
            questionObject.r2 = r2;
            questionObject.r3= r3;
            questionObject.r4 = r4;
            questionObject.r5 = r5;
            questionObject.r6= r6;
            questionObject.r7 = r7;
            questionObject.r8 = r8;
            questionObject.r9= r9;
            window.questionsM = window.questionsM || [];
            window.questionsM.push(questionObject);
          
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

//window.onload = getDataMemory;