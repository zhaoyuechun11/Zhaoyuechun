/**
 * Created by juho on 2016-03-30.
 * ¼öÁ¤ chadol 2016-09-20
 */

ResultNumberText = function(fileName, align, space, iconName, iconAlign, commaName) {
    this.CENTER = 'center';
    this.RIGHT = 'right';
    this.LEFT = 'left';

    this.value = 0;
    this.isChange = false;
    this.list = [];
    this.tmpList = [];
    this.fileName = fileName;
    this.align = align;
    this.space = space;
    this.iconName = iconName;
    this.iconAlign = iconAlign;
    this.commaName = commaName;
    this.icon = null;

    PIXI.Container.call(this);

    this.container = new PIXI.Container();
    this.addChild(this.container);
    this.setValue(0);
};
ResultNumberText.constructor = ResultNumberText;
ResultNumberText.prototype = Object.create(PIXI.Container.prototype);

ResultNumberText.prototype.setValue = function(value){
    this.value = value;
    this.isChange = true;
};

ResultNumberText.prototype.getNumberSprite = function(num){
    var sprite, name = this.fileName +  CipherCheck.create(num) + '.png';

    if(this.tmpList.length > 0){
        sprite = this.tmpList.shift();
        sprite.texture = PIXI.Texture.fromFrame(name);
    }else{
        sprite = PIXI.Sprite.fromFrame(name);
    }
    return sprite;
};

ResultNumberText.prototype.getCommaSprite = function(){
    var sprite, name = this.commaName + '.png';
    if(this.tmpList.length > 0){
        sprite = this.tmpList.shift();
        sprite.texture = PIXI.Texture.fromFrame(name);
    }else{
        sprite = PIXI.Sprite.fromFrame(name);
    }
    return sprite;
};

ResultNumberText.prototype.removeAll = function(){
    var txt, i = this.list.length;
    while(i--){
        txt = this.list.shift();
        this.tmpList.push(txt);
    }
    if(this.container) this.container.removeChildren();
};

ResultNumberText.prototype.updateTransform = function() {
    if(this.isChange){
        this.removeAll();

        var numStr = (this.commaName) ? Util.comma(this.value) : this.value.toString();
        var index = 0, txt, str,
            space = 0,
            i = numStr.length;

        if(this.iconName){
            if(!this.icon) this.icon = PIXI.Sprite.fromFrame(this.iconName);
            this.container.addChild(this.icon);
            if(this.iconAlign == 'left'){
                space += this.icon.width + this.space;
            }
        }
        while(i--){
            str = numStr.substr(index, 1);
            if(str == ','){
                txt = this.getCommaSprite();
            }else{
                txt = this.getNumberSprite(parseInt(str)+1);
            }
            txt.x = space;
            space += txt.width;
            if(i > 0) space += this.space;
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

