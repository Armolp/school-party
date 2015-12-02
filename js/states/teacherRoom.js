var teacherRoomState = new Kiwi.State( "teacherRoomState" );

teacherRoomState.create = function() {

    Kiwi.State.prototype.create.call( this );

    this.background = new Kiwi.GameObjects.StaticImage(this, this.textures.classBG, 0, 0 );

    this.board = new Kiwi.GameObjects.StaticImage(this, this.textures.boardImg, 184, 106 );

    this.leftKey    = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.A );
    this.rightKey   = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.D );
    this.downKey    = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.S );
    this.stateKey   = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.W );
    this.sKey       = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.SPACEBAR );

    if(selectState.choice) {
        this.character = new Kiwi.GameObjects.Sprite( this, this.textures.susySprite, 230, 310 );

        this.character.animation.add("idleright",   [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21], 0.1, true );
        this.character.animation.add("idleleft",    [43,42,41,40,39,38,37,36,35,34,33,54,53,52,51,50,49,48,47,46,45,44], 0.1, true );
        this.character.animation.add("moveright",   [22,23,24,25,26,27,28,29], 0.1, true );
        this.character.animation.add("moveleft",    [65,64,63,62,61,60,59,58], 0.1, true );
        this.character.animation.add("crouchright", [30,31,32], 0.1, false );
        this.character.animation.add("crouchleft",  [57,56,55], 0.1, false );
    }
    else {
        this.character = new Kiwi.GameObjects.Sprite( this, this.textures.danielSprite, 230, 310 );

        this.character.animation.add("idleright", [0,0,0,0,0,0,0,0,1,2,3,4,5,6,6,6,5,4,3,2,1], 0.1, true );
        this.character.animation.add("idleleft", [24,24,24,24,24,24,24,24,23,22,21,20,29,28,28,28,29,20,21,22,23], 0.1, true );
        this.character.animation.add("moveright", [7,8,9,10,11,12,13,14], 0.1, true );
        this.character.animation.add("moveleft", [27,26,25,34,33,32,31,30], 0.1, true );
        this.character.animation.add("crouchright", [15,16,17,18], 0.1, false );
        this.character.animation.add("crouchleft", [39,38,37,36], 0.1, false );
    }

    this.character.animation.play( "idleright" );

    //create the text fields
    this.boardText1 = new Kiwi.GameObjects.Textfield(this, 'Hola!');
    this.boardText1.x = 380;
    this.boardText1.y = 180;
    this.boardText1.color = 'rgb(255,226,130)';
    this.boardText1.fontSize = 15;
    //this.boardText1.fontWeight = "bold";
    this.boardText1.fontFamily = 'Verdana, sans-serif';
    this.boardText1.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

    this.boardText2 = new Kiwi.GameObjects.Textfield(this, 'Bienvenido a School Party.');
    this.boardText2.x = 380;
    this.boardText2.y = 200;
    this.boardText2.color = 'rgb(255,226,130)';
    this.boardText2.fontSize = 15;
    //this.boardText2.fontWeight = "bold";
    this.boardText2.fontFamily = 'Verdana, sans-serif';
    this.boardText2.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

    this.boardText3 = new Kiwi.GameObjects.Textfield(this, 'Aqui puedes aprender jugando.');
    this.boardText3.x = 380;
    this.boardText3.y = 220;
    this.boardText3.color = 'rgb(255,226,130)';
    this.boardText3.fontSize = 15;
    //this.boardText3.fontWeight = "bold";
    this.boardText3.fontFamily = 'Verdana, sans-serif';
    this.boardText3.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

    this.boardText4 = new Kiwi.GameObjects.Textfield(this, 'Para ir a los juegos ve a la');
    this.boardText4.x = 380;
    this.boardText4.y = 240;
    this.boardText4.color = 'rgb(255,226,130)';
    this.boardText4.fontSize = 15;
    //this.boardText4.fontWeight = "bold";
    this.boardText4.fontFamily = 'Verdana, sans-serif';
    this.boardText4.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

    this.boardText5 = new Kiwi.GameObjects.Textfield(this, 'derecha cruzando el pasillo.');
    this.boardText5.x = 380;
    this.boardText5.y = 260;
    this.boardText5.color = 'rgb(255,226,130)';
    this.boardText5.fontSize = 15;
    //this.boardText5.fontWeight = "bold";
    this.boardText5.fontFamily = 'Verdana, sans-serif';
    this.boardText5.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

    this.boardText6 = new Kiwi.GameObjects.Textfield(this, 'Presiona la barra espaciadora para continuar');
    this.boardText6.x = 380;
    this.boardText6.y = 350;
    this.boardText6.color = 'rgb(255,226,130)';
    this.boardText6.fontSize = 15;
    //this.boardText6.fontWeight = "bold";
    this.boardText6.fontFamily = 'Verdana, sans-serif';
    this.boardText6.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;



    this.addChild( this.background );
    this.addChild( this.character );
    this.addChild( this.board );
    this.addChild( this.boardText1 );
    this.addChild( this.boardText2 );
    this.addChild( this.boardText3 );
    this.addChild( this.boardText4 );
    this.addChild( this.boardText5 );
    this.addChild( this.boardText6 );
};


teacherRoomState.update = function() {

    Kiwi.State.prototype.update.call( this );

    if ( this.character.transform.x > 720 ) {

        this.game.states.switchState( "hallwayState" );
    }

    if ( this.sKey.isDown ) {
        this.board.visible = false;
        this.boardText1.visible = false;
        this.boardText2.visible = false;
        this.boardText3.visible = false;
        this.boardText4.visible = false;
        this.boardText5.visible = false;
        this.boardText6.visible = false;
    }

    if ( this.downKey.isDown ) {

        if ( this.character.animation.currentAnimation.name !== ("crouch" + this.facing) ) {
            this.character.animation.play( "crouch" + this.facing );
        }
    }
    else if ( this.leftKey.isDown ) {

        this.facing = "left";
        if ( this.character.transform.x > 220 ) {
            this.character.transform.x -= 6;
        }
        if (this.character.animation.currentAnimation.name !== "moveleft") {
            this.character.animation.play( "moveleft" );
        }
    }
    else if ( this.rightKey.isDown ) {

        this.facing = "right";
        if ( this.character.transform.x < 740 ) {
            this.character.transform.x += 6;
        }
        if ( this.character.animation.currentAnimation.name !== "moveright" ) {
            this.character.animation.play("moveright");
        }
    }
    else {
        if ( this.character.animation.currentAnimation.name !== "idle" + this.facing ) {
            this.character.animation.play( "idle" + this.facing );
        }
    }
};