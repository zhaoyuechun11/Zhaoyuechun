gc.ClearFruit = function (type) {
    PIXI.Container.call(this),
        this.type = type,
        this.fruit = new PIXI.Sprite.fromFrame("ending_1_1.png"),
        this.fruit.anchor.set(.5, .6)
},
    gc.ClearFruit.prototype.constructor = gc.ClearFruit,
    gc.ClearFruit.prototype = Object.create(PIXI.Container.prototype),
    gc.ClearFruit.prototype.show = function () {
        this.removeAll(),
            this.addChild(this.fruit),
            this.setImg1();
        this.type % 2 == 0
            ? (this.fruit.rotation = .2, TweenMax.to(this.fruit, .5, {
                rotation: -.2, yoyo: true, repeat: -1, ease: Power0.easeNone
            }))
            : (this.fruit.rotation = -.2, TweenMax.to(this.fruit, .5, {
                rotation: .2, yoyo: true, repeat: -1, ease: Power0.easeNone
            }))
    },
    gc.ClearFruit.prototype.setImg1 = function () {
        this.fruit.texture = PIXI.Texture.fromFrame("ending_" + this.type + "_1.png");
        var t = Util.randomNumber(30) / 10 + 1;
        TweenMax.delayedCall(t, this.setImg2.bind(this))
    },
    gc.ClearFruit.prototype.setImg2 = function () {
        this.fruit.texture = PIXI.Texture.fromFrame("ending_" + this.type + "_2.png"),
            TweenMax.delayedCall(.1, this.setImg1.bind(this))
    },
    gc.ClearFruit.prototype.removeAll = function () {
        this.removeChildren()
    },
    gc.ClearFruit.prototype.updateTransform = function () {
        PIXI.Container.prototype.updateTransform.call(this)
    }