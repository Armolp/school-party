var loadState = new Kiwi.State( "loadState" );

loadState.preload = function() {

	Kiwi.State.prototype.preload.call( this );
	
	this.game.states.rebuildLibraries();

	this.game.stage.color = "#E0EDF1";

	this.logo = new Kiwi.GameObjects.StaticImage(this, this.textures.loadingImg, 150, 50 );

	this.addChild(this.logo);

	this.logo.alpha = 0;

	this.tweenIn = this.game.tweens.create( this.logo );

	this.tweenIn.to(
		{ alpha: 1 }, 1000, Kiwi.Animations.Tweens.Easing.Linear.None, false );

	this.tweenIn.start();

	this.addImage( "loadingImage", 			"assets/loadingImage.png" );
	this.addImage( "backgroundMainMenu", 	"assets/mainMenuBG.png" );
	this.addImage( "backgroundWood", 		"assets/wood-background.png" );

	this.addImage( "newCharImg", 			"assets/newChar.png" );
	this.addImage( "saveCharImg", 			"assets/saveChar.png" );
	this.addImage( "instructionsImg", 		"assets/instructions.png" );
	this.addImage( "creditsImg", 			"assets/credits.png" );

	this.addImage( "teacherRoomImg", 		"assets/teacherRoom.png" );
	this.addImage( "hallwayBGImg",			"assets/hall-bg.png" );
	this.addImage( "rouletteImg",			"assets/ruleta.png" );
	this.addImage( "rouletteBGImg",			"assets/rouletteBG.png" );

	this.addImage( "squareImg", 			"assets/red square.png" );
	this.addImage( "background", 			"assets/jungle.png" );
	this.addImage( "mazeCharImg", 			"assets/mazeChar.png" );
	this.addImage( "mazeGoalImg", 			"assets/mazeGoal.png" );
	this.addImage( "scoreImg", 				"assets/puntuacion.png" );
	this.addSpriteSheet( "mazeSprite", 		"assets/mazeTiles2.png", 36, 36 );

	this.addSpriteSheet( "characterSprite", "assets/character.png", 150, 120 );
	this.addAudio("mainTheme", 				"assets/Enchanted-Valley.wav" );
};

loadState.create = function(){

	Kiwi.State.prototype.create.call( this );

	this.backgroundMusic = new Kiwi.Sound.Audio( this.game, 'mainTheme', 1, true );

    //this.backgroundMusic.play();
	
	console.log( "inside create of loadingState" );

	this.tweenOut = this.game.tweens.create( this.logo );

	this.tweenOut.to(
		{ alpha: 0 }, 3000, Kiwi.Animations.Tweens.Easing.Linear.None, false );

	this.tweenOut.onComplete( this.switchToMain, this );

	this.tweenOut.start();

	this.switchToMain();
}

loadState.switchToMain = function() {
	this.game.states.switchState( "mazeGameState" );
};