/**
 * 데이터 연동 관리자
 * Created by juho on 2016-10-11.
 */

var DataManager = {};
DataManager.URL = 'https://5minutesgame.hu.co.kr/gamelog/';
DataManager.GAME_ID = 8;
DataManager.startType = 0;      // 0:첫게임, 1:재시작
DataManager.gameIdx = null;    // 게임고유번호
DataManager.startTime = '';      // 게임시작시간

// 게임시작
DataManager.gameStart = function(){
    // 로컬테스트 코드
    if(gc.IS_LOCAL) return;

    var data = {};
    data.proc = 'gameStart';
    data.gameId = this.GAME_ID;
    data.type = this.startType;

    $.ajax({
        url:this.URL,
        type: "GET",
        dataType:'jsonp',
        data : data,
        success:function(data){
            //alert(data);
            DataManager.gameIdx = data.game_idx;
            DataManager.startTime = data.start_datetime;
            // LocalStorageManager.setStorage(LocalStorageManager.GAME_IDX, DataManager.gameIdx);
            // LocalStorageManager.setStorage(LocalStorageManager.START_TIME, DataManager.startTime);
        },
        error:function(xhr,status,error){
        }
    })
};

// 게임종료
DataManager.gameEnd = function(score, stage){
    // 로컬테스트 코드
    if(gc.IS_LOCAL) return;

    var data = {};
    data.proc = 'gameScoreSave';
    data.gameId = this.GAME_ID;
    data.type = this.startType;
    data.score = score;
    data.stage = stage;
    data.game_idx = this.gameIdx;
    data.start_datetime = this.startTime;

    $.ajax({
        url:this.URL,
        type: "GET",
        dataType:'jsonp',
        data : data,
        success:function(data){
            DataManager.startType = 1;
        },
        error:function(xhr,status,error){
        }
    })
};

window.DataManager = DataManager;