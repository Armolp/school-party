var mazeGameState = new Kiwi.State( "mazeGameState" );

mazeGameState.create = function(){

	Kiwi.State.prototype.create.call(this);

	this.dimension = 12;
    this.offsetX = 168;
    this.offsetY = 60;

	this.game.stage.color = "4488cc";

    this.leftKey    = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.A );
    this.rightKey   = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.D );
    this.downKey    = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.S );
    this.upKey      = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.W );

	//this.background = new Kiwi.GameObjects.StaticImage( this, this.textures.backgroundWood, 0, 0 );

    this.cellGroup = new Kiwi.Group( this );

    for(var i=0; i<this.dimension; i++) {
        for(var j=0; j<this.dimension; j++) {

            var temp = new mazeCell( this, (j*36 + this.offsetX), (i*36 + this.offsetY));
            
            temp.animation.add("UDLR", [ 0 ], 0.1, false );
            
            temp.animation.add("uDLR", [ 1 ], 0.1, false );
            temp.animation.add("UDLr", [ 2 ], 0.1, false );
            temp.animation.add("UdLR", [ 3 ], 0.1, false );
            temp.animation.add("UDlR", [ 4 ], 0.1, false );

            temp.animation.add("uDLr", [ 5 ], 0.1, false );
            temp.animation.add("uDlR", [ 6 ], 0.1, false );
            temp.animation.add("UdLr", [ 7 ], 0.1, false );
            temp.animation.add("UdlR", [ 8 ], 0.1, false );
            temp.animation.add("udLR", [ 9 ], 0.1, false );
            temp.animation.add("UDlr", [ 10 ], 0.1, false );

            temp.animation.add("udLr", [ 11 ], 0.1, false );
            temp.animation.add("udlR", [ 12 ], 0.1, false );
            temp.animation.add("Udlr", [ 13 ], 0.1, false );
            temp.animation.add("uDlr", [ 14 ], 0.1, false );

            temp.animation.add("udlr", [ 15 ], 0.1, false );

            /*var s = ((Math.floor(Math.random()*2))?("u"):("U")) +
                    ((Math.floor(Math.random()*2))?("d"):("D")) +
                    ((Math.floor(Math.random()*2))?("l"):("L")) +
                    ((Math.floor(Math.random()*2))?("r"):("R"));*/

            temp.animation.play( "UDLR" );

            //console.log(s+","+temp.animation.currentAnimation.name);

            this.cellGroup.addChild( temp );
        }
    }

    this.mazeGenerator(0, 0);

    
    this.goal1 = new Kiwi.GameObjects.StaticImage( this, this.textures.mazeGoalImg,
            Math.floor(Math.random()*this.dimension/2 + this.dimension/2)*36+this.offsetX,
            Math.floor(Math.random()*this.dimension/2)*36+this.offsetY);

    this.goal2 = new Kiwi.GameObjects.StaticImage( this, this.textures.mazeGoalImg,
            Math.floor(Math.random()*this.dimension/2)*36+this.offsetX,
            Math.floor(Math.random()*this.dimension/2 + this.dimension/2)*36+this.offsetY);

    this.goal3 = new Kiwi.GameObjects.StaticImage( this, this.textures.mazeGoalImg,
            Math.floor(Math.random()*this.dimension/2 + this.dimension/2)*36+this.offsetX,
            Math.floor(Math.random()*this.dimension/2 + this.dimension/2)*36+this.offsetY);

    this.charX = 0;
    this.charY = 0;
    this.character = new Kiwi.GameObjects.StaticImage( this, this.textures.mazeCharImg, this.offsetX, this.offsetY);

    this.textField = new Kiwi.GameObjects.Textfield(this, '');
    this.textField.x = this.game.stage.width / 2;
    this.textField.y = 10;
    this.textField.color = '#FFFFFF';
    this.textField.fontFamily = 'Helvetica, sans-serif';
    this.textField.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

    //this.addChild(this.background);
    this.addChild(this.cellGroup);
    this.addChild(this.goal1);
    this.addChild(this.goal2);
    this.addChild(this.goal3);
    this.addChild(this.character);
    this.addChild(this.textField);

    console.log("Game Start");

};

mazeGameState.mazeGenerator = function(r,c){
	//console.log("Entered new cell");
    var cell = this.cellGroup.members[r*this.dimension + c];
    var list = [1];

    while(list.length != 0) {

    	list = [];

    	if(r > 0) {
    		if(this.cellGroup.members[(r-1)*this.dimension + c].walls == "UDLR") {
    			list.push(0);
    		}
    	}
    	if(r < this.dimension - 1) {
    		if(this.cellGroup.members[(r+1)*this.dimension + c].walls == "UDLR") {
    			list.push(1);
    		}
    	}
    	if(c > 0) {
    		if(this.cellGroup.members[r*this.dimension + (c-1)].walls == "UDLR") {
    			list.push(2);
    		}
    	}
    	if(c < this.dimension - 1) {
    		if(this.cellGroup.members[r*this.dimension + (c+1)].walls == "UDLR") {
    			list.push(3);
    		}
    	}

        var rnd = Math.floor(Math.random()*list.length);

    	console.log("("+r+","+c+");"+list+";"+list[rnd]+";"+ cell.walls);

        if(list[rnd] == 0) {
        	//up
        	//console.log("Moved up from ("+r+","+c+")");
            cell.walls = "u"+cell.walls[1]+cell.walls[2]+cell.walls[3];
        	cell.animation.play(cell.walls);
            cell = this.cellGroup.members[(r-1)*this.dimension + c];
            cell.walls = cell.walls[0]+"d"+cell.walls[2]+cell.walls[3];
            cell.animation.play(cell.walls);
            cell = this.cellGroup.members[r*this.dimension + c];
        	this.mazeGenerator(r-1, c);
        }
        else if(list[rnd] == 1) {
	        //down
        	//console.log("Moved down from ("+r+","+c+")");
	        cell.walls = cell.walls[0]+"d"+cell.walls[2]+cell.walls[3];
        	cell.animation.play(cell.walls);
            cell = this.cellGroup.members[(r+1)*this.dimension + c];
            cell.walls = "u"+cell.walls[1]+cell.walls[2]+cell.walls[3];
            cell.animation.play(cell.walls);
            cell = this.cellGroup.members[r*this.dimension + c];
    	    this.mazeGenerator(r+1, c);
        }
        else if(list[rnd] == 2) {
        	//left
        	//console.log("Moved left from ("+r+","+c+")");
        	cell.walls = cell.walls[0]+cell.walls[1]+"l"+cell.walls[3];
        	cell.animation.play(cell.walls);
            cell = this.cellGroup.members[r*this.dimension + c-1];
            cell.walls = cell.walls[0]+cell.walls[1]+cell.walls[2]+"r";
            cell.animation.play(cell.walls);
            cell = this.cellGroup.members[r*this.dimension + c];
        	this.mazeGenerator(r, c-1);
        }
        else if(list[rnd] == 3) {
	        //right
        	//console.log("Moved right from ("+r+","+c+")");
	        cell.walls = cell.walls[0]+cell.walls[1]+cell.walls[2]+"r";
        	cell.animation.play(cell.walls);
            cell = this.cellGroup.members[r*this.dimension + c+1];
            cell.walls = cell.walls[0]+cell.walls[1]+"l"+cell.walls[3];
            cell.animation.play(cell.walls);
            cell = this.cellGroup.members[r*this.dimension + c];
	        this.mazeGenerator(r, c+1);
        }
    }//end while
}

mazeGameState.update = function(){

	Kiwi.State.prototype.update.call( this );

    var s = this.cellGroup.members[Math.floor(this.charY)*this.dimension + Math.floor(this.charX)].walls;

    if( this.upKey.isDown && s[0]=='u' ) {
        this.charY -= .1;
    }
    else if( this.downKey.isDown && s[1]=='d' ) {
        this.charY += .1;
    }
    else if( this.leftKey.isDown && s[2]=='l' ) {
        this.charX -= .1;
    }
    else if( this.rightKey.isDown && s[3]=='r' ) {
        this.charX += .1;
    }

    this.character.transform.x = this.charX*36 + this.offsetX;
    this.character.transform.y = this.charY*36 + this.offsetY;

    this.textField.text = "("+Math.floor(this.charX)+","+Math.floor(this.charY)+") "+ s;

};

var mazeCell = function( state, x, y){

    //call the superclass constructor
    Kiwi.GameObjects.Sprite.call( this, state, state.textures.mazeSprite, x, y, false );

    this.walls = "UDLR";

};
//extend the class
Kiwi.extend( mazeCell, Kiwi.GameObjects.Sprite );