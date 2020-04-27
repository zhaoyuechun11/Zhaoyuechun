gc.CoconutEffect = function () {
    PIXI.Container.call(this),
        this.count = 0,
        this.showCount = 0,
        this.effectCount = 0,
        this.blocks = [],
        this.tmpBlocks = [],
        this.effects = [],
        this.tmpEffects = [],
        this.effect = new PIXI.Sprite.fromFrame("ui_moves_count.png"),
        this.effect.anchor.set(.5),
        this.effect.tween = new TimelineLite
},
    gc.CoconutEffect.constructor = gc.CoconutEffect,
    gc.CoconutEffect.prototype = Object.create(PIXI.Container.prototype),
    gc.CoconutEffect.prototype.init = function () {
        this.removeAll(),
            this.count = 0,
            this.showCount = 0,
            this.effectCount = 0
    },
    gc.CoconutEffect.prototype.add = function (t) {
        var block,
            i,
            n,
            blocks = gc.game.blocks,
            newBlocks = [];

        for (var i = 0; i < gc.H_TOTAL; i++)
            for (n = 0; n < gc.V_TOTAL; n++)
                (block = blocks[i][n]).type < 10 && 0 == block.specialType && newBlocks.push(block);

        if (Util.shuffle(newBlocks), newBlocks.length < t)
            for (var i = 0; i < gc.H_TOTAL; i++)
                for (n = 0; n < gc.V_TOTAL; n++) (block = blocks[i][n]).specialType > 0 && newBlocks.push(block);

        for (i = t; i--;) newBlocks.length > 0
        && (
            this.inAction(newBlocks.shift(), .2 * i),
                this.showCount++,
                gc.game.coconutCount++
        )
    },
    gc.CoconutEffect.prototype.inAction = function (con, delay, pos, life) {
        var tmpBlock,
            img = "block_coco1_1.png";
        this.tmpBlocks.length > 0
            ? (tmpBlock = this.tmpBlocks.shift()).texture = PIXI.Texture.fromFrame(img)
            : (tmpBlock = new PIXI.Sprite.fromFrame(img)).anchor.set(.5),

            pos ? (tmpBlock.x = pos.x, tmpBlock.y = pos.y) : (con.x > gc.width / 2 ? tmpBlock.x = -50 : tmpBlock.x = gc.width + 50, tmpBlock.y = con.y),
            tmpBlock.life = life || 3,
            tmpBlock.id = this.count,
            tmpBlock.rotation = 0,
            tmpBlock.xTween = new TimelineLite,
            tmpBlock.xTween.to(tmpBlock, .3, {
                x: con.x, delay: delay, ease: Power4.easeNone, onComplete: function () {
                    gc.effectSoundPlay("sound_coconut_enter")
                }
            }),
            tmpBlock.yTween = new TimelineLite, tmpBlock.yTween.to(tmpBlock, .2, {
            y: con.y - 300, delay: delay, ease: Sine.easeOut
        }),
            tmpBlock.yTween.to(tmpBlock, .2, {
                y: con.y, ease: Sine.easeIn, onComplete: this.outAction.bind(this), onCompleteParams: [con, tmpBlock]
            }),
            this.addChild(tmpBlock),
            this.blocks.push(tmpBlock),
            this.count++
    },
    gc.CoconutEffect.prototype.outAction = function (Effect, con) {
        this.showEffect(Effect.position),
            this.addChild(con),
            con.texture = PIXI.Texture.fromFrame("block_default" + Effect.type + "_1.png"),
            con.xTween.to(con, .4, {
                x: Effect.x + Util.randomNumber(100) - 50, rotation: Util.randomNumber(4) - 2
            }),
            con.yTween.to(con, .2, {y: Effect.y - 100, ease: Sine.easeOut}), con.yTween.to(con, .2, {
            y: gc.height + 50, ease: Sine.easeIn, onComplete: this.outComplete.bind(this), onCompleteParams: [con.id]
        }),
            Effect.init(Effect.hIndex, Effect.vIndex, 71, con.life)
    },
    gc.CoconutEffect.prototype.outComplete = function (count) {
        var block,  n = this.blocks.length;
        for (var i = 0; n > i; i++)
            if ((block = this.blocks[i]).id == count) {
                this.blocks.splice(i, 1),
                    this.tmpBlocks.push(block),
                    this.showCount--,
                0 == this.showCount && this.moveStart(true);
                break
            }
    },
    gc.CoconutEffect.prototype.showEffect = function (pos) {
        var tmpEffect;
        this.tmpEffects.length > 0
            ? tmpEffect = this.tmpEffects.shift()
            : (tmpEffect = new PIXI.Sprite.fromFrame("ui_moves_count.png")).anchor.set(.5),
            tmpEffect.scale.set(0),
            tmpEffect.id = this.effectCount,
            tmpEffect.x = pos.x,
            tmpEffect.y = pos.y,
            tmpEffect.tween = new TimelineLite,
            tmpEffect.tween.to(tmpEffect.scale, .25, {
                x: 1, y: 1, onCompleteParams: [tmpEffect.id], onComplete: this.removeEffect.bind(this)
            }),
            this.effects.push(tmpEffect),
            this.addChild(tmpEffect),
            this.effectCount++
    },
    gc.CoconutEffect.prototype.removeEffect = function (count) {
        var effect, n = this.effects.length;
        for (var i = 0; i < n; i++)
            if ((effect = this.effects[i]).id == count) {
                effect.tween.kill(),
                    this.effects.splice(i, 1),
                    this.tmpEffects.push(effect),
                    this.removeChild(effect);
                break
            }
    },
    gc.CoconutEffect.prototype.moveStart = function (isEmit) {
        var block,
            i,
            n,
            blocks = gc.game.blocks,
            newBlocks = [],
            wewBlocks = [];
        for (i = 0; i < gc.H_TOTAL; i++)
            71 == (block = blocks[i][0]).type && 0 == block.vIndex && newBlocks.push(block);

        for (i = 0; i < gc.H_TOTAL; i++)
            for (n = 1; n < gc.V_TOTAL; n++)
                (block = blocks[i][n]).type < 10 && 0 == block.specialType && wewBlocks.push(block);

        for (Util.shuffle(wewBlocks), i = 0; i < newBlocks.length; i++)
            block = newBlocks[i], this.inAction(wewBlocks[i], .2 * i, block.position, block.life),
                gc.game.deleteBlock(block),
                this.showCount++;

        return 0 == newBlocks.length && (isEmit && this.emit("COCONUT_EFFECT_COMPLETE_EVENT"), true)
    },

    gc.CoconutEffect.prototype.pause = function () {
        for (var block, e = this.blocks.length; e--;)
            (block = this.blocks[e]).xTween.pause(),
                block.yTween.pause();

        this.effect.tween.pause()
    },
    gc.CoconutEffect.prototype.resume = function () {
        for (var block, e = this.blocks.length; e--;)
            (block = this.blocks[e]).xTween.resume(),
                block.yTween.resume();

        this.effect.tween.resume()
    },
    gc.CoconutEffect.prototype.removeAll = function () {
        for (var block, effect, i = this.blocks.length; i--;)
            block = this.blocks.shift(),
                this.tmpBlocks.push(block),
                block.xTween.kill(),
                block.yTween.kill();

        for (i = this.effects.length; i--;)
            (effect = this.effects.shift()).tween.kill(),
                this.tmpEffects.push(effect);

        this.effect.tween.kill(),
            this.removeChildren()
    },

    gc.CoconutEffect.prototype.updateTransform = function () {
        PIXI.Container.prototype.updateTransform.call(this)
    }