gc.IceBlock = function (ax, ay, tx, ty) {
    var hIndex, vIndex, ice;
    for (PIXI.Container.call(this),
             this.blocks = [],
             hIndex = 0;
         hIndex < gc.H_TOTAL; hIndex++) {
        for (vIndex = 0; vIndex < gc.V_TOTAL; vIndex++) {
            (ice = new PIXI.Sprite.fromFrame("block_ice_1.png")).anchor.set(.5),
                ice.isShow = false,
                ice.hIndex = hIndex,
                ice.vIndex = vIndex,
                ice.health = 0,
                ice.tx = tx + hIndex * ax,
                ice.x = ice.tx,
                ice.y = ty - vIndex * ay,
                ice.tween = new TimelineLite,
                this.blocks.push(ice)
        }
    }


},
    gc.IceBlock.constructor = gc.IceBlock,
    gc.IceBlock.prototype = Object.create(PIXI.Container.prototype),
    gc.IceBlock.prototype.init = function () {
        this.removeAll()
    },

    gc.IceBlock.prototype.show = function (index) {
        var vIndex, hIndex, block, health,
            blocks = IceMapData.getMapData(index);

        for (vIndex = 0; vIndex < gc.V_TOTAL; vIndex++)
            for (hIndex = 0; hIndex < gc.H_TOTAL; hIndex++)
                block = this.blocks[vIndex * gc.H_TOTAL + hIndex],
                    (health = blocks[hIndex][vIndex]) > 0
                        ? (block.health = health,
                            this.setIceImg(block),
                            block.isShow = true,
                            block.scale.set(0),
                            block.tween = new TimelineLite,
                            block.tween.to(block.scale, .2, {
                                x: 1, y: 1, delay: .02 * vIndex, ease: Back.easeOut
                            }),
                            this.addChild(block))
                        : block.health = 0
    },
    gc.IceBlock.prototype.showLocalData = function () {
        var t,
            block,
            health,
            iceList = LocalStorageManager.iceList,
            iceListLength = iceList.length;

        for (t = 0; iceListLength > t; t++)
            block = this.blocks[t],
                (health = iceList[t]) > 0
                    ? (block.health = health,
                        this.setIceImg(block),
                        block.isShow = true,
                        block.scale.set(1),
                        this.addChild(block))
                    : block.health = 0
    },

    gc.IceBlock.prototype.hide = function (v, vv) {
        var block = this.blocks[v * gc.H_TOTAL + vv];
        return !!block.isShow && (
            1 == block.health && (block.isShow = false),
                block.tween = new TimelineLite,
                block.tween.to(block, .07, {x: block.tx - 7}),
                block.tween.to(block, .07, {x: block.tx + 7}),
                block.tween.to(block, .07, {x: block.tx - 5}),
                block.tween.to(block, .07, {
                    x: block.tx,
                    onCompleteParams: [block],
                    onComplete: function (block) {
                        block.health--,
                            0 == block.health
                                ? this.removeChild(block)
                                : this.setIceImg(block)

                    }.bind(this)
                }), true)
    },
    gc.IceBlock.prototype.setIceImg = function (block) {
        block.health > 1
            ? block.texture = PIXI.Texture.fromFrame("block_ice_1.png")
            : block.texture = PIXI.Texture.fromFrame("block_ice_2.png")
    },
    gc.IceBlock.prototype.setIceBlocks = function () {
        var hIndex, vIndex, i, n, blocks = gc.game.blocks;
        for (hIndex = 0; hIndex < gc.H_TOTAL; hIndex++)
            for (vIndex = 0; vIndex < gc.V_TOTAL; vIndex++)
                i = this.blocks[hIndex * gc.V_TOTAL + vIndex],
                    n = blocks[hIndex][vIndex],
                    2 == i.health ? n.setIce(true) : n.setIce(false)
    },
    gc.IceBlock.prototype.getIceBlockHealth = function (v, vv) {
        return this.blocks[v * gc.V_TOTAL + vv].health
    },
    gc.IceBlock.prototype.pause = function () {
        var i, blocksLength = this.blocks.length;
        for (i = 0; blocksLength > i; i++) this.blocks[i].tween.pause()
    },
    gc.IceBlock.prototype.resume = function () {
        var i, blocksLength = this.blocks.length;
        for (i = 0; blocksLength > i; i++) this.blocks[i].tween.resume()
    },
    gc.IceBlock.prototype.removeAll = function () {
        this.removeChildren();
        var t, health, blocksLength = this.blocks.length;
        for (t = 0; blocksLength > t; t++)
            (health = this.blocks[t]).health = 0,
                health.isShow = false,
                health.tween.kill()
    },
    gc.IceBlock.prototype.updateTransform = function () {
        PIXI.Container.prototype.updateTransform.call(this)
    }