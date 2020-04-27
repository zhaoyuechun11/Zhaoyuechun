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

var sPopupHeart = new PIXI.Container();              // 하트 표시
var sPopupHeartShop = new PIXI.Container();         // 하트 샵
var sPopupHeartShopConfirm = new PIXI.Container(); // 하트 충전 완료
var sPopupHeartChargeGuide = new PIXI.Container(); // 차지 유도 //ui없는 컨테이너

// 일반 적인 하트 표시
var txtHeartCnt;
var txtHeartTimeCnt;

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

var iHeartInitData = 10;
var iHeartChargeMax = 5;//5;            // 최대 충전 //서버에서 가져오므로 이수치는 사용안함
var fHeartChargeTime = 600;//600;         // 충전 타임 //서버에서 가져오므로 이수치는 사용안함
//var fHeartChargeTimeAD = 600;         // 광고충전 타임

// 구입하는 하트 갯수
var listHeartBuyCount = [5,5,20,60];
var listHeartBuyValue = ['200P','100￥','300￥','500￥'];      // 구입 가격 (일본버전)

// 리소스 정리 단계에서 spr나 txt 변수들 지정한 뒤
// heartController = new HeartController(); 해줘야 함
var heartController;

function HeartController() {
    this.Show(true,true);
}

HeartController.prototype.Show = function(_b_immediately, _b_show) {
    if(_b_show === undefined)
        _b_show = true;

    sGame.addChild(sPopupHeart);

    if(_b_show){
        if(!sPopupHeart.visible)
            sPopupHeart.visible = true;
    }

    if(_b_immediately){
        if(_b_show){
            //즉각 샵컨테이너 보이게
            heartShopState = HEART_SHOP_STATE.STATE_HEARTPOPUP_BASE;
            sPopupHeart.position.set(0,0);
        }
        else{
            //즉각 샵컨테이너 사라지게
            heartShopState = HEART_SHOP_STATE.STATE_HEARTPOPUP_BASE_NoShowing;
            sPopupHeart.position.set(0,0);
            compelteHideHeartPopup();
        }
    }else{
        //마종때문에 추가된 부분
        if(_b_show){
            //0.2초후  샵컨테이너 보이게
            heartShopState = HEART_SHOP_STATE.STATE_HEARTPOPUP_BASE;
            sPopupHeart.position.set(0,-100);
            TweenMax.to(sPopupHeart,0.2,{y:0, ease:Linear.easeNone});
        }else{
            //0.2초후  샵컨테이너 사라지게
            heartShopState = HEART_SHOP_STATE.STATE_HEARTPOPUP_BASE_NoShowing;
            sPopupHeart.position.set(0,0);
            TweenMax.to(sPopupHeart,0.2,{y:-100, ease:Linear.easeNone,
                onComplete:function () {compelteHideHeartPopup();}});
        }
    }

    this.Changed();
};

function compelteHideHeartPopup() {
    if(sPopupHeart.visible)
        sPopupHeart.visible = false;
}

/*HeartController.prototype.Update = function() {
    if(kData.iHeart < iHeartChargeMax){
        kData.fHeartTime -= deltaTime;

        if(kData.fHeartTime <= 0){
            //SaveDataInClient();

            if(networkManager.networkState == NET_STATE.RUN_SERVER){
                // CheckButton은 게임에 따라 수정을 하면 될듯
                networkManager.LoadData(function () { });
            }
            else{
                kData.iHeart++;
                kData.fHeartTime = fHeartChargeTime;
                // CheckButton은 게임에 따라 수정을 하면 될듯
                //CheckButton();
                networkManager.ForcedSaveData();
            }
        }
    }

    this.Changed();

    HeartSaveCurrentTime += deltaTime;
    if(HeartSaveCurrentTime >= HeartSaveTime){
        HeartSaveCurrentTime = 0;
    }
};*/

//10분하트1개충전 타이머
//txtHeartTimeCnt.text
HeartController.prototype.Changed = function () {
    if(txtHeartCnt==undefined) return;
    txtHeartCnt.text = kData.iHeart.toString();

    if(kData.iHeart >= iHeartChargeMax)
        txtHeartTimeCnt.text = "MAX";
    else{
        var min = Math.floor(kData.fHeartTime / 60);
        if(min < 10)
            min = '0' + min;
        var sec = Math.floor(kData.fHeartTime % 60);
        if(sec < 10)
            sec = '0'+sec;
        txtHeartTimeCnt.text = min + ":" + sec;
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
    //    networkManager.GetShoplist(ShopType.HEART,function () {
            //구매유도창
            if(sPopupHeartChargeGuide.visible) sPopupHeartChargeGuide.visible = false;
            //구매결과창
            if(sPopupHeartShopConfirm.visible) sPopupHeartShopConfirm.visible = false;

            sGame.addChild(sPopupHeartShop);

            if(sPopupHeartShop.visible != _b_show) //지정상태랑 현상태랑 다르면, 지정상태로 보이기
                sPopupHeartShop.visible = _b_show;

            if(loginTF === 1){ //로그인

                txtGreapPoint.style = {fontFamily:'ROUNDS_BLACK', fontSize:'40px', fill:'#ffffff', align:'right'};

                if(proto.serPos === 0){ //모비서비스
                    sHeartShop.onSetPointFast(kData.greappoint); //포인트P표시 처음표시
                }else if(proto.serPos === 1){ // 야후
                    sHeartShop.onSetPointFast(kData.greappoint); //포인트P표시 처음표시
                }
            }else{ //비로그인
                if (networkManager.networkState === NET_STATE.LOCALHOST) {//로컬서비스
                    console.log("ShowHeartShop in local");
                }else {
                    //게스트 모드
                    txtGreapPoint.text = GetString("login");//GetString("membersonly");// "회원전용"; //포인트P표시
                }
            }
    //    });
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

if(shopListData.length ===1){
    shopListData = [
        {icon:"img2/heart_no_1.png", pType:"point", Price:10, Quantity:3, mkidx:0},
        {icon:"img2/heart_no_2.png", pType:"point", Price:20, Quantity:6, mkidx:0},
        {icon:"img2/heart_no_3.png", pType:"ad_1", Price:0, Quantity:9, mkidx:0},
        {icon:"img2/heart_no_4.png", pType:"ad_2", Price:0, Quantity:12, mkidx:0}
    ]
}
//구매하려고 버튼 클릭시
HeartController.prototype.BuyHeart = function() {

    //1초간 재입력막기
    if(sHeartShop.delaybtn==false) {
        sHeartShop.delaybtn=true;
        TweenMax.delayedCall(1,function(){sHeartShop.delaybtn=false;});
    }else {
        return;
    }
    //슬롯인덱스가 이상하면 중지
    if(this.heartIndex === undefined || this.heartIndex == null) return;

    //--광고버튼이 아닐 경우 예외처리하려고--
    var isAD=false;
    if(shopListData[this.heartIndex].pType.indexOf('ad_')>-1) isAD = true;
    //--광고버튼이 아닐 경우 예외처리하려고--


    //혜관님광고클릭시---
    if (shopListData[this.heartIndex].pType === "ad_1") {
        //this.txt_pay.visible = false;
        console.log("혜관님광고클릭1!!");
        if (isApp) window.parent.postMessage({adStatus: 0}, "*");//전면 광고
    } else if(shopListData[this.heartIndex].pType === "ad_2"){
        console.log("혜관님광고클릭2!!");
        if (isApp) window.parent.postMessage({adStatus: 1}, "*");//비디오 광고
    }
    //혜관님광고클릭시---


    //포인트부족시 선작업-----<
    if( loginTF===1//로그인상태//
        && kData.greappoint<shopListData[this.heartIndex].Price//포인트부족시 리턴 //
    ){
        //if(dm) console.log("바이하트-포인트부족:"+GetShpMsg("lowpoint"));
        //networkManager.ModalCall(MODAL_BUTTON_TYPE.OKONLY,GetShpMsg("lowpoint"), function () {}, function () {});
        //야후추가< 포인트부족
        if(yahooIN === undefined)
            kMGMenu.ShowPopup(kMGMenu.GetString("notice"), kMGMenu.GetString('lowpoint1'), kMGMenu.GetString("ok"));
        else
            kMGMenu.ShowPopup(kMGMenu.GetString("notice"), kMGMenu.GetString('lowpoint'), kMGMenu.GetString("ok"), yahooInappURL);
        ///-------------

        //야후추가>
        return;
    }
    //포인트부족시 선작업----->



    // 밑에 접속모들별 선작업이 이작업이므로 주석처리
    // //쿨타이머 결제전 미리 실행하려고
    // if (loginTF == 1            //로그인
    //     && proto.serPos == 0    //모비서비스
    //     && apkTF == 1           //apk에서만
    // ) {
    //     //2번,3번이면 쿨타임실행
    //     if (this.heartIndex == 2
    //         || this.heartIndex == 3) {
    //         //if (clientData.btncooltime[idx] == 0) {
    //         sHeartShop.twcooltime.onInitCoolTimer(this.heartIndex);
    //         SaveDataInClient();
    //         //}
    //     }
    // }
    // 밑에 접속모들별 선작업이 이작업이므로 주석처리

    //접속모드별 선작업을 한다.---
    //  로그인   -모바일일때 서버타임저장,타이머작동
    //  비로그인 -로컬일때   더미 샾리스트 생성
    //                     20초,10초 타이머작동
    //          -게스트일때 로그인유도
    if (loginTF === 1) {                                          //로그인상태
        if (proto.serPos === 0) {                                   //모비서비스-----------
            //if(apkTF===1){ //모바일에서는 광고타이머 작동 시킴
                if(isAD){
                    //쿨타임이 작동안되는 경우가 있어서, 여기까지 올라옴
                    d_plus1 = this.heartIndex; //디버깅텍스트용도
                    clicktimer[this.heartIndex] = true;//서버타임가져올때 판별인자

                    if(false) {
                        var idx = this.heartIndex;
                        networkManager.GetServerTime(function (_time) {            //작동을 안하는 것 같아서  gm.btnTimer에서 따로 처리중
                            kData.btnTimeStamp[idx] = _time;
                        });
                        // //sHeartShop.twcooltime.onInitCoolTimer(this.heartIndex); //지엠타이머에서 처리
                        //uigame.state.states.menu.uishop.slots[2].btnoff();         //지엠타이머에서 처리
                    }
                    if(true){
                        //로컬페이크 광고 처리
                        sHeartShop.twcooltime.onInitCoolTimer(this.heartIndex);
                        d_plus1 = this.heartIndex;
                        kData.btnTimeStamp[this.heartIndex] = parseInt(Date.now().toString().substring(0, 10) - 580);//20초
                        //로컬페이크 광고 처리
                        kData.iHeart += shopListData[this.heartIndex].Quantity;
                        //sHeartShop.twcooltime.onInitCoolTimer(this.heartIndex); //로컬에서 강제로 실행
                        SaveDataInClient();
                    }

                    sHeartShop.twcooltime.onInitCoolTimer(this.heartIndex); //실제 모바일에서 실행
                    SaveDataInClient();

                }//isAD
                else
                {
                    //광고가 아닌경우
                    //구매결과창은 페이먼튼에서
                }
            //}//apk

        }else if(proto.serPos === 1){
            //야후서비스에서 포인트부족시 //위에서처리
        }
    } else {
        if (networkManager.networkState === NET_STATE.LOCALHOST) {//비로그인 --로컬모드-----------
            console.log("BuyHeart->this.heartIndex:"+this.heartIndex);
            //로컬에서 더미 샵리리스트 생성 -- 가짜생성
            // shopListData = [{mkidx:0, mtype:"", pType:"", Quantity:0, Price:0, icon:"img/heart_no_1.png"},
            //                 {mkidx:0, mtype:"", pType:"", Quantity:0, Price:0, icon:"img/heart_no_2.png"},
            //                 {mkidx:0, mtype:"", pType:"", Quantity:0, Price:0, icon:"img/heart_no_3.png"},
            //                 {mkidx:0, mtype:"", pType:"", Quantity:0, Price:0, icon:"img/heart_no_4.png"}];
            //로컬에서 더미 샵리리스트 생성 -- 가짜생성
            if(isAD){
                //로컬페이크 광고 처리
                sHeartShop.twcooltime.onInitCoolTimer(this.heartIndex);
                d_plus1 = this.heartIndex;
                kData.btnTimeStamp[this.heartIndex] = parseInt(Date.now().toString().substring(0, 10) - 580);//20초
                //로컬페이크 광고 처리
                kData.iHeart += shopListData[this.heartIndex].Quantity;
                //sHeartShop.twcooltime.onInitCoolTimer(this.heartIndex); //로컬에서 강제로 실행
                SaveDataInClient();

                sHeartShop.fin.onShow(this.heartIndex);
            }else{
                //로컬페이크 구입
                sHeartShop.fin.onShow(this.heartIndex);
                //로컬페이크 구입
            }
            // if(false) {
            //     //로컬에서 타이머 실행//apk에서 실행되어야하는 AD보기 타이머 코드
            //     if (this.heartIndex === 2 || this.heartIndex === 3) { //쿨타임이 작동안되는 경우가 있어서, 여기까지 올라옴
            //         sHeartShop.twcooltime.onInitCoolTimer(this.heartIndex);
            //         //SaveDataInClient();
            //     }
            //     //로컬에서 타이머 실행
            //
            //     // 테스트--강제스탬프저장//로컬테스트
            //     if (this.heartIndex === 2) d_plus1 = this.heartIndex; //디버깅텍스트용도
            //     if (this.heartIndex === 3) d_plus2 = this.heartIndex; //디버깅텍스트용도
            //     if (this.heartIndex === 3) kData.btn2TimeStamp = parseInt(Date.now().toString().substring(0, 10) - 590);//10초
            //     // 테스트--강제스탬프저장
            // }
        } else { //비로그인서비스 //게스트--------------
            //게스트모드
            if(!isAD) {
                //포인트 버튼 클릭시
                kMGMenu.SetToastMsg(kMGMenu.GetString("signup"));//토스트-로그인유도
                return;
            }else{
                //광고버튼 클릭시
                
                //로컬페이크 광고 처리
                sHeartShop.twcooltime.onInitCoolTimer(this.heartIndex);
                d_plus1 = this.heartIndex;
                kData.btnTimeStamp[this.heartIndex] = parseInt(Date.now().toString().substring(0, 10) - 580);//20초
                //로컬페이크 광고 처리

                kData.iHeart += shopListData[this.heartIndex].Quantity;
                sHeartShop.twcooltime.onInitCoolTimer(this.heartIndex); //로컬에서 강제로 실행
                SaveDataInClient();

                sHeartShop.fin.onShow(this.heartIndex);
            }
        }
    }
    //모드별 선작업을 한다.---





    //------------------------
    var hrtidx = this.heartIndex;
    //여기서 일본모비에러 shopListData null, this.heartIndex null
    var mkidx = -1;
    if(typeof shopListData[hrtidx] !== 'undefined') mkidx=shopListData[hrtidx].mkidx;

    // 원본인데...여기서 페이먼트작업이 시작해야되서 주석처리
    // //로컬은 payment가 오류가 나므로 전에 처리
    // if(loginTF === 1){ //로그인 후 (in BuyHeart)
    //     if(proto.serPos === 0){ //모비서비스
    //     }else if(proto.serPos === 1){ // 야후
    //     }
    // }else{ //로그인 전상황
    //     if (networkManager.networkState === NET_STATE.LOCALHOST) {//로컬서비스
    //         //var  addHeartCount = shopListData[data_heartIndex].Quantity; //로컬은 값이 없으므로
    //         var  addHeartCount = sHeartShop.itemList["greap"][idx]["tx"]; // 로컬은 이렇게
    //         sHeartShop.fin.onShow(idx);
    //         kData.iHeart +=  Number(sHeartShop.itemList["greapguest"][data_heartIndex]["value"]);
    //
    //         if(data_heartIndex==0 || data_heartIndex==1) {
    //             SaveDataInClient();
    //         }else if(data_heartIndex==2 || data_heartIndex==3) {
    //             //미리 구글플레이로 예외처리 됨
    //             SaveDataInClient();
    //             return;
    //         }
    //     }else { //게스트 모드
    //     }
    // }
    // 원본인데...여기서 페이먼트작업이 시작해야되서 주석처리
    //로컬은 여기서 진입불가
    networkManager.Payment(mkidx,function () {//서버에 온 물품배열에서 정보를 가져온다.
        //그레이프회원모드, 야후 회원모드
        if(loginTF === 1){
            if(proto.serPos === 0 //모비회원
                || proto.serPos === 1 //야후회원
            ){ // greap 홈페이지

                //하트구매결과창
                //var  addHeartCount = shopListData[data_heartIndex].Quantity;
                sHeartShop.fin.onShow(hrtidx);
                if(shopListData[hrtidx].pType.indexOf("point")>-1){
                    sHeartShop.onSetPointFast( kData.greappoint ); //구매포인트표시
                }else{
                    //가끔 쿨타임이 없어지는경우가 생기므로 위로 이동
                    //sHeartShop.twcooltime.onInitCoolTimer(idx);
                }

            }
        }else{
//            //비로그인 //로컬, 게스트
//            if (networkManager.networkState === NET_STATE.LOCALHOST) {//로컬서비스
//                console.log("Payment->this.heartIndex:"+hrtidx);
//                //로컬에서 강제 타이머 작동
//                if(isAD){
//
//                    sHeartShop.twcooltime.onInitCoolTimer(hrtidx); //로컬에서 강제로 실행
//                    SaveDataInClient();
//                }
//                sHeartShop.fin.onShow(hrtidx); //로컬,페이먼트,결과창
//
//            }else{
//                //게스트모드
//                //kData.iHeart += listHeartBuyCount[data_heartIndex]; //var listHeartBuyCount = [5,5,20,60];
//
//                kData.iHeart += shopListData[hrtidx].Quantity;
//                if (isAD === true) {
//                    sHeartShop.fin.onShow(hrtidx); //게스크,광고,페이먼트,결과창
//                    sHeartShop.twcooltime.onInitCoolTimer(hrtidx); //게스트모드인경우
//                    SaveDataInClient();
//                }//isAD
//            }//게스트모드


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

    kData.fHeartTime -= _iLostTime;

    if(kData.fHeartTime < 0){
        addHeart++;
        kData.fHeartTime = fHeartChargeTime - kData.fHeartTime;
    }

    kData.iHeart += addHeart;

    if(kData.iHeart > iHeartChargeMax)
        kData.iHeart = iHeartChargeMax;

    networkManager.ForcedSaveData();
};