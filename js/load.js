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

	//backgrounds
	this.addImage( "loadingImage", 			"assets/loadingImage.png" );
	this.addImage( "backgroundMainMenu", 	"assets/mainMenuBG.png" );
	this.addImage( "backgroundWood", 		"assets/wood-background.png" );
	this.addImage( "background", 			"assets/jungle.png" );

	//temporal images
	this.addImage( "newCharImg", 			"assets/newChar.png" );
	this.addImage( "saveCharImg", 			"assets/saveChar.png" );
	this.addImage( "instructionsImg", 		"assets/instructions.png" );
	this.addImage( "creditsImg", 			"assets/credits.png" );

	//school images
	this.addImage( "teacherRoomImg", 		"assets/teacherRoom.png" );
	this.addImage( "hallwayBGImg",			"assets/hall-bg.png" );
	this.addImage( "rouletteImg",			"assets/ruleta.png" );
	this.addImage( "rouletteBGImg",			"assets/rouletteBG.png" );

	//timeline images
	this.addImage( "squareImg", 			"assets/red square.png" );
	
	//maze images
	this.addImage( "mazeCharImg", 			"assets/mazeChar.png" );
	this.addImage( "mazeGoalImg", 			"assets/mazeGoal.png" );
	this.addImage( "scoreImg", 				"assets/puntuacion.png" );
	this.addSpriteSheet( "mazeSprite", 		"assets/mazeTiles2.png", 36, 36 );
	
	//space images
	this.addImage( "Nave", 					"assets/Naveesp.png" );
	this.addImage( "enemigos", 				"assets/ENE.png" );
	this.addImage( "particle",				"assets/particle_01.png" );
	this.addImage( "Laser",					"assets/laser.png" );
	this.addImage( "laser2",				"assets/lf.png" );
	this.addImage( "scoreImg",				"assets/puntuacion.png");
	this.addSpriteSheet( "Exp",				"assets/expsp.png",192,207 );

	//character sprites
	this.addSpriteSheet( "characterSprite", "assets/character.png", 150, 120 );
	
	//music
	this.addAudio( "mainTheme", 			"assets/Enchanted-Valley.wav" );
};

loadState.create = function(){

	Kiwi.State.prototype.create.call( this );

	this.backgroundMusic = new Kiwi.Sound.Audio( this.game, 'mainTheme', 1, true );

    this.backgroundMusic.play();
	
	console.log( "inside create of loadingState" );

	this.tweenOut = this.game.tweens.create( this.logo );

	this.tweenOut.to(
		{ alpha: 0 }, 3000, Kiwi.Animations.Tweens.Easing.Linear.None, false );

	this.tweenOut.onComplete( this.switchToMain, this );

	this.tweenOut.start();

	this.switchToMain();
}

loadState.switchToMain = function() {
	this.game.states.switchState( "mainMenuState" );
};