// -- user code here --
//new code
/* --- start generated code --- */
// Generated by  1.4.4 (Phaser v2.6.2)

/**
 * Boot.
 */
function Boot() {	
	Phaser.State.call(this);	
}

/** @type Phaser.State */
var Boot_proto = Object.create(Phaser.State.prototype);
Boot.prototype = Boot_proto;
Boot.prototype.constructor = Boot;

Boot.prototype.init = function () {
	
	console.log(_DEFINE.VERSION);
    this.firstPortrait = false;
    this.firstLandScape = false;
    this.callReSize     = null;
	this.game.stage.disableVisibilityChange = false;
	this.initScreenSize();
	
};
Boot.prototype.preload = function () {
	
	this.load.pack('boot', 'assets/pack.json');	
};
Boot.prototype.create = function () {
	this.game.plugin = 	this.game.plugins.add(PhaserSpine.SpinePlugin);
	
};
/* --- end generated code --- */
// -- user code here --
Boot.prototype.update = function(){

	if(this.load.cache.checkImageKey('backtile') 		== true)
	if(this.load.cache.checkImageKey('rotate') 		== true)
	if(this.load.cache.checkImageKey('movi_game') 	== true)
	if(this.load.cache.checkImageKey('loadback') 	== true)
	if(this.load.cache.checkImageKey('Loading_banner') 	== true)
	if(this.load.cache.checkImageKey('loadprocess') == true)
	{
		this.game.state.start("Preloader");	
	}	 
};
Boot.prototype.initScreenSize= function(){
	
    var that = this;    
    this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    this.firstPortrait  = Define.LANDSCAPE;
    this.firstLandScape = !Define.LANDSCAPE;

    if (this.game.device.desktop) {

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
Boot.prototype.callBackReSize = function (callback) {

    this.callReSize = function() 
    {
        if(callback !== undefined)   callback(this.isLandscape);
    };
},

Boot.prototype.reScreenSize = function () {
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
};

Boot.prototype.Initialize = function()
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
    // Prevent certain keys from propagating to the browser:	
    var arrPreventedKeys = [
        Phaser.Keyboard.SPACEBAR,
        Phaser.Keyboard.UP,
        Phaser.Keyboard.DOWN,
        Phaser.Keyboard.LEFT,
        Phaser.Keyboard.RIGHT
    ];
    this.game.input.keyboard.addKeyCapture(arrPreventedKeys);
    this.networkManager = NetworkManager(this.getServiceString(), function() { });
};

