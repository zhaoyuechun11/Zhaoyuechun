// ---계층구조--------------------------
// stage(루트)
//   +sHeartShop
//      +sHeartShop.timer         //하트충전창
//      +sHeartShop.tw           //트윈루트(애니)
//        +sHeartShop.twcommon   //하트샵 배경창(타이틀포함)
//        +sHeartShop.twy        //야후용    아이템 컨테이너
//        +sHeartShop.twn        //그레이프용 아이템 컨테이너(게스트 포함)
//        +sHeartShop.twcooltime     //쿨타임용
//      +sHeartShop.fin          //결제결과창
//        +sHeartShop.twfin      //결제결과창(트윈)  
//      +sHeartShop.dlg          //메세지결과창
//        +sHeartShop.twdlg      //메세지결과창(트윈)

// ---메소드----------------------------
//sHeartShop.onShow()         //하트샵창나오기 //cShopYOK
//sHeartShop.onHide()         //하트샵창딛기   //cShopYOK

//sHeartShop.timer.onShow()   //타이머창 열기
//sHeartShop.timer.onHide()   //타이머창 닫기
//sHeartShop.timer.onSetCount(12);
//sHeartShop.timer.onSetTimer("00:00")

//sHeartShop.fin.onSetMsg("구매완료")   //구매 결과창 메세지 설정
//sHeartShop.fin.onShow()     //구매 결과창 열기
//sHeartShop.fin.onHide()     //구매 결과창 닫기

//sHeartShop.dlg.onSetMsg("에러")      //일반 다이얼로그 메세지 설정
//sHeartShop.dlg.onShow()              //일반 다이얼로그 열기
//sHeartShop.dlg.onHide()              //일반 다이얼로그 닫기
//sHeartShop.dlg.onSetOk(fn)           //일반 다이얼로그 OK버튼 콜백 지정
//sHeartShop.dlg.onSetNo(fn)           //일반 다이얼로그 No버튼 콜백 지정

//sHeartShop.onSetPoint(10,20);      //회원포인트UI수치 조정

//sHeartShop.onHideAll()      //모든 창 닫기
//sHeartShop.onInitMode(BillMode.greapguest)     //접속모드에 따른 초기화: 게스트, 회원, 야후



//--실행방법 -----------------------------------
//---초기화는 처음 1번만 실행 해줄것---
// createUI_HeartShop();      //하트샵ui 리소스 생성 초기화
// createMethod_HeartShop();  //하트샵ui 메소드 생성

//하트트윈 사용예:
//sHeartTw.onSetMode(HeartMode.start); //모드를 선택, 출발지점 지정됨
//sHeartTw.onBegin();                  //버튼클릭시,하트 발사 -->onTween -->onEnd

//    --->쿨타임 업데이트
//    if(sHeartShop.onInitialized) {
//        sHeartShop.twcooltime.onUpdateCoolTimer();
//        console.log();
//    }


// //=====GM.js 하트샵 글로벌 변수=================================
// var sHeartShop = new PIXI.Container();      //하트샵 루트 parent
// sHeartShop.onInitialized=false;             //하트샵 초기화 전 상태
//
// var sHeartTw = new PIXI.Container();        //날아다니는 하트 Container(트윈용)
//
// //날아다니는 하트(스파인데이터)                 //loader.add('heart_bomb',      'spine2/heart_bomb.json');
// var spnHeartTw;                             //spnHeartTw = new PIXI.spine.Spine(res.heart_bomb.spineData);
// var HEART_COOL_TIME = 60*10;
// var coolTimeHeart = HEART_COOL_TIME;
//
// //접속모드에 따른 결제모드
// var BillMode = {
//     greap:0,
//     greapguest:1,
//     yahoo:2,
//     none:3
// };
// var Billing = BillMode.greapguest;               //기본 접속모드
//
// //인덱스를 모드스트링으로 변환
// var Bill2Str = {
//     "0":"greap",
//     "1":"greapguest",
//     "2":"yahoo",
//     "3":"none"
// };
// //=====GM.js 하트샵 글로벌 변수-============================




var ShopBitmapFont = "shop_no-export";   //아이템갯수폰트
var ShopFont = 'Conv_HMKMRHD_NumberEng'; //일반폰트

var ShopTimerPos=     {x:400, y:43}; // 타이머의 위치
var ShopTimerPlusPos= {x:82,  y:0};  // 타이머더하기버튼 로컬위치
var ShopTimerClockOff={x:-6,  y:0};  // 타이머시계      로컬위치
var ShopTimerHeartOff={x:-104,y:3};  // 타이머하트      로컬위치
var ShopTimerClickPos = {x:-100,y:0};//타이머전체클릭가능버튼 로컬위치

var ShopPointBgOff = {x:0, y:-310};   // 샵회원포인트배경          로컬위치
var ShopPointTextOff = {x:10, y:-308};// 샵회원포인트text

var ShopBg = {x:0, y:34};           //샵 배경 //0, 34
var ShopTitleBg = {x:0, y:-411};      //샵 배경
var ShopTitleOff = {x:0, y:-411};     //샵 타이틀

var ShopOkBtnOff = {x:0, y:392};      // 샵 ok닫기          로컬위치
var ShopOkTxOff =  {x:0, y:-5};        // 샵 oktx닫기          로컬위치

var ShopSlotYOff = 147;                //샵슬롯메뉴 Y높이 간격
var ShopSlotOff0 = {x:0, y:-191};      //샵슬롯메뉴 0번              로컬 위치
var ShopPurchaseBtnOff = {x:179, y:5}; //샵슬롯 구입버튼             로컬위치
var ShopPurchaseTxOff = {x:28, y:-10};  //샵슬롯 구입버튼이름         로컬 위치
var ShopPurchaseBmOff = {x:0, y:-7};   //샵슬롯 구입버튼아이콘        로컬 위치(그림사용버튼의 경우)
var ShopSlotBgOff = {x:3, y:0};        //샵슬롯 배경(좌우x값 수정시)  로컬 위치
var ShopSlotHeartOff = {x:-152, y:0};  //샵슬롯 배경(하트)           로컬 위치
var ShopSlotX2Off = {x:11,y:-31};      //샵슬롯 배경(x2)           로컬 위치
var ShopSlotGreapOff = {x:-220, y:-40};//샵슬롯 회원전용           로컬 위치

var ShopFinBgPos = {x:0, y:0};
var ShopFinTxIconOff = {x:0, y:-111};
var ShopFinX2Off = {x:106, y:-176};
var ShopFinMsgOff = {x:0, y:12};
var ShopFinOkOff = {x:0, y:126};
var ShopFinOkTxOff = {x:0, y:-5};

var ShopMsgBgPos = {x:0, y:0};
var ShopMsgTxOff = {x:0, y:-79};
var ShopMsgOkBtnOff = {x:126, y:126};
var ShopMsgOkTxOff = {x:0, y:-3};
var ShopMsgCancelBtnOff = {x:-126, y:126};
var ShopMsgCancelTxOff = {x:0, y:-3};




var ShopPath = {
    "white":         strGamePath+"img/white.png",
    "timerbg":       strGamePath+"img2/heart_bg.png",            //타이머 배경
    "heart":         strGamePath+"img2/select_heart.png",       //타이머의 하트
    "plusbtn":       strGamePath+"img2/select_heart_plus.png",  //타이머의 "+"버튼
    "shopbg":        strGamePath+"img2/popup_shop.png",         //샵 배경
    "shoptitle":    "",                            //샵 타이틀 //폰트인경우, 그림인 경우
    "shoptitlebg":   strGamePath+"img2/title_shop.png",         //샵 타이틀 배경
    "pointbg":       strGamePath+"img2/point.png",              //샵에서 회원 포인트 배경
	"pointyahoo":    strGamePath+"img2/btn_point.png",           //-----------------------야후바로가기
    "movicoin":      strGamePath+"img2/coin.png",               //------------------------모비코인
    "yesbtnbg":      strGamePath+"img2/btn_shop_ok.png",         //ok버튼 배경
    "nobtnbg":       strGamePath+"img2/btn_message_no.png",     //no버튼 배경
    "lowpricebtn":   strGamePath+"img2/btn_shop_1.png",         //저가아이템버튼
    "highpricebtn":  strGamePath+"img2/btn_shop_2.png",
    "cooltimebtn":   strGamePath+"img2/btn_shop_cooltime.png",         //쿨타이머4종텍스쳐
    "lowpricebg":    strGamePath+"img2/list_1.png",             //저가아이템버튼배경
    "highpricebg":   strGamePath+"img2/list_2.png",
    "adicon":        strGamePath+"img2/shop_ad.png",            //AD광고 아이콘
    "admovie":       strGamePath+"img2/shop_movie.png",
    "addownload":    strGamePath+"img2/shop_down.png",
    "resultdlg":     strGamePath+"img2/popup_shop_result.png",  //구매결과창
    "msgdlg":        strGamePath+"img2/popup_message.png"       //메세지창
    
};

//          id:구매아이디, icon:UI아이템텍스쳐, tx:UI표시갯수, button:UI구매가격, value:획득하트량, pricepoint:소비포인트
// sHeartShop.itemList={
//     "greap":{
//         "0":{ "id":"", "icon":strGamePath+"img2/heart_no_1.png",  "tx":"x5",  "button":"200", "value":"5", "pricepoint":"200"},
//         "1":{ "id":"", "icon":strGamePath+"img2/heart_no_2.png",  "tx":"x25", "button":"1000", "value":"25", "pricepoint":"1000"}, //그림버튼
//         "2":{ "id":"", "icon":strGamePath+"img2/heart_no_3.png",  "tx":"x5",  "button":"",     "value":"5", "pricepoint":"0"},  //그림버튼
//         "3":{ "id":"", "icon":strGamePath+"img2/heart_no_4.png",  "tx":"x7", "button":"",     "value":"7", "pricepoint":"0"}    //그림버튼
//     },
//     "greapguest":{ //"회원가입"은 생성시 getstring한다.
//         "0":{ "id":"", "icon":strGamePath+"img2/heart_no_1.png",  "tx":"x5",  "button":"200", "value":"5", "pricepoint":"200" },
//         "1":{ "id":"", "icon":strGamePath+"img2/heart_no_2.png",  "tx":"x25", "button":"1000", "value":"25", "pricepoint":"1000" }, //그림버튼
//         "2":{ "id":"", "icon":strGamePath+"img2/heart_no_3.png",  "tx":"x5",  "button":"",     "value":"5", "pricepoint":"0"},  //그림버튼
//         "3":{ "id":"", "icon":strGamePath+"img2/heart_no_4.png",  "tx":"x7", "button":"",     "value":"7", "pricepoint":"0"}
//     },
//     "yahoo":{
//         "0":{ "id":"", "icon":strGamePath+"img2/heart_no_1.png",  "tx":"x5",   "button":"300", "value":"5",  "pricepoint":"" },
//         "1":{ "id":"", "icon":strGamePath+"img2/heart_no_2.png",  "tx":"x20",   "button":"1150", "value":"20",  "pricepoint":"" },
//         "2":{ "id":"", "icon":strGamePath+"img2/heart_no_3.png",  "tx":"x50",  "button":"2800", "value":"50", "pricepoint":"0"},
//         "3":{ "id":"", "icon":strGamePath+"img2/heart_no_4.png",  "tx":"x100",  "button":"5400", "value":"100", "pricepoint":"0"}
//     }
// };
// sHeartShop.itemList={
//     "greap":{ "0":{ "id":"", "icon":"",  "tx":"",  "button":"",  "value":"", "pricepoint":""}, "1":{ "id":"", "icon":"",  "tx":"",  "button":"",  "value":"", "pricepoint":""}, "2":{ "id":"", "icon":"",  "tx":"",  "button":"",  "value":"", "pricepoint":""}, "3":{ "id":"", "icon":"",  "tx":"",  "button":"",  "value":"", "pricepoint":""}},
//     "greapguest":{"0":{ "id":"", "icon":"",  "tx":"",  "button":"",  "value":"", "pricepoint":""},"1":{ "id":"", "icon":"",  "tx":"",  "button":"",  "value":"", "pricepoint":""},"2":{ "id":"", "icon":"",  "tx":"",  "button":"",  "value":"", "pricepoint":""},"3":{ "id":"", "icon":"",  "tx":"",  "button":"",  "value":"", "pricepoint":""}},
//     "yahoo":{"0":{ "id":"", "icon":"",  "tx":"",  "button":"", "value":"",  "pricepoint":""},"1":{ "id":"", "icon":"",  "tx":"",  "button":"", "value":"",  "pricepoint":""},"2":{ "id":"", "icon":"",  "tx":"",  "button":"", "value":"",  "pricepoint":""},"3":{ "id":"", "icon":"",  "tx":"",  "button":"", "value":"",  "pricepoint":""}}
// };

// //---리스트가져오기
// if(loginTF === 1){ //로그인
//
//     if(proto.serPos === 0){ //모비서비스
//         for(var i=0; i<4; i++){
//             sHeartShop.itemList["greap"][""+i]["tx"] = "x"+shopListData[i].Quantity;
//             sHeartShop.itemList["greap"][""+i]["button"] = ""+shopListData[i].Price;
//             sHeartShop.itemList["greap"][""+i]["value"] = ""+shopListData[i].Quantity;
//             sHeartShop.itemList["greap"][""+i]["icon"] = strGamePath+shopListData[i].icon;
//         }
//
//     }else if(proto.serPos === 1){ // 야후
//         for(var i=0; i<4; i++) {
//             sHeartShop.itemList["yahoo"][""+i]["tx"] = "x" + shopListData[i].Quantity;
//             sHeartShop.itemList["yahoo"][""+i]["button"] = "" + shopListData[i].Price;
//             sHeartShop.itemList["yahoo"][""+i]["value"] = "" + shopListData[i].Quantity;
//             sHeartShop.itemList["yahoo"][""+i]["icon"] = strGamePath+shopListData[i].icon;
//         }
//     }
// }else{ //비로그인
//     if (networkManager.networkState === NET_STATE.LOCALHOST) {//로컬서비스
//         console.log("ShowHeartShop in local");
//     }else {
//         //게스트 모드
//         for (var i = 0; i < 4; i++) {
//             sHeartShop.itemList["greapguest"][""+i]["tx"] = "x" + shopListData[i].Quantity;
//             sHeartShop.itemList["greapguest"][""+i]["button"] = "" + shopListData[i].Price;
//             sHeartShop.itemList["greapguest"][""+i]["value"] = "" + shopListData[i].Quantity;
//             sHeartShop.itemList["greapguest"][""+i]["icon"] = strGamePath+shopListData[i].icon;
//         }
//     }
// }
// //---리스트가져오기


function createUI_HeartShop( parentHeartShop ){
    parentHeartShop.addChild(sHeartShop);

    sHeartShop.delaybtn = false;

    sHeartShop.tw = new PIXI.Container();       //트윈루트
    sHeartShop.twcommon = new PIXI.Container(); //트윈//타이틀
    sHeartShop.twy = new PIXI.Container();      //트윈//야후
    sHeartShop.twn = new PIXI.Container();      //트윈//그레이프
    sHeartShop.timer = new PIXI.Container();
    sHeartShop.twcooltime = new PIXI.Container();   //트윈//쿨타이머4종루트
    sHeartShop.twcooltime.btn = [];                 //버튼컨테이너배열

    sHeartShop.timer.cooltimer=[{btn:undefined, run:false, timer:0, max:0}, //쿨타이머4종
                                {btn:undefined, run:false, timer:0, max:0},
                                {btn:undefined, run:false, timer:0, max:0},
                                {btn:undefined, run:false, timer:0, max:0}];

    sHeartShop.fin = new PIXI.Container();      //결제성공창
    sHeartShop.twfin = new PIXI.Container();
    sHeartShop.dlg = new PIXI.Container();      //메세지창
    sHeartShop.twdlg = new PIXI.Container();

    sHeartShop.bg = SpriteLoad(sHeartShop, ShopPath.white, iCenterSizeX, iCenterSizeY);//광고선택창
    sHeartShop.bg.scale.set(iMaxSizeX, iMaxSizeY);
    sHeartShop.bg.tint = ColorSet.black;
    sHeartShop.bg.interactive = true;
    sHeartShop.bg.alpha = 0.85;//0.6;

    sHeartShop.purchasedItem="";
    sHeartShop.onTweeing=false;
    sHeartShop.onInitialized=true;

    //--샵배경--
    var cx = iCenterSizeX;
    var cy = iCenterSizeY;

    sHeartShop.tw.position.set(cx, cy);
    sHeartShop.addChild(sHeartShop.tw);        //트윈루트

    sHeartShop.tw.addChild(sHeartShop.twcommon); //공통 컨테이너
    sHeartShop.tw.addChild(sHeartShop.twy);//야후용 컨테이너
    sHeartShop.tw.addChild(sHeartShop.twn);//일반용 컨테이너(그레이프,게스트)
    sHeartShop.tw.addChild(sHeartShop.twcooltime);//쿨타이머
    
    sHeartShop.visible=true;

    //하트타이머(그레이프(게스트포함), 야후 공용)
    sHeartShop.timer.position.set(ShopTimerPos.x, ShopTimerPos.y);

    sHeartShop.addChild(sHeartShop.timer);

    //--폰트스타일3가지--
    //삽메인창 ok글자
    var okstyle = {font:'45px '+ShopFont, stroke: '#7F2D00', strokeThickness: 12, lineJoin:"round", fill:ColorSet.white};
    //구매버튼 글자
    var getstyle = {font:'34px '+ShopFont,  fill:ColorSet.white, stroke:ColorSet.black, strokeThickness:5, lineJoin:"round", align: "center"};
    //메세지 글자
    var msgstyle = {font:'34px '+ShopFont,  fill:ColorSet.white, stroke:'#342d89', strokeThickness:5, lineJoin:"round", align: "center"};
    //--폰트스타일3가지--


    var spHeartTimerBg = SpriteLoad(sHeartShop.timer, ShopPath.timerbg, 0, 0);
    //var txHeartTimer = FontLoad(sHeartShop.timer, "00:00", ShopTimerClockOff.x, ShopTimerClockOff.y, 0.5, 0.5,
    //    {font:'25px '+ShopFont, fill:ColorSet.white, stroke:'#000000', strokeThickness:5, lineJoin:"round", align:"center"});
    var spHeartTimerHeart = SpriteLoad(sHeartShop.timer, ShopPath.heart, ShopTimerHeartOff.x, ShopTimerHeartOff.y);
    var txHeartTimerHeartCnt = FontLoad(spHeartTimerHeart, "50", 0, -5, 0.5, 0.5,
        {font:'25px '+ShopFont, fill:ColorSet.white, stroke:'#340c06', lineJoin:"round", strokeThickness:5});

    //상점용도
    //하트컨트롤러      //상점UI
    //txtHeartTimeCnt = txHeartTimer;      //시계txt //하트컨트롤러연결
    txtHeartCnt = txHeartTimerHeartCnt;  //하트txt //하트컨트롤러연결
    //상점용도

    /*var sprt1 = SpriteLoad(undefined, ShopPath.plusbtn, 0, 0); //debug_Sprite(sprShopNBtn1);,
    // -- 타이머 전체 클릭되게 요청이 와서 넣어둔 코드--
    var sprt2 = SpriteLoad(sprt1,  strGamePath+"img/white.png", 0, 0);
    sprt2.scale.set(240,60);
    sprt2.position.set(ShopTimerClickPos.x,ShopTimerClickPos.y);
    sprt2.alpha=0.0;
    // -- 타이머 전체 클릭되게 요청이 와서 넣어둔 코드--
 
    sHeartShop.timerPlus = setNormaButtonCon(
        sHeartShop.timer,
        new PIXI.Container(),
        ShopTimerPlusPos,
        sprt1,
        undefined, //spr
        undefined, //FontLoad(undefined, "OK", 0, 0, 0.5, 0.5,{font:'34px '+ttfname, fill:ColorSet.white}),
        function(){
           if(sHeartShop.tw.visible){
               sHeartShop.onHide();
           }else{
               sHeartShop.onShow();
           }
        }
    );*/

    //debug_Obj(spHeartTimerHeart);
    //debug_Obj(txHeartTimerHeartCnt);
    //debug_Obj(txHeartTimer);
    //debug_Obj(sHeartShop.timer);
    //debug_Obj(sHeartShop.timerPlus);

    //하트타이머 속성 지정
    sHeartShop.timer.sx = ShopTimerPos.x;//543; //타이머 기본 위치
    sHeartShop.timer.sy = ShopTimerPos.y;// 74; //등장트윈시작이면 기본위치 위에서 내려온다
    sHeartShop.timer.txcount = txHeartTimerHeartCnt;
    //sHeartShop.timer.txtimer = txHeartTimer;
    sHeartShop.timer.onRun = false;
    sHeartShop.timer.onTime=0;
    sHeartShop.timer.onTimeMax=60;


    //공통 컨테이너 내용(그레이프(게스트포함), 야후 공용)
    var sprShopBG = SpriteLoad(sHeartShop.twcommon, ShopPath.shopbg, ShopBg.x, ShopBg.y); //debug_Sprite(sprShopBG);
    //타이틀 배경
    var sprShopTitleBG = SpriteLoad(sHeartShop.twcommon, ShopPath.shoptitlebg, ShopTitleBg.x, ShopTitleBg.y); //debug_Sprite(sprShopTitleBG);

    //타이틀(스프라이트)
    //var sprShopTitle = SpriteLoad(sHeartShop.twcommon, ShopPath.shoptitle, 0, 223-cy);//debug_Sprite(sprShopHTitle);
  //타이틀(폰트)
    var sprShopTitle = FontLoad(sHeartShop.twcommon, GetString("heartshop"), ShopTitleOff.x, ShopTitleOff.y, 0.5, 0.5,
        {font:'50px '+ShopFont, fill:ColorSet.white, stroke:'#342d89', lineJoin:"round", strokeThickness:10}); //debug_Obj(sprShopTitle);

    //회원포인트UI배경
    var sprShopPointBG = SpriteLoad(sHeartShop.twcommon, ShopPath.pointbg, ShopPointBgOff.x, ShopPointBgOff.y);// debug_Sprite(sprShopPointBG);
    sprShopPointBG.interactive = true;
	//모비포인트버튼
    function ShopPointBG() {
        if (loginTF === 0 //비로그인
            && servicePos === 0 //모비서버이면
        ) {
            if(dm) console.log("포인트클릭시:" + GetShpMsg("signup"));

            // networkManager.ModalCall(MODAL_BUTTON_TYPE.OKCANCEL, GetShpMsg('signup'),
            //     function () {
            //         networkManager.JoinMember();
            //     },
            //     function () {
            //     }
            // );

            kMGMenu.SetToastMsg(kMGMenu.GetString("signup"));

        }
    }
    if (InputMode == MOUSE) sprShopPointBG.on('click', ShopPointBG);
    if (InputMode == TOUCH) sprShopPointBG.on('tap',  ShopPointBG);
	
    //야후추가< //야후바로가기만들기
    //var fromShop2Yahoo = SpriteLoad(sHeartShop.twcommon, ShopPath.pointyahoo, 113, -310); //debug_Sprite(fromShop2Yahoo);
    var fromShop2Yahoo = setNormaButtonCon(
        sHeartShop.twcommon,
        new PIXI.Container(),
        {x:113, y:-310},
        SpriteLoad(sHeartShop.twcommon, ShopPath.pointyahoo, 0, 0),
        undefined,
        undefined,
        function () {
            networkManager.ForcedSaveData(false, function () {
                location.href = yahooInappURL;
            });
        },
        0
    ); //debug_Obj(fromShop2Yahoo);
    sHeartShop.fromShop2Yahoo = fromShop2Yahoo;
    sHeartShop.fromShop2Yahoo.visible = !!yahooIN;
    //야후추가> //야후바로가기만들기
	
    var txPoint = FontLoad(sHeartShop.twcommon, "10,000", ShopPointTextOff.x, ShopPointTextOff.y, 0.5, 0.5,
        {font:'30px '+ShopFont, fill:ColorSet.white, stroke:'#342d89', lineJoin:"round", strokeThickness:5});
    sHeartShop.txpoint = txPoint;

    //상점용도
    txtGreapPoint = txPoint; //1,000P 그래이프포인트 //하트컨크롤러 연결
    //상점용도

    //---지울것(접속모드 UI변경 테스트)---------------
    var modechange = setNormaButtonCon(
        sHeartShop.twcommon,
        new PIXI.Container(),
        {x:161, y:-406 },
        SpriteLoad(undefined,  strGamePath+"img2/navi.png", 0, 0),
        undefined, //text
        undefined,
        function(){
            switch(Billing)
            {
                case BillMode.greap:
                    Billing = BillMode.greapguest; //강제게스트모드
                    loginTF=0;
                    yahooIN = false;
                    break;
                case BillMode.greapguest:
                    Billing = BillMode.yahoo; //강제 야후모드
                    loginTF=1;
                    proto.serPos=1;
                    yahooIN = true;
                    break;
                case BillMode.yahoo:
                    Billing = BillMode.greap; //강제 회원모드
                    loginTF=1;
                    proto.serPos=0;
                    yahooIN = false;
                    break;

            }
            //sHeartShop.onHide();
            sHeartShop.onInitMode();
        }

    );//debug_Obj(modechange);
    modechange.spr1.alpha=0;
    //---지울것(접속모드 UI변경 테스트)---------------

    //결제형
    //shopListData[0].mtype === 'logout';//로그인전//회원전용  //.mtype=== 'login' //로그인후//회원전용
    //shopListData[0].pType === 'member';//로그인전//포인트결제//.pType=== 'point';//로그인후//포인트결제
    //광고형
    //shopListData[0].mtype === 'loginout';//회원무관(광고버튼) //변경없음
    //shopListData[0].pType === 'ad_1';    //광고결제          //변경없음

    //로컬모드또는 상점리스트가 없으면
    if(shopListData.length<4) {
        shopListData = [{mkidx:0, mtype:'logout', pType:'member', Quantity:3, Price:33, icon:"img/heart_no_1.png"},
            {mkidx:1, mtype:'logout', pType:'member', Quantity:3, Price:33, icon:"img/heart_no_1.png"},
            {mkidx:2, mtype:'loginout', pType:'ad_1', Quantity:3, Price:33, icon:"img/heart_no_1.png"},
            {mkidx:3, mtype:'loginout', pType:'ad_2', Quantity:3, Price:33, icon:"img/heart_no_1.png"}];
    }


    //공통 OK닫기버튼
    //conparent,//this부모
    //con,      //this
    //conpos,   //this 위치
    //spr1,     //bg용 sprite
    //spr2,     //icon sprite
    //tx,       //text버튼이름
    //fn        //함수
    dbTEXT = FontLoad(sHeartShop.twcommon, "test", -360+100, 640-80, 0.5, 0.5,{font:'24px '+ShopFont, fill:ColorSet.darkgrey});
    var cShopYOK = setNormaButtonCon(
        sHeartShop.twcommon,
        new PIXI.Container(),
        ShopOkBtnOff,//{x:0, y:392},
        SpriteLoad(undefined, ShopPath.yesbtnbg, 0, 0), //debug_Sprite(sprShopNBtn1);,
        undefined,
        FontLoad(undefined, GetString("ok"),
            ShopOkTxOff.x, ShopOkTxOff.y, 0.5, 0.5, okstyle
        ),
        function () {
            sHeartShop.onHide();  //다이얼로그 하이드

            if(gameState !== Game.SELECT) { //셀렉트화면은 계속 나와야하고
                if(sGameUIADBall.visible===false //컨티뉴화면이 있으면 계속 나와 있어야
                && sGameUIClear.visible===false //클리어창이면 하이드되면 안됨
                ) {
                    sHeartShop.timer.onHide();
                }

            }
        }
    );//debug_Obj(cShopYOK);

    var mcoin1 = SpriteLoad(undefined, ShopPath.movicoin, -56, -10);
        mcoin1.scale.set(0.8);
    var mcoin2 = SpriteLoad(undefined, ShopPath.movicoin, -56, -10);
        mcoin2.scale.set(0.8);
    var mcoin3 = SpriteLoad(undefined, ShopPath.movicoin, -56, -10);
        mcoin3.scale.set(0.8);
    var mcoin4 = SpriteLoad(undefined, ShopPath.movicoin, -56, -10);
        mcoin4.scale.set(0.8);

    //야후샵구매버튼(in slot)
    var cShopYBtn1 = setNormaButtonCon(
        undefined,                                         //부모지정 슬롯메뉴가 되므로
        new PIXI.Container(),                              //버튼 컨테이터
        ShopPurchaseBtnOff,//{x:179, y:5},                 //버튼 컨테이너 로컬위치
        SpriteLoad(undefined, ShopPath.highpricebtn, 0, 0), //버튼Sprite //debug_Sprite(sprShopYBtn1);,
        mcoin1,                                          //버튼스프라이트 위의 아이콘
        FontLoad(undefined,
            //sHeartShop.itemList["yahoo"]["0"]["button"],
            shopListData[ 0 ].pType.indexOf('ad_')>-1?"":""+shopListData[ 0 ].Price,//버튼가격표시
            ShopPurchaseTxOff.x, ShopPurchaseTxOff.y, 0.5, 0.5, getstyle),
        heartController.BuyHeart,
        0
    );

    var cShopYBtn2 = setNormaButtonCon(
        undefined,
        new PIXI.Container(),
        ShopPurchaseBtnOff,//{x:179, y:5},
        SpriteLoad(sHeartShop.tw, ShopPath.highpricebtn, 0, 0), //debug_Sprite(sprShopYBtn1);,
        mcoin2,
        FontLoad(undefined,
            //sHeartShop.itemList["yahoo"]["1"]["button"],
            shopListData[ 1 ].pType.indexOf('ad_')>-1?"":""+shopListData[ 1 ].Price,//버튼가격표시
            ShopPurchaseTxOff.x, ShopPurchaseTxOff.y, 0.5, 0.5, getstyle),
        heartController.BuyHeart,
        1
    );
    var cShopYBtn3 = setNormaButtonCon(
        undefined,
        new PIXI.Container(),
        ShopPurchaseBtnOff,//{x:179, y:5},
        SpriteLoad(undefined, ShopPath.highpricebtn, 0, 0), //debug_Sprite(sprShopYBtn1);,
        mcoin3,
        FontLoad(undefined,
            //sHeartShop.itemList["yahoo"]["2"]["button"],
            shopListData[ 2 ].pType.indexOf('ad_')>-1?"":""+shopListData[ 2 ].Price,//버튼가격표시
            ShopPurchaseTxOff.x, ShopPurchaseTxOff.y, 0.5, 0.5, getstyle),
        heartController.BuyHeart,
        2
    );
    var cShopYBtn4 = setNormaButtonCon(
        undefined,
        new PIXI.Container(),
        ShopPurchaseBtnOff,//{x:179, y:5},
        SpriteLoad(undefined, ShopPath.highpricebtn, 0, 0), //debug_Sprite(sprShopYBtn1);,
        mcoin4,
        FontLoad(undefined,
            //sHeartShop.itemList["yahoo"]["3"]["button"],
            shopListData[ 3 ].pType.indexOf('ad_')>-1?"":""+shopListData[ 3 ].Price,//버튼가격표시
            ShopPurchaseTxOff.x, ShopPurchaseTxOff.y, 0.5, 0.5, getstyle),
        heartController.BuyHeart,
        3
    );
    
    //야후샵슬롯메뉴
    //    conparent,//thisparent
    //    con,      //this
    //    conpos,   //thispos
    //    btn1,     //버튼
    //    bg1,      //슬롯UI배경
    //    spr1,     //슬롯UI하트아이콘
    //    spr2,     //슬롯UI배수아이콘 //text
    //    tx1       //임시txext
    var cShopYSlot1 = setSlotImage(
        sHeartShop.twy,
        new PIXI.Container(),
        ShopSlotOff0,//{x:0, y:-191},
        cShopYBtn1,
        SpriteLoad(undefined, ShopPath.highpricebg, ShopSlotBgOff.x, ShopSlotBgOff.y),
        SpriteLoad(undefined,
            //sHeartShop.itemList["yahoo"]["0"]["icon"],
            strGamePath+shopListData[ 0 ].icon, //아이템png텍스쳐
            ShopSlotHeartOff.x, ShopSlotHeartOff.y),
        createBitmapFont( "48px "+ShopBitmapFont,
            //sHeartShop.itemList["yahoo"]["0"]["tx"],
            "x"+shopListData[ 0 ].Quantity, //x획득수량
            ShopSlotX2Off, "center" ),
        undefined
    );//debug_Obj(cShopYSlot1);
    var cShopYSlot2 = setSlotImage(
        sHeartShop.twy,
        new PIXI.Container(),
        {x:ShopSlotOff0.x, y:ShopSlotOff0.y+ShopSlotYOff},
        cShopYBtn2,
        SpriteLoad(undefined, ShopPath.highpricebg, ShopSlotBgOff.x, ShopSlotBgOff.y),
        SpriteLoad(undefined,
            //sHeartShop.itemList["yahoo"]["1"]["icon"],
            strGamePath+shopListData[ 1 ].icon, //아이템png텍스쳐
            ShopSlotHeartOff.x, ShopSlotHeartOff.y),
        createBitmapFont( "48px "+ShopBitmapFont,
            //sHeartShop.itemList["yahoo"]["1"]["tx"],
            "x"+shopListData[ 1 ].Quantity, //x획득수량
            ShopSlotX2Off, "center" ),
        undefined
    );//debug_Obj(cShopYSlot2);
    var cShopYSlot3 = setSlotImage(
        sHeartShop.twy,
        new PIXI.Container(),
        {x:ShopSlotOff0.x, y:ShopSlotOff0.y+(ShopSlotYOff*2)},
        cShopYBtn3,
        SpriteLoad(undefined, ShopPath.highpricebg, ShopSlotBgOff.x, ShopSlotBgOff.y),
        SpriteLoad(undefined,
            //sHeartShop.itemList["yahoo"]["2"]["icon"],
            strGamePath+shopListData[ 2 ].icon, //아이템png텍스쳐
            ShopSlotHeartOff.x, ShopSlotHeartOff.y),
        createBitmapFont( "48px "+ShopBitmapFont,
            //sHeartShop.itemList["yahoo"]["2"]["tx"],
            "x"+shopListData[ 2 ].Quantity, //x획득수량
            ShopSlotX2Off, "center" ),
        undefined
    );//debug_Obj(cShopYSlot3);
    var cShopYSlot4 = setSlotImage( 
        sHeartShop.twy,
        new PIXI.Container(),
        {x:ShopSlotOff0.x, y:ShopSlotOff0.y+(ShopSlotYOff*3)},
        cShopYBtn4,
        SpriteLoad(undefined, ShopPath.highpricebg, ShopSlotBgOff.x, ShopSlotBgOff.y),
        SpriteLoad(undefined,
            //sHeartShop.itemList["yahoo"]["3"]["icon"],
            strGamePath+shopListData[ 3 ].icon, //아이템png텍스쳐
            ShopSlotHeartOff.x, ShopSlotHeartOff.y),
        createBitmapFont( "48px "+ShopBitmapFont,
            //sHeartShop.itemList["yahoo"]["3"]["tx"],
            "x"+shopListData[ 3 ].Quantity, //x획득수량
            ShopSlotX2Off, "center"),
        undefined
    ); //debug_Obj(cShopYSlot4);
    //야후 하트샵끝-------------------------------------------------

    //그레이프회원(게스트포함) 샵버튼(in slot)----------------------
    //스케일링버튼
    //conparent,//this부모
    //con,      //this
    //conpos,   //this 위치
    //spr1,     //bg용 sprite
    //spr2,     //icon sprite
    //tx,       //text버튼이름
    //fn        //함수 
    var mcoin1b = SpriteLoad(undefined, ShopPath.movicoin, -56, -10);
    mcoin1b.scale.set(0.8);
    var mcoin2b = SpriteLoad(undefined, ShopPath.movicoin, -56, -10);
    mcoin2b.scale.set(0.8);
    var cShopNBtn1 = setNormaButtonCon( //포인트버튼
        sHeartShop.twn,
        new PIXI.Container(),
        ShopPurchaseBtnOff,
        SpriteLoad(undefined, ShopPath.lowpricebtn, 0, 0),
        mcoin1b,
        FontLoad(undefined,
            //sHeartShop.itemList["greap"]["0"]["button"],
            shopListData[ 0 ].pType.indexOf('ad_')>-1?"":""+shopListData[ 0 ].Price, //버튼가격표시
            ShopPurchaseTxOff.x, ShopPurchaseTxOff.y, 0.5, 0.5, getstyle),
        heartController.BuyHeart,
        0
    );
    var cShopNBtn2 = setNormaButtonCon( //포인트버튼
        sHeartShop.twn,
        new PIXI.Container(),
        ShopPurchaseBtnOff,//{x:179, y:5},
        SpriteLoad(undefined, ShopPath.lowpricebtn, 0, 0),
        mcoin2b,
        FontLoad(undefined,
            //sHeartShop.itemList["greap"]["1"]["button"],
            shopListData[ 1 ].pType.indexOf('ad_')>-1?"":""+shopListData[ 1 ].Price, //버튼가격표시
            ShopPurchaseTxOff.x, ShopPurchaseTxOff.y, 0.5, 0.5, getstyle),
        heartController.BuyHeart,
        1
    );

    //--3번째슬롯, 4번째슬롯 광고인지 모비포인트인지 구분------------ ~ ~ ~ ~
    var img_c=undefined; //광고아이콘
    var tx_c=undefined;
    var bt_c=undefined;
    var slotbg_c=undefined;
    if(shopListData[2].pType.indexOf('ad_')>-1){//4번째버튼분기
        //광고라면 광고 아이이콘설정
        img_c= SpriteLoad(undefined, ShopPath.adicon, ShopPurchaseBmOff.x, ShopPurchaseBmOff.y);
        tx_c=undefined;
        bt_c=SpriteLoad(undefined, ShopPath.highpricebtn, 0, 0);
        slotbg_c=SpriteLoad(undefined, ShopPath.highpricebg, ShopSlotBgOff.x, ShopSlotBgOff.y);
    }else{
        //일반가격표시
        img_c=SpriteLoad(undefined, ShopPath.movicoin, -56, -10);//광고면 아이콘, 아니면 모비아이콘
        img_c.scale.set(0.8);
        tx_c=FontLoad(undefined,
            //sHeartShop.itemList["greap"]["2"]["button"],
            ""+shopListData[ 2 ].Price, //버튼가격표시
            ShopPurchaseTxOff.x, ShopPurchaseTxOff.y, 0.5, 0.5, getstyle),

        bt_c=SpriteLoad(undefined, ShopPath.lowpricebtn, 0, 0);
        slotbg_c=SpriteLoad(undefined, ShopPath.lowpricebg, ShopSlotBgOff.x, ShopSlotBgOff.y);
    }

    var img_d=undefined; //광고아이콘
    var tx_d=undefined;
    var bt_d=undefined;
    var slotbg_d=undefined;
    if(shopListData[3].pType.indexOf('ad_')>-1){//4번째버튼분기
        //광고라면 광고아이콘설정
        img_d=SpriteLoad(undefined, ShopPath.admovie, ShopPurchaseBmOff.x, ShopPurchaseBmOff.y);
        tx_d=undefined;
        bt_d=SpriteLoad(undefined, ShopPath.highpricebtn, 0, 0);
        slotbg_d=SpriteLoad(undefined, ShopPath.highpricebg, ShopSlotBgOff.x, ShopSlotBgOff.y);
    }else{
        //일반가격표시
        img_d=SpriteLoad(undefined, ShopPath.movicoin, -56, -10);
        img_d.scale.set(0.8);
        tx_d=FontLoad(undefined,
            //sHeartShop.itemList["greap"]["3"]["button"],
            ""+shopListData[ 3 ].Price, //버튼가격표시
            ShopPurchaseTxOff.x, ShopPurchaseTxOff.y, 0.5, 0.5, getstyle),

        bt_d=SpriteLoad(undefined, ShopPath.lowpricebtn, 0, 0);
        slotbg_d=SpriteLoad(undefined, ShopPath.lowpricebg, ShopSlotBgOff.x, ShopSlotBgOff.y);
    }
    //--3번째슬롯, 4번째슬롯 광고인지 모비포인트인지 구분------------

    var cShopNBtn3 = setNormaButtonCon( //그림버튼
        sHeartShop.twn,
        new PIXI.Container(),
        ShopPurchaseBtnOff,//{x:179, y:5},
        //SpriteLoad(undefined, ShopPath.highpricebtn, 0, 0),
        bt_c,
        //SpriteLoad(undefined, ShopPath.adicon, ShopPurchaseBmOff.x, ShopPurchaseBmOff.y),
        img_c,
        //undefined,
        tx_c,
        heartController.BuyHeart,
        2
    );
    var cShopNBtn4 = setNormaButtonCon(//그림버튼
        sHeartShop.twn,
        new PIXI.Container(),
        ShopPurchaseBtnOff,//{x:179, y:5},
        //SpriteLoad(undefined, ShopPath.highpricebtn, 0, 0),
        bt_d,
        //SpriteLoad(undefined, ShopPath.admovie, ShopPurchaseBmOff.x, ShopPurchaseBmOff.y),
        img_d,
        //undefined,
        tx_d,
        heartController.BuyHeart,
        3
    );

    var mcoin1c = SpriteLoad(undefined, ShopPath.movicoin, -56, -10);
    mcoin1c.scale.set(0.8);
    var mcoin2c = SpriteLoad(undefined, ShopPath.movicoin, -56, -10);
    mcoin2c.scale.set(0.8);

    var cShopNBtn1Guest = setNormaButtonCon( //게스트버튼0
        sHeartShop.twn,
        new PIXI.Container(),
        ShopPurchaseBtnOff,//{x:179, y:5},
        SpriteLoad(undefined, ShopPath.lowpricebtn, 0, 0),
        mcoin1c,
        FontLoad(undefined,
            //sHeartShop.itemList["greapguest"]["0"]["button"],
            shopListData[ 0 ].pType.indexOf('ad_')>-1?"":""+shopListData[ 0 ].Price, //버튼가격표시
            ShopPurchaseTxOff.x, ShopPurchaseTxOff.y, 0.5, 0.5, getstyle),
        function(){
            if(sHeartShop.delaybtn===false) {
                sHeartShop.delaybtn=true;
                TweenMax.delayedCall(1,function(){sHeartShop.delaybtn=false;});
            }else {
                return;
            }

            if(loginTF === 1){ //로그인 후 (in BuyHeart)
                if(proto.serPos === 0){ //모비서비스
                }else if(proto.serPos === 1){ // 야후
                }
            }else{ //로그인 전상황
                if (networkManager.networkState === NET_STATE.LOCALHOST) {//로컬서비스
                    sHeartShop.fin.onShow(this.heartIndex);//페이크로컬게스트
                    sHeartShop.timer.onSetCount(kData.iHeart+3);
                }else { //게스트 모드
                    if(dm) console.log("게스트버튼0클릭:"+GetShpMsg("signup"));

                    // networkManager.ModalCall(MODAL_BUTTON_TYPE.OKCANCEL,GetShpMsg("signup"),
                    //     function () {
                    //         networkManager.JoinMember();
                    //     },
                    //     function () {
                    //     }
                    // );

                    kMGMenu.SetToastMsg(kMGMenu.GetString("signup"));//토스트-게스트버튼 로그인유도
                }
            }//loginTF 비로그인
        },
        0
    );    
    var cShopNBtn2Guest = setNormaButtonCon( //게스트버튼1
        sHeartShop.twn,
        new PIXI.Container(),
        ShopPurchaseBtnOff,//{x:179, y:5},
        SpriteLoad(undefined, ShopPath.lowpricebtn, 0, 0), //debug_Sprite(sprShopNBtn1);,
        mcoin2c,
        FontLoad(undefined,
            //sHeartShop.itemList["greapguest"]["1"]["button"],//GetString("signup"),//
            shopListData[ 1 ].pType.indexOf('ad_')>-1?"":""+shopListData[ 1 ].Price, //버튼가격표시
            ShopPurchaseTxOff.x, ShopPurchaseTxOff.y, 0.5, 0.5,
            getstyle
        ), //debug_Sprite(fntShopH_Y1);,
        function(){
            if(sHeartShop.delaybtn===false) {
                sHeartShop.delaybtn=true;
                TweenMax.delayedCall(1,function(){sHeartShop.delaybtn=false;});
            }else {
                return;
            }
            if(loginTF === 1){ //로그인 후 (in BuyHeart)
                if(proto.serPos === 0){ //모비서비스
                }else if(proto.serPos === 1){ // 야후
                }
            }else{ //로그인 전상황
                if (networkManager.networkState === NET_STATE.LOCALHOST) {//로컬서비스
                    sHeartShop.fin.onShow(this.heartIndex);//페이크로컬게스트
                    sHeartShop.timer.onSetCount(kData.iHeart+5);
                }else { //게스트 모드

                    if (dm) console.log("게스트버튼0클릭:" + GetShpMsg("signup"));
                    // networkManager.ModalCall(MODAL_BUTTON_TYPE.OKCANCEL, GetShpMsg("signup"),
                    //     function () {
                    //         networkManager.JoinMember();
                    //     },
                    //     function () {
                    //     }
                    // );

                    kMGMenu.SetToastMsg(kMGMenu.GetString("signup"));//토스트-게스트버튼 로그인유도
                }
            }//loginTF비로그인
        },
        1
    );
    //포인트부족시 disable
    sHeartShop.pointbtns=[];
    sHeartShop.pointbtns.push(cShopNBtn1);
    sHeartShop.pointbtns.push(cShopNBtn2);


    //그레이프샵슬롯(게스트포함)
    //    conparent,//thisparent
    //    con,      //this
    //    conpos,   //thispos
    //    btn1,     //버튼
    //    bg1,      //슬롯UI배경
    //    spr1,     //슬롯UI하트아이콘
    //    spr2,     //슬롯UI배수아이콘 //text
    //    tx1       //임시txext
    var cShopNSlot1 = setSlotImage(
        sHeartShop.twn,
        new PIXI.Container(),
        {x:ShopSlotOff0.x, y:ShopSlotOff0.y},//{x:0, y:-191},
        cShopNBtn1,
        SpriteLoad(undefined, ShopPath.lowpricebg, ShopSlotBgOff.x, ShopSlotBgOff.y),
        SpriteLoad(undefined,
            //sHeartShop.itemList["greap"]["0"]["icon"],
            strGamePath+shopListData[ 0 ].icon, //아이템png텍스쳐
            ShopSlotHeartOff.x, ShopSlotHeartOff.y),
        createBitmapFont( "48px "+ShopBitmapFont,
            //sHeartShop.itemList["greap"]["0"]["tx"],
            "x"+shopListData[ 0 ].Quantity, //x획득수량
            ShopSlotX2Off, "center" ),
        undefined
    );//debug_Obj(cShopYSlot1);
    var cShopNSlot2 = setSlotImage(
        sHeartShop.twn,
        new PIXI.Container(),
        {x:ShopSlotOff0.x, y:ShopSlotOff0.y+ShopSlotYOff},//{x:0, y:-44},
        cShopNBtn2,
        SpriteLoad(undefined, ShopPath.lowpricebg, ShopSlotBgOff.x, ShopSlotBgOff.y),
        SpriteLoad(undefined,
            //sHeartShop.itemList["greap"]["1"]["icon"],
            strGamePath+shopListData[ 1 ].icon, //아이템png텍스쳐
            ShopSlotHeartOff.x, ShopSlotHeartOff.y),
        createBitmapFont( "48px "+ShopBitmapFont,
            //sHeartShop.itemList["greap"]["1"]["tx"],
            "x"+shopListData[ 1 ].Quantity, //x획득수량
            ShopSlotX2Off,"center" ),
        undefined
    );//debug_Obj(cShopYSlot2);
    var cShopNSlot3 = setSlotImage(
        sHeartShop.twn,
        new PIXI.Container(),
        {x:ShopSlotOff0.x, y:ShopSlotOff0.y+(ShopSlotYOff*2)},//{x:0, y:105},
        cShopNBtn3,
        //SpriteLoad(undefined, ShopPath.highpricebg, ShopSlotBgOff.x, ShopSlotBgOff.y),
        slotbg_c,
        SpriteLoad(undefined,
            //sHeartShop.itemList["greap"]["2"]["icon"],
            strGamePath+shopListData[ 2 ].icon, //아이템png텍스쳐
            ShopSlotHeartOff.x, ShopSlotHeartOff.y),
        createBitmapFont( "48px "+ShopBitmapFont,
            //sHeartShop.itemList["greap"]["2"]["tx"],
            "x"+shopListData[ 2 ].Quantity, //x획득수량
            ShopSlotX2Off, "center" ),
        undefined
    );//debug_Obj(cShopYSlot3);
    var cShopNSlot4 = setSlotImage(
        sHeartShop.twn,
        new PIXI.Container(),
        {x:ShopSlotOff0.x, y:ShopSlotOff0.y+(ShopSlotYOff*3)},//{x:0, y:252},
        cShopNBtn4,
        //SpriteLoad(undefined, ShopPath.highpricebg, ShopSlotBgOff.x, ShopSlotBgOff.y),
        slotbg_d,
        SpriteLoad(undefined,
            //sHeartShop.itemList["greap"]["3"]["icon"],
            strGamePath+shopListData[ 3 ].icon, //아이템png텍스쳐
            ShopSlotHeartOff.x, ShopSlotHeartOff.y),
        createBitmapFont( "48px "+ShopBitmapFont,
            //sHeartShop.itemList["greap"]["3"]["tx"],
            "x"+shopListData[ 3 ].Quantity, //x획득수량
            ShopSlotX2Off, "center" ),
        undefined
    ); //debug_Obj(cShopYSlot4);

    //그레이프샵 게스트슬롯 2개
    var cShopNSlot1Guest = setSlotImage( //게스트슬롯
        sHeartShop.twn,
        new PIXI.Container(),
        {x:ShopSlotOff0.x, y:ShopSlotOff0.y},//{x:0, y:-191},
        cShopNBtn1Guest,             //회원가입버튼
        SpriteLoad(undefined, ShopPath.lowpricebg, ShopSlotBgOff.x, ShopSlotBgOff.y),
        SpriteLoad(undefined,
            //sHeartShop.itemList["greapguest"]["0"]["icon"],
            strGamePath+shopListData[ 0 ].icon, //아이템png텍스쳐
            ShopSlotHeartOff.x, ShopSlotHeartOff.y),
        createBitmapFont( "48px "+ShopBitmapFont,
            //sHeartShop.itemList["greapguest"]["0"]["tx"],
            "x"+shopListData[ 0 ].Quantity, //x획득수량
            ShopSlotX2Off, "center" ),
        FontLoad(undefined,
            "",//(nationServerNet==="japan_server"?"":GetString("membersonly")),
            ShopSlotGreapOff.x, ShopSlotGreapOff.y, 0.5, 0.5,{font:'24px '+ShopFont,  lineJoin:"round", fill:ColorSet.white, stroke:'#000000', strokeThickness:5})
    );//debug_Obj(cShopYSlot1);    
    var cShopNSlot2Guest = setSlotImage( //게스트슬롯
        sHeartShop.twn,
        new PIXI.Container(),
        {x:ShopSlotOff0.x, y:ShopSlotOff0.y+(ShopSlotYOff*1)},//{x:0, y:252},
        cShopNBtn2Guest,
        SpriteLoad(undefined, ShopPath.lowpricebg, ShopSlotBgOff.x, ShopSlotBgOff.y),
        SpriteLoad(undefined,
            //sHeartShop.itemList["greapguest"]["1"]["icon"],
            strGamePath+shopListData[ 1 ].icon, //아이템png텍스쳐
            ShopSlotHeartOff.x, ShopSlotHeartOff.y),
        createBitmapFont( "48px "+ShopBitmapFont,
            //sHeartShop.itemList["greapguest"]["1"]["tx"],
            "x"+shopListData[ 1 ].Quantity, //x획득수량
            ShopSlotX2Off, "center" ),
        FontLoad(undefined,
            "",//(nationServerNet==="japan_server"?"":GetString("membersonly")),
            ShopSlotGreapOff.x, ShopSlotGreapOff.y, 0.5, 0.5,{font:'24px '+ShopFont,  lineJoin:"round", fill:ColorSet.white, stroke:'#000000', strokeThickness:5})
    ); //debug_Obj(cShopYSlot4);

    sHeartShop.twn.slot1Guest=cShopNSlot1Guest;
    sHeartShop.twn.slot1Normal=cShopNSlot1;
    sHeartShop.twn.slot2Guest=cShopNSlot2Guest;
    sHeartShop.twn.slot2Normal=cShopNSlot2;

    //상점용도
    txtOnlyAccount = sHeartShop.twn.slot1Guest.tx1;//게스틑슬롯 회원전용
    txtOnlyAccount2 = sHeartShop.twn.slot2Guest.tx1;
    //상점용도

    //쿨타이머4종버튼 생성
    var cShopCoolTime1 = setBtnCoolTime(
        sHeartShop.twcooltime,
        new PIXI.Container(),
        {x:179, y:-191},
        SpriteLoad(undefined, ShopPath.cooltimebtn, 0, 0),  //debug_Sprite(sprShopHSlot1);
        FontLoad(undefined, "00:00", 0, -8, 0.5, 0.5,{font:'35px '+ShopFont,  fill:ColorSet.white, lineJoin:"round", stroke:'#000000', strokeThickness:5}),
        [ cShopNBtn1, cShopNBtn1Guest, cShopYBtn1] //arr:[0]일반슬롯상 버튼, [1]게스트슬롯상 버튼, [2]야후슬롯상버튼
    );//debug_Obj(cShopCoolTime1);
    sHeartShop.twcooltime.btn.push(cShopCoolTime1);
    //각버튼마다 1개씩 타이머버튼(안사용해도)
    remainText[0] = cShopCoolTime1.txt;
    remainBtn[0] = cShopCoolTime1;

    var cShopCoolTime2 = setBtnCoolTime(
        sHeartShop.twcooltime,
        new PIXI.Container(),
        {x:179, y:-44},
        SpriteLoad(undefined, ShopPath.cooltimebtn, 0, 0),  //debug_Sprite(sprShopHSlot1);
        FontLoad(undefined, "00:00", 0, -8, 0.5, 0.5,{font:'35px '+ShopFont,  fill:ColorSet.white, lineJoin:"round", stroke:'#000000', strokeThickness:5}),
        [ cShopNBtn2, cShopNBtn2Guest, cShopYBtn2] //arr:[0]일반슬롯상 버튼, [1]게스트슬롯상 버튼, [2]야후슬롯상버튼
    );//debug_Obj(cShopCoolTime2);
    sHeartShop.twcooltime.btn.push(cShopCoolTime2);
    //각버튼마다 1개씩 타이머버튼(안사용해도)
    remainText[1] = cShopCoolTime2.txt;
    remainBtn[1] = cShopCoolTime2;

    var cShopCoolTime3 = setBtnCoolTime(
        sHeartShop.twcooltime,
        new PIXI.Container(),
        {x:179, y:105}, //179, -191
        SpriteLoad(undefined, ShopPath.cooltimebtn, 0, 0),  //debug_Sprite(sprShopHSlot1);
        FontLoad(undefined, "00:00", 0, -8, 0.5, 0.5,{font:'35px '+ShopFont,  fill:ColorSet.white, lineJoin:"round", stroke:'#000000', strokeThickness:5}),
        [ cShopNBtn3, cShopNBtn3, cShopYBtn3]  //arr:[0]일반슬롯상 버튼, [1]게스트슬롯상 버튼, [2]야후슬롯상버튼
    );//debug_Obj(cShopCoolTime3);
    sHeartShop.twcooltime.btn.push(cShopCoolTime3);
    //각버튼마다 1개씩 타이머버튼(안사용해도)
    remainText[2] = cShopCoolTime3.txt;
    remainBtn[2] = cShopCoolTime3;

    var cShopCoolTime4 = setBtnCoolTime(
        sHeartShop.twcooltime,
        new PIXI.Container(),
        {x:179, y:252}, //179, -191
        SpriteLoad(undefined, ShopPath.cooltimebtn, 0, 0),  //debug_Sprite(sprShopHSlot1);
        FontLoad(undefined, "00:00", 0, -8, 0.5, 0.5,{font:'35px '+ShopFont,  fill:ColorSet.white, lineJoin:"round", stroke:'#000000', strokeThickness:5}),
        [ cShopNBtn4, cShopNBtn4, cShopYBtn4] //arr:[0]일반슬롯상 버튼, [1]게스트슬롯상 버튼, [2]야후슬롯상버튼
    );//debug_Obj(cShopCoolTime4);
    sHeartShop.twcooltime.btn.push(cShopCoolTime4);
    //각버튼마다 1개씩 타이머버튼(안사용해도)
    remainText[3] = cShopCoolTime4.txt;
    remainBtn[3] = cShopCoolTime4;

    //--하트구매완료창 시작--------------------
    sHeartShop.addChild(sHeartShop.fin);
    var sprFinBgBk = SpriteLoad(sHeartShop.fin, ShopPath.white, iCenterSizeX, iCenterSizeY);//광고선택창
    sprFinBgBk.scale.set(iMaxSizeX, iMaxSizeY);
    sprFinBgBk.tint = ColorSet.black;
    sprFinBgBk.interactive = true;
    sprFinBgBk.alpha = 0.85;//0.6;
    sHeartShop.fin.bg=sprFinBgBk;

    sHeartShop.twfin.position.set(cx, cy);
    sHeartShop.fin.addChild(sHeartShop.twfin);//구매결과창 트윈 컨테이터 연결

    //하트 구매결과구성(트윈되는)
    var sprShopFinBG = SpriteLoad(sHeartShop.twfin, ShopPath.resultdlg, ShopFinBgPos.x, ShopFinBgPos.y);
    sHeartShop.twfin.icon = SpriteLoad(sHeartShop.twfin,
        //sHeartShop.itemList["greap"]["0"]["icon"],
        strGamePath+shopListData[ 0 ].icon, //아이템png텍스쳐
        ShopFinTxIconOff.x, ShopFinTxIconOff.y );
    sHeartShop.twfin.tx = new PIXI.extras.BitmapText("x5", { font: '50px '+ShopBitmapFont, align: 'center'});
    sHeartShop.twfin.tx.position.set(ShopFinX2Off.x, ShopFinX2Off.y );
    sHeartShop.twfin.addChild(sHeartShop.twfin.tx);   //debug_Obj(sHeartShop.twfin.tx);
    sHeartShop.twfin.msg = FontLoad(sHeartShop.twfin, "예)하트 00개\n추가했습니다.", ShopFinMsgOff.x, ShopFinMsgOff.y, 0.5, 0.5, msgstyle);

    sHeartShop.fin.ok = setNormaButtonCon(
        sHeartShop.twfin,
        new PIXI.Container(),
        ShopFinOkOff,
        SpriteLoad(undefined, ShopPath.yesbtnbg, 0, 0), //debug_Sprite(sprShopNBtn1);,
        undefined,
        FontLoad(undefined, GetString("ok"), ShopFinOkTxOff.x, ShopFinOkTxOff.y, 0.5, 0.5, okstyle),
        function(){
            if(dm) console.log("~ ~ purchase ok");
            sHeartShop.fin.onHide();
        }
    );//debug_Obj(cShopFinOK);
    //sHeartShop.fin.ok = cShopFinOK;

//    //--하트메세지창시작-----------------------
    sHeartShop.addChild(sHeartShop.dlg);
    var sprMessageBgBk= SpriteLoad(sHeartShop.dlg, ShopPath.white, iCenterSizeX, iCenterSizeY);//광고선택창
    sprMessageBgBk.scale.set(iMaxSizeX, iMaxSizeY);
    sprMessageBgBk.tint = ColorSet.black;
    sprMessageBgBk.interactive = true;
    sprMessageBgBk.alpha = 0.85;//0.6;
    sHeartShop.dlg.bg = sprMessageBgBk;
    sHeartShop.dlg.fnOk = function(){};
    sHeartShop.dlg.fnNo = function(){};
    sHeartShop.dlg.fnOkSingle = function(){};

    sHeartShop.twdlg.position.set(cx, cy);
    sHeartShop.dlg.addChild(sHeartShop.twdlg);//구매결과창 트윈 컨테이터 연결

    var sprShopMsgBG = SpriteLoad(sHeartShop.twdlg, ShopPath.msgdlg, ShopMsgBgPos.x, ShopMsgBgPos.y);//debug_Obj(sprShopFinBG);
    var strinit = "예):회원가입\n하시겠습니까?";
    sHeartShop.twdlg.tx = FontLoad(
        sHeartShop.twdlg, strinit, ShopMsgTxOff.x, ShopMsgTxOff.y, 0.5, 0.5,
        {font:'38px '+ShopFont, fill:ColorSet.sky, stroke:'#000000', lineJoin:"round", strokeThickness:5, align:"center"}
    );
    //debug_Obj(sHeartShop.twdlg.tx);

    var cShopDlgOK = setNormaButtonCon( //메세지창ok
        sHeartShop.twdlg,
        new PIXI.Container(),
        ShopMsgOkBtnOff,
        SpriteLoad(undefined, ShopPath.yesbtnbg, 0, 0), //debug_Sprite(sprShopNBtn1);,
        undefined,
        FontLoad(undefined, GetString("ok"),
            ShopMsgOkTxOff.x, ShopMsgOkTxOff.y, 0.5, 0.5,
            okstyle
        ),
        function(){
            if(sHeartShop.delaybtn===false) {
                sHeartShop.delaybtn=true;
                TweenMax.delayedCall(1,function(){sHeartShop.delaybtn=false;});
            }else {
                return;
            }
            if(dm) console.log("~ ~ dlg ok");
            sHeartShop.dlg.fnOk();
            sHeartShop.dlg.onHide();
        }
    );//debug_Obj(cShopDlgOK);
    var cShopDlgCancel = setNormaButtonCon( ////메세지창cancel
        sHeartShop.twdlg,
        new PIXI.Container(),
        ShopMsgCancelBtnOff,
        SpriteLoad(undefined, ShopPath.nobtnbg, 0, 0), //debug_Sprite(sprShopNBtn1);,
        undefined,
        FontLoad(undefined, GetString("no"), ShopMsgCancelTxOff.x, ShopMsgCancelTxOff.y, 0.5, 0.5, okstyle ),
        function(){
            if(sHeartShop.delaybtn===false) {
                sHeartShop.delaybtn=true;
                TweenMax.delayedCall(1,function(){sHeartShop.delaybtn=false;});
            }else {
                return;
            }
            if(dm) console.log("~ ~ dlg cancel");
            sHeartShop.dlg.fnNo();
            sHeartShop.dlg.onHide();
        }
    );//debug_Obj(cShopDlgCancel);
    var cShopDlgOKSingle = setNormaButtonCon( //메세지창ok 싱글
        sHeartShop.twdlg,
        new PIXI.Container(),
        {x:0, y:126},
        SpriteLoad(undefined, ShopPath.yesbtnbg, 0, 0), //debug_Sprite(sprShopNBtn1);,
        undefined,
        FontLoad(undefined, GetString("ok"), 0, 0, 0.5, 0.5,{font:'34px '+ShopFont, fill:ColorSet.white}),
        function(){
            if(sHeartShop.delaybtn===false) {
                sHeartShop.delaybtn=true;
                TweenMax.delayedCall(1,function(){sHeartShop.delaybtn=false;});
            }else {
                return;
            }
            if(dm) console.log("~ ~ dlg ok");
            sHeartShop.dlg.fnOkSingle();
            sHeartShop.dlg.onHide();
        }
    );//Debug_Obj(cShopDlgOK);
    sHeartShop.dlg.btnok = cShopDlgOK; //버튼오브젝트 등록
    sHeartShop.dlg.btncancel = cShopDlgCancel;//버튼오브젝트 등록
    sHeartShop.dlg.btnoksingle = cShopDlgOKSingle;//버튼오브젝트 등록

}

function createMethod_HeartShop(){ //함수만 생성 하는 부분
    //하트아이템슬롯창나오기
   sHeartShop.onShow = function(){
       return;

       //undefined상태이면 타이머초기화
       //저장된 서버데이터를 보고 타이머 나오게 할지 말지 결정 //지엠타이머
       for(var i=0; i<4; i++){
           if(kData.btnTimeStamp[i] === undefined || kData.btnTimeStamp[i] === null) {
               kData.btnTimeStamp[i] = null;
           }else{
               sHeartShop.twcooltime.onInitCoolTimer(i);
           }
       }

        if(false) {
           //불러오기AD쿨타임
           var btns = sHeartShop.twcooltime.btn;
           var len = btns.length;
           for (var i = 0; i < len; i++) {
               var btn1 = btns[i];
               //if (btn1.timeronoff) {
               if (!clientData.btncooltime) clientData.btncooltime = [0, 0, 0, 0];
               var cooltime1 = clientData.btncooltime[i];
               if (cooltime1 > 0) {
                   //타이머작동
                   sHeartShop.twcooltime.onInitCoolTimer(i);
                   sHeartShop.twcooltime.onSetCoolTimer(i, cooltime1);
                   //타이머작동
               }
               //}
           }
           //불러오기AD쿨타임
        }

        sHeartShop.bg.visible = true;
        sHeartShop.tw.visible = true;
        onFadein(sHeartShop.bg, 0.9);
        onFadeinScale(sHeartShop.tw, function(){});

        //상점용도
        heartController.ShowHeartShop();
       //상점용도
    };
    //하트샵창딛기
    sHeartShop.onHide = function(){
        onFadeout(sHeartShop.bg, 0.9);//0.6);
        onFadeoutScale(sHeartShop.tw,
                       function(){
                            sHeartShop.tw.visible = false;
                            sHeartShop.bg.visible = false;
                        }
                    );
        //상점용도
        heartController.ShowHeartShop(false);
        //상점용도
    };

    //하트샵 타이머창 열기
    sHeartShop.timer.onShow = function(){
        sHeartShop.timer.onSetCount(kData.iHeart);//timer.onshow
        sHeartShop.timer.onRun = true;
        sHeartShop.timer.visible=true;

        onMoveLinear(
            sHeartShop.timer,
            {x:sHeartShop.timer.sx, y:sHeartShop.timer.sy-85},
            {x:sHeartShop.timer.sx, y:sHeartShop.timer.sy},
            function(){}
        )
    };

    sHeartShop.onSetPoint = function(begin, end){
        sHeartShop.txpoint.text = begin;
        getMoneyFormatFromNum();
        TweenMax.fromTo(sHeartShop.txpoint,
            0.5,
            {
                score:begin
            },
            {
                score:end,
                ease:Linear.easeNone,
                onUpdate: function(){
                    sHeartShop.txpoint.text =  getMoneyFormatFromNum(Math.floor(sHeartShop.txpoint.score));
                },
                onComplete: function(){
                    sHeartShop.txpoint.text =  getMoneyFormatFromNum(end);
                },
                delay: 0
            }
        );

    };
    sHeartShop.onSetPointFast = function(end){
        sHeartShop.txpoint.text =  getMoneyFormatFromNum(end);
    };

    //하트샵 타이머창 닫기
    sHeartShop.timer.onHide = function(){
        onMoveLinear(
            sHeartShop.timer,
            {x:sHeartShop.timer.sx, y:sHeartShop.timer.sy},
            {x:sHeartShop.timer.sx, y:sHeartShop.timer.sy-85},
            function(){
                sHeartShop.timer.visible=false;
            }
        )
    };
    //하트샵 타이머창 카운트 변경
    sHeartShop.timer.onSetCount = function(cnt){
        if(dm) console.log("~ ~ sHeartShop.timer.onSetCount:"+cnt);
        if(cnt<0) {
            kData.iHeart = 0;
            sHeartShop.timer.txcount.text = 0;
        }else{
            kData.iHeart=cnt;
            sHeartShop.timer.txcount.text=cnt;
        }

        // else if(cnt<99){
        //     kData.userHeartCount=cnt;
        //     sHeartShop.timer.txcount.text=cnt;
        // }else{
        //     kData.userHeartCount=99;
        //     sHeartShop.timer.txcount.text="99";
        // }
        //if(kData.iHeart>=5) sHeartShop.timer.txtimer.text="MAX";
    };
    sHeartShop.timer.onSetTimer = function(str){
        return;
        //console.log("~ ~ sHeartShop.timer.onSetTimer:"+cnt);
        sHeartShop.timer.txtimer.text=str;
    };
    //-------------쿨타이머 4종 시작
    sHeartShop.twcooltime.onInitCoolTimer = function(idx) {  //쿨타이머4종 타임초기화
        var btn1 = sHeartShop.twcooltime.btn[idx]; //쿨타임버튼('00:00') 활성화
        remainText[idx].text=convertTimeFormatFromSec(fHeartChargeTime);//우선은 최대치로 보여주고
        btn1.visible = true;
        btn1.arr[Billing].visible = false;         //현재사용버튼 비활성
        return;

        var btn1 = sHeartShop.twcooltime.btn[idx];
        btn1.timer = fHeartChargeTime;//fLifeAddTime;//btn1.timermax;
        btn1.txt.text= secondsToTime(fHeartChargeTime);//(fLifeAddTime);//secondsToTime(btn1.timermax);
        btn1.timeronoff=true;
        btn1.visible = true;
	btn1.arr[Billing].visible = false; //모드별 버튼배열이다. 원래는 [1]에 게스트모드시 버튼이 들어가야한다.없어서 회원버튼으로
        //arr를 버튼3개를 저장하고 있는 배열
        //arr[0]=회원btn, arr[1]=게스트btn, arr[2]=야후btn
        //0번과 3번은 게스트버튼이 있지만
        //1번과 2번은 게스트버튼이 undefined상태이다.
        //(Billing == BillMode.greap:0, greapguest:1, yahoo:2, none:3
        //예외처리
        clientData.btncooltime[idx]=btn1.timer;

        //console.log();
    };
    sHeartShop.twcooltime.onSetCoolTimer = function(idx, cnt) {  //쿨타이머4종 타임셋업
        sHeartShop.twcooltime.btn[idx].timer = cnt;
    };
    sHeartShop.twcooltime.onUpdateCoolTimer = function() {   //쿨타이머4종 타임업데이트
        var btns = sHeartShop.twcooltime.btn;
        var len = btns.length;
        for(var i=0; i<len; i++) {
            var btn1 = btns[i];
            if (btn1.timeronoff) {

                btn1.timer -= deltaTime;
                clientData.btncooltime[i]=btn1.timer;
                if (btn1.timer < 0) {
                    if (btn1.visible) {
                        btn1.txt.text = secondsToTime(0);
                    }
                    btn1.arr[Billing].visible = true;
                    btn1.timeronoff = true;
                    btn1.timer = 0;
                    btn1.visible = false;
                } else {
                    if (btn1.visible) {
                        btn1.txt.text = secondsToTime(btn1.timer);
                    }
                }
            }
        }
    };
    //-------------쿨타이머 4종 끝
    //하트샵 구매 결과창 메세지 입력하기
    sHeartShop.fin.onSetMsg = function(msg){
        sHeartShop.twfin.msg.text = msg;//"하트 60개\n획득했습니다."
    };
    //하트샵 구매 결과창 비트맵폰트 메세지 입력하기
    sHeartShop.fin.onSetTx = function(msg){
        sHeartShop.twfin.tx.text = msg;
    };

    sHeartShop.fin.onSetIcon = function(ipath){
        sHeartShop.twfin.icon.texture =  SpritePool.getInstance().get(ipath).texture;
    };


    //하트샵 구매 결과창 열기 //"icon":"heart5",  "count":"x5",  "button":"100P", "value":"5"
    sHeartShop.fin.onShow = function( itemidx ){
//        var BillMode = {greap:0, greapguest:1, yahoo:2, none:3};
//        var Billing = BillMode.greap;
//        var Bill2Str = {"0":"greap", "1":"greapguest", "2":"yahoo", "3":"none"};        
        //sHeartShop.itemList["greap"]["item0"]["tx"]+", "
        //sHeartShop.itemList["greap"]["item0"]["button"]+", "
        //sHeartShop.itemList["greap"]["item0"]["value"]+", "
        var modeidxstr = Billing.toString(); //"0"
        // var modename= Bill2Str[modeidxstr];  //"greap"
        // if(dm) console.log("~ ~ sHeartShop.fin.onShow:"
        //             +", modeidxstr:"+modeidxstr
        //             +", modename:"+modename
        //             +", kdata.iHeart:"+kData.iHeart
        //            );

        //하트 5~60개 획득
        //var val = sHeartShop.itemList[modename][itemidx]["value"];
        var val = shopListData[itemidx].Quantity;
        //kData.iHeart += parseInt(val);


       
        sHeartShop.fin.onSetMsg(GetString("gotheart", val));//sHeartShop.fin.onSetMsg("하트 "+val+"개\n획득했습니다."); //테스트

        //결과창에 표시할 글자를 가져온다. //x5, x10, x60개중
        //var valtx = sHeartShop.itemList[modename][itemidx]["tx"];
        var valtx = "x"+shopListData[itemidx].Quantity;

        //결과창에 표시할 아이템아이콘
        //var iconpath = sHeartShop.itemList[modename][itemidx]["icon"];
        var iconpath = strGamePath+shopListData[itemidx].icon;

        sHeartShop.timer.onSetCount(kData.iHeart);
        sHeartShop.fin.onSetTx(valtx);
        sHeartShop.fin.onSetIcon(iconpath);
        sHeartShop.fin.visible = true;
        sHeartShop.twfin.visible = true;

        SaveDataInClient();//SaveData();

        onFadein(sHeartShop.fin.bg, 0.9);//0.6);
        onFadeinScale(sHeartShop.twfin, function(){});
    };

    //하트샵 구매 결과창 닫기
    sHeartShop.fin.onHide = function(){
        onFadeout(sHeartShop.fin.bg, 0.9);//0.6);
        onFadeoutScale(sHeartShop.twfin,
                       function(){
                            sHeartShop.fin.visible = false;
                            sHeartShop.twfin.visible = false;
                        }
                      );
    };

    sHeartShop.dlg.onSetModeYesNo = function(yesno){
        if(yesno) {//예스노 2버튼모드
            sHeartShop.dlg.btnok.visible=true;
            sHeartShop.dlg.btncancel.visible=true;
            sHeartShop.dlg.btnoksingle.visible=false;
        }else{//1버튼모드
            sHeartShop.dlg.btnok.visible=false;
            sHeartShop.dlg.btncancel.visible=false;
            sHeartShop.dlg.btnoksingle.visible=true;
        }

    };
    sHeartShop.dlg.onShowGoogle = function(fnyes, fnno){
        if(fnyes==undefined) fnyes = function () {};
        if(fnno==undefined) fnno = function () {};
        sHeartShop.dlg.onSetModeYesNo(true);
        sHeartShop.dlg.onSetMsg("구글플레이스토어에서설치를해주세요.");
        sHeartShop.dlg.fnOk = fnyes;
        sHeartShop.dlg.fnNo = fnno;
        sHeartShop.dlg.onShow();
    }
    sHeartShop.dlg.onShowPointLow = function(fnyes){
        if(fnyes==undefined) fnyes = function () {};
        sHeartShop.dlg.onSetModeYesNo(false);
        sHeartShop.dlg.onSetMsg("포인트가 부족합니다?");
        sHeartShop.dlg.fnOkSingle = fnyes;
        sHeartShop.dlg.onShow();
    }
    sHeartShop.dlg.onShowGotoWeb = function(fnyes, fnno){
        if(fnyes==undefined) fnyes = function () {};
        if(fnno==undefined) fnno = function () {};
        sHeartShop.dlg.onSetModeYesNo(true);
        sHeartShop.dlg.onSetMsg("회원가입을\n하시겠습니까?");
        sHeartShop.dlg.fnOk = function(){};
        sHeartShop.dlg.fnNo = function(){};
        sHeartShop.dlg.onShow();
    }
    //하트샵 메세지 다이얼로그에 입력하기
    sHeartShop.dlg.onSetMsg = function(msg){
        sHeartShop.twdlg.tx.text = msg;
    };
    //하트샵 메세지 다이얼로그 열기
    // sHeartShop.dlg.onShow = function(){
    //     sHeartShop.dlg.visible = true;
    //     sHeartShop.twdlg.visible = true;
    //     onFadein(sHeartShop.dlg.bg, 0.9);
    //     onFadeinScale(sHeartShop.twdlg, function(){});
    // };

    //하트샵 메세지 다이얼로그 닫기
    sHeartShop.dlg.onHide = function(){
        onFadeout(sHeartShop.dlg.bg, 0.9);//0.6);
        onFadeoutScale(sHeartShop.twdlg,
                       function(){
                            sHeartShop.dlg.visible = false;
                            sHeartShop.twdlg.visible = false;

                           //상점용도
                           heartController.ShowGuidePopup(false);
                           if(dm) console.log("heartController.ShowGuidePopup(false)");
                           //상점용도
                        }
                    );
    };
    
    //하트샵 메세지 다이얼로그 열기
    sHeartShop.dlg.onShow = function(){
        sHeartShop.dlg.visible = true;
        sHeartShop.twdlg.visible = true;
        onFadein(sHeartShop.dlg.bg, 0.9);//0.6);
        onFadeinScale(sHeartShop.twdlg, function(){
            //상점용도
            heartController.ShowGuidePopup(true);
            //상점용도
        });



    };

    sHeartShop.dlg.onSetFnOk = function(fn){
        sHeartShop.dlg.fnOk = fn;
    };

    sHeartShop.dlg.onSetFnNo = function(fn){
        sHeartShop.dlg.fnNo = fn;
    };

    //하트샵의 창 모두 닫기
    sHeartShop.onHideAll = function(){
                            sHeartShop.tw.visible = false;
                            sHeartShop.bg.visible = false;
                            sHeartShop.fin.visible = false;
                            sHeartShop.dlg.visible = false;
                            sHeartShop.timer.visible = false;
                            //sHeartShop.
                        };

    // sHeartShop.timer.onAddTimer = function(cooltime){//힌트타이머 //ref: cbADYes()
    //     cooltime -= deltaTime;
    //
    //     if(cooltime <= 0 ){ //타이머꺼짐
    //
    //         if(kData.iHeart<5) {
    //             sHeartShop.timer.onSetTimer("00:00");
    //             sHeartShop.timer.onRun = true; //게임중 계속 돌아야
    //             kData.iHeart +=1; //cooltime
    //             sHeartShop.timer.onSetCount(kData.iHeart);
    //         }else {
    //             if(sHeartShop.timer.txtimer.text!="MAX") sHeartShop.timer.onSetTimer("MAX");
    //             sHeartShop.timer.onRun = false; //정지
    //         }
    //         //kData.userHeartCount +=1;
    //         return  HEART_COOL_TIME;
    //     }
    //     else{ //현재남은시간
    //         var remainTime = Math.ceil(cooltime);
    //         if(kData.iHeart<5){
    //             sHeartShop.timer.onSetTimer(convertTimeFormatFromSec(remainTime));
    //         }else{
    //             if(sHeartShop.timer.txtimer.text!="MAX") sHeartShop.timer.onSetTimer("MAX");
    //         }
    //         return cooltime;
    //     }
    // };

    sHeartShop.onInitMode = function(){
        SaveDataInClient();//SaveData();
        if(dm) console.log("~ ~ sHeartShop.tw.visible:"+sHeartShop.tw.visible);

        var len = sHeartShop.twcooltime.btn.length;
        for (var i=0; i<len; i++) {
            sHeartShop.twcooltime.btn[i].visible = false;
        }
        // nationServerNet = "korea_server";
        // nationServerNet = "japan_server";
        // nationServerNet = "yahoo_server";
        // nationServerNet = "naver_server";



        switch(nationServerNet) {
            case "yahoo_server":
                if(dm) console.log("~ ~ yahoo:");
                sHeartShop.tw.visible = true;
                sHeartShop.twy.visible = true;
                sHeartShop.twn.visible = false;
                //숨길필요없지만
                sHeartShop.twn.slot1Guest.visible = false;
                sHeartShop.twn.slot2Guest.visible = false;
                sHeartShop.twn.slot1Normal.visible = false;
                sHeartShop.twn.slot2Normal.visible = false;
                //숨길필요없지만
                sHeartShop.txpoint.text=getMoneyFormatFromNum(kData.greappoint);

                sHeartShop.fromShop2Yahoo.visible = !!yahooIN;
                break;
            case "korea_server"://게스트//BillMode.greapguest:
                if(loginTF==1) {
                    //로그인상태
                    if(dm) console.log("~ ~ greap:");
                    sHeartShop.tw.visible = true;
                    sHeartShop.twy.visible = false;
                    sHeartShop.twn.visible = true;
                    sHeartShop.twn.slot1Guest.visible = false;
                    sHeartShop.twn.slot2Guest.visible = false;
                    sHeartShop.twn.slot1Normal.visible = true;
                    sHeartShop.twn.slot2Normal.visible = true;
                    //sHeartShop.twn.slot3Normal.visible = true;
                    //sHeartShop.twn.slot4Normal.visible = true;
                    sHeartShop.txpoint.text=getMoneyFormatFromNum(kData.greappoint);

                    sHeartShop.fromShop2Yahoo.visible = !!yahooIN;
                }else{
                    //게스트모드
                    if(dm) console.log("~ ~ greapguest:");
                    sHeartShop.tw.visible = true;
                    sHeartShop.twy.visible = false;
                    sHeartShop.twn.visible = true;
                    sHeartShop.twn.slot1Guest.visible = true;
                    sHeartShop.twn.slot2Guest.visible = true;
                    sHeartShop.twn.slot1Normal.visible = false;
                    sHeartShop.twn.slot2Normal.visible = false;
                    //sHeartShop.twn.slot3Normal.visible = true;
                    //sHeartShop.twn.slot4Normal.visible = true;

                    sHeartShop.txpoint.text=GetString("login");//"회원전용";

                    sHeartShop.fromShop2Yahoo.visible = !!yahooIN;
                }
                break;
            case "japan_server"://게스트//BillMode.greapguest:
                if(loginTF==1) {
                    //로그인상태
                    if(dm) console.log("~ ~ greap:");
                    sHeartShop.tw.visible = true;
                    sHeartShop.twy.visible = false;
                    sHeartShop.twn.visible = true;
                    sHeartShop.twn.slot1Guest.visible = false;
                    sHeartShop.twn.slot2Guest.visible = false;
                    sHeartShop.twn.slot1Normal.visible = true;
                    sHeartShop.twn.slot2Normal.visible = true;
                    //sHeartShop.twn.slot3Normal.visible = true;
                    //sHeartShop.twn.slot4Normal.visible = true;
                    sHeartShop.txpoint.text=getMoneyFormatFromNum(kData.greappoint);

                    sHeartShop.fromShop2Yahoo.visible = !!yahooIN;
                }else{
                    //게스트모드
                    if(dm) console.log("~ ~ greapguest:");
                    sHeartShop.tw.visible = true;
                    sHeartShop.twy.visible = false;
                    sHeartShop.twn.visible = true;
                    sHeartShop.twn.slot1Guest.visible = true;
                    sHeartShop.twn.slot2Guest.visible = true;
                    sHeartShop.twn.slot1Normal.visible = false;
                    sHeartShop.twn.slot2Normal.visible = false;
                    //sHeartShop.twn.slot3Normal.visible = true;
                    //sHeartShop.twn.slot4Normal.visible = true;

                    sHeartShop.txpoint.text=GetString("login");//"회원전용";

                    sHeartShop.fromShop2Yahoo.visible = !!yahooIN;
                }
                break;

            default:
                console.log("~ ~ greapguest: default");
                sHeartShop.tw.visible = true;
                sHeartShop.twy.visible = false;
                sHeartShop.twn.visible = true;
                sHeartShop.twn.slot1Guest.visible = true;
                sHeartShop.twn.slot2Guest.visible = true;
                sHeartShop.twn.slot1Normal.visible = false;
                sHeartShop.twn.slot2Normal.visible = false;
                //sHeartShop.twn.slot3Normal.visible = true;
                //sHeartShop.twn.slot4Normal.visible = true;
                sHeartShop.txpoint.text=GetString("login");

                sHeartShop.fromShop2Yahoo.visible = !!yahooIN;
                break;
        }


        return;
        //------------------------------------------------------


        var mode= illMode.greapguest;
        if(mode!=undefined) BillMode = mode;
        //SaveData();
        if(dm) console.log("~ ~ sHeartShop.tw.visible:"+sHeartShop.tw.visible);
        var len = sHeartShop.twcooltime.btn.length;
        for (var i=0; i<len; i++) {
            sHeartShop.twcooltime.btn[i].visible = false;
        }
        //상점ui설정을 한다.
        if(loginTF==0) Billing = BillMode.greapguest;
        else if(loginTF==1 && proto.serPos==0) Billing = BillMode.greap;
        else if(loginTF==1 && proto.serPos==1) Billing = BillMode.yahoo;
        else Billing = BillMode.greapguest;

        if(yahooIN===true) Billing = BillMode.yahoo;

        var selbillmode = Billing == BillMode.greapguest ? "BillMode.greapguest"
            :Billing == BillMode.greap ? "BillMode.greap"
            :Billing == BillMode.yahoo ? "BillMode.yahoo"
            :"BillMode.greapguest";
        if(dm) console.log("loginmode:"+ selbillmode);
        //상점ui설정을 한다.

        switch(Billing) {
            case BillMode.yahoo:
                if(dm) console.log("~ ~ yahoo:");
                sHeartShop.tw.visible = true;
                sHeartShop.twy.visible = true; 
                sHeartShop.twn.visible = false;
                //숨길필요없지만
                sHeartShop.twn.slot1Guest.visible = false;
                sHeartShop.twn.slot2Guest.visible = false;
                sHeartShop.twn.slot1Normal.visible = false;
                sHeartShop.twn.slot2Normal.visible = false;
                //숨길필요없지만
                sHeartShop.txpoint.text=getMoneyFormatFromNum(kData.greappoint);

                break;
            case BillMode.greapguest:
                if(dm) console.log("~ ~ greapguest:");
                sHeartShop.tw.visible = true;
                sHeartShop.twy.visible = false; 
                sHeartShop.twn.visible = true; 
                sHeartShop.twn.slot1Guest.visible = true;
                sHeartShop.twn.slot2Guest.visible = true;
                sHeartShop.twn.slot1Normal.visible = false;
                sHeartShop.twn.slot2Normal.visible = false;
                //sHeartShop.twn.slot3Normal.visible = true;
                //sHeartShop.twn.slot4Normal.visible = true;

                sHeartShop.txpoint.text=GetString("login");
                break;

            case BillMode.greap:
                if(dm) console.log("~ ~ greap:");
                sHeartShop.tw.visible = true;
                sHeartShop.twy.visible = false; 
                sHeartShop.twn.visible = true;
                sHeartShop.twn.slot1Guest.visible = false;
                sHeartShop.twn.slot2Guest.visible = false;
                sHeartShop.twn.slot1Normal.visible = true;
                sHeartShop.twn.slot2Normal.visible = true;
                //sHeartShop.twn.slot3Normal.visible = true;
                //sHeartShop.twn.slot4Normal.visible = true;
                sHeartShop.txpoint.text=getMoneyFormatFromNum(kData.greappoint);
                break;                

            default:
                if(dm) console.log("~ ~ greapguest: default"+", goto:"+selbillmode);
                sHeartShop.tw.visible = true;
                sHeartShop.twy.visible = false; 
                sHeartShop.twn.visible = true;
                sHeartShop.twn.slot1Guest.visible = true;
                sHeartShop.twn.slot2Guest.visible = true;
                sHeartShop.twn.slot1Normal.visible = false;
                sHeartShop.twn.slot2Normal.visible = false;
                //sHeartShop.twn.slot3Normal.visible = true;
                //sHeartShop.twn.slot4Normal.visible = true;
                sHeartShop.txpoint.text=GetString("login");
                break;
        }
    }
}
//하트샵끝------------------------------------------------- 