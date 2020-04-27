var server_url = {
    URL: "https://5minutesgame.hu.co.kr/gamelog/",
    GAME_ID: 7,
    startType: 0,
    gameIdx: null,
    startTime: 0,
    gameStart: function () {
        if (!gc.isLocalPlay) {
            var data = {proc: "gameStart"};
            data.gameId = this.GAME_ID,
                data.type = this.startType,

                $.ajax(
                    {
                        url: this.URL,
                        type: "GET",
                        dataType: "jsonp",
                        data: data,
                        success: function (t) {
                            server_url.gameIdx = t.game_idx,
                                server_url.startTime = t.start_datetime
                        },
                        error: function (t, e, i) {
                        }
                    })
        }
    },

    gameEnd: function (stage, stage) {
        if (!gc.isLocalPlay) {
            var data = {
                proc: "gameScoreSave"
            };
            data.gameId = this.GAME_ID,
                data.type = this.startType,
                data.score = stage,
                data.stage = stage,
                data.game_idx = this.gameIdx,
                data.start_datetime = this.startTime,
                $.ajax(
                    {
                        url: this.URL,
                        type: "GET",
                        dataType: "jsonp",
                        data: data,
                        success: function (t) {
                            server_url.startType = 1
                        },
                        error: function (t, e, i) {
                        }
                    })
        }
    }
};

window.DataManager = server_url