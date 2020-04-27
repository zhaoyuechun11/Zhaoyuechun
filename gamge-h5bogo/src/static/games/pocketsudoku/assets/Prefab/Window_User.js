function Window_User(aGame, aParent, aName, aAddToStage, aEnableBody, aPhysicsBodyType) {
    
	Phaser.Group.call(this, aGame, aParent, aName, aAddToStage, aEnableBody, aPhysicsBodyType);
	this.game.add.sprite(0, 0, 'data03','popup_info', this);	
	this._my_grade = this.game.add.tileSprite(25, 22, 38, 46, 'grade', _UserInfo.Grade,this);
	
	this.game.add.sprite(86, 22,'data01','star',this);
	
	this.fText_mystar  = this.game.add.text(220, 48, _UserInfo.TotalStar,{ font: "bold 36px", fill: "#602e0d",stroke:"#602e0d", strokeThickness:2},this);
	this.fText_mystar.anchor.setTo(0.5,0.5);
	this.fText_mystar.pivot.setTo(0.5, 0.5);
	this.fText_mystar.anchor.setTo(0.5, 0.5);	

}
/** @type Phaser.Group */
var Window_User_proto = Object.create(Phaser.Group.prototype);
Window_User.prototype = Window_User_proto;
Window_User.prototype.constructor = Window_Result;


Window_User.prototype.initialize = function()
{
	this.fText_mystar.text = _UserInfo.TotalStar;
	this._my_grade.frame   = _UserInfo.Grade;
};