gc.ProgressView = function () {
    this.bg = null,
        this.logo = null,
        this.logoTxt = null,
        this.tween = null, PIXI.Container.call(this)
},
    gc.ProgressView.constructor = gc.ProgressView,
    gc.ProgressView.prototype = Object.create(PIXI.Container.prototype),
    gc.ProgressView.prototype.show = function (t) {
        this.bg = new PIXI.Graphics,
            this.bg.beginFill(0x132957, 1),
            this.bg.drawRect(0, 0, gc.width, gc.height),
            this.bg.endFill(),
            this.addChild(this.bg);
        this.zhuye002  = new PIXI.Sprite.fromImage("image/zhuye002.png"),
            this.zhuye002.x = gc.width / 2,
            this.zhuye002.y = gc.height / 2,
            this.zhuye002.anchor.set(.5),
            this.zhuye002.scale.set(.1),
            this.zhuye002.rotation = 20,
            this.addChild(this.zhuye002),
            this.tween ? this.tween.kill() : this.tween = new TimelineLite,
            this.tween.to(this.zhuye002, 1, {
                rotation: 0, ease: Sine.easeOut
            }),
            this.tween.call(this.showLocoText.bind(this)),
            TweenMax.to(this.zhuye002.scale, 1, {x: 0.5, y: 0.5});
    },
    gc.ProgressView.prototype.showLocoText = function () {
        TweenMax.to(this.zhuye002, 0.2, {
            x: gc.width/2 + 50, ease: Sine.easeIn
        });

        this.loading02  = new PIXI.Sprite.fromImage("image/loading02.png"),
            this.loading02.x = gc.width / 2 -70,
            this.loading02.y = gc.height / 2 - 20,
            this.loading02.anchor.set(.5),
            this.loading02.scale.set(.2),
            this.addChild(this.loading02)
        //this.loading02.alpha = 0;
        /*TweenMax.to(this.loading02, 1, {
            alpha: 1, ease: Sine.easeOut
        });*/

        TweenMax.to(this.loading02.scale, 0.3, {x: 0.6, y: 0.6, ease: Sine.easeOut, onComplete:(function () {
                TweenMax.to(this.loading02.scale, 0.2, {x: 0.5, y: 0.5, onComplete:(function () {

                    }).bind(this)});
            }).bind(this)});
    },
    gc.ProgressView.prototype.replay = function () {
        this.hide(),
            this.show()
    },
    gc.ProgressView.prototype.hide = function () {
        if (this.tween) this.tween.kill();
        //if (this.zhuye002) this.zhuye002.destroy(true, true);
        //if (this.loading02) this.loading02.destroy(true, true);
    },
    gc.ProgressView.prototype.updateTransform = function () {
        PIXI.Container.prototype.updateTransform.call(this)
    }