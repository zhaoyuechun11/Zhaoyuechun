var SudokuEngine = new _Object_SUDOKU();
var PhaserGame = null;	

window.onload = function() {
	PhaserGame = new Phaser.Game(_Config);
	
	PhaserGame.clearBeforeRender = true;
	PhaserGame.forceSingleUpdate = true;
	PhaserGame.preserveDrawingBuffer = true;	
	PhaserGame.lockRender = false;

	PhaserGame.state.add("Boot", Boot);
	PhaserGame.state.add("Preloader", Preloader);
	PhaserGame.state.add("Menu", Menu);
	PhaserGame.state.add("Level", Level);	
	PhaserGame.state.start("Boot");
};
