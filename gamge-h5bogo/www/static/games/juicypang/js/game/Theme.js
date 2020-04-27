gc.Theme = function () {
    PIXI.Container.call(this),
        this.type = 1,
        this.theme = new PIXI.Sprite.fromFrame("bg_theme1_1.png"),
        this.theme2 = new PIXI.Sprite.fromFrame("bg_theme1_2.png"),
        this.oldTheme = new PIXI.Sprite.fromFrame("bg_theme1_1.png"),
        this.oldTheme2 = new PIXI.Sprite.fromFrame("bg_theme1_2.png"),
        this.container = new PIXI.Container,
        this.ship = new PIXI.Sprite.fromFrame("theme_ship1.png"),
        this.ship.tween = new TimelineLite,
        this.ship.y = 80,
        this.tween = new TimelineLite,
        this.tween2 = new TimelineLite,
        this.stars = [],
        this.tmpStars = [],
        this.starCount = 0,
        this.starInterval = null
},
    gc.Theme.constructor = gc.Theme,
    gc.Theme.prototype = Object.create(PIXI.Container.prototype),
    gc.Theme.prototype.init = function () {
        this.removeAll(),
            this.addChild(this.theme),
            this.addChild(this.container),
            this.addChild(this.ship),
            this.addChild(this.theme2),
            this.starCount = 0,
            this.ship.tween = new TimelineLite,
            this.shipMove()
    },
    gc.Theme.prototype.setTheme = function (type) {
        this.type != type && (this.oldTheme.texture = PIXI.Texture.fromFrame("bg_theme" + this.type + "_1.png"),
            this.oldTheme.alpha = 1,
            this.oldTheme2.texture = PIXI.Texture.fromFrame("bg_theme" + this.type + "_2.png"),
            this.oldTheme2.alpha = 1,
            this.theme.texture = PIXI.Texture.fromFrame("bg_theme" + type + "_1.png"),
            this.theme.alpha = 0,
            this.theme2.texture = PIXI.Texture.fromFrame("bg_theme" + type + "_2.png"),
            this.theme2.alpha = 0,
            this.ship.texture = PIXI.Texture.fromFrame("theme_ship" + type + ".png"),
            this.type = type,
            this.addChild(this.oldTheme),
            this.addChild(this.theme),
            this.addChild(this.container),
            this.addChild(this.ship),
            this.addChild(this.oldTheme2),
            this.addChild(this.theme2), 3 == type && this.showStar(),
            this.tween = new TimelineLite,
            this.tween.to(this.theme, 1, {
                alpha: 1, onUpdate: function () {
                    this.oldTheme.alpha = 1 - this.theme.alpha
                }.bind(this), onComplete: function () {
                    this.removeChild(this.oldTheme)
                }.bind(this)
            }),
            this.tween2 = new TimelineLite,
            this.tween2.to(this.theme2, 1, {
                alpha: 1, onUpdate: function () {
                    this.oldTheme2.alpha = 1 - this.theme2.alpha
                }.bind(this), onComplete: function () {
                    this.removeChild(this.oldTheme2)
                }.bind(this)
            }))
    },
    gc.Theme.prototype.shipMove = function () {
        Util.randomNumber(2) ? (this.ship.x = -100,
            this.ship.scale.x = 1,
            this.ship.tween.to(this.ship, 15, {
                x: gc.width, ease: Power0.easeNone, onComplete: this.shipMove.bind(this)
            })) : (this.ship.x = gc.width,
            this.ship.scale.x = -1,
            this.ship.tween.to(this.ship, 15, {
                x: -100, ease: Power0.easeNone, onComplete: this.shipMove.bind(this)
            }))
    },
    gc.Theme.prototype.showStar = function () {
        var TimelineLite,
            self = this;

        this.tmpStars.length ? (TimelineLite = this.tmpStars.shift()).tween.kill() : TimelineLite = new PIXI.Sprite.fromFrame("theme_star.png"),
            TimelineLite.tween = new TimelineLite,
            TimelineLite.x = Util.randomNumber(gc.width),
            TimelineLite.y = Util.randomNumber(70) + 50,
            TimelineLite.id = this.starCount,
            TimelineLite.alpha = 0,
            TimelineLite.tween = new TimelineLite,
            TimelineLite.tween.to(TimelineLite, .5, {alpha: 1}),
            TimelineLite.tween.to(TimelineLite, .5, {
                alpha: 0, delay: 2, onComplete: function () {
                    self.removeStar(this.target.id)
                }
            }),
            this.container.addChild(TimelineLite),
            this.stars.push(TimelineLite),
            this.starCount++,
            this.starInterval = setTimeout(this.showStar.bind(this), 500)
    },
    gc.Theme.prototype.removeStar = function (count) {
        for (var star, i = this.stars.length; i--;)
            if ((star = this.stars[i]).id == count) {
                this.stars.splice(i, 1),
                    this.tmpStars.push(star),
                    this.container.removeChild(star);
                break
            }
    },
    gc.Theme.prototype.removeAllStars = function () {
        for (var star, e = this.stars.length; e--;)
            star = this.stars.shift(),
                this.tmpStars.push(star),
                this.container.removeChild(star)
    },
    gc.Theme.prototype.pause = function () {
        this.tween.pause(),
            this.tween2.pause(),
            this.ship.tween.pause()
    },
    gc.Theme.prototype.resume = function () {
        this.tween.resume(),
            this.tween2.resume(),
            this.ship.tween.resume()
    },
    gc.Theme.prototype.removeAll = function () {
        this.removeAllStars(),
            this.removeChildren(),
            this.tween.kill(),
            this.tween2.kill(),
            this.ship.tween.kill(),
        this.starInterval && clearInterval(this.starInterval)
    },
    gc.Theme.prototype.updateTransform = function () {
        PIXI.Container.prototype.updateTransform.call(this)
    }