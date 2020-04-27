gc.BoxItem = function () {
    PIXI.Container.call(this),
        this.codeData = null,
        this.guideBg = new PIXI.Sprite.fromFrame("item_popup_bg.png"),
        this.guide = new PIXI.Sprite.fromFrame("item_popup_refrigerator1.png"),
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
        }, this),
        this.setTouchEnd(this.cancelBtn, function () {
            gc.isPlay && (this.setInteractive(false), this.guide.tween.clear(),
                this.guide.tween.to(this.guideBg, .2, {
                    y: -400,
                    ease: Sine.easeIn,
                    onComplete: function () {
                        this.emit("FRIDGE_ITEM_CANCEL_EVENT"),
                            this.removeAll(),
                        this.selectCount && this.selectedBlock1.itemUnselect(),
                            this.selectedBlock1 = null,
                            this.selectedBlock2 = null
                    }.bind(this)
                }))
        }, this),
        this.guide.addChild(this.cancelBtn),
        this.effect = new PIXI.Sprite.fromFrame("ui_moves_count.png"),
        this.effect.anchor.set(.5),
        this.effect.tween = new TimelineLite,
        this.changeBlock = new PIXI.Sprite.fromFrame("block_default1_1.png"),
        this.changeBlock.anchor.set(.5),
        this.changeBlock.tween = new TimelineLite,
        this.selectedBlock1 = null,
        this.selectedBlock2 = null,
        this.callFunc = null,
        this.target = null,
        this.selectCount = 0
},
    gc.BoxItem.constructor = gc.BoxItem,
    gc.BoxItem.prototype = Object.create(PIXI.Container.prototype),
    gc.BoxItem.prototype.init = function () {
        this.removeAll()
    },
    gc.BoxItem.prototype.localDataItem = function () {
        this.use();
        var itemHIndex = LocalStorageManager.itemHIndex,
            itemVIndex = LocalStorageManager.itemVIndex;
        this.selectedBlock1 = gc.game.blocks[itemHIndex[0]][itemVIndex[0]],
            this.selectedBlock2 = gc.game.blocks[itemHIndex[1]][itemVIndex[1]],
            this.playItemAction()
    },
    gc.BoxItem.prototype.use = function () {
        this.removeAll(),
            this.setInteractive(true),
            LocalStorageManager.useItemType ? this.guide.removeChild(this.cancelBtn) : this.guide.addChild(this.cancelBtn),
            this.selectedBlock1 = null,
            this.selectedBlock2 = null,
            this.selectCount = 0,
            gc.isUseItem = true,
            gc.itemType = 3,
            this.guideBg.y = -400,
            this.guide.tween.clear(),
            this.guide.tween.to(this.guideBg, .2, {y: 0}),
            this.addChild(this.guideBg),
            this.setGuide()
    },
    gc.BoxItem.prototype.select = function (con) {

        this.selectCount > 1
        || 71 == con.type
        || 0 == this.selectCount && con.isGhost
        || (
            1 == this.selectCount && this.selectedBlock1 == con
                ? (this.selectCount = 0, con.itemUnselect())
                : (con.itemSelect(),
                    this.selectCount++,
                    1 == this.selectCount ? this.selectedBlock1 = con : 2 == this.selectCount
                        && (this.selectedBlock2 = con,
                            this.selectedBlock1.itemUnselect(),
                            3 == LocalStorageManager.useItemType
                                ? this.playItemAction()
                                : (
                                    gc.useItem3--,
                                        gc.useItemList[2] += 1,
                                        gc.game.ui.setItemCount(),
                                        gc.itemSelectBlocks = [this.selectedBlock1, this.selectedBlock2],
                                        LocalStorageManager.save(3),
                                        this.playItemAction()
                                ))),
                this.setGuide())
    },
    gc.BoxItem.prototype.setGuide = function () {
        this.selectCount
            ? this.guide.texture = PIXI.Texture.fromFrame("item_popup_refrigerator2.png")
            : this.guide.texture = PIXI.Texture.fromFrame("item_popup_refrigerator1.png")
    },
    gc.BoxItem.prototype.playItemAction = function () {
        var ImgName = this.getBlockImgName(this.selectedBlock2);
        this.changeBlock.texture = PIXI.Texture.fromFrame(this.getBlockImgName(this.selectedBlock1)),
            this.changeBlock.x = gc.width - 80,
            this.changeBlock.y = gc.height - 70,
            this.changeBlock.scale.set(2),
            this.addChild(this.changeBlock),
            this.showEffect(this.changeBlock),
            this.changeBlock.tween = new TimelineLite,
            this.changeBlock.tween.to(this.changeBlock.scale, .5, {
                x: 1, y: 1, ease: Back.easeOut
            }),
            this.changeBlock.tween.to(this.changeBlock, .25, {
                x: this.selectedBlock2.x, y: this.selectedBlock2.y, ease: Power0.easeNone, onComplete: function () {
                    this.selectedBlock2.setType(this.selectedBlock1.type, this.selectedBlock1.specialType), this.changeBlock.texture = PIXI.Texture.fromFrame(ImgName), this.showEffect(this.changeBlock),
                        gc.effectSoundPlay("sound_item_copy")
                }.bind(this)
            });
        var posx = -6;
        this.changeBlock.tween.to(this.changeBlock, .6, {
            y: gc.height + 100, ease: Back.easeIn, onUpdate: function () {
                posx += .1, this.changeBlock.x += posx
            }.bind(this), onComplete: function () {
                this.guide.tween.clear(), this.guide.tween.to(this.guideBg, .2, {
                    y: -400, ease: Sine.easeIn, onComplete: function () {
                        this.selectedBlock2.itemUnselect(), this.emit("FRIDGE_ITEM_COMPLETE_EVENT"), this.removeAll()
                    }.bind(this)
                })
            }.bind(this)
        })
    },
    gc.BoxItem.prototype.showEffect = function (pos) {
        this.effect.scale.set(0),
            this.effect.x = pos.x,
            this.effect.y = pos.y,
            this.addChild(this.effect),
            this.effect.tween = new TimelineLite,
            this.effect.tween.to(this.effect.scale, .25, {
                x: 1, y: 1, onComplete: function () {
                    this.effect.tween.clear(), this.removeChild(this.effect)
                }.bind(this)
            })
    },
    gc.BoxItem.prototype.getBlockImgName = function (con) {
        return con.specialType > 0
            ? con.specialType < 3
                ? gc.BLOCK_NAME[con.specialType] + con.type + ".png"
                : gc.BLOCK_NAME[con.specialType] + con.type + "_1.png"
            : 10 == con.type ? "block_disturb_1.png"
                : "block_default" + con.type + "_1.png"
    },
    gc.BoxItem.prototype.setInteractive = function (interactive) {
        this.cancelBtn.interactive = interactive
    },
    gc.BoxItem.prototype.pause = function () {
        this.guide.tween.pause(),
            this.effect.tween.pause(),
            this.changeBlock.tween.pause()
    },
    gc.BoxItem.prototype.resume = function () {
        this.guide.tween.resume(),
            this.effect.tween.resume(),
            this.changeBlock.tween.resume()
    },
    gc.BoxItem.prototype.removeAll = function () {
        this.removeChildren(),
            this.setInteractive(false),
            this.guide.tween.kill(),
            this.effect.tween.kill(),
            this.changeBlock.tween.kill()
    },
    gc.BoxItem.prototype.updateTransform = function () {
        PIXI.Container.prototype.updateTransform.call(this)
    }