gc.JuiceItem = function () {
    PIXI.Container.call(this),
        this.effects = [],
        this.tmpEffects = [],
        this.specialType = [],
        this.juiceValue = 0,
        this.juiceTotal = null,
        this.juiceGaugeEffect = new PIXI.Sprite.fromFrame("charge_effect.png"),
        this.juiceGaugeEffect.anchor.set(.5),
        this.juiceGaugeEffect.scale.set(1.1),
        this.juiceGaugeEffect.tween = new TimelineLite,
        this.juiceGauge = new PIXI.Sprite.fromFrame("charge_1.png"),
        this.juiceGauge.anchor.set(.5),
        this.setTouchStartAction(this.juiceGauge, null, null, true),
        this.setTouchEnd(this.juiceGauge, function () {
                gc.isMove || gc.isUseItem || (gc.juicyItem == gc.juicyItemTotal ? !gc.isPlay || gc.isDrag || gc.isMove || gc.isUseItem || (this.emit("USE_JUICE_ITEM_EVENT"),
                    this.stopJuiceAni(),
                    this.setEffect(false),
                    this.setInteractive(false),
                    this.show()) : (this.setInteractive(false),
                    this.emit("MISSION_HELP_EVENT", {type: 100})))
            },
            this),
        this.juice = new PIXI.Sprite.fromFrame("charge_pack.png"),
        this.juice.anchor.set(.5),
        this.juice.tween = new TimelineLite,
        this.juice.tween2 = new TimelineLite,
        this.juiceGauge.addChild(this.juice),
        this.valueTween = new TimelineLite,
        this.targetList = [],
        this.effectCount = 0,
        this.endCount = 2
},
    gc.JuiceItem.constructor = gc.JuiceItem,
    gc.JuiceItem.prototype = Object.create(PIXI.Container.prototype),
    gc.JuiceItem.prototype.init = function () {
        this.removeAll(),
            this.juiceTotal = gc.juicyItemTotal,
            this.juiceValue = gc.juicyItem,
        this.juiceValue > gc.juicyItemTotal && (this.juiceValue = gc.juicyItem = gc.juicyItemTotal),
            this.juice.ty = 0,
            this.juiceGauge.texture = PIXI.Texture.fromFrame("charge2_1.png"),
            this.juiceGauge.scale.set(1),
            this.juiceGaugeEffect.alpha = 0,
            this.addChild(this.juiceGaugeEffect),
            this.addChild(this.juiceGauge),
            this.juice.tween = new TimelineLite,
            this.juice.tween2 = new TimelineLite,
            this.valueTween = new TimelineLite,
            this.setKegImg(false),
            this.playJuiceAni(),
            this.playGaugeAni(),
            this.setInteractive(true)
    },
    gc.JuiceItem.prototype.playJuiceAni = function () {
        this.juice.scale.set(1),
            this.juice.tween.clear(),
            this.juice.tween.to(this.juice.scale, .2, {
                x: .9, y: 1.1, delay: 2
            }),
            this.juice.tween.to(this.juice.scale, .3, {x: 1.1, y: .9}),
            this.juice.tween.to(this.juice.scale, .1, {
                x: 1, y: 1, onComplete: this.playJuiceAni.bind(this)
            }),
            this.juice.y = this.juice.ty,
            gc.juicyItem == this.juiceTotal ? (this.juice.tween2.clear(),
                this.juice.tween2.to(this.juice, .2, {
                    y: -50 + this.juice.ty, delay: 2
                }),
                this.juice.tween2.to(this.juice, .3, {
                    y: .9 + this.juice.ty, ease: Sine.easeIn
                }),
                this.setKegImg(true)) : this.setKegImg(false)
    },
    gc.JuiceItem.prototype.stopJuiceAni = function () {
        this.juice.tween.clear(),
            this.juice.tween2.clear(),
            this.juice.scale.set(1),
            this.juice.y = this.juice.ty
    },
    gc.JuiceItem.prototype.show = function () {
        this.effectCount = 0,
            this.targetList = [],
            this.specialType = [],
            this.showEffect()
    },
    gc.JuiceItem.prototype.setKegImg = function (pack) {
        var img = "charge_pack2";
        pack && (img = "charge_pack"),
            this.juice.texture = PIXI.Texture.fromFrame(img + ".png")
    },
    gc.JuiceItem.prototype.addJuice = function (juicyItem) {
        gc.juicyItem != this.juiceTotal && (gc.juicyItem += juicyItem,
        gc.juicyItem > this.juiceTotal && (gc.juicyItem = this.juiceTotal),
            this.playGaugeAni(),
            this.playJuiceAni())
    },
    gc.JuiceItem.prototype.playGaugeAni = function () {
        this.valueTween.clear(),
            this.valueTween.to(this, .01 * Math.abs(gc.juicyItem - this.juiceValue), {
                juiceValue: gc.juicyItem, ease: Power0.easeNone, onUpdate: this.setJuiceGauge.bind(this)
            })
    },
    gc.JuiceItem.prototype.setJuiceGauge = function () {
        var t = Math.floor(this.juiceValue / this.juiceTotal * 20) + 1;
        this.juiceGauge.texture = PIXI.Texture.fromFrame("charge_" + t + ".png"), 21 == t && this.setEffect(true)
    },
    gc.JuiceItem.prototype.setEffect = function (isTween) {
        isTween ? (this.juiceGaugeEffect.alpha = 0,
                this.juiceGaugeEffect.tween = new TimelineLite,
                this.juiceGaugeEffect.tween.to(this.juiceGaugeEffect, .5, {
                    alpha: 1, yoyo: true, repeat: -1
                }))
            : (this.juiceGaugeEffect.alpha = 0,
                this.juiceGaugeEffect.tween.clear())
    },

    gc.JuiceItem.prototype.showEffect = function () {
        var t, e, i, n,
            r = Util.shuffle([1, 2, 3, 4]),
            o = this.getTypeList(),
            s = [],

            a = gc.missionList[gc.level - 1].length;

        if (o.length) {
            for (this.endCount = 2; a--;)
                if ((i = gc.game.ui["cup" + (a + 1)]).targetPer < i.totalPer) {
                    if (n = true, i.type > 50)
                        if (t = o.shift(), i.type > 50 && i.type < 60)
                            switch (i.type) {
                                case 51:
                                    e = Util.randomNumber(2) + 1;
                                    break;
                                case 52:
                                    e = 4;
                                    break;
                                case 53:
                                    e = 3
                            }
                        else e = r.shift();

                    else t = i.type % 10,
                        n = this.deleteType(o, t),
                        e = i.type > 10 && i.type < 50 ? Math.floor(i.type / 10) : r.shift();
                    n && s.push({type: t, specialType: e})
                }
            var h = 0;
            for (a = 0; a < this.endCount; a++) s.length > a && 0 == h
                ? (this.targetList.push(this.getBlockByType(s[a].type)),
                    this.specialType.push(s[a].specialType), h++)
                : (this.targetList.push(this.getBlockByType(o.shift())),
                    s.length > a
                        ? this.specialType.push(s[a].specialType)
                        : this.specialType.push(r.shift()));
            this.showJuiceEffect()
        } else this.effectComplete()
    },
    gc.JuiceItem.prototype.getTypeList = function () {
        var t, e, i, n = [];
        for (t = 0; t < gc.H_TOTAL; t++)
            for (e = 0; e < gc.V_TOTAL; e++)
                (i = gc.game.blocks[t][e]).type < 10 && 0 == i.specialType && n.push(i.type);
        return Util.uniqueArray(n)
    },
    gc.JuiceItem.prototype.deleteType = function (t, e) {
        for (var i = t.length; i--;)
            if (t[i] == e) return t.splice(i, 1), true;
        return false
    },
    gc.JuiceItem.prototype.getBlockByType = function (type) {
        var e, i, n, r = [];
        for (e = 0; e < gc.H_TOTAL; e++)
            for (i = 0; i < gc.V_TOTAL; i++)
                (n = gc.game.blocks[e][i]).type < 10 && 0 == n.specialType && n.type == type && r.push(n);
        return Util.shuffle(r), r.shift()
    },
    gc.JuiceItem.prototype.showJuiceEffect = function () {
        if (this.targetList.length > 0) {
            var sprite, target = this.targetList.shift();
            this.tmpEffects.length
                ? sprite = this.tmpEffects.shift()
                : ((sprite = new PIXI.Sprite.fromFrame("hyper_2.png")).anchor.set(.5, 0),
                    sprite.tween = new TimelineLite),
                sprite.id = this.effectCount,
                sprite.rotation = Util.getRadian(this.x, this.y, target.x, target.y) + 3.14,
                sprite.alpha = .5,
                sprite.block = target,
                sprite.x = 0,
                sprite.y = 0,
                sprite.tween.clear(),
                sprite.tween.to(sprite, .3, {
                    alpha: 1, x: target.x - this.x, y: target.y - this.y, onCompleteParams: [sprite.id, target],
                    onComplete: function (t, e) {
                        this.removeEffect(t), e.setSpecial(this.specialType.shift(), true),
                        this.endCount == t + 1 && this.effectComplete()
                    }.bind(this)
                }),
                this.addChild(sprite),
                this.effects.push(sprite),
                gc.effectSoundPlay("sound_charge_effect")
        }
        this.effectCount++,
        this.effectCount < this.endCount && TweenMax.delayedCall(.2,
            this.showJuiceEffect.bind(this))
    },
    gc.JuiceItem.prototype.removeEffect = function (id) {
        var effect, i, n = this.effects.length;
        for (i = 0; n > i; i++) if ((effect = this.effects[i]).tween.clear(), effect.id == id) {
            this.effects.splice(i, 1),
                this.tmpEffects.push(effect),
                this.removeChild(effect);
            break
        }
    },
    gc.JuiceItem.prototype.effectComplete = function () {
        gc.juicyItem = 0,
            this.playGaugeAni(),
            this.playJuiceAni(),
            this.setInteractive(true),
            this.setEffect(false),
            this.emit("END_JUICE_ITEM_EVENT"),
            this.juiceGauge.scale.set(1)
    },
    gc.JuiceItem.prototype.pause = function () {
        for (var t = this.effects.length; t--;) this.effects[t].tween.resume();
        this.juice.tween.resume(),
            this.juice.tween2.resume(),
            this.juiceGaugeEffect.tween.resume(),
            this.valueTween.resume()
    },
    gc.JuiceItem.prototype.resume = function () {
        for (var t = this.effects.length; t--;) this.effects[t].tween.resume();
        this.juice.tween.resume(),
            this.juice.tween2.resume(),
            this.juiceGaugeEffect.tween.resume(),
            this.valueTween.resume()
    },
    gc.JuiceItem.prototype.removeAll = function () {
        for (var t, e = this.effects.length; e--;) (t = this.effects.shift()).tween.kill(),
            this.tmpEffects.push(t);
        this.juice.tween.kill(),
            this.juice.tween2.kill(),
            this.juiceGaugeEffect.tween.kill(),
            this.valueTween.kill(),
            this.removeChildren()
    },
    gc.JuiceItem.prototype.setInteractive = function (interactive) {
        this.juiceGauge.interactive = interactive
    },
    gc.JuiceItem.prototype.updateTransform = function () {
        PIXI.Container.prototype.updateTransform.call(this)
    }