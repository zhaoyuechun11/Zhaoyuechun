'use strict';


function MoviGame() {
	var args = Array.prototype.slice.call(arguments);// arguments을 배열로 바꾼다.
	var callback = args.pop();// 마지막 인자는 콜백 함수
	var modules = (args[0] && typeof args[0] === "string") ? args : args[0];// 모듈은 배열로 전달될 수도있고 개별 인자로 전달 될 수도 있습니다.
	// 함수가 생성자로 호출되도록 보장(new를 강제하지 않는 패턴)
	if (!(this instanceof MoviGame)) return new MoviGame(modules, callback);
	// "this객체에 모듈을 추가" : 모듈이 없거나 "*"(전부)이면 사용 가능한 모든 모듈을 사용한다는 의미입니다.
	if (!modules || modules === '*' || modules[0] === '*') {
		modules = [];
		for (var i in MoviGame.Modules) {
			if (MoviGame.modules.hasOwnProperty(i)) {
				modules.push(i);
			}
		}
	}
	// 필요한 모듈들을 초기화
	for (var i=0, m_length=modules.length; i<m_length; i+=1) {
		MoviGame.modules[modules[i]](this);
	}
	// 콜백 함수 호출
	callback(this);
	//==================================================================================
	// 여기서 부터 변수선언..
	//==================================================================================
    this.state = Enum.MOVI_STATE.PreLoader;
    // Phaser
    this.game = null;
    this.resourcesManager = null;
    this.networkManager = null;
    this.MGButton = null;
    this.version = Define.VERSION;
    this.storage = null;

    this._sound = null;
    this._bgm = null;

    this.firstPortrait = false;
    this.firstLandScape = false;

    this.callReSize = null;

    this.gameSheetsData = null;

    //document.getElementById("myimage").requestFullscreen();
}

// 필요한 프로토타입 프로퍼티들을 추가
MoviGame.prototype = {
    name: "Daruma",//

    getName: function () {
        return this.name;
    },
    getServiceString: function () {
        return Define.SERVICE == Enum.SERVICE_CODE.MOVI_KR ? 'movi' :
                Define.SERVICE == Enum.SERVICE_CODE.YAHOO ? 'yahoo' :
                Define.SERVICE == Enum.SERVICE_CODE.NAVER ? 'naver' :
                'none';
    },
    Initialize : function(game)
    {
        // 디바이스 구분.
		if (/Android/i.test(navigator.userAgent))
			Define.DEVICE = Enum.DEVICE_STATE.ANDROID;
		else if (/iPhone|iPad|iPod/i.test(navigator.userAgent))
			Define.DEVICE = Enum.DEVICE_STATE.IOS;
		else
			Define.DEVICE = Enum.DEVICE_STATE.PC;

		// 접속경로 구분.
		if(document.location.href.indexOf('game.jp') > -1)
			Define.SERVICE = Enum.SERVICE_CODE.MOVI_JP;
		else if(document.location.href.indexOf('yahoo-net.jp') > -1)
			Define.SERVICE = Enum.SERVICE_CODE.YAHOO;
		else if(document.location.href.indexOf('naver.com') > -1)
			Define.SERVICE = Enum.SERVICE_CODE.NAVER;
		else
			Define.SERVICE = Enum.SERVICE_CODE.MOVI_KR;

        this.game = game;
        // Prevent certain keys from propagating to the browser:
        var arrPreventedKeys = [
            Phaser.Keyboard.SPACEBAR,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.DOWN,
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT
        ];
        this.game.input.keyboard.addKeyCapture(arrPreventedKeys);

        this.resourcesManager = game.plugins.add(ResourcesManager);
        this.MGButton = game.plugins.add(MGButton);
        this.game.plugins.add(PhaserSpine.SpinePlugin);
        this.networkManager = NetworkManager(this.getServiceString(), function() { });
        this.storage = game.plugins.add(StorageManager);

        this.initScreenSize();
    },
    initScreenSize: function(){
        var that = this;
        this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;

        this.firstPortrait = Define.LANDSCAPE;
        this.firstLandScape = !Define.LANDSCAPE;

        if (this.game.device.desktop) {
            //데스크탑환경
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;    //축소확대 비율유지
            this.game.pageAlignHorizontally = false;//game.stage.scale.pageAlignHorizontally = true;
            this.game.pageAlignVertically = false;//game.stage.scale.pageAlignVertically = true;
            this.game.scale.parentIsWindow = true;//지우니간 폭만 맞고 길이가 길어지는 화면이 됨
        }
        else {
            var landscape = false;
            this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;

            if(window.orientation !== undefined)
            {
                if(window.orientation === 0)
                {
                    landscape = false;
                }
                else
                    landscape = true;
            }
            else
            {
                if(Define.staticWidth < Define.staticHeight)
                {
                    landscape = false;
                }else
                {
                    landscape=  true;//this.game.scale.forceLandscape;
                }
            }


            var ratio_w = parseFloat(Define.staticWidth / this.game.width);
            var ratio_h = parseFloat(Define.staticHeight / this.game.height);


            if (landscape === true) {
                document.getElementById("turn").style.display = Define.LANDSCAPE === false ? "block" : "none";
                this.firstLandScape = true;
            }
            else {
                document.getElementById("turn").style.display = Define.LANDSCAPE === false ? "none" : "block";
                this.firstPortrait = true;
            }
            this.game.scale.setUserScale(ratio_w, ratio_h);
        }

        window.addEventListener("orientationchange", function() {
            that.reScreenSize();

        });
        this.game.scale.setResizeCallback(function(scale, parentBounds) {
            // that.reScreenSize();
        });

    },
    callBackReSize : function (callback) {

        this.callReSize = function() {
            if(callback !== undefined)
                callback(this.isLandscape);
        };
        //callback = this.callReSize;
    },
    reScreenSize : function () {
        var landscape = false;
        if(!this.game.device.desktop){// && !this.game.device.iOS) {
            //일반적인 안드로이드
            if(window.orientation !== undefined)
            {
                if(window.orientation === 0)
                {
                    landscape = false;
                }
                else
                    landscape = true;
            }
            else
            {
                if(window.innerWidth < window.innerHeight)
                {
                    landscape = false;
                }else
                {
                    landscape=  true;//this.game.scale.forceLandscape;
                }
            }
            var ratio_w = parseFloat(Define.staticWidth / this.game.width);
            var ratio_h = parseFloat(Define.staticHeight / this.game.height);



            if (landscape === false) {
                document.getElementById("turn").style.display = Define.LANDSCAPE === false ? "none" : "block";
                if(this.firstPortrait === false)
                {
                    location.reload();
                }
                if(Define.LANDSCAPE === true)
                    this.game.scale.setUserScale(parseFloat(Define.staticHeight / this.game.width), parseFloat(Define.staticWidth / this.game.height));
                else
                    this.game.scale.setUserScale(ratio_w, ratio_h);
            }
            else {
                document.getElementById("turn").style.display = Define.LANDSCAPE === false ? "block" : "none";
                if(this.firstLandScape === false)
                {
                    location.reload();
                }
                if(Define.LANDSCAPE === false)
                    this.game.scale.setUserScale(parseFloat(Define.staticHeight / this.game.width), parseFloat(Define.staticWidth / this.game.height));
                else
                    this.game.scale.setUserScale(ratio_w, ratio_h);

            }
        }
        this.game.scale.refresh();
        if(this.callReSize !== null)
            this.callReSize(landscape);
    }
};

MoviGame.modules = {
    utils : function (box) {
        box.Init = function() {
            console.log("  utils  ==");
        };
        box.GetSecondsToTimeString = function(s) {
            var min = Math.floor(s/60);
            var sec = Math.floor(s%60);
            var strMin = (min >= 10) ? min.toString():"0"+min;
            var strSec = (sec >= 10) ? sec.toString():"0"+sec;
            return (strMin+':' +strSec);
        };
		box.AddSprite = function(parent, x, y, atlas, imgName, color, alpha, ax, ay, width, height) {
			var spr = this.game.add.sprite(x, y, atlas, imgName);
			if(color != undefined) spr.tint = 0x000000;
			if(alpha != undefined) spr.alpha = alpha;
			if(ax == undefined) 	spr.anchor.x = 0.5;
			else					spr.anchor.x = ax;
			if(ay == undefined) 	spr.anchor.y = 0.5;
			else					spr.anchor.y = ay;
			if(width != undefined)	spr.width = width;
			if(height != undefined)	spr.height = height;
			parent.addChild(spr);
			return spr;
		};
		box.AddSpriteNine = function(parent, x, y, atlas, imgName, w, h, style, ax, ay, color){
			var spr = new PhaserNineSlice.NineSlice(MG.game, x, y, atlas, imgName, w, h, style);
			if(ax == undefined) spr.anchor.x = 0.5;
			else				spr.anchor.x = ax;
			if(ay == undefined) spr.anchor.y = 0.5;
			else				spr.anchor.y = ay;
			if(color != undefined) spr.tint = color;
			parent.addChild(spr);
			return spr;
		};
		box.AddText = function(parent, x, y, txt, fontStyle, ax, ay) {
			var txt = MG.game.add.text(x, y, txt, fontStyle);
			if(ax == undefined) txt.anchor.x = 0.5;
			else 				txt.anchor.x = ax;
			if(ay == undefined)	txt.anchor.y = 0.5;
			else 				txt.anchor.y = ay;
			parent.addChild(txt);
			return txt;
		};
        box.textNumberCounting = function(text, cur_number, add_number, aniTime){
            var nFrameTime = 10;
            var nAdd = 0;
            var isEnd = false;
            var nFrame = parseInt(aniTime/nFra0meTime);
            var totalNum = cur_number + add_number;
            var increase_time;
            text.setText(MG.GetSecondsToTimeString(cur_number));

            increase_time = this.game.time.events.loop(10, function(){
                nAdd += (add_number / nFrame);

                if(nAdd+cur_number < totalNum)
                {
                    text.setText((cur_number +nAdd).toLocaleString());
                }
                else {
                    text.setText(totalNum.toLocaleString());
                    this.game.time.events.remove(increase_time);
                }

            }, this);
        };
        box.googleSheetsToData = function(sheetData)
        {

            var dicData = sheetData.substring(6); // json: ==> 제거
            console.log(dicData);
            //JSON.stringify(dicData);
            return JSON.parse(dicData);

        };
        box.loadGameSheetsData = function(sheet,google, callback)
        {
            var that = this;
        // this.gameSheetsData = [];

            if(google === false)
            {
                that.gameSheetsData = that.googleSheetsToData(Define.SHEET_LOCAL_STRING);
                if(callback !== undefined)
                {
                    callback();
                }
                return;
            }

            var url = "https://spreadsheets.google.com/feeds/list/" +
                Define.GOOGLE_SPREADSHEET_ID + "/" +sheet+
                "/public/basic?alt=json";
            jQuery(function($){
                $.ajax({
                    type: "GET",
                    url: url,
                    dataType:"jsonp"
                }).done(function ( response ) {


                    var jsonString = JSON.stringify(response);
                    var tbString = JSON.parse(jsonString);
                    var strSheet = tbString.feed.entry[0].content.$t;

                    that.gameSheetsData = that.googleSheetsToData(strSheet);
                    if(callback !== undefined)
                    {
                        callback(response);
                    }
                    console.log(that.gameSheetsData);
                }).fail(function () {
                    that.gameSheetsData = that.googleSheetsToData(Define.SHEET_LOCAL_STRING);
                    if(callback !== undefined)
                    {
                        callback(response);
                    }
                });
            });
        };
    },
    audio: function (box) {
        this.isSfx = false;
        this.isBGM = false;

        box.Init = function() {

        };
        box.AudioInit = function() {

            //--크롬예외처리(안드로이드 사운드 예외처리)------------------
            if (this.game.device.android
                && this.game.device.chrome
                && this.game.device.chromeVersion >= 55) {

                this.game.sound.setTouchLock();

                this.game.input.touch.addTouchLockCallback(function () {
                    if (this.noAudio                  //크롬 안드로이드 모드--> false로 들어옴
                        //|| !this.touchLocked        //크롬 안드로이드 모드---> false로 들어옴
                        || this._unlockSource !== null   //크롬 안드로이드 모드---> null로 들어옴
                    ) {
                        return true;
                    }
                    if (this.usingWebAudio) {
                        // Create empty buffer and play it
                        // The SoundManager.update loop captures the state of it and then resets touchLocked to false

                        var buffer = this.context.createBuffer(1, 1, 22050);
                        this._unlockSource = this.context.createBufferSource();
                        this._unlockSource.buffer = buffer;
                        this._unlockSource.connect(this.context.destination);

                        if (this._unlockSource.start === undefined) {
                            this._unlockSource.noteOn(0);
                        }
                        else {
                            this._unlockSource.start(0);
                        }
                        //Hello Chrome 55!
                        if (this._unlockSource.context.state === 'suspended') {
                            this._unlockSource.context.resume();
                        }
                    }

                    //  We can remove the event because we've done what we needed (started the unlock sound playing)
                    return true;

                }, this.game.sound, true);

            }
            //--크롬예외처리(안드로이드 사운드 예외처리)------------------

            this.isSfx = true;
            this.isBGM = true;
            // this.isSfx = this.storage.StorageData['isSfx'];
            // this.isBGM = this.storage.StorageData['isBGM'];

            if(this.isSfx === undefined)this.isSfx = false;
            if(this.isBGM === undefined)this.isBGM = false;

            this.storage.set('isSfx', this.isSfx );
            this.storage.set('isBGM', this.isBGM );

            //
            this._sound = [];
            this._bgm = [];

            var audioList = ResourcesManager.Preloader['audio'];
            audioList.forEach(function(args) {
                if(args[2] === 'bgm')
                {
                    this._bgm[args[0]] = this.game.add.audio(args[0],1,true);
                }
                else
                {
                    this._sound[args[0]] = this.game.add.audio(args[0]);
                }

            }, this);

        };

        box.AudioSwitch = function(on) {
            this.isSfx = !on;
            this.isBGM = !on;

            this.storage.set('isSfx', this.isSfx );
            this.storage.set('isBGM', this.isBGM );
        };


        box.PlayAudio = function(sound, loop) {
            loop = loop || false;
            if(this.isSfx)
            {
                if(this._sound && this._sound[sound]) {
                    this._sound[sound].play('',0,1,loop);
                }
            }
        };
        box.StopAudio  = function(sound) {
            this._sound[sound].stop();
        };
        box.PlayBgm  = function(bgm, loop) {
            if(this.isBGM)
            {
                if(this._bgm && this._bgm[bgm]) {
                    if(loop === undefined)
                        loop = false;
                    //play: function (marker, position, volume, loop, forceRestart)
                    this._bgm[bgm].play('',0,1,loop);
                }
            }
        };
        box.StopBgm  = function(bgm) {
            this._bgm[bgm].stop();
        };
    }
};
window[''] = window[''] || {};
window[''].MoviGame = MoviGame;


