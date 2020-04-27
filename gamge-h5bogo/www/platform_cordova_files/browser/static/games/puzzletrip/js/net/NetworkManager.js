
//OK Cashbag 오락실 전용

var NetworkManager =
{

    sendData:function($type, $data, $func, $target)
    {
        var server_url = '/arcade/';
        var type = $type;
        var data = $data;
        var func = $func;//리턴 함수
        var target = $target;

        if(! gc.localTest)
        {
            data.sessionId = getSessionId();
        }

        var alertMsg = "type : " + type + "\n";
        for( var k in $data)
        {
            alertMsg += ("send data => " + k + " : " + $data[k] + "\n");
        }

        //alert(alertMsg);

        var url, eventType, msg;
        if(type == 'startGame')
        {
            // 게임시작
            //url = server_url + 'ocbStartGame.mocb';
            data.proc = 'startGame';
            msg = "There was a communication problem during transmission.\n\nDo you want to retransmit?";
        }
        else if(type == 'scoreSave')
        {
            //alert(JSON.stringify(data));
            // 게임종료
            //url = server_url + 'endGame.mocb';
            data.proc = 'endGame';
            msg = "There was a communication problem while transferring game results.\n\nGame results Do you want to retransmit?";
        }
        else if(type == 'gameLog')
        {
            if(gc.localTest)
            {
                return;
            }

            // 게임종료
            //url = server_url + 'ongoing.mocb';
            data.proc = 'ongoing';
            msg =  "There was a communication problem during log transfer.\n\nDo you want to retransmit?";
        }



        $.ajax({
            url:server_url,
            type: "POST",
            dataType: "json",
            data : data,
            success:function(data)
            {
                if(type == 'gameLog') return;

                var alertMsg = "";
                for( var k in data)
                {
                    alertMsg += ("success data => " + k + " : " + data[k] + "\n");
                }
                //alert(alertMsg);
                //alert(JSON.stringify(data));



                var code = parseInt(data.resultCode);
                if(code == 0)
                {
                    func.call(target, data);
                }
                else if(code == 1 || code == 2 || code == 7)
                {
                    OcbApplicationJS.showPopup(data.resultMsg, "");
                    OcbApplicationJS.requestCloseWindow();
                }
                else
                {
                    OcbApplicationJS.showPopup("An error has occurred \ nPlease contact your administrator.", "");
                    OcbApplicationJS.requestCloseWindow();
                }
            },

            error:function(xhr, status, error)
            {
                if(type == 'gameLog') return;

                var alertMsg = "";
                for( var k in data)
                {
                    alertMsg += ("fail data => " + k + " : " + data[k] + "\n");
                }
                //alert(alertMsg);

                if(confirm(msg))
                {
                    NetworkManager.sendData(type, data, func, target);
                }
                else
                {
                    OcbApplicationJS.requestCloseWindow();
                }
            }
        })
    },
    sendData2:function($type, $data, $func, $target)
    {

        return;
        var server_url = 'https://5minutesgame.hu.co.kr/gamelog/';
        var type = $type;
        var data = $data;
        var func = $func;//리턴 함수
        var target = $target;

        //if(! gc.localTest)
        //{
        //    data.sessionId = getSessionId();
        //}

        var alertMsg = "type : " + type + "\n";
        for( var k in $data)
        {
            alertMsg += ("send data => " + k + " : " + $data[k] + "\n");
        }

        //alert(alertMsg);

        var url, eventType, msg;
        if(type == 'gameStart')
        {
            // 게임시작
            //url = server_url + 'ocbStartGame.mocb';
            data.proc = 'gameStart';
            msg = "There was a communication problem during transmission.\n\nDo you want to retransmit?";
        }
        else if(type == 'gameScoreSave')
        {
            //alert(JSON.stringify(data));
            // 게임종료
            //url = server_url + 'endGame.mocb';
            data.proc = 'gameScoreSave';
            msg = "There was a communication problem while transferring game results.\n\nGame results Do you want to retransmit?";
        }



        $.ajax({
            url:server_url,
            type: "GET",
            dataType: "jsonp",
            async:false,
            data : data,
            success:function(data)
            {
                var alertMsg = "";
                for( var k in data)
                {
                    alertMsg += ("success data => " + k + " : " + data[k] + "\n");
                }
                //alert(alertMsg);
                //alert(JSON.stringify(data));
                func.call(target, data);
            },

            error:function(xhr, status, error)
            {

            }
        })
    }
};
