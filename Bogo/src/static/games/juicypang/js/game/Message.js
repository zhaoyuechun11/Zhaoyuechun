gc.Message = function () {
    PIXI.Container.call(this),
        this.isEffect = false,
        this.effectType = 0,
        this.effectCount = 0,
        this.type = null,
        this.tween = null,
        this.callFunc = null,
        this.target = null,
        this.effects = [],
        this.tmpEffects = [],
        this.darkBg = new PIXI.Graphics,
        this.darkBg.lineStyle(1, 0, 1),
        this.darkBg.beginFill(0, .8),
        this.darkBg.drawRect(0, 0, gc.width, gc.height),
        this.darkBg.endFill(),
        this.icon = new PIXI.Sprite.fromFrame("Special1_fruits.png"),
        this.icon.anchor.set(.5),
        this.icon.x = gc.width / 2,
        this.txt = new PIXI.Sprite.fromFrame("game_text_start.png"),
        this.txt.anchor.set(.5),
        this.txt.x = gc.width / 2,
        this.tween = new TimelineLite,
        this.tween2 = new TimelineLite
},
    gc.Message.constructor = gc.Message,
    gc.Message.prototype = Object.create(PIXI.Container.prototype),
    gc.Message.prototype.init = function () {
        this.removeAll(),
            this.isEffect = false,
            this.effectCount = 0
    },
    gc.Message.prototype.show = function (type, callFunc, target) {
        this.type = type,
            this.callFunc = callFunc,
            this.target = target,
            this.effectType = 0;
        var n, r,
            o = false;

        switch (type) {
            case"start":
                n = "game_text_start.png",
                    gc.effectSoundPlay("sound_start");
                break;
            case"end":
                n = "game_text_gameover.png",
                    gc.effectSoundPlay("sound_gameover");
                break;
            case"juicy":
                n = "game_text_block1.png",
                    gc.effectSoundPlay("sound_juicy");
                break;
            case"great":
                this.effectType = 1, n = "game_text_block2.png",
                    gc.effectSoundPlay("sound_great");
                break;
            case"happy":
                this.effectType = 2, n = "game_text_block3.png",
                    gc.effectSoundPlay("sound_happy");
                break;
            case"wonderful":
                this.effectType = 3, n = "game_text_block4.png",
                    gc.effectSoundPlay("sound_wonderful");
                break;
            case"cocktail":
                o = true, n = "game_text_Special1.png", r = "Special1_fruits.png";
                break;
            case"special":
                o = true, n = "game_text_Special2.png", r = "Special2_Special.png";
                break;
            case"slush":
                o = true, n = "game_text_Special3.png", r = "Special3_gamen.png";
                break;
            case"allClear":
                n = "game_text_all.png",
                    gc.effectSoundPlay("sound_allclear")
        }

        o ? (this.addChild(this.darkBg),
                this.addChild(this.icon),
                this.txt.y = 700,
                this.icon.texture = PIXI.Texture.fromFrame(r),
                this.icon.scale.set(1),
                this.icon.y = 0,
                this.tween2 = new TimelineLite,
                this.tween2.to(this.icon, .6, {
                    y: 500, ease: Bounce.easeOut
                }),
                this.tween2.to(this.icon.scale, .2, {
                    x: 0, y: 0, delay: .4, ease: Back.easeIn
                }))

            : this.txt.y = gc.height / 2,
            this.txt.texture = PIXI.Texture.fromFrame(n),
            this.addChild(this.txt),
            this.tween = new TimelineLite,
        this.effectType > 0 && (this.isEffect = true),
            3 == this.effectType
                ? (this.txt.scale.set(1),
                    this.txt.y = gc.height - 200,
                    this.tween.to(this.txt, .3, {y: 500}),
                    this.tween.to(this.txt, .3, {
                        y: -100, delay: .6, ease: Back.easeIn, onCompleteParams: [o],
                        onComplete: this.removeMessage.bind(this)
                    }))
                : (this.txt.scale.set(.1),
                    this.tween.to(this.txt.scale, .1, {
                        x: .5, y: 1.5, ease: Power0.easeNone
                    }),
                    this.tween.to(this.txt.scale, .5, {x: 1, y: 1, ease: Elastic.easeOut}),
                    this.tween.to(this.txt.scale, .2, {
                        x: 0, y: 0, delay: .4, ease: Back.easeIn, onStart: function () {
                            this.isEffect = false
                        }.bind(this), onCompleteParams: [o], onComplete: this.removeMessage.bind(this)
                    }))
    },

    gc.Message.prototype.removeMessage = function (isRemove) {
        this.isEffect = false,
            this.removeChild(this.txt),
        isRemove && (this.removeChild(this.darkBg), this.removeChild(this.icon)),
        this.callFunc && this.callFunc.call(this.target)
    },

    gc.Message.prototype.addEffect = function () {
        this.effectCount = 0,
            this.tmpEffects.length
                ? (eff = this.tmpEffects.shift(), eff.texture = PIXI.Texture.fromFrame("ui_effect_text1.png"))
                : (eff = new PIXI.Sprite.fromFrame("ui_effect_text1.png"), eff.anchor.set(.5)),

            eff.scale.set((Util.randomNumber(20) + 5) / 100),
            eff.alpha = Math.random() + 1,
            1 == this.effectType
                ? (eff.tr = 0, eff.tx = 0, eff.ty = 0, eff.x = gc.width / 2 - 500 * Math.random() + 250, eff.y = this.txt.y + 200 * Math.random() - 100)
                : 2 == this.effectType
                ? (Util.randomNumber(2)
                    ? (eff.tx = 3 * Math.random() + 3, eff.tr = Math.random() / 3, eff.x = gc.width / 2 + 200 * Math.random())
                    : (eff.tx = 3 * -Math.random() - 3, eff.tr = -Math.random() / 3, eff.x = gc.width / 2 - 200 * Math.random()),
                    eff.ty = 0,
                    eff.y = this.txt.y + 40 * Math.random() + 30)
                : 3 == this.effectType
                && (eff.texture = PIXI.Texture.fromFrame("ui_effect_text" + (Util.randomNumber(5) + 1) + ".png"),
                    eff.tr = (2 * Math.random() - 1) / 3,
                    eff.tx = 6 * Math.random() - 3,
                    eff.ty = 2 * Math.random() + 3,
                    eff.x = gc.width / 2 - 500 * Math.random() + 250,
                    eff.y = this.txt.y + 80 * Math.random() - 20,
                    eff.scale.set((Util.randomNumber(20) + 5) / 70)),

            Util.randomNumber(2)
                ? this.addChildAt(eff, 0)
                : this.addChild(eff),

            this.effects.push(eff)
    },
    gc.Message.prototype.pause = function () {
        this.tween.pause(),
            this.tween2.pause()
    },
    gc.Message.prototype.resume = function () {
        this.tween.resume(),
            this.tween2.resume()
    },
    gc.Message.prototype.removeAll = function () {
        for (var effect, e = this.effects.length; e--;)
            effect = this.effects.shift(),
                this.tmpEffects.push(effect),
                this.removeChild(effect);
        this.removeChildren(),
            this.tween.kill(),
            this.tween2.kill()
    },

    gc.Message.prototype.updateTransform = function () {

        if (gc.isPlay && gc.isWebGL) {
            for (var effect, e = this.effects.length; e--;) {
                effect = this.effects[e];
                effect.rotation += effect.tr,
                    effect.x += effect.tx,
                    effect.y += effect.ty,
                    effect.alpha -= .03,
                effect.alpha <= 0 && (this.effects.splice(e, 1),
                    this.tmpEffects.push(effect),
                    this.removeChild(effect));
            }


            if (this.isEffect)
                for (e = 1 == this.effectType ? 2 : 6; e--;)
                    3 == ++this.effectCount && this.addEffect()
        }

        PIXI.Container.prototype.updateTransform.call(this)
    }