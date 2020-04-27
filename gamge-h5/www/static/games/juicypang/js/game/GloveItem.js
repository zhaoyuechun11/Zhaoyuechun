gc.GloveItem = function () {
    PIXI.Container.call(this),
        this.codeData = null,
        this.guideBg = new PIXI.Sprite.fromFrame("item_popup_bg.png"),
        this.guide = new PIXI.Sprite.fromFrame("item_popup_gloves.png"),
        this.guide.anchor.set(.5),
        this.guide.x = gc.width / 2,
        this.guide.y = 200,
        this.guide.tween = new TimelineLite,
        this.guideBg.addChild(this.guide),
        this.cancelBtn = new PIXI.Sprite.fromFrame("popup_btn_exit.png"),
        this.cancelBtn.anchor.set(.5),
        this.cancelBtn.x = 310,
        this.cancelBtn.y = -154,
        this.setTouchStartAction(this.cancelBtn, function () {
            },
            this),
        this.setTouchEnd(this.cancelBtn, function () {
                gc.isPlay && (this.setInteractive(false),
                    this.guide.tween.clear(),
                    this.guide.tween.to(this.guideBg, .2, {
                        y: -400, ease: Sine.easeIn, onComplete: function () {
                            this.emit("GLOVE_ITEM_CANCEL_EVENT"),
                                this.removeAll(),
                            this.selectCount && this.selectedBlock1.itemUnselect(),
                                this.selectedBlock1 = null,
                                this.selectedBlock2 = null
                        }.bind(this)
                    }))
            },
            this),
        this.guide.addChild(this.cancelBtn),
        this.glove1 = new PIXI.Sprite.fromFrame("iyem_ani_gloves1.png"),
        this.glove1.anchor.set(.5),
        this.glove1.tween = new TimelineLite,
        this.glove2 = new PIXI.Sprite.fromFrame("iyem_ani_gloves1.png"),
        this.glove2.anchor.set(.5),
        this.glove2.tween = new TimelineLite,
        this.blockTween1 = new TimelineLite,
        this.blockTween2 = new TimelineLite,
        this.selectedBlock1 = null,
        this.selectedBlock2 = null,
        this.callFunc = null,
        this.target = null,
        this.selectCount = 0,
        this.tPos = null,
        this.tPos2 = null
},
    gc.GloveItem.constructor = gc.GloveItem,
    gc.GloveItem.prototype = Object.create(PIXI.Container.prototype),
    gc.GloveItem.prototype.init = function () {
        this.removeAll()
    },
    gc.GloveItem.prototype.localDataItem = function () {
        this.use();
        var t = LocalStorageManager.itemHIndex, e = LocalStorageManager.itemVIndex;
        this.selectedBlock1 = gc.game.blocks[t[0]][e[0]],
            this.selectedBlock2 = gc.game.blocks[t[1]][e[1]],
            this.playItemAction()
    },
    gc.GloveItem.prototype.use = function () {
        this.removeAll(),
            this.setInteractive(true), LocalStorageManager.useItemType ? this.guide.removeChild(this.cancelBtn) : this.guide.addChild(this.cancelBtn),
            this.selectedBlock1 = null,
            this.selectedBlock2 = null,
            this.selectCount = 0,
            gc.isUseItem = true,
            gc.itemType = 1,
            this.guideBg.y = -400,
            this.guide.tween.clear(),
            this.guide.tween.to(this.guideBg, .2, {y: 0}),
            this.addChild(this.guideBg)
    },
    gc.GloveItem.prototype.select = function (Block) {
        this.selectCount > 1
        || (1 == this.selectCount && this.selectedBlock1 == Block ? (this.selectCount = 0,
                Block.itemUnselect())
            : (Block.itemSelect(),
                this.selectCount++,
                1 == this.selectCount ? this.selectedBlock1 = Block
                    : 2 == this.selectCount && (this.selectedBlock2 = Block, 1 == LocalStorageManager.useItemType
                    ? this.playItemAction()
                    : (gc.useItem1--,
                        gc.useItemList[0] += 1,
                        gc.game.ui.setItemCount(),
                        gc.itemSelectBlocks = [this.selectedBlock1,
                            this.selectedBlock2], LocalStorageManager.save(1),
                        this.playItemAction()),
                    this.setInteractive(false))))
    },
    gc.GloveItem.prototype.playItemAction = function () {
        var hIndex = this.selectedBlock1.hIndex,
            vIndex = this.selectedBlock1.vIndex,
            type = this.selectedBlock1.type,
            specialType = this.selectedBlock1.specialType,
            isGhost = this.selectedBlock1.isGhost,
            life = this.selectedBlock1.life;

        this.tPos = {x: this.selectedBlock1.x, y: this.selectedBlock1.y};

        var hIndex2 = this.selectedBlock2.hIndex,
            vIndex2 = this.selectedBlock2.vIndex,
            type2 = this.selectedBlock2.type,
            specialType2 = this.selectedBlock2.specialType,
            isGhost2 = this.selectedBlock2.isGhost,
            life2 = this.selectedBlock2.life;

        this.tPos2 = {
            x: this.selectedBlock2.x, y: this.selectedBlock2.y
        },
            this.setGloveImg(1),
            this.selectedBlock1.init(hIndex2, vIndex2, type2, life2),
        isGhost2 && this.selectedBlock1.setGhost(),
            this.selectedBlock1.setSpecial(specialType2),
            this.selectedBlock1.playSpecialBlockAni(),
            this.selectedBlock1.x = this.tPos2.x,
            this.selectedBlock1.y = this.tPos2.y,
            this.selectedBlock1.block.scale.set(1),
            this.selectedBlock2.init(hIndex, vIndex, type, life),
        isGhost && this.selectedBlock2.setGhost(),
            this.selectedBlock2.setSpecial(specialType),
            this.selectedBlock2.playSpecialBlockAni(),
            this.selectedBlock2.x = this.tPos.x,
            this.selectedBlock2.y = this.tPos.y,
            this.selectedBlock2.block.scale.set(1),
            this.glove1.alpha = 0,
            this.glove1.x = this.tPos.x,
            this.glove1.y = this.tPos.y - 50,
            this.glove1.tween.clear(),
            this.glove1.tween.to(this.glove1, .5, {
                alpha: 1, y: this.tPos.y, onComplete: this.changeMove.bind(this)
            }),
            this.addChild(this.glove1),
            this.glove2.alpha = 0,
            this.glove2.x = this.tPos2.x,
            this.glove2.y = this.tPos2.y - 50,
            this.glove2.tween.clear(),
            this.glove2.tween.to(this.glove2, .5, {
                alpha: 1, y: this.tPos2.y
            }),
            this.addChild(this.glove2)
    },
    gc.GloveItem.prototype.setGloveImg = function (id) {
        this.glove1.texture = PIXI.Texture.fromFrame("iyem_ani_gloves" + id + ".png"),
            this.glove2.texture = PIXI.Texture.fromFrame("iyem_ani_gloves" + id + ".png")
    },
    gc.GloveItem.prototype.changeMove = function () {
        this.setGloveImg(2),
            this.glove1.tween.to(this.glove1, .5, {
                x: this.tPos2.x, y: this.tPos2.y, onUpdate: function () {
                    this.selectedBlock1.x = this.glove2.x,
                        this.selectedBlock1.y = this.glove2.y,
                        this.selectedBlock2.x = this.glove1.x,
                        this.selectedBlock2.y = this.glove1.y
                }.bind(this), onComplete: this.changeComplete.bind(this)
            }),
            this.addChild(this.glove1),
            this.glove2.tween.to(this.glove2, .5, {x: this.tPos.x, y: this.tPos.y})
    },
    gc.GloveItem.prototype.changeComplete = function () {
        this.setGloveImg(1),
            this.glove1.tween.to(this.glove1, .5, {
                alpha: 0, y: this.tPos2.y - 50
            }),
            this.glove2.tween.to(this.glove2, .5, {
                alpha: 0, y: this.tPos.y - 50
            }),
            this.guide.tween.clear(),
            this.guide.tween.to(this.guideBg, .2, {
                y: -400, onComplete: function () {
                    this.emit("GLOVE_ITEM_COMPLETE_EVENT"),
                        this.removeAll()
                }.bind(this)
            }),
            gc.effectSoundPlay("sound_item_move")
    },
    gc.GloveItem.prototype.setInteractive = function (interactive) {
        this.cancelBtn.interactive = interactive
    },
    gc.GloveItem.prototype.pause = function () {
        this.guide.tween.pause(),
            this.glove1.tween.pause(),
            this.glove2.tween.pause(),
            this.blockTween1.pause(),
            this.blockTween2.pause()
    },
    gc.GloveItem.prototype.resume = function () {
        this.guide.tween.resume(),
            this.glove1.tween.resume(),
            this.glove2.tween.resume(),
            this.blockTween1.resume(),
            this.blockTween2.resume()
    },
    gc.GloveItem.prototype.removeAll = function () {
        this.removeChildren(),
            this.setInteractive(false),
            this.guide.tween.kill(),
            this.glove1.tween.kill(),
            this.glove2.tween.kill(),
            this.blockTween1.kill(),
            this.blockTween2.kill()
    },
    gc.GloveItem.prototype.updateTransform = function () {
        PIXI.Container.prototype.updateTransform.call(this)
    }