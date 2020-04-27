/** HeratController v.0.1.0
 *
 */

var HEART_SHOP_STATE = {
    STATE_HEARTPOPUP_BASE : 0,
    STATE_HEARTPOPUP_BASE_NoShowing : 1,
    STATE_HEARTPOPUP_SHOP : 10,
    STATE_HEARTPOPUP_BUY : 20,
    STATE_HEARTPOPUP_CONFIRM : 30
};

var sGame = undefined;

var sPopupHeart = undefined; //<-----페이저에서 indexgame.create단계에서 할당              // 하트 표시
var sPopupHeartShop = undefined; //<-----페이저에서 indexgame.create단계에서 할당         // 하트 샵
var sPopupHeartShopConfirm = undefined; //<-----페이저에서 indexgame.create단계에서 할당 // 하트 충전 완료
var sPopupHeartChargeGuide = undefined; //<-----페이저에서 indexgame.create단계에서 할당 // 차지 유도 //ui없는 컨테이너

// 일반 적인 하트 표시
var txtHeartCnt; //하트갯수 8
//var txtHeartTimeCnt; //하트타이머 "max", 00:00
var navercount;
var navertime;
var navercount2;
var navertime2;

// 하트 샵 충전
var txtGreapPoint;              // greap 포인트
var txtOnlyAccount;             // 회원전용 //슬롯1 글자
var txtOnlyAccount2;            // 회원전용 //슬롯2 글자

var txtHeartBuyCount = [];  // 충전되는 하트
var txtHeartBuyPay = [];    // 포인트나 원,엔 수치
var sprHeartBuyPay = [];    // 광고
var sprHeartShopBtn = [];   // 버튼 이미지

// 하트샵 충전 완료
var sprHeartShopConfirm;
var txtHeartShopConfirmImg;
var txtHeartShopConfirm;

var heartShopState = HEART_SHOP_STATE.STATE_HEARTPOPUP_BASE_NoShowing;

// 하트 저장 관련 변수
var HeartSaveTime = 10;
var HeartSaveCurrentTime = 0;


// 구입하는 하트 갯수
var listHeartBuyCount = [5,5,20,60];
var listHeartBuyValue = ['200P','100￥','300￥','500￥'];      // 구입 가격 (일본버전)

// 리소스 정리 단계에서 spr나 txt 변수들 지정한 뒤
// heartController = new HeartController(); 해줘야 함
var heartController;

function HeartController() {
    this.Show(true,true);
    if(dm) console.log("HeartController()");
}

HeartController.prototype.Show = function(_b_immediately, _b_show) {
    if(false) {
        if (_b_show === undefined)
            _b_show = true;

        //sGame.addChild(sPopupHeart);

        if (_b_show) {
            if (!sPopupHeart.visible)
                sPopupHeart.visible = true;
        }

        if (_b_immediately) {
            if (_b_show) {
                //즉각 샵컨테이너 보이게
                heartShopState = HEART_SHOP_STATE.STATE_HEARTPOPUP_BASE;
                sPopupHeart.position.set(0, 0);
            }
            else {
                //즉각 샵컨테이너 사라지게
                heartShopState = HEART_SHOP_STATE.STATE_HEARTPOPUP_BASE_NoShowing;
                sPopupHeart.position.set(0, 0);
                compelteHideHeartPopup();
            }
        } else {
            //마종때문에 추가된 부분
            if (_b_show) {
                //0.2초후  샵컨테이너 보이게
                heartShopState = HEART_SHOP_STATE.STATE_HEARTPOPUP_BASE;
                sPopupHeart.position.set(0, -100);
                TweenMax.to(sPopupHeart, 0.2, {y: 0, ease: Linear.easeNone});
            } else {
                //0.2초후  샵컨테이너 사라지게
                heartShopState = HEART_SHOP_STATE.STATE_HEARTPOPUP_BASE_NoShowing;
                sPopupHeart.position.set(0, 0);
                TweenMax.to(sPopupHeart, 0.2, {
                    y: -100, ease: Linear.easeNone,
                    onComplete: function () {
                        compelteHideHeartPopup();
                    }
                });
            }
        }
    }//false

    //Time2Heart();
    // //-----로컬타이머 보정하기---------------
    // if(kData2get!=undefined) {
    //     //예제
    //     //var kData2get = new Data2();
    //     //kData2get.lifeTime: 1505837136463
    //     //kData2get.lastTick: 2.1169999999999947
    //
    //     //현재시간
    //     var curDateA = Date.now();
    //     var curDateB = parseInt(curDateA.toString().substring(0, 10));
    //     //저장시간
    //     var oldDateB = parseInt((kData2get.lastTick).toString().substring(0, 10));
    //     var passedSec = curDateB - oldDateB;
    //     var remainSec;
    //     //                 충전잔여시간       -흘러간시간
    //     var displaytime = kData2get.lifeTime-passedSec;
    //     if(0<displaytime) { //잔여시간
    //         //충전시간보다 더 많이 흘
    //         if(fHeartChargeTime<displaytime){
    //             var count =Math.floor(displaytime/fHeartChargeTime);
    //             kData.iHeart+=count;
    //             kData.fHeartTime=fHeartChargeTime;
    //             if(nvmode===true) {
    //                 var sends = {};
    //                 sends.iHeart = kData.iHeart;//네이버저장하기
    //                 if (typeof GamePocket.Sdk !== 'undefined') networkManager.AppDataPut(JSON.stringify(sends));
    //             }
    //         }
    //         else kData.fHeartTime = displaytime;
    //     } else { //보상시간
    //         //하트보상 갯수충전
    //         var addHeart = Math.floor(Math.abs(displaytime)/fHeartChargeTime);
    //         var remainpiec = Math.abs(displaytime)%fHeartChargeTime;
    //         var remainrev = fHeartChargeTime - remainpiec;
    //         //var addHeart = Math.floor(passedSec/fHeartChargeTime);
    //         //if(addHeart+kData.iHeart>iHeartInitData){ //아직쓸때가없음
    //         if (addHeart < iHeartChargeMax) {
    //             kData.iHeart += addHeart;
    //             if(kData.iHeart>iHeartChargeMax) kData.iHeart=iHeartChargeMax;
    //         }
    //         kData.fHeartTime = remainrev;
    //
    //         if(nvmode===true) {
    //             var sends = {};
    //
    //             //초기 하트값이 없을경우 예외
    //             if( typeof kData === 'undefined' || typeof kData.iHeart === 'undefined') return;
    //
    //             sends.iHeart = kData.iHeart;//네이버저장하기
    //             if (typeof GamePocket.Sdk !== 'undefined') networkManager.AppDataPut(JSON.stringify(sends));
    //         }
    //         //광고버튼시에 활성화
    //         //remainSec=0;
    //         //kData.btn1TimeStamp=null;
    //     }
    //     //var remainStr = convertTimeFormatFromSec(remainSec);//00:00형식으로
    //     //kData.fHeartTime = kData2get.lastTick;
    // }
    // //-----로컬타이머 보정하기---------------

    this.Changed();
};

function compelteHideHeartPopup() {
    if(sPopupHeart.visible)
        sPopupHeart.visible = false;
}

HeartController.prototype.Update = function() {
    /*if(kData.iHeart < iHeartChargeMax){
        kData.fHeartTime -= deltaTime;

        if(kData.fHeartTime <= 0){ //시간이 소진되어, 충전가능
            //SaveDataInClient();

            if(networkManager.networkState == NET_STATE.RUN_SERVER){
                // CheckButton은 게임에 따라 수정을 하면 될듯
                networkManager.LoadData(function () { });
            }
            else{
                //로컬에서 처리하려고 만든 것
                kData.iHeart++;
                kData.fHeartTime = fHeartChargeTime;
                console.log("로컬호스트에서 하트1 증가처리");
                //CheckButton은 게임에 따라 수정을 하면 될듯
                //CheckButton();

                if(nvmode===true) {
                    var sends = {};
                    sends.iHeart = kData.iHeart;//네이버저장하기
                    if (typeof GamePocket.Sdk !== 'undefined') {
                        networkManager.AppDataPut(JSON.stringify(sends));
                    }
                }else {
                    networkManager.ForcedSaveData(); //처리 //HeartController.Update
                    //로컬에서 처리하려고 만든 것
                }
            }
        }
    }*/

    this.Changed(); //max또는 00:00 출력

    HeartSaveCurrentTime += deltaTime;
    if(HeartSaveCurrentTime >= HeartSaveTime){
        HeartSaveCurrentTime = 0;
    }
};

//10분하트1개충전 타이머
//txtHeartTimeCnt.text
HeartController.prototype.Changed = function () {
    if(typeof(txtHeartCnt) !== 'undefined'
    && typeof(kData) !== 'undefined'
    && typeof(kData.iHeart) !== 'undefined') {
        if(typeof kData.iHeart !== 'undefined') {
            txtHeartCnt.text = kData.iHeart.toString();
            if(nvmode===true) {
                if (typeof navercount !== 'undefined')
                    navercount.text = kData.iHeart.toString();
            }
        }
        if(kData.iHeart >= iHeartChargeMax) {
            //txtHeartTimeCnt.text = "MAX";
            if(nvmode===true) {
                if (typeof navertime !== 'undefined')
                    navertime.text = "MAX";
            }
        }
        else {
            /*var min = Math.floor(kData.fHeartTime / 60);
            if (min < 10)
                min = '0' + min;
            var sec = Math.floor(kData.fHeartTime % 60);
            if (sec < 10)
                sec = '0' + sec;
            txtHeartTimeCnt.text = min + ":" + sec;*/
            if(nvmode===true) {
                if (typeof navertime !== 'undefined')
                    navertime.text = min + ":" + sec;
            }
        }
    }
};

//sGame->sPopupHeart->
//txtGreapPoint.text
//txtOnlyAccount <==회원전용
//txtHeartBuyPay <==포인트나 원,엔 수치

//플러스버튼,상점버튼 클릭시 상점 띄우기
//GameMain -> GameViewSetting(res) -> sPopupHeart 구성
HeartController.prototype.ShowHeartShop = function (_b_show) {
    //상점용도 --UI에서 사운드가 나오므로 여기선 주석처리
    //SESoundPlay(SEIndex.click);//SESoundPlay(SE_Button);

    if(_b_show === undefined) _b_show = true;

    if(_b_show == true){
        networkManager.GetShoplist(ShopType.HEART,function () {
            //구매유도창
            if(sPopupHeartChargeGuide.visible) sPopupHeartChargeGuide.visible = false;
            //구매결과창
            if(sPopupHeartShopConfirm.visible) sPopupHeartShopConfirm.visible = false;

            sGame.addChild(sPopupHeartShop);

            if(sPopupHeartShop.visible != _b_show) //지정상태랑 현상태랑 다르면, 지정상태로 보이기
                sPopupHeartShop.visible = _b_show;

            // login bummy data
            if(loginTF == 1){
                //그레이프회원, 야후회원
                if(proto.serPos == 0){

                    sHeartShop.onSetPointFast(kData.greappoint); //포인트P표시 처음표시

                    // txtGreapPoint.style = {fontFamily:'ROUNDS_BLACK', fontSize:'40px', fill:'#ffffff', align:'right'};
                    //
                    //     for(var i=0; i<4; i++){ //서버에서 가져오기
                    //     sHeartShop.itemList["greap"][i]["tx"] = "x"+shopListData[i].Quantity; //갯수가져오기
                    //     sHeartShop.itemList["greap"][i]["button"] = ""+shopListData[i].Price+"P"; //포인트가져오기
                    //     sHeartShop.itemList["greap"][i]["value"] = ""+shopListData[i].Quantity;
                    // }
                    //서버에서 가져온걸 적용준비--------------------------

                }else if(proto.serPos == 1){
                    // 야후
                }
            }else{
                //게스트 모드

                txtGreapPoint.text = GetString("login");//GetString("membersonly");// "회원전용"; //포인트P표시

                // for(var i=0; i<4; i++){
                //     sHeartShop.itemList["greapguest"][i]["tx"] = "x"+shopListData[i].Quantity; //x5 갯수표시
                //     sHeartShop.itemList["greapguest"][i]["button"] = ""+shopListData[i].Price+"P"; //500P 가격표시
                //     sHeartShop.itemList["greapguest"][i]["value"] = ""+shopListData[i].Quantity; //5 갯수
                // }
            }
        });
    }
    else{
        if(sPopupHeartShop.visible != _b_show)
            sPopupHeartShop.visible = _b_show;
    }

};

HeartController.prototype.IsActive = function () {
    return sPopupHeart.visible;
};

//하트가 부족할 경우
//하트구매유도창 띄우기
//sPopupHeartChargeGuide 띄우기
//GameMain -> GameViewSetting(res) -> sPopupHeartChargeGuide 구성
HeartController.prototype.ShowGuidePopup = function(_b_show){

    //상점용도 --UI에서 사운드가 나오므로 여기선 주석처리
    //SESoundPlay(SEIndex.click);//SESoundPlay(SE_Button);
    //상점용도

    if(_b_show === undefined) _b_show = true;

    sGame.addChild(sPopupHeartChargeGuide);
    sPopupHeartChargeGuide.visible = _b_show;
};


//구매하려고 버튼 클릭시
var sHeartShop_delaybtn=false;//초기화


HeartController.prototype.BuyHeart = function(heartIndex) {//버튼이벤트 함수에서 로그인만 BuyHeart로, 비로그인은 예외처리함(s3.btnfnok)

    //1초간 재입력막기
    if(sHeartShop_delaybtn==false) {
        sHeartShop_delaybtn=true;
        TweenMax.delayedCall(1,function(){sHeartShop_delaybtn=false;});
    }else {
        return;
    }

    if(heartIndex === undefined || heartIndex == null) return;


    //쿨타이머 실행< //결제전 미리 실행하려고
    if (loginTF == 1)
    {
        if(proto.serPos == 0    //모비서비스에서만 //복귀
        || proto.serPos == 1    //야후서비스에서만
        //&& apkTF == 1           //apk에서만
        ) {
            if(shopListData[heartIndex].Price !== 0 //광고아니면
               && kData.greappoint<shopListData[heartIndex].Price){//포인트부족시 리턴 //

                if(dm) console.log("바이하트-포인트부족:"+GetShpMsg("lowpoint"));
                networkManager.ModalCall(MODAL_BUTTON_TYPE.OKONLY,GetShpMsg("lowpoint"),
                    function () {
                    },
                    function () {
                    }
                );
                return;
            }

            //shop모드별대응
            var uiresult;
            var uiplus;
            var uishop;
            if (uishopinmenu) {
                uishop = uigame.state.states.menu.uishop;
                uiresult = uigame.state.states.menu.uishopresult;
                uiplus = uigame.state.states.menu.uishopplus;
            }
            else {
                uishop = uigame.state.states.game.uiController.uishop;
                uiresult = uigame.state.states.game.uiController.uishopresult;
                uiplus = uigame.state.states.game.uiController.uiMain.z_shopplus;
            }
            //shop모드별대응

            //2번,3번이면 쿨타임실행
            if (heartIndex == 2) {
                //sHeartShop.twcooltime.onInitCoolTimer(heartIndex);
                SaveDataInClient();

                for (var i = 0; i < 4; i++) {
                    uishop.slots[i].onRefreshSlot1(); //가진포인트가 적으면, 비활성 시킨다
                }
                curDate = Date.now();
                kData.btn1TimeStamp = parseInt(curDate.toString().substring(0, 10));//kData.btn1TimeStamp
                if (kData.btn1TimeStamp !== null) uishop.slots[2].setBtnOff();
                if (kData.btn2TimeStamp !== null) uishop.slots[3].setBtnOff();

                //가져올때 에라가 나는상황 발생 //message:"_time is not defined"
                // networkManager.GetServerTime(function (_time) {
                //     kData.btn1TimeStamp = _time;
                //     //networkManager.ForcedSaveData();
                //     for (var i = 0; i < 4; i++) {
                //         uishop.slots[i].onRefreshSlot1(); //가진포인트가 적으면, 비활성 시킨다
                //     }
                //     if (kData.btn1TimeStamp !== null) uishop.slots[2].setBtnOff();
                //     if (kData.btn2TimeStamp !== null) uishop.slots[3].setBtnOff();
                // });

            }
            if (heartIndex == 3) {
                //sHeartShop.twcooltime.onInitCoolTimer(heartIndex);
                SaveDataInClient();

                for (var i = 0; i < 4; i++) {
                    uishop.slots[i].onRefreshSlot1(); //가진포인트가 적으면, 비활성 시킨다
                }
                curDate = Date.now();
                kData.btn2TimeStamp = parseInt(curDate.toString().substring(0, 10));//kData.btn1TimeStamp
                if (kData.btn1TimeStamp !== null) uishop.slots[2].setBtnOff();
                if (kData.btn2TimeStamp !== null) uishop.slots[3].setBtnOff();

                //가져올때 에라가 나는상황 발생 //message:"_time is not defined"
                // networkManager.GetServerTime(function (_time) {
                //     kData.btn2TimeStamp = _time;
                //     //networkManager.ForcedSaveData();
                //     for (var i = 0; i < 4; i++) {
                //         uishop.slots[i].onRefreshSlot1(); //가진포인트가 적으면, 비활성 시킨다
                //     }
                //     if (kData.btn1TimeStamp !== null) uishop.slots[2].setBtnOff();
                //     if (kData.btn2TimeStamp !== null) uishop.slots[3].setBtnOff();
                // });
            }
        }

    }
    //비로그인은 앞에서 예외처리함 -- 타이머
    //쿨타이머 실행>

    //모드에따른 구매완료결과창 출력한다.
    networkManager.Payment(shopListData[heartIndex].mkidx,function () {//서버에 온 물품배열에서 정보를 가져온다.
        if(dm)console.log("networkManager.Payment");
        //그레이프회원모드, 야후 회원모드
        if(loginTF == 1){
            if(proto.serPos == 0 // 모비회원
            || proto.serPos == 1){ // 야후회원

                //shop모드별대응
                var uiresult;
                var uiplus;
                var uishop;
                if(uishopinmenu) {
                    uishop =  uigame.state.states.menu.uishop;
                    uiresult = uigame.state.states.menu.uishopresult;
                    uiplus = uigame.state.states.menu.uishopplus;
                }
                else
                {
                    uishop =  uigame.state.states.game.uiController.uishop;
                    uiresult = uigame.state.states.game.uiController.uishopresult;
                    uiplus = uigame.state.states.game.uiController.uiMain.z_shopplus;
                }
                //shop모드별대응

                //하트구매결과창
                uiresult.onRefreshShopResult(shopListData[heartIndex].Quantity, shopListData[heartIndex].icon);
                uiresult.visible=true;
                //if(bSoundSE) SE_BuyItem.play();            //아이템 구매 사운드           --아이템을 구매하였을 때 사운드

                uishop.pttx.text = getMoneyFormatFromNum(kData.greappoint);//잔여포인트표시
                uiplus.onRefresh();
            }
        }else{
            if(false) {
                //
                // if (networkManager.networkState == NET_STATE.LOCALHOST) {
                //     //로컬서비스//비로그인은 예외처리함(s3.btnfnok)
                //     kData.iHeart += str2int(shopListData[heartIndex].Quantity);
                // } else {//비회원
                //     //게스트모드
                //     //kData.iHeart +=  Number(sHeartShop.itemList["greapguest"][heartIndex]["value"]);
                //     kData.iHeart += str2int(shopListData[heartIndex].Quantity);
                // }
                //
                //
                // // if(heartIndex==2
                // //     || heartIndex==3) {
                // //     uigame.state.states.menu.uishopresult.onRefreshShopResult(shopListData[heartIndex].Quantity);
                // //     uigame.state.states.menu.uishopresult.visible=true;
                // //     //sHeartShop.twcooltime.onInitCoolTimer(heartIndex);
                // //     uigame.state.states.menu.uishopplus.onRefresh();
                // //     //SaveDataInClient();
                // // }
                //
                //
                // var uiresult;
                // var uiplus;
                // if (uishopinmenu) {
                //     uiresult = uigame.state.states.menu.uishopresult;
                //     uiplus = uigame.state.states.menu.uishopplus;
                // }
                // else {
                //     uiresult = uigame.state.states.game.uiController.uishopresult;
                //     uiplus = uigame.state.states.game.uiController.uiMain.z_shopplus;
                // }
                //
                //
                // // if(heartIndex==2
                // //     || heartIndex==3) {
                // if (shopListData[heartIndex].Price === 0) {
                //     uiresult.onRefreshShopResult(shopListData[heartIndex].Quantity, shopListData[heartIndex].icon);
                //     uiresult.visible = true;
                //     //sHeartShop.twcooltime.onInitCoolTimer(heartIndex);
                //     uiplus.onRefresh();
                //     //SaveDataInClient();
                // }
            }//false
        }

    });
};


//버튼클릭시 하트를 소비한다.                       사용하트수, 버튼업데이트콜백
//서버에서 하트수 차감처리된다.
HeartController.prototype.UseHeart = function (_useCount,_cb_func) {
    if(_useCount === undefined || _useCount == null) _useCount = 1;

    networkManager.UseHeart(_useCount,_cb_func);
};

//비회원 로그인시
//GameMain.js -> GameViewSetting(res)
//heartController = new HeartController(); //생성직후 호출

HeartController.prototype.LostTime = function (_iLostTime) {
    if(kData.iHeart >= iHeartChargeMax)
        return;

    var addHeart = 0;

    while(_iLostTime >= fHeartChargeTime){
        addHeart++;
        _iLostTime -= fHeartChargeTime;
    }

    /*kData.fHeartTime -= _iLostTime;

    if(kData.fHeartTime < 0){
        addHeart++;
        kData.fHeartTime = fHeartChargeTime - kData.fHeartTime;
    }*/

    kData.iHeart += addHeart;

    if(kData.iHeart > iHeartChargeMax)
        kData.iHeart = iHeartChargeMax;


    var sends={}; sends.iHeart=kData.iHeart;//네이버저장하기
    if(nvmode===true) {
        if (typeof GamePocket.Sdk !== 'undefined') networkManager.AppDataPut(JSON.stringify(sends));
    }else{
        networkManager.ForcedSaveData(); //처리//in LostTime
    }

};