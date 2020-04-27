gc.Block = function () {
    PIXI.Container.call(this),
        this.hIndex = null,
        this.vIndex = null,
        this.type = null,
        this.isDrag = false,
        this.isCombine = false,
        this.isSpecialCombine = false,
        this.isSpecialCombine2 = false,
        this.isObstacleSelect = false,
        this.isIce = false,
        this.isGhost = false,
        this.coconutLife = 3,
        this.missionCount = 1,
        this.life = 1,
        this.specialType = 0,
        this.ty = null,
        this.bombType = 0,
        this.point = 0,
        this.aniCount = 0,
        this.aniInterval = null,
        this.coconutInterval = null,
        this.ghostInterval = null,
        this.sCombindEffect1 = new PIXI.Sprite.fromFrame("wait_1.png"),
        this.sCombindEffect1.anchor.set(.5),
        this.sCombindEffect1.tween = new TimelineLite,
        this.sCombindEffect2 = new PIXI.Sprite.fromFrame("wait_1.png"),
        this.sCombindEffect2.anchor.set(.5),
        this.sCombindEffect2.tween = new TimelineLite,
        this.selectBox = new PIXI.Sprite.fromFrame("ui_block_select.png"),
        this.selectBox.x = -3, this.selectBox.anchor.set(.5),
        this.coconutAni = new gc.MovieClip("block_coco_", 1, 4, .4),
        this.coconutAni.loop = false,
        this.coconutAni.onComplete = this.coconutAniPlay.bind(this),
        this.coconutAni.anchor.set(.5),
        this.coconutAni.stop(),
        this.ghostAni = new gc.MovieClip("block_ghost_", 1, 9, .2),
        this.ghostAni.loop = false,
        this.ghostAni.onComplete = this.ghostAniPlay.bind(this),
        this.ghostAni.anchor.set(.5),
        this.ghostAni.stop(),
        this.moveTween = new TimelineLite,
        this.aniTween = new TimelineLite,
        this.selectTween = new TimelineLite,
        this.block = new PIXI.Sprite.fromFrame("block_default1_1.png"),
        this.block.anchor.set(.5)
},
    gc.Block.constructor = gc.Block,
    gc.Block.prototype = Object.create(PIXI.Container.prototype),
    gc.Block.prototype.init = function (hIndex, vIndex, type, life, showAni, specialType) {
        this.removeAll(),
            this.isDrag = false,
            this.isCombine = false,
            this.isSpecialCombine = false,
            this.isSpecialCombine2 = false,
            this.isObstacleSelect = false,
            this.isGhost = false,
            this.isIce = false,
            this.specialType = 0 | specialType,
            this.missionCount = 1,
            this.bombType = 0,
            this.point = 0,
            this.type = type,
            this.hIndex = hIndex,
            this.vIndex = vIndex,
            this.block.tint = 16777215,
            life ? this.life = life : 71 == this.type ? this.life = this.coconutLife : this.life = 1,
            this.sCombindEffect1.visible = false,
            this.sCombindEffect2.visible = false,
            this.coconutAni.visible = false,
            this.ghostAni.visible = false,
            this.selectBox.visible = false,
            this.addChild(this.sCombindEffect1),
            this.addChild(this.sCombindEffect2),
            this.type >= 10 || 71 == this.type
                ? this.setType(this.type, this.specialType)
                : (
                    this.block.texture = PIXI.Texture.fromFrame("block_default" + this.type + "_1.png"),
                        this.addChild(this.block),
                        this.setBlockAni()
                ),

            this.addChild(this.coconutAni),
            this.addChild(this.ghostAni),
            this.addChild(this.selectBox),
        showAni && this.showAni(),
            this.setInteractive(true)
    },
    gc.Block.prototype.setType = function (type, special) {
        this.removeAll(),
            this.aniCount = 1,
            this.specialType = 0,
            this.addChild(this.sCombindEffect1),
            this.addChild(this.sCombindEffect2),
            this.addChild(this.block),
            this.addChild(this.coconutAni),
            this.addChild(this.ghostAni),
            this.addChild(this.selectBox),
            this.setBlockImg(type, special),
            this.setInteractive(true)
    },
    gc.Block.prototype.setBlockImg = function (type, special) {
        this.type = type,
            special
                ? (this.setSpecial(special), this.playSpecialBlockAni())
                : 10 == type
                ? this.block.texture = PIXI.Texture.fromFrame("block_disturb_1.png")
                : 71 == type
                    ? (this.block.texture = PIXI.Texture.fromFrame("block_coco" + (this.coconutLife + 1 - this.life) + "_1.png"), this.coconutAniPlay())
                    : this.isGhost
                        ? this.block.texture = PIXI.Texture.fromFrame("block_ghost" + this.type + "_1.png")
                        : this.block.texture = PIXI.Texture.fromFrame("block_default" + this.type + "_1.png"),
            this.setBlockAni(),
            this.stopDamageMotion()
    },
    gc.Block.prototype.setBlockAni = function () {
        if (this.aniInterval && clearTimeout(this.aniInterval), 0 != this.life) {
            var t = 100;
            6 == this.specialType && this.aniCount < 9
                ? this.aniCount++ : 1 == this.aniCount
                ? this.aniCount = 2 : (this.aniCount = 1, t = 100 * Util.randomNumber(300) + 3e3),
                this.specialType > 0
                    ? this.specialType < 3
                    ? this.block.texture = PIXI.Texture.fromFrame(gc.BLOCK_NAME[this.specialType] + this.type + ".png")
                    : this.block.texture = PIXI.Texture.fromFrame(gc.BLOCK_NAME[this.specialType] + this.type + "_" + this.aniCount + ".png")
                    : 10 == this.type
                    ? this.block.texture = PIXI.Texture.fromFrame("block_disturb_" + this.aniCount + ".png")
                    : 71 == this.type
                        ? this.block.texture = PIXI.Texture.fromFrame("block_coco" + (this.coconutLife + 1 - this.life) + "_1.png")
                        : this.isGhost
                            ? this.block.texture = PIXI.Texture.fromFrame("block_ghost" + this.type + "_1.png")
                            : this.block.texture = PIXI.Texture.fromFrame("block_default" + this.type + "_" + this.aniCount + ".png"),
            (this.specialType < 1 || this.specialType > 2) && (this.aniInterval = setTimeout(this.setBlockAni.bind(this), t))
        }
    },
    gc.Block.prototype.playDamageMotion = function () {
        var rotation = .1;
        Util.randomNumber(2) && (rotation = -.1),
            TweenMax.to(this.block, .2, {
                rotation: rotation, yoyo: true, repeat: -1, ease: Power0.easeNone
            })
    },
    gc.Block.prototype.stopDamageMotion = function () {
        this.block.rotation = 0,
            TweenMax.killTweensOf(this.block)
    },
    gc.Block.prototype.setObstacle = function () {
        TweenMax.delayedCall(.5, function () {
            this.setType(10),
                this.life = 1,
                2 == gc.game.iceBlock.getIceBlockHealth(this.hIndex, this.vIndex)
                    ? (this.isIce = false, this.setIce(true))
                    : (this.block.scale.set(2),
                        this.aniTween = new TimelineLite,
                        this.aniTween.to(this.block.scale, 1, {
                            x: 1, y: 1, ease: Elastic.easeOut
                        })),
                this.setInteractive(true)
        }.bind(this)),
            this.stopDamageMotion()
    },
    gc.Block.prototype.setSpecial = function (specialType, isScale) {
        specialType && (
            this.specialType = specialType,
                this.isSpecialCombine = false,
                this.isCombine = false,
                this.point = 1,
                this.life = 1,
            this.isGhost && (gc.game.basicEffect.show(this, this.position, 0), this.isGhost = false, this.ghostAni.stop(), this.ghostAni.visible = false),
                this.setBlockAni(),
                this.stopDamageMotion(),
            3 == this.specialType && this.allBlockAni(),

            isScale && (
                this.block.scale.set(2),
                    this.aniTween = new TimelineLite,
                    this.aniTween.to(this.block.scale, 1, {
                        x: 1, y: 1, ease: Elastic.easeOut, onComplete: this.playSpecialBlockAni.bind(this)
                    })),

                5 == specialType
                    ? gc.effectSoundPlay("sound_hyper")
                    : gc.effectSoundPlay("sound_special"))
    },
    gc.Block.prototype.allBlockAni = function () {
        this.sCombindEffect1.texture = PIXI.Texture.fromFrame("block_glory_1.png"),
            this.sCombindEffect2.texture = PIXI.Texture.fromFrame("block_glory_2.png"),
            this.sCombindEffect1.visible = true,
            this.sCombindEffect2.visible = true,
            this.sCombindEffect1.rotation = 0,
            this.sCombindEffect1.tween.clear(),
            this.sCombindEffect1.tween = new TimelineLite,
            this.sCombindEffect1.tween.to(this.sCombindEffect1, 2, {
                rotation: Util.radiansToDegrees(180), ease: Power0.easeNone, repeat: -1
            }),
            this.sCombindEffect2.rotation = 0,
            this.sCombindEffect2.tween.clear(),
            this.sCombindEffect2.tween = new TimelineLite,
            this.sCombindEffect2.tween.to(this.sCombindEffect2, 2, {
                rotation: Util.radiansToDegrees(-180), ease: Power0.easeNone, repeat: -1
            })
    },
    gc.Block.prototype.playSpecialBlockAni = function () {
        1 == this.specialType
            ? (this.block.scale.set(1), this.aniTween = new TimelineLite, this.aniTween.to(this.block.scale, .3, {
                x: 1.2, ease: Sine.easeOut, yoyo: true, repeat: -1
            }))
            : 2 == this.specialType ? (this.block.scale.set(1), this.aniTween = new TimelineLite, this.aniTween.to(this.block.scale, .3, {
                y: 1.2, ease: Sine.easeOut, yoyo: true, repeat: -1
            }))
            : 3 == this.specialType || 4 == this.specialType && (this.block.scale.set(1), this.aniTween = new TimelineLite, this.aniTween.to(this.block.scale, .3, {
                x: .9, y: .9, ease: Sine.easeOut, yoyo: true, repeat: -1
            }))
    },
    gc.Block.prototype.specialCombine = function () {
        if (this.isSpecialCombine = true, this.isSpecialCombine2)
            this.setCombineBlock();
        else if (this.specialType > 0 && this.specialType < 5) {
            var img;
            switch (this.specialType) {
                case 1:
                    img = "wait_slice2_" + this.type;
                    break;
                case 2:
                    img = "wait_slice1_" + this.type;
                    break;
                case 3:
                    img = "wait_glory" + this.type;
                    break;
                case 4:
                    img = "wait_big" + this.type
            }
            this.block.texture = PIXI.Texture.fromFrame(img + ".png"),
                this.block.scale.set(1), this.aniTween.clear()
        }
        this.sCombindEffect1.texture = PIXI.Texture.fromFrame("wait_1.png"),
            this.sCombindEffect2.texture = PIXI.Texture.fromFrame("wait_2.png"),
            this.sCombindEffect1.visible = true,
            this.sCombindEffect2.visible = true,
            this.sCombindEffect1.rotation = 0,
            this.sCombindEffect1.tween.clear(),
            this.sCombindEffect1.tween = new TimelineLite,
            this.sCombindEffect1.tween.to(this.sCombindEffect1, 2, {
                rotation: Util.radiansToDegrees(180), ease: Power0.easeNone, repeat: -1
            }),
            this.sCombindEffect2.rotation = 0,
            this.sCombindEffect2.tween.clear(),
            this.sCombindEffect2.tween = new TimelineLite,
            this.sCombindEffect2.tween.to(this.sCombindEffect2, 2, {
                rotation: Util.radiansToDegrees(-180), ease: Power0.easeNone, repeat: -1
            })
    },
    gc.Block.prototype.setIce = function (isIce) {
        if (this.isIce && !isIce)
            this.setBlockImg(this.type, this.specialType);
        else if (isIce) {
            var img;
            if (this.aniInterval && clearTimeout(this.aniInterval),
            this.specialType > 0)
                switch (this.aniTween.clear(), this.block.scale.set(1), this.specialType) {
                    case 1:
                        img = "iceBlock_slice2_" + this.type;
                        break;
                    case 2:
                        img = "iceBlock_slice1_" + this.type;
                        break;
                    case 3:
                        img = "block_default" + this.type + "_3",
                            this.sCombindEffect1.tween.clear(),
                            this.sCombindEffect2.tween.clear(),
                            this.sCombindEffect1.visible = false,
                            this.sCombindEffect2.visible = false,
                            this.allBlockAni();
                        break;
                    case 4:
                        img = "block_big" + this.type + "_3";
                        break;
                    case 5:
                        img = "block_gold" + this.type + "_1"
                }
            else 71 == this.type
                ? img = "block_coco" + (this.coconutLife + 1 - this.life) + "_3"
                : this.isGhost
                    ? img = "block_ghost" + this.type + "_3"
                    : (img = "block_default" + this.type + "_3", 10 == this.type && (img = "block_disturb_3"));

            this.block.texture = PIXI.Texture.fromFrame(img + ".png")
        }
        this.isIce = isIce,
            this.stopDamageMotion()
    },

    gc.Block.prototype.setGhost = function () {
        this.isGhost = true,
            this.setBlockImg(this.type, 0),
            this.ghostAniPlay()
    },
    gc.Block.prototype.resetGhost = function () {
        this.isGhost = false,
            this.missionCount = 0
    },

    gc.Block.prototype.loseLife = function (t) {
        if (this.life > 0)
            if (this.life--, 0 == this.life && 0 == this.specialType)
                if (this.isCombine = true, 71 == this.type)
                    gc.game.coconutCount--,
                        this.block.texture = PIXI.Texture.fromFrame("block_coco4_4.png"),
                        gc.game.basicEffect.showSpecialPoint(this, 6e3);
                else {
                    var e = "block_default" + this.type + "_4";
                    10 == this.type && (e = "block_disturb_4"),
                        this.block.texture = PIXI.Texture.fromFrame(e + ".png"),
                        this.playDamageMotion()
                }
            else 71 == this.type && (t || (t = .4),
                TweenMax.delayedCall(t, function () {
                    71 == this.type && (gc.game.basicEffect.showCoconutEffect(this),
                        this.block.texture = PIXI.Texture.fromFrame("block_coco" + (this.coconutLife + 1 - this.life) + "_1.png"),
                        this.coconutAniPlay())
                }.bind(this)))
    },
    gc.Block.prototype.coconutAniPlay = function () {
        if (this.coconutAni.visible = false, this.life < this.coconutLife) {
            this.coconutInterval && this.coconutInterval.kill(),
                this.coconutInterval = TweenMax.delayedCall(1, function () {
                    71 == this.type && (this.coconutAni.gotoAndPlay(0),
                        this.coconutAni.y = -10 * this.life - 15,
                        this.coconutAni.visible = true)
                }.bind(this))
        }
    },
    gc.Block.prototype.ghostAniPlay = function () {
        if (this.isGhost) {
            this.ghostAni.visible = true,
                this.ghostAni.gotoAndStop(0);
            var t = .1 * (Util.randomNumber(10) + 10);
            this.ghostInterval && this.ghostInterval.kill(),
                this.ghostInterval = TweenMax.delayedCall(t, function () {
                    this.isGhost && this.ghostAni.gotoAndPlay(0)
                }.bind(this))
        }
    },
    gc.Block.prototype.getPoint = function () {
        var point = this.point;
        return this.point = 0, point
    },
    gc.Block.prototype.setIndex = function (hIndex, vIndex) {
        this.hIndex = hIndex,
            this.vIndex = vIndex
    },
    gc.Block.prototype.showAni = function () {
        this.block.scale.set(0);
        var t = Util.randomNumber(10, 2);
        this.aniTween = new TimelineLite,
            this.aniTween.to(this.block.scale, 1, {
                x: 1, y: 1, delay: t, ease: Elastic.easeOut.config(.6, .2)
            })
    },
    gc.Block.prototype.playHint = function () {
        this.aniTween = new TimelineLite,
            this.aniTween.to(this.block.scale, .3, {
                x: .8, y: 1
            }),
            this.aniTween.to(this.block.scale, .3, {x: 1, y: .8, onComplete: this.playHint.bind(this)})
    },
    gc.Block.prototype.stopHint = function () {
        this.aniTween.clear(),
            this.block.scale.set(1),
            this.playSpecialBlockAni()
    },
    gc.Block.prototype.dropAni = function () {
        this.aniTween = new TimelineLite, this.aniTween.to(this.block.scale, .3, {
            x: .9, y: 1
        }),
            this.aniTween.to(this.block.scale, .1, {x: 1.2, y: .8}), this.aniTween.to(this.block.scale, 1, {
            x: 1, y: 1, ease: Elastic.easeOut.config(.6, .2), onComplete: this.playSpecialBlockAni.bind(this)
        })
    },
    gc.Block.prototype.setCombineBlock = function () {
        var t;
        if (this.isSpecialCombine2 = true,
        this.specialType > 0 && this.specialType < 5) {
            switch (this.specialType) {
                case 1:
                case 2:
                    t = "wait_fruits";
                    break;
                case 3:
                    t = "wait_gamen";
                    break;
                case 4:
                    t = "wait_special"
            }
            this.block.texture = PIXI.Texture.fromFrame(t + ".png"),
                this.block.scale.set(1), this.aniTween.clear()
        }
        this.stopDamageMotion()
    },
    gc.Block.prototype.setInteractive = function (t) {
    },
    gc.Block.prototype.itemSelect = function () {
        this.selectBox.visible = true,
            this.selectBox.alpha = 1,
            this.selectTween = new TimelineLite,
            this.selectTween.to(this.selectBox, .3, {
                alpha: .2, yoyo: true, repeat: -1
            })
    },
    gc.Block.prototype.itemUnselect = function () {
        this.isUseItem = false,
            this.selectTween.clear(),
            this.selectBox.visible = false,
            this.setInteractive(true)
    },
    gc.Block.prototype.pause = function () {
        this.moveTween.pause(),
            this.aniTween.pause(),
            this.selectTween.pause(),
            this.sCombindEffect1.tween.pause(),
            this.sCombindEffect2.tween.pause(),
            this.ghostAni.stop(),
            this.coconutAni.stop(),
        this.coconutInterval && this.coconutInterval.pause(),
        this.ghostInterval && this.ghostInterval.pause()
    },
    gc.Block.prototype.resume = function () {
        this.moveTween.resume(),
            this.aniTween.resume(),
            this.selectTween.resume(),
            this.sCombindEffect1.tween.resume(),
            this.sCombindEffect2.tween.resume(),
            this.ghostAni.play(),
            this.coconutAni.play(),
        this.coconutInterval && this.coconutInterval.resume(),
        this.ghostInterval && this.ghostInterval.resume()
    },
    gc.Block.prototype.removeAll = function () {
        this.removeChildren(),
            this.stopDamageMotion(),
            this.setInteractive(false),
            this.moveTween.kill(),
            this.aniTween.kill(),
            this.selectTween.kill(),
            this.sCombindEffect1.tween.kill(),
            this.sCombindEffect2.tween.kill(),
        this.coconutInterval && this.coconutInterval.kill(),
        this.ghostInterval && this.ghostInterval.kill()
    },
    gc.Block.prototype.updateTransform = function () {
        PIXI.Container.prototype.updateTransform.call(this)
    }