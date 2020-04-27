gc.MovieClip = function (fileName, start, end, speed, repeat) {
    PIXI.extras.AnimatedSprite.call(this,
        this.getRepeatTexture(fileName, start, end, repeat)),
        this.animationSpeed = speed,
        this.play()
},
    gc.MovieClip.constructor = gc.MovieClip,
    gc.MovieClip.prototype = Object.create(PIXI.extras.AnimatedSprite.prototype),
    gc.MovieClip.prototype.setAnimation = function (fileName, start, end, speed, repeat) {
        this.textures = this.getRepeatTexture(fileName, start, end, repeat),
            this.animationSpeed = speed
    },
    gc.MovieClip.prototype.getRepeatTexture = function (fileName, start, end, repeat) {
        for (var r = [], o = repeat || 1; o--;)
            r = r.concat(this.getTexture(fileName, start, end));
        return r
    },
    gc.MovieClip.prototype.getTexture = function (fileName, start, end) {
        for (var n = [], r = end - (start = start || 1) + 1, o = start; r--;)
            n.push(PIXI.Texture.fromFrame(fileName + o + ".png")), o++;
        return n
    },
    gc.MovieClip.prototype.updateTransform = function () {
        PIXI.extras.AnimatedSprite.prototype.updateTransform.call(this)
    }