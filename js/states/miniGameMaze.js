var mazeGameState = new Kiwi.State( "mazeGameState" );

mazeGameState.create = function(){

	Kiwi.State.prototype.create.call(this);

	//MAZE VARIABLES
    //number of rows in the maze
    this.dimR = 12;
    //number of columns in the maze
	this.dimC = 19;
    //numbers that help position the maze
    this.offsetX = 42;
    this.offsetY = 44;

    //CHARACTER VARIABLES
    //movement state of the character
    this.moving = true;
    //point the character wants to move to 
    this.charX = 9;
    this.charY = 0;
    
    this.ran = Math.floor(Math.random()*4);
    //QUESTION VARIABLES
    //question extracted from parse
    this.question = questions[this.ran].question;
    //answer opctions
    this.opt = [questions[this.ran].a,questions[this.ran].b,questions[this.ran].c];
    //correct answer
    this.ans = questions[this.ran].answer;
    
    //TECNICAL VARIABLES
    //delay variable to extend mesages in the textfield
    this.delay = 0;
    //a history of the failed attempts to answer the question
    this.hty = [];

    //in this minigame tme maximum score you can get is  30 and the minimum is 10
    this.score = 30;

    //stop old music, declare new music and start it
    this.backgroundMusic = new Kiwi.Sound.Audio( this.game, 'mazeTheme', 1, true );
    loadState.backgroundMusic.stop();
    this.backgroundMusic.play();

    //put a background color to the stage
	this.game.stage.color = "a3a949";

    //declare keyboard inputs 
    this.leftKey    = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.A );
    this.rightKey   = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.D );
    this.downKey    = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.S );
    this.upKey      = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.W );
    this.sKey       = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.SPACEBAR );

    //declare mouse input
    this.mouse = this.game.input.mouse;

	//this.background = new Kiwi.GameObjects.StaticImage( this, this.textures.backgroundWood, 0, 0 );

    this.cellGroup = new Kiwi.Group( this );

    //create cells for the maze
    for(var i=0; i<this.dimR; i++) {
        for(var j=0; j<this.dimC; j++) {
            //create a temporary local mazeCell to add to the group
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

            //every cell starts with the four walls up
            temp.animation.play( "UDLR" );

            this.cellGroup.addChild( temp );
        }
    }

    //generate the maze starting from cell 0,0
    this.mazeGenerator(0, 0);

    var rnd, cell;

    //randomly puts 1st goal in the left edge of the maze
    rnd = Math.floor(Math.random()*this.dimR);
    this.goal1 = new Kiwi.GameObjects.StaticImage( this, this.textures.mazeGoalImg,
            this.offsetX - 36, rnd*36 + this.offsetY);
    cell = this.cellGroup.members[(rnd)*this.dimC];
    cell.walls = cell.walls[0]+cell.walls[1]+"l"+cell.walls[3];
    cell.animation.play(cell.walls);

    //randomly puts 2nd goal in the right edge of the maze
    rnd = Math.floor(Math.random()*this.dimR);
    this.goal2 = new Kiwi.GameObjects.StaticImage( this, this.textures.mazeGoalImg,
            this.dimC*36 + this.offsetX, rnd*36 + this.offsetY);
    cell = this.cellGroup.members[(rnd + 1)*this.dimC - 1];
    cell.walls = cell.walls[0]+cell.walls[1]+cell.walls[2]+"r";
    cell.animation.play(cell.walls);

    //randomly puts 3rd goal in the bottom edge of the maze
    rnd = Math.floor(Math.random()*this.dimC);
    this.goal3 = new Kiwi.GameObjects.StaticImage( this, this.textures.mazeGoalImg,
            rnd*36 + this.offsetX, this.dimR*36 + this.offsetY);
    cell = this.cellGroup.members[(this.dimR-1)*this.dimC + rnd];
    cell.walls = cell.walls[0]+"d"+cell.walls[2]+cell.walls[3];
    cell.animation.play(cell.walls);

    this.character = new Kiwi.GameObjects.StaticImage( this, this.textures.mazeCharImg, 
        this.charX*36+this.offsetX, this.charY*36+this.offsetY);

    this.textField = new Kiwi.GameObjects.Textfield(this, this.question);
    this.textField.x = this.game.stage.width / 2;
    this.textField.y = 10;
    this.textField.color = '#FFFFFF';
    this.textField.fontFamily = 'Verdana, sans-serif';
    this.textField.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

    this.scoreP = new Kiwi.GameObjects.Textfield(this, "Puntos: "+this.score);
    this.scoreP.x = this.game.stage.width - 10;
    this.scoreP.y = 10;
    this.scoreP.color = '#FFFFFF';
    this.scoreP.fontFamily = 'Verdana, sans-serif';
    this.scoreP.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_RIGHT;
    
    //CREATE END GAME SUMMARY
    this.scoreUI = new Kiwi.GameObjects.StaticImage(this, this.textures.scoreImg, 184, 106);
    this.scoreUI.alpha = 0.95;
    this.scoreUI.visible = false;

    this.scoreUITextField1 = new Kiwi.GameObjects.Textfield(this, "Puntaje conseguido: ");
    this.scoreUITextField1.x = this.game.stage.width / 2;
    this.scoreUITextField1.y = 210;
    this.scoreUITextField1.fontSize = 15;
    this.scoreUITextField1.fontWeight = "bold";
    this.scoreUITextField1.color = '#FFFFFF';
    this.scoreUITextField1.fontFamily = 'Verdana, sans-serif';
    this.scoreUITextField1.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;
    this.scoreUITextField1.visible = false;

    this.scoreUITextField2 = new Kiwi.GameObjects.Textfield(this, "Monedas conseguidas: 1");
    this.scoreUITextField2.x = this.game.stage.width / 2;
    this.scoreUITextField2.y = 240;
    this.scoreUITextField2.fontSize = 15;
    this.scoreUITextField2.fontWeight = "bold";
    this.scoreUITextField2.color = '#FFFFFF';
    this.scoreUITextField2.fontFamily = 'Verdana, sans-serif';
    this.scoreUITextField2.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;
    this.scoreUITextField2.visible = false;

    this.scoreUITextField3 = new Kiwi.GameObjects.Textfield(this, "Presiona la barra espaciadora para continuar");
    this.scoreUITextField3.x = this.game.stage.width / 2;
    this.scoreUITextField3.y = 350;
    this.scoreUITextField3.fontSize = 15;
    this.scoreUITextField3.fontWeight = "bold";
    this.scoreUITextField3.color = '#FFFFFF';
    this.scoreUITextField3.fontFamily = 'Verdana, sans-serif';
    this.scoreUITextField3.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;
    this.scoreUITextField3.visible = false;

    //this.addChild(this.background);
    this.addChild(this.cellGroup);
    this.addChild(this.goal1);
    this.addChild(this.goal2);
    this.addChild(this.goal3);
    this.addChild(this.character);
    this.addChild(this.textField);
    this.addChild(this.scoreP);
    this.addChild(this.scoreUI);
    this.addChild(this.scoreUITextField1);
    this.addChild(this.scoreUITextField2);
    this.addChild(this.scoreUITextField3);

}

//recursive method that cycles trough the cells until there are no unvisited ones
mazeGameState.mazeGenerator = function(r,c){

    var cell = this.cellGroup.members[r*this.dimC + c];
    var list = [1];

    //cycle until there are no unvisited adjacent cells
    while(list.length != 0) {

    	list = [];

    	//store an integer if an unvisited adjacent cell is found
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

    	//choose a random adjacent cell to continue the algorithm 
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

	if(this.delay > 0) {
		this.delay--;
	}
	else if(this.textField.text != "Correcto") {
		this.textField.text = this.question;
	}

	var s;
    if(0 <= this.charY*this.dimC+this.charX && this.charY*this.dimC+this.charX < this.cellGroup.members.length) {
    	//get the wall informacion for the current cell
    	s = this.cellGroup.members[this.charY*this.dimC+this.charX].walls;
	}
	else {
		s = "UDLR";
	}

	if(this.textField.text == "Correcto") {
		if(this.sKey.isDown) {
            this.backgroundMusic.stop();
            loadState.backgroundMusic.play();
    		this.game.states.switchState( "teacherRoomState" );
		}
	}
    //if it is moving change the position of the character until it reaches the target cell
    else if(this.moving) {
    	//check if there is a difrence in the X axis
        if(this.character.x < this.charX*36 + this.offsetX) {
            this.character.x += 4;
        }
        else if(this.character.x > this.charX*36 + this.offsetX) {
            this.character.x -= 4;
        }
        //check if there is a difrence in the Y axis
        if(this.character.y < this.charY*36 + this.offsetY) {
            this.character.y += 4;
        }
        else if(this.character.y > this.charY*36 + this.offsetY) {
            this.character.y -= 4;
        }
        //check there is no diffrence
        if(this.character.x == this.charX*36 + this.offsetX && this.character.y == this.charY*36 + this.offsetY) {
            this.moving = false;
        }
    }
    //if it is not moving accept inputs
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

    //this.textField.text = "("+Math.floor(this.charX)+","+Math.floor(this.charY)+") "+ s + " " + this.moving;

    //display answers when hovering with the mouse
    if(this.goal1.box.bounds.contains(this.mouse.x,this.mouse.y)) {
        this.textField.text = this.opt[0];
    }
    if(this.goal2.box.bounds.contains(this.mouse.x,this.mouse.y)) {
        this.textField.text = this.opt[1];
    }
    if(this.goal3.box.bounds.contains(this.mouse.x,this.mouse.y)) {
        this.textField.text = this.opt[2];
    }
    
    //character collision with goals
    if(this.goal1.box.bounds.intersects(this.character.box.bounds) && !this.moving) {
    	//if the option matches the answer 
    	if(this.opt[0] == this.ans){
    		this.correct();
    	}
    	//if not move back to the maze
    	else {
    		this.charX += 1;
    		this.wrong(1);
    	}
    }
    if(this.goal2.box.bounds.intersects(this.character.box.bounds) && !this.moving) {
    	//if the option matches the answer
    	if(this.opt[1] == this.ans){
    		this.correct();
    	}
		//if not move back to the maze
    	else {
    		this.charX -= 1;
    		this.wrong(2);
    	}
    }
    if(this.goal3.box.bounds.intersects(this.character.box.bounds) && !this.moving) {
    	//if the option matches the answer
    	if(this.opt[2] == this.ans){
        	this.correct();
    	}
		//if not move back to the maze
    	else {
    		this.charY -= 1;
    		this.wrong(3);
    	}
    }
}

mazeGameState.correct = function() {

    this.textField.text = "Correcto";
    this.scoreUI.visible = true;
    this.scoreUITextField1.text = "Puntaje conseguido: "+this.score;
    this.scoreUITextField1.visible = true;
    this.scoreUITextField2.visible = true;
    this.scoreUITextField3.visible = true;
}

mazeGameState.wrong = function(i) {

	if(this.hty.indexOf(i) < 0) {
		this.score -= 10;
		this.scoreP.text = "Puntos: "+this.score;
		this.hty.push(i);
	}
	this.moving = true;
	this.delay = 100;
	this.textField.text = "Incorrecto";
}

var mazeCell = function( state, x, y){

    //call the superclass constructor
    Kiwi.GameObjects.Sprite.call( this, state, state.textures.mazeSprite, x, y, false );

    this.walls = "UDLR";

};
//extend the class
Kiwi.extend( mazeCell, Kiwi.GameObjects.Sprite );