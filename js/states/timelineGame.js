var timelineGameState = new Kiwi.State( "timelineGameState" );

timelineGameState.create = function(){

	Kiwi.State.prototype.create.call(this);

    //GAME VARIABLES
    //maximum score 30 and minimum score is 10
    this.score = 30;
    //variable used to track the order of the timeline
    this.counter = 1;
    //delay variable to extend mesages in the textfield
    this.delay = 0;
    //array that stores the history of wrong answers
    this.hty = [];

    //QUESTION DATA
    this.timeline = ["1+1","1+2","2+2","2+3","4+2"];

    //pull woodBGD image
    this.background = new Kiwi.GameObjects.StaticImage( this, this.textures.backgroundWood, 0, 0);

    //declare mouse input
    this.mouse = this.game.input.mouse;

    //declare keyboard inputs
    this.sKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.SPACEBAR );

    //stop old music, declare new music and start it
    this.backgroundMusic = new Kiwi.Sound.Audio( this.game, 'timeTheme', 1, true );
    loadState.backgroundMusic.stop();
    this.backgroundMusic.play();

    //declare a cell group
    this.cellGroup = new Kiwi.Group( this );

    //create cells without overlaping themselves
    for(var i=0; i<5; i++) {

        //variables for the generation of cells
        //x position, y position, cell object, condition bool
        var x,y,c,b=true;

        //cycle until the cell created is not overlaping any other cells
        while(b) {
            b = false;
            x = Math.random()*(this.game.stage.width - 70);
            y = Math.random()*(this.game.stage.height - 170);
            c = new timelineCell(this, x, y, i+1);

            console.log("Trying to create cell "+(i+1)+" in ("+Math.floor(x)+","+Math.floor(y)+")");
            
            //temporal cell array
            var cs = this.cellGroup.members;

            //cycle through the already created cells
            for(var j=0; j<cs.length; j++) {

                //if cell intersects with another cell start again
                if(cs[j].box.bounds.intersects(c.box.bounds)) {
                    b = true;
                    console.log("Cell overlaps cell "+(j+1));
                    break;
                }
            }
        }
        this.cellGroup.addChild( c );
    }

    //create a text field
    this.textField = new Kiwi.GameObjects.Textfield(this, '');
    this.textField.x = this.game.stage.width / 2;
    this.textField.y = 10;
    this.textField.color = '#FFFFFF';
    this.textField.fontFamily = 'Verdana, sans-serif';
    this.textField.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

    //declare a text field to display thescore
    this.scoreP = new Kiwi.GameObjects.Textfield(this, 'Puntuacion: '+this.score);
    this.scoreP.x = this.game.stage.width - 10;
    this.scoreP.y = 10;
    this.scoreP.color = '#FFFFFF';
    this.scoreP.fontFamily = 'Verdana, sans-serif';
    this.scoreP.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_RIGHT;

    //CREATE END GAME SUMMARY
    this.scoreUI = new Kiwi.GameObjects.StaticImage(this, this.textures.scoreImg, 184, 76);
    this.scoreUI.alpha = 0.95;
    this.scoreUI.visible = false;

    this.scoreUITextField1 = new Kiwi.GameObjects.Textfield(this, "Puntaje conseguido: ");
    this.scoreUITextField1.x = this.game.stage.width / 2;
    this.scoreUITextField1.y = 180;
    this.scoreUITextField1.fontSize = 15;
    this.scoreUITextField1.fontWeight = "bold";
    this.scoreUITextField1.color = '#FFFFFF';
    this.scoreUITextField1.fontFamily = 'Verdana, sans-serif';
    this.scoreUITextField1.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;
    this.scoreUITextField1.visible = false;

    this.scoreUITextField2 = new Kiwi.GameObjects.Textfield(this, "Monedas conseguidas: 1");
    this.scoreUITextField2.x = this.game.stage.width / 2;
    this.scoreUITextField2.y = 210;
    this.scoreUITextField2.fontSize = 15;
    this.scoreUITextField2.fontWeight = "bold";
    this.scoreUITextField2.color = '#FFFFFF';
    this.scoreUITextField2.fontFamily = 'Verdana, sans-serif';
    this.scoreUITextField2.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;
    this.scoreUITextField2.visible = false;

    this.scoreUITextField3 = new Kiwi.GameObjects.Textfield(this, "Presiona la barra espaciadora para continuar");
    this.scoreUITextField3.x = this.game.stage.width / 2;
    this.scoreUITextField3.y = 320;
    this.scoreUITextField3.fontSize = 15;
    this.scoreUITextField3.fontWeight = "bold";
    this.scoreUITextField3.color = '#FFFFFF';
    this.scoreUITextField3.fontFamily = 'Verdana, sans-serif';
    this.scoreUITextField3.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;
    this.scoreUITextField3.visible = false;

    this.addChild(this.background);
    this.addChild(this.cellGroup);
    this.addChild(this.textField);
    this.addChild(this.scoreP);
    this.addChild(this.scoreUI);
    this.addChild(this.scoreUITextField1);
    this.addChild(this.scoreUITextField2);
    this.addChild(this.scoreUITextField3);
};

timelineGameState.update = function(){

	Kiwi.State.prototype.update.call( this );

    if(this.counter == 6) {
        //make the final window visible
        this.scoreUI.visible = true;
        this.scoreUITextField1.text = "Puntaje conseguido: "+this.score;
        this.scoreUITextField1.visible = true;
        this.scoreUITextField2.visible = true;
        this.scoreUITextField3.visible = true;

        if(this.sKey.isDown) {
            this.backgroundMusic.stop();
            loadState.backgroundMusic.play();
            this.game.states.switchState( "teacherRoomState" );
        }
    }
    else {

        //temporal cell array
        var cells = this.cellGroup.members;

        //cycle through cells to check click
        for(var i=this.counter-1; i<5; i++) {

            //if mouse is hovering over cell
            if(cells[i].box.bounds.contains(this.game.input.x,this.game.input.y)){

                //update text field
                if(this.delay > 0){
                    this.delay--;
                }
                else {
                    this.textField.text = this.timeline[cells[i].number-1];
                }

                //if clicked
                if(this.mouse.isDown) {

                    //if the cell clicked is the next in the timeline
                    if(cells[i].number == this.counter) {
                        //update the position of the cell
                        cells[i].x = this.game.stage.width/5 * i + 30;
                        cells[i].y = this.game.stage.height - 90;
                        this.counter++;
                        this.hty = [];
                    }
                    else {
                        if(this.hty.indexOf(i) < 0) {
                            this.score -= 2;
                            this.scoreP.text = "Puntos: "+this.score;
                            this.hty.push(i);
                        }
                        this.textField.text = "Equivocado!";
                        this.delay = 30;
                    }
                }//end if clicked
            }//end if mouse is hovering
        }//end for
    }//end if

}

var timelineCell = function( state, x, y, number){

    //call the superclass constructor
    Kiwi.GameObjects.Sprite.call( this, state, state.textures.squareImg, x, y, false );

    this.number = number;
};
//extend the class
Kiwi.extend( timelineCell, Kiwi.GameObjects.Sprite );