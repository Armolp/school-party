var teacherRoomState = new Kiwi.State( "teacherRoomState" );

teacherRoomState.create = function() {

    Kiwi.State.prototype.create.call( this );

    this.background = new Kiwi.GameObjects.StaticImage(this, this.textures.teacherRoomImg, 0, 0 );

    this.leftKey    = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.A );
    this.rightKey   = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.D );
    this.downKey    = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.S );
    this.stateKey   = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.W );

    if(selectState.choice) {
        this.character = new Kiwi.GameObjects.Sprite( this, this.textures.susySprite, 230, 250 );

        this.character.animation.add("idleright", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21], 0.1, true );
        this.character.animation.add("idleleft", [43,42,41,40,39,38,37,36,35,34,33,54,53,52,51,50,49,48,47,46,45,44], 0.1, true );
        this.character.animation.add("moveright", [22,23,24,25,26,27,28,29], 0.1, true );
        this.character.animation.add("moveleft", [65,64,63,62,61,60,59,58], 0.1, true );
        this.character.animation.add("crouchright", [30,31,32], 0.1, false );
        this.character.animation.add("crouchleft", [57,56,55], 0.1, false );
    }
    else {
        this.character = new Kiwi.GameObjects.Sprite( this, this.textures.danielSprite, 230, 250 );

        this.character.animation.add("idleright", [0,0,0,0,0,0,0,0,1,2,3,4,5,6,6,6,5,4,3,2,1], 0.1, true );
        this.character.animation.add("idleleft", [24,24,24,24,24,24,24,24,23,22,21,20,29,28,28,28,29,20,21,22,23], 0.1, true );
        this.character.animation.add("moveright", [7,8,9,10,11,12,13,14], 0.1, true );
        this.character.animation.add("moveleft", [27,26,25,34,33,32,31,30], 0.1, true );
        this.character.animation.add("crouchright", [15,16,17,18], 0.1, false );
        this.character.animation.add("crouchleft", [39,38,37,36], 0.1, false );
    }

    this.character.animation.play( "idleright" );

    this.addChild( this.background );
    this.addChild( this.character );
};


teacherRoomState.update = function() {

    Kiwi.State.prototype.update.call( this );

    if ( this.character.transform.x > 720 ) {

        this.game.states.switchState( "hallwayState" );
    }

    if ( this.downKey.isDown ) {

        if ( this.character.animation.currentAnimation.name !== ("crouch" + this.facing) ) {
            this.character.animation.play( "crouch" + this.facing );
        }
    }
    else if ( this.leftKey.isDown ) {

        this.facing = "left";
        if ( this.character.transform.x > 220 ) {
            this.character.transform.x -= 3;
        }
        if (this.character.animation.currentAnimation.name !== "moveleft") {
            this.character.animation.play( "moveleft" );
        }
    }
    else if ( this.rightKey.isDown ) {

        this.facing = "right";
        if ( this.character.transform.x < 740 ) {
            this.character.transform.x += 3;
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