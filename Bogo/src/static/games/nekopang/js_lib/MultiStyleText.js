(function () {
    var root = this;
    var PIXI = root.PIXI;
    if (!PIXI) return;
    var MultiStyleText = function (text, textStyles, alignmentStyle) {
        PIXI.Text.call(this, text, alignmentStyle);
        this.setTextStyles(textStyles);
        this.prev_text = undefined;
    };
    MultiStyleText.prototype = Object.create(PIXI.Text.prototype);
    MultiStyleText.prototype.constructor = MultiStyleText;
    MultiStyleText.prototype.setAlignmentStyle = MultiStyleText.prototype.setStyle = function (style) {
        style = style || {};
        style.align = style.align || 'left';
        style.wordWrap = style.wordWrap || false;
        style.wordWrapWidth = style.wordWrapWidth || 100;
        this.style = style;
        this.dirty = true;
    };

    function setDefaultTextStyle(style) {
        style = style || {};
        style.font = style.font || 'bold 20pt Arial';
        style.fill = style.fill || 'black';
        style.stroke = style.stroke || 'black';
        style.strokeThickness = style.strokeThickness || 0;
        style.dropShadow = style.dropShadow || false;
        style.dropShadowAngle = style.dropShadowAngle || Math.PI / 6;
        style.dropShadowDistance = style.dropShadowDistance || 4;
        style.dropShadowColor = style.dropShadowColor || 'black';
    }

    MultiStyleText.prototype.setTextStyles = function (styles) {
        for (var styleId in styles) {
            if (styles.hasOwnProperty(styleId)) {
                setDefaultTextStyle(styles[styleId]);
            }
        }
        if (!styles.def) {
            styles.def = {};
            setDefaultTextStyle(styles.def);
        }
        this.textStyles = styles;
        this.dirty = true;
    };
    MultiStyleText.prototype._getTextDataPerLine = function (lines) {
        var outputTextData = [];
        var re = /<\/?([a-z]+)>/g;
        var currentStyle = this.textStyles.def;
        for (var i = 0; i < lines.length; i++) {
            var lineTextData = [];
            var matches = [];
            var matchArray;
            while ((matchArray = re.exec(lines[i])) !== null && matches.push(matchArray)) ;
            if (!matches.length) {
                lineTextData.push({text: lines[i], style: currentStyle});
            }
            else {
                var currentSearchIdx = 0;
                for (var j = 0; j < matches.length; j++) {
                    if (matches[j].index > currentSearchIdx) {
                        lineTextData.push({
                            text: lines[i].substring(currentSearchIdx, matches[j].index), style: currentStyle
                        });
                    }
                    if (matches[j][0][1] == '/') currentStyle = this.textStyles.def; else currentStyle = this.textStyles[matches[j][1]] || this.textStyles.def;
                    currentSearchIdx = matches[j].index + matches[j][0].length;
                }
                if (currentSearchIdx < lines[i].length) {
                    lineTextData.push({text: lines[i].substring(currentSearchIdx), style: this.textStyles.def});
                }
            }
            outputTextData.push(lineTextData);
        }
        return outputTextData;
    };
    MultiStyleText.prototype.updateText = function () {
        if (this.prev_text === this.text) {
            return;
        }
        this.prev_text = this.text;
        this.texture.baseTexture.resolution = this.resolution;
        var outputText = this.text;
        var textStyles = this.textStyles;
        var i, j;
        if (this.style.wordWrap) outputText = this.wordWrap(this.text);
        var lines = outputText.split(/(?:\r\n|\r|\n)/);
        var outputTextData = this._getTextDataPerLine(lines);
        var lineWidths = [];
        var lineHeights = [];
        var maxLineWidth = 0;
        for (i = 0; i < lines.length; i++) {
            var lineWidth = 0;
            var lineHeight = 0;
            for (j = 0; j < outputTextData[i].length; j++) {
                this.context.font = outputTextData[i][j].style.font;
                outputTextData[i][j].width = this.context.measureText(outputTextData[i][j].text).width;
                lineWidth += outputTextData[i][j].width;
                outputTextData[i][j].fontProperties = this.determineFontProperties(outputTextData[i][j].style.font);
                lineHeight = Math.max(lineHeight, outputTextData[i][j].fontProperties.fontSize + outputTextData[i][j].style.strokeThickness);
            }
            lineWidths[i] = lineWidth;
            lineHeights[i] = lineHeight;
            maxLineWidth = Math.max(maxLineWidth, lineWidth);
        }
        var stylesArray = Object.keys(textStyles).map(function (k) {
            return textStyles[k];
        });
        var maxStrokeThickness = stylesArray.reduce(function (prev, curr) {
            return Math.max(prev, curr.strokeThickness);
        }, 0);
        var maxDropShadowDistance = stylesArray.reduce(function (prev, curr) {
            var value = curr.dropShadow ? curr.dropShadowDistance : 0;
            return Math.max(prev, value);
        }, 0);
        var width = maxLineWidth + maxStrokeThickness + maxDropShadowDistance;
        var height = (Math.max.apply(null, lineHeights) * lines.length) + maxDropShadowDistance;
        this.canvas.width = (width + this.context.lineWidth) * this.resolution;
        this.canvas.height = height * this.resolution;
        this.context.scale(this.resolution, this.resolution);
        if (navigator.isCocoonJS) this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.textBaseline = 'alphabetic';
        this.context.lineJoin = 'round';
        var linePositionX;
        var linePositionY;
        for (i = 0; i < outputTextData.length; i++) {
            var line = outputTextData[i];
            linePositionX = 0;
            for (j = 0; j < line.length; j++) {
                var textStyle = line[j].style;
                var text = line[j].text;
                var fontProperties = line[j].fontProperties;
                this.context.font = textStyle.font;
                this.context.strokeStyle = textStyle.stroke;
                this.context.lineWidth = textStyle.strokeThickness;
                linePositionX += maxStrokeThickness / 2;
                linePositionY = (maxStrokeThickness / 2 + i * lineHeights[i]) + fontProperties.ascent;
                if (this.style.align === 'right') {
                    linePositionX += maxLineWidth - lineWidths[i];
                }
                else if (this.style.align === 'center') {
                    linePositionX += (maxLineWidth - lineWidths[i]) / 2;
                }
                if (textStyle.dropShadow) {
                    this.context.fillStyle = textStyle.dropShadowColor;
                    var xShadowOffset = Math.sin(textStyle.dropShadowAngle) * textStyle.dropShadowDistance;
                    var yShadowOffset = Math.cos(textStyle.dropShadowAngle) * textStyle.dropShadowDistance;
                    if (textStyle.fill) {
                        this.context.fillText(text, linePositionX + xShadowOffset, linePositionY + yShadowOffset);
                    }
                }
                this.context.fillStyle = textStyle.fill;
                if (textStyle.stroke && textStyle.strokeThickness) {
                    this.context.strokeText(text, linePositionX, linePositionY);
                }
                if (textStyle.fill) {
                    this.context.fillText(text, linePositionX, linePositionY);
                }
                linePositionX += line[j].width;
                linePositionX -= maxStrokeThickness / 2;
            }
        }
        this.updateTexture();
    };
    PIXI.MultiStyleText = MultiStyleText;
}).call(this);