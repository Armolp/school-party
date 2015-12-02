var loadGameState = new Kiwi.State( "loadGameState" );

loadGameState.create = function(){

    Kiwi.State.prototype.create.call(this);

    this.game.stage.color = "4488cc";

    document.getElementById("input").innerHTML = document.getElementById("loginTemplate").innerHTML;

    this.background = new Kiwi.GameObjects.StaticImage(this, this.textures.BG2, 0, 0);

    var menuW = 100;
    
    //declare a text field
    this.textField = new Kiwi.GameObjects.Textfield(this, 'Ingresa tus datos para empezar');
    this.textField.x = this.game.stage.width / 2;
    this.textField.y = 20;
    this.textField.color = '#FFFFFF';
    this.textField.fontFamily = 'Verdana, sans-serif';
    this.textField.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

    // Adds a menu widget to the defaultHUD of the game.
    this.bttnDone = new Kiwi.HUD.Widget.MenuItem( this.game, 'Iniciar', 20, 0 );
    this.bttnDone.style.color = 'white';
    this.bttnDone.style.fontFamily = 'Verdana,sans-serif';
    this.bttnDone.style.display = 'block';
    this.bttnDone.style.boxSizing = 'border-box';
    this.bttnDone.style.width = (menuW * 2).toString() + 'px';
    this.bttnDone.style.textAlign = 'center';
    this.bttnDone.style.cursor = 'pointer';
    this.bttnDone.style.padding = '0.5em 1em';
    this.bttnDone.style.backgroundColor = '#9c0';

    this.bttnBack = new Kiwi.HUD.Widget.MenuItem( this.game, 'Regresar', -2*menuW-20, 0 );
    this.bttnBack.style.color = 'white';
    this.bttnBack.style.fontFamily = 'Verdana,sans-serif';
    this.bttnBack.style.display = 'block';
    this.bttnBack.style.boxSizing = 'border-box';
    this.bttnBack.style.width = (menuW * 2).toString() + 'px';
    this.bttnBack.style.textAlign = 'center';
    this.bttnBack.style.cursor = 'pointer';
    this.bttnBack.style.padding = '0.5em 1em';
    this.bttnBack.style.backgroundColor = '#9c0';

    this.menu = new Kiwi.HUD.Widget.Menu( this.game, this.game.stage.width/2, this.game.stage.height-90 );
    this.menu.addMenuItem( this.bttnDone );
    this.menu.addMenuItem( this.bttnBack );
    this.game.huds.defaultHUD.addWidget( this.menu );
    
    this.menu.getMenuItem(0).input.onDown.add( this.done, this );
    this.menu.getMenuItem(1).input.onDown.add( this.back, this );

    this.addChild(this.background);
    this.addChild(this.textField);

};

loadGameState.update = function(){

    Kiwi.State.prototype.update.call( this );

};
loadGameState.done = function () {

    login();

    
}

loadGameState.back = function () {
    clearMenu(this.menu.container);
    clearMenu(document.getElementById("loginForm"));
    this.game.states.switchState( "mainMenuState" );
}