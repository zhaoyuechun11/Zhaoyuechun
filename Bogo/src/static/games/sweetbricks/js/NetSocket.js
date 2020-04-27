if(false) {
    var net_yourname_source = "user";
    var net_yourname = "user";
    var net_usercount = 0;
    var net_myrank = undefined;
    var net_name4 = [undefined, undefined, undefined, undefined]; //사이드UI상 이름들 //로그인서치할때순위?
//var net_ecount =0;
//var net_ename = [undefined,undefined,undefined,undefined];
//var net_ename_attack=-1;
    var _i_ = 0;
    var _j_ = 0;
    var _k_ = 0;

    var net_resultcount = 0;
    var net_resultname4 = [undefined, undefined, undefined, undefined];
    var net_resultrank4 = [undefined, undefined, undefined, undefined];

    var net_userall = [undefined, undefined, undefined, undefined]; //순위정렬 이름들
    var net_userallfin = [undefined, undefined, undefined, undefined]; //도착한 이름들
    var net_userscore = [];
    var net_userallkill = [undefined, undefined, undefined, undefined]; //순위정렬 상태에서 kill들
    var net_killcountall = 0;
    var net_killcountall_cur = 0;
    var net_useridx = [];
    var net_userfin = [];
    var net_userfinscore = [];
    var tempname = "";
    var tempidx = -1;
    var isfinresult = 0;
    var net_bakename = [];
    var saveData = {"WinCnt": 0, "CumulMedal": 0, "DayMedal": 0, "ITEM_1": 10, "ITEM_2": 10, "ITEM_3": 10};
    var itemTYPE = {"ITEM_1": 1, "ITEM_2": 2, "ITEM_3": 3};
    var item_num = 1; // itemTYPE index 현재 순서대로 1,2,3번 데이터를 보냄 //총갯수
    var playst = true;
//$(function(){


    window.onunload = function () {
        if (socket) socket.disconnect();
    };


    var myVar = null;
    var myscore = 0;

    function myTimer() { //PlayGoGo에서 2초단위로 진행거리 메세지 쏴주는 인터벌
        // //원본소스
        // var min = 0.1;
        // var min = 1;
        // var max = 10;
        // var random = Math.floor(Math.random() * (max - min + 1)) + min;
        // myscore +=  random;
        // myscore = myscore > 100 ? 100 : myscore; //자동차 진행값 크롭
        // socket.emit('MoveCar',{"score":myscore}); //자동차 진행값 보내기
        // if(myscore == 100.0) myStopFunction();//자동차 골지점 도착시
        // //원본소스


        myscore = playtime_bias * 100; //1.0-->100 으로로 진행
        myscore = myscore > 100 ? 100 : myscore; //자동차 진행값 크롭
        socket.emit('MoveCar', {"score": myscore}); //자동차 진행값 보내기
        if (myscore >= 100.0) myStopFunction();//자동차 골지점 도착시

    }

    function myStopFunction() {
        clearInterval(myVar);
        socket.emit('GoalIn');
    }


    var socket = io.connect('http://movigame.com:8001', {'forceNew': true, reconnection: false});
    socket.on('connect', function () {
        if (alonemode) return;
        // 입장정보
        socket.on('msgAlert', function (data) { //전체메세지 수신
            alert(JSON.stringify(data));
        });

        //자동으로 플레이시 작동//강제시작시에도 발생
        socket.on('PlayGoGo', function (data) {//레이싱시작시 수신 -->myscore += 1~3이하 인터벌생성
            if (alonemode) return;
            //alert(JSON. stringify(data));
            //$('#goalin').html('');
            //$('#compulsiongogo').hide();
            item_num = 1;
            playst = false;
            myscore = 0;
            myVar = setInterval(function () {
                myTimer()
            }, 2000);//인터발 작동 시작

            net_started = true;                               //네트워크게임모드 진입
            //matchUImode=false;                              //서치ui 중지 용도
            uimode = uimodeset.matchfind;

            if (uigame.state.states.menu.uifind.visible == true) {
                //다른선수가 강제진행시, 또는 자동 진행시 ui업데이트
                uimode = uimodeset.select;

                uigame.state.states.menu.advanceToGame();
                uigame.state.states.menu.uifind.visible = false;
            }
            net_userfin = []; //끝난선수 초기화
        });

        // 플레이 상황
        socket.on('PlayingINFO', function (data) {//다같이 출발 수신-->data.addinfo(현재하는 전체 선수들)
            if (alonemode) return;

            //alert(JSON. stringify(data));
            TagetList(data);
            //모든선수들
            //data[0].id = "VkBziGf8gzIwc-dFAACn"
            //data[0].killMark =0
            //data[0].score = 100
            //data[0].uid = "22"

        });

        // 입장 == 대기
        // data.addinfo[0].uid="aa"
        // data.addinfo[0].killMark=0
        // data.addinfo[0].score=0
        // data.addinfo[0].status=2 //룸
        // data.addinfo[1].uid="yourdevice"
        socket.on('inRoom', function (data) {//누군가방진입시 수신 -->data.addinfo(현재하는 전체 선수들)1
            //alert(JSON. stringify(data));
            if (alonemode) return;


            TagetList(data.addinfo);
            net_usercount = data.addinfo.length;//전체유저수 //룸안에서
            net_ecount = data.addinfo.length - 1;//상대캐릭수

            //net_name4[]에는 유저전체 이름 넣는다

            //[나, 선수1, 선수2, undefined] 이렇게 넣는다--------------
            _i_ = 1;
            for (_k_ = 0; _k_ < 4; _k_++) {
                if (_k_ < net_usercount) {
                    if (data.addinfo[_k_].uid == net_yourname) { //내이름을 맨위로
                        net_name4[0] = data.addinfo[_k_].uid;
                    } else {
                        net_name4[_i_] = data.addinfo[_k_].uid; //선수들이름을 밑으로
                        _i_ += 1;
                    }
                }
                else net_name4[_k_] = undefined;
            }
            //[나, 선수1, 선수2, undefined] 이렇게 넣는다--------------

            //이건 수동 소트용?
            for (_i_ = 0; _i_ < data.addinfo.length; _i_++) {
                net_userall[_i_] = data.addinfo[_i_].uid;
            }
            switch (data.addinfo.length) {
                case 1:
                    net_userall[1] = undefined;
                case 2:
                    net_userall[2] = undefined;
                case 3:
                    net_userall[3] = undefined;
                    break;
            }

        });

        // 방에서 나감
        socket.on('outRoom', function (data) {//누군가 나가면 수신-->data.addinfo(현재하는 전체 선수들)
            if (alonemode) return;
            //alert(JSON. stringify(data));
            TagetList(data.addinfo);

            net_usercount = data.addinfo.length;//전체유저수 //방을나갈때
            net_ecount = data.addinfo.length - 1;//상대캐릭수

            //[나, 선수1, 선수2, undefined] 이렇게 넣는다--------------
            _i_ = 1;
            for (_k_ = 0; _k_ < 4; _k_++) {
                if (_k_ < net_usercount) {
                    if (data.addinfo[_k_].uid == net_yourname) { //내이름을 맨위로
                        net_name4[0] = data.addinfo[_k_].uid;
                    } else {
                        net_name4[_i_] = data.addinfo[_k_].uid; //선수들이름을 밑으로
                        _i_ += 1;
                    }
                }
                else net_name4[_k_] = undefined;
            }
            //[나, 선수1, 선수2, undefined] 이렇게 넣는다--------------

            //이건 수동 소트용?
            for (_i_ = 0; _i_ < data.addinfo.length; _i_++) {
                net_userall[_i_] = data.addinfo[_i_].uid;
            }
            switch (data.addinfo.length) {
                case 1:
                    net_userall[1] = undefined;
                case 2:
                    net_userall[2] = undefined;
                case 3:
                    net_userall[3] = undefined;
                    break;
            }
        });

        //공격받으면 수신
        // -->//data.ITEM=1
        //data.TargetID="aa"
        //data.userID="dd"
        socket.on('ataack', function (data) {
            if (alonemode) return;
            var uid = data.useID;
            var tid = data.TargetID;
            var item = data.ITEM;
            var my = 0;
            switch (data.ITEM) {
                case 1:
                    //대화창//포그폭탄 투하시 연출
                    //uigame.state.states.game.uiController.uievent.onRunEventRight(my, "fog_o", 0);
                    //uigame.state.states.game.uiController.itembomb.spawnBomb(); //아이템실행

                    uigame.state.states.game.uiController.spawnStack.push(1);//var retE = shift();
                    uigame.state.states.game.uiController.spawnStackFrom.push(data.useID);
                    uigame.state.states.game.uiController.spawnStackTo.push(data.TargetID);
                    break;
                case 2:
                    //방해전파 투하시 연출
                    // uigame.state.states.game.uiController.onReversePrevAct();//전파방해폭탄 떨어지는 효과
                    // TweenMax.delayedCall(1, function () {
                    //     reverseTime = 0;
                    //     reverseMode = true;
                    //     uigame.state.states.game.uiController.uievent.onRunEventRight(my, "reverse_o", 0);
                    //     uigame.state.states.game.uiController.onReverseLeftOn();
                    //     uigame.state.states.game.uiController.onReverseRightOn();
                    // });

                    uigame.state.states.game.uiController.spawnStack.push(2);//var retE = shift();
                    uigame.state.states.game.uiController.spawnStackFrom.push(data.useID);
                    uigame.state.states.game.uiController.spawnStackTo.push(data.TargetID);

                    break;
                case 3:
                    //일반미사일폭탄 연출
                    // uigame.state.states.game.uiController.uievent.onRunEventRight(my, "missile_o", 0);
                    // uigame.state.states.game.uiController.itemmissile.spawnMissile();//아이템실행

                    uigame.state.states.game.uiController.spawnStack.push(3);//var retE = shift();
                    uigame.state.states.game.uiController.spawnStackFrom.push(data.useID);
                    uigame.state.states.game.uiController.spawnStackTo.push(data.TargetID);

                    break;
            }
        });

        //GoalINFO 골인 정보
        socket.on('GoalINFO', function (data) {
            if (alonemode) return;
            // $('#goalin').html('');
            // for(var i in data){
            //     var s = $("<div id='g_"+data[i].uid+"'></div>");
            //     s.append(JSON.stringify(data[i]));
            //     $('#goalin').append(s);
            // }

            if (true) {
                for (_i_ = 0; _i_ < 4; _i_++) {
                    net_userallfin[_i_] = undefined;
                }
                for (_i_ = 0; _i_ < data.length; _i_++) {
                    net_userallfin[_i_] = data[_i_].uid;
                }
            }//true

            //종료 타이머 시작
            mode20sec = true; //게임1등 기록후, 종료타이머 시작
            //1등이면 타이머 출력 안되기ㅔ
            if (data[0].uid == net_yourname) {
                uigame.state.states.game.uiController.tx20sec.visible = false;
            }

        });
        //1명당 골인시 받는데이터
        //data[0].goalTime = "2017-4-12 14:46:31::830"
        //rank = 1
        //uid = "your device"

        //게임 종료 게임상태가 play : 2 -> Rady : 1
        socket.on('gameEnd', function (data) {

            //alert('end game');
            playst = true;
            TagetList(data.addinfo);

            //TweenMax.delayedCall(1.5, function () {
            uigame.state.states.menu.uiresult.onRefreshResult();


            // }); //자동꺼짐


            //게임종료 결과 저장 하려고
        });

    });
//-------------------------------클릭시 이벤트 함수들
    $('#leaveRoomBut').click(function () {
        socket.emit('leaveRoom'); //방에서 나가기 html버튼클릭시
    });
    $('#msgSendBut').click(function () {
        socket.emit('sendMsg', 'TEST_MSG'); //전체메세지 보내기
    });

    // 내정보 전달
    $('#loginINFO').click(function () {
        socket.emit('loginINFO', {"uid": $('#uid').val(), "saveData": saveData}); //로그인실행
    });

    //radyRoomIn
    $('#radyRoomIn').click(function () {
        socket.emit('radyRoomIn', {"uid": "angelical2"}); //방에 들어가기
    });

    // 강제시작 compulsiongogo
    $('#compulsiongogo').click(function () {
        $('#compulsiongogo').hide();
        playst = false;
        socket.emit('compulsionGo');
    });

    //TGmsgSendBut
    $('#TGmsgSendBut').click(function () { //선택한 상대방에게 메세지 보내기
        // 아이템 카운트 같은 아이템은 1개만 사용가능 서버에서 같은 아이템을 받을 경우 패스 예외처리됨
        if (item_num <= 3) {
            var item = itemTYPE['ITEM_' + item_num++];
            socket.emit('sendTargetMsg', {"useID": $('#uid').val(), "TargetID": $('#TargetID').val(), "ITEM": item});
        }
    });

    var TagetList = function (data) {
        if (false) {
            // $('#TargetID').html('');
            // $('#listINFO').html('');
            for (var i in data) {
                if (data[i].uid != $('#uid').val()) {
                    $('#TargetID').append('<option value="' + data[i].uid + '">' + data[i].uid + '</option>');
                }
                var s = $("<div id='" + data[i].uid + "'></div>");
                s.append(JSON.stringify(data[i]));
                $('#listINFO').append(s);
            }
            if (playst && data.length > 1) {
                $('#compulsiongogo').show();
            } else {
                $('#compulsiongogo').hide();
            }
        }//false
        //------------------------------------------

        if (alonemode) {
        } else {
            for (_i_ = 0; _i_ < data.length; _i_++) {
                net_userall[_i_] = data[_i_].uid;
            }
            for (_i_ = 0; _i_ < data.length; _i_++) {
                net_userallkill[_i_] = data[_i_].killMark;
            }
            switch (data.length) {
                case 1:
                    net_userall[1] = undefined;
                case 2:
                    net_userall[2] = undefined;
                case 3:
                    net_userall[3] = undefined;
                    break;
            }
            if (dm) console.log("targetlist: " + net_userall[0] + ", " + net_userall[1] + ", " + net_userall[2] + ", " + net_userall[3] + ", ");
        }

    };
//});
}