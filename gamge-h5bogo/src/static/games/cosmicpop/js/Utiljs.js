// GM 먼저 실행될 것들
// function isTouchDevice(){
//     return true == ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
// }
// var MOUSE=0;
// var TOUCH=1;
// var InputMode= isTouchDevice()===true ? TOUCH:MOUSE;
// var TcState = {
//     start:0,
//     move:1,
//     end:2
// };



//------ XDK shortcut ---------
// ctrl+shift+o       퀵오픈(행이동 :, 함수리스트 @)
// ctrl+e             함수 빠른 편집
// ctrl+k             quick doc (esc: 닫기)
// ctrl+space         힌트창 강제나오기

// ctrl+z             실행취소
// ctrl+y             재실행


// ctrl+g             라인번호 이동
// ctrl+l             선택 현재라인

// ctrl+f             찾기(앞으로 f3, 뒤로 shift+f3)
// alt+f3             현재단어 찾기후, 선택          ---->주의 alt+f4 윈도우종료
// ctrl+b             찾기후, 선택 더하기
// ctrl+shift+b       찾기후, 선택 다시

// ctrl+u             선택내용 복구
// ctrl+shift+u       선택내용 Redo

// ctrl+shift+↑       블록 이동 
// ctrl+shift+f       찾기 모든파일
// ctrl+shift+d       라인 삭제

// ctrl+/             라인 주석
// ctrl+shift+/       블록 주석
//------ XDK shortcut ---------←→↑↓↗↙↖↘

//--err---
//function findBoneInSkeleton(skel, attach) {
//    for (var i = 0; i < skel.slots.length; i++) {
//        if (skel.slots[i].sprites.hasOwnProperty(attach))
//            return skel.slots[i].sprites[attach];
//    }
//    return null;
//}
////var spearSprite = findBone(spine.skeleton, "spear");
////spearSprite.getBounds()
////var x = spear.worldTransform.tx, y= spear.worldTransform.ty
//--err---
function setScaleTextWidth(txt){
    var sz = txt.maxsz;
    if(sz > 0 && txt.width>sz) // 자동으로 사이즈를 줄여준다.
    txt.scale.set(sz/txt.width);
}

function setNormaButtonTint(sprObj, fn, soundfx, initcolor ) {
    //var mouseBTN=0;
    //var sprObj;
    var clicksound;
    if(soundfx==undefined){
        clicksound=se.Click;
    }else{
        clicksound=soundfx;
    }
    var color = initcolor == undefined ? ColorSet.white : initcolor;
    if (InputMode == MOUSE) sprObj.on('click', fn);
    if (InputMode == MOUSE) sprObj.on('mousedown', function (e) {
        mouseBTN = 1;
        if (sprObj.alpha > 0.9) SESoundPlay(clicksound);
        sprObj.tint = ColorSet.lightgrey;
        if(sprObj.txt!=undefined) sprObj.txt.tint=ColorSet.lightgrey;
    });
    //if(InputMode==MOUSE) sprObj.on('mousemove', function(e) {if(mouseBTN){}});
    if (InputMode == MOUSE) sprObj.on('mouseup', function (e) {
        mouseBTN = 0;
        sprObj.tint = color;
        if(sprObj.txt!=undefined) sprObj.txt.tint=color;
        
    });
    if (InputMode == MOUSE) sprObj.on('mouseupoutside', function (e) {
        mouseBTN = 0;
        sprObj.tint = color
        if(sprObj.txt!=undefined) sprObj.txt.tint=color;
    });
    //if(InputMode==MOUSEMODE) sprObj.on('mouseout', function(e) {mouseBTN=0;});                                        //픽시지원하지만 터치랑 형평성

    if (InputMode == TOUCH) sprObj.on('tap', fn);
    if (InputMode == TOUCH) sprObj.on('touchstart', function () {
        mouseBTN = 1;
        if (sprObj.alpha > 0.9) SESoundPlay(clicksound);
        sprObj.tint = ColorSet.lightgrey;
        if(sprObj.txt!=undefined) sprObj.txt.tint=ColorSet.lightgrey;
    });
    //if(InputMode==TOUCH) sprObj.on('touchmove', function(){ }); 
    if (InputMode == TOUCH) sprObj.on('touchend', function () {
        mouseBTN = 0;
        sprObj.tint = color;
        if(sprObj.txt!=undefined) sprObj.txt.tint=color;
    });
    if (InputMode == TOUCH) sprObj.on('touchendoutside', function () {
        mouseBTN = 0;
        sprObj.tint = color;
        if(sprObj.txt!=undefined) sprObj.txt.tint=color;
    });
    //pixi err// if(InputMode==TOUCHMODE) NormalButtton.on('touchenter', function(){console.log("--touchenter--"); }); //픽시지원 안함
    //pixi err// if(InputMode==TOUCHMODE) NormalButtton.on('touchleave', function(){console.log("--touchleave--"); }); //픽시지원 안함
    //pixi err// if(InputMode==TOUCHMODE) NormalButtton.on('touchcancel', function(){console.log("--touchcancel--"); });  //픽시지원 안함
}
function setNormaTintOnly(sprObj, initcolor) {
    //var mouseBTN=0;
    //var sprObj;
    var color = initcolor == undefined ? ColorSet.white : initcolor;
    if (InputMode == MOUSE) sprObj.on('mousedown', function (e) {
  //      if (sprObj.alpha > 0.9) SESoundPlay(se.click);
        sprObj.tint = ColorSet.lightgrey;
    });
    if (InputMode == MOUSE) sprObj.on('mouseup', function (e) {
        sprObj.tint = color
    });
    if (InputMode == MOUSE) sprObj.on('mouseupoutside', function (e) {
        sprObj.tint = color
    });
    if (InputMode == TOUCH) sprObj.on('touchstart', function () {
//        if (sprObj.alpha > 0.9) SESoundPlay(se.click);
        sprObj.tint = ColorSet.lightgrey;
    });
    if (InputMode == TOUCH) sprObj.on('touchend', function () {
        sprObj.tint = color
    });
    if (InputMode == TOUCH) sprObj.on('touchendoutside', function () {
        sprObj.tint = color
    });
}
                      //spnObj==BtnLspn
function setLButton(spnObj, fn) {
    if (InputMode == MOUSE) spnObj.on('click', fn);
    if (InputMode == MOUSE) spnObj.on('mousedown', function (e) {
        if(rotMode) return;
        mouseBTN = 1;
        SESoundPlay(se.SE_ClickMove);//SESoundPlay(se.Click);

        SpinePlay(spnObj, null, null,
                 AniBtnSpn.press_r,// current ani
                 StateBtnSpn.normal_r, //goto state
                 false);
        if(dm) console.log("~ ~ setlbutteon:-------------------");
    });
    if (InputMode == MOUSE) spnObj.on('mouseup', function (e) {
        mouseBTN = 0;
    });
    if (InputMode == MOUSE) spnObj.on('mouseupoutside', function (e) {
        mouseBTN = 0;
    });

    if (InputMode == TOUCH) spnObj.on('tap', fn);
    if (InputMode == TOUCH) spnObj.on('touchstart', function () {
        if(rotMode) return;
        mouseBTN = 1;
            SESoundPlay(se.Click);
            SpinePlay(spnObj, null, null, 
                     AniBtnSpn.press_r,// current ani
                     StateBtnSpn.normal_r, //goto state
                     false);
        if(dm) console.log("~ ~ setlbutteon:-------------------");
    });
    if (InputMode == TOUCH) spnObj.on('touchend', function () {
        mouseBTN = 0;
    });
    if (InputMode == TOUCH) spnObj.on('touchendoutside', function () {
        mouseBTN = 0;
    });
}
function setRButton(spnObj, fn) {
    if (InputMode == MOUSE) spnObj.on('click', fn);
    if (InputMode == MOUSE) spnObj.on('mousedown', function (e) {
        if(rotMode) return;
        mouseBTN = 1;
        SESoundPlay(se.SE_ClickMove);//SESoundPlay(se.Click);
        SpinePlay(spnObj, null, null, 
                 AniBtnSpn.press_l,// current ani
                 StateBtnSpn.normal_l, //goto state
                 false);
        if(dm) console.log("~ ~ setlbutteon:-------------------");
    });
    if (InputMode == MOUSE) spnObj.on('mouseup', function (e) {
        mouseBTN = 0;
    });
    if (InputMode == MOUSE) spnObj.on('mouseupoutside', function (e) {
        mouseBTN = 0;
    });

    if (InputMode == TOUCH) spnObj.on('tap', fn);
    if (InputMode == TOUCH) spnObj.on('touchstart', function () {
        if(rotMode) return;
        mouseBTN = 1;
            SESoundPlay(SE_ClickMove);//SESoundPlay(se.Click);
            SpinePlay(spnObj, null, null, 
                     AniBtnSpn.press_l,// current ani
                     StateBtnSpn.normal_l, //goto state
                     false);
        if(dm) console.log("~ ~ setlbutteon:-------------------");
    });
    if (InputMode == TOUCH) spnObj.on('touchend', function () {
        mouseBTN = 0;
    });
    if (InputMode == TOUCH) spnObj.on('touchendoutside', function () {
        mouseBTN = 0;
    });
}
//var AniRemain ={
//    run:   "bullet_ui_effect_active",
//    normal:"bullet_ui_effect_idle",
//    hide:  "empty"
//}
//var NextAniRemain ={
//    run:   1,
//    normal:2,
//    hide:  3
//}
//SpinePlay(
//    spnRemain, null, null, 
//    AniRemain.run,// current ani
//    NextAniRemain.normal, //goto state
//    false
//);
//spnRemain.state.onComplete = function (trackIndex, count) {
//    switch (trackIndex) {
//    case NextAniRemain.normal: 
//        SpinePlay(BtnRspn, null, null, AniRemain.normal, 0, true, SpnInit.none);
//        break;
//    }
//} 
function setDevMainButton(contDev, btnDev, x, y, fn, initcolor) {
    if (initcolor == undefined) initcolor = ColorSet.red;
    btnDev = SpriteLoad(contDev, strGamePath+"img/white.png", x, y, 0.5, 0.5);
    btnDev.tint = initcolor;
    btnDev.alpha = 0;//0.1;
    btnDev.scale.set(50, 50);
    btnDev.interactive = false;//개발자버튼 꺼버려!!
    var devtext = FontLoad(contDev, "Dev", x, y, 0.5, 0.5, {
        font: 'Bold 18px Arial',
        fill: ColorSet.white
    });
    devtext.alpha = 0;//0.1;
    setNormaButtonTint(btnDev, fn, initcolor);
}

function setDevButton(contDev, Name, x, y, fn, initcolor) {
    if (initcolor == undefined) initcolor = ColorSet.red;
    var sInit = {
        x: 150,
        y: 50
    };
    var btnDev = SpriteLoad(contDev, strGamePath+"img/white.png", x, y, 0.5, 0.5);

    btnDev.tint = initcolor;
    btnDev.alpha = 0.5;
    btnDev.scale.set(sInit.x, sInit.y);
    btnDev.interactive = true;
    var devtext = FontLoad(contDev, Name, 0, 0, 0.5, 0.5, {
        font: 'Bold 18px Arial',
        fill: ColorSet.white,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowDistance: 2
    });
    devtext.alpha = 1;
    devtext.scale.set(Math.pow(sInit.x, -1), Math.pow(sInit.y, -1));
    btnDev.addChild(devtext);
    setNormaButtonTint(btnDev, fn, initcolor);
    return btnDev;
}

PIXI.Sprite.prototype.bringToFront = function () {
    if (this.parent) {
        var parent = this.parent;
        parent.removeChild(this);
        parent.addChild(this);
    }
}

function bringToFront(sprite, parent) {
    var sprite = (typeof (sprite) != "undefined") ? sprite.target || sprite : this;
    var parent = parent || sprite.parent || {
        "children": false
    };
    if (parent.children) {
        for (var keyIndex in sprite.parent.children) {
            if (sprite.parent.children[keyIndex] === sprite) {
                sprite.parent.children.splice(keyIndex, 1);
                break;
            }
        }
        parent.children.push(sprite);
    }
}

function sendToBack(sprite, parent) {
    var sprite = (typeof (sprite) != "undefined") ? sprite.target || sprite : this;
    var parent = parent || sprite.parent || {
        "children": false
    };
    if (parent.children) {
        for (var keyIndex in sprite.parent.children) {
            if (sprite.parent.children[keyIndex] === sprite) {
                sprite.parent.children.splice(keyIndex, 1);
                break;
            }
        }
        parent.children.splice(0, 0, sprite);
    }
}

function findDebugSprite(spr) {
    var found = false;
    var count = spr.children.length;
    for (var i = 0; i < count; i++) {
        try {
            if (spr.children[i].name == ("debugPivot")) {
                found = true;
            }
        } catch (e) {}
    };
    return found;
}

function findDebugContainer(obj) {
    var found = false;
    var count;
    try {
        count = obj.children.length;
    } catch (e) {
        return false;
    }
    for (var i = 0; i < count; i++) {
        try {
            if (obj.children[i].name == ("debugContainer")) {
                found = true;
            }
        } catch (e) {
            return false;
        }
    };
    return found;
}

function removeChildAll(spr) {
    for (var i = spr.children.length - 1; i >= 0; i--) {
        spr.removeChild(spr.children[i]);
    }
}

//디버그 스프라이트, 컨테이너용
//function isTouchDevice(){
//    return true == ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
//}
//var MOUSE=0;
//var TOUCH=1;
//var InputMode= isTouchDevice()===true ? TOUCH:MOUSE;

var debug_mode = false;
var dm=false;
var clickedSpr = null;
var clickedName = null;
var inputStartX_debug;
var inputStartY_debug;
var inputDtX_debug;
var inputDtY_debug;
var sprPosx;
var sprPosy;

var InfoPos = {
    on: true,
    off: false
};
var MovePos = {
    on: true,
    off: false
};
var ArrowKey = {
    left: 37,
    up: 38,
    right: 39,
    down: 40
};
var mouseBTN = 0;
//var MOUSE=0;
//var TOUCH=1;
//var InputMode= isTouchDevice()===true ? TOUCH:MOUSE;
//사용예
//var spr = SpriteLoad(spine_space_ship_ani, "img/bubble_1.png", 0, -150, 0.2, 0.5); //스프라이트 생성
//spr.name = "bubble";                          
//debug_Sprite(spr, InfoPos.on, MovePos.on);                                        //디버깅정보 생성
function debug_Sprite(spr, infopos, movepos) {
    if (!debug_mode) return;
    if (findDebugSprite(spr)) return; //부모 스프라이트의 차일드 "debugPivot"를 검사해서 있으면 스킵
    if(infopos==undefined) infopos=InfoPos.on;
    if(movepos==undefined) movepos=MovePos.on;
    var szpiv = 25; //피봇 마크 길이
    var szmin = 10; //민,맥스 마크 길이
    var cPivot = new PIXI.Container();
    var crossPivot = new PIXI.Graphics(); //spritemode //스프라이트 피봇만들기
    crossPivot.beginFill(ColorSet.yellow);
    crossPivot.drawRect(-szpiv, 0, szpiv * 2, 1);
    crossPivot.drawRect(0, -szpiv, 1, szpiv * 2);
    cPivot.addChild(crossPivot);
    cPivot.name = "debugPivot";

    var cMin = new PIXI.Container();
    var crossMin = new PIXI.Graphics(); //스프라이트 최소 테두리 만들기
    crossMin.beginFill(ColorSet.red);
    crossMin.drawRect(-szmin, 0, szmin * 2, 2);
    crossMin.drawRect(0, -szmin, 2, szmin * 2);
    cMin.addChild(crossMin);
    cMin.x = (-spr.width * spr.anchor.x) / spr.scale.x;
    cMin.y = (-spr.height * spr.anchor.y) / spr.scale.y;
    cPivot.addChild(cMin);

    var cMax = new PIXI.Container();
    var crossMax = new PIXI.Graphics(); //스프라이트 최대 테두리 만들기
    crossMax.beginFill(ColorSet.green);
    crossMax.drawRect(-szmin, 0, szmin * 2, 2);
    crossMax.drawRect(0, -szmin, 2, szmin * 2);
    cMax.addChild(crossMax);
    cPivot.addChild(cMax);

    cMax.x = (spr.width * (1 - spr.anchor.x)) / spr.scale.x;
    cMax.y = (spr.height * (1 - spr.anchor.y)) / spr.scale.y;
    spr.addChild(cPivot);

    var txtPivot = FontLoad( //스프라이트 정보 폰트
        cPivot,
        "0.0, 0.0",
        0, 0,
        0.0, 0.5, {
            font: '25px None',
            fill: '#ffffff', //fill:'#808080',
            align: "center",
            //lineHeight:50,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowDistance: 2
        }
    );

    if (!infopos) { //스프라이트 정보모드 꺼짐
        crossPivot.visible = false;
        crossMin.visible = false;
        crossMax.visible = false;
        txtPivot.visible = false;
    } else if (infopos == true) //스프라이트 정보모드 켜짐
    {
        txtPivot.x = 15;
        txtPivot.y -= 15;
        txtPivot.text = spr.x + "," + spr.y;
    }
    if (!movepos) { //스프라이트 이동모드 꺼짐

    } else if (movepos == true) {
        spr.interactive = true;
        if (InputMode == TOUCH) {
            spr.on('touchstart', //스프라이트 이동모드시, 터치 시작 이벤트
                function (e) {
                    clickedSpr = this;
                    var localCoordsPosition = e.data.getLocalPosition(spr);
                    var parentCoordsPosition = e.data.getLocalPosition(spr.parent);

                    //this.position.x = parentCoordsPosition.x;
                    //this.position.y = parentCoordsPosition.y;
                    sprPosx = spr.x;
                    sprPosy = spr.y;

                    inputStartX_debug = localCoordsPosition.x * spr.scale.x;
                    inputStartY_debug = localCoordsPosition.y * spr.scale.y;
                    inputDtX_debug = localCoordsPosition.x - sprPosx;
                    inputDtY_debug = localCoordsPosition.x - sprPosy;

                    var ewin = window.event;
                    var dirMvX = 1;
                    var dirMvY = -1;
                    if (ewin.ctrlKey) {
                        dirMvX = -1;
                        dirMvY = 1;
                    }
                    if (ewin.altKey) spr.x += (dirMvX);
                    if (ewin.shiftKey) spr.y += (dirMvY);
                }

            );

            spr.on('touchmove', //스프라이트 이동모드시, 터치 이동 이벤트
                function (e) {
                    if (clickedSpr == null) return;
                    if (clickedSpr != this) return;

                    var newPosition;
                    var mvX;
                    var mvY;

                    newPosition = e.data.getLocalPosition(clickedSpr.parent);
                    mvX = newPosition.x - inputStartX_debug;
                    mvY = newPosition.y - inputStartY_debug;

                    spr.x = Math.floor(mvX);
                    spr.y = Math.floor(mvY);

                    txtPivot.text = spr.x + "," + spr.y;
                }

            );
            spr.on('touchend', //스프라이트 이동모드시, 터치 종료 이벤트
                function (e) {
                    txtPivot.text = spr.x + "," + spr.y;
                    if(dm) console.log("--setposition(Sprite): " + (spr.name != undefined ? spr.name : "none") + ", xy: spr.xy = " + spr.x + ", " + spr.y + " ");
                    clickedSpr = null;
                }
            );
            spr.on('touchendoutside', //스프라이트 이동모드시, 터치 종료 이벤트
                function (e) {
                    txtPivot.text = spr.x + "," + spr.y;
                    if(dm) console.log("--setposition(Sprite): " + (spr.name != undefined ? spr.name : "none") + ", xy: spr.xy = " + spr.x + ", " + spr.y + " ");
                    clickedSpr = null;
                }

            );
        } //touch

        //마우스 모드 --같은 코드 복사---------------------------------------------------------------
        if (InputMode == MOUSE) {
            spr.on('mousedown', //스프라이트 이동모드시, 터치 시작 이벤트
                function (e) {
                    mouseBTN = 1;
                    clickedSpr = this;
                    var localCoordsPosition = e.data.getLocalPosition(spr);
                    var parentCoordsPosition = e.data.getLocalPosition(spr.parent);

                    //this.position.x = parentCoordsPosition.x;
                    //this.position.y = parentCoordsPosition.y;
                    sprPosx = spr.x;
                    sprPosy = spr.y;

                    inputStartX_debug = localCoordsPosition.x * spr.scale.x;
                    inputStartY_debug = localCoordsPosition.y * spr.scale.y;
                    inputDtX_debug = localCoordsPosition.x - sprPosx;
                    inputDtY_debug = localCoordsPosition.x - sprPosy;

                    var ewin = window.event;
                    var dirMvX = 1;
                    var dirMvY = -1;
                    if (ewin.ctrlKey) {
                        dirMvX = -1;
                        dirMvY = 1;
                    }
                    if (ewin.altKey) spr.x += (dirMvX);
                    if (ewin.shiftKey) spr.y += (dirMvY);
                }

            );

            spr.on('mousemove', //스프라이트 이동모드시, 터치 이동 이벤트
                function (e) {
                    if (mouseBTN == 0) return;
                    if (clickedSpr == null) return;
                    if (clickedSpr != this) return;

                    var newPosition;
                    var mvX;
                    var mvY;

                    newPosition = e.data.getLocalPosition(clickedSpr.parent);
                    mvX = newPosition.x - inputStartX_debug;
                    mvY = newPosition.y - inputStartY_debug;

                    spr.x = Math.floor(mvX);
                    spr.y = Math.floor(mvY);

                    txtPivot.text = spr.x + "," + spr.y;
                }

            );
            spr.on('mouseup', //스프라이트 이동모드시, 터치 종료 이벤트
                function (e) {
                    mouseBTN = 0;
                    txtPivot.text = spr.x + "," + spr.y;
                    if(dm) console.log("--setposition(Sprite): " + (spr.name != undefined ? spr.name : "none") + ", xy: spr.xy = " + spr.x + ", " + spr.y + " ");
                    clickedSpr = null;
                }
            );
            spr.on('mouseupoutside', //스프라이트 이동모드시, 터치 종료 이벤트
                function (e) {
                    mouseBTN = 0;
                    txtPivot.text = spr.x + "," + spr.y;
                    if(dm) console.log("--setposition(Sprite): " + (spr.name != undefined ? spr.name : "none") + ", xy: spr.xy = " + spr.x + ", " + spr.y + " ");
                    clickedSpr = null;
                }

            );
        } //mouse
        //마우스 모드 --같은 코드 복사---------------------------------------------------------------

    }

}

// function debug_Obj(obj, infopos, movepos) {
//
//     if (!debug_mode) return;
//     if (findDebugContainer(obj)) return;
//
//     if(infopos==undefined) infopos=InfoPos.on;
//     if(movepos==undefined) movepos=MovePos.on;
//
//     var container = new PIXI.Container();
//     container.name = "debugContainer";
//     obj.addChild(container);
//
//     var szpiv = 25;
//     var bbMin = -5;
//     var bbMax = 10;
//
//     var cPivot = new PIXI.Container();
//     var crossPivot = new PIXI.Graphics();
//     crossPivot.beginFill(ColorSet.cyan);
//     crossPivot.drawRect(-szpiv, 0, szpiv * 2, 1);
//     crossPivot.drawRect(0, -szpiv, 1, szpiv * 2);
//     if (movepos) //컨테이너 이동모드 켜짐
//     {
//         crossPivot.drawRect(20 + bbMin, 20 + bbMin, 20 + bbMax, 20 + bbMax);
//     }
//     cPivot.addChild(crossPivot);
//     cPivot.name = "debugContainer";
//
//     container.addChild(cPivot);
//
//     //var objpos = obj.x.toString()+", "+obj.y.toString();
//     var txtPivot = FontLoad(
//         cPivot,
//         "0.0, 0.0", //objpos,//
//         0, 0,
//         0.0, 0.5, {
//             font: '25px None',
//             fill: '#ffff00', //fill:'#808080',
//             align: "center",
//             //lineHeight:50,
//             dropShadow: true,
//             dropShadowColor: '#000000',
//             dropShadowDistance: 2
//         }
//     );
//
//     if (!infopos) { //컨테이너 정보 off
//         crossPivot.visible = false;
//         txtPivot.visible = false;
//     } else if (infopos == true) //컨테이너 정보 on
//     {
//         txtPivot.x = 15;
//         txtPivot.y -= 15;
//         txtPivot.text = container.x + "," + container.y;
//     }
//     if (!movepos) {
//
//     } else if (movepos == true) //컨테이너 이동모드시
//     {
//         container.interactive = true;
//         if (InputMode == TOUCH) {
//             container.on('touchstart', //컨테이너 이동모드시, 터치 이벤트
//                 function (e) {
//                     clickedSpr = this;
//                     clickedName = this.name;
//                     if(dm) console.log("clickedName:" + clickedName);
//                     var localCoordsPosition = e.data.getLocalPosition(container);
//                     var parentCoordsPosition = e.data.getLocalPosition(container.parent);
//
//                     //this.position.x = parentCoordsPosition.x;
//                     //this.position.y = parentCoordsPosition.y;
//                     sprPosx = container.x;
//                     sprPosy = container.y;
//
//                     inputStartX_debug = localCoordsPosition.x * container.scale.x;
//                     inputStartY_debug = localCoordsPosition.y * container.scale.y;
//                     inputDtX_debug = localCoordsPosition.x - sprPosx;
//                     inputDtY_debug = localCoordsPosition.x - sprPosy;
//
//                     var ewin = window.event;
//                     var dirMvX = 1;
//                     var dirMvY = -1;
//
//                     if (ewin.ctrlKey) {
//                         dirMvX = -1;
//                         dirMvY = 1;
//                     }
//                     if (ewin.altKey) container.parent.x += (dirMvX);
//                     if (ewin.shiftKey) container.parent.y += (dirMvY);
//                 }
//
//             );
//             container.on('touchmove', //컨테이너 이동모드시, 터치 이벤트
//                 function (e) {
//                     if (clickedSpr == null) return;
//                     if (clickedSpr != this) return;
//
//                     if (clickedName == this.name) {
//
//                         var ewin = window.event;
//                         var newPosition;
//                         var mvX;
//                         var mvY;
//
//                         newPosition = e.data.getLocalPosition(clickedSpr.parent);
//                         mvX = newPosition.x - inputStartX_debug;
//                         mvY = newPosition.y - inputStartY_debug;
//                         //container.x = Math.floor(mvX);
//                         //container.y = Math.floor(mvY);
//                         //container.parent.x= Math.floor(mvX);
//                         //container.parent.y= Math.floor(mvY);
//                         //console.log("mvXY:"+mvX+", "+mvY);
//                         //txtPivot.text = container.x+","+container.y;
//                         obj.x += Math.floor(mvX);
//                         obj.y += Math.floor(mvY);
//
//                         //테스트용도
//                         if (false) {
//                             var ewin = window.event;
//                             var dirMvX = 1;
//                             var dirMvY = -1;
//
//                             if (ewin.ctrlKey) {
//                                 dirMvX = -1;
//                                 dirMvY = 1;
//                             }
//                             if (ewin.altKey) container.parent.x += (dirMvX);
//                             if (ewin.shiftKey) container.parent.y += (dirMvY);
//                         }
//                         //테스트용도
//
//                         txtPivot.text = container.parent.x + "," + container.parent.y;
//                     }
//                 }
//
//             );
//             container.on('touchend', //컨테이너 이동모드시, 터치 이벤트
//                 function (e) {
//                     //txtPivot.text = container.x+","+container.y;
//                     txtPivot.text = container.parent.x + "," + container.parent.y;
//                     var result = obj.name != undefined ? obj.name + ".xy= " + container.parent.x + ", " + container.parent.y + " " : ".xy= " + container.parent.x + ", " + container.parent.y + " ";
//                     if(dm) console.log("--setposition(obj): " + result);
//                     clickedSpr = null;
//                     clickedName = null;
//                 }
//             );
//             container.on('touchendoutside', //컨테이너 이동모드시, 터치 이벤트
//                 function (e) {
//                     //txtPivot.text = container.x+","+container.y;
//                     txtPivot.text = container.parent.x + "," + container.parent.y;
//
//                     var result = obj.name != undefined ? obj.name + ".xy= " + container.parent.x + ", " + container.parent.y + " " : ".xy= " + container.parent.x + ", " + container.parent.y + " ";
//                     if(dm) console.log("--setposition(obj): " + result);
//                     clickedSpr = null;
//                     clickedName = null;
//                 }
//
//             );
//         } //touch
//         //마우스 모드 --같은 코드 복사---------------------------------------------------------------
//         if (InputMode == MOUSE) {
//             container.on('mousedown', //컨테이너 이동모드시, 터치 이벤트
//                 function (e) {
//                     mouseBTN = 1;
//                     clickedSpr = this;
//                     clickedName = this.name;
//                     if(dm) console.log("clickedName:" + clickedName);
//                     var localCoordsPosition = e.data.getLocalPosition(container);
//                     var parentCoordsPosition = e.data.getLocalPosition(container.parent);
//
//                     //this.position.x = parentCoordsPosition.x;
//                     //this.position.y = parentCoordsPosition.y;
//                     sprPosx = container.x;
//                     sprPosy = container.y;
//
//                     inputStartX_debug = localCoordsPosition.x * container.scale.x;
//                     inputStartY_debug = localCoordsPosition.y * container.scale.y;
//                     inputDtX_debug = localCoordsPosition.x - sprPosx;
//                     inputDtY_debug = localCoordsPosition.x - sprPosy;
//
//                     var ewin = window.event;
//                     var dirMvX = 1;
//                     var dirMvY = -1;
//
//                     if (ewin.ctrlKey) {
//                         dirMvX = -1;
//                         dirMvY = 1;
//                     }
//                     if (ewin.altKey) container.parent.x += (dirMvX);
//                     if (ewin.shiftKey) container.parent.y += (dirMvY);
//                 }
//
//             );
//             container.on('mousemove', //컨테이너 이동모드시, 터치 이벤트
//                 function (e) {
//                     if (mouseBTN == 0) return;
//                     if (clickedSpr == null) return;
//                     if (clickedSpr != this) return;
//
//                     if (clickedName == this.name) {
//
//                         var ewin = window.event;
//                         var newPosition;
//                         var mvX;
//                         var mvY;
//
//                         newPosition = e.data.getLocalPosition(clickedSpr.parent);
//                         mvX = newPosition.x - inputStartX_debug;
//                         mvY = newPosition.y - inputStartY_debug;
//                         //container.x = Math.floor(mvX);
//                         //container.y = Math.floor(mvY);
//                         //container.parent.x= Math.floor(mvX);
//                         //container.parent.y= Math.floor(mvY);
//                         //console.log("mvXY:"+mvX+", "+mvY);
//                         //txtPivot.text = container.x+","+container.y;
//                         obj.x += Math.floor(mvX);
//                         obj.y += Math.floor(mvY);
//
//                         //테스트용도
//                         if (false) {
//                             var ewin = window.event;
//                             var dirMvX = 1;
//                             var dirMvY = -1;
//
//                             if (ewin.ctrlKey) {
//                                 dirMvX = -1;
//                                 dirMvY = 1;
//                             }
//                             if (ewin.altKey) container.parent.x += (dirMvX);
//                             if (ewin.shiftKey) container.parent.y += (dirMvY);
//                         }
//                         //테스트용도
//
//                         txtPivot.text = container.parent.x + "," + container.parent.y;
//                     }
//                 }
//
//             );
//             container.on('mouseup', //컨테이너 이동모드시, 터치 이벤트
//                 function (e) {
//                     mouseBTN = 0;
//                     //txtPivot.text = container.x+","+container.y;
//                     txtPivot.text = container.parent.x + "," + container.parent.y;
//                     var result = obj.name != undefined ? obj.name + ".xy= " + container.parent.x + ", " + container.parent.y + " " : ".xy= " + container.parent.x + ", " + container.parent.y + " ";
//                     if(dm) console.log("--setposition(obj): " + result);
//                     clickedSpr = null;
//                     clickedName = null;
//                 }
//             );
//             container.on('mouseupoutside', //컨테이너 이동모드시, 터치 이벤트
//                 function (e) {
//                     mouseBTN = 0;
//                     //txtPivot.text = container.x+","+container.y;
//                     txtPivot.text = container.parent.x + "," + container.parent.y;
//
//                     var result = obj.name != undefined ? obj.name + ".xy= " + container.parent.x + ", " + container.parent.y + " " : ".xy= " + container.parent.x + ", " + container.parent.y + " ";
//                     if(dm) console.log("--setposition(obj): " + result);
//                     clickedSpr = null;
//                     clickedName = null;
//                 }
//
//             );
//         }
//         //마우스 모드 --같은 코드 복사---------------------------------------------------------------
//     }
// }

//--항목스파인항목---
//function getSpriteInSpine(_spine, _slotsName)//현재사용중인 스프라이트
//{   //return sprite!!!
//    return _spine.skeleton.findSlot(_slotsName).currentSprite;
//}
function setSpriteInSpine(_spine, _slotsName, _skinsName) {
    if (_skinName == null && _skinName == undefined)
        _spine.skeleton.setAttachment(_sloatName, null); //숨기기
    else
        _spine.skeleton.setAttachment(_sloatName, _skinName); //보이기
}

function getFindBoneInSpine(_spine, attach) {
    for (var i = 0; i < _spine.skeleton.slots.length; i++) {
        if (_spine.skeleton.slots[i].sprites.hasOwnProperty(attach))
            return _spine.skeleton.slots[i].sprites[attach];
    }
    return null;
}
//var spearSprite = findBone(spine.skeleton, "spear");
//var x = spear.worldTransform.tx, y= spear.worldTransform.ty
//var spearSprite = skel.findSlot('LEFT HAND').sprites.spear;
//spearSprite.getBounds()
//--항목스파인항목---

//수학함수
Number.prototype.formatMoney = function (c, d, t) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

// function getMoneyFormatFromNum(n) {
//     var c = 0; //표시자리
//     var d = ".";
//     var t = ",";
//     var s = n < 0 ? "-" : "",
//         i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
//         j = (j = i.length) > 3 ? j % 3 : 0;
//     return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
// };

// var convertTimeFormatFromSec = function (num) { //두개 다 거의 비슷
//     var hrs = Math.floor(num / 3600);
//     var mins = Math.floor((num % 3600) / 60);
//     var secs = num % 60;
//     return (hrs > 0 ? hrs + ":" : "") + (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs;
// };

function secondsToTime(secs) { //두개 다 거의 비슷
    secs = Math.round(secs);
    var hours = Math.floor(secs / (60 * 60));

    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    //var ret_obj = {"h": hours, "m": minutes, "s": seconds };
    return (
        (hours > 0 ? hours + ":" : "") + (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds
    );
}
//min~max까지 랜덤 float 값 리턴
function generateRandomNumber(min, max) {
    return (Math.random() * (max - min) + min);
};
//1~~9까지 랜덤값 리턴 //Math.floor(generateRandomNumber(1, 10));

//배열랜덤섞기
function shuffleByArray(arr) {
    var j, x, i;
    for (i = arr.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        arr[i - 1] = a[j];
        arr[j] = x;
    }
}

//배열최대값
var compArr = [1, 10, 5, 11, 2];
var maxResult = compArr.reduce( function (previous, current) { 
	return previous > current ? previous:current;
});
//배열최소값
var minResult = compArr.reduce( function (previous, current) { 
	return previous > current ? current:previous;
});

//Math.pow(3, 2)            //3^2=9//제곱
//modResult = 5 % 2         //1    //나머지값

var MathHelper = {
    // Get a value between two values
    clamp: function (value, min, max) { //최대최소값minmax
        if (value < min) {
            return min;
        }
        else if (value > max) {
            return max;
        }

        return value;
    },
    // Get the linear interpolation between two value
    lerp: function (value1, value2, amount) { //인터폴레이션,보간,
        amount = amount < 0 ? 0 : amount;
        amount = amount > 1 ? 1 : amount;
        return value1 + (value2 - value1) * amount;
    }

};

function distance2D(x1, y1, x2, y2) { //거리구하기
    if (!x2) x2 = 0;
    if (!y2) y2 = 0;
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}
//Math.dist(0,0, 3,4); //the output will be 5
//Math.dist(1,1, 4,5); //the output will be 5
//Math.dist(3,4); //the output will be 5

function randRangeFromInt(low, high) // Get a random int between low and high, inclusive
{
    return Math.floor(low + Math.random() * (high - low + 1));
}

//--------------------------공A중심xy, 공A반지름, 공B중심xy, 공B반지름
function circleIntersectionFromPos(x1, y1, r1, x2, y2, r2) {
    // Calculate the distance between the centers
    var dx = x1 - x2;
    var dy = y1 - y2;
    var len = Math.sqrt(dx * dx + dy * dy);

    if (len < r1 + r2) {
        // Circles intersect
        return true;
    }

    return false;
}
//사용예 //레벨에 공이 들어갔을때 충돌체크
//        for (var i=0; i<level.columns; i++) {
//            for (var j=0; j<level.rows; j++) {
//                var tile = level.tiles[i][j];
//                if (circleIntersection(player.bubble.x + level.tilewidth/2,
//                                       player.bubble.y + level.tileheight/2,
//                                       level.radius*0.5,
//                                       coord.tilex + level.tilewidth/2,
//                                       coord.tiley + level.tileheight/2,
//                                       level.radius))
//                {
//                    snapBubble();//충돌처리
//                    return;
//                }
//            }
//        }


function radToDegFromAngle(angle) // Convert radians to degrees //포지션에서 각도를 계산할 때
{
    return angle * (180 / Math.PI);
}


function degToRadFromPI(angle) // Convert degrees to radians //각도에서 포지션을 계산할 때
{
    return angle * (Math.PI / 180);
}

function moveToAngle(angle, dist) //각도로 거리만큼 이동(로컬좌표리턴)
{
    var ret = [0, 0];
    ret[0] = dist * Math.cos(degToRadFromPI(angle));
    ret[1] = dist * -1 * Math.sin(degToRadFromPI(angle));
    return ret;
}

function rotateFromPos(cx, cy, x, y, angle) //지정위치에서 회전함수
{
    var radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return [nx, ny];
}

function getAngleFromPos(centerX, centerY, X, Y) {
    //   html screen
    //   (0,0)+---+
    //        |   |
    //        +---+(625,625)
    var mouseangle = radToDeg(Math.atan2(centerY - Y, X - centerX));
    //              (90)
    //          179  |   1 
    //      (-180)--중심--(0)
    //          -179 |  359
    //             (-90)
    while (mouseangle < 0) {
        mouseangle = mouseangle + 360;
    }
    while (mouseangle > 360) {
        mouseangle = mouseangle - 360;
    }
    //               (90)
    //                 |    
    //         (180)--중심--(0) Math.floor(mouseangle)시
    //                 |
    //               (270)

    return mouseangle;
}

function cropAngleWith180(angle, min, max) {
    //               (90)
    //                 |    
    //         (180)--중심--(0) 좌표계
    //                 |
    //               (270)    
    if (angle > 90 && angle < 270) // Left
    {
        if (angle > max) {
            angle = max;
        }
    } else // Right
    {
        if (angle < min || angle >= 270) {
            angle = min;
        }
    }
    return angle;
}

function union(a, b) { //전체 a+b  //전체값과 중복포함
    var tmp = {},
        res = [];
    for (var i = 0; i < a.length; i++) tmp[a[i]] = 1;
    for (var j = 0; j < b.length; j++) tmp[b[j]] = 1;
    for (var k in tmp) res.push(k);
    return res;
}

function intersect(a, b) { //교집합 a&&b //중복값부분만 
    var tmp = {},
        res = [];
    for (var i = 0; i < a.length; i++) tmp[a[i]] = 1;
    for (var j = 0; j < b.length; j++)
        if (tmp[b[j]]) res.push(b[j]);
    return res;
}

function array_diff(a, b) { //차집합 a-b // b에서 중복값부분 빼기
    var tmp = {},
        res = [];
    for (var i = 0; i < a.length; i++) tmp[a[i]] = 1;
    for (var j = 0; j < b.length; j++) {
        if (tmp[b[j]]) delete tmp[b[j]];
    }
    for (var k in tmp) res.push(k);
    return res;
}

function sym_diff(a, b) { //대칭차 a+b-(a&&b) //중복값부분 제거된 합집합
    var tmp = {},
        res = [];
    for (var i = 0; i < a.length; i++) tmp[a[i]] = 1;
    for (var j = 0; j < b.length; j++) {
        if (tmp[b[j]]) delete tmp[b[j]];
        else tmp[b[j]] = 1;
    }
    for (var k in tmp) res.push(k);
    return res;
}
var arr1 = ['A', 'B', 'C', 'D'];
var arr2 = ['C', 'D', 'E', 'F'];
//console.log( union(arr1, arr2) );     // ["A", "B", "C", "D", "E", "F"]
//console.log( intersect(arr1, arr2) ); // ["C", "D"]
//console.log( array_diff(arr1, arr2) );// ["A", "B"]
//console.log( sym_diff(arr1, arr2) );  // ["A", "B", "E", "F"]

function delayTime(ms) {
    var cur_d = new Date();
    var cur_ticks = cur_d.getTime();
    var ms_passed = 0;
    while (ms_passed < ms) {
        var d = new Date(); // Possible memory leak?
        var ticks = d.getTime();
        ms_passed = ticks - cur_ticks;
        // d = null;  // Prevent memory leak?
    }
}
//시간후에 실행
var toReady0 = true;

function toDelayRun() {
    toReady0 = false;
    setTimeout(
        function () {
            //SpinePlay(spine_tutHandB2,  pCenter.x-160, pCenter.y-220, "tutorial_ani_3_idle", 0, true, 1);//-->애니 
        },
        500 //0.5초 뒤
    );
}

function debug_CrossHair(doc, x, y, color) //html용
{
    var xx = 80;
    if (!color) doc.fillStyle = "#ff00ff";
    else doc.fillStyle = color;
    doc.fillRect(x, y - (xx * 0.5), 1, xx);
    doc.fillRect(x - (xx * 0.5), y, xx, 1);
}

function whatisNeighbors(n) {
    var s = "";
    for (var i = 0; i < n.length; i++) {
        // Neighbor coordinate
        s += "[" + i + "],xy:" + n[i].x + "," + n[i].y + ",prcd:" + n[i].processed + ", ";
    }
    return s;
}

function whatisGameState() {
    var s = "state:";
    var sn = "nextState:"
    var g = "game:";
    var s_result = (
        state == State.NONE ? "NONE" : state == State.LOADING_SET ? "LOADING_SET" : state == State.LOADING ? "LOADING" : state == State.TITLE ? "TITLE" : state == State.GAME ? "GAME" : "err"
    );
    var sn_result = (
        nextState == State.NONE ? "NONE" : nextState == State.LOADING_SET ? "LOADING_SET" : nextState == State.LOADING ? "LOADING" : nextState == State.TITLE ? "TITLE" : nextState == State.GAME ? "GAME" : "err"
    );
    var g_result = (
        Game == Game.INIT ? "INIT" : Game.SET ? "SET" : Game.READY ? "READY" : Game.PLAY ? "PLAY" : Game.CLEAR_ANI ? "CLEAR_ANI" : Game.CLEAR ? "CLEAR" : Game.CLEAR_END ? "CLEAR_END" : Game.OVER_ANI ? "OVER_ANI" : Game.LEVELUP ? "LEVELUP" : "err"
    );
    return (
        s + s_result + ", " + sn + sn_result + ", " + g + g_result + ","
    );
}

function whatisClusters(n) {
    var s = "";
    for (var i = 0; i < n.length; i++) {
        var c1 = n[i];
        s = " ,c[" + i + "]-";
        for (var j = 0; j < c1.length; j++) {
            // Neighbor coordinate
            s += "[" + j + "],xy:" + c1[j].x + "," + c1[j].y + ",prcd:" + c1[j].processed + ", ";
        }
        s += "\n";
    }
    return s;
}



////pixi엔진에서 사용할 칼라 샘플
//var ColorSet = {
//    white: 0xffffff,
//    red: 0xff0000,
//    green: 0x00ff00,
//    blue: 0x0000ff,
//    black: 0x000000,
//    yellow: 0xffff00,
//    sky: 0xcceeff,
//    cyan: 0x00ffff,
//    magenta: 0xff00ff,
//    grey: 0x808080,
//    orange: 0xffa500,
//    pink: 0xff8080,
//    fontlevel: 0xfff57d,
//    lightgrey: (0x808080 * 1.5),
//    darkgrey: (0x808080 * 0.5),
//    brown: 0xa52a2a
//};
function fillArray0(cnt, init){//제로베열
    var arr=[],i=0;for(;i<cnt;)arr[i++]=init;
    return arr;
}
function filledArray(len, value) {//제로배열
    if (len <= 0) return [];
    var result = [value];
    while (result.length < len/2) {
        result = result.concat(result);
    }
    return result.concat(result.slice(0, len-result.length));
}
function filledArrayString(len, value) {
    return new Array(len+1).join(value).split('');
}
function float2int(int) { //소수->정수
    return Math[int < 0 ? 'ceil' : 'floor'](int);
}

function rgb2hex(rgbArr) //[1.0,1.0,1.0]->0x000000==[255,255,255] 
{
    return ((rgbArr[0]*255 << 16) + (rgbArr[1]*255 << 8)+ rgbArr[1]*255 << 0);
}

function hex2str(hex) //샵버젼 //0x000000->"#000000"
{
    hex = hex.toString(16);
    hex = '000000'.substr(0, 6 - hex.length) + hex;
    return '#' + hex;
}

function convertStr2Arr1D(arr) {
    var s = "";
    for (var i = 0; i < arr.length; i++) {
        s += "[" + i + "]:" + arr[i].toString() + ", ";
    }
    return s;
}

function convertStr2ArrXY1D(arr) {
    var s = "";
    for (var i = 0; i < arr.length; i++) {
        s += "[" + i + "]xy:" + arr[i].x + "," + arr[i].y + ", ";
    }
    return s;
}
function str2int(str){ //정수변환
    //parseInt("010", 10)  // == 10
    //parseInt("4.23")     // == 4
    //parseInt("012.23")   // == 12
    //parseInt("5.2aa")    // == 5
    //parseInt("5.2aa")    // == NaN
    //parseInt("aaa")      // == NaN
    //Number("aaa")        // == NaN //속도가 더 빠르고, 오류발생요건이 많다
    //"2"*1;               //2       //속도가 더 느림
    return Number(str);
}
function str2float(str){ //소수변환
    //parseFloat('2.34cms')  //Output: 2.34
    //parseFloat('12.5')     //Output: 12.5
    //parseFloat('012.3')    //Output: 12.3
    //parseFloat("34 45 66") //Output: 34
    return parseFloat(str);
}
function int2str(num){  //스트링변환
    return num.toString();
}
function float2str(num){ //스트링변환
    return num.toString();
}
function floatFixed(num, count){//소수점 제한
    return num.toFixed(count);
}
function str2int_limited(the_str) {//정수변환 //10배 빠름(Number랑 비교)
    var ret = 0;
    var len = the_str.length;
    if (len >= 1) ret += (the_str.charCodeAt(0) & 0xff) <<  0;
    if (len >= 2) ret += (the_str.charCodeAt(1) & 0xff) <<  8;
    if (len >= 3) ret += (the_str.charCodeAt(2) & 0xff) << 16;
    if (len >= 4) ret += (the_str.charCodeAt(3) & 0xff) << 24;
    return ret;
}

function pad( //zerostring,제로스트링 만들기
  a, // the number to convert 
  b // number of resulting characters
  ){
  //예,pad (1234, 3) === "234"      
  return (
    1e15 + a + // combine with large number
    "" // convert to string
  ).slice(-b) // cut leading "1"
}

function pad(input) { //zerostring,제로스트링 만들기(크기가4로 제한)
    var BASE = "0000";
    return input ? BASE.substr(0, 4 - Math.ceil(input / 10)) + input : BASE;
}
function int2str_limited(the_int) { //toString() 보다 빠르다
    /*
        Examples:
            int2str( str2int("test") ) == "test" // true
            int2str( str2int("t€st") ) // "t¬st", because "€".charCodeAt(0) is 8364, will be AND'ed with 0xff
        Limitations:
            max 4 chars, so it fits into an integer
    */
    var tmp = [
        (the_int & 0x000000ff) >>  0,
        (the_int & 0x0000ff00) >>  8,
        (the_int & 0x00ff0000) >> 16,
        (the_int & 0xff000000) >> 24
    ];
    var ret = "";
    for (var i=0; i<4; i++) {
        if (tmp[i] == 0)
            break;
        ret += String.fromCharCode(tmp[i]);
    }
    return ret;
}

function PIXIGraphics(parent, color, alpha, startx,starty,endx,endy) {
    if(startx === undefined)
        startx = 0;
    if(starty === undefined)
        starty = 0;
    if(endx === undefined)
        endx = iMaxSizeX;
    if(endy === undefined)
        endy = iMaxSizeY;

    var spr = new PIXI.Graphics();
    parent.addChild(spr);

    spr.position.set(0,0);
    spr.lineStyle(0);

    spr.clear();
    spr.beginFill(color,alpha);
    spr.moveTo(startx,starty);
    spr.lineTo(endx, starty);
    spr.lineTo(endx, endy);
    spr.lineTo(startx, endy);

    return spr;
}

var rf_dot;
var rf_renderTexture;
var rf_renderTexture2;
var rf_stage;
function _ref_trail(){
     //var renderer = PIXI.autoDetectRenderer(720, 1280);
	//document.body.appendChild(renderer.view);
 	rf_stage = new PIXI.Container();
	sGameMainUI.addChild(rf_stage);
	rf_dot = new PIXI.Graphics();
	rf_dot.beginFill(0xFF9900);
	rf_dot.drawCircle(-8,-8,16);
	rf_dot.endFill();
    //rf_dot.blendMode= PIXI.BLEND_MODES.ADD;//블랜드모드
    //rf_dot.PIXI.BLEND_MODES.MULTIPLY;
	rf_stage.addChild(rf_dot);

	rf_renderTexture = new PIXI.RenderTexture(renderer, renderer.width, renderer.height);
	rf_renderTexture2 = new PIXI.RenderTexture(renderer, renderer.width, renderer.height);
    //rf_renderTexture.render(Star3_Clear[0]);//이미지 넣기 테스트
	var currentTexture = rf_renderTexture;

	var outputSprite = new PIXI.Sprite(currentTexture);
	sGameMainUI.addChild(outputSprite);
    //_ref_trail_animate();
}
function _ref_trail_animate(){
    var a = Date.now() * 0.001;
    rf_dot.x = renderer.width * 0.5 + (Math.cos(a) * 200);
    rf_dot.y = renderer.height * 0.5 + (Math.sin(a) * 200);
    rf_dot.alpha = 0.25;
    // swap the buffers ...
    var temp = rf_renderTexture;
    rf_renderTexture = rf_renderTexture2;
    rf_renderTexture2 = temp;

    rf_renderTexture2.render(rf_stage, null, false);

    //renderer.render(ref_stage);
    //requestAnimationFrame( animate );
}



function _ref_() {
    //변환//컨버팅//
    var int = Number("string");

    //빈객체 생성 //2가지
    var arr = {};
    //err var arr = new Object();

    arr = [1, 2, 3, 4]; //배열 리터럴
    arr = new Array(10, 11, 12, 13, 14, 15, 16, 17, 18, 19);
    arr.name = "simple array";
    //err arr["name"] =  "tiny array";

    var whatType = typeof (arr[90]); //undefined
    arr[arr.length] = 111; //안전하게 덧붙이기
    var retD = arr.pop(); //맨뒤값 리턴, 맨뒤값 제거
    arr.push(222); //맨뒤값 추가(Add),
    var retE = arr.shift(); //맨앞값 리턴, 맨앞값 제거
    arr.unshift(-111); //맨앞값 추가
    arr.reverse(); //
    var retC = arr.slice(1, 3); //[0]에서부터 [8]까지 삭제후, 결과값 리턴
    arr.sort(CompareForSort); //
    arr.sort(function(a,b){return a.id-b.id});
    var retA = arr.splice(2, 3); //[2]부터 3개 제거, 제거값 리턴
    var retB = arr.splice(2, 3, 444, 555); //[2]부터 3개 제거후, [2]에 추가, 제거값 리턴

    arr.toString();
    arr.toLocaleString();
    var retF = arr.concat([20, 21, 22, 23, 24, 25, 26, 27, 28, 29]); //새배열로 연결후, 리턴
    var retG = arr.join(" and "); //스트링 결과 리턴

    //sort용 비교함수
    function CompareForSort(first, second) {
        if (first == second) return 0;
        if (first < second) return -1;
        else return 1;
    }

    for (var i = 0; i < 5; i++) {} //일반
    for (var i = 0, len = arr.length; i < len; i++) {} //참조줄이기
    //err for (var i = 0, item; item = arr[i]; i++) {}          // item 으로 뭔가를 수행


    //객체
    var obj = {
        name: "Carrot",
        "for": "Max",
        details: {
            color: "orange",
            size: 12
        }
    };

    //객체접근
    var cName1 = obj.details.color;
    //err var cName2 = obj["details"]["size"];

    var hA = "hello";
    var h1 = hA.charAt(0); //h
    var iInt = parseInt("0120", 10); //120
    var rA = hA.replace("hel", "gal"); // gallo
    var hBig = hA.toUpperCase();

    var bA = Boolean(""); //false   //비워있으면 false
    var bB = Boolean(234); //true

    var aString = "1" + 1 + 1; //111   //형변환은 첨것으로 판별
    var aInt = 1 + 1 + "1"; //3

    //err var bTypeA = (1==true);   //true  //형변환하므로
    var bTypeB = (1 === true); //false //반대로 !== 연산자

    var nameA = arr[0] && arr[0].getName();
    var nameB = arr[0] || "default";

    //물음표문
    var allowed = (arr[0] > 18) ? "yes" : "no";

    //스위치문
    switch (arr[0]) {
    case 0:
        break;
    case 1:
        break;
    default:
        break;
    }
    //forin포인반복문
    for (var i in arr) {
        //
    }

    //와일문 //적어도 1번실행
    var iA = 0;
    do {
        iA += 10;
    } while (iA < 100);

    //일반적인 while
    var iB = 0;
    while (true) {
        iB += 1;
        if (iB > 1000) break;
    }


    function avg() { //평균함수 //인자를 가변적으로 사용하기
        var sum = 0;
        for (var i = 0, j = arguments.length; i < j; i++) {
            sum += arguments[i];
        }
        return sum / arguments.length;
    }
    var retH = avg(2, 3, 4, 5, 6); //인자를 가변적으로 사용하기
    var retI = avg.apply(null, [2, 3, 4, 5, 6]); //배열인자

    var avgF = function () { //평균함수 //함수를 변수로 지정
        var sum = 0;
        for (var i = 0, j = arguments.length; i < j; i++) {
            sum += arguments[i];
        }
        return sum / arguments.length;
    }; //변수

    //사용자 정의 객체 --어설프고, 전역 이름공간에 관련 함수가 주렁
    function makePerson(first, last) {
        return {
            first: first,
            last: last
        };
    }

    function personFullName(person) {
        return person.first + ' ' + person.last;
    }

    function personFullNameReversed(person) {
        return person.last + ', ' + person.first;
    }
    var sTemp = makePerson("Simon", "Willison");
    personFullName(sTemp); //Simon Willison
    personFullNameReversed(sTemp); //Willison, Simon

    //사용자 정의 객체
    function makePerson(first, last) {
        return {
            first: first,
            last: last,
            fullName: function () {
                return this.first + ' ' + this.last;
            },
            fullNameReversed: function () {
                return this.last + ', ' + this.first;
            }
        }; //변수
    }
    var sName = makePerson("Simon", "Willison");
    var sFull = sName.fullName(); //Simon Willison
    var sReve = sName.fullNameReversed(); //Willison, Simon
    //문제요지
    var sErr = makePerson("Simon", "Willison");
    var fullName = sErr.fullName;
    fullName(); // undefined undefined //전역변수를 참조하려함

    //사용자 정의 객체 --'this'코드의 이점
    function Person(first, last) {
        this.first = first;
        this.last = last;
        this.fullName = function () {
            return this.first + ' ' + this.last;
        };
        this.fullNameReversed = function () {
            return this.last + ', ' + this.first;
        };
    }
    var sNameThis = new Person("Simon", "Willison");

    //사용자 정의 객체 --prototype는 인스턴스
    function Person(first, last) {
        this.first = first;
        this.last = last;
    }
    Person.prototype.fullName = function () {
        return this.first + ' ' + this.last;
    };
    Person.prototype.fullNameReversed = function () {
        return this.last + ', ' + this.first;
    };
    Person.prototype.firstNameCaps = function () {
        return this.first.toUpperCase();
    };
    String.prototype.reversed = function () { //스트링에 추가도 됨
        var r = "";
        for (var i = this.length - 1; i >= 0; i--) {
            r += this[i];
        }
        return r;
    };
    Person.prototype.toString = function () {
        return '<Person: ' + this.fullName() + '>';
    };
    var sPtInst = new Person("Simon", "Willison");
    sPtInst.firstNameCaps(); //SIMON
    var sString = "Simon";
    sString.reversed(); //스트링에 추가된 함수 호출
    //print// sPtInst;                                        //<Person: Simon Willison>

    function lastNameCaps() {
        return this.last.toUpperCase();
    }
    lastNameCaps.call(sPtInst); //apply()는 call이라는 이름을 가진 자매 함수를 가짐
    //apply()와는 대조적으로 확장된 메소드 리스트를 가짐

    //내장함수 //지역 전역 //전역 범위에 들어 있는 함수의 수를 낮게 유지
    function betterExampleNeeded() {
        var a = 1;

        function oneMoreThanA() {
            return a + 1;
        }
        return oneMoreThanA();
    }

    //클로져 //닫힌 주머니 //컨트롤하지 못하는 내부변수 //쉽게 메모리 누출
    function makeAdder(a) {
        return function (b) {
            return a + b;
        };
    }
    var xClosures = makeAdder(5);
    var yClosures = makeAdder(20);
    //xClosures(6); // 11을 돌려줌
    //yClosures(7); // 27을 돌려줌

    //메모리누출 테스트
    var document;

    function leakMemory() {
        var el = document.getElementById('el');
        var o = {
            'el': el
        };
        el.o = o; //el와 o에 의해 사용되는 메모리를 반환하지 못합
    }

    function addHandler() {
        var el = document.getElementById('el'); //JavaScript 객체 (내부 함수)와 원시 객체 (el)간에 순환 참조
        el.onclick = function () { //익명 내부 함수 때문에 생성된 클로져
            this.style.backgroundColor = 'red';
        };
    }
    //메모리누출방지
    function addHandler() {
        var el = document.getElementById('el');
        el.onclick = function () {
            this.style.backgroundColor = 'red';
        };
        el = null; //순환 참조 고리를 끊을
    }

    function addHandler() {
        var clickHandler = function () {
                this.style.backgroundColor = 'red';
            } //순환 참조를 고리를 끊기 위한 한 요령은 또다른 클로져를 추가하는 것
            (function () {
                var el = document.getElementById('el');
                el.onclick = clickHandler;
            })(); //내부 함수는 실행되고 바로 사라지므로서, clickHandler와 함께 생성된 클로져로부터 그 내용을 숨깁니다.
    }
    //---------------정수변환
    var intvalue = Math.floor(value); //정수
    var intvalue = Math.round(value); //반올림정수

    //---------------트윈맥스 ----------------------------------------------------------------------
    CustomEase.create(
        "bouncing1",
        "M0,0 C0.105,0 0.374,0.058 0.478,0.206 0.632,0.42 0.724,0.963 0.732,1 0.74,0.985 0.79,0.906 0.874,0.906 0.966,0.906 1,1 1,1"//바운드
    );      
    var bzPath = [
        {
            x: 0,
            y: 0,
        }, //, scale:2},
        {
            x: dx,
            y: 80,
        }, //, scale:1},
        {
            x: dx + dtx,
            y: dty * 0.5,
        }, //, scale:2},
        {
            x: dtx,
            y: dty,
        } //, scale:1}
    ];
    TweenMax.to(
        nbBubble[index].item,
        dirdist * 0.00125, //0.001,
        {
            bezier: {
                //type:"cubic",
                type: "soft", //강추
                //autoRotate:true,
                values: bzPath,
            },
            onUpdate: //debug
                function () {
                    if(dm) console.log(
                    "xy:" + nbBubble[debIndex].item.x + "," + nbBubble[debIndex].item.y 
                    + ", scaleXY:" + nbBubble[debIndex].item.scale.x + ", " + nbBubble[debIndex].item.scale.y
                    + ", bbxy:" + nbBubble[debIndex].x +", "+y
                );
            },
            onComplete: function () {

            },
            ease: Linear.easeNone
        }
    );

    //딜레이콜
    TweenMax.delayedCall(
        0.1, //tilem
        function () {
            //console.log();
        }
    );

    //작동중인 트윈제거
    TweenMax.killTweensOf(thisTween);

    //이동트윈
    TweenMax.fromTo(
        this, //object
        0.35, //time 
        {
            x: 0 //,                       //pos
                //y:0                        //pos
        }, {
            x: 100, //pos
            //y:0,
            ease: Power1.easeOut,

            delay: 0.1

        }
    );

    //스케일트윈
    TweenMax.fromTo(
        sprCurMedal,         //container.scale
        1, //time
        {
            scaleX: 0.1,    //x:0.1,
            scaleY: 0.1     //y:0,1
        }, { //메달트윈
            scaleX: 1,      //x:1,
            scaleY: 1,      //x:1,
            
            ease:Linear.easeNone,
//            ease: SteppedEase.config(12),
//            ease: RoughEase.ease.config(
//                {
//                    template:  Power0.easeNone,//Power1.easeOut
//                    strength: 0.2,
//                    points: 10,
//                    taper: "none",  //none,in(시작시노이즈없게),out(끝노이즈없게),both(시작끝노이즈없게)
//                    randomize: false, //true(rand),false(regular)
//                    clamp: false
//                }
//            ),            
            //ease:SlowMo.ease.config(0.1, 0.4),
            //ease: "bouncing1",
            //ease: Power0.easeOut
            //ease: Sine.easeOut        
            //ease: Power1.easeOut,
            //ease: Elastic.easeOut,
            //ease: Bounce.easeOut,
            //yoyo:true,
            //repeat:1,
            onComplete: function (){
                if(dm) console.log("~ ~ twMaxOncomplete:"+0);
            },
            onStart: function(){
                if(dm) console.log("~ ~ twMaxOnstart:"+0);
            },
            delay: 0
        }
    );

    ///루핑스케일
    TweenMax.fromTo(
        sprStart,
        0.25, {
            scaleX: 0.98,
            scaleY: 0.98,
        }, {
            scaleX: 1.02,
            scaleY: 1.02,
            repeat: -1,
            delay: 1.25,
            ease: Power1.easeInOut,
            yoyo: true
        }
    );
    var tween = TweenMax.to(
        obj,
        2,
        {
            scaleX:153,
            //repeat:10,
            //yoyo:true,
            //onRepeat:onRepeat,
            //repeatDelay:0.5,
            ease:Linear.easeNone
        }
    );
    var twVal={
        score:0
    };
    twVal.score="0"; //시작시초기화
    TweenMax.fromTo(
        twVal,
        0.5, //time
        {
            score:0
        }, { //메달트윈
            score:kData.userScoreArray[kData.curLevel],
            //ease:Power1.easeOut,
            //ease: Elastic.easeOut,
            ease:Linear.easeNone,
            //ease: Bounce.easeOut,
            //yoyo:true,
            //repeat:1,
            onComplete: function (){
                //console.log("~ ~ twMaxOncomplete:"+0);
            },
            onStart: function(){
                //console.log("~ ~ twMaxOnstart:"+0);
            },
            onUpdate: function(){
                //console.log("~ ~ twMaxOnUpdate:"+getMoneyFormatFromNum(TxScore_Clear_tween.score));
                twText.text = getMoneyFormatFromNum(twVal.score);
            },
            delay: 0.5
        }
    );       
    
    //---------------트윈맥스종료 ----------------------------------------------------------------------
    
    //---------------컨테이너 속성----------------------------------
    var containerA = new PIXI.Container();
    //contBS.addChild(containerA); //렌더링용도 컨테이너에  붙이기
    containerA.scale.set(1.5, 1.5);
    containerA.scaleX=0.5;
    containerA.scale.y=0.5;
    containerA.alpha=0.5;
    containerA.rotation=(degToRad(45));
    //---------------컨테이너 속성----------------------------------
    
    //멀티스타일텍스트-------------------------------------------
    //index.html
    //    //<head>
    //    //    <script src="js_lib/pixi-multistyle-text.min.js"></script>
    //    //</head>    
    var cont = new PIXI.Container();
    var textSample = new PIXI.MultiStyleText(
        "EXIT "
        +"<pixi>"
            +"Pixi.js"
        +"</pixi>"
        +" can has "
        +"<multiline>"
            +"multiline+"
        +"</multiline>"
        +"\nand "
        +"<multistyle>"
            +"multi-styles"
        +"</multistyle>"
        +" text!", 
        { 
            def: { font: "35px "+fontShow, fill: "white" },      //EXIT ~ can has ~ and ~ text!
            multiline: { font: "35px "+fontShow, fill: "blue" }, //multiline
            pixi: { font: "35px "+fontShow, fill: "#D90057" },   //Pixi.js
            multistyle: { font: "35px "+fontShow, fill: "red" }  //multi-style
        } 
    ); 
    textSample.position.x = 20; 
    textSample.position.y = 20; 
    
    var nested = new PIXI.MultiStyleText(
        "EXIT "
        +"(<a>Now with "
            +"<b>"
                +"support"
            +"</b>"
            +" for "
            +"<c>nesting "
                +"<d>"
                    +"tags"
                +"</d>"
            +"</c>"
            +"!  "
            +"<e>Wow"
                +"<f>"
                    +"!!!"
                +"</f>"
            +"</e>"
        +"</a>)",
        { 
             def: { font: "24px "+fontShow, fill: "#222222" },              //EXIT ~ 끝
             a: { fill: "blue" },                                           //Now with ~ for ~ ! 
             b: { stroke: "white", strokeThickness: 3 },                    //support
             c: { font: "italic 16px "+fontShow, valign: "top" },           //nesting ~ 
             d: { valign: "bottom" },                                       //tags
             e: { font: "bold 24px "+fontShow, fill:ColorSet.yellow },      //Wow ~
             f: { fill: 0xff0000 }                                          //!!!
        } 
    ); 
    nested.position.x = 20; 
    nested.position.y = 100; 
    
    var spinningText = new PIXI.MultiStyleText(
        "EXIT "
        +"<iam>"
            +"I'm"
        +"</iam>"
        +" fun"
        +"<and>"
            +","
        +"</and>"
        +" fun "
        +"<and>"
            +"and"
        +"</and>"
        +" fun"
        +"<ding>"
            +"!"
        +"</ding>", 
        { 
            def: { font: "bold 60px "+fontShow, fill: "#cc00ff", stroke: "#fff", strokeThickness: 3 },                  //EXIT ~ 끝"
            iam: { font: "bold 30px "+fontShow, fill: "#000" },                                                         //I'm
            and: { font: "bold 30px "+fontShow, fill: "#000", valign: 'middle', stroke: "#fff", strokeThickness: 1 },   //, ~ and
            ding: { font: "bold 30px "+fontShow, fill: "#000", valign: 'bottom' }                                       //!
        }, 
        { 
            align: "center" 
        } 
    );
    spinningText.anchor.x = spinningText.anchor.y = 0.5; 
    spinningText.position.x = 620 / 2; 
    spinningText.position.y = 400 / 2; 
    var countingText = new PIXI.MultiStyleText(
        "EXIT COUNT 4EVAR: "
        +"<count>"
            +"0"
        +"</count>", 
        { 
            def: { font: "bold italic 60px "+fontShow, fill: "#3e1707" },                                           //EXIT COUNT 4EVAR:
            count: { font: "bold italic 60px "+fontShow, fill: "#3e1707", stroke: "#a4410e", strokeThickness: 7 }   //0 
        }, 
        { 
            align: "center" 
        } 
    ); 
   
    countingText.position.x = 620 / 2; 
    countingText.position.y = 320; 
    countingText.anchor.x = 0.5; 

    cont.addChild(textSample);
    cont.addChild(nested);
    cont.addChild(spinningText);
    cont.addChild(countingText);
    //멀티스타일텍스트----------------------------------------------    
} //_ref


/*
//코루틴
//간단한 예제

function* idMaker(){
  var index = 0;
  while(index < 3)
    yield index++;
}

var gen = idMaker();

console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // undefined
// ...

//yield* 를 사용한 예제
function* anotherGenerator(i) {
  yield i + 1;
  yield i + 2;
  yield i + 3;
}

function* generator(i){
  yield i;
  yield* anotherGenerator(i);
  yield i + 10;
}

var gen = generator(10);

console.log(gen.next().value); // 10
console.log(gen.next().value); // 11
console.log(gen.next().value); // 12
console.log(gen.next().value); // 13
console.log(gen.next().value); // 20

//Generator 에 인자값을 넘기는 예제
function* logGenerator() {
  console.log(yield);
  console.log(yield);
  console.log(yield);
}

var gen = logGenerator();

// the first call of next executes from the start of the function
// until the first yield statement
gen.next(); 
gen.next('pretzel'); // pretzel
gen.next('california'); // california
gen.next('mayonnaise'); // mayonnaise

//Generator 는 생성자로서 사용될 수 없다
function* f() {}
var obj = new f; // throws "TypeError: f is not a constructor"
*/