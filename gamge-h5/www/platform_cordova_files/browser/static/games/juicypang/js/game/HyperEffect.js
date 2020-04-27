gc.HyperEffect = function () {
    PIXI.Container.call(this),
        this.effects = [],
        this.tmpEffects = [],
        this.lineEffects = [],
        this.tmpLineEffects = [],
        this.blocks = [],
        this.tmpBlocks = [],
        this.spcialBlock = new gc.HyperEffectBlock,
        this.spcialBlockEffect = new gc.MovieClip("hyper_1_", 1, 13, .4),
        this.spcialBlockEffect.loop = true,
        this.targetList = null,
        this.effectCount = 0,
        this.endCount = 0,
        this.callFunc = null,
        this.target = null
},
    gc.HyperEffect.constructor = gc.HyperEffect,
    gc.HyperEffect.prototype = Object.create(PIXI.Container.prototype),
    gc.HyperEffect.prototype.init = function () {
        this.removeAll()
    },
    gc.HyperEffect.prototype.show = function (Block, targetList, callFunc, target) {
        this.effectCount = 0,
            this.targetList = targetList,
            this.spcialBlock.init(Block, true),
            this.spcialBlock.x = Block.x,
            this.spcialBlock.y = Block.y,
            this.addChild(this.spcialBlock),
            this.spcialBlockEffect.gotoAndPlay(0),
            this.addChild(this.spcialBlockEffect),
            this.callFunc = callFunc,
            this.target = target,
            this.endCount = targetList.length,
            0 == targetList.length
                ? TweenMax.delayedCall(1,
                this.effectComplete.bind(this), false)
                : TweenMax.delayedCall(1,
                this.showEffect.bind(this), false)
    },
    gc.HyperEffect.prototype.showEffect = function () {
        if (this.effectCount < this.targetList.length) {
            var tmpLineEffect,
                self = this,
                Block = this.targetList[this.effectCount];
            this.tmpLineEffects.length
                ? tmpLineEffect = this.tmpLineEffects.shift()
                : ((tmpLineEffect = new PIXI.Sprite.fromFrame("hyper_2.png")).anchor.set(.5, 0),
                    tmpLineEffect.tween = new TimelineLite),
                tmpLineEffect.id = this.effectCount,
                tmpLineEffect.x = this.spcialBlock.x,
                tmpLineEffect.y = this.spcialBlock.y,
                tmpLineEffect.rotation = Util.getRadian(this.spcialBlock.x,
                    this.spcialBlock.y, Block.x, Block.y) + 3.14,
                tmpLineEffect.alpha = 0,
                tmpLineEffect.tween.clear(),
                tmpLineEffect.tween.to(tmpLineEffect, .3, {
                    alpha: 1,
                    x: Block.x,
                    y: Block.y,
                    onCompleteParams: [tmpLineEffect.id, Block],
                    onComplete: function (t, i) {
                        3 > t
                            ? i.setSpecial(Util.randomNumber(2) + 1)
                            : t >= 3 && 6 > t ? i.setSpecial(4)
                            : i.setSpecial(3),
                            gc.game.specialBlockErase(i), self.removeEffect(t), self.removeBlock(t), self.showBlock(i, t)
                    }
                }),
                this.addChildAt(tmpLineEffect, 0),
                this.effects.push(tmpLineEffect),
                gc.effectSoundPlay("sound_charge_effect"),
                this.effectCount++,
                TweenMax.delayedCall(.1,
                    this.showEffect.bind(this), false)
        }
    },
    gc.HyperEffect.prototype.showBlock = function (Block, Count) {
        var tmpBlock;
        (tmpBlock = this.tmpBlocks.length
            ? this.tmpBlocks.shift()
            : new gc.HyperEffectBlock).init(Block),
            tmpBlock.id = Count,
            tmpBlock.x = Block.x,
            tmpBlock.y = Block.y,

            this.addChild(tmpBlock),
            this.blocks.push(tmpBlock)
    },
    gc.HyperEffect.prototype.removeEffect = function (Count) {
        var effect,
            i,
            n = this.effects.length;
        for (i = 0; n > i; i++)
            if ((effect = this.effects[i]).tween.clear(), effect.id == Count) {
                this.effects.splice(i, 1),
                    this.tmpEffects.push(effect),
                    this.removeChild(effect);
                break
            }
    },
    gc.HyperEffect.prototype.removeBlock = function (Count) {
        var block, i, n = this.blocks.length;
        for (i = 0; n > i; i++)
            if ((block = this.blocks[i]).removeAll(), block.id == Count) {
                this.blocks.splice(i, 1),
                    this.tmpBlocks.push(block),
                    this.removeChild(block);
                break
            }
        0 == --this.endCount && this.effectComplete()
    },
    gc.HyperEffect.prototype.effectComplete = function () {
        this.removeAll(),
            this.callFunc.call(this.target)
    },
    gc.HyperEffect.prototype.pause = function () {
        for (var t = this.effects.length; t--;)
            this.effects[t].tween.pause();

        for (t = this.blocks.length; t--;)
            this.blocks[t].pause()
    },
    gc.HyperEffect.prototype.resume = function () {
        for (var t = this.effects.length; t--;)
            this.effects[t].tween.resume();

        for (t = this.blocks.length; t--;)
            this.blocks[t].resume()
    },
    gc.HyperEffect.prototype.removeAll = function () {
        for (var t, effect, i = this.effects.length; i--;)
            effect = this.effects.shift(),
                this.tmpEffects.push(effect);

        for (i = this.blocks.length; i--;)
            t = this.blocks.shift(),
                this.tmpBlocks.push(t);

        this.spcialBlock.removeAll(),
            this.removeChildren()
    },
    gc.HyperEffect.prototype.updateTransform = function () {
        PIXI.Container.prototype.updateTransform.call(this)
    }