gc.EffectBlock = function () {
    PIXI.Container.call(this),
        this.id = null,
        this.block = new PIXI.Sprite.fromFrame("block_glory_1.png"),
        this.block.anchor.set(.5),
        this.whiteBlock = new PIXI.Sprite.fromFrame("all_3_1.png"),
        this.whiteBlock.x = -4,
        this.whiteBlock.y = -3,
        this.whiteBlock.anchor.set(.5),
        this.effect = new PIXI.Sprite.fromFrame("all_2.png"),
        this.effect.anchor.set(.5),
        this.effect.scale.set(1.5),
        this.tween = new TimelineLite,
        this.whiteBlockTween = new TimelineLite,
        this.effectTween = new TimelineLite
},
    gc.EffectBlock.constructor = gc.EffectBlock,
    gc.EffectBlock.prototype = Object.create(PIXI.Container.prototype),

    gc.EffectBlock.prototype.init = function (con, isScale) {
        this.removeAll(),
            this.scale.set(1);

        var img = gc.BLOCK_NAME[0] + con.type + "_1.png";
        if (con.specialType > 0)
            img = 1 == con.specialType || 2 == con.specialType
                ? gc.BLOCK_NAME[con.specialType] + con.type + ".png"
                : gc.BLOCK_NAME[con.specialType] + con.type + "_1.png";
        else if (10 == con.type)
            img = "wait_disturb.png";
        else if (71 == con.type) {
            var n = con.coconutLife - con.life;
            n > con.coconutLife && (n = con.coconutLife),
                img = "block_coco" + n + "_1.png"
        }
        this.block.texture = PIXI.Texture.fromFrame(img),
            this.block.scale.set(1),
            this.block.alpha = 1,
            img = "all_3_" + con.type + ".png",
            10 == con.type
                ? img = "all_3_7.png"
                : 71 == con.type && (img = "all_2.png"),
            this.whiteBlock.texture = PIXI.Texture.fromFrame(img),
            this.whiteBlockTween.clear(),
            isScale
                ? (this.tween = new TimelineLite, this.tween.to(this.scale, 1, {
                    x: 1.3, y: 1.3
                }),
                    this.whiteBlock.alpha = 0,
                    this.whiteBlockTween = new TimelineLite,
                    this.whiteBlockTween.to(this.whiteBlock, .4, {
                        alpha: 1, yoyo: true, repeat: 100
                    }))
                : (con.alpha = 0, this.whiteBlock.alpha = 1, this.whiteBlockTween = new TimelineLite, this.whiteBlockTween.to(this.block, .4, {
                    alpha: .2, onComplete: function () {
                        this.parent.removeEffect(this.id)
                    }.bind(this)
                })),

            this.effectTween = new TimelineLite,
            this.effect.rotation = 0,
            this.effectTween.to(this.effect, 3, {
                rotation: Util.radiansToDegrees(360), repeat: -1, ease: Power0.easeNone
            }),
            this.addChild(this.effect),
            this.addChild(this.whiteBlock),
            this.addChild(this.block)
    },
    gc.EffectBlock.prototype.pause = function () {
        this.tween.pause(),
            this.whiteBlockTween.pause(),
            this.effectTween.pause()
    },
    gc.EffectBlock.prototype.resume = function () {
        this.tween.resume(),
            this.whiteBlockTween.resume(),
            this.effectTween.resume()
    },
    gc.EffectBlock.prototype.removeAll = function () {
        this.removeChildren(),
            this.tween.kill(),
            this.whiteBlockTween.kill(),
            this.effectTween.kill()
    },
    gc.EffectBlock.prototype.updateTransform = function () {
        PIXI.Container.prototype.updateTransform.call(this)
    }