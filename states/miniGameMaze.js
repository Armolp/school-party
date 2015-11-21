var mazeGameState = new Kiwi.State( "mazeGameState" );

mazeGameState.create = function(){

	Kiwi.State.prototype.create.call(this);

    //number of rows in the maze
    this.dimR = 12;
    //number of columns in the maze
	this.dimC = 19;
    //numbers that help position the maze
    this.offsetX = 42;
    this.offsetY = 44;
    //movement state of the character
    this.moving = false;
    //point the character wants to move to 
    this.charX = 0;
    this.charY = 0;

	this.game.stage.color = "4488cc";

    //declare keyboard inputs 
    this.leftKey    = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.A );
    this.rightKey   = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.D );
    this.downKey    = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.S );
    this.upKey      = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.W );

    //declare mouse input
    this.mouse = this.game.input.mouse;

	//this.background = new Kiwi.GameObjects.StaticImage( this, this.textures.backgroundWood, 0, 0 );

    this.cellGroup = new Kiwi.Group( this );

    //create cells for the maze
    for(var i=0; i<this.dimR; i++) {
        for(var j=0; j<this.dimC; j++) {

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

    var rnd, cell;

    //randomly puts 1st goal in the left edge of the maze
    rnd = Math.floor(Math.random()*this.dimR);
    console.log(rnd);
    this.goal1 = new Kiwi.GameObjects.StaticImage( this, this.textures.mazeGoalImg,
            this.offsetX - 36, rnd*36 + this.offsetY);
    cell = this.cellGroup.members[(rnd)*this.dimC];
    cell.walls = cell.walls[0]+cell.walls[1]+"l"+cell.walls[3];
    cell.animation.play(cell.walls);

    //randomly puts 2nd goal in the right edge of the maze
    rnd = Math.floor(Math.random()*this.dimR);
    console.log(rnd);
    this.goal2 = new Kiwi.GameObjects.StaticImage( this, this.textures.mazeGoalImg,
            this.dimC*36 + this.offsetX, rnd*36 + this.offsetY);
    cell = this.cellGroup.members[(rnd + 1)*this.dimC - 1];
    cell.walls = cell.walls[0]+cell.walls[1]+cell.walls[2]+"r";
    cell.animation.play(cell.walls);

    //randomly puts 3rd goal in the bottom edge of the maze
    rnd = Math.floor(Math.random()*this.dimC);
    console.log(rnd);
    this.goal3 = new Kiwi.GameObjects.StaticImage( this, this.textures.mazeGoalImg,
            rnd*36 + this.offsetX, this.dimR*36 + this.offsetY);
    cell = this.cellGroup.members[(this.dimR-1)*this.dimC + rnd];
    cell.walls = cell.walls[0]+"d"+cell.walls[2]+cell.walls[3];
    cell.animation.play(cell.walls);

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

    var cell = this.cellGroup.members[r*this.dimC + c];
    var list = [1];

    while(list.length != 0) {

    	list = [];

    	if(r > 0) {
    		if(this.cellGroup.members[(r-1)*this.dimC + c].walls == "UDLR") {
    			list.push(0);
    		}
    	}
    	if(r < this.dimR - 1) {
    		if(this.cellGroup.members[(r+1)*this.dimC + c].walls == "UDLR") {
    			list.push(1);
    		}
    	}
    	if(c > 0) {
    		if(this.cellGroup.members[r*this.dimC + (c-1)].walls == "UDLR") {
    			list.push(2);
    		}
    	}
    	if(c < this.dimC - 1) {
    		if(this.cellGroup.members[r*this.dimC + (c+1)].walls == "UDLR") {
    			list.push(3);
    		}
    	}

        var rnd = Math.floor(Math.random()*list.length);

    	//console.log("("+r+","+c+");"+list+";"+list[rnd]+";"+ cell.walls);

        if(list[rnd] == 0) {
        	//up
        	//console.log("Moved up from ("+r+","+c+")");
            cell.walls = "u"+cell.walls[1]+cell.walls[2]+cell.walls[3];
        	cell.animation.play(cell.walls);
            cell = this.cellGroup.members[(r-1)*this.dimC + c];
            cell.walls = cell.walls[0]+"d"+cell.walls[2]+cell.walls[3];
            cell.animation.play(cell.walls);
            cell = this.cellGroup.members[r*this.dimC + c];
        	this.mazeGenerator(r-1, c);
        }
        else if(list[rnd] == 1) {
	        //down
        	//console.log("Moved down from ("+r+","+c+")");
	        cell.walls = cell.walls[0]+"d"+cell.walls[2]+cell.walls[3];
        	cell.animation.play(cell.walls);
            cell = this.cellGroup.members[(r+1)*this.dimC + c];
            cell.walls = "u"+cell.walls[1]+cell.walls[2]+cell.walls[3];
            cell.animation.play(cell.walls);
            cell = this.cellGroup.members[r*this.dimC + c];
    	    this.mazeGenerator(r+1, c);
        }
        else if(list[rnd] == 2) {
        	//left
        	//console.log("Moved left from ("+r+","+c+")");
        	cell.walls = cell.walls[0]+cell.walls[1]+"l"+cell.walls[3];
        	cell.animation.play(cell.walls);
            cell = this.cellGroup.members[r*this.dimC + c-1];
            cell.walls = cell.walls[0]+cell.walls[1]+cell.walls[2]+"r";
            cell.animation.play(cell.walls);
            cell = this.cellGroup.members[r*this.dimC + c];
        	this.mazeGenerator(r, c-1);
        }
        else if(list[rnd] == 3) {
	        //right
        	//console.log("Moved right from ("+r+","+c+")");
	        cell.walls = cell.walls[0]+cell.walls[1]+cell.walls[2]+"r";
        	cell.animation.play(cell.walls);
            cell = this.cellGroup.members[r*this.dimC + c+1];
            cell.walls = cell.walls[0]+cell.walls[1]+"l"+cell.walls[3];
            cell.animation.play(cell.walls);
            cell = this.cellGroup.members[r*this.dimC + c];
	        this.mazeGenerator(r, c+1);
        }
    }//end while
}

mazeGameState.update = function(){

	Kiwi.State.prototype.update.call( this );

    
    var s = this.cellGroup.members[Math.floor(this.charY)*this.dimC + Math.floor(this.charX)].walls;

    if(this.moving) {
        if(this.character.x < this.charX*36 + this.offsetX) {
            this.character.x += 4;
        }
        else if(this.character.x > this.charX*36 + this.offsetX) {
            this.character.x -= 4;
        }
        if(this.character.y < this.charY*36 + this.offsetY) {
            this.character.y += 4;
        }
        else if(this.character.y > this.charY*36 + this.offsetY) {
            this.character.y -= 4;
        }
        if(this.character.x == this.charX*36 + this.offsetX && this.character.y == this.charY*36 + this.offsetY) {
            this.moving = false;
        }
    }
    else if( this.upKey.isDown && s[0]=='u' ) {
        this.charY -= 1;
        this.moving = true;
    }
    else if( this.downKey.isDown && s[1]=='d' ) {
        this.charY += 1;
        this.moving = true;
    }
    else if( this.leftKey.isDown && s[2]=='l' ) {
        this.charX -= 1;
        this.moving = true;
    }
    else if( this.rightKey.isDown && s[3]=='r' ) {
        this.charX += 1;
        this.moving = true;
    }

    this.textField.text = "("+Math.floor(this.charX)+","+Math.floor(this.charY)+") "+ s;

    if(this.goal1.box.bounds.contains(this.mouse.x,this.mouse.y)) {
        this.textField.text = "option1";
    }

    if(this.goal2.box.bounds.contains(this.mouse.x,this.mouse.y)) {
        this.textField.text = "option2";
    }

    if(this.goal3.box.bounds.contains(this.mouse.x,this.mouse.y)) {
        this.textField.text = "option3";
    }

};

var mazeCell = function( state, x, y){

    //call the superclass constructor
    Kiwi.GameObjects.Sprite.call( this, state, state.textures.mazeSprite, x, y, false );

    this.walls = "UDLR";

};
//extend the class
Kiwi.extend( mazeCell, Kiwi.GameObjects.Sprite );