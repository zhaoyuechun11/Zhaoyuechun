/**
 * MovieClip
 * Created by juho on 2016-03-29.
 */

gc.MovieClip = function(fileName, start, end, speed, repeat) {
    PIXI.extras.AnimatedSprite.call(this, this.getRepeatTexture(fileName, start, end, repeat));
    this.animationSpeed = speed;
    this.play();
};

gc.MovieClip.constructor = gc.MovieClip;
gc.MovieClip.prototype = Object.create(PIXI.extras.AnimatedSprite.prototype);

gc.MovieClip.prototype.setAnimation = function(fileName, start, end, speed, repeat){
    this.textures = this.getRepeatTexture(fileName, start, end, repeat);
    this.animationSpeed = speed;
};

gc.MovieClip.prototype.getRepeatTexture = function(fileName, start, end, repeat){
    var textures = [];
    var i = repeat || 1;
    while(i--){
        textures = textures.concat(this.getTexture(fileName, start, end));
    }
    return textures;
};

gc.MovieClip.prototype.getTexture = function(fileName, start, end){
    start = start || 1;
    var textures = [],
        i = end - start + 1,
        j = start;
    while(i--) {
        textures.push(PIXI.Texture.fromFrame(fileName + j + '.png'));
        j++;
    }
    return textures;
};

gc.MovieClip.prototype.updateTransform = function() {
    PIXI.extras.AnimatedSprite.prototype.updateTransform.call(this);
};

