gc.ObstacleEffect = function () {
    PIXI.Container.call(this),
        this.obstacleBlock = new PIXI.Sprite.fromFrame("block_disturb_1.png"),
        this.tween = new TimelineLite
},
    gc.ObstacleEffect.constructor = gc.ObstacleEffect,
    gc.ObstacleEffect.prototype = Object.create(PIXI.Container.prototype),
    gc.ObstacleEffect.prototype.init = function () {
        this.removeAll()
    },
    gc.ObstacleEffect.prototype.show = function (con) {
        this.obstacleBlock.scale.set(.5),
            this.obstacleBlock.x = 141,
            this.obstacleBlock.y = 104,
            this.addChild(this.obstacleBlock),
            this.tween = new TimelineLite,
            this.tween.to(this.obstacleBlock, .5, {
                x: con.x - con.width / 2,
                y: con.y - con.height / 2,
                onUpdate: function () {
                    this.obstacleBlock.scale.x < 1
                        ? this.obstacleBlock.scale.set(this.obstacleBlock.scale.x + .02)
                        : this.obstacleBlock.scale.set(1)

                }.bind(this),
                onComplete: function () {
                    this.removeChild(this.obstacleBlock)
                }.bind(this)
            }),
            gc.effectSoundPlay("sound_durian")
    },
    gc.ObstacleEffect.prototype.pause = function () {
        this.tween.pause()
    },
    gc.ObstacleEffect.prototype.resume = function () {
        this.tween.resume()
    },
    gc.ObstacleEffect.prototype.removeAll = function () {
        this.removeChildren(),
            this.tween.kill()
    },
    gc.ObstacleEffect.prototype.updateTransform = function () {
        PIXI.Container.prototype.updateTransform.call(this)
    }