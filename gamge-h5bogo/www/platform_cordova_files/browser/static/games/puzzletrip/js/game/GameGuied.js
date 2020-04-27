gc.GameGuied = function(){
    PIXI.Container.call(this);

    this.inGuied = false;
    this.dragPuzzleArray = [];

    this.blockArray = [];

};

gc.GameGuied.constructor = gc.GameGuied;
gc.GameGuied.prototype = Object.create(PIXI.Container.prototype);

gc.GameGuied.prototype.showGuied = function (array,puzzleArray) {

    //this.shadow = new PIXI.Sprite(gc.loader.resources['uishadow'].texture);
    //this.addChild(this.shadow);
    this.removeChildren();

    for(var i=0;i<array.length;i++){
        if(i > 2){
            break;
        }
        var x = array[i][0];
        var y = array[i][1];
        var sprite = new PIXI.Sprite(puzzleArray[x][y][1].texture);
        sprite.anchor.set(0.5,0.5);
        sprite.x = puzzleArray[x][y][1].x;
        sprite.y = puzzleArray[x][y][1].y;
        this.addChild(sprite);
        TweenMax.to(sprite.scale,0.3,{x:1.1,y:1.1,repeat:-1,yoyo:true});
    }

    //this.checkCanDragPuzzle(array,puzzleArray);
    //for(var i=0;i<this.dragPuzzleArray.length;i++){
    //    var x = this.dragPuzzleArray[i][0];
    //    var y = this.dragPuzzleArray[i][1];
    //    var sprite = new PIXI.Sprite(puzzleArray[x][y][1].texture);
    //    sprite.anchor.set(0.5,0.5);
    //    sprite.x = puzzleArray[x][y][1].x;
    //    sprite.y = puzzleArray[x][y][1].y;
    //    this.addChild(sprite);
    //    TweenMax.to(sprite.scale,0.3,{x:1.2,y:1.2,repeat:-1,yoyo:true});
    //}
}

gc.GameGuied.prototype.checkCanDragPuzzle = function (array, puzzleArray) {
    var x = array[0][0];
    var y = array[0][1];
    var type = puzzleArray[x][y][0];
    this.dragPuzzleArray = [];
    this.dragPuzzleArray.push([x,y]);

    this.blockArray = [];
    for(var i = 0; i < 6; i++){
        var newArray = [];
        for(var j = 0; j < 7; j++){
            newArray.push(puzzleArray[i][j][0]);
        }
        this.blockArray.push(newArray);
    }

    this.blockArray[x][y] = 0;

    this.newCheckDrag(x-1,y,type);
    this.newCheckDrag(x+1,y,type);
    this.newCheckDrag(x,y-1,type);
    this.newCheckDrag(x,y+1,type);
    if(y%2 == 0){
        this.newCheckDrag(x+1,y-1,type);
        this.newCheckDrag(x+1,y+1,type);
    }else{
        this.newCheckDrag(x-1,y-1,type);
        this.newCheckDrag(x-1,y+1,type);
    }

    this.newCheckDrag(x,y,type);
}

gc.GameGuied.prototype.newCheckDrag = function (x, y,type) {
    if(x >=0 && x<6 && y >=0 && y<7){
        if(this.blockArray[x][y] == type || (this.blockArray[x][y] > 5 && this.blockArray[x][y] < 15)){
            this.dragPuzzleArray.push([x,y]);
            this.blockArray[x][y] = 0;
            this.newCheckDrag(x-1,y,type);
            this.newCheckDrag(x+1,y,type);
            this.newCheckDrag(x,y-1,type);
            this.newCheckDrag(x,y+1,type);
            if(y%2 == 0){
                this.newCheckDrag(x+1,y-1,type);
                this.newCheckDrag(x+1,y+1,type);
            }else{
                this.newCheckDrag(x-1,y-1,type);
                this.newCheckDrag(x-1,y+1,type);
            }
        }
    }
}


gc.GameGuied.prototype.removeAll = function () {
    this.removeChildren();
}

gc.GameGuied.prototype.checkPuzzle = function (puzzleArray) {

    if(this.inGuied){
        return;
    }

    var array = [];

    for(var i=5;i>=0;i--){
        for(var j= 0;j<7;j++){
            var type = puzzleArray[i][j][0];
            if(type >5 && type < 14){
                array.push([i,j]);
                this.showGuied(array,puzzleArray);
                return;
            }
        }
    }

    for(var i=0;i<6;i++){
        for(var j=0;j<7;j++){
            array = [];
            var type = puzzleArray[i][j][0];
            if(type > 14){
                continue;
            }

            if(type >5 && type < 14){
                array.push([i,j]);
                this.showGuied(array,puzzleArray);
                return;
            }

            if(type == 14){
                array.push([i,j]);
                var array1 = [];
                var array2 = [];
                var array3 = [];
                var array4 = [];
                var array5 = [];
                var array14 = [];
                if(i-1 >= 0){
                    if(puzzleArray[i-1][j][0] == 1){
                        array1.push([i-1,j]);
                    }else if(puzzleArray[i-1][j][0] == 2){
                        array2.push([i-1,j]);
                    }else if(puzzleArray[i-1][j][0] == 3){
                        array3.push([i-1,j]);
                    }else if(puzzleArray[i-1][j][0] == 4){
                        array4.push([i-1,j]);
                    }else if(puzzleArray[i-1][j][0] == 5){
                        array5.push([i-1,j]);
                    }else if(puzzleArray[i-1][j][0] == 14){
                        array14.push([i-1,j]);
                    }
                }
                if(i+1 <= 5){
                    if(puzzleArray[i+1][j][0] == 1){
                        array1.push([i+1,j]);
                    }else if(puzzleArray[i+1][j][0] == 2){
                        array2.push([i+1,j]);
                    }else if(puzzleArray[i+1][j][0] == 3){
                        array3.push([i+1,j]);
                    }else if(puzzleArray[i+1][j][0] == 4){
                        array4.push([i+1,j]);
                    }else if(puzzleArray[i+1][j][0] == 5){
                        array5.push([i+1,j]);
                    }else if(puzzleArray[i+1][j][0] == 14){
                        array14.push([i+1,j]);
                    }
                }
                if(j-1 >= 0){
                    if(puzzleArray[i][j-1][0] == 1){
                        array1.push([i,j-1]);
                    }else if(puzzleArray[i][j-1][0] == 2){
                        array2.push([i,j-1]);
                    }else if(puzzleArray[i][j-1][0] == 3){
                        array3.push([i,j-1]);
                    }else if(puzzleArray[i][j-1][0] == 4){
                        array4.push([i,j-1]);
                    }else if(puzzleArray[i][j-1][0] == 5){
                        array5.push([i,j-1]);
                    }else if(puzzleArray[i][j-1][0] == 14){
                        array14.push([i,j-1]);
                    }
                }
                if(j+1 <= 6){
                    if(puzzleArray[i][j+1][0] == 1){
                        array1.push([i,j+1]);
                    }else if(puzzleArray[i][j+1][0] == 2){
                        array2.push([i,j+1]);
                    }else if(puzzleArray[i][j+1][0] == 3){
                        array3.push([i,j+1]);
                    }else if(puzzleArray[i][j+1][0] == 4){
                        array4.push([i,j+1]);
                    }else if(puzzleArray[i][j+1][0] == 5){
                        array5.push([i,j+1]);
                    }else if(puzzleArray[i][j+1][0] == 14){
                        array14.push([i,j+1]);
                    }
                }
                if(j%2 ==0){
                    if(j-1 >= 0 && i+1 <= 5){
                        if(puzzleArray[i+1][j-1][0] == 1){
                            array1.push([i+1,j-1]);
                        }else if(puzzleArray[i+1][j-1][0] == 2){
                            array2.push([i+1,j-1]);
                        }else if(puzzleArray[i+1][j-1][0] == 3){
                            array3.push([i+1,j-1]);
                        }else if(puzzleArray[i+1][j-1][0] == 4){
                            array4.push([i+1,j-1]);
                        }else if(puzzleArray[i+1][j-1][0] == 5){
                            array5.push([i+1,j-1]);
                        }else if(puzzleArray[i+1][j-1][0] == 14){
                            array14.push([i+1,j-1]);
                        }
                    }
                    if(j+1 <= 6 && i+1 <= 5){
                        if(puzzleArray[i+1][j+1][0] == 1){
                            array1.push([i+1,j+1]);
                        }else if(puzzleArray[i+1][j+1][0] == 2){
                            array2.push([i+1,j+1]);
                        }else if(puzzleArray[i+1][j+1][0] == 3){
                            array3.push([i+1,j+1]);
                        }else if(puzzleArray[i+1][j+1][0] == 4){
                            array4.push([i+1,j+1]);
                        }else if(puzzleArray[i+1][j+1][0] == 5){
                            array5.push([i+1,j+1]);
                        }else if(puzzleArray[i+1][j+1][0] == 14){
                            array14.push([i+1,j+1]);
                        }
                    }
                }else{
                    if(j-1 >= 0 && i-1 >= 0){
                        if(puzzleArray[i-1][j-1][0] == 1){
                            array1.push([i-1,j-1]);
                        }else if(puzzleArray[i-1][j-1][0] == 2){
                            array2.push([i-1,j-1]);
                        }else if(puzzleArray[i-1][j-1][0] == 3){
                            array3.push([i-1,j-1]);
                        }else if(puzzleArray[i-1][j-1][0] == 4){
                            array4.push([i-1,j-1]);
                        }else if(puzzleArray[i-1][j-1][0] == 5){
                            array5.push([i-1,j-1]);
                        }else if(puzzleArray[i-1][j-1][0] == 14){
                            array14.push([i-1,j-1]);
                        }
                    }
                    if(j+1 <= 6 && i-1 >= 0){
                        if(puzzleArray[i-1][j+1][0] == 1){
                            array1.push([i-1,j+1]);
                        }else if(puzzleArray[i-1][j+1][0] == 2){
                            array2.push([i-1,j+1]);
                        }else if(puzzleArray[i-1][j+1][0] == 3){
                            array3.push([i-1,j+1]);
                        }else if(puzzleArray[i-1][j+1][0] == 4){
                            array4.push([i-1,j+1]);
                        }else if(puzzleArray[i-1][j+1][0] == 5){
                            array5.push([i-1,j+1]);
                        }else if(puzzleArray[i-1][j+1][0] == 14){
                            array14.push([i-1,j+1]);
                        }
                    }
                }

                if(array14.length > 0){
                    if(array1.length > 0){
                        array.push([array1[0][0],array1[0][1]]);
                        array.push([array14[0][0],array14[0][1]]);
                        this.showGuied(array,puzzleArray);
                        return true;
                    }else
                    if(array2.length > 0){
                        array.push([array2[0][0],array2[0][1]]);
                        array.push([array14[0][0],array14[0][1]]);
                        this.showGuied(array,puzzleArray);
                        return true;
                    }else
                    if(array3.length > 0){
                        array.push([array3[0][0],array3[0][1]]);
                        array.push([array14[0][0],array14[0][1]]);
                        this.showGuied(array,puzzleArray);
                        return true;
                    }else
                    if(array4.length > 0){
                        array.push([array4[0][0],array4[0][1]]);
                        array.push([array14[0][0],array14[0][1]]);
                        this.showGuied(array,puzzleArray);
                        return true;
                    }else
                    if(array5.length > 0){
                        array.push([array5[0][0],array5[0][1]]);
                        array.push([array14[0][0],array14[0][1]]);
                        this.showGuied(array,puzzleArray);
                        return true;
                    }
                }else{
                    if(array1.length > 1){
                        array.push([array1[0][0],array1[0][1]]);
                        array.push([array1[1][0],array1[1][1]]);
                        this.showGuied(array,puzzleArray);
                        return true;
                    }else
                    if(array2.length > 1){
                        array.push([array2[0][0],array2[0][1]]);
                        array.push([array2[1][0],array2[1][1]]);
                        this.showGuied(array,puzzleArray);
                        return true;
                    }else
                    if(array3.length > 1){
                        array.push([array3[0][0],array3[0][1]]);
                        array.push([array3[1][0],array3[1][1]]);
                        this.showGuied(array,puzzleArray);
                        return true;
                    }else
                    if(array4.length > 1){
                        array.push([array4[0][0],array4[0][1]]);
                        array.push([array4[1][0],array4[1][1]]);
                        this.showGuied(array,puzzleArray);
                        return true;
                    }else
                    if(array5.length > 1){
                        array.push([array5[0][0],array5[0][1]]);
                        array.push([array5[1][0],array5[1][1]]);
                        this.showGuied(array,puzzleArray);
                        return true;
                    }
                }
            }else{
                array.push([i,j]);
                var count = 0;
                var countItem = 0;
                if(i-1 >= 0){
                    if(type == puzzleArray[i-1][j][0]) {
                        array.push([i-1,j]);
                        count++;
                    }
                    if(puzzleArray[i-1][j][0] == 14){
                        array.push([i-1,j]);
                        countItem++;
                    }
                }
                if(i+1 <= 5){
                    if( type == puzzleArray[i+1][j][0]) {
                        array.push([i+1,j]);
                        count++;
                    }
                    if(puzzleArray[i+1][j][0] == 14){
                        array.push([i+1,j]);
                        countItem++;
                    }
                }
                if(j-1 >= 0){
                    if(type == puzzleArray[i][j-1][0]) {
                        array.push([i,j-1]);
                        count++;
                    }
                    if(puzzleArray[i][j-1][0] == 14){
                        array.push([i,j-1]);
                        countItem++;
                    }
                }
                if(j+1 <= 6){
                    if(type == puzzleArray[i][j+1][0]) {
                        array.push([i,j+1]);
                        count++;
                    }
                    if(puzzleArray[i][j+1][0] == 14){
                        array.push([i,j+1]);
                        countItem++;
                    }
                }
                if(j%2 ==0){
                    if(j-1 >= 0 && i+1 <= 5){
                        if(type == puzzleArray[i+1][j-1][0]) {
                            array.push([i+1,j-1]);
                            count++;
                        }
                        if(puzzleArray[i+1][j-1][0] == 14){
                            array.push([i+1,j-1]);
                            countItem++;
                        }
                    }
                    if(j+1 <= 6 && i+1 <= 5){
                        if(type == puzzleArray[i+1][j+1][0]) {
                            array.push([i+1,j+1]);
                            count++;
                        }
                        if(puzzleArray[i+1][j+1][0] == 14){
                            array.push([i+1,j+1]);
                            countItem++;
                        }
                    }
                }else{
                    if(j-1 >= 0 && i-1 >= 0){
                        if(type == puzzleArray[i-1][j-1][0]) {
                            array.push([i-1,j-1]);
                            count++;
                        }
                        if(puzzleArray[i-1][j-1][0] == 14){
                            array.push([i-1,j-1]);
                            countItem++;
                        }
                    }
                    if(j+1 <= 6 && i-1 >= 0){
                        if(type == puzzleArray[i-1][j+1][0]) {
                            array.push([i-1,j+1]);
                            count++;
                        }
                        if(puzzleArray[i-1][j+1][0] == 14){
                            array.push([i-1,j+1]);
                            countItem++;
                        }
                    }
                }

                if(count+countItem >= 2){
                    if(count >= 1){
                        this.showGuied(array,puzzleArray);
                        return;
                    }
                }
                array = [];
            }
        }
    }
    this.showGuied([],puzzleArray);
}

gc.GameGuied.prototype.updateTransform = function() {

    PIXI.Container.prototype.updateTransform.call(this);
};