var creditsState = new Kiwi.State( "creditsState" );

creditsState.create = function(){

	Kiwi.State.prototype.create.call(this);

	this.game.stage.color = "4488cc";

    this.background = new Kiwi.GameObjects.StaticImage(this, this.textures.backgroundWood, 0, 0);
    /*this.credits = new Kiwi.GameObjects.StaticImage(this, this.textures.creditsImg, 
            this.game.stage.width/2 - this.textures.creditsImg.width/2,
            this.game.stage.height/2 - this.textures.creditsImg.height/2);*/

    var menuW = 100;
    
    //declare a text field
    this.textField = new Kiwi.GameObjects.Textfield(this, 'Creditos');
    this.textField.x = this.game.stage.width / 2;
    this.textField.y = 10;
    this.textField.color = '#FFFFFF';
    this.textField.fontFamily = 'Verdana, sans-serif';
    this.textField.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;
  
    // Adds a menu widget to the defaultHUD of the game.
    this.bttnBack = new Kiwi.HUD.Widget.MenuItem( this.game, 'Regresar', -menuW, 0);
    this.bttnBack.style.color = 'white';
    this.bttnBack.style.fontFamily = 'Verdana,sans-serif';
    this.bttnBack.style.display = 'block';
    this.bttnBack.style.boxSizing = 'border-box';
    this.bttnBack.style.width = (menuW * 2).toString() + 'px';
    this.bttnBack.style.textAlign = 'center';
    this.bttnBack.style.cursor = 'pointer';
    this.bttnBack.style.padding = '0.5em 1em';
    this.bttnBack.style.backgroundColor = '#9c0';

    this.menu = new Kiwi.HUD.Widget.Menu( this.game, this.game.stage.width/2, this.game.stage.height-50 );
    this.menu.addMenuItem( this.bttnBack );
    this.game.huds.defaultHUD.addWidget( this.menu );

    this.menu.getMenuItem(0).input.onDown.add( this.back, this );

    this.credits1 = new Kiwi.GameObjects.Textfield(this, 'Programadores: ');
    this.credits1.x = this.game.stage.width / 2;
    this.credits1.y = 70;
    this.credits1.color = '#FFFFFF';
    this.credits1.fontFamily = 'Verdana, sans-serif';
    this.credits1.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

    this.credits2 = new Kiwi.GameObjects.Textfield(this, 'Regina Gallardo Mariscal');
    this.credits2.x = this.game.stage.width / 2;
    this.credits2.y = 100;
    this.credits2.color = '#FFFFFF';
    this.credits2.fontFamily = 'Verdana, sans-serif';
    this.credits2.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

    this.credits3 = new Kiwi.GameObjects.Textfield(this, 'Arturo Moran Cardenas');
    this.credits3.x = this.game.stage.width / 2;
    this.credits3.y = 130;
    this.credits3.color = '#FFFFFF';
    this.credits3.fontFamily = 'Verdana, sans-serif';
    this.credits3.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

    this.credits4 = new Kiwi.GameObjects.Textfield(this, 'Diego Ponce Garcia');
    this.credits4.x = this.game.stage.width / 2;
    this.credits4.y = 160;
    this.credits4.color = '#FFFFFF';
    this.credits4.fontFamily = 'Verdana, sans-serif';
    this.credits4.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

    this.credits5 = new Kiwi.GameObjects.Textfield(this, 'Diego Cantu');
    this.credits5.x = this.game.stage.width / 2;
    this.credits5.y = 190;
    this.credits5.color = '#FFFFFF';
    this.credits5.fontFamily = 'Verdana, sans-serif';
    this.credits5.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

    this.credits6 = new Kiwi.GameObjects.Textfield(this, 'Music By Kevin MacLeod (incompetech.com) ');
    this.credits6.x = this.game.stage.width / 2;
    this.credits6.y = 310;
    this.credits6.color = '#FFFFFF';
    this.credits6.fontFamily = 'Verdana, sans-serif';
    this.credits6.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

    this.credits7 = new Kiwi.GameObjects.Textfield(this, 'Licensed under Creative Commons: By Attribution 3.0');
    this.credits7.x = this.game.stage.width / 2;
    this.credits7.y = 340;
    this.credits7.color = '#FFFFFF';
    this.credits7.fontFamily = 'Verdana, sans-serif';
    this.credits7.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

    this.credits8 = new Kiwi.GameObjects.Textfield(this, 'http://creativecommons.org/licenses/by/3.0/');
    this.credits8.x = this.game.stage.width / 2;
    this.credits8.y = 370;
    this.credits8.color = '#FFFFFF';
    this.credits8.fontFamily = 'Verdana, sans-serif';
    this.credits8.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;


    



    //this.addChild(this.background);
    //this.addChild(this.credits);
    this.addChild(this.credits1);
    this.addChild(this.credits2);
    this.addChild(this.credits3);
    this.addChild(this.credits4);
    this.addChild(this.credits5);
    this.addChild(this.credits6);
    this.addChild(this.credits7);
    this.addChild(this.credits8);


    this.addChild(this.textField);
};

creditsState.update = function(){

    Kiwi.State.prototype.update.call( this );

};

creditsState.back = function () {
    clearMenu(this.menu.container);
    this.game.states.switchState( "mainMenuState" );
}