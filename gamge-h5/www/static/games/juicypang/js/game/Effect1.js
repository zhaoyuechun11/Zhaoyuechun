gc.Effect1 = function () {
    PIXI.Container.call(this),
        this.effects = [],
        this.tmpEffects = [],
        this.blocks = [],
        this.tmpBlocks = [],
        this.callFunc = null,
        this.target = null,
        this.effectCount = 0
},
    gc.Effect1.constructor = gc.Effect1,
    gc.Effect1.prototype = Object.create(PIXI.Container.prototype),
    gc.Effect1.prototype.init = function () {
        this.removeAll(),
            this.effectCount = 0
    },
    gc.Effect1.prototype.show = function (con, e, i, n, callFunc, target) {
        this.callFunc = callFunc,
            this.target = target,
            this.effectCount++;
        var tmpBlock,
            img = "block_slice" + e + "_" + con.type + ".png";
        this.tmpBlocks.length
            ? (tmpBlock = this.tmpBlocks.shift()).texture = PIXI.Texture.fromFrame(img)
            : (tmpBlock = new PIXI.Sprite.fromFrame(img)).anchor.set(.5),
            this.addChild(tmpBlock),
            tmpBlock.id = this.effectCount,
            tmpBlock.alpha = 1,
            tmpBlock.x = con.x,
            tmpBlock.y = con.y,
            tmpBlock.type = con.type,
            this.blocks.push(tmpBlock),
            tmpBlock.tween = new TimelineLite,
            tmpBlock.tween.to(tmpBlock.scale, .3, {
                x: 1.3, y: 1.3, ease: Elastic.easeOut.config(.6, .2)
            }),
            tmpBlock.tween.to(tmpBlock, .2, {alpha: 0}),
            TweenMax.delayedCall(.2,
                this.showEffect.bind(this),
                [tmpBlock.type,
                    tmpBlock.x,
                    tmpBlock.y,
                    i,
                    n,
                    this.effectCount, true])
    },
    gc.Effect1.prototype.showCocktail = function (id, con, x, y, hIndex, vIndex, callFunc, target, isFruits) {
        this.callFunc = callFunc,
            this.target = target,
            this.effectCount++;

        var tmpBlock,
            img = "block_slice" + id + "_" + con + ".png";
        isFruits && (img = "wait_fruits.png"),
            this.tmpBlocks.length
                ? (tmpBlock = this.tmpBlocks.shift()).texture = PIXI.Texture.fromFrame(img)
                : ((tmpBlock = new PIXI.Sprite.fromFrame(img)).tween = new TimelineLite, tmpBlock.anchor.set(.5)),
            tmpBlock.id = this.effectCount,
            tmpBlock.alpha = 1,
            tmpBlock.x = x,
            tmpBlock.y = y,
            this.addChild(tmpBlock),
            this.blocks.push(tmpBlock),
            tmpBlock.tween = new TimelineLite,
            tmpBlock.tween.to(tmpBlock.scale, .2, {
                x: 1.3, y: 1.3, ease: Elastic.easeOut.config(.6, .2)
            }),
            tmpBlock.tween.to(tmpBlock, .2, {alpha: 0}),

            TweenMax.delayedCall(.2, function () {
                1 == id
                    ? (this.showEffect(con, x, y, hIndex, 90, this.effectCount, true),
                        TweenMax.delayedCall(.06, function () {
                        vIndex > 0 && this.showEffect(con, x, y + gc.game.sh, hIndex, 90, this.effectCount),
                        vIndex < gc.V_TOTAL - 1 && this.showEffect(con, x, y - gc.game.sh, hIndex, 90, this.effectCount)
                    }.bind(this)))
                    : (this.showEffect(con, x, y, vIndex, 0, this.effectCount, true),
                        TweenMax.delayedCall(.06, function () {
                            hIndex < gc.H_TOTAL - 1 && this.showEffect(con, x + gc.game.sv, y, vIndex, 0, this.effectCount),
                            hIndex > 0 && this.showEffect(con, x - gc.game.sv, y, vIndex, 0, this.effectCount)
                        }.bind(this)))
            }.bind(this))
    },
    gc.Effect1.prototype.showEffect = function (id, x, y, H_TOTAL, angle, count, isRemove) {
        var tmpEffect,
            self = this,
            img = "slice_" + id + ".png";

        this.tmpEffects.length
            ? (tmpEffect = this.tmpEffects.shift()).texture = PIXI.Texture.fromFrame(img)
            : (tmpEffect = new PIXI.Sprite.fromFrame(img)).tween = new TimelineLite,
            tmpEffect.id = count,
            tmpEffect.alpha = 1,
            tmpEffect.x = x,
            tmpEffect.y = y,
            tmpEffect.scale.set(1, 0),
            tmpEffect.anchor.set(.5, [.76, .66, .58, .5, .42, .32, .26][H_TOTAL]),
            tmpEffect.rotation = Util.radiansToDegrees(angle),
            this.addChild(tmpEffect),
            this.effects.push(tmpEffect),
            tmpEffect.tween = new TimelineLite,
            tmpEffect.tween.to(tmpEffect.scale, .2, {
                y: 1, ease: Back.easeOut
            }),
            tmpEffect.tween.to(tmpEffect, .3, {
                alpha: 0, onCompleteParams: [tmpEffect.id], onComplete: function (t) {
                    isRemove && (
                        self.removeBlock(t),
                            self.removeEffect(t),
                            self.callFunc.call(self.target)
                    )
                }
            }),
            gc.effectSoundPlay("sound_slice_effect")
    },
    gc.Effect1.prototype.removeEffect = function (count) {
        for (var effect, i = this.effects.length; i--;)
            (effect = this.effects[i]).id == count
            && (effect.tween.clear(),
                this.effects.splice(i, 1),
                this.tmpEffects.push(effect),
                this.removeChild(effect))
    },
    gc.Effect1.prototype.removeBlock = function (count) {
        for (var block, i = this.blocks.length; i--;)
            if ((block = this.blocks[i]).id == count) {
                block.tween.clear(),
                    this.blocks.splice(i, 1),
                    this.tmpBlocks.push(block),
                    this.removeChild(block);

                break
            }
    },
    gc.Effect1.prototype.pause = function () {
        for (var t = this.effects.length; t--;)
            this.effects[t].tween.pause();

        for (t = this.blocks.length; t--;)
            this.blocks[t].tween.pause()
    },
    gc.Effect1.prototype.resume = function () {
        for (var t = this.effects.length; t--;)
            this.effects[t].tween.resume();

        for (t = this.blocks.length; t--;)
            this.blocks[t].tween.resume()
    },
    gc.Effect1.prototype.removeAll = function () {
        for (var block, effect, i = this.effects.length; i--;)
            (effect = this.effects.shift()).tween.clear(),
                this.tmpEffects.push(effect);

        for (i = this.blocks.length; i--;)
            (block = this.blocks.shift()).tween.clear(),
                this.tmpBlocks.push(block);

        this.removeChildren()
    },
    gc.Effect1.prototype.updateTransform = function () {
        PIXI.Container.prototype.updateTransform.call(this)
    }