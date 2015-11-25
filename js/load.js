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
	this.addImage( "background", 			"assets/jungle.png" );
	this.addImage( "backgroundMainMenu", 	"assets/mainMenuBG.png" );
	this.addImage( "loadingImage", 			"assets/loadingImage.png" );
	this.addImage( "backgroundWood", 		"assets/wood-background.png" );

	//temporal images
	this.addImage( "creditsImg", 			"assets/credits.png" );
	this.addImage( "newCharImg", 			"assets/newChar.png" );
	this.addImage( "saveCharImg", 			"assets/saveChar.png" );
	this.addImage( "instructionsImg", 		"assets/instructions.png" );

	//school images
	this.addImage( "rouletteImg",			"assets/ruleta.png" );
	this.addImage( "hallwayBGImg",			"assets/hall-bg.png" );
	this.addImage( "rouletteBGImg",			"assets/rouletteBG.png" );
	this.addImage( "teacherRoomImg", 		"assets/teacherRoom.png" );

	this.addImage( "scoreImg",				"assets/puntuacion.png");

	//timeline images
	this.addImage( "squareImg", 			"assets/red square.png" );
	
	//maze images
	this.addImage( "mazeCharImg", 			"assets/maze/mazeChar.png" );
	this.addImage( "mazeGoalImg", 			"assets/maze/mazeGoal.png" );
	this.addSpriteSheet( "mazeSprite", 		"assets/maze/mazeTiles2.png", 36, 36 );
	
	//space images
	this.addImage( "laser2",				"assets/space/lf.png" );
	this.addImage( "enemigos", 				"assets/space/ENE.png" );
	this.addImage( "Laser",					"assets/space/laser.png" );
	this.addImage( "Nave", 					"assets/space/Naveesp.png" );
	this.addImage( "particle",				"assets/space/particle_01.png" );
	this.addSpriteSheet( "Exp",				"assets/space/expsp.png",192,207 );

	//catch images
    this.addImage('quest', 					'assets/catch/quest.png');
	this.addImage('backgroundCatch', 		'assets/catch/western.png'); 
    this.addSpriteSheet('coin', 			'assets/catch/coin.png', 48, 48);
    this.addSpriteSheet('cowboy', 			'assets/catch/cowboy.png', 150,99);
    this.addSpriteSheet('sparkle', 			'assets/catch/sparkle.png', 34, 40);
    this.addSpriteSheet('coinsack', 		'assets/catch/coinsack.png', 48, 48);

	//character sprites
	this.addSpriteSheet( "susySprite", 		"assets/susy.png", 100, 149 );
	this.addSpriteSheet( "danielSprite", 	"assets/daniel.png", 68, 129 );
	this.addSpriteSheet( "characterSprite", "assets/character.png", 150, 120 );
	
	//music
	this.addAudio( "pairTheme", 			"assets/music/Pamgaea.mp3" );
	this.addAudio( "timeTheme", 			"assets/music/Pixelland.mp3" );
	this.addAudio( "mazeTheme", 			"assets/music/Kawai Kitsune.mp3" );
	this.addAudio( "catchTheme", 			"assets/music/Kings of Tara.mp3" );
	this.addAudio( "mainTheme", 			"assets/music/Enchanted-Valley.wav" );
	this.addAudio( "spaceTheme", 			"assets/music/Video Dungeon Boss.mp3" );
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
	this.game.states.switchState( "catchGameState" );
};