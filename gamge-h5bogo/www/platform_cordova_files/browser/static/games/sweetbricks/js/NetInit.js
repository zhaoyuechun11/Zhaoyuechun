//---------------네트워크초기실행-----------------------------------시작-------------------------------------
//=============================================================================
//	세이브 관련
//=============================================================================
var kData = new Data();
var clientData = new ClientData(); //상점용추가

var SAVE_TIME_INIT = 10;
var SAVE_VER = 1;
//LoadData();
//LoadDataInClient();//임시로 사용중


function Data(){
    this.iVer;
    //--뉴--
    //this.curLevel;
    //this.curPage;
    //this.userStarArray;
    //this.userScoreArray;
    //this.tutorialpoint;
    //--뉴--
    this.iHeart;     //하트갯수
    this.fHeartTime; //하트충전시간
    this.greappoint;
    this.bSoundBGM;
    this.bSoundSE;
    this.iSaveTimeStamp;

    // this.itemreverse; //아이템
    // this.itemfog; //아이템
    // this.itembomb; //아이템
    this.WinCnt;
    this.CumulMedal;
    this.DayMedal;
    this.ITEM_1;
    this.ITEM_2;
    this.ITEM_3;

    this.btn1TimeStamp;
    this.btn2TimeStamp;

    this.userData;
    this.userDataPage;
    //this.userDataScore;
    this.openedBak;


}
function ClientData() {
    // this.bSoundBGM;
    // this.bSoundSE;
    // this.iSaveTimeStamp;
    // this.btncooltime;//AD쿨타임자동저장
}

function InitData()
{
    kData.iVer = SAVE_VER;
    //--뉴--
    //kData.curLevel=0;
    //kData.curPage=0;
    //kData.userStarArray = new Array(LEVEL_MAX);
    //for (var i = LEVEL_MAX-1; i >= 0; -- i) kData.userStarArray[i] = -1;
    //kData.userStarArray[0]=0; //0레벨 오픈
    //kData.userScoreArray = new Array(LEVEL_MAX);
    //for (var i = LEVEL_MAX-1; i >= 0; -- i) kData.userScoreArray[i] = 0;
    //kData.tutorialpoint=0;        //0단계
    //--뉴--
    //if(iHeartInitData === 0) iHeartInitData=20;
    kData.iHeart = iHeartInitData;
    kData.fHeartTime = fHeartChargeTime;
    kData.greappoint = 0;

    ////클라이언트데이타 사용할때
    // clientData.bSoundBGM = true;
    // clientData.bSoundSE = true;
    // clientData.iSaveTimeStamp = 0;
    // clientData.btncooltime=[0,0,0,0]; //AD쿨타임자동저장

    ////클라이언트데이타 사용안할때, 서버에 저장
    kData.bSoundBGM = true;
    kData.bSoundSE = true;
    kData.iSaveTimeStamp = 0;

    // kData.itemreverse=3; //아이템
    // kData.itemfog=3; //아이템
    // kData.itembomb=3; //아이템
    kData.ITEM_1=3;
    kData.ITEM_2=3;
    kData.ITEM_3=3;

    kData.btn1TimeStamp=null; //서버스탬프포맷으로 저장어야 함
    kData.btn2TimeStamp=null;

    kData.userData = []; //in initData //로컬모드에서 여기서 초기화된다
    for (var i = LEVEL_MAX-1; i >= 0; -- i) kData.userData[i] = -1;
    kData.userData[0]=0; //0레벨 오픈
    kData.userDataPage = []; //in initData //로컬모드에서 여기서 초기화된다
    //var curpageidx = Math.floor(curLevel / LV4x4); //0,1,2,3
    //var curpage = Math.floor(curLevel / LV4x4) + 1; //0,1,2,3 -->1,2,3, 하려고 +1
    var maxpage = Math.floor(LEVEL_MAX / LV4x4);
    for (var i =  maxpage-1; i >= 0; -- i) {
        kData.userDataPage[i] = -1;
    }
    kData.userDataPage[0]=1;

    kData.openedBak=0;

    SaveOnlyClientData();//여기선 빈데이터 저장

    if(nvmode===false) {
        networkManager.ForcedSaveData(); //in initdata
    }


}

function InitOnlyClientData(){ //in LoadDataInClient
    ////클라이언트데이타 사용할때만 주석풀기
    // clientData.bSoundBGM = true;
    // clientData.bSoundSE = true;
    // clientData.iSaveTimeStamp = 0;
    // clientData.btncooltime=[0,0,0,0];//AD쿨타임자동저장
    
    SaveOnlyClientData();
}

//function SaveData()
function SaveDataInClient(_bGetTime) //로컬저장 예)사운드온오프시 저장 //gamemain.js 에서 예전savedata대용으로 막사용한다.
{
    return;

    // //서버데이터,클라데이터불리될때 사용,
    // //var strJson = JSON.stringify(kData);
    // var strJsonClientData = JSON.stringify(clientData);
    // localStorage.setItem('RivalRacing_ClientData.grape.co.kr', strJsonClientData); //저장
    // if(dm) console.log('SaveDataInClient');
    // if(dm) console.log(strJsonClientData);
    //
    // saveLocal('CosmicPop_kdata.gamegrape.co.kr');
    // //$.cookie('Neo_Neglect.gamegrape.co.kr', strJson, {expires: 9999});

    //if(yahooIN == undefined) {//야후추가
        //-----new---------
        if (loginTF == 0) { //비로그인
            if (_bGetTime !== undefined && _bGetTime != null && !_bGetTime) {
                var strJson = JSON.stringify(kData);
                var strJsonClientData = JSON.stringify(clientData);

                localStorage.setItem('SweetBricks.gamegrape.co.kr', strJson);
                localStorage.setItem('SweetBricks_ClientData.gamegrape.co.kr', strJsonClientData);
            } else {
                networkManager.GetServerTime(function (_time) {
                    clientData[TIME_STAMP] = _time;
                    kData.iSaveTimeStamp = _time; //rb,.//비로그인
                    var strJson = JSON.stringify(kData);
                    var strJsonClientData = JSON.stringify(clientData);

                    localStorage.setItem('SweetBricks.gamegrape.co.kr', strJson);
                    localStorage.setItem('SweetBricks_ClientData.gamegrape.co.kr', strJsonClientData);
                });
            }
        } else { //로그인상태
            var strJson = JSON.stringify(kData);
            var strJsonClientData = JSON.stringify(clientData);

            localStorage.setItem('SweetBricks.gamegrape.co.kr', strJson);
            localStorage.setItem('SweetBricks_ClientData.gamegrape.co.kr', strJsonClientData);

            //rb,.
            //networkManager.GetServerTime(function (_time) {
                //kData.btn1TimeStamp = _time-10; //rb,.
                //kData.btn2TimeStamp = _time-50; //rb,.
            //});
            //rb,.
        }


        saveLocal('SweetBricks.gamegrape.co.kr');
    //}//야후추가
    //-----new---------
}

function LoadDataInClient(){
    return;
    //if(yahooIN == undefined) {//야후추가
        var strJson = localStorage.getItem('SweetBricks.gamegrape.co.kr');
        var strJsonClientData = localStorage.getItem('SweetBricks_ClientData.grape.co.kr'); //로드
        if (strJsonClientData != null) {
            clientData = JSON.parse(strJsonClientData);
        }
        if (strJson != undefined) {
            kData = JSON.parse(strJson);
            if (kData.iVer === undefined || kData.iVer != SAVE_VER) // 버젼이 없거나 버젼이 다르면 세이브를 초기화 시킨다.
                InitData();
        } else {
            InitData();
        }
    //}//야후추가
    // if(dm) console.log('LoadDataInClient-->');
    // if(dm) console.log(strJson);
    // if(dm) console.log(strJsonClientData);

    // //치트코드 -- 모든레벨 오픈 in LoadDataInClient
    // kData.userData = []; //LoaddDtaInClient cheatmode
    // for (var i = LEVEL_MAX-1; i >= 0; -- i) kData.userData[i] = 3;
    // kData.userData[LEVEL_MAX-1]=0; //0레벨 오픈
    // networkManager.ForcedSaveData();
    // //치트코드 -- 모든레벨 오픈 in LoadDataInClient


}

function SaveOnlyClientData() //networkManager.GetServerTime용 콜백속에 //in InitData //in InitOnlyClientData
{
    return;
    //if(yahooIN == undefined) {//야후추가
        var strJsonClientData = JSON.stringify(clientData);
        localStorage.setItem('SweetBricks_ClientData.grape.co.kr', strJsonClientData);//저장

        if (dm) console.log('SaveOnlyClientData');
        if (dm) console.log(strJsonClientData);
    //}//야후추가
}
function LoadOnlyClientData() { //gamemain.js->cbLogoComplete()안에서 networkManager.LoadData용 콜백속에
    return;
    //if(yahooIN == undefined) {//야후추가
        var strJson = localStorage.getItem('SweetBricks_ClientData.grape.co.kr'); //로드

        if (strJson == null)
            InitOnlyClientData();
        else
            clientData = JSON.parse(strJson);
    //}//야후추가
}
//---------------------------------------------------

//--네이버대응-------------
var SaveDataAll =
    "iVer,"
    +"iHeart,"
    +"fHeartTime,"
    +"greappoint,"
    +"iSaveTimeStamp,"
    +"ITEM_1,"
    +"ITEM_2,"
    +"ITEM_3,"
    +"btn1TimeStamp,"
    +"btn2TimeStamp,"
    +"userData,"
    +"userDataPage,"
    +"openedBak";

function cbGamePocketSdkrefresh(data)
{
    networkManager.AppDataGet(SaveDataAll, function(data){
        if(data.code === undefined) {
            if (data.iVer === undefined) {
                InitData();
                networkManager.AppDataPut(JSON.stringify(kData), update);
            } else {
                // 버젼에 따른 마이그레이션 작업이 있어야 함.
                kData = data;
                //---------------------
                kData.iVer = parseInt(data.iVer);
                kData.iHeart = parseInt(data.iHeart);
                kData.fHeartTime = parseInt(data.fHeartTime);
                kData.greappoint = parseInt(data.greappoint);
                kData.iSaveTimeStamp = parseInt(data.iSaveTimeStamp);
                kData.ITEM_1=parseInt(data.ITEM_1);
                kData.ITEM_2=parseInt(data.ITEM_2);
                kData.ITEM_3=parseInt(data.ITEM_3);
                kData.btn1TimeStamp=null; //서버스탬프포맷으로 저장어야 함
                kData.btn2TimeStamp=null;
                kData.openedBak=parseInt(data.openedBak);
                //---------------------

                GetLifeTime(); // 로컬시간을 가져온다.in cbGamePocketSdkrefresh

                Time2Heart();//in cbGamePocketSdkrefresh

                update();
                // networkManager.RankingGet(function (_data) { kData.score=_data.score;
                //          console.log("get score: "+_data.score);
                //      }
                // ); //RankingGet
            } //data.iVer가 있으면
        }else{
            InitData();
            update();
        }
        if(bPhone == true) {
            kData.bSoundBGM = false;
            kData.bSoundSE = false;
        }
        //치트코드 //16까지
        //치트배치
        //치트코드 //16까지//개발치트//개발자치트

    });
}
//--네이버대응-------------

//서버에서 시작시자동다운받기

var whereServerNet = 100;//default localhost //var NET_STATE = {//if(link.indexOf('localhost') != -1){
$(document).ready(function(){ //초기데이터가져오기

    if(nvmode===true) {
        //--네이버대응-------------
        if (document.location.href.indexOf('localhost') == -1) {
            networkManager.refresh(cbGamePocketSdkrefresh);
        }
        else {
            GetLifeTime();
            InitData();//로컬호스트용 초기화
            update();
        }
        networkManager.networkState = NET_STATE.LOCALHOST;
        //--네이버대응-------------
    }else {

        networkManager.networkState = NET_STATE.LOCALHOST;
        if(networkManager.networkState != NET_STATE.LOCALHOST){
            //상점리스트가져오기//로그인상태 상관없이
            networkManager.GetShoplist(ShopType.HEART, function () { });

            networkManager.GetGameInfo(function (_data) {
                //초기서버데이터받기
                iHeartChargeMax = _data['baseHeart']; //현서버 5 //하트컨트롤러안에
                iHeartInitData = _data['initHeart'];  //현서버 5
                fHeartChargeTime = _data['Heartrefill']; //현서버 1200 //하트컨트롤러안에

                //비로그인일경우
                if(iHeartInitData < 20) iHeartInitData=20;//하트치트
                kData.iHeart = iHeartInitData; //하트치트
                kData.fHeartTime =  fHeartChargeTime;

                if(kData.iHeart<20) kData.iHeart=20;//하트치트
                // if(loginTF == 0) //비로그인
                //     LoadDataInClient();`

                update();
                if(!dm) console.log("update() started in networking");

                networkManager.GetShoplist(ShopType.HEART, function () { });

                //서버에서 저장데이터 가져오기
                networkManager.LoadData(function () {
                    //LoadOnlyClientData();

                    //언어변경 한글,일어,영어
                    /*if(lang == 'ko') CURRENT_LANGUAGE = LANGUAGE_KOR;
                    else if(lang == 'ja') CURRENT_LANGUAGE = LANGUAGE_JPN;
                    else if(lang == 'en') CURRENT_LANGUAGE = LANGUAGE_ENG;
                    else CURRENT_LANGUAGE=LANGUAGE_ENG;*/
                    CURRENT_LANGUAGE=LANGUAGE_ENG;

                    if(typeof(kData.userData) === 'undefined' //예외처리
                    || kData.userData.length<1) {
                        kData.userData = []; //in initData
                        for (var i = LEVEL_MAX - 1; i >= 0; --i) {
                            kData.userData[i] = -1;

                        }
                        kData.userData[0] = 0; //0레벨 오픈
                    }
                    if(typeof(kData.userDataPage) === 'undefined' //예외처리
                    || kData.userDataPage.length<1) {
                        kData.userDataPage = []; //in initData //로컬모드에서 여기서 초기화된다
                        //var curpageidx = Math.floor(curLevel / LV4x4); //0,1,2,3
                        //var curpage = Math.floor(curLevel / LV4x4) + 1; //0,1,2,3 -->1,2,3, 하려고 +1
                        var maxpage = Math.floor(LEVEL_MAX / LV4x4);
                        for (var i = maxpage - 1; i >= 0; --i) {
                            kData.userDataPage[i] = -1;
                        }
                        kData.userDataPage[0] = 1;
                    }

                    if(typeof(kData.bSoundBGM) === 'undefined') {
                        kData.bSoundBGM = true;
                        kData.bSoundSE = true;
                    }


                    console.log("networkManager.LoadData() is done");

                    if(typeof(kData.iHeart) === 'undefined')//비로그인상태일때
                        kData.iHeart = iHeartInitData;

                    var test = "test";
                });
                //서버에서 저장데이터 가져오기


                //SaveDataInClient();//rb,.

            });

        }

    }

    //임시 로컬 실행 모드


    if(networkManager.networkState == NET_STATE.LOCALHOST){
        if(nvmode==false) {
            InitData(); //로컬모드에서는 시작시 초기화
            LoadDataInClient();
            update();
            kData.iHeart = iHeartInitData;

            if (dm) console.log("update() started in local");
        }
        lang='en';
    }
    //임시 로컬 실행 모드
    
    //kData.iHeart = 99;//임시하트처리채움


    if(nvmode===false) {
        //회원가입유도
        if (loginTF == 1) {                                          //로그인상태
            if (proto.serPos == 0) {                                   //모비서비스
            }
        }
        else//if(loginTF == 0){ //비로그인
        {
            if (networkManager.networkState == NET_STATE.LOCALHOST) {//로컬서비스

            } else {//비회원
                // networkManager.ModalCall(MODAL_BUTTON_TYPE.OKCANCEL, GetShpMsg('signup'),
                //     function () {
                //         networkManager.JoinMember();
                //     },
                //     function () {
                //
                //     }
                // );
            }
        }
    }



}); //.ready
var isMobile = -1;
window.onload = function () {//$(document).ready();보다 빠르게 나온다, 검색해보면 늦게 나온다고 하는데
    isMobile=navigator.userAgent.indexOf("Mobile");
    if (isMobile===-1){
        //alert("desktop mode(onload)");
    }else{
        //alert("mobile mode(onload)");
    }
};

//=============================================================================
// 타이머 관련
//=============================================================================
var tickNow;
var tickLast = Date.now();
var deltaTime = 0;



function updateTick()
{
    tickNow = Date.now();
    deltaTime = (tickNow - tickLast) * 0.001;
    tickLast = tickNow;
}

//계속업데이트
var state=undefined;

var curDate;
var passedSec;
var remainSec;
var remainStr;
var remainText1=undefined;
var remainText1inmenu;
var remainText1ingame;
var remainText2=undefined;
var remainText2inmenu;
var remainText21ingame;

var btnTimerInterval = setInterval(btnTimer, 1000);//clearInterval(btnTimerInterval);
function btnTimer() {
    //if( kData.btn1TimeStamp!==undefined //초기화전
    if(typeof(kData) !== 'undefined'
    && typeof(kData.btn1TimeStamp) !== 'undefined'
    && kData.btn1TimeStamp!==null) //초기화후
    {
        //로컬에서 현재시간을 받을경우 1
        curDate = Date.now();
        passedSec = (parseInt(curDate.toString().substring(0, 10))-kData.btn1TimeStamp);

        // //서버에서 현재시간을 다시 받을 경우 2 (1초마다 받아야 하므로)
        // networkManager.GetServerTime(function (_time) { passedSec = _time-kData.btn1TimeStamp; });

        //나머지시간 = 충전만땅시간 - 지나간시간
        remainSec = (fHeartChargeTime) - passedSec;
        //0이하면 초기화
        if(remainSec<=0){
            remainSec=0;
            kData.btn1TimeStamp=null;
        }
        //00:00형식으로
        remainStr = convertTimeFormatFromSec(remainSec);
        //텍스트가 활성화면 업데이트
        if(uishopinmenu && typeof(remainText1inmenu)!=='undefined') {
            remainText1 =  remainText1inmenu
        }
        if(!uishopinmenu && typeof(remainText1ingame)!=='undefined'){
            remainText1 =  remainText1ingame
        }
        if(remainText1!==undefined && remainText1.visible) {
            remainText1.text = remainStr;
        }

        //00:00을 보여주고 충전처리(서버에서처리하므로)
        if(kData.btn1TimeStamp===null){
            networkManager.ForcedSaveData(); //in btnTimer
            setTimeout(
                function () {
                    uigame.state.states.menu.uishop.slots[2].btnon();
                    uigame.state.states.menu.uishopplus.onRefresh();
                },
                500
            );
        }
    }
    if(typeof(kData) !== 'undefined'
    && typeof(kData.btn2TimeStamp) !== 'undefined'
    && kData.btn2TimeStamp!==null //초기화후
    ){
        //로컬에서 현재시간을 받을경우 1
        curDate = Date.now();
        passedSec = (parseInt(curDate.toString().substring(0, 10))-kData.btn2TimeStamp);

        // //서버에서 현재시간을 다시 받을 경우 2 (1초마다 받아야 하므로)
        // networkManager.GetServerTime(function (_time) { passedSec = _time-kData.btn2TimeStamp; });

        //나머지시간 = 충전만땅시간 - 지나간시간
        remainSec = (fHeartChargeTime) - passedSec;
        if(remainSec<=0){
            remainSec=0;
            kData.btn2TimeStamp=null;
        }
        //00:00형식으로
        remainStr = convertTimeFormatFromSec(remainSec);
        //텍스트가 활성화면 업데이트
        if(uishopinmenu && typeof(remainText1inmenu)!=='undefined') {
            remainText2 =  remainText2inmenu
        }
        if(!uishopinmenu && typeof(remainText1ingame)!=='undefined'){
            remainText2 =  remainText2ingame
        }
        if(remainText2!==undefined && remainText2.visible) {
            remainText2.text = remainStr;
        }

        //00:00을 보여주고 충전처리(서버에서처리하므로)
        if(kData.btn2TimeStamp===null){
            networkManager.ForcedSaveData(); //in btnTimer
            setTimeout(
                function () {
                    uigame.state.states.menu.uishop.slots[3].btnon();
                    uigame.state.states.menu.uishopplus.onRefresh();
                },
                500
            );
        }
    }
}

function update() {
     //상점용도
    if(heartController != null)
        heartController.Update();
    if(networkManager != null)
        networkManager.Update();
    // //상점용도
    // if(sHeartShop.onInitialized) {
    //     sHeartShop.twcooltime.onUpdateCoolTimer();
    //     //console.log();
    // }
    if(mode20sec) {
        timer20sec-=deltaTime;
        //console.log("timer20sec: "+timer20sec);
    }

    updateTick(); //tickNow를 처리

    UpdateLifeTime();
    requestAnimationFrame(update);//가장빠른업데이트
}
// setInterval(function () {
//     requestAnimationFrame(update);//1초단위업데이트
// }, 1000);

//---------------네트워크초기실행-----------------------------끝----------------------------------


var tbShpMsg_json = "{\"signup\":{\"en\":\"Members only!<br/>Would you like to go to the sign up page?\",\"jp\":\"会員専用<br/>会員登録をしますか?\",\"kr\":\"회원전용!<br/>회원가입 하시겠습니까?\"},\"gotogpg\":{\"en\":\"Only available in the Moby Games app.<br/>Would you like to go to the Moby Games app?\",\"jp\":\"モビーゲームアプリのみ購入で きます。<br/>モビーゲームアプリに移動しますか？\",\"kr\":\"모비게임 앱에서만 구매 가능합니다.<br/>모비게임 앱으로 이동하시겠습니까?\"},\"lowpoint\":{\"en\":\"Not enough points!\",\"jp\":\"ポイントが足りません!\",\"kr\":\"포인트가 부족합니다!\"}}";
var tbShpMsg = JSON.parse(tbShpMsg_json);

function GetShpMsg(key, data)
{
    if(data === undefined) data = null;
    switch(CURRENT_LANGUAGE)
    {
        case LANGUAGE_ENG:
            if(data == null)
                return tbShpMsg[key].en.replace(/{E}/gi, "\n");
            else
                return tbShpMsg[key].en.replace("{V}", data.toString()).replace(/{E}/gi, "\n");
            break;
        case LANGUAGE_JPN:
            if(data == null)
                return tbShpMsg[key].jp.replace(/{E}/gi, "\n");
            else
                return tbShpMsg[key].jp.replace("{V}", data.toString()).replace(/{E}/gi, "\n");
            break;
        case LANGUAGE_KOR:
            if(data == null)
                return tbShpMsg[key].kr.replace(/{E}/gi, "\n");
            else
                return tbShpMsg[key].kr.replace("{V}", data.toString()).replace(/{E}/gi, "\n");
            break;
    }

    return "";
}



var bPhone;	// 폰인지 아닌지 체크.
if (/Android/i.test(navigator.userAgent)) {
    bPhone = true;
} else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    bPhone = true;
} else {
    bPhone = false;
}

// 윈도우창 포커스가 돌아올때 처리 사운드 관련 처리를 해준다.------------------------------------
/*
 abort: 이미지 로딩이 중단될 경우 실행된다.
 blur: 엘리먼트가 입력 포커스를 잃어버릴 경우 실행된다.
 change: 폼 엘리먼트가 포커스를 잃고 값이 변경될 경우 실행된다.
 click: 마우스 버튼이 눌렸다 떼어질 때 실행된다. mouseup 이벤트가 이어서 발생한다. 기본 동작 방식을 취소하려면 false를 반환한다.
 dblclick: 마우스가 더블클릭될 때 실행된다.
 error: 이미지 로딩 오류가 일어날 경우 실행된다.
 focus: 엘리먼트가 입력 포커스를 얻을 경우 실행된다.
 keydown: 키가 눌렸을 때 실행된다. 취소하려면 false를 반환한다.
 keypress: 키가 눌렸을 때 실행된다. keydown 이벤트가 이어서 발생한다. 취소하려면 false를 반환한다.
 keyup: 키에서 손을 뗐을 때 실행된다. keypress 이벤트가 이어서 발생한다.
 mousedown: 마우스 버튼이 눌렸을 때 실행된다.
 mousemove: 마우스가 이동할 경우 실행된다.
 mouseout: 마우스가 엘리먼트에서 벗어났을 때 실행된다.
 mouseover: 마우스가 엘리먼트 위로 이동할 때 실행된다.
 mouseup: 마우스 버튼에서 손을 뗐을 때 실행된다.
 resize: 윈도우 크기가 변경될 경우 실행된다.
 select: 텍스트가 선택됐을 때 실행된다.
 reset: 폼 초기화가 요청됐을 때 실행된다. 초기화를 방지하려면 false를 반환한다.
 submit: 폼 제출이 요청됐을 때 실행된다. 제출을 방지하려면 false를 반환한다.
 load: 문서 로딩이 완료됐을 때 실행된다.
 unload: 문서나 프레임셋이 사라졌을 때 실행된다.
 */
window.addEventListener('focus', function() {
    //SoundResume();
    kData.bSoundSE = bSoundSE_bak;
    kData.bSoundBGM = bSoundBGM_bak;
    if(BGM_ALL===undefined) return;
    if(game.state.states[game.state.current] == "menu") { //게임스테이트검사

        selectBGM(curBGM, true); //"BGM_ALL" "BGM_Game_Nomal" "BGM_Game_Ranking"
        //if(BGM_ALL!=undefined) {
        //    BGM_ALL.mute=false;
        //}
    }else{

        selectBGM(curBGM, true); //"BGM_ALL" "BGM_Game_Nomal" "BGM_Game_Ranking"
        //if(BGM_Game_Nomal!=undefined) {
        //    BGM_Game_Nomal.mute=false;
        //}
    }
    if(dm) console.log("focused");

}, false);

// 윈도우창을 닫을때 이벤트.
window.addEventListener('blur', function() {
    //SoundPause();
    bSoundSE_bak = kData.bSoundSE;
    bSoundBGM_bak = kData.bSoundBGM;
    kData.bSoundSE = false;
    kData.bSoundBGM = false;

    if(BGM_Game_Nomal!=undefined) BGM_Game_Nomal.mute=true;
    if(BGM_ALL!=undefined) BGM_ALL.mute=true;
    //uigame.state.states.game.uiController.uipause.dlgbg9.btnsound.icon.visible = true; //사운드끄기 상태표시
    if(game.state.states[game.state.current] == "menu") { //게임스테이트검사
        uigame.state.states.menu.uiselectlevel.dlbg.uisoundonoff.icon.visible = true; //사운드끄기 상태표시
    }
}, false);
//---------------로컬타이머용-----------------------------------
var SAVE_LIFE_TIME_INIT = 5; // 5초에 한번씩 세F이브를 한다.
var fLifeTime = SAVE_LIFE_TIME_INIT;

var kData2 = new Data2();
var kData2get = new Data2();
//lifeTime: 1505837136463
//lastTick: 2.1169999999999947

function Data2(){
    this.lifeTime = fHeartChargeTime;  // 남은시간 총맥스시간 //초기화
    this.lastTick = 0; // 저장된 시간//
}

function GetLifeTime(){
    var strJson = localStorage.getItem('com.movigame.naver_sweetbrick');
    if(strJson != undefined)
        kData2get = JSON.parse(strJson);
    else
        kData2get = undefined;
}

function SetLifeTime(){

    kData2.lifeTime = kData.fHeartTime;
    kData2.lastTick = Date.now();

    var strJson = JSON.stringify(kData2);
    localStorage.setItem('com.movigame.naver_sweetbrick', strJson);
}

function UpdateLifeTime(){
    fLifeTime -= deltaTime; //5초 차감뒤 저장
    if(fLifeTime <= 0){
        fLifeTime = SAVE_LIFE_TIME_INIT;
        SetLifeTime();
    }

    //테스트
    //GetLifeTime();
    //테스트
}
function Time2Heart() {
//-----로컬타이머 보정하기---------------
    if (kData2get != undefined) {
        //예제
        //var kData2get = new Data2();
        //kData2get.lifeTime: 1505837136463
        //kData2get.lastTick: 2.1169999999999947
        //kData2get.lifeTime: 300
        //kData2get.lastTick: 1506581180965

        //현재시간
        var curDateA = Date.now();
        var curDateB = parseInt(curDateA.toString().substring(0, 10));
        //저장시간
        var oldDateB = parseInt((kData2get.lastTick).toString().substring(0, 10));
        //var oldDateB = parseInt((kData2get.lifeTime).toString().substring(0, 10));
        //지나간시간
        var passedSec = curDateB - oldDateB;
        var remainSec;
        //                 충전잔여시간       -흘러간시간
        var displaytime;// = parseInt(kData2get.lifeTime) - passedSec;

        if(kData2get.lifeTime>passedSec){//하트1개충전도 안되는경우
            displaytime = parseInt(kData2get.lifeTime) - passedSec;
        }else{                           //하트1개이상 충전이 된경우
            displaytime = passedSec - parseInt(kData2get.lifeTime);
        }        //var displaytime = passedSec - kData2get.lastTick;
        //if(kData2get.lifeTime - passedSec);
        //fHeartChargeTime
        //if (0 < displaytime) { //잔여시간
            //충전시간보다 더 많이 흘
            if (fHeartChargeTime < displaytime) {
                var count = Math.floor(displaytime / fHeartChargeTime); //충전하트갯수
                if(kData.iHeart<iHeartChargeMax) {//} = 10;
                    //kData.iHeart += count; 하트보상
                    if(kData.iHeart>iHeartChargeMax) { //최대치초과방지
                        kData.iHeart=iHeartChargeMax;
                        kData.fHeartTime = fHeartChargeTime;
                    }else{//최대치 미만
                        kData.fHeartTime = displaytime%fHeartChargeTime;
                    }
                }else{//이미최대시도달
                    kData.fHeartTime = fHeartChargeTime;
                }
                var sends = {};
                sends.iHeart = kData.iHeart;//네이버저장하기
                if (typeof GamePocket.Sdk !== 'undefined') networkManager.AppDataPut(JSON.stringify(sends));
            }
            else {//1개충전도 안된 시간
                if(kData.iHeart<iHeartChargeMax) { //충전최대치가 미만이면
                    kData.fHeartTime = displaytime;
                }else{
                    kData.fHeartTime = fHeartChargeTime;
                }
            }
        // } else { //보상시간
        //     //하트보상 갯수충전
        //     var addHeart = Math.floor(Math.abs(displaytime) / fHeartChargeTime);
        //     var remainpiec = Math.abs(displaytime) % fHeartChargeTime;
        //     var remainrev = fHeartChargeTime - remainpiec;
        //     //var addHeart = Math.floor(passedSec/fHeartChargeTime);
        //     //if(addHeart+kData.iHeart>iHeartInitData){ //아직쓸때가없음
        //     if (addHeart < iHeartChargeMax) {
        //         kData.iHeart += addHeart;
        //         if (kData.iHeart > iHeartChargeMax) kData.iHeart = iHeartChargeMax;
        //     }
        //     kData.fHeartTime = remainrev;
        //
        //     var sends = {};
        //     //초기 하트값이 없을경우 예외
        //     if( typeof kData === 'undefined' || typeof kData.iHeart === 'undefined') return;
        //
        //     sends.iHeart = kData.iHeart;//네이버저장하기
        //     if (typeof GamePocket.Sdk !== 'undefined') networkManager.AppDataPut(JSON.stringify(sends));
        //     //광고버튼시에 활성화
        //     //remainSec=0;
        //     //kData.btn1TimeStamp=null;
        // }
        //var remainStr = convertTimeFormatFromSec(remainSec);//00:00형식으로
        //kData.fHeartTime = kData2get.lastTick;
    }//(kData2get != undefined)
//-----로컬타이머 보정하기---------------
}


//$(window).resize(resize);	// jquery를 사용한다.
//window.onorientationchange = resize; // 화면이 리사이즈되면 리사이즈 함수를 콜한다.
var first_resize = true;
var inw;
var inh;

var ddtx=undefined;

var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
var _iOSDevice = !!navigator.platform.match(/iPhone|iPod|iPad/);
var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

//디버그 dddd
var boottxt="";
//
// boottxt +="\n";
// boottxt +=("iOS:"+iOS+",");
// boottxt +=("ios2:"+_iOSDevice+",");
// boottxt +=("chrome:"+is_chrome+",");
// boottxt +="\n";
//디버그 dddd

//리사이즈 call 처음 불규칙으로 호울되므로
// 브라우저에 따라 1회(크롬)~ 2회(사파리,크롬)
// 콜을 처음시작시점, 막아서 ios에서 회전경고창 문제 해결하려고
var beginResize = false;

$( window ).resize(function() {
    if(beginResize===false) return;

    // //디버그 dddd
    // boottxt +=" rsz ";
    // if(typeof uigame !== 'undefined') {
    //     var dddd =
    //         "xxx\nfirst_width:" + first_width//
    //         + "\nfirst_height:" + first_height
    //
    //         + "\n.innerWidth:" + window.innerWidth
    //         + "\n.innerHeight:" + window.innerHeight
    //
    //         + "\nw.width():" + $(window).width()
    //         + "\nw.height():" + $(window).height()
    //
    //         + "\nisPotrait:" + isPotrait
    //
    //         + "\nseq:"+boottxt
    //
    //     if(ddtx!=undefined) {
    //         ddtx.text = dddd;
    //     }
    // }
    // //디버그 ddddd

    inw = $(window).width(); //retrieve current window width
    inh = $(window).height(); //retrieve current window height

    if(isPotrait === true)
    {
        inw = first_width; //retrieve current window width
        inh = first_height; //retrieve current window height

        var ratio = parseFloat(inh / inw);
        var ratio_w = parseFloat(inw / GAME_WIDTH);
        var ratio_h = parseFloat(inh / GAME_HEIGHT);

        game.scale.setUserScale(ratio_w, ratio_h);

        isPotrait = false;

        //if(typeof uigame === 'undefined'
        //    && uigame.device.desktop  === false) {
            if(bPhone) {
                document.getElementById("turn").style.display = "block";
            }
        //}
    }
    else
    {
        isPotrait = true;
        document.getElementById("turn").style.display = "none";

    }







    // if(document.getElementById("turn").style.display === "none")
    //     document.getElementById("turn").style.display = "block";
    // else
    //     document.getElementById("turn").style.display = "none";
    //$( "body" ).prepend( "<div>" + $( window ).width() + "</div>" );
});
