gc.HammerItem = function () {
    PIXI.Container.call(this),
        this.guideBg = new PIXI.Sprite.fromFrame("item_popup_bg.png"),
        this.guide = new PIXI.Sprite.fromFrame("item_popup_hammer.png"),
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
                            this.emit("HAMMER_ITEM_CANCEL_EVENT"),
                                this.removeAll();
                            for (var t = this.blocks.length; t--;) this.blocks.shift().itemUnselect()
                        }.bind(this)
                    }))
            },
            this),
        this.guide.addChild(this.cancelBtn);

    var hammer, mission,
        self = this,
        Count = 3;

    for (this.hammerList = [],
             this.effectList = []; Count--;)
        (hammer = new PIXI.Sprite.fromFrame("item_hammer_1.png")).anchor.set(.8, .9),

            this.hammerList.push(hammer),
            (mission = new gc.MovieClip("ui_mission_", 1, 10, .5)).anchor.set(.5),
            mission.loop = false,
            mission.id = Count,
            mission.y = 100,
            mission.onComplete = function () {
                self.removeChild(this)
            },
            this.effectList.push(mission);
    this.blocks = [],
        this.callFunc = null,
        this.target = null
},
    gc.HammerItem.constructor = gc.HammerItem,
    gc.HammerItem.prototype = Object.create(PIXI.Container.prototype),
    gc.HammerItem.prototype.init = function () {
        this.removeAll()
    },
    gc.HammerItem.prototype.localDataItem = function () {
        this.use();
        var itemHIndex = LocalStorageManager.itemHIndex,
            itemVIndex = LocalStorageManager.itemVIndex;
        this.blocks = [],
            this.blocks.push(gc.game.blocks[itemHIndex[0]][itemVIndex[0]]),
            this.blocks.push(gc.game.blocks[itemHIndex[1]][itemVIndex[1]]),
            this.blocks.push(gc.game.blocks[itemHIndex[2]][itemVIndex[2]]),
            this.playItemAction()
    },
    gc.HammerItem.prototype.use = function () {
        this.removeAll(),
            this.setInteractive(true),
            LocalStorageManager.useItemType
                ? this.guide.removeChild(this.cancelBtn)
                : this.guide.addChild(this.cancelBtn),

            gc.isUseItem = true,
            gc.itemType = 2,
            this.blocks = [],
            this.guideBg.y = -400,
            this.guide.tween.clear(),
            this.guide.tween.to(this.guideBg, .2, {y: 0}),
            this.addChild(this.guideBg)
    },
    gc.HammerItem.prototype.select = function (Block) {
        if (3 != this.blocks.length) {
            for (var e, i = true, n = this.blocks.length; n--;)
                (e = this.blocks[n]).hIndex == Block.hIndex && e.vIndex == Block.vIndex
                && (this.blocks.splice(n, 1),
                    Block.itemUnselect(), i = false);
            i && (this.blocks.push(Block),
                Block.itemSelect()),
            3 == this.blocks.length
            && (this.setInteractive(false), 2 == LocalStorageManager.useItemType
                ? this.playItemAction()
                : (gc.useItem2--,
                    gc.useItemList[1] += 1,
                    gc.game.ui.setItemCount(),
                    gc.itemSelectBlocks = this.blocks, LocalStorageManager.save(2),
                    this.playItemAction()))
        }
    },
    gc.HammerItem.prototype.playItemAction = function () {
        for (
            var hammerList, e, block,
                self = this,
                r = this.blocks.length; r--;)
            block = this.blocks[r],
                (hammerList = this.hammerList[r]).block = block,
                hammerList.x = block.x + 90,
                hammerList.y = block.y - 30,
                hammerList.tween = new TimelineLite,
                hammerList.tween.to(hammerList, .3, {rotation: 1}),
                hammerList.tween.to(hammerList, .1, {
                    rotation: -1, onCompleteParams: [block, r],
                    onComplete: function (t, i) {
                        t.specialType > 0 ? gc.game.specialBlockErase(t) : (t.isGhost && t.resetGhost(),
                            t.loseLife()),
                            t.itemUnselect(),
                            gc.effectSoundPlay("sound_item_hammer"),
                            (e = self.effectList[i]).x = t.x - 5,
                            e.y = t.y - 5, e.gotoAndPlay(0),
                            self.addChildAt(e, 0)
                    }
                }),

                0 == r ? hammerList.tween.to(hammerList, .2, {
                        rotation: .1, delay: .2, onComplete: function () {
                            this.guide.tween.clear(),
                                this.guide.tween.to(this.guideBg, .2, {
                                    y: -400, ease: Sine.easeIn, onComplete: function () {
                                        this.emit("HAMMER_ITEM_COMPLETE_EVENT"),
                                            this.removeAll()
                                    }.bind(this)
                                })
                        }.bind(this)
                    })
                    : hammerList.tween.to(hammerList, .2, {rotation: .1, delay: .2});

        this.hammerList.sort(function (t, e) {
            return t.y < e.y ? -1 : t.y > e.y ? 1 : 0
        });

        var o = this.hammerList.length;
        for (var r = 0; o > r; r++) this.addChild(this.hammerList[r])
    },
    gc.HammerItem.prototype.setInteractive = function (interactive) {
        this.cancelBtn.interactive = interactive
    },
    gc.HammerItem.prototype.pause = function () {
        this.guide.tween.pause();
        for (var t = this.hammerList.length; t--;)
            this.hammerList[t].tween.pause();

        for (t = this.effectList.length; t--;)
            this.effectList[t].stop()
    },
    gc.HammerItem.prototype.resume = function () {
        this.guide.tween.resume();
        for (var t = this.hammerList.length; t--;)
            this.hammerList[t].tween.resume();

        for (t = this.effectList.length; t--;)
            this.effectList[t].play()
    },
    gc.HammerItem.prototype.removeAll = function () {
        this.removeChildren(),
            this.setInteractive(false),
            this.guide.tween.kill();
        for (var t, e = this.hammerList.length; e--;)
            (t = this.hammerList[e]).tween && t.tween.kill()
    },
    gc.HammerItem.prototype.updateTransform = function () {
        PIXI.Container.prototype.updateTransform.call(this)
    }