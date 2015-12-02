var rouletteState = new Kiwi.State( "rouletteState" );

rouletteState.create = function(){

    Kiwi.State.prototype.create.call(this);

    this.game.stage.color = "4488cc";

    this.background = new Kiwi.GameObjects.StaticImage( this, this.textures.BG1, 0, 0);

    //declare a text field
    this.textField = new Kiwi.GameObjects.Textfield(this, 'Roulette Room');
    this.textField.x = this.game.stage.width / 2;
    this.textField.y = 10;
    this.textField.color = '#FFFFFF';
    this.textField.fontFamily = 'Verdana, sans-serif';
    this.textField.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

    this.ruleta = new Kiwi.GameObjects.StaticImage( this, this.textures.rouletteImg, 94, 36 );

    this.pointer = new Kiwi.GameObjects.StaticImage( this, this.textures.pointerImg, 490, 220 );

    this.ruleta.rotPointX = this.ruleta.width * 0.5;
    this.ruleta.rotPointY = this.ruleta.height * 0.5;

    var menuW = 100;

    this.bttnSpin = new Kiwi.HUD.Widget.MenuItem( this.game, 'Girar ruleta', -menuW, 0 );
    this.bttnSpin.style.color = 'white';
    this.bttnSpin.style.fontFamily = 'Verdana,sans-serif';
    this.bttnSpin.style.display = 'block';
    this.bttnSpin.style.boxSizing = 'border-box';
    this.bttnSpin.style.width = (menuW * 2).toString() + 'px';
    this.bttnSpin.style.textAlign = 'center';
    this.bttnSpin.style.cursor = 'pointer';
    this.bttnSpin.style.padding = '0.5em 1em';
    this.bttnSpin.style.backgroundColor = '#9c0';

    this.bttnBack = new Kiwi.HUD.Widget.MenuItem( this.game, 'Regresar', -menuW*6-20, 0 );
    this.bttnBack.style.color = 'white';
    this.bttnBack.style.fontFamily = 'Verdana,sans-serif';
    this.bttnBack.style.display = 'block';
    this.bttnBack.style.boxSizing = 'border-box';
    this.bttnBack.style.width = (menuW * 2).toString() + 'px';
    this.bttnBack.style.textAlign = 'center';
    this.bttnBack.style.cursor = 'pointer';
    this.bttnBack.style.padding = '0.5em 1em';
    this.bttnBack.style.backgroundColor = '#9c0';

    this.menu = new Kiwi.HUD.Widget.Menu( this.game, 640, 460 );
    this.menu.addMenuItem( this.bttnSpin );
    this.menu.addMenuItem( this.bttnBack );
    this.game.huds.defaultHUD.addWidget( this.menu );

    this.menu.getMenuItem(0).input.onDown.add( this.swchSpin, this );
    this.menu.getMenuItem(1).input.onDown.add( this.swchBack, this );

    this.step = 0;
    this.rnd = 1;
    this.bool = false;

    this.addChild(this.background);
    //this.addChild(this.textField);
    this.addChild(this.ruleta);
    this.addChild(this.pointer);
};

rouletteState.update = function(){

    Kiwi.State.prototype.update.call( this );
    
    if(this.step > 0) {
    	//increase rotation in a senoidal increment
        this.ruleta.rotation += 0.1*Math.sin(this.step - Math.PI/2) + 0.1;

        //if this.step =~ Math.PI (Highest value) spend a random number of frames to create a random roulette choice
        if(Math.PI - 0.1 < this.step && this.step < Math.PI + 0.1 && this.rnd > 0) {
            this.rnd--;
        }
        else {
            this.step -= 0.1;
        }
    }
    else {
		
    	//if its the first time rnd equals 0 then calculate the roulette choice
        if(this.rnd == 0) {
        	//switch rnd value to 1 to prevent this from happening every tic
	    	this.rnd = 1;

        	//calculate a value from 0 to 5 from the angle of rotation of the image
        	var c = Math.floor(this.ruleta.rotation%(2*Math.PI) % 6);

        	this.textField.text = c;

        	//switch to the game state in each case
        	if(c == 0) {
    			clearMenu(this.menu.container);
				this.game.states.switchState( "catchTutorialState" );
        	}
        	else if(c == 1) {
    			clearMenu(this.menu.container);
				this.game.states.switchState( "mazeTutorialState" );
        	}
        	else if(c == 2) {
    			clearMenu(this.menu.container);
				this.game.states.switchState( "spaceTutorialState" );
        	}
        	else if(c == 3) {
    			//clearMenu(this.menu.container);
				this.game.states.switchState( "memoryTutorialState" );
        	}
        	else if(c == 4) {
				this.step = 2*Math.PI;
    			this.rnd = Math.floor(Math.random()*40) + 50;        		
				//this.textField.text = this.rnd;
        	}
        	else if(c == 5) {
    			clearMenu(this.menu.container);
				this.game.states.switchState( "timelineTutorialState" );
        	}	
        }

    }//end else


};

rouletteState.swchSpin = function () {
	//start moving the roulette and use a random number to choose a minigame
    this.step = 2*Math.PI;
    this.rnd = Math.floor(Math.random()*40) + 50;
    //this.rnd = 22;
    this.textField.text = "Que te tocara esta vez?";
}

rouletteState.swchBack = function() {
    clearMenu(this.menu.container);
    this.game.states.switchState( "hallwayState" );
}