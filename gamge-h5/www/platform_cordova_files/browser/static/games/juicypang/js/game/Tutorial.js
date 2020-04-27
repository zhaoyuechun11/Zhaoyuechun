gc.Tutorial = function () {
    PIXI.Container.call(this),
        this.pageTotal = 7,
        this.pageCount = 0,
        this.touchPosX = null,
        this.isTouch = null,
        this.content = new PIXI.Sprite(gc.loader.resources.tutorial_1.texture),
        this.content.anchor.set(.5),
        this.content.x = gc.width / 2,
        this.content.y = gc.height / 2,
        this.setTouchStart(this.content, function (touch) {
                touch.data.global.y < 695 && (this.isTouch = true,
                    this.touchPosX = touch.data.global.x)
            },
            this),
        this.setTouchMove(this.content, function (touch) {
                if (this.isTouch) {
                    var x = touch.data.global.x,
                        i = this.touchPosX - x;
                    Math.abs(i) > 30 && (i > 0 ? this.pageCount < this.pageTotal - 1 && this.goNext() : this.pageCount > 0 && this.goPrev(),
                        this.isTouch = false)
                }
            },
            this),
        this.addChild(this.content),
        this.exitBtn = new PIXI.Sprite.fromFrame("tutorial_btn_exit.png"),
        this.exitBtn.y = 495,
        this.exitBtn.anchor.set(.5),
        this.setTouchStartAction(this.exitBtn),
        this.setTouchEnd(this.exitBtn, function () {
                this.sendCloseEvent()
            },
            this),
        this.content.addChild(this.exitBtn),
        this.prevBtn = new PIXI.Sprite.fromFrame("tutorial_btn.png"),
        this.prevBtn.x = -290,
        this.prevBtn.y = this.exitBtn.y,
        this.prevBtn.anchor.set(.5),
        this.setTouchStartAction(this.prevBtn),
        this.setTouchEnd(this.prevBtn, function () {
                this.goPrev()
            },
            this),
        this.content.addChild(this.prevBtn),
        this.nextBtn = new PIXI.Sprite.fromFrame("tutorial_btn.png"),
        this.nextBtn.anchor.set(.5),
        this.nextBtn.x = -this.prevBtn.x,
        this.nextBtn.y = this.exitBtn.y,
        this.setTouchStartAction(this.nextBtn),
        this.setTouchEnd(this.nextBtn, function () {
                this.goNext()
            },
            this),
        this.content.addChild(this.nextBtn)
},
    gc.Tutorial.prototype.constructor = gc.Tutorial,
    gc.Tutorial.prototype = Object.create(PIXI.Container.prototype),
    gc.Tutorial.prototype.init = function () {
        this.isTouch = false,
            this.exitBtn.scale.set(1),
            this.prevBtn.scale.set(-1, 1),
            this.nextBtn.scale.set(1),
            this.pageCount = 0,
            this.setContent(),
            this.setPageButton(),
            this.setInteractive(true),
            this.content.y = -gc.height / 2, TweenMax.to(this.content, .4, {
            y: gc.height / 2, ease: Power4.easeOut
        })
    },
    gc.Tutorial.prototype.goNext = function () {
        this.pageCount++,
            this.setContent(),
            this.setPageButton()
    },
    gc.Tutorial.prototype.goPrev = function () {
        this.pageCount > 0 && (this.pageCount--,
            this.setContent(),
            this.setPageButton())
    },
    gc.Tutorial.prototype.sendCloseEvent = function () {
        this.setInteractive(false), TweenMax.to(this.content, .4, {
            y: 0, ease: Power4.easeIn, onComplete: function () {
                this.emit("TUTORIAL_CLOSE_EVENT")
            }.bind(this)
        })
    },
    gc.Tutorial.prototype.setContent = function () {
        this.content.texture = gc.loader.resources["tutorial_" + (this.pageCount + 1)].texture
    },
    gc.Tutorial.prototype.setPageButton = function () {
        0 == this.pageCount
            ? (this.prevBtn.alpha = .5,
                this.prevBtn.interactive = false,
                this.nextBtn.alpha = 1,
                this.nextBtn.interactive = true)
            : this.pageCount == this.pageTotal - 1
            ? (this.prevBtn.alpha = 1,
                this.prevBtn.interactive = true,
                this.nextBtn.alpha = .5,
                this.nextBtn.interactive = false)
            : (this.prevBtn.alpha = 1,
                this.prevBtn.interactive = true,
                this.nextBtn.alpha = 1,
                this.nextBtn.interactive = true)
    },
    gc.Tutorial.prototype.setInteractive = function (interactive) {
        this.prevBtn.interactive = interactive,
            this.nextBtn.interactive = interactive,
            this.exitBtn.interactive = interactive,
            this.content.interactive = interactive
    },
    gc.Tutorial.prototype.updateTransform = function () {
        PIXI.Container.prototype.updateTransform.call(this)
    }