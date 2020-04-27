gc.JuiceItemBlock = function () {
    PIXI.Container.call(this),
        this.id = null,
        this.block = new PIXI.Sprite.fromFrame("block_glory_1.png"),
        this.block.anchor.set(.5),
        this.effect = new PIXI.Sprite.fromFrame("persist_1.png"),
        this.effect.anchor.set(.5),
        this.tween = new TimelineLite,
        this.whiteBlockTween = new TimelineLite,
        this.effectTween = new TimelineLite
},
    gc.JuiceItemBlock.constructor = gc.JuiceItemBlock,
    gc.JuiceItemBlock.prototype = Object.create(PIXI.Container.prototype),
    gc.JuiceItemBlock.prototype.init = function () {
        this.removeAll(),
            this.effect.texture = PIXI.Texture.fromFrame("persist_7.png"),
            this.effectTween.clear(),
            this.effectTween.to(this.effect, 3, {
                rotation: Util.radiansToDegrees(360), repeat: 30, ease: Power0.easeNone
            }),
            this.addChild(this.effect)
    },
    gc.JuiceItemBlock.prototype.pause = function () {
        this.tween.pause(),
            this.effectTween.pause()
    },
    gc.JuiceItemBlock.prototype.resume = function () {
        this.tween.resume(),
            this.effectTween.resume()
    },
    gc.JuiceItemBlock.prototype.removeAll = function () {
        this.removeChildren(),
            this.tween.clear(),
            this.effectTween.clear()
    },
    gc.JuiceItemBlock.prototype.updateTransform = function () {
        PIXI.Container.prototype.updateTransform.call(this)
    }