gc.Effect2 = function () {
    PIXI.Container.call(this),
        this.effects = [],
        this.tmpEffects = [],
        this.lineEffects = [],
        this.tmpLineEffects = [],
        this.blocks = [],
        this.tmpBlocks = [],
        this.spcialBlock = new gc.EffectBlock,
        this.targetList = null,
        this.effectCount = 0,
        this.endCount = 0,
        this.callFunc = null,
        this.target = null
},
    gc.Effect2.constructor = gc.Effect2,
    gc.Effect2.prototype = Object.create(PIXI.Container.prototype),
    gc.Effect2.prototype.init = function () {
        this.removeAll()
    },
    gc.Effect2.prototype.show = function (specialBlock, targetList, callFunc, target) {
        this.effectCount = 0,
            this.targetList = targetList,
        10 != specialBlock.type && (this.spcialBlock.init(specialBlock, true),
            this.spcialBlock.x = specialBlock.x,
            this.spcialBlock.y = specialBlock.y,
            this.addChild(this.spcialBlock)),
            this.callFunc = callFunc,
            this.target = target,
            this.endCount = targetList.length,
            0 == targetList.length
                ? TweenMax.delayedCall(1,
                this.effectComplete.bind(this), false)
                : TweenMax.delayedCall(1,
                this.showEffect.bind(this), false)
    },
    gc.Effect2.prototype.showEffect = function () {
        if (this.effectCount < this.targetList.length) {
            var effect,
                target = this.targetList[this.effectCount];
            this.tmpLineEffects.length
                ? effect = this.tmpLineEffects.shift()
                : (effect = new gc.MovieClip("all_1_", 1, 4, .2, 3)).anchor.set(.5, 0),
                effect.id = this.effectCount,
                effect.x = this.spcialBlock.x,
                effect.y = this.spcialBlock.y,
                effect.scale.set(Util.distanceOfTwoPoints(this.spcialBlock, target) / 550),
                effect.rotation = Util.getRadian(this.spcialBlock.x, this.spcialBlock.y, target.x, target.y),

                this.addChildAt(effect, 0),
                this.effects.push(effect),
                this.showBlock(target,
                    this.effectCount), target.alpha = 0,
                this.effectCount++, TweenMax.delayedCall(.1,
                this.showEffect.bind(this), false),
                gc.effectSoundPlay("sound_all_effect")
        }
    },

    gc.Effect2.prototype.showBlock = function (pos, count) {
        var tmpBlock;
        (tmpBlock = this.tmpBlocks.length
            ? this.tmpBlocks.shift()
            : new gc.EffectBlock).init(pos),
        pos.type < 10 && 0 == pos.specialType
        && (tmpBlock.block.texture = PIXI.Texture.fromFrame("block_default" + pos.type + "_4.png")),
            tmpBlock.id = count,
            tmpBlock.x = pos.x,
            tmpBlock.y = pos.y,
            this.addChild(tmpBlock),
            this.blocks.push(tmpBlock)
    },
    gc.Effect2.prototype.removeEffect = function (count) {
        var effect, i, n = this.effects.length;
        for (i = 0; n > i; i++)
            if ((effect = this.effects[i]).stop(),
            effect.id == count) {
                this.effects.splice(i, 1),
                    this.tmpEffects.push(effect),
                    this.removeChild(effect);
                break
            }
        0 == --this.endCount && this.effectComplete()
    },
    gc.Effect2.prototype.removeBlock = function (count) {
        var block, i, n = this.blocks.length;
        for (i = 0; n > i; i++)
            if ((block = this.blocks[i]).removeAll(), block.id == count) {
                this.blocks.splice(i, 1),
                    this.tmpBlocks.push(block),
                    this.removeChild(block);
                break
            }
    },
    gc.Effect2.prototype.effectComplete = function () {
        this.removeAll(),
            this.callFunc.call(this.target),
            gc.game.shakeMotion(.3)
    },
    gc.Effect2.prototype.pause = function () {
        for (var t = this.effects.length; t--;) this.effects[t].stop();
        for (t = this.lineEffects.length; t--;) this.lineEffects[t].resume();
        for (t = this.blocks.length; t--;) this.blocks[t].pause()
    },
    gc.Effect2.prototype.resume = function () {
        for (var t = this.effects.length; t--;) this.effects[t].play();
        for (t = this.lineEffects.length; t--;) this.lineEffects[t].resume();
        for (t = this.blocks.length; t--;) this.blocks[t].resume()
    },
    gc.Effect2.prototype.removeAll = function () {
        for (var block, effect, i = this.effects.length; i--;) effect = this.effects.shift(),
            this.tmpEffects.push(effect);
        for (i = this.lineEffects.length; i--;) effect = this.lineEffects.shift(),
            this.tmpLineEffects.push(effect);
        for (i = this.blocks.length; i--;) block = this.blocks.shift(),
            this.tmpBlocks.push(block);
        this.spcialBlock.removeAll(),
            this.removeChildren()
    },
    gc.Effect2.prototype.updateTransform = function () {
        PIXI.Container.prototype.updateTransform.call(this)
    }