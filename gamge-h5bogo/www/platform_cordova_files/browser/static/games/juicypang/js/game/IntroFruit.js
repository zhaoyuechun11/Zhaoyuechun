gc.IntroFruit = function (index) {
    PIXI.Container.call(this),
        this.isPlay = true,
        this.index = index,
        this.posX = [550, 156, 595, 128, 190, 540, 360],
        this.posY = [890, 715, 740, 645, 890, 595, 930],
        this.fruitScale = [.9, .9, 1, 1, 1, .9, 1],
        this.fruitType = [6, 4, 2, 3, 5, 1, 7],
        this.type = this.fruitType[index],
    4 != this.type && 6 != this.type && (this.shadow = new PIXI.Sprite.fromFrame("main_shadow.png"),
        this.shadow.anchor.set(.5, .7),
        this.addChild(this.shadow)),
        this.fruit = new PIXI.Sprite.fromFrame("main_cha" + this.type + "_1.png"),
        this.fruit.anchor.set(.5, .9),
        this.addChild(this.fruit),
        this.ghost1 = new PIXI.Sprite.fromFrame("main_ghost.png"),
        this.ghost1.anchor.set(.5),
        this.ghost1.scale.set(.7),
        this.ghost1.x = -100,
        this.addChild(this.ghost1),
        this.ghost2 = new PIXI.Sprite.fromFrame("main_ghost.png"),
        this.ghost2.anchor.set(.5),
        this.ghost2.scale.set(-.7, .7),
        this.ghost2.x = -100,
        this.addChild(this.ghost2),
        this.tween = new TimelineLite,
        this.ghostTween = new TimelineLite
},
    gc.IntroFruit.prototype.constructor = gc.IntroFruit,
    gc.IntroFruit.prototype = Object.create(PIXI.Container.prototype),
    gc.IntroFruit.prototype.init = function () {
        this.isPlay = false,
            this.fruit.y = this.posY[this.index] - 1e3,
        this.shadow && (this.shadow.y = this.posY[this.type - 1] - 1e3)
    },
    gc.IntroFruit.prototype.play = function () {
        var fruitScale = this.fruitScale[this.index];
        this.isPlay = true,
            this.fruit.scale.set(fruitScale),
            this.fruit.rotation = 0,
            this.fruit.x = this.posX[this.index],
            this.tween = new TimelineLite;
        var delay = .03 * this.index + .4;
        TweenMax.to(this.fruit, 1, {
            y: this.posY[this.type - 1], delay: delay, ease: Bounce.easeOut
        }), 4 != this.type && 6 != this.type && (this.shadow.x = this.fruit.x,
            this.shadow.y = this.posY[this.type - 1],
            this.shadow.scale.set(0), TweenMax.to(this.shadow.scale, 1, {
            x: fruitScale, y: fruitScale, delay: delay, ease: Bounce.easeOut
        }),
            this.img1()),
            this.action(),
            this.moveGhost1()
    },
    gc.IntroFruit.prototype.stop = function () {
        this.isPlay = false,
            this.tween.kill()
    },
    gc.IntroFruit.prototype.img1 = function () {
        this.fruit.texture = PIXI.Texture.fromFrame("main_cha" + this.type + "_1.png"),
        this.isPlay && TweenMax.delayedCall(5 * Math.random() + 1,
            this.img2.bind(this))
    },
    gc.IntroFruit.prototype.img2 = function () {
        this.fruit.texture = PIXI.Texture.fromFrame("main_cha" + this.type + "_2.png"),
        this.isPlay && TweenMax.delayedCall(.1,
            this.img1.bind(this))
    },
    gc.IntroFruit.prototype.action = function () {
        this.tween.clear(),
            this.tween.to(this.fruit, .1, {
                rotation: Util.radiansToDegrees(-5), ease: Power0.easeNone
            }),
            this.tween.to(this.fruit, .3, {
                rotation: Util.radiansToDegrees(5), ease: Power0.easeNone
            }),
            this.tween.to(this.fruit, .2, {
                rotation: Util.radiansToDegrees(0), ease: Power0.easeNone
            }),
        this.isPlay && TweenMax.delayedCall(7 * Math.random() + 1,
            this.action.bind(this))
    },
    gc.IntroFruit.prototype.moveGhost1 = function () {
        this.ghost1.x = gc.width + 60,
            this.ghost1.y = 500,
            this.ghostTween.kill(),
            this.ghostTween = new TimelineLite,
            this.ghostTween.to(this.ghost1, 3, {
                x: gc.width - 300, y: -100, delay: .2, onComplete: this.moveGhost2.bind(this)
            })
    },
    gc.IntroFruit.prototype.moveGhost2 = function () {
        this.ghost2.x = -60,
            this.ghost2.y = 500,
            this.ghostTween.kill(),
            this.ghostTween = new TimelineLite,
            this.ghostTween.to(this.ghost2, 4, {
                x: 200, y: -100, delay: .3, onComplete: this.moveGhost1.bind(this)
            })
    },
    gc.IntroFruit.prototype.updateTransform = function () {
        PIXI.Container.prototype.updateTransform.call(this)
    }