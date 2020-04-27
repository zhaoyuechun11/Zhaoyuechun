/**
 * Created by admin on 2018-05-17.
 */
var TextStyle = (function () {
    function TextStyle() {
    }
    TextStyle.findStyle = function (data) {
        var style = null;
        var pass = true;
        for (var i = 0; i < this.styles.length; i++) {
            pass = true;
            if (data.font) {
                if (this.styles[i].fontFamily != data.font) {
                    pass = false;
                    break;
                }
            }
            if (data.size) {
                if (this.styles[i].fontSize != data.size + "px") {
                    pass = false;
                    break;
                }
            }
            if (data.fillCol) {
                if (this.styles[i].fill != data.fillCol) {
                    pass = false;
                    break;
                }
            }
            if (data.strokeCol) {
                if (this.styles[i].stroke != data.strokeCol) {
                    pass = false;
                    break;
                }
            }
            if (data.strokeThick) {
                if (this.styles[i].strokeThickness != data.strokeThick) {
                    pass = false;
                    break;
                }
            }
            if (data.fontWeight) {
                if (this.styles[i].fontWeight != data.fontWeight) {
                    pass = false;
                    break;
                }
            }
            if (data.fontAlign) {
                if (this.styles[i].fontAlign != data.fontAlign) {
                    pass = false;
                    break;
                }
            }
            if (data.wordWrapWidth) {
                if (this.styles[i].wordWrapWidth != data.wordWrapWidth) {
                    pass = false;
                    break;
                }
            }
            style = this.styles[i];
            break;
        }
        return style;
    };
    //font:string, size:string, fillCol:string, strokeCol:string, strokeThick:number, fontWeight:string, fontAlign:string, wordWrapWidth:number
    TextStyle.makeStyle = function (data) {
        var style = this.findStyle(data);
        if (!style) {
            style = new PIXI.TextStyle({
                fontFamily: (data.font) ? data.font : 'Arial',
                fontSize: (data.size) ? data.size + "px" : '20px',
                fill: (data.fillCol) ? data.fillCol : '#ffffff',
                stroke: (data.strokeCol) ? data.strokeCol : '#000000',
                strokeThickness: (data.strokeThick) ? data.strokeThick : 0,
                fontWeight: (data.fontWeight) ? data.fontWeight : 'normal',
                fontAlign: (data.fontAlign) ? data.fontAlign : 'center',
                wordWrap: (data.wordWrapWidth && data.wordWrapWidth > 0) ? true : false,
                wordWrapWidth: (data.wordWrapWidth && data.wordWrapWidth > 0) ? data.wordWrapWidth : 0
            });
            this.styles.push(style);
        }
        return style;
    };
    return TextStyle;
}());
TextStyle.styles = [];