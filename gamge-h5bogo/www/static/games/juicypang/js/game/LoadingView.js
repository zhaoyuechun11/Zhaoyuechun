gc.LoadingView = function () {
    PIXI.Container.call(this),
        this.tween = new TimelineLite,
        this.darkBg = new PIXI.Graphics,
        this.darkBg.lineStyle(1, 0, 1),
        this.darkBg.beginFill(0, .8),
        this.darkBg.drawRect(0, 0, 
    gc.width, 
    gc.height),
        this.darkBg.endFill(),
        this.txt = new PIXI.Text("loading..", {
            fontFamily: "Arial", fontSize: 24, fontWeight: "bold", fill: "#FFF"
        }),
        this.txt.anchor.set(.5),
        this.txt.x = gc.width / 2,
        this.txt.y = gc.height / 2 + 14,
        this.img = PIXI.Sprite.fromFrame("block_disturb_1.png"),
        this.img.x = gc.width / 2,
        this.img.y = gc.height / 2 - 55,
        this.img.anchor.set(.5)
},
    gc.LoadingView.prototype.constructor = gc.LoadingView,
    gc.LoadingView.prototype = Object.create(PIXI.Container.prototype),
    gc.LoadingView.prototype.show = function () {
        this.addChild(this.darkBg),
            this.addChild(this.txt),
            this.addChild(this.img),
            this.motion()
    },
    gc.LoadingView.prototype.motion = function () {
        this.img.scale.set(.7),
            this.tween.to(this.img.scale, .6, {
                x: 1, y: 1, ease: Elastic.easeOut
            }),
            this.tween.to(this.img.scale, .3, {x: .5, y: .5, delay: .7, onComplete: this.motion.bind(this)})
    },
    gc.LoadingView.prototype.hide = function () {
        this.tween.kill(),
            this.removeAll()
    },
    gc.LoadingView.prototype.removeAll = function () {
        this.removeChildren()
    },
    gc.LoadingView.prototype.updateTransform = function () {
        PIXI.Container.prototype.updateTransform.call(this)
    }