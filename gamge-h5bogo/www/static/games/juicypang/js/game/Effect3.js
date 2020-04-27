gc.Effect3 = function () {
    PIXI.Container.call(this),
        this.effects = [],
        this.tmpEffects = [],
        this.blocks = [],
        this.tmpBlocks = [],
        this.effectCount = 0
},
    gc.Effect3.constructor = gc.Effect3,
    gc.Effect3.prototype = Object.create(PIXI.Container.prototype),
    gc.Effect3.prototype.init = function () {
        this.removeAll(),
            this.effectCount = 0
    },
    gc.Effect3.prototype.show = function (con, callFunc, target) {
        this.callFunc = callFunc,
            this.target = target,
            this.effectCount++;

        var tmpBlock,
            img = "block_big" + con.type + "_1.png";

        con.isSpecialCombine2 && (img = "wait_special.png"),
            this.tmpBlocks.length
                ? (tmpBlock = this.tmpBlocks.shift()).texture = PIXI.Texture.fromFrame(img)
                : (tmpBlock = new PIXI.Sprite.fromFrame(img)).anchor.set(.5),
            tmpBlock.id = this.effectCount,
            tmpBlock.alpha = 1,
            tmpBlock.tween = new TimelineLite,
            tmpBlock.tween.to(tmpBlock.scale, .1, {
                x: 1.2, y: 1.2, yoyo: true, repeat: 2
            }),
            tmpBlock.tween.to(tmpBlock.scale, .1, {
                x: 1.3, y: 1.3, onCompleteParams: [con.x, con.y, con.type, tmpBlock.id],
                onComplete: this.showEffect.bind(this)
            }),
            tmpBlock.x = con.x,
            tmpBlock.y = con.y,
            this.addChild(tmpBlock),
            this.blocks.push(tmpBlock)
    },
    gc.Effect3.prototype.showEffect = function (x, y, i, count) {
        this.removeBlock(count);
        var tmpEffect,
            self = this,
            img = "boom_" + i + ".png";

        this.tmpEffects.length
            ? (tmpEffect = this.tmpEffects.shift()).texture = PIXI.Texture.fromFrame(img)
            : ((tmpEffect = new PIXI.Sprite.fromFrame(img)).anchor.set(.5), tmpEffect.tween = new TimelineLite),
            tmpEffect.id = count,
            tmpEffect.alpha = 1,
            tmpEffect.scale.set(.3),
            tmpEffect.tween = new TimelineLite,
            tmpEffect.tween.to(tmpEffect.scale, .1, {
                x: 1, y: 1, ease: Back.easeOut
            }),
            tmpEffect.tween.to(tmpEffect, .1, {
                alpha: .5, onCompleteParams: [tmpEffect.id], onComplete: function (t) {
                    self.removeEffect(t), self.callFunc.call(self.target)
                }
            }),
            tmpEffect.x = x,
            tmpEffect.y = y,
            this.addChild(tmpEffect),
            this.effects.push(tmpEffect),
            gc.effectSoundPlay("sound_boom_effect"),
            gc.game.shakeMotion()
    },

    gc.Effect3.prototype.removeEffect = function (count) {
        for (var effect, i = this.effects.length; i--;)
            (effect = this.effects[i]).id == count
            && (
                effect.tween.clear(),
                    this.effects.splice(i, 1),
                    this.tmpEffects.push(effect),
                    this.removeChild(effect)
            )
    },
    gc.Effect3.prototype.removeBlock = function (count) {
        for (var block, i = this.blocks.length; i--;)
            if ((block = this.blocks[i]).id == count) {
                block.tween.clear(),
                    this.blocks.splice(i, 1),
                    this.tmpBlocks.push(block),
                    this.removeChild(block);

                break
            }
    },
    gc.Effect3.prototype.pause = function () {
        for (var t = this.effects.length; t--;)
            this.effects[t].tween.pause();

        for (t = this.blocks.length; t--;)
            this.blocks[t].tween.pause()
    },
    gc.Effect3.prototype.resume = function () {
        for (var t = this.effects.length; t--;)
            this.effects[t].tween.resume();

        for (t = this.blocks.length; t--;)
            this.blocks[t].tween.resume()

    },
    gc.Effect3.prototype.removeAll = function () {
        for (var block, effect, i = this.effects.length; i--;)
            (effect = this.effects.shift()).tween.clear(), this.tmpEffects.push(effect);

        for (i = this.blocks.length; i--;)
            (block = this.blocks.shift()).tween.clear(), this.tmpBlocks.push(block);

        this.removeChildren()
    },
    gc.Effect3.prototype.updateTransform = function () {
        PIXI.Container.prototype.updateTransform.call(this)
    }