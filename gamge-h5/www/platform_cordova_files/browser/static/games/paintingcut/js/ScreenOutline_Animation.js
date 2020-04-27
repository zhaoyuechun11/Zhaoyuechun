'use strict';

function ScreenOutline_Animation(speed) {
    this.aniSpeed = speed;
    this.top_sprite_data = new Array();
    this.down_sprite_data = new Array();
    this.left_sprite_data = new Array();
    this.right_sprite_data = new Array();
    this.iter = 0;
    this.anim_event;
}

ScreenOutline_Animation.prototype.LoadingSprite = function()
{
    var k = 1;

    // top
    for(k = 1; k < 4; k++) {
        var pngName = 'item_eff_1_' + k + '.png';
        var loadSprite = MG.game.add.sprite(MG.game.world.centerX, 180, 'atlas_UI', pngName);
        loadSprite.scale.setTo(1);
        loadSprite.anchor.setTo(0.5, 0);
        loadSprite.visible = false;
        this.top_sprite_data.push(loadSprite);
    }

    // down
    for(k = 1; k < 4; k++) {
        var pngName = 'item_eff_1_' + k + '.png';
        var loadSprite = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.height, 'atlas_UI', pngName);
        loadSprite.scale.setTo(1);
        loadSprite.anchor.setTo(0.5, 1);
        loadSprite.visible = false;
        this.down_sprite_data.push(loadSprite);
    }

    // left
    for(k = 1; k < 4; k++) {
        var pngName = 'item_eff_2_' + k + '.png';
        var loadSprite = MG.game.add.sprite(0, MG.game.world.centerY + 90, 'atlas_UI', pngName);
        loadSprite.scale.setTo(1, 1.02);
        loadSprite.anchor.setTo(0, 0.5);
        loadSprite.visible = false;
        this.left_sprite_data.push(loadSprite);
    }

    // right
    for(k = 1; k < 4; k++) {
        var pngName = 'item_eff_2_' + k + '.png';
        var loadSprite = MG.game.add.sprite(MG.game.world.width, MG.game.world.centerY + 90, 'atlas_UI', pngName);
        loadSprite.scale.setTo(1, 1.02);
        loadSprite.anchor.setTo(1, 0.5);
        loadSprite.visible = false;
        this.right_sprite_data.push(loadSprite);
    }
};

ScreenOutline_Animation.prototype.Start_SpriteAnimation = function() {
    if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_item_idle', true);
    this.iter = 0;
    this.anim_event = MG.game.time.events.loop(this.aniSpeed, this.Playing, this);
};

ScreenOutline_Animation.prototype.Stop_SpriteAnimation = function() {
    if(StorageManager.prototype.get('isSfx')) MG.StopAudio('se_item_idle');
    MG.game.time.events.remove(this.anim_event);
    this.iter = 0;
    this.Visible_AllScrite(false);
};

ScreenOutline_Animation.prototype.Playing = function() {
    this.Visible_AllScrite(false);
    this.top_sprite_data[this.iter].visible = true;
    MG.game.world.bringToTop(this.top_sprite_data[this.iter]);
    this.down_sprite_data[this.iter].visible = true;
    MG.game.world.bringToTop(this.down_sprite_data[this.iter]);
    this.left_sprite_data[this.iter].visible = true;
    MG.game.world.bringToTop(this.left_sprite_data[this.iter]);
    this.right_sprite_data[this.iter].visible = true;
    MG.game.world.bringToTop(this.right_sprite_data[this.iter]);

    if(++this.iter >= this.top_sprite_data.length) this.iter = 0;
};

ScreenOutline_Animation.prototype.Visible_AllScrite = function (_view) {
    var i = 0;
    for(i = 0; i < this.top_sprite_data.length; i++) {
        this.top_sprite_data[i].visible = _view;
    }
    for(i = 0; i < this.down_sprite_data.length; i++) {
        this.down_sprite_data[i].visible = _view;
    }
    for(i = 0; i < this.left_sprite_data.length; i++) {
        this.left_sprite_data[i].visible = _view;
    }
    for(i = 0; i < this.right_sprite_data.length; i++) {
        this.right_sprite_data[i].visible = _view;
    }
};
