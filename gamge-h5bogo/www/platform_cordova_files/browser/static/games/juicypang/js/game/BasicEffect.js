gc.BasicEffect = function () {
    PIXI.Container.call(this),
        this.effects = [],
        this.tmpEffects = [],
        this.juices = [],
        this.tmpJuices = [],
        this.nums = [],
        this.tmpNums = [],
        this.effectCount = 0,
        this.effectContainer = new PIXI.Container,
        this.pointContainer = new PIXI.Container
},
    gc.BasicEffect.constructor = gc.BasicEffect,
    gc.BasicEffect.prototype = Object.create(PIXI.Container.prototype),
    gc.BasicEffect.prototype.init = function () {
        this.removeAll(), this.addChild(this.effectContainer), this.addChild(this.pointContainer)
    },
    gc.BasicEffect.prototype.show = function (block, pos, delay) {
        (block.type < 10
            || "ice" == block.type
            || 71 == block.type)

        && this.showEffect(block, pos, delay)
    },
    gc.BasicEffect.prototype.showEffect = function (specialBlock, newPos, delay) {
        var tmpEffect,
            self = this,
            basic = "basic_" + specialBlock.type + "_";

        "ice" == specialBlock.type && (basic = "ice_"),
        71 == specialBlock.type && (basic = "basic_7_"),
        specialBlock.isGhost && (basic = "ghost_"),
            this.tmpEffects.length
                ? (tmpEffect = this.tmpEffects.shift()).setAnimation(basic, 1, 12, .6)
                : (tmpEffect = new gc.MovieClip(basic, 1, 12, .6)).anchor.set(.5),
            tmpEffect.loop = false,
            tmpEffect.id = this.effectCount,
            tmpEffect.type = specialBlock.type,
            tmpEffect.blockPos = {
                x: specialBlock.x, y: specialBlock.y
            },
            tmpEffect.x = specialBlock.x,
            tmpEffect.y = specialBlock.y,
            tmpEffect.onComplete = function () {
                self.removeEffect(this.id)
            },
            tmpEffect.gotoAndPlay(0),
            this.effectContainer.addChild(tmpEffect),
            this.effects.push(tmpEffect),

            specialBlock.isGhost
                ? this.showGhost(tmpEffect.id, tmpEffect.blockPos, .1 + .05 * delay)
                : newPos && specialBlock.missionCount && this.showJuice(tmpEffect.type, this.effectCount, tmpEffect.blockPos, newPos, .1 + .05 * delay),
            this.effectCount++,
        specialBlock.type < 10 && this.showPoint(this.effectCount, specialBlock, 100)
    },
    gc.BasicEffect.prototype.showJuice = function (type, count, blockPos, newPos, delay) {
        var tmpJuice,
            img = "basic_" + type + ".png";

        "ice" == type && (img = "ice.png");
        71 == type && (img = "basic_7.png");

        this.tmpJuices.length
            ? (tmpJuice = this.tmpJuices.shift()).texture = PIXI.Texture.fromFrame(img)
            : (tmpJuice = new PIXI.Sprite.fromFrame(img)).anchor.set(.5),

            tmpJuice.id = count,
            tmpJuice.x = blockPos.x,
            tmpJuice.y = blockPos.y,
            tmpJuice.scale.set(.5),
            TweenMax.to(tmpJuice.scale, .7, {
                x: 1.5, y: 1.5, onComplete: function () {
                    TweenMax.to(tmpJuice.scale, .2, {x: 1, y: 1, ease: Sine.easeIn})
                }.bind(this)
            }),
            tmpJuice.xTween = new TimelineLite, tmpJuice.xTween.to(tmpJuice, .7, {
            x: newPos.x, delay: delay
        }),
            tmpJuice.yTween = new TimelineLite, tmpJuice.yTween.to(tmpJuice, .5, {
            y: newPos.y - 50, ease: Sine.easeOut, delay: delay
        }),
            tmpJuice.yTween.to(tmpJuice, .4, {
                y: newPos.y + 120, ease: Sine.easeIn, onCompleteParams: [tmpJuice.id],
                onComplete: this.removeJuice.bind(this)
            }),
            this.effectContainer.addChild(tmpJuice),
            this.juices.push(tmpJuice)
    },

    gc.BasicEffect.prototype.showPoint = function (count, blockPos, i) {
        var tmpNum;
        gc.isWebGL && (
            (
                tmpNum = this.tmpNums.length
                    ? this.tmpNums.shift()
                    : new gc.NumberText("ui_effect_score", "center", -2)
            ).id = count,

                tmpNum.x = blockPos.x,
                tmpNum.y = blockPos.y - 30,
                tmpNum.alpha = 1,
                tmpNum.scale.set(3),
                tmpNum.setValue(i),
                tmpNum.tween = new TimelineLite,
                tmpNum.tween.to(tmpNum.scale, .3, {
                    x: 1.2, y: 1.2, ease: Back.easeOut
                }),
                tmpNum.tween.to(tmpNum, .4, {
                    y: tmpNum.y - 50, alpha: 0, ease: Sine.easeIn, onCompleteParams: [tmpNum.id],
                    onComplete: this.removeNum.bind(this)
                }),
                this.pointContainer.addChild(tmpNum),
                this.nums.push(tmpNum))
    },
    gc.BasicEffect.prototype.showSpecialPoint = function (con, i) {
        this.showPoint(this.effectCount, con, i),
            this.effectCount++
    },
    gc.BasicEffect.prototype.showCoconutEffect = function (blockPos) {
        var tmpEffect,
            self = this,
            img = "basic_7_";
        this.tmpEffects.length
            ? (tmpEffect = this.tmpEffects.shift()).setAnimation(img, 1, 13, .6)
            : (tmpEffect = new gc.MovieClip(img, 1, 13, .4)).anchor.set(.5),
            tmpEffect.loop = false,
            tmpEffect.id = this.effectCount,
            tmpEffect.blockPos = {
                x: blockPos.x, y: blockPos.y
            },
            tmpEffect.x = blockPos.x,
            tmpEffect.y = blockPos.y,
            tmpEffect.onComplete = function () {
                self.removeEffect(this.id)
            },
            tmpEffect.gotoAndPlay(0),
            this.effectContainer.addChild(tmpEffect),
            this.effects.push(tmpEffect),
            this.effectCount++
    },
    gc.BasicEffect.prototype.removeEffect = function (count) {
        var effect,
            i,
            len = this.effects.length;
        for (i = 0; len > i; i++)
            if ((effect = this.effects[i]).stop(), effect.id == count) {
                this.effects.splice(i, 1),
                    this.tmpEffects.push(effect),
                    this.effectContainer.removeChild(effect);
                break
            }
    },
    gc.BasicEffect.prototype.removeJuice = function (count) {
        var juice,
            i,
            n = this.juices.length;
        for (i = 0; n > i; i++)
            if ((juice = this.juices[i]).id == count) {
                this.juices.splice(i, 1),
                    this.tmpJuices.push(juice),
                    this.effectContainer.removeChild(juice);
                break
            }
        gc.effectSoundPlay("sound_cup_charge")
    },
    gc.BasicEffect.prototype.removeNum = function (count) {
        var num, i, n = this.nums.length;
        for (i = 0; n > i; i++)
            if ((num = this.nums[i]).id == count) {
                this.nums.splice(i, 1),
                    this.tmpNums.push(num),
                    this.pointContainer.removeChild(num);
                break
            }
    },
    gc.BasicEffect.prototype.showGhost = function (count, pos, delay) {
        var tmpJuice, img = "ghost_0.png";

        this.tmpJuices.length
            ? (tmpJuice = this.tmpJuices.shift()).texture = PIXI.Texture.fromFrame(img)
            : (tmpJuice = new PIXI.Sprite.fromFrame(img)).anchor.set(.5),
            tmpJuice.id = count,
            tmpJuice.x = pos.x,
            tmpJuice.y = pos.y,
            tmpJuice.xTween = new TimelineLite,
            tmpJuice.xTween.to(tmpJuice, .5, {
                x: 100, delay: delay
            }),
            tmpJuice.yTween = new TimelineLite,
            tmpJuice.yTween.to(tmpJuice, .5, {
                y: 145, delay: delay, onCompleteParams: [tmpJuice.id], onComplete: function (t) {
                    gc.game.ui.lostMove(true), this.removeJuice(t)
                }.bind(this)
            }),
            this.effectContainer.addChild(tmpJuice),
            this.juices.push(tmpJuice)
    },
    gc.BasicEffect.prototype.pause = function () {
        for (var juice, e = this.effects.length; e--;)
            this.effects[e].stop();

        for (e = this.juices.length; e--;)
            (juice = this.juices[e]).xTween.pause(),
                juice.yTween.pause();

        for (e = this.nums.length; e--;)
            this.nums[e].tween.pause()
    },
    gc.BasicEffect.prototype.resume = function () {
        for (var juice, e = this.effects.length; e--;)
            this.effects[e].play();

        for (e = this.juices.length; e--;)
            (juice = this.juices[e]).xTween.resume(),
                juice.yTween.resume();

        for (e = this.nums.length; e--;)
            this.nums[e].tween.resume()
    },
    gc.BasicEffect.prototype.removeAllEffect = function () {
        for (var effect, e = this.effects.length; e--;)
            (effect = this.effects.shift()).stop(),
                this.tmpEffects.push(effect),
                this.effectContainer.removeChild(effect)
    },

    gc.BasicEffect.prototype.removeAllNums = function () {
        for (var num, e = this.nums.length; e--;)
            (num = this.nums.shift()).stop(),
                this.tmpNums.push(num),
                this.pointContainer.removeChild(num)
    },

    gc.BasicEffect.prototype.removeAll = function () {
        for (var juice, effect, num, l = this.effects.length; l--;)
            (effect = this.effects.shift()).stop(),
                this.tmpEffects.push(effect);

        for (l = this.juices.length; l--;)
            (juice = this.juices.shift()).xTween.clear(),
                juice.yTween.clear(), this.tmpJuices.push(juice);

        for (l = this.nums.length; l--;)
            (num = this.nums.shift()).tween.clear(),
                this.tmpNums.push(num);

        this.effectContainer.removeChildren(),
            this.pointContainer.removeChildren(),
            this.removeChildren()
    },

    gc.BasicEffect.prototype.updateTransform = function () {
        PIXI.Container.prototype.updateTransform.call(this)
    }