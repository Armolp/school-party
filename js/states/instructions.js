var instructionsState = new Kiwi.State( "instructionsState" );

instructionsState.create = function(){

	Kiwi.State.prototype.create.call(this);

	this.game.stage.color = "4488cc";

    this.background = new Kiwi.GameObjects.StaticImage(this, this.textures.instructionsBG, 0, 0);

    var menuW = 100;
    
    //declare a text field
    this.textField = new Kiwi.GameObjects.Textfield(this, 'Instrucciones de uso');
    this.textField.x = this.game.stage.width / 2;
    this.textField.y = 10;
    this.textField.color = '#FFFFFF';
    this.textField.fontFamily = 'Verdana, sans-serif';
    this.textField.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

    // Adds a menu widget to the defaultHUD of the game.
    this.bttnBack = new Kiwi.HUD.Widget.MenuItem( this.game, 'Regresar', -menuW, -30 );
    this.bttnBack.style.color = 'rgb(255,226,130)';
    this.bttnBack.style.fontFamily = 'Verdana,sans-serif';
    this.bttnBack.style.display = 'block';
    this.bttnBack.style.boxSizing = 'border-box';
    this.bttnBack.style.width = (menuW * 2).toString() + 'px';
    this.bttnBack.style.textAlign = 'center';
    this.bttnBack.style.cursor = 'pointer';
    this.bttnBack.style.padding = '0.5em 1em';
    this.bttnBack.style.backgroundColor = 'transparent';
    this.bttnBack.style.border = "solid 2px rgb(255,226,130)";

    this.menu = new Kiwi.HUD.Widget.Menu( this.game, this.game.stage.width/2, this.game.stage.height-50 );
    this.menu.addMenuItem( this.bttnBack );
    this.game.huds.defaultHUD.addWidget( this.menu );
    
    this.menu.getMenuItem(0).input.onDown.add( this.back, this );

    this.addChild(this.background);
    //this.addChild(this.textField);
};

instructionsState.update = function(){

    Kiwi.State.prototype.update.call( this );

};

instructionsState.back = function () {
    clearMenu(this.menu.container);
    this.game.states.switchState( "mainMenuState" );
}