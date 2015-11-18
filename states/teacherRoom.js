var teacherRoomState = new Kiwi.State( "teacherRoomState" );

teacherRoomState.create = function() {

    Kiwi.State.prototype.create.call( this );

    this.background = new Kiwi.GameObjects.StaticImage(this, this.textures.teacherRoomImg, 0, 0 );
    this.character = new Kiwi.GameObjects.Sprite(
        this, this.textures.characterSprite, 226, 261 );

    this.leftKey    = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.A );
    this.rightKey   = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.D );
    this.downKey    = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.S );
    this.stateKey   = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.W );

    this.character.animation.add("idleright", [ 0 ], 0.1, false );
    this.character.animation.add("crouchright", [ 1 ], 0.1, false );
    this.character.animation.add("moveright", [ 2, 3, 4, 5, 6, 7 ], 0.1, true );
    this.character.animation.add("idleleft", [ 8 ], 0.1, false );
    this.character.animation.add("crouchleft", [ 9 ], 0.1, false );
    this.character.animation.add("moveleft", [ 10, 11, 12, 13, 14, 15 ], 0.1, true );

    this.facing = "right";

    this.character.animation.play( "idleright" );

    this.backgroundMusic = new Kiwi.Sound.Audio( this.game, 'mainTheme', 1, true );

    this.backgroundMusic.play();

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