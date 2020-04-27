/**
 * Created by juho on 2016-03-30.
 */

gc.NumberText = function(fileName, align, space, iconName, iconAlign, strLen) {
    this.CENTER = 'center';
    this.RIGHT = 'right';

    this.value = 0;
    this.isChange = false;
    this.list = [];
    this.tmpList = [];
    this.fileName = fileName;
    this.align = align;
    this.space = space;
    this.iconName = iconName;
    this.iconAlign = iconAlign;
    this.strLen = strLen;
    this.icon = null;

    PIXI.Container.call(this);

    this.container = new PIXI.Container();
    this.addChild(this.container);
    this.setValue(0);
};
gc.NumberText.constructor = gc.NumberText;
gc.NumberText.prototype = Object.create(PIXI.Container.prototype);

gc.NumberText.prototype.setValue = function(value){
    this.value = value;
    this.isChange = true;
};

gc.NumberText.prototype.getNumberSprite = function(num){
    var sprite, name = this.fileName + num + '.png';
    if(this.tmpList.length > 0){
        sprite = this.tmpList.shift();
        sprite.texture = PIXI.Texture.fromFrame(name);
    }else{
        sprite = PIXI.Sprite.fromFrame(name);
    }
    return sprite;
};

gc.NumberText.prototype.removeAll = function(){
    var txt, i = this.list.length;
    while(i--){
        txt = this.list.shift();
        this.tmpList.push(txt);
    }
    if(this.container) this.container.removeChildren();
};

gc.NumberText.prototype.updateTransform = function() {
    if(this.isChange){
        this.removeAll();

        var numStr = this.value.toString();
        if(this.strLen) numStr = Util.zeroStr(this.value, this.strLen);

        var index = 0, txt,
            space = 0,
            i = numStr.length;

        if(this.iconName){
            if(!this.icon) this.icon = PIXI.Sprite.fromFrame(this.iconName + '.png');
            this.container.addChild(this.icon);
            if(this.iconAlign == 'left'){
                space += this.icon.width + this.space;
            }
        }

        while(i--){
            txt = this.getNumberSprite(parseInt(numStr.substr(index, 1))+1);
            txt.x = space;
            space += txt.width + this.space;
            index++;
            this.container.addChild(txt);
            this.list[i] = txt;
        }

        if(this.iconAlign == 'right'){
            this.icon.x = space;
            space += this.icon.width + this.space;
        }

        if(this.align == this.CENTER){
            this.container.x = -space/2;
        }else if(this.align == this.RIGHT){
            this.container.x = -space;
        }
        this.isChange = false;
    }
    PIXI.Container.prototype.updateTransform.call(this);
};

