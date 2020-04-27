// GM에서 먼저 실행될 것들
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

function onBtnScaleOn( con, fnEnd) //버튼스케일크게
{
    //console.log("~ ~ onBtnScaleOn");
    con.scale.set(1, 1);
    TweenMax.fromTo(
        con.scale,
        0.025, //time
        {
            x:1,
            y:1,

        }, { //메달트윈
            x:1.1,
            y:1.1,
            ease:Linear.easeNone,
            onComplete: fnEnd,
            delay: 0
        }
    );
}
function onBtnScaleOff( con, fnEnd)//버튼스케일작게
{
    con.scale.set(1.2, 1.2);
    TweenMax.fromTo(
        con.scale,
        0.05, //time
        {
            x:1.1,
            y:1.1,

        }, { //메달트윈
            x:1,
            y:1,
            ease:Linear.easeNone,
            onComplete: fnEnd,
            delay: 0.05
        }
    );
}
function onFadeoutScale( con, fnEnd) //스케일작게사라지게
{
  //스케일트윈
    TweenMax.fromTo(
        con.scale,
        0.15, //time
        {
            x:1,
            y:1,

        }, { //메달트윈
            x:0.5,
            y:0.5,
            ease:Linear.easeNone,
            onComplete: fnEnd,
            //onComplete: function(){ runFadeinScale(con);},
            delay: 0.2
        }
    );
  //알파트윈
    TweenMax.fromTo(
        con,
        0.15, //time
        {
            alpah:1
        }, { //메달트윈
            alpha:0,
            ease:Linear.easeNone,
            delay: 0.2
        }
    );
}
function onFadeinScale( con, fnEnd) //스케일크며보이기
{
    con.alpha=0;
  //스케일트윈
    TweenMax.fromTo(
        con.scale,
        0.25, //time
        {
            x:0.5,
            y:0.5,

        }, { //메달트윈
            x:1,
            y:1,
            ease: Elastic.easeOut,
            onComplete: fnEnd,
            delay: 0.2
        }
    );
  //알파트윈
    TweenMax.fromTo(
        con,
        0.25, //time
        {
            alpah:0
        }, { //메달트윈
            alpha:1,
            ease:Linear.easeNone,
            delay: 0.2
        }
    );
}
function onFadeout( con, begin, fnEnd) //사라지게
{
  //알파트윈
    TweenMax.fromTo(
        con,
        0.15, //time
        {
            alpah:begin
        }, { //메달트윈
            alpha:0,
            ease:Linear.easeNone,
            delay: 0.2
        }
    );
}
function onFadein( con, end, fnEnd) //보이게
{
  //알파트윈
    TweenMax.fromTo(
        con,
        0.25, //time
        {
            alpah:0
        }, { //메달트윈
            alpha:end,
            ease:Linear.easeNone,
            delay: 0.2
        }
    );
}
function onMoveElastic( con, begin, end, fnEnd)
{
    //console.log("~ ~ onBtnScaleOn");
    con.position.set(begin.x,begin.y);
    TweenMax.fromTo(
        con,
        0.2, //time
        {
            x:begin.x,
            y:begin.y,

        }, { //메달트윈
            x:end.x,
            y:end.y,
            ease:Elastic.easeOut,
            onComplete: fnEnd,
            delay: 0
        }
    );
}
function onMoveLinear( con, begin, end, fnEnd)
{
    //console.log("~ ~ onBtnScaleOn");
    con.position.set(begin.x,begin.y);
    TweenMax.fromTo(
        con,
        0.1, //time
        {
            x:begin.x,
            y:begin.y,

        }, { //메달트윈
            x:end.x,
            y:end.y,
            ease:Linear.easeNone,
            onComplete: fnEnd,
            delay: 0
        }
    );
}
//ex: createBitmapFont( "48px shop_no_export", "x5", {x:11,y:-31}, "center" ),
function createBitmapFont( fontszname, text, pos, aligns ){
    if(aligns==undefined) aligns  = 'center';
    var tx1 = new PIXI.extras.BitmapText(text, { font:fontszname, align: aligns});
    tx1.position.set(pos.x,pos.y);
    return tx1;
}

function setSlotImage(
    conparent,//thisparent
    con,      //this
    conpos,   //thispos
    btn1,     //버튼
    bg1,      //슬롯UI배경
    spr1,     //슬롯UI하트아이콘
    spr2,     //슬롯UI배수아이콘 //text
    tx1       //임시txext
){
    //parent setting
    if(conparent) conparent.addChild(con);
    if(conpos) con.position.set(conpos.x, conpos.y);
    //parameter save    
    if(bg1){
        con.bg1 = bg1;
        con.addChild(bg1);
    } 
    if(spr1){
        con.spr1 = spr1;      
        con.addChild(spr1);
    } 
    if(spr2){
        con.spr2 = spr2;      
        con.addChild(spr2);
    } 
    if(tx1){
        con.tx1 = tx1;      
        con.addChild(tx1);
    }
    if(btn1){                   //버튼은 맨나중에 올려준다.
        con.btn1 = btn1;      
        con.addChild(btn1);
    }
    return con;    
}
function setBtnCoolTime(
    conparent,//thisparent
    con,      //this
    conpos,   //thispos
    spr,     //버튼이미지
    txt,    //버튼텍스트
    arr      //모드별 버튼배열
){
    //parent setting
    if(conparent) conparent.addChild(con);
    if(conpos) con.position.set(conpos.x, conpos.y);
    //parameter save
    if(spr){
        con.spr = spr;
        con.addChild(spr);
    }
    if(txt){
        con.txt = txt;
        con.addChild(txt);

    }
    if(arr){
        con.arr = arr;
    }
    con.timer=0;
    con.timermax=fHeartChargeTime;//60*15;//사용안함 //서버에서 가져오므로
    con.timeronoff=false;
    return con;
}



//pixi엔진에서 사용할 칼라 샘플
var ColorSet = {
    white: 0xffffff,
    red: 0xff0000,
    green: 0x00ff00,
    blue: 0x0000ff,
    black: 0x000000,
    yellow: 0xffff00,
    sky: 0xcceeff,
    cyan: 0x00ffff,
    magenta: 0xff00ff,
    grey: 0x808080,
    orange: 0xffa500,
    pink: 0xff8080,
    fontlevel: 0xfff57d,
    lightgrey: (0x808080 * 1.5),
    darkgrey: (0x808080 * 0.5),
    brown: 0xa52a2a
};

PIXI.extras.BitmapText.prototype.updateTextDefault = PIXI.extras.BitmapText.prototype.updateText;
PIXI.extras.BitmapText.prototype.updateText = function(){
    this.updateTextDefault();
    switch(this.align) {
        case 'center':
            this.pivot.x = this.textWidth * 0.5;
        break;
        case 'right':
            this.pivot.x = this.textWidth;
        break;
        default:
            this.pivot.x = 0;
        break;
    }
}

//스케일링버튼
//conparent,//this부모
//con,      //this
//conpos,   //this 위치
//spr1,     //bg용 sprite
//spr2,     //icon sprite
//tx,       //text버튼이름
//fn        //함수
function setNormaButtonCon( conparent, con, conpos, spr1, spr2, tx, fn, heartIndex) {
    if(conparent) conparent.addChild(con);
    if(conpos) con.position.set(conpos.x, conpos.y);
    
    if(spr1){   //버튼 클릭 스프라이트
        con.spr1=spr1;
        spr1.interactive = true;
        if(heartIndex!=undefined) spr1.heartIndex = heartIndex;
        con.addChild(spr1);
    }
    
    if(tx){ //버튼 이름
        con.tx=tx;
        con.addChild(tx);
    }
    
    if(spr2){ //버튼 이름
        con.spr2=spr2;
        con.addChild(spr2);
    }

    con.z_on=true;

    if(spr1){
        if (InputMode == MOUSE) spr1.on('click', fn);
        if (InputMode == MOUSE) spr1.on('mousedown', function (e) {
            mouseBTN = 1;
            SESoundPlay(se.Click);

            onBtnScaleOn(con);
        });
        //if(InputMode==MOUSE) spr1.on('mousemove', function(e) {if(mouseBTN){}});
        if (InputMode == MOUSE) spr1.on('mouseup', function (e) {
            mouseBTN = 0;
            onBtnScaleOff(con);

        });
        if (InputMode == MOUSE) spr1.on('mouseupoutside', function (e) {
            mouseBTN = 0;
            onBtnScaleOff(con);
        });
        //if(InputMode==MOUSEMODE) spr1.on('mouseout', function(e) {mouseBTN=0;});                                        //픽시지원하지만 터치랑 형평성

        if (InputMode == TOUCH) spr1.on('tap', fn);
        if (InputMode == TOUCH) spr1.on('touchstart', function (e) {
            mouseBTN = 1;
            SESoundPlay(se.Click);
            onBtnScaleOn(con);
        });
        //if(InputMode==TOUCH) spr1.on('touchmove', function(){ }); 
        if (InputMode == TOUCH) spr1.on('touchend', function (e) {
            mouseBTN = 0;
            onBtnScaleOff(con);
        });
        if (InputMode == TOUCH) spr1.on('touchendoutside', function (e) {
            mouseBTN = 0;
            onBtnScaleOff(con);
        });
    }else console.log("~ ~ setNormaButtonCon: spr1 == null!!");
    //pixi err// if(InputMode==TOUCHMODE) NormalButtton.on('touchenter', function(){console.log("--touchenter--"); }); //픽시지원 안함
    //pixi err// if(InputMode==TOUCHMODE) NormalButtton.on('touchleave', function(){console.log("--touchleave--"); }); //픽시지원 안함
    //pixi err// if(InputMode==TOUCHMODE) NormalButtton.on('touchcancel', function(){console.log("--touchcancel--"); });  //픽시지원 안함
    return con;
}

function tweenTx(tx, sournum, destnum){
    TweenMax.fromTo(tx,
        0.5,
        {
            score:sournum
        },
        {
            score:destnum,
            ease:Linear.easeNone,
            onUpdate: function(){
                tx.text = Math.floor(tx.score);
            },
            onComplete: function(){
                tx.text = destnum;
            },
            delay: 0
        }
    );
}
function tweenTxFn(tx, sournum, destnum, fn){
    TweenMax.fromTo(tx,
        0.5,
        {
            score:sournum
        },
        {
            score:destnum,
            ease:Linear.easeNone,
            onUpdate: function(){
                tx.text = fn(Math.floor(tx.score));
            },
            onComplete: function(){
                tx.text = fn(destnum);
            },
            delay: 0
        }
    );
}
function getMoneyFormatFromNum(n) {
    var c = 0; //표시자리
    var d = ".";
    var t = ",";
    var s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};
var convertTimeFormatFromSec = function (num) {
    var hrs = Math.floor(num / 3600);
    var mins = Math.floor((num % 3600) / 60);
    var secs = num % 60;
    return (hrs > 0 ? hrs + ":" : "") + (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs;
};