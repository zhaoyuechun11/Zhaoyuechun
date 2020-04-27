/** NetworkMnager v0.2.11
 * 현제 가능한 기능
 * 데이터 세이브, 로드
 * 랭킹 세이브, 로드
 * 하트 사용
 * 상점관련 작업
 * ============================= 업데이트 내역 =============================
 * v.0.1.1
 * 네트워크 호출 전 sTopContainer를 최상단 컨테이너로 적용할 수 있도록 작업
 * 현금 제화쪽에서 ForcedSave를 연속으로 사용하여 저장 할 수 있도록 작업
 * v.0.1.2
 * 량킹중 allrank 부분쪽 랭크업 표시를 위한 데이터 작업
 * v.0.2.0
 * 하트관련 작업              networkManager.UseHeart( useHeartCount , callbakcFunc)
 * 상점 리스트 불러오기       networkManager.GetShoplist ( type -> ShopType 중 하나 , callbackFunc)
 * 상점 구매                  networkManager.Payment(  mkidx -> 상점리스트에 있음, callbackFunc)
 * v.0.2.1
 * greap 포인트 관련 지정
 * v.0.2.2
 * 서버 시간 받아오기
 * v.0.2.3
 * ForceSaveData 부분 에러 수정
 * v.0.2.4
 * Payment -> 앞단에 세이브를 안하고 있어서 ForceSaveData 를 호출 한 뒤
 * payment의 콜백을 실행
 * v0.2.5
 * this 부분 networkManager 로 수정
 * v0.2.6
 * (콜백 되는 함수들 undefined 거나 null 이면 무시 했엇는데 함수를 한 번 더 호출하면 콜백 함수가 발생.)
 * undefined 거나 null 일 때도 콜백 함수 null 처리
 * v0.2.7
 * clientData 내에 TIME_STAMP 관련 수정 -> 비로그인시만 체크 했었는데 로그인 시에도 AD관련 시간처리를 해야하기 때문에
 * kData 내에 calcedTimeStamp 변수 추가
 * SaveDataComplete, LoadDataComplete 부분 수정 됨
 * ex) heartController 의 UI가 마무리 되고 new 를 선언해 줄때 분기문으로 나누며 사용
 heartController = new HeartController();

 if(loginTF == 0) {
    networkManager.GetServerTime(function (_time) {
        if (clientData[TIME_STAMP] != null) {
            var lostTime = (_time - clientData[TIME_STAMP]);
            heartController.LostTime(lostTime);
        }

        clientData[TIME_STAMP] = _time;
        SaveOnlyClientData();
    });
}else{
    // 로그인 퇴어 있을 경우에는 하트는 받아오니 ADCoolTime만 정리
    for(var i=0,imax= kData.fCooltime_Heart.length;i<imax;++i){
        if(kData.fCooltime_Heart[i] > 0){
            kData.fCooltime_Heart[i] -= kData.calcedTimeStamp;
            // Gamemoney 데이터를 쓰는 경우
            // kData.fCooltime_Gamemoney[i] -= kData,calcedTimeStamp;

            if(kData.fCooltime_Heart[i] <= 0)
                kData.fCooltime_Heart[i] = 0;

            // Gamemoney 데이터를 쓰는 경우
            // if(kData.fCooltime_Gamemoney[i] <= 0)
            //    kData.fCooltime_Gamemoney[i] = 0;
        }
    }
}

 또한 client 내에 저장할 때 저장시간 체크를 위해 아래처럼 수정 되야 함
 function SaveDataInClient()
 {
     if(loginTF == 0){
         networkManager.GetServerTime(function (_time) {
             clientData[TIME_STAMP] = _time;

             var strJson = JSON.stringify(kData);
             var strJsonClientData = JSON.stringify(clientData);
             localStorage.setItem('Neo_Neglect.gamegrape.co.kr', strJson);
             localStorage.setItem('MomiMomiClientData.grape.co.kr', strJsonClientData);

             console.log('SaveDataInClient');
             console.log(strJsonClientData);

             saveLocal('Neo_Neglect.gamegrape.co.kr');
         });
     }else{
         var strJson = JSON.stringify(kData);
         var strJsonClientData = JSON.stringify(clientData);
         localStorage.setItem('Neo_Neglect.gamegrape.co.kr', strJson);
         localStorage.setItem('MomiMomiClientData.grape.co.kr', strJsonClientData);

         console.log('SaveDataInClient');
         console.log(strJsonClientData);

         saveLocal('Neo_Neglect.gamegrape.co.kr');
     }
 }
 * v0.2.8
 * Payment에 apkTF로 체크하여 분기
 * 변수 sGooglePlayJumpPanel 추가
 * v0.2.9
 * sGooglePlayJumpPanel 제거
 * modal call 작업
 * networkManager.ModalCall(MODAL_BUTTON_TYPE,string_MSG,okFunc,cancelFunc);
 * index.html 수정
 <link rel="stylesheet" href="/css/bootstrap.min.css" type="text/css" />  <--- 추가
 <script src="js_lib/jquery-3.1.1.min.js"></script>
 <script src="/js/bootstrap.min.js"></script>             <-- 추가
 ...
 <script src="js/GameMain.js"></script>
 <?php                                                  <-- 추가
 require_once('../../fs/modal.do');
 ?>
 * v0.2.10
 * JumpGooglePlay 함수 정리 완료
 * v0.2.11
 * GetGameInfo()
 * GetGameInfoComplete() 메쏘드 추가.
 * v0.2.12
 * NET_STATE 정리 작업 [LOCALHOST, RUN_SERVER]
 * v0.2.13
 * 라이벌 레이싱 관련 작업
 * (node.js 사용 실시간 게임 전용 Save, Load 수정)
 * ============================= 업데이트 예정 =============================
 * v0.2.13
 * RequestTimeOut 및 Request
 * =========================================================================
 * index.html에
 * NetworkManager.js를 먼저 로드하고
 * netbase.js를 로드 합니다.
 * ex)
 * <script src="js/NetworkManager.js"></script>
 * <script src=../add_js/netbase.js></script>
 * <script src="js/GameMain.js"></script>
 *
 * 위치 및 폴더 정리 (서버에 있는 거와 같은 위치인 상태로)
 * 상위폴더\WebContents\add_js\netbase.js                   [SFTP로 서버에서 받아오시면 됩니다.]
 * 상위폴더\WebContents\'게임이름폴더'\
 * ex)
 * GameData\add_js\
 * GameData\WebContents\Neo_NinjaClicker\
 *
 * 로컬스토리지에 저장,로드 함수명을 변경해주세요
 * ex)
 * SaveData ---(rename)---> SaveDataInClient
 * LoadData ---(rename)---> LoadDataInClient
 *
 * 세이브 초기화 단계에서 ForcedSaveData 함수 사용 하셔야 합니다.
 *
 * 본인이 사용하는 변수로 변경
 * kData
 * CASH_DATA_NAME
 * RANKVAL_DATA_NAME
 * HEART_COUNT
 * HEART_TIME
 * GREAP_POINT
 *
 *  클라 내부에 저장할 때
 *  saveLocal( 로컬스토리지 URL );
 *  도 같이 해줘야 합니다.
 *  
 *  MYGIDX 사용하는데 자신의 게임의 gidx를 넣어줘야함
 *  gidx는 netbase를 참조
 *  
 *  SaveDataComplete 함수에 있는
 *  this.LoadRanking(CB_ShowRanking);
 *  'CB_ShowRanking' 콜백 함수는 따로 만드셔서 작업하세요. (ranking데이터를 서버에서 다 받아오면 호출 합니다)
 *
 *  sNetworkLoading -> PIXI.Container
 *  서버 통신 중 버튼 못 누르게 제어하려는 panel (최상단) 입니다.
 *  리소스 작업할 때 작업해주시면 될거 같습니다.
 *  네트워크 호출 전에 sTopContainer에 최상단 컨테이너 넣어주세요
 *  sTopContainer에 기본은 null 이며 , null 값으로 유지시 sGame의 child로 되게 작업 되어 있습니다.
 *
 *  GameMain 로더 부분 수정 사항
 *  networkManager.LoadData(function () {
		// 이미지 다운로드.
        var loader = PIXI.loader;
        for(var i=0;i<tbImgGame.length;++i)
            loader.add(tbImgGame[i], tbImgGame[i]);
        .........
        loader.once('complete',cbImageDownComplete);
        loader.load();
    });
 * 위처럼 로딩 부분을 수정해 주셔야 합니다.
 *
 * sRanking 은 리소스 설정 단계에서.
 *
 * update에서
 if(networkManager !== undefined && networkManager != null)
 networkManager.Update();
 * 를 해주셔야 합니다.
 */

var GIDX = 17;//

var loginTF=0;

// kData 안에 현금재화 항목의 이름으로
// 클라에서 누적 시킨 뒤 서버에 저장
var CASH_DATA_NAME = 'iCash';

// kData 안에 랭킹점수 항목의 이름으로
// 클라에서 누적 시킨 뒤 서버에 저장
var RANKVAL_DATA_NAME = 'RankVal';

// kData 내부에 하트관련된 항목의 이름으로.
var HEART_COUNT = 'iHeart';
var HEART_TIME = 'fHeartTime';

// kData 내부의 Greap 포인트 항목
var GREAP_POINT = 'greappoint';

// kData 내부의 TimeStamp
var TIME_STAMP = 'timeSTAMP';


var ITEM1 = 'ITEM_1';
var ITEM2 = 'ITEM_2';
var ITEM3 = 'ITEM_3';

// netbase 참조하여 넣어줘야합니다.
var MYGIDX = 17; //벽돌깨기

// Server State Enum
var NET_STATE = {
    LOCALHOST : 100,
    DEV_SERVER : 200, // Dev,Test 둘 다
    TEST_SERVER : 300, // Dev,Test 둘 다
    RUN_SERVER : 400,
    NAVER_SERVER : 500
};

var ShopType = {
    HEART : 1,
    GAMEMONEY : 2
};

var MODAL_BUTTON_TYPE = {
    OKONLY : 1,
    OKCANCEL : 2
};

var networkManager = new NetworkManager();
//
// // 화면 닫을 시 강제 저장 --  조금 더 정보조사 필요
// $(window).bind("beforeunload" , function () {
//     console.log('quit Save Data');
//     if(proto.actk != null)
//         networkManager.ForcedSaveData();
// });

// 서버 통신 중 버튼 못 누르게 제어하려는 panel (최상단)
//var sNetworkLoading = new PIXI.Container();
var sNetworkLoading = undefined; //<-----페이저에서 indexgame.create단계에서 할당
/** sTopContainer는 통신하기 전에 설정해 주면 됩니다.
 * ex)
 sTopContainer = sTopContainer
 * netowkrManager.LoadData( callback );
 */
var sTopContainer = null;

/** 서버 통신 시작시 버튼 제어관련 */
function NetworkingWait() {
    return;
    // 메인 panel이 sGane 아닐 경우 변경
    // res 셋팅은 gameviewsetting 때 정리해준다.
    // proto 에 gidx 입력
    if(proto.gidx == 0 && networkManager.networkState == NET_STATE.TEST_SERVER){
        // 게임에 따라 다르게 설정해야함
        setGidx(MYGIDX);
    }

    if(sTopContainer === undefined || sTopContainer == null){
        if(sGame !== undefined && sNetworkLoading !== undefined){
            sGame.addChild(sNetworkLoading);
            if(whiteshopguard!=undefined) whiteshopguard.visible = true;
            networkManager.fSaveTimer = 0;
        }
    }else{
        sTopContainer.addChild(sNetworkLoading);
        if(whiteshopguard!=undefined) whiteshopguard.visible = true;
        networkManager.fSaveTimer = 0;
    }

    //sNetworkLoading.alpha = 0;
    //sNetworkLoading.visible = true;
}

/** 서버에서 통신 완료 */
function NetworkingEnd() {
    if(whiteshopguard!=undefined) whiteshopguard.visible = false;
    //sNetworkLoading.visible = false;
}

function NetworkManager(){
    this.networkState = NET_STATE.LOCALHOST;
    this.fSaveTimer = 0;
    this.fSaveTimeTick = 10;
    this.iSaveStackMax = 4;

    // 서버 호출 가능  : true;
    // 서버에서 호출 중 : false
    this.bAbleConnetingServer = true;
    this.saveStack = [];
    
    // 강제 저장관련 스택
    this.forcedSaveStack = [];
    this.isSaveRankVal = [];

    // 하트 소모관련
    this.bHeartUseCalled = false;
    this.heartUseStack = [];

    // 데이터 로드 관련
    this.bCalledDataLoading = false;
    this.loadDataStack = [];

    // modal cb func
    this.cb_ModalOK = null;
    this.cb_ModalCancel = null;

    var link = document.location.href;


    // 사용 서버 분기
    if(nvmode===true){
        this.networkState = NET_STATE.LOCALHOST;//강제 로컬//호스트
    }else{
        if(link.indexOf('localhost') != -1){//개발서버,데브서버,DEV서버판별
            this.networkState = NET_STATE.LOCALHOST;
            whereServerNet = NET_STATE.LOCALHOST;
            if(dm) console.log('localhost');
        }else if(link.indexOf('taeeset') != -1){
            this.networkState = NET_STATE.RUN_SERVER;
            whereServerNet = NET_STATE.TEST_SERVER;
            if(dm) console.log('TEST_SERVER');
        }else if(link.indexOf('dessav') != -1){
            this.networkState = NET_STATE.RUN_SERVER;
            whereServerNet = NET_STATE.DEV_SERVER;
            if(dm) console.log('DEV_SERVER');
        // }else if(link.indexOf('naver') != -1){
        //     this.networkState = NET_STATE.RUN_SERVER;
        //     whereServerNet = NET_STATE.NAVER_SERVER;
        //     console.log('NAVER_SERVER');
        }else{
            this.networkState = NET_STATE.RUN_SERVER;
            whereServerNet = NET_STATE.RUN_SERVER;
            if(dm) console.log('RUN_SERVER');
        }
        //강제로컬호스트 설정...지울것
        //this.networkState = NET_STATE.LOCALHOST;
    }




    /* privete method */
    var UploadData = function () {
        if(!networkManager.bAbleConnetingServer) return;

        NetworkingWait();
        networkManager.bAbleConnetingServer = false; //업로드시도, 서버통신중 모드로

        //cb_saveCompleteFunc = cb_func;

        if(networkManager.networkState != NET_STATE.RUN_SERVER) {
            // save data in local
            SaveDataInClient();
            networkManager.SaveDataComplete();
        }else{
            if(loginTF == 1){
                // 랭킹 정보는 저장하지 않습니다.
                var sendData = networkManager.saveStack.pop();
                savecall(sendData,null,kData[CASH_DATA_NAME]);
            }else{
                // 실서버 이면서 로그인이 되지 않았을 때
                SaveDataInClient();
                networkManager.SaveDataComplete();
            }
        }
    };

    var ForcedUploadData = function () {
        if(!networkManager.bAbleConnetingServer) return;

        NetworkingWait();
        networkManager.bAbleConnetingServer = false; //강제업로드시도, 서버통신중 모드로

        var SendData = networkManager.forcedSaveStack.pop();
        var b_isRankingSave = networkManager.isSaveRankVal.pop();

        if(networkManager.networkState != NET_STATE.RUN_SERVER){
            SaveDataInClient();
            networkManager.SaveDataComplete();
        }else{
            if(loginTF == 1){
                if(b_isRankingSave)
                    savecall(SendData,RANKVAL_DATA_NAME,kData[CASH_DATA_NAME]);
                else
                    savecall(SendData,null,kData[CASH_DATA_NAME]);
            }else{
                // 실서버 이면서 로그인이 되지 않았을 때
                SaveDataInClient();
                networkManager.SaveDataComplete();
            }
        }
    };

    /* public method */
    NetworkManager.prototype.Update = function () {
        if(!networkManager.bAbleConnetingServer) return;

        if(networkManager.bCalledDataLoading && networkManager.loadDataStack.length > 0){
            networkManager.bCalledDataLoading = false;
            networkManager.LoadData(networkManager.loadDataStack.pop());
        }else if(networkManager.bHeartUseCalled && networkManager.heartUseStack.length > 0){
            networkManager.UseHeart([0].use_Heart,networkManager.heartUseStack[0].cb_func);
        }else if(networkManager.forcedSaveStack != null && networkManager.forcedSaveStack.length > 0){
            ForcedUploadData();
        }else{
            if(networkManager.bAbleConnetingServer && networkManager.saveStack.length >= 1)
                networkManager.fSaveTimer += deltaTime;

            if(networkManager.saveStack.length >= networkManager.iSaveStackMax){
                networkManager.fSaveTimer = 0;
                UploadData();
            }else if(networkManager.fSaveTimer >= networkManager.fSaveTimeTick){
                // 방치형 게임이 아니면 제거
                // networkManager.fSaveTimer = 0;
                // UploadData();
            }
        }
    };

    // 2017-02-07 Save Callback Func은 없어도 될거라 생각하고 지움
    /** 일반적으로 서버에 세이브 하려할 때 호출
     * ====================== 업데이트 예정 ========================
     * 유저의 호출타이머를 따로 만들어서 save가 잦은 경우와 많지 않은 경우의 시간을 변경
     * =============================================================
     */
    NetworkManager.prototype.SaveData = function() {
        // 추가 세이브 데이터를 기다리기 위해 [통신 최적화]
        networkManager.fSaveTimer = 0;
        
        // 서버와 통신 중 세이브가 들어오면 무시함.
        // %필수 : 게임 종료 혹은 포커스를 잃었을 경우 세이브는 강제세이브로 따로 만들어야 할 듯
        if(networkManager.bAbleConnetingServer)
            networkManager.saveStack.push($.extend({}, kData));
    };

    /** 강제 네트워크 저장.
     * Init 단계 혹은 게임 강제 종료 단계
     * 랭킹 저장
     * 제화 구매 및 제화 사용
     * =================== 업데이트 예정 ===================
     * =====================================================
     * _b_saveRank : 랭킹 저장이 필요할 때 true 그외 null, 혹은 false
     * _cb_func : 콜백
     */
    var CB_ForcedSaveCompleteFunc = null;
    NetworkManager.prototype.ForcedSaveData = function (_b_saveRank,_cb_func) {
        if(_b_saveRank === undefined || _b_saveRank == null)
            _b_saveRank = false;

        if(_cb_func !== undefined && _cb_func != null)
            CB_ForcedSaveCompleteFunc = _cb_func;
        else
            CB_ForcedSaveCompleteFunc = null;

        if(!networkManager.bAbleConnetingServer){//상태:서버에서 호출 중
            networkManager.forcedSaveStack.push($.extend({}, kData));
            networkManager.isSaveRankVal.push($.extend({}, _b_saveRank));
            return; //when:로그인,
        }

        NetworkingWait(); //when:비로그인
        networkManager.bAbleConnetingServer = false; //강제저장시도, 서버통신중 모드로
        networkManager.fSaveTimer = 0;

        //cb_saveCompleteFunc = cb_func;

        if(networkManager.networkState != NET_STATE.RUN_SERVER) {
            // save data in local
            SaveDataInClient();
            networkManager.SaveDataComplete();
        }else{
            if(loginTF == 1){

                if(_b_saveRank)
                    savecall(kData,RANKVAL_DATA_NAME,kData[CASH_DATA_NAME]);
                else
                    savecall(kData,null,kData[CASH_DATA_NAME]);

            }else{
                // 실서버 이면서 로그인이 되지 않았을 때
                SaveDataInClient();
                networkManager.SaveDataComplete();
            }
        }
    };

    /** 저장 완료
     * netbase 에서만 호출
     */
    var CB_ShowRanking=function () {};//에러가 나서 추가

    NetworkManager.prototype.SaveDataComplete = function (_data) {
        if(networkManager.saveStack.length > 0)
            networkManager.saveStack = [];

        NetworkingEnd();
        networkManager.bAbleConnetingServer = true; //저장완료, 서버통신완료 모드로

        if(networkManager.networkState != NET_STATE.LOCALHOST) {
            if (networkTF == 0) { //비네트워크게임
                if (_data !== undefined && _data != null) {
                    // console.log(_data.data['gamemoney']);
                    // gamemoney 관련 현제 단계에서는 계산이 아직 안됨
                    // 서버에 상점 작업 완료시 수정 예정
                    kData[CASH_DATA_NAME] = _data.data['gamemoney'];
                    kData[HEART_TIME] = _data.data['nextHtime'];
                    kData[HEART_COUNT] = _data.data['nHeart'];

                    // 클라 데이터 분리하지 않았을 경우 주석 처리
                    //clientData[TIME_STAMP] = _data.data[TIME_STAMP];
                    SaveDataInClient();

                    //kData[CASH_DATA_NAME] = kData[CASH_DATA_NAME];
                } else {
                    if (_data != null && _data.rank != null) {
                        rankingPopupData = _data.rank;

                        // 콜백 함수는 따로 만들어서 사용 합니다
                        networkManager.LoadRanking(CB_ShowRanking);
                    }
                }
            }else{ //네트워크게임
                // console.log(_data.data['gamemoney']);
                // gamemoney 관련 현제 단계에서는 계산이 아직 안됨
                // 서버에 상점 작업 완료시 수정 예정
                
                if(undefined !== _data) {//데이터가 다를 경우 다운되서 임시처리
                    
                    kData[CASH_DATA_NAME] = _data.data['gamemoney'];
                    kData[HEART_TIME] = _data.data['nextHtime'];
                    kData[HEART_COUNT] = _data.data['nHeart'];

                    // 클라 데이터 분리하지 않았을 경우 주석 처리
                    //clientData[TIME_STAMP] = _data.data[TIME_STAMP];
                    SaveDataInClient();

                    //kData[CASH_DATA_NAME] = kData[CASH_DATA_NAME];

                    if (_data != null && _data.rank != null) {
                        rankingPopupData = _data.rank;

                        // 라이벌 레이싱 (networkTF == 1)은 LoadRanking(cbFunc) 을 따로
                        // 호출 해야 합니다.
                    }
                    
                }
            }
        }

        if(CB_ForcedSaveCompleteFunc != null){
            CB_ForcedSaveCompleteFunc();
            CB_ForcedSaveCompleteFunc = null;
        }
        // if(cb_saveCompleteFunc !== undefined)
        //     cb_saveCompleteFunc();
    };

    // callback load complete
    var cb_loadCompleteFunc;
    /** 로드 데이터
     * DB에 있는 데이터 긁어 오기
     * ex)
     networkManager.LoadData(function(){
        ...
     });
     * cb_func : 로드 끝난 뒤 실행 될 함수, null 가능
     */
    NetworkManager.prototype.LoadData = function (cb_func) {
        if(!networkManager.bAbleConnetingServer) {
            networkManager.bCalledDataLoading = true;

            if(cb_func === undefined)
                cb_func = null;

            networkManager.loadDataStack.push(cb_func);
            return;
        }

        NetworkingWait();   //seq:b08 비로그인&시작

        if(cb_func !== undefined && cb_func != null)
            cb_loadCompleteFunc = cb_func;          //function(){} //seq:a-08-1 //seq:b-08-1 비로그인&시작
        else
            cb_loadCompleteFunc = null;

        networkManager.bAbleConnetingServer = false; //로드시도, 서버통신중 모드로

        // LoadDataInClient();

        if(networkManager.networkState != NET_STATE.RUN_SERVER){
            networkManager.LoadDataComplete();
        }else{
            if(loginTF == 1)
                dataLoading(); //seq:a-09 로그인&시작 로딩
            else{
                networkManager.LoadDataComplete();  //seq:b-09 비로그인&시작 로딩
                // 실서버 이면서 로그인이 되지 않았을 때
            }
        }
    };

    /** 로드 완료
     * netbase에서만 호출
     */
    NetworkManager.prototype.LoadDataComplete = function (_data) {

        //if(networkManager.networkState != NET_STATE.RUN_SERVER) return;
        // LoadDataInClient();

        if(loginTF == 1){//로그인
            if(_data['save'] != null)
            {
                // 각자 수정해야 할 부분
                // kData.iCash 는 현금 결제관련 제화.

                //소켓io kData save항목
                // {
                //     CumulMedal:0
                //     DayMedal:0
                //     ITEM_1:9
                //     ITEM_2:4
                //     ITEM_3:6
                //     WinCnt:0
                // }

                kData = JSON.parse(_data['save']);

                if(kData === undefined || kData === null)//값이 없을때 로컬데이터참조
                    LoadOnlyClientData();
                
                //kData로 추가로 입력
                kData[CASH_DATA_NAME] = JSON.parse(_data['gamemoney']);
                kData[HEART_TIME] = _data['nextHtime'];
                kData[HEART_COUNT] = _data['nHeart'];
                kData[GREAP_POINT] = _data['greappoint'];
                
                net_yourname_source = _data['user_id'];
                net_yourname = _data['user_id'];

                // 클라 데이터 분리하지 않았을 경우 주석 처리
                //kData.calcedTimeStamp = _data['timeSTAMP'] - clientData[TIME_STAMP];

                //console.log(kData.iCash);
                if(kData.iVer === undefined || kData.iVer != SAVE_VER) {// 버젼이 없거나 버젼이 다르면 세이브를 초기화 시킨다.
                    //버전별변환할곳
                    //InitData();
                    kData.iVer=1; //컨버팅 안함
                }
            }else{//세이브데이터가 null이면

                // 기존에 로컬에 저장한게 있는지 체크 후 세이브
                LoadDataInClient();

                if(kData.iVer === undefined || kData.iVer != SAVE_VER) // 버젼이 없거나 버젼이 다르면 세이브를 초기화 시킨다.
                    InitData();

                kData[CASH_DATA_NAME] = JSON.parse(_data['gamemoney']);
                kData[HEART_TIME] = _data['nextHtime'];
                kData[HEART_COUNT] = _data['nHeart'];
                kData[GREAP_POINT] = _data['greappoint'];

                if(nvmode===false) {
                    networkManager.ForcedSaveData();//in LoadDataComplete
                }
            }
        }

        if(cb_loadCompleteFunc !== undefined && cb_loadCompleteFunc != null){
            cb_loadCompleteFunc(_data); //yahooIN : 공통UI때문에 추가.//야후추가< >
            cb_loadCompleteFunc = null;
        }

        networkManager.bAbleConnetingServer = true; //로드완료, 서버통신완료 모드로
        NetworkingEnd();
    };                                                                      //LoadData완료

    // var cb_SaveRankingComplete;
    /** 랭킹 저장
     */
    NetworkManager.prototype.SaveRaking = function () {
        // localhost에서는 scr/network/control.do  가 없기 때문에 호출 불가
        rankingPopupData = null;
        if(nvmode===false) {
            networkManager.ForcedSaveData(true);//in NetworkManager.SaveRaking
        }
    };

    var cb_LoadRankingComplete;
    /** 랭킹 데이터 불러오기
     * cb_func : 랭킹 로드 끝나는 시점에 실행되는 함수, null 가능
     * ex)
     networkManager.LoadRanking(function(){
        ...
     });
     */
    NetworkManager.prototype.LoadRanking = function (cb_func) {
        if(!networkManager.bAbleConnetingServer) return;

        if(networkManager.networkState == NET_STATE.LOCALHOST){
            sRanking.visible = true;
            //cb_func();
            alert('localhost에서는 랭킹 호출이 불가능 합니다.');
            return;
        }

        NetworkingWait();
        networkManager.bAbleConnetingServer = false; //랭킹로드시도, 서버통신중 모드로
        networkManager.fSaveTimer = 0;

        rankingData = null;

        cb_LoadRankingComplete = cb_func;
        getRankingList();
    };

    /** 로드 랭킹 완료
     * netbase에서만 사용
     */
    NetworkManager.prototype.LoadRankingComplete = function (_data) {
        if(loginTF == 1){
            rankingData = _data.data;

            // 데일리 랭킹 초기화
            if(rankingData.day === undefined || rankingData.day == null || rankingData.day.length == 0){
                kData[RANKVAL_DATA_NAME] = 0;
            }else{
                var bCheckMyData = false;
                for(var i=0,imax=rankingData.day.length;i<imax;++i){
                    if(rankingData.day[i]['user_id'] == rankingData.myid){
                        bCheckMyData = true;
                        break;
                    }
                }

                if(!bCheckMyData)
                    kData[RANKVAL_DATA_NAME] = 0;
            }
        }
        else
            rankingData = _data;

        networkManager.bAbleConnetingServer = true; //랭킹로드완료, 서버통신완료모드로
        NetworkingEnd();

        if(cb_LoadRankingComplete !== undefined && cb_LoadRankingComplete != null){
            cb_LoadRankingComplete();
            cb_LoadRankingComplete = null;
        }
    };

    var cb_useHeartComplete;
    /** 하트 사용
     * 서버에서 계산 한 뒤 받아 오고 kData에 저장.
     * ex)
     networkManager.UseHeart(1, function(){
        ...
     });
     * _useCount : 사용 갯수
     * _cb_func : 하트 사용 완료 시점에 실행 되는 함수
     */
    NetworkManager.prototype.UseHeart = function (_useCount,_cb_func) {
        if(!networkManager.bAbleConnetingServer){
            networkManager.bHeartUseCalled = true;
            networkManager.heartUseStack.push(new HeartUseStackData(_useCount,_cb_func));
            return;
        }

        NetworkingWait();
        networkManager.bAbleConnetingServer = false; //하트소비시도, 서버통신중 모드로

        if(_useCount === undefined || _useCount == null)
            _useCount = 1;

        if(_cb_func !== undefined && _cb_func != null)
            cb_useHeartComplete = _cb_func;
        else
            cb_useHeartComplete = null;

        if(networkManager.networkState != NET_STATE.RUN_SERVER){
            if(kData[HEART_COUNT] == iHeartChargeMax) // iHeartChargeMax 는 따로 지정
                kData[HEART_TIME] = fHeartChargeTime; // fHeartChargeTime 는 따로 지정
            kData[HEART_COUNT] -= _useCount;

            networkManager.UseHeartComplete();
        }else{
            if(loginTF == 1){
                heartUse(_useCount);
            }else{ //비로그인
                if(kData[HEART_COUNT] == iHeartChargeMax) // iHeartChargeMax 는 따로 지정
                    kData[HEART_TIME] = fHeartChargeTime; // fHeartChargeTime 는 따로 지정

                kData[HEART_COUNT] -= _useCount;
                networkManager.UseHeartComplete();
            }
        }
    };

    /** 하트 소모 완료
     * netbase에서만 사용
     */
    NetworkManager.prototype.UseHeartComplete = function (_data) {
        networkManager.bHeartUseCalled = false;
        networkManager.heartUseStack = [];

        if(networkManager.networkState == NET_STATE.RUN_SERVER && loginTF == 1){
            // 데이터 적용

            kData[HEART_TIME] = _data.data['nextHtime'];
            kData[HEART_COUNT] = _data.data['nHeart'];
        }

        NetworkingEnd();
        networkManager.bAbleConnetingServer = true; //하트소비완료, 서버통신완료모드로


        if(nvmode===true) {
            var sends = {};
            sends.clearStage = kData.clearStage;//네이버저장하기
            if (typeof GamePocket.Sdk !== 'undefined') {
                networkManager.AppDataPut(JSON.stringify(sends));
            }
        }else{
            networkManager.ForcedSaveData(); //처리 //NetworkManager.UseHeartComplete
        }
        // 콜백 함수 있는지 체크
        if(cb_useHeartComplete !== undefined && cb_useHeartComplete !=null){
            cb_useHeartComplete();
            cb_useHeartComplete = null;
        }
    };

    var cb_func_getshoppinglist;
    /** 상점 리스트 호출
     * ex)
     networkManager.GetShoplist(ShopType.HEART, function(){
        ...
     });
     * 서버DB에 테이블 들어가 있는지 체크(서버팀장님께 문의하면 됩니다.)
     * _shopTyop    : ShopSype enum 형 처리 되어 있음
     * cb_func      : 상점 리스트 불러온 뒤 실행될 함수
     */
    NetworkManager.prototype.GetShoplist = function (_shopType, cb_func) {
        if(!networkManager.bAbleConnetingServer)
            return;

        networkManager.bAbleConnetingServer = false; //삽리스트받기시도, 서버통신중 모드로
        NetworkingWait();

        if(_shopType === undefined || _shopType == null)
            _shopType = ShopType.HEART;

        if(networkManager.networkState == NET_STATE.LOCALHOST){
            if(cb_func !== undefined && cb_func != null)
                cb_func_getshoppinglist = cb_func;
            else
                cb_func_getshoppinglist = null;
            networkManager.GetShoppingListComplete();
        }else{
            // test server는 무조건 로그아웃 상점으로 표시 됨
            if(cb_func !== undefined && cb_func != null)
                cb_func_getshoppinglist = cb_func;
            else
                cb_func_getshoppinglist = null;
            marketList(_shopType);
        }
    };

    /** 상점 리스트 호출 완료
     * netbase에서만 호출
     */
    NetworkManager.prototype.GetShoppingListComplete = function (_data) {
        networkManager.bAbleConnetingServer = true; //상점리스트받기완료, 서버통신완료모드로
        NetworkingEnd();

        if(_data === undefined || _data == null){
            if(cb_func_getshoppinglist !== undefined && cb_func_getshoppinglist !== null){
                cb_func_getshoppinglist();
                cb_func_getshoppinglist = null;
            }
        }else{
            shopListData = _data;

            if(cb_func_getshoppinglist !== undefined && cb_func_getshoppinglist !== null){
                cb_func_getshoppinglist();
                cb_func_getshoppinglist = null;
            }
        }
    };

    /** 구매 요청
     * ex)
     networkManager.Payment(shopListData[_index].mkidx, function(){
        ...
     });
     * shopListData에 있는 mkidx를 넣어 주어야 합니다.
     * _mkidx   : 상점 리스트 불러 왔을 때 shopListData에 넣어져 있는 mkidx.
     * cb_func  : 구매 완료 한 뒤 호출되는 함수
     */
    NetworkManager.prototype.Payment = function (_mkidx, cb_func) {
        if(_mkidx === undefined || _mkidx == null){
            alert('구매 인덱스 에러\n버전' + VERSION);
            return;
        }
        if(nvmode===false) {
            networkManager.ForcedSaveData(false,function () { //in payment
                if(_mkidx === undefined || _mkidx == null)
                    return false;

                if(!networkManager.bAbleConnetingServer)//false면 통신중이라 중지시킴
                    return;

                networkManager.bAbleConnetingServer = false; //구매시도, 서버통신중 모드로
                NetworkingWait();

                if(networkManager.networkState == NET_STATE.LOCALHOST){
                    if(cb_func !== undefined && cb_func != null)
                        cb_loadCompleteFunc = cb_func;
                    else
                        cb_loadCompleteFunc = null;
                    networkManager.GetShoppingListComplete();
                }else{
                    // test server는 무조건 로그아웃 상점으로 표시 됨
                    if(cb_func !== undefined && cb_func != null)
                        cb_loadCompleteFunc = cb_func;
                    else
                        cb_loadCompleteFunc = null;

                    if(apkTF == 1){
                        mkPayment(_mkidx);
                    }else{
                        var b_isAD = false;
                        for(var i=0,imax=shopListData.length;i<imax;++i){
                            if(shopListData[i].mkidx == _mkidx){
                                if(shopListData[i].pType.indexOf('ad') != -1){
                                    b_isAD = true;
                                    break;
                                }
                            }
                        }
                        b_isAD = false;  //광고무시,무조건결제,항상결제,항시결제
                        if(b_isAD){
                            // 팝업 혹은 에러 아니면 구글플레이 점프

                            NetworkingEnd();
                            networkManager.bAbleConnetingServer = true; //구매가안됨, 서버통신완료모드로
                            if(dm) console.log("Payment-피씨모드:"+GetShpMsg("gotogpg"));//구글플레이로(b_isAD = true;)
                            networkManager.ModalCall(MODAL_BUTTON_TYPE.OKCANCEL,GetShpMsg("gotogpg"),
                                function () {
                                    networkManager.JumpGooglePlay();
                                },
                                function () {
                                }
                            );
                        }else{
                            mkPayment(_mkidx);
                        }
                    }
                }
            });//Payment
        }//nvmove=false
    };

    var cb_GetServerTimeComplete;
    /** 서버 시간 받아 오기
     * ex)
     networkManager.GetServerTime(function(){
        ...
     });
     * cb_func  : 서버 시간 받아온 뒤 실행 되는 함수
     */
    NetworkManager.prototype.GetServerTime = function (cb_func) {
        if(cb_func !== undefined && cb_func != null)
            cb_GetServerTimeComplete = cb_func;
        else
            cb_GetServerTimeComplete = null;

        if(networkManager.networkState != NET_STATE.LOCALHOST){
            getTimestamp(function () {} ); //야후수정때문에 함수인자 추가함
        }else{
            networkManager.GetServerTimeComplete();
        }
    };

    /** 서버 시간 받아오기 완료
     * netbase에서만 호출
     * _data['Timestamp'] -> 초단위로 옴 ( /1000 할 필요 없습니다)
     */
    NetworkManager.prototype.GetServerTimeComplete = function (_data) {
        var retData = null;
        if(_data !== undefined && _data != null){
            retData = _data['Timestamp'];
        }

        if(cb_GetServerTimeComplete !== undefined && cb_GetServerTimeComplete != null){
            cb_GetServerTimeComplete(retData);
            cb_GetServerTimeComplete = null;
        }
    };

	/** 게임정보 받아오기..
	 */
	var cb_GetGameInfoComplete;
	NetworkManager.prototype.GetGameInfo = function (cb_func) {
		cb_GetGameInfoComplete = cb_func;
		if(networkManager.networkState != NET_STATE.LOCALHOST){
			baseinfoCall();
		}else{
			networkManager.GetGameInfoComplete();
		}
	};

	/** 게임정보 받아오기 완료
	 * netbase에서만 호출
	 */
	NetworkManager.prototype.GetGameInfoComplete = function (_data) {
		if(cb_GetGameInfoComplete !== undefined){
			cb_GetGameInfoComplete(_data);
			cb_GetGameInfoComplete = undefined;
		}
	};
    /** 회원가입으로 점프
     ex) networkManager.JoinMember();
     */
    NetworkManager.prototype.JoinMember = function () {
        if(nvmode===false) {
            if (networkManager.networkState == NET_STATE.RUN_SERVER && loginTF == 0) {
                //networkManager.ForcedSaveData();
                networkManager.ForcedSaveData(false, function () {
                    memberCall();
                });
            }
        }
    };

    NetworkManager.prototype.JumpGooglePlay = function () {
        googleplaypopCall();
    };

    // NetworkManager.prototype.ModalCall = function (_modalType,_msg,_okfunc,_cancelfunc) {
    //     b_okTF = false;
    //
    //     switch (_modalType){
    //         case MODAL_BUTTON_TYPE.OKONLY:
    //             b_okTF = false;
    //             break;
    //         case MODAL_BUTTON_TYPE.OKCANCEL:
    //             b_okTF = true;
    //             break;
    //     }
    //
    //     networkManager.cb_ModalOK = _okfunc;
    //     networkManager.cb_ModalCancel = _cancelfunc;
    //
    //     msgModalSET(_msg,b_okTF);
    // };
    //모달콜을 토스트로 교체
    NetworkManager.prototype.ModalCall = function (_modalType,_msg,_okfunc,_cancelfunc) {
        ShowToast("warning", _msg);
    };
    //모달콜을 토스트로 교체
    //-------------------------------새로추가된 네트워크 매니저 메소드
	this.bNaverLogin = true;
	this.shopData = undefined;
	this.iRetryCnt = 0;

    NetworkManager.prototype.refresh = function(callback){
		GamePocket.SdkLoader.onLoad(function(){
            GamePocket.Sdk.refresh(function(response){
                if(callback) callback(response);
            });
		});
    };

    NetworkManager.prototype.AppDataGet = function(args, callback){
        /*var args = Array.prototype.slice.call(arguments, 1);
        var strKey = "";
        for(var i=0;i<args.length;++i) {
            strKey += args[i];
            if(i < args.length - 1)
                strKey += ",";
        }*/
        GamePocket.Sdk.AppData.get(args, function(response) {
            if(response.code == 0){
				var parsing = JSON.stringify(response.result).replace(/\"\[/gi, "[").replace(/\]\"/gi, "]");
				parsing = parsing.replace(/\"\{/gi, "{").replace(/\}\"/gi, "}");
				parsing = parsing.replace(/\"true\"/gi, "true").replace(/\"false\"/gi, "false");
				parsing = parsing.replace(/\\\"/gi, "\"");
                if(callback) callback(JSON.parse(parsing));
				networkManager.iRetryCnt = 0;
            }else{ //fail process
				switch(response.code){
					case 2001:
					case 2002:
						ShowToast("warning", "비 로그인 시 게임 데이터가 저장되지 않습니다.");
						if(callback) callback(response);
						break;
					case 8888:	// 타임아웃이 발생할경우..데이터를 새로 받아온다.
						if(++networkManager.iRetryCnt <= 3) {
							ShowToast("warning", "데이터를 로드에 실패해서 다시 시도합니다.");
							networkManager.AppDataGet(args, callback);
						}else{
							ShowToast("warning", "네트웍 환경이 좋지 않습니다. 새로고침을 해주세요.");
						}
						break;
					default:
						networkManager.NaverError(response);
						break;
				}
				networkManager.bNaverLogin = false;
				/*if(response.code == 2001 || response.code == 2002){
					ShowToast("warning", "비 로그인 시 게임 데이터가 저장되지 않습니다.");
					if(callback) callback(response);
				}
				else
					networkManager.NaverError(response);
				networkManager.bNaverLogin = false;*/
            }
        });
    };

	/*NetworkManager.prototype.AppDataGetRetry = function(args, callback){
	}*/

    NetworkManager.prototype.AppDataPut = function(args, callback){
    	if(this.bNaverLogin == false) return;

        GamePocket.Sdk.AppData.put(args, function(response) {
            if(response.code == 0){
                if(callback) callback(response.result);
				networkManager.iRetryCnt = 0;
            }else{ //fail process
				switch(response.code){
					case 8888:	// 타임아웃이 발생할경우..데이터를 새로 받아온다.
						if(++networkManager.iRetryCnt <= 3) {
							ShowToast("warning", "네트웍 에러가 발생하여 다시 통신합니다.");
							networkManager.AppDataPut(args, callback);
						}else{
							ShowToast("warning", "네트웍 환경이 좋지 않습니다. 새로고침을 해주세요.");
						}
						break;
					default:
						networkManager.NaverError(response);
						break;
				}
            }
        });
    }

    NetworkManager.prototype.AppDataRemove = function(args, callback){
		if(this.bNaverLogin == false) return;
        GamePocket.Sdk.AppData.remove(args, function(response) {
            if(response.code == 0){
                if(callback) callback(response.result);
				networkManager.iRetryCnt = 0;
            }else{ //fail process
				switch(response.code){
					case 8888:	// 타임아웃이 발생할경우..데이터를 새로 받아온다.
						if(++networkManager.iRetryCnt <= 3) {
							ShowToast("warning", "네트웍 에러가 발생하여 다시 통신합니다.");
							networkManager.AppDataRemove(args, callback);
						}else{
							ShowToast("warning", "네트웍 환경이 좋지 않습니다. 새로고침을 해주세요.");
						}
						break;
					default:
						networkManager.NaverError(response);
						break;
				}
            }
        });
    }

    NetworkManager.prototype.RankingGet = function(callback){
		if(this.bNaverLogin == false) return;
        GamePocket.Sdk.Ranking.get(function(response) {
            if(response.code == 0){
                if(callback) callback(response.result);
				networkManager.iRetryCnt = 0;
            }else{ //fail process
				switch(response.code){
					case 8888:	// 타임아웃이 발생할경우..데이터를 새로 받아온다.
						if(++networkManager.iRetryCnt <= 3) {
							ShowToast("warning", "네트웍 에러가 발생하여 다시 통신합니다.");
							networkManager.RankingGet(callback);
						}else{
							ShowToast("warning", "네트웍 환경이 좋지 않습니다. 새로고침을 해주세요.");
						}
						break;
					default:
						networkManager.NaverError(response);
						break;
				}
            }
        });
    }

    NetworkManager.prototype.RankingAdd = function(args, callback){
		if(this.bNaverLogin == false) return;
        GamePocket.Sdk.Ranking.add(args, function(response) {
            if(response.code == 0){
                if(callback) callback(response.result);
				networkManager.iRetryCnt = 0;
            }else{ //fail process
				switch(response.code){
					case 8888:	// 타임아웃이 발생할경우..데이터를 새로 받아온다.
						if(++networkManager.iRetryCnt <= 3) {
							ShowToast("warning", "네트웍 에러가 발생하여 다시 통신합니다.");
							networkManager.RankingAdd(args, callback);
						}else{
							ShowToast("warning", "네트웍 환경이 좋지 않습니다. 새로고침을 해주세요.");
						}
						break;
					default:
						networkManager.NaverError(response);
						break;
				}
            }
        });
    }

	NetworkManager.prototype.NaverError = function(error, callback){
		ShowToast("error", error.code + ":" + error.message);
	}

    //======================================================================================
    // 모비게임쪽 URL쪽 처리
	NetworkManager.prototype.GetNaverShop = function(callback){
        /*var url = "http://13.124.198.140/__api_naver/request3.php?cryptData=";
		var jsondata = "{\"mode\":\"GET_GAME_LIST\"}";//encodeURIComponent("{\"mode\":\"GET_GAME_LIST\"}");
        $.ajax({
            url:url + jsondata,
            dataType:"jsonp",
            jsonpCallback:"callback",
            success:function(data){
                console.log("===== : " +  JSON.stringify(data.gameList));
				callback(data.gameList);
            },
            error:function(err){
				console.log("========== error : GetNaverShop : " + err);
            }
        });*/
        // 샵데이터가 없을경우 데이터를 받아서 처리한다.
        if(this.shopData == undefined){
			this.shopData = JSON.parse("[" +
				"{\"gameinfoIdx\":\"9\",\"gName\":\"네코팡\",\"iconLNK\":\"http://13.124.198.140/img/icon_0009.png\",\"gContents\":\"귀여운 고양이 3매치 퍼즐!\\n퍼즐을 즐기며 다양한 고양이를 모아보세요!\\n어서요! 고양이들이 당신을 기다려요!\",\"aLNK\":\"https://gamepocket.naver.com/games/14\"}," +
				"{\"gameinfoIdx\":\"11\",\"gName\":\"요괴파티\",\"iconLNK\":\"http://13.124.198.140/img/icon_0011.png\",\"gContents\":\"각양각색의 요괴들을 모두 모으기 위한 행진!\\n방치 하여도 돈을 벌어오는 귀여운 요괴들!\\n새로운 요괴와 더 많은 돈을 벌어보세요~\",\"aLNK\":\"https://gamepocket.naver.com/games/15\"}," +
				"{\"gameinfoIdx\":\"5\",\"gName\":\"스페이스 버블\",\"iconLNK\":\"http://13.124.198.140/img/icon_0005.png\",\"gContents\":\"방울에 갇힌 우주인들 구해주세요!\\n방울이 날아가지 않도록\\n블록을 빈틈없이 메꿔주세요!\",\"aLNK\":\"https://gamepocket.naver.com/games/16\"}," +
				"{\"gameinfoIdx\":\"8\",\"gName\":\"코스믹팝\",\"iconLNK\":\"http://13.124.198.140/img/icon_0008.png\",\"gContents\":\"아래에서 위로 쏘는 시시한 버블은 이제 NO~\\n360도로 회전하면 사방에서 쏘는 뉴 버블~\\n신비한 버블의 세계로 당신을 초대합니다.\",\"aLNK\":\"https://gamepocket.naver.com/games/17\"}," +
				"{\"gameinfoIdx\":\"4\",\"gName\":\"상하이쉐프\",\"iconLNK\":\"http://13.124.198.140/img/icon_0004.png\",\"gContents\":\"같은 패를 찾는 짝맞추기 게임!\\n당신의 손은 눈보다 빠를 수 있습니까?\\n어떤 블록을 이을 수 있을지 찾아보아요!\",\"aLNK\":\"https://gamepocket.naver.com/games/18\"}," +
				"{\"gameinfoIdx\":\"1\",\"gName\":\"상하이타운\",\"iconLNK\":\"http://13.124.198.140/img/icon_0001.png\",\"gContents\":\"마작 짝맞추기 게임!\\n패를 맞추면 멋진 건물을 만들어요!\\n건물들을 모아 멋진 도시를 만들어보세요!\",\"aLNK\":\"https://gamepocket.naver.com/games/19\"}," +
				"{\"gameinfoIdx\":\"10\",\"gName\":\"모미모미\",\"iconLNK\":\"http://13.124.198.140/img/icon_0010.png\",\"gContents\":\"당신의 안마력은 얼마입니까? 100? 200?\\n훗! 저의 안마력은 724,231,128,158 입니다.\\n고양이 안마사의 손길을 플레이 해보세요!\",\"aLNK\":\"https://gamepocket.naver.com/games/20\"}," +
				"{\"gameinfoIdx\":\"6\",\"gName\":\"네코닌자\",\"iconLNK\":\"http://13.124.198.140/img/icon_0006.png\",\"gContents\":\"어느 겁나먼 동방의 동물 나라.\\n평화를 위하여 그들을 물리쳐야 해요!\\n어떻게 하냐고요? 눌러만 주세요!\",\"aLNK\":\"https://gamepocket.naver.com/games/21\"}," +
				"{\"gameinfoIdx\":\"12\",\"gName\":\"라이벌레이싱\",\"iconLNK\":\"http://13.124.198.140/img/icon_0012.png\",\"gContents\":\"4인 대전 실시간 네트워크 레이싱 게임!\\n서로 방해물을 던지며, 엎치락뒤치락하는\\n경기 속에서 1등으로 달려봐요!\",\"aLNK\":\"https://gamepocket.naver.com/games/22\"}," +
				"{\"gameinfoIdx\":\"3\",\"gName\":\"네오 2048\",\"iconLNK\":\"http://13.124.198.140/img/icon_0003.png\",\"gContents\":\"같은 번호를 가진 두개의 타일이\\n닿으면 하나로 합쳐져요!\\n타일을 밀어 최고의 점수에 도전해 보세요!\",\"aLNK\":\"https://gamepocket.naver.com/games/23\"}," +
				"{\"gameinfoIdx\":\"2\",\"gName\":\"펭귄대쉬\",\"iconLNK\":\"http://13.124.198.140/img/icon_0002.png\",\"gContents\":\"달려요! 멈추지 말아요! 계속 달려요!!\\n빙하를 피해 펭귄은 계속 달립니다!\\n당신은 어디까지 달릴 수 있을까요?\",\"aLNK\":\"https://gamepocket.naver.com/games/24\"}," +
				"{\"gameinfoIdx\":\"7\",\"gName\":\"좀비건\",\"iconLNK\":\"http://13.124.198.140/img/icon_0007.png\",\"gContents\":\"좀비와의 사투에서 생존자들을 구해주세요.\\n좀비들을 처치하면 다양한 총기를 얻어요.\\n과연 당신의 순발력은 전세계 몇 등 일까요?\",\"aLNK\":\"https://gamepocket.naver.com/games/25\"}," +
				"{\"gameinfoIdx\":\"17\",\"gName\":\"스위트블릭스\",\"iconLNK\":\"http://13.124.198.140/img/icon_0015.png\",\"gContents\":\"세상에서 제일 달콤한 사탕 깨기!\\n도망가고 떨어지고 사라지는 사탕들!\\n다양한 사탕들이 여러분을 기다려요!\",\"aLNK\":\"https://gamepocket.naver.com/games/26\"}]");

			for(var i=0;i<this.shopData.length;++i){
				if(this.shopData[i].gameinfoIdx == Define.GIDX){
					var temp = this.shopData[0];
					this.shopData[0] = this.shopData[i];
					this.shopData[i] = temp;
					this.shopData.shift();
					break;
				}
			}
		}
		callback(this.shopData);
	}
    //-------------------------------새로추가된 네트워크 매니저 메소드

}//네트워크매니져


// 랭킹 관련 데이터
var rankingData = new RankingData();
function RankingData() {
    /*
    로그인
    {"TF":1,"my_day_rank":1,"my_day_score":7,"my_all_rank":2,"my_all_score":7,"myid":"Arccent","day":[{"user_id":"Arccent","score":7,"rank":1}],"all":[{"user_id":"Arccent","score":"7,"rank":1}]}}

    로그아웃
    {"TF":1,"day":[{"user_id":"Arccent","score":7,"rank":1}],"all":[{"user_id":"Arccent","score":7,"rank":1}]}

    데일리 랭킹 초기화 되면
     day.length = 0

     my_day_score 혹은 my_all_score 가 0이면 NODATA
    */

    this.TF = 0;

    this.my_day_rank = 0;
    this.my_day_score = 0;

    this.my_all_rank = 0;
    this.my_all_score = 0;

    this.myid = "";

    this.day = [];
    this.all = [];
}

var rankingPopupData = new RankingPopupData();
function RankingPopupData() {
    // "rank":{"oldRank":1,"newRank":1,"oldScore":47,"newScore":52}}
    // oldRank, oldCuRank 가 0으로 오는건 rankup 표시를 안하면 됨 -> 첫 저장이므로 랭크 업과는 다름
    // 데일리 랭킹 관련
    this.oldRank = 0;
    this.newRank = 0;

    this.oldScore = 0;
    this.newScore = 0;

    // 종합 랭킹 관련
    this.oldCuRank = 0;
    this.newCuRank = 0;

    this.oldCuScore = 0;
    this.newCuScore = 0;
}

// 하트 관련 스텍 데이터
function HeartUseStackData(_use_Heart, _cb_func) {
    this.use_Heart = 0;
    this.cb_func = null;

    if(_use_Heart !== undefined && _use_Heart != null)
        this.use_Heart = _use_Heart;

    if(_cb_func !== undefined && _cb_func != null)
        this.cb_func =_cb_func;
}

var shopListData = [new ShopListData()];
function ShopListData() {
    // 로그아웃
    // {"TF":1,
    // "data":[{"mkidx":21,"mtype":"logout","pType":"member","Quantity":5,"Price":0},{"mkidx":22,"mtype":"loginout","pType":"ad_1","Quantity":5,"Price":0},
    // {"mkidx":23,"mtype":"loginout","pType":"ad_2","Quantity":20,"Price":0},{"mkidx":24,"mtype":"loginout","pType":"ad_3","Quantity":60,"Price":0}]}

    // 로그인
    // {"TF":1,"actk":"zy32DLjr688Obv0tQY58i0BzYyojyvzbEPYvMfwSLyvgyD7c2K9dP+xy7CuG6PcyEwnxo9+lhr1v0PUFWIn78Z8yQsbr50DbXv5YrX88Nipq7ocXFJxbRrkkDZXUx3CA","data":[{"mkidx":20,"mtype":"login","pType":"point","Quantity":5,"Price":200},
    // {"mkidx":22,"mtype":"loginout","pType":"ad_1","Quantity":5,"Price":0},{"mkidx":23,"mtype":"loginout","pType":"ad_2","Quantity":20,"Price":0},{"mkidx":24,"mtype":"loginout","pType":"ad_3","Quantity":60,"Price":0}]}

    this.mkidx = 0;
    this.mtype = ""; //"logout" "loginout"
    this.pType = ""; // member : 회원가입 , point : greap 포인트, ad_1~3 : 광고
    this.Quantity = 0;
    this.Price = 0;
}

// 토스트 기본 옵션 초기화..
function ShowToast(type, msg){
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-center",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "4000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
//	toastr.options["timeOut"] = time;
    //var per = parseFloat(renderer.view.style.width);
    //per = per * 0.8;
    toastr[type](msg);//.css("width", per + "%");
}