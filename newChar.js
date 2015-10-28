var newCharState = new Kiwi.State( "newCharState" );

newCharState.create = function(){

	Kiwi.State.prototype.create.call(this);

	this.game.stage.color = "4488cc";

    this.background = new Kiwi.GameObjects.StaticImage(this, this.textures.backgroundWood, 0, 0);
    this.tempChar = new Kiwi.GameObjects.StaticImage(
            this, this.textures.newCharImg, this.game.stage.width/2 - 171, 50);

    var menuW = 100;
    
    //declare a text field
    this.textField = new Kiwi.GameObjects.Textfield(this, 'Temporary new character Header');
    this.textField.x = this.game.stage.width / 2;
    this.textField.y = 10;
    this.textField.color = '#FFFFFF';
    this.textField.fontFamily = 'Helvetica, sans-serif';
    this.textField.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

    // Adds a menu widget to the defaultHUD of the game.
    this.bttnNew = new Kiwi.HUD.Widget.MenuItem( this.game, 'Done', -menuW, 0 );
    this.bttnNew.style.color = 'white';
    this.bttnNew.style.fontFamily = 'Helvetica,sans-serif';
    this.bttnNew.style.display = 'block';
    this.bttnNew.style.boxSizing = 'border-box';
    this.bttnNew.style.width = (menuW * 2).toString() + 'px';
    this.bttnNew.style.textAlign = 'center';
    this.bttnNew.style.cursor = 'pointer';
    this.bttnNew.style.padding = '0.5em 1em';
    this.bttnNew.style.backgroundColor = '#9c0';

    this.menu = new Kiwi.HUD.Widget.Menu( this.game, this.game.stage.width/2, this.game.stage.height-50 );
    this.menu.addMenuItem( this.bttnNew );
    this.game.huds.defaultHUD.addWidget( this.menu );
    
    this.menu.getMenuItem(0).input.onDown.add( this.newButton, this );

    //this.addChild(this.background);
    this.addChild(this.textField);
    this.addChild(this.tempChar);
};

newCharState.update = function(){

    Kiwi.State.prototype.update.call( this );

};

newCharState.newButton = function () {
    clearMenu(this.menu);
    this.game.states.switchState( "mainMenuState" );
}