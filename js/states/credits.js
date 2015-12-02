var creditsState = new Kiwi.State( "creditsState" );

creditsState.create = function(){

	Kiwi.State.prototype.create.call(this);

	this.game.stage.color = "4488cc";

    this.background = new Kiwi.GameObjects.StaticImage(this, this.textures.BG1, 0, 0);

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

    this.credits1 = new Kiwi.GameObjects.Textfield(this, 'Desarrolladores: ');
    this.credits1.x = this.game.stage.width / 2;
    this.credits1.y = 70;
    this.credits1.fontSize = 22;
    this.credits1.color = '#FFFFFF';
    this.credits1.fontFamily = 'Verdana, sans-serif';
    this.credits1.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

    this.credits2 = new Kiwi.GameObjects.Textfield(this, 'Regina Gallardo Mariscal');
    this.credits2.x = this.game.stage.width / 2;
    this.credits2.y = 100;
    this.credits2.fontSize = 20;
    this.credits2.color = '#FFFFFF';
    this.credits2.fontFamily = 'Verdana, sans-serif';
    this.credits2.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

    this.credits3 = new Kiwi.GameObjects.Textfield(this, 'Arturo Moran Cardenas');
    this.credits3.x = this.game.stage.width / 2;
    this.credits3.y = 130;
    this.credits3.fontSize = 20;
    this.credits3.color = '#FFFFFF';
    this.credits3.fontFamily = 'Verdana, sans-serif';
    this.credits3.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

    this.credits4 = new Kiwi.GameObjects.Textfield(this, 'Diego Ponce Garcia');
    this.credits4.x = this.game.stage.width / 2;
    this.credits4.y = 160;
    this.credits4.fontSize = 20;
    this.credits4.color = '#FFFFFF';
    this.credits4.fontFamily = 'Verdana, sans-serif';
    this.credits4.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

    this.credits5 = new Kiwi.GameObjects.Textfield(this, 'Diego Cantu');
    this.credits5.x = this.game.stage.width / 2;
    this.credits5.y = 190;
    this.credits5.fontSize = 20;
    this.credits5.color = '#FFFFFF';
    this.credits5.fontFamily = 'Verdana, sans-serif';
    this.credits5.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

    //music credits

    this.credits6 = new Kiwi.GameObjects.Textfield(this, 'Enchanted Valley By Kevin MacLeod (incompetech.com) ');
    this.credits6.x = this.game.stage.width / 2;
    this.credits6.y = 310;
    this.credits6.fontSize = 12;
    this.credits6.color = '#FFFFFF';
    this.credits6.fontFamily = 'Verdana, sans-serif';
    this.credits6.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

    this.credits7 = new Kiwi.GameObjects.Textfield(this, 'Kawai Kitsune By Kevin MacLeod (incompetech.com)');
    this.credits7.x = this.game.stage.width / 2;
    this.credits7.y = 325;
    this.credits7.fontSize = 12;
    this.credits7.color = '#FFFFFF';
    this.credits7.fontFamily = 'Verdana, sans-serif';
    this.credits7.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

    this.credits8 = new Kiwi.GameObjects.Textfield(this, 'Kings of Tara By Kevin MacLeod (incompetech.com) ');
    this.credits8.x = this.game.stage.width / 2;
    this.credits8.y = 340;
    this.credits8.fontSize = 12;
    this.credits8.color = '#FFFFFF';
    this.credits8.fontFamily = 'Verdana, sans-serif';
    this.credits8.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

    this.credits9 = new Kiwi.GameObjects.Textfield(this, 'Pamgaea By Kevin MacLeod (incompetech.com) ');
    this.credits9.x = this.game.stage.width / 2;
    this.credits9.y = 355;
    this.credits9.fontSize = 12;
    this.credits9.color = '#FFFFFF';
    this.credits9.fontFamily = 'Verdana, sans-serif';
    this.credits9.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

    this.credits10 = new Kiwi.GameObjects.Textfield(this, 'Pixelland By Kevin MacLeod (incompetech.com)' );
    this.credits10.x = this.game.stage.width / 2;
    this.credits10.y = 370;
    this.credits10.fontSize = 12;
    this.credits10.color = '#FFFFFF';
    this.credits10.fontFamily = 'Verdana, sans-serif';
    this.credits10.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

    this.credits11 = new Kiwi.GameObjects.Textfield(this, 'Video Dungeon Boss By Kevin MacLeod (incompetech.com) ');
    this.credits11.x = this.game.stage.width / 2;
    this.credits11.y = 385;
    this.credits11.fontSize = 12;
    this.credits11.color = '#FFFFFF';
    this.credits11.fontFamily = 'Verdana, sans-serif';
    this.credits11.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

    this.credits12 = new Kiwi.GameObjects.Textfield(this, 'Licensed under Creative Commons: By Attribution 3.0');
    this.credits12.x = this.game.stage.width / 2;
    this.credits12.y = 400;
    this.credits12.fontSize = 12;
    this.credits12.color = '#FFFFFF';
    this.credits12.fontFamily = 'Verdana, sans-serif';
    this.credits12.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

    this.credits13 = new Kiwi.GameObjects.Textfield(this, 'http://creativecommons.org/licenses/by/3.0/');
    this.credits13.x = this.game.stage.width / 2;
    this.credits13.y = 415;
    this.credits13.fontSize = 12;
    this.credits13.color = '#FFFFFF';
    this.credits13.fontFamily = 'Verdana, sans-serif';
    this.credits13.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

    



    this.addChild(this.background);

    this.addChild(this.credits1);
    this.addChild(this.credits2);
    this.addChild(this.credits3);
    this.addChild(this.credits4);
    this.addChild(this.credits5);

    this.addChild(this.credits6);
    this.addChild(this.credits7);
    this.addChild(this.credits8);
    this.addChild(this.credits9);
    this.addChild(this.credits10);
    this.addChild(this.credits11);
    this.addChild(this.credits12);
    this.addChild(this.credits13);


    this.addChild(this.textField);
};

creditsState.update = function(){

    Kiwi.State.prototype.update.call( this );

};

creditsState.back = function () {
    clearMenu(this.menu.container);
    this.game.states.switchState( "mainMenuState" );
}