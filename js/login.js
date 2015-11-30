function login() {
  Parse.User.logIn(document.getElementById("loginUsername").value, document.getElementById("loginPassword").value, {
    success: function(user) {

      alert("logged in!");
      clearMenu(loadGameState.menu.container);
      clearMenu(document.getElementById("loginForm"));

      loadGameState.game.states.switchState( "selectState" );

    },
    error: function(user, error) {
      // The login failed. Check error to see why.
    }
  });
  event.preventDefault();
}