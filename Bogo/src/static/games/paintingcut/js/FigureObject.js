'use strict';

function FigureObject(figurePoints) {
    this.figurePoints = figurePoints;
    this.walls = MG.game.add.group();
    this.walls.enableBody = true;
    this.wallLineAdd = 2;
}

FigureObject.prototype.CreateWalls = function()
{
    for (var i = 0; i < 4; i++)
    {
        var s = this.walls.create(MG.game.world.centerX, MG.game.world.centerY, "wall");
        s.name = 'walls' + s;
        s.scale.setTo(0);
        s.anchor.setTo(0.5);
        s.position.setTo(-1000, -1000);
        s.body.immovable = true;
    }
};

FigureObject.prototype.SetWalls = function()
{
    this.ReSetWalls();

    for(var i = 0; i < this.figurePoints.length; i++)
    {
        var nextIndex = i + 1;
        if(nextIndex >= this.figurePoints.length) nextIndex = 0;

        if(parseInt(this.figurePoints[i].x) !== parseInt(this.figurePoints[nextIndex].x))
        {
            if (parseInt(this.figurePoints[i].x) < parseInt(this.figurePoints[nextIndex].x))
            {
                this.walls.children[i].anchor.setTo(0, 0.5);
            }
            else
            {
                this.walls.children[i].anchor.setTo(1, 0.5);
            }

            this.walls.children[i].scale.setTo( Math.abs((this.figurePoints[nextIndex].x - this.figurePoints[i].x)) + this.wallLineAdd, 5);
            this.walls.children[i].position.setTo(this.figurePoints[i].x, this.figurePoints[i].y);
        }
        else
        {
            if (parseInt(this.figurePoints[i].y) < parseInt(this.figurePoints[nextIndex].y))
            {
                this.walls.children[i].anchor.setTo(0.5, 0);
            }
            else
            {
                this.walls.children[i].anchor.setTo(0.5, 1);
            }

            this.walls.children[i].scale.setTo(5, Math.abs((this.figurePoints[nextIndex].y - this.figurePoints[i].y)) + this.wallLineAdd);
            this.walls.children[i].position.setTo(this.figurePoints[i].x, this.figurePoints[i].y);
        }
    }
};

FigureObject.prototype.ReSetWalls = function()
{
    for(var i = 0; i < this.walls.children.length; i++)
    {
        this.walls.children[i].scale.setTo(0, 0);
        this.walls.children[i].position.setTo(-1000, -1000);
    }
};

FigureObject.prototype.DeleteWalls = function()
{
    // this.walls.destroy(true);

    for(var i = 0; i < this.walls.children.length; i++)
    {
        this.walls.remove(this.walls.children[i]);
    }

    this.walls.visible = false;
};

FigureObject.prototype.Bomb = function(_callBack)
{
    var _power = MG.gameSheetsData["BombPower"] * 0.5;
    var leftTop = new Phaser.Point;
    var rightTop = new Phaser.Point;
    var leftDown = new Phaser.Point;
    var rightDown = new Phaser.Point;

    this.figurePoints[0].x -= _power;
    this.figurePoints[0].y -= _power;
    this.figurePoints[1].x += _power;
    this.figurePoints[1].y -= _power;
    this.figurePoints[2].x += _power;
    this.figurePoints[2].y += _power;
    this.figurePoints[3].x -= _power;
    this.figurePoints[3].y += _power;

    if(parseInt(this.figurePoints[0].x) < 0) {
        leftTop.x = Math.abs(this.figurePoints[0].x);
        this.figurePoints[0].x = 0;
    } else {
        leftTop.x = 0;
    }

    if(parseInt(this.figurePoints[0].y) < 180) {
        leftTop.y = Math.abs(180 - this.figurePoints[0].y);
        this.figurePoints[0].y = 180;
    } else {
        leftTop.y = 0;
    }

    if(parseInt(this.figurePoints[1].x) > MG.game.world.width) {
        rightTop.x = this.figurePoints[1].x - MG.game.world.width;
        this.figurePoints[1].x = MG.game.world.width;
    } else {
        rightTop.x = 0;
    }

    if(parseInt(this.figurePoints[1].y) < 180) {
        rightTop.y = Math.abs(180 - this.figurePoints[1].y);
        this.figurePoints[1].y = 180;
    } else {
        rightTop.y = 0;
    }

    if(parseInt(this.figurePoints[2].x) > MG.game.world.width) {
        rightDown.x = this.figurePoints[2].x - MG.game.world.width;
        this.figurePoints[2].x = MG.game.world.width;
    } else {
        rightDown.x = 0;
    }

    if(parseInt(this.figurePoints[2].y) > MG.game.world.height) {
        rightDown.y = this.figurePoints[2].y - MG.game.world.height;
        this.figurePoints[2].y = MG.game.world.height;
    } else {
        rightDown.y = 0;
    }

    if(parseInt(this.figurePoints[3].x) < 0) {
        leftDown.x = Math.abs(this.figurePoints[3].x);
        this.figurePoints[3].x = 0;
    } else {
        leftDown.x = 0;
    }

    if(parseInt(this.figurePoints[3].y) > MG.game.world.height) {
        leftDown.y = this.figurePoints[3].y - MG.game.world.height;
        this.figurePoints[3].y = MG.game.world.height;
    } else {
        leftDown.y = 0;
    }

    this.figurePoints[0].x -= rightTop.x;
    this.figurePoints[0].y -= leftDown.y;
    this.figurePoints[1].x += leftTop.x;
    this.figurePoints[1].y -= rightDown.y;
    this.figurePoints[2].x += leftDown.x;
    this.figurePoints[2].y += rightTop.y;
    this.figurePoints[3].x -= rightDown.x;
    this.figurePoints[3].y += leftTop.y;

    if(parseInt(this.figurePoints[0].x) < 0) this.figurePoints[0].x = 0;
    if(parseInt(this.figurePoints[0].y) < 180) this.figurePoints[0].y = 180;
    if(parseInt(this.figurePoints[1].x) > MG.game.world.width) this.figurePoints[1].x = MG.game.world.width;
    if(parseInt(this.figurePoints[1].y) < 180) this.figurePoints[1].y = 180;
    if(parseInt(this.figurePoints[2].x) > MG.game.world.width) this.figurePoints[2].x = MG.game.world.width;
    if(parseInt(this.figurePoints[2].y) > MG.game.world.height) this.figurePoints[2].y = MG.game.world.height;
    if(parseInt(this.figurePoints[3].x) < 0) this.figurePoints[3].x = 0;
    if(parseInt(this.figurePoints[3].y) > MG.game.world.height) this.figurePoints[3].y = MG.game.world.height;

    _callBack();

    // console.log("=== after _callBack ===");
    // this.SetWalls();
    // figureManager.ReDrawAllFigure();
};

FigureObject.prototype.DrawMask = function(mask)
{
    mask.moveTo(this.figurePoints[0].x, this.figurePoints[0].y);

    for(var i = 0; i < this.figurePoints.length; i++)
    {
        mask.lineTo(this.figurePoints[i].x, this.figurePoints[i].y);
    }
};

FigureObject.prototype.ColliderListener = function(balls)
{
    MG.game.physics.arcade.collide(this.walls, balls);

    // for(var i = 0; i < this.walls.children.length; i++)
    // {
    //     for(var k = 0; k < balls.length; k++)
    //     {
    //         MG.game.physics.arcade.collide(this.walls.children[i], balls[k]);
    //     }
    // }
};

FigureObject.prototype.HiddenFigure = function() {
    //this.walls.destroy(true);
    this.ReSetWalls();
    this.figurePoints[0].x = -500;
    this.figurePoints[0].y = -500;
    this.figurePoints[1].x = -500;
    this.figurePoints[1].y = -500;
    this.figurePoints[2].x = -500;
    this.figurePoints[2].y = -500;
    this.figurePoints[3].x = -500;
    this.figurePoints[3].y = -500;
};
