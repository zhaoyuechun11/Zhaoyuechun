gc.GameIntro = function () {
    PIXI.Container.call(this), this.bg = PIXI.Sprite.fromFrame("intro_bg.png"), this.allPlayIcon = PIXI.Sprite.fromFrame("common_game_grade.png"), this.allPlayIcon.anchor.set(.5), this.allPlayIcon.x = 650, this.allPlayIcon.y = 80, this.soundBtn = PIXI.Sprite.fromFrame("intro_option_btn.png"), this.soundBtn.anchor.set(.5), this.soundBtn.x = 620, this.soundBtn.y = 1e3, this.setTouchStartAction(this.soundBtn, this.clickedSoundBtn, this), this.startBtn = PIXI.Sprite.fromFrame("intro_start_btn.png"), this.startBtn.anchor.set(.5), this.startBtn.x = 360, this.startBtn.y = 1e3, this.setTouchStartAction(this.startBtn, this.clickedStartBtn, this), this.tutorialBtn = PIXI.Sprite.fromFrame("intro_help_btn.png"), this.tutorialBtn.anchor.set(.5), this.tutorialBtn.x = 100, this.tutorialBtn.y = 1e3, this.setTouchStartAction(this.tutorialBtn, this.clickedTutBtn, this), this.cropRightTxt = PIXI.Sprite.fromFrame("copyright_1.png"), this.cropRightTxt.anchor.set(.5), this.cropRightTxt.x = gc.width / 2, this.cropRightTxt.y = gc.height - this.cropRightTxt.height / 2, this.soundPopup = new gc.GameMainSoundPopup, this.soundPopup.on("POPUP_CLOSE_EVENT", this.closeSoundPopup.bind(this)), this.tutorialPopup = new gc.GameTutorial, this.tutorialPopup.on("TUTORIAL_POPUP_CLOSE_EVENT", this.closeTutorial.bind(this))
}, gc.GameIntro.constructor = gc.GameIntro, gc.GameIntro.prototype = Object.create(PIXI.Container.prototype), gc.GameIntro.prototype.init = function () {
    this.removeAll(), this.addChild(this.bg), this.addChild(this.allPlayIcon), this.addChild(this.soundBtn), this.addChild(this.startBtn), this.addChild(this.tutorialBtn), this.addChild(this.cropRightTxt), this.setInteractive(!0)
}, gc.GameIntro.prototype.clickedStartBtn = function () {
    this.emit("GAMESTART_EVENT"), this.setInteractive(!1)
}, gc.GameIntro.prototype.clickedSoundBtn = function () {
    this.setInteractive(!1), this.soundPopup.init(), this.addChild(this.soundPopup)
}, gc.GameIntro.prototype.clickedTutBtn = function () {
    this.setInteractive(!1), this.tutorialPopup.initPage(), this.addChild(this.tutorialPopup)
}, gc.GameIntro.prototype.closeTutorial = function () {
    this.tutorialPopup.parent && this.removeChild(this.tutorialPopup), this.setInteractive(!0)
}, gc.GameIntro.prototype.closeSoundPopup = function () {
    this.setInteractive(!0), this.soundPopup.parent && this.removeChild(this.soundPopup)
}, gc.GameIntro.prototype.setInteractive = function (t) {
    this.soundBtn.interactive = t, this.startBtn.interactive = t, this.tutorialBtn.interactive = t
}, gc.GameIntro.prototype.removeAll = function () {
    this.removeChildren()
}, gc.GameIntro.prototype.updateTransform = function () {
    PIXI.Container.prototype.updateTransform.call(this)
}