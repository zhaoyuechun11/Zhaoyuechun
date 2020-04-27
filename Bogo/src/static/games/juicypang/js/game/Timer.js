gc.Timer = function (callback, delay) {
    this.timer,
        this.sTime,
        this.callback = callback,
        this.delay = delay,
        this.args = arguments,
        this.isPlay = false
},
    gc.Timer.constructor = gc.Timer,
    gc.Timer.prototype.play = function (callback, delay) {
        callback && (this.callback = callback,
            this.delay = delay,
            this.args = arguments),
            this.isPlay = true,
            this.sTime = new Date,
            this.resume()
    },
    gc.Timer.prototype.clear = function () {
        clearTimeout(this.timer),
            this.isPlay = false
    },
    gc.Timer.prototype.pause = function () {
        this.isPlay && (this.clear(),
            this.delay -= new Date - this.sTime)
    },
    gc.Timer.prototype.resume = function () {
        this.isPlay && (this.timer = setTimeout(function () {
                this.isPlay = false,
                    this.callback.apply(self, Array.prototype.slice.call(this.args, 2,
                        this.args.length))
            }.bind(this),
            this.delay))
    }