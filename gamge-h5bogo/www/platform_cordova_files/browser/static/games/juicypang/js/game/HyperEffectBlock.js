gc.HyperEffectBlock = function () {
    PIXI.Container.call(this),
        this.id = null,
        this.block = new PIXI.Sprite.fromFrame("hyper_4_1.png"),
        this.block.anchor.set(.5),
        this.effect = new gc.MovieClip("hyper_3_", 1, 20, .4),
        this.effect.anchor.set(.5),
        this.effect.x = -3,
        this.effect.y = -3,
        this.effect.onComplete = function () {
            this.removeAll()
        }.bind(this),
        this.tween = new TimelineLite
},
    gc.HyperEffectBlock.constructor = gc.HyperEffectBlock,
    gc.HyperEffectBlock.prototype = Object.create(PIXI.Container.prototype),
    gc.HyperEffectBlock.prototype.init = function (con, isGold) {
        this.removeAll(),
            this.tween = new TimelineLite,
            isGold
                ? (this.block.texture = PIXI.Texture.fromFrame("block_gold" + con.type + "_1.png"),
                    this.block.alpha = 0,
                    this.tween.to(this.block, .1, {alpha: 1}),
                    this.effect.setAnimation("hyper_1_", 1, 13, .4),
                    this.effect.loop = true)
                : (this.block.texture = PIXI.Texture.fromFrame("hyper_4_" + con.type + ".png"),

                    this.block.alpha = 0,
                    this.tween.to(this.block, .1, {
                        alpha: 1, yoyo: true, repeat: 100, ease: Power0.easeNone
                    }),

                    this.effect.setAnimation("hyper_3_", 1, 20, .4),
                    this.effect.loop = false),
            this.effect.gotoAndPlay(0),
            this.addChild(this.block),
            this.addChild(this.effect)
    },
    gc.HyperEffectBlock.prototype.pause = function () {
        this.tween.pause()
    },
    gc.HyperEffectBlock.prototype.resume = function () {
        this.tween.resume()
    },
    gc.HyperEffectBlock.prototype.removeAll = function () {
        this.removeChildren(),
            this.tween.kill()
    },
    gc.HyperEffectBlock.prototype.updateTransform = function () {
        PIXI.Container.prototype.updateTransform.call(this)
    }