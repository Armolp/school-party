Parse.initialize("AK26J8RDJqlwxb2wewzz4sE7dpvYJOdVstu7v6be", "RrkuVkdBBws0vADmr1kb8SkGGu1aZm49g9qsUJiX");

function register() {

  var user = new Parse.User();
  user.set("username", document.getElementById("username").value);
  user.set("password", document.getElementById("password").value);
  user.set("email", document.getElementById("email").value);

  user.signUp(null, {
    success: function(user) {
      // Hooray! Let them use the app now.
      alert("Hooray!");
    },
    error: function(user, error) {
      // Show the error message somewhere and let the user try again.
      alert("Error: " + error.code + " " + error.message);
    }
  });
  event.preventDefault();
}

function login() {
  Parse.User.logIn(document.getElementById("existing-username").value, document.getElementById("existing-password").value, {
    success: function(user) {
      // Do stuff after successful login.
      alert("logged in!")
    },
    error: function(user, error) {
      // The login failed. Check error to see why.
    }
  });
  event.preventDefault();
}
