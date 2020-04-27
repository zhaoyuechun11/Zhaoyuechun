'use strict';
function NetworkManager() {
	var args = Array.prototype.slice.call(arguments);// arguments을 배열로 바꾼다.
	var callback = args.pop();// 마지막 인자는 콜백 함수
	var modules = (args[0] && typeof args[0] === "string") ? args : args[0];// 모듈은 배열로 전달될 수도있고 개별 인자로 전달 될 수도 있습니다.
	// 함수가 생성자로 호출되도록 보장(new를 강제하지 않는 패턴)
	if (!(this instanceof NetworkManager)) return new NetworkManager(modules, callback);
	// "this객체에 모듈을 추가" : 모듈이 없거나 "*"(전부)이면 사용 가능한 모든 모듈을 사용한다는 의미입니다.
	if (!modules || modules === '*' || modules[0] === '*') {
		modules = [];
		for (var i in NetworkManager.Modules) {
			if (NetworkManager.modules.hasOwnProperty(i)) {
				modules.push(i);
			}
		}
	}
	// 필요한 모듈들을 초기화
	for (var i=0, m_length=modules.length; i<m_length; i+=1) {
		NetworkManager.modules[modules[i]](this);
	}
	// 콜백 함수 호출
	callback(this);
	//==================================================================================
	// 여기서 부터 변수선언..
	//==================================================================================
}

// 필요한 프로토타입 프로퍼티들을 추가
NetworkManager.prototype = {
    name: "NetworkManager",//
    version:"1.0.0",
    getName: function () {
        return this.name;
    },
    refresh : function(callback) {

    },
    AppDataGet : function(args, callback) {

    },
    AppDataPut : function(args, callback) {

    },
    AppDataRemove : function(args, callback) {

    },
    RankingGet : function(callback) {

    },
    RankingAdd : function(args, callback) {

    },
    GetNaverShop : function(args, callback) {
    },
};

NetworkManager.modules = {
    naver : function (box) {
        box.refresh = function(callback) {
            GamePocket.SdkLoader.onLoad(function(){
                GamePocket.Sdk.refresh(function(response){
                    if(callback) callback(response);
                });
            });
        };
        box.AppDataGet = function(args, callback) {
            GamePocket.Sdk.AppData.get(args, function(response) {
                if(response.code == 0){
                    var parsing = JSON.stringify(response.result).replace(/\"\[/gi, "[").replace(/\]\"/gi, "]");
                    parsing = parsing.replace(/\"\{/gi, "{").replace(/\}\"/gi, "}");
                    parsing = parsing.replace(/\"true\"/gi, "true").replace(/\"false\"/gi, "false");
                    if(callback) callback(JSON.parse(parsing));
                }else{ //fail process

                }
            });
        };
        box.AppDataPut = function(args, callback) {
            GamePocket.Sdk.AppData.put(args, function(response) {
                if(response.code == 0){
                    if(callback) callback(response.result);
                }else{ //fail process

                }
            });
        };
        box.AppDataRemove = function(args, callback) {
            GamePocket.Sdk.AppData.remove(args, function(response) {
                if(response.code == 0){
                    if(callback) callback(response.result);
                }else{ //fail process

                }
            });
        };
        box.RankingGet = function(callback) {
            GamePocket.Sdk.Ranking.get(function(response) {
                if(response.code == 0){
                    if(callback) callback(response.result);
                }else{ //fail process

                }
            });
        };
        box.RankingAdd = function(args, callback) {
            GamePocket.Sdk.Ranking.add(args, function(response) {
                if(response.code == 0){
                    if(callback) callback(response.result);
                }else{ //fail process

                }
            });
        };
        box.GetNaverShop = function(args, callback) {

        };

    },
    yahoo : function (box) {
        box.refresh = function(callback) {
            console.log("yahoo network");
        };
        box.AppDataGet = function(args, callback) {

        };
        box.AppDataPut = function(args, callback) {

        };
        box.AppDataRemove = function(args, callback) {

        };
        box.RankingGet = function(callback) {

        };
        box.RankingAdd = function(args, callback) {

        };


    },
    movi: function (box) {
        box.refresh = function(callback) {
            console.log("movi network");
        };
        box.AppDataGet = function(args, callback) {

        };
        box.AppDataPut = function(args, callback) {

        };
        box.AppDataRemove = function(args, callback) {

        };
        box.RankingGet = function(callback) {

        };
        box.RankingAdd = function(args, callback) {

        };

    }
};

window[''] = window[''] || {};
window[''].NetworkManager = NetworkManager;



