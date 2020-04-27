//사용법:

//스파인 오브젝트 생성하기
//var spnHeartTw = new PIXI.spine.Spine(res.heart_bomb.spineData);

//하트이동 트윈적용하기
// sHeartTw.onSetMode(HeartMode.start);                     //이동위치지정
// HeartDestFn[HeartMode.start]=clickOk_Condition_after;    //도착시 콜백지정
// sHeartTw.onBegin();


var HeartMode = {
    start:0,
    fail:1,
    hint:2,
    retry:3,
    clearnext:4,
    clearretry:5
};

var HeartDestPos = [ {x: 509, y: 906 }, //start
    {x: 488, y: 771}, //fail
    {x: 488, y: 771}, //hint
    {x: 498, y: 896 }, //retry //이어서하기
    {x: 562, y: 904 }, //clearnext
    {x: 157, y: 905 } //clearre
];

//하트가 출발시 실행되는 콜백(지금은 1개만 사용)
var HeartStartStartFn = [
    function(){if(dm) console.log("HeartStart 0");},
    function(){if(dm) console.log("HeartStart 1");},
    function(){if(dm) console.log("HeartStart 2");},
    function(){if(dm) console.log("HeartStart 3");},
    function(){if(dm) console.log("HeartStart 4");},
    function(){if(dm) console.log("HeartStart 5");}
];


//하트가 도착시 실행되는 콜백
var HeartDestFn = [
    function(){if(dm) console.log("HeartDestFn 0");},
    function(){if(dm) console.log("HeartDestFn 1");},
    function(){if(dm) console.log("HeartDestFn 2");},
    function(){if(dm) console.log("HeartDestFn 3");},
    function(){if(dm) console.log("HeartDestFn 4");},
    function(){if(dm) console.log("HeartDestFn 5");}
];

var HeartSpnAnim = { //하트 스파인 애니 목록
    begin:"heart_bomb_in",
    idle: "heart_bomb_idle",
    end:  "heart_bomb_out"
};

function createHeartTweener(){
    
    sHeartShop.HeartTw = sHeartTw;
    
    sHeartTw.mode = HeartMode.start;
    sHeartTw.HeartTw = sHeartTw;
    
    sHeartTw.begin = {x:296, y:39 }; //하트타이머 위치
    sHeartTw.end = {x:360,y:640};   //임시,지워질데이터
    
    if(spnHeartTw) //움직이는 하트는 스파인으로 되어 있어야 한다. 없으면 사용안함
        sHeartTw.addChild(spnHeartTw);
    sHeartShop.addChild(sHeartTw);

// //  주석처리된 코드는 배치위치를 알기위한 더미이므로 필요 없으면 지워도 됨--------------------------------------------------
//    sHeartShop.dummy = new PIXI.Container();
//    sHeartShop.addChild(sHeartShop.dummy);
//    debug_Obj(sHeartShop.dummy);
// //  주석처리된 코드는 배치위치를 알기위한 더미이므로 필요 없으면 지워도 됨--------------------------------------------------

    if(spnHeartTw) {
        spnHeartTw.state.onComplete = function (trackIndex, count) { //3개동작이 필요 begin,idle,end
            switch (trackIndex) {
                case 1:
                    if(dm) console.log("spnHeartTw.state.onComplete 1");
                    SpinePlay(spnHeartTw, 0, 0, HeartSpnAnim.idle, 0, true, 1);
                    sHeartTw.onTween();
                    break;
                case 2:
                    if(dm) console.log("spnHeartTw.state.onComplete 2 hide");
                    //kData.heart-=1;
                    spnHeartTw.visible = false;
                    sHeartTw.onEnd();
                    break;

            }
        };
    }
    sHeartTw.onTween = function(){
        var bzPath = [
            {
                x: sHeartTw.begin.x,
                y: sHeartTw.begin.y,
            }, //, scale:2},
            {
                x: sHeartTw.end.x,//sHeartTw.begin.x-((sHeartTw.begin.x-sHeartTw.end.x)*0.5),
                y: sHeartTw.begin.y+((sHeartTw.end.y-sHeartTw.begin.y)*0.5),
            }, //, scale:1},
//            {
//                x: sHeartTw.begin.x,
//                y: sHeartTw.begin.y+(sHeartTw.end.y*0.5),
//            }, //, scale:2},
            {
                x: sHeartTw.end.x,
                y: sHeartTw.end.y,
            } //, scale:1}
        ];
        TweenMax.to(
            sHeartTw,
            0.25,
            {
                bezier: {
                    //type:"cubic",
                    type: "soft", //강추
                    //autoRotate:true,
                    values: bzPath
                },
                // onUpdate: //debug
                //     function () {
                //     //console.log("sHeartTw.xy:"+sHeartTw.x+","+sHeartTw.y );
                // },
                onComplete: function () {
                    SESoundPlay(se.SE_Heart);
                    if(dm) console.log("sHeartTw.finishstep --> sHeartTw.xy:"+sHeartTw.end.x+","+sHeartTw.end.y);
                    sHeartTw.position.set(sHeartTw.end.x, sHeartTw.end.y);
                    if(spnHeartTw){
                        SpinePlay(spnHeartTw, 0,0, HeartSpnAnim.end, 2, false, 1); //스파인이 도착하면
                    }else{
                        TweenMax.delayedCall(0.3, sHeartTw.onEnd); //스파인이 없는 경우(컨테이너)
                    }
                },
                ease: Linear.easeNone
            }
        );        
        
    };

    sHeartTw.onSetMode = function(newmode){ //트윈 목적지, 시작지 위치설정
         sHeartTw.mode = newmode;
         switch(sHeartTw.mode) {
            case HeartMode.start:
                sHeartTw.end.x = HeartDestPos[HeartMode.start].x;
                sHeartTw.end.y = HeartDestPos[HeartMode.start].y;
                break;
            case HeartMode.fail:
                sHeartTw.end.x = HeartDestPos[HeartMode.fail].x;
                sHeartTw.end.y = HeartDestPos[HeartMode.fail].y;
                break;
            case HeartMode.hint:
                sHeartTw.end.x = HeartDestPos[HeartMode.hint].x;
                sHeartTw.end.y = HeartDestPos[HeartMode.hint].y;
                break;
            case HeartMode.retry:
                sHeartTw.end.x = HeartDestPos[HeartMode.retry].x;
                sHeartTw.end.y = HeartDestPos[HeartMode.retry].y;
                break;
            case HeartMode.clearnext:
                sHeartTw.end.x = HeartDestPos[HeartMode.clearnext].x;
                sHeartTw.end.y = HeartDestPos[HeartMode.clearnext].y;
                break;
            case HeartMode.clearretry:
                sHeartTw.end.x = HeartDestPos[HeartMode.clearretry].x;
                sHeartTw.end.y = HeartDestPos[HeartMode.clearretry].y;
                break;
            default:
                break;
        }        
    };
    
    sHeartTw.onBegin = function(){
        if(sHeartShop.onTweeing) return;
        sHeartShop.onTweeing=true;

        switch(sHeartTw.mode) { //지금은 1개로 다 사용하므로 주석처리
            // case HeartMode.start:
            //     HeartStartStartFn[0]();
            //     break;
            // case HeartMode.fail:
            //     HeartStartStartFn[1]();
            //     break;
            // case HeartMode.hint:
            //     HeartStartStartFn[2]();
            //     break;
            // case HeartMode.retry:
            //     HeartStartStartFn[3]();
            //     break;
            // case HeartMode.clearnext:
            //     HeartStartStartFn[4]();
            //     break;
            // case HeartMode.clearretry:
            //     HeartStartStartFn[5]();
            //     break;
            default:
                sHeartShop.timer.onSetCount(kData.iHeart);//프리뷰임
                SaveDataInClient();
                sHeartTw.position.set(sHeartTw.begin.x, sHeartTw.begin.y); //하트를 출발선상에 세운다

                if(spnHeartTw) { //하트 스파인이면
                    SpinePlay(spnHeartTw, 0, 0, HeartSpnAnim.begin, 1, false, 1); //spnHeartTw.state.onComplete에서 sHeartTw.onTween()호출
                }
                else{           //하트 스파인이 아닐 경우
                    sHeartTw.onTween();
                }
                break;
        }
    };

    sHeartTw.onEnd = function(){
        sHeartShop.onTweeing=false;
        switch(sHeartTw.mode) {
            case HeartMode.start:
                HeartDestFn[0]();//cbButtonGameStart_after();
                break;
            case HeartMode.fail:
                HeartDestFn[1]();//cbButtonRetry_after();
                break;
            case HeartMode.hint:
                HeartDestFn[2]();//cbADYes_after();
                break;
            case HeartMode.retry:
                HeartDestFn[3]();//cbButtonGameRetryYes_after();
                break;
            case HeartMode.clearnext:
                HeartDestFn[4]();//cbClearStageTouchEnd_after();
                break;
            case HeartMode.clearretry:
                HeartDestFn[5]();//cbClearStageTouchEnd_after();
                break;
            default:
                break;
        }
    };

}//createHeartTweener
