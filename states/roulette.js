var rouletteState = new Kiwi.State( "rouletteState" );

rouletteState.create = function(){

    Kiwi.State.prototype.create.call(this);

    this.game.stage.color = "4488cc";

    this.background = new Kiwi.GameObjects.StaticImage( this, this.textures.rouletteBGImg, 0, 0);

    //declare a text field
    this.textField = new Kiwi.GameObjects.Textfield(this, 'Roulette Room');
    this.textField.x = this.game.stage.width / 2;
    this.textField.y = 10;
    this.textField.color = '#FFFFFF';
    this.textField.fontFamily = 'Helvetica, sans-serif';
    this.textField.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

    this.ruleta = new Kiwi.GameObjects.StaticImage( this, this.textures.rouletteImg, 184, 46 );

    this.ruleta.rotPointX = this.ruleta.width * 0.5;
    this.ruleta.rotPointY = this.ruleta.height * 0.5;

    var menuW = 100;

    this.bttnSpin = new Kiwi.HUD.Widget.MenuItem( this.game, 'Girar ruleta', -menuW, 340 );
    this.bttnSpin.style.color = 'white';
    this.bttnSpin.style.fontFamily = 'Helvetica,sans-serif';
    this.bttnSpin.style.display = 'block';
    this.bttnSpin.style.boxSizing = 'border-box';
    this.bttnSpin.style.width = (menuW * 2).toString() + 'px';
    this.bttnSpin.style.textAlign = 'center';
    this.bttnSpin.style.cursor = 'pointer';
    this.bttnSpin.style.padding = '0.5em 1em';
    this.bttnSpin.style.backgroundColor = '#9c0';

    this.menu = new Kiwi.HUD.Widget.Menu( this.game, this.game.stage.width/2, 120 );
    this.menu.addMenuItem( this.bttnSpin );
    this.game.huds.defaultHUD.addWidget( this.menu );

    this.menu.getMenuItem(0).input.onDown.add( this.swchSpin, this );

    this.step = 0;
    this.rnd = 1;
    this.bool = false;

    this.addChild(this.background);
    this.addChild(this.textField);
    this.addChild(this.ruleta);
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
    			clearMenu(this.menu);
				this.game.states.switchState( "catchGameState" );
        	}
        	else if(c == 1) {
    			clearMenu(this.menu);
				this.game.states.switchState( "mazeGameState" );
        	}
        	else if(c == 2) {
    			clearMenu(this.menu);
				this.game.states.switchState( "SpaceGameState" );
        	}
        	else if(c == 3) {
    			clearMenu(this.menu);
				this.game.states.switchState( "pairGameState" );
        	}
        	else if(c == 4) {
				this.step = 2*Math.PI;
    			this.rnd = Math.floor(Math.random()*40) + 50;        		
				this.textField.text = this.rnd;
        	}
        	else if(c == 5) {
    			clearMenu(this.menu);
				this.game.states.switchState( "timelineGameState" );
        	}	
        }

    }//end else


};

rouletteState.swchSpin = function () {
	//start moving the roulette and use a random number to choose a minigame
    this.step = 2*Math.PI;
    //this.rnd = Math.floor(Math.random()*40) + 50;
    this.rnd = 22;
    this.textField.text = "Que te tocara esta vez?";
}