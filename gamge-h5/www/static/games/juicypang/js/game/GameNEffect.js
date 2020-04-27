gc.GameNEffect = function () {
    PIXI.Container.call(this),
        this.effects = [],
        this.tmpEffects = [],
        this.blockEffect = new PIXI.Sprite.fromFrame("persist_1.png"),
        this.blockEffect.anchor.set(.5),
        this.block = new PIXI.Sprite.fromFrame("all_3_1.png"),
        this.block.anchor.set(.5),
        this.whiteEffect = new PIXI.Graphics,
        this.whiteEffect.beginFill(16777215, .8),
        this.whiteEffect.drawRect(0, 0,
            gc.width,
            gc.height),
        this.whiteEffect.endFill(),
        this.effectTween = new TimelineLite,
        this.effectTween2 = new TimelineLite,
        this.callFunc = null,
        this.target = null,
        this.effectCount = 0,
        this.bX = 0,
        this.bY = 0
},
    gc.GameNEffect.constructor = gc.GameNEffect,
    gc.GameNEffect.prototype = Object.create(PIXI.Container.prototype),
    gc.GameNEffect.prototype.init = function () {
        this.removeAll()
    },
    gc.GameNEffect.prototype.show = function (bX, bY, i, callFunc, target) {
        this.callFunc = callFunc,
            this.target = target,
            this.effectCount = 0,
            this.bX = bX,
            this.bY = bY,
            this.blockEffect.texture = PIXI.Texture.fromFrame("persist_" + i + ".png"),
            this.blockEffect.scale.set(1),
            this.blockEffect.x = this.bX,
            this.blockEffect.y = this.bY,
            this.addChild(this.blockEffect),
            this.effectTween = new TimelineLite,
            this.effectTween.to(this.blockEffect, 5, {
                rotation: 7,
                ease: Power0.easeNone
            }),
            this.block.texture = PIXI.Texture.fromFrame("wait_gamen.png"),
            this.block.x = bX,
            this.block.y = bY,
            this.addChild(this.block),
            this.showEffect()
    },
    gc.GameNEffect.prototype.showEffect = function () {
        var tmpEffect;
        this.tmpEffects.length
            ? tmpEffect = this.tmpEffects.shift()
            : ((tmpEffect = new PIXI.Sprite.fromFrame("n_1.png")).tween = new TimelineLite,
                tmpEffect.anchor.set(.5, 1)),
            tmpEffect.alpha = 0,
            tmpEffect.rotation = Util.radiansToDegrees([0, 200, 50, 300, 120, 320, 150, 240, 280, 80][this.effectCount]),
            tmpEffect.tween.clear(),
            tmpEffect.tween.to(tmpEffect, .25 - .02 * this.effectCount, {
                alpha: 1,
                onComplete: function () {
                    10 == ++this.effectCount
                        ? (this.effectTween = new TimelineLite, this.effectTween.to(this.blockEffect.scale, .4, {
                            x: 5, y: 5, ease: Sine.easeIn, onComplete: this.showEffect2.bind(this)
                        }))
                        : this.showEffect()
                }.bind(this)
            }),
            tmpEffect.x = this.bX,
            tmpEffect.y = this.bY,
            this.addChildAt(tmpEffect, 0),
            this.effects.push(tmpEffect)
    },
    gc.GameNEffect.prototype.showEffect2 = function () {
        this.whiteEffect.alpha = 0,
            this.effectTween2 = new TimelineLite,
            this.effectTween2.to(this.whiteEffect, .6, {
                alpha: 1,
                onComplete: function () {
                    this.callFunc.call(this.target), this.removeAll()
                }.bind(this)
            }),
            this.addChild(this.whiteEffect),
            gc.effectSoundPlay("sound_boom_effect"),
            gc.game.shakeMotion(.5)
    },
    gc.GameNEffect.prototype.removeEffect = function (count) {
        for (var e, i = this.effects.length; i--;)
            (e = this.effects[i]).id == count
            && (e.tween.clear(),
                this.effects.splice(i, 1),
                this.tmpEffects.push(e),
                this.removeChild(e))
    },
    gc.GameNEffect.prototype.removeBlock = function (count) {
        for (var block, i = this.blocks.length; i--;)
            if ((block = this.blocks[i]).id == count) {
                block.tween.clear(),
                    this.blocks.splice(i, 1),
                    this.tmpBlocks.push(block),
                    this.removeChild(block);
                break
            }
    },
    gc.GameNEffect.prototype.pause = function () {
        for (var i = this.effects.length; i--;)
            this.effects[i].tween.pause();
        this.effectTween.pause(),
            this.effectTween2.pause()
    },
    gc.GameNEffect.prototype.resume = function () {
        for (var i = this.effects.length; i--;)
            this.effects[i].tween.resume();
        this.effectTween.resume(),
            this.effectTween2.resume()
    },
    gc.GameNEffect.prototype.removeAll = function () {
        for (var effect, i = this.effects.length; i--;)
            (effect = this.effects.shift()).tween.clear(),
                this.tmpEffects.push(effect);

        this.effectTween.kill(),
            this.effectTween2.kill(),
            this.removeChildren()
    },
    gc.GameNEffect.prototype.updateTransform = function () {
        PIXI.Container.prototype.updateTransform.call(this)
    }