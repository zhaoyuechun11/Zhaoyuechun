gc.Gauge = function (bar, total, barWidth, barHeight, round, startW) {
    PIXI.Container.call(this),
        this.total = total,
        this.value = 0,
        this.barWidth = barWidth,
        this.barHeight = barHeight,
        this.round = round,
        this.startW = startW || 0,
        this.graphic = new PIXI.Graphics,
        this.graphic.beginFill(16777215, 1),
        round
            ? this.graphic.drawRoundedRect(0, 0, this.barWidth, this.barHeight, round)
            : this.graphic.drawRect(0, 0, this.barWidth, this.barHeight),
        this.addChild(this.graphic),
        this.bar = new PIXI.Sprite.fromFrame(bar + ".png"),
        this.bar.mask = this.graphic,
        this.addChild(this.bar)
},
    gc.Gauge.constructor = gc.Gauge,
    gc.Gauge.prototype = Object.create(PIXI.Container.prototype),
    gc.Gauge.prototype.init = function () {
        this.value = 0,
            this.setValue(this.value)
    },
    gc.Gauge.prototype.setValue = function (value) {
        this.value = value,
        this.value <= 0 && (this.value = 0),
            0 == this.value
                ? this.bar.visible = false
                : (this.bar.visible = true,
                    this.bar.x = this.value / this.total * (this.barWidth - this.startW) - this.barWidth + this.startW)
    },
    gc.Gauge.prototype.setTotal = function (total) {
        this.total = total
    },
    gc.Gauge.prototype.updateTransform = function () {
        PIXI.Container.prototype.updateTransform.call(this)
    }