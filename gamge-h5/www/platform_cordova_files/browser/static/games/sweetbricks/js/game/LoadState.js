LoadState = function(game) {
	this.game = game;
    this._i = 0;
    this._i2 = 0;
    this._i3 = 0;
    this._i4 = 0;
    this._i5 = 0;
};

LoadState.prototype = {
	preload: function()
	{
        if(dm) console.log("- LoadState.preload");

        //리사이즈 함수 시작 가능시점
        beginResize=true;
        //새로추가
        xc=this.world.centerX;
        yc=this.world.centerY;

        var logopicy = 440; //모비로고 y위치
        var logonamey = 610;//"0%"글자 y위치

        //배경색
        this.stage.backgroundColor = '#FFFFFF';
        //로고흑백
        /*this.backgroundlogoMono = this.add.sprite(xc, logopicy, 'preloaderLogoMono');
        this.backgroundlogoMono.anchor.setTo(0.5, 0.5);
        //로고컬러
        this.zXoff = this.backgroundlogoMono.width*0.5;
        this.backgroundlogoColor = this.add.sprite(xc-this.zXoff, logopicy, 'preloaderLogoColor'); //마스크적용-위치
        this.backgroundlogoColor.anchor.setTo(0, 0.5);                                      //마스크적용-피봇
        this.load.setPreloadSprite(this.backgroundlogoColor);                               //마스크적용
        //회사이름이미지
        this.backgroundText = this.add.sprite(xc, logonamey, 'preloaderLogoText');
        this.backgroundText.anchor.setTo(0.5, 0.5);
        //퍼센트표시
        this.loadingText = this.add.text(xc, 730, "99%", { font: "23px Arial", fill: "#2E85ED", align: "center" });
        this.loadingText.anchor.setTo(0.5, 0.5);*/

        //이벤트콜백 //this.game.load도 동일
        /*this.load.onLoadStart.add(this.loading_start, this);
        this.load.onFileComplete.add(this.loading_fileComplete, this);*/
        this.load.onLoadComplete.add(this.loading_loadComplete, this);


        //this.dummytext = this.add.text(720, 1280, "", { font: "40px Conv_FZHPFW_GB1", fill: "#ffffff", align: "center" });
        // //디버그 dddd//
        // boottxt+="load ";
        // var dddd = "\nfirst_width:"+first_width
        //     +"\nfirst_height:"+first_height
        //     +"\n.innerWidth:"+window.innerWidth
        //     +"\n.innerHeight:"+window.innerHeight
        //     +"\nw.width():" + $(window).width()
        //     +"\nw.height():" +$(window).height()
        //     +"\nisPotrait:"+isPotrait
        //     + "\nseq:"+boottxt;
        //
        //
        // ddtx = this.add.text(xc, yc-300, dddd, { font: "50px Bold Arial",
        //     fill: "#000000", align: "center" });
        // ddtx.anchor.setTo(0.5, 0.5);
        // //디버그 dddd//

        this.zhuye002  = this.add.sprite(xc, yc, 'zhuye002');

        this.zhuye002.anchor.set(.5),
        this.zhuye002.scale.set(.1),
        this.zhuye002.rotation = 20,
        this.tween ? this.tween.kill() : this.tween = new TimelineLite,
        this.tween.to(this.zhuye002, 1, {
            rotation: 0, ease: Sine.easeOut
        }),
        this.tween.call(this.showLocoText.bind(this)),
        TweenMax.to(this.zhuye002.scale, 1, {x: 0.5, y: 0.5});


        //새로추가
        var i, len;
        //피엔지리스트를 로더에 준비
        for(i=0, len=PngList.length; i<len; i++){
            this.load.image(PngList[i].name, PngList[i].url);//이름,png
        }
        //미니맵이미지들(이미지압축때문에 아틀라스사용 안함)
        for(i=0, len=PngList_minimap.length; i<len; i++){
            this.load.image(PngList_minimap[i].name, PngList_minimap[i].url);//이름,png
        }

        //아틀라스리스트를 로더에 준비
        for(i=0, len=AtlasList.length; i<len; i++) {
            this.load.atlas(AtlasList[i].name, AtlasList[i].url[0], AtlasList[i].url[1]);//이름,png,json
        }
        //스파인리스트를 로더에 준비
        this.game.plugins.add(PhaserSpine.SpinePlugin);
        for(var i=0, len=SpineList.length; i<len; i++) {
            this.load.spine(SpineList[i].name, SpineList[i].url);
        }

        //비트맵폰트를 로더에 준비
        for(i=0, len=BitmapFontList.length; i<len; i++) {
            this.load.bitmapFont( BitmapFontList[i].name, BitmapFontList[i].url[0], BitmapFontList[i].url[1]);
        }
        //사운드리스트를 로더에 준비
        for(i=0, len=SoundList.length; i<len; i++){
            this.load.audio(SoundList[i].name, SoundList[i].url);
        }
        //새로추가
    },

    showLocoText: function () {
        TweenMax.to(this.zhuye002, 0.2, {
            x: this.world.centerX + 50, ease: Sine.easeIn
        });

        this.loading02  = this.add.sprite(this.world.centerX - 70, 610, 'loading02');
        this.loading02.anchor.set(.5);
        this.loading02.scale.set(.2);
        //this.loading02.alpha = 0;
        /*TweenMax.to(this.loading02, 1, {
            alpha: 1, ease: Sine.easeOut
        });*/

        TweenMax.to(this.loading02.scale, 0.3, {x: 0.6, y: 0.6, ease: Sine.easeOut, onComplete:(function () {
            TweenMax.to(this.loading02.scale, 0.2, {x: 0.5, y: 0.5, onComplete:(function () {

                }).bind(this)});
        }).bind(this)});
    },

    loading_start: function() {
        this.loadingText.setText("0%");
    },
    loading_fileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles) {
        this.loadingText.setText(progress + "%");
        //디버깅// this.loadingText.setText(progress + " (prgress)\n"+cacheKey+" (cacheKey)\n"+success+" (success)\n"+totalLoaded+" (totalLoaded)\n"+totalFiles+" (totalFiles)");
    },

    loading_loadComplete: function() {
        //this.loadingText.setText("100%");
        if (this.tween) this.tween.kill();
        this.zhuye002.destroy(true, true);
        if (this.loading02) this.loading02.destroy(true, true);
    },
    //--오디오압축풀어 사운드 나오게 하려다 실패--
    // loading_loadComplete: function() {
    //     this.loadingText.setText("100%");
    //     mp3name = [];
    //     for(i=0, len=SoundList.length; i<len; i++){
    //         mp3name.push(SoundList[i].name);
    //     }
    //     //this.game.sound.setDecodedCallback(mp3name, this.audioReady, this);
    //     uigame.sound.setDecodedCallback(mp3name, this.audioReady, this);
    //
    // },
    // audioReady: function(){
    //     console.log("audioReady!!");
    // },
    //--오디오압축풀어 사운드 나오게 하려다 실패--

	create: function()
	{

        //naverShop = new NaverShop(uigame, this.naver); //혜관님 추가본
        //naverShop2 = new NaverShop(uigame, this.naver); //혜관님 추가본
        if(dm) console.log("- LoadState.create");

		this.game.state.start('menu');

        //사운드 추가
        BGM_ALL                    = this.game.add.audio( 'BGM_ALL.mp3', 1, true);         //타이틀 배경음
        BGM_ALL.loop = true;
        BGM_Game_Nomal             = this.game.add.audio( 'BGM_Game_Nomal.mp3', 1, true);          //게임 배경음
        BGM_Game_Nomal.loop = true;
        BGM_Game_Ranking           = this.game.add.audio( 'BGM_Game_Ranking.mp3', 1, true);          //게임 배경음
        BGM_Game_Ranking.loop = true;

        SE_Click                   = this.game.add.audio( 'SE_Click.mp3', 1, false);         //기본 클릭음
        //-------
        SE_Ball                    = this.game.add.audio( 'SE_Ball.mp3', 1, false);         //기본 클릭음
        SE_BearJelly_Produce       = this.game.add.audio( 'SE_BearJelly_Produce.mp3', 1, false);//곰 젤리 생성음//곰 젤리 생성 시.
        SE_BearJelly_Transform     = this.game.add.audio( 'SE_BearJelly_Transform.mp3', 1, false);//곰 젤리 변신음//곰 젤리가 분열하거나, 팽창할 때 사운드.
        SE_Brick_Extinction        = this.game.add.audio( 'SE_Brick_Extinction.mp3', 1, false);//벽돌 소멸음//벽돌 소멸 시.

        SE_BrickShell_Remove       = this.game.add.audio( 'SE_BrickShell_Remove.mp3', 1, false);//벽돌 껍질 제거음 //	초코 벽돌 껍질 제거 시.
        SE_InvincibleBrick_Blow    = this.game.add.audio( 'SE_InvincibleBrick_Blow.mp3', 1, false);//무적 벽돌 타격음	//공과 무적 벽돌 충돌 시.
        SE_Item_Bad                = this.game.add.audio( 'SE_Item_Bad.mp3', 1, false);//나쁜 아이템 획득음 //나쁜 아이템 획득 시.
        SE_Item_Good               = this.game.add.audio( 'SE_Item_Good.mp3', 1, false);//좋은 아이템 획득음 //좋은 아이템 획득 시.
        SE_Paddle_Apper            = this.game.add.audio( 'SE_Paddle_Apper.mp3', 1, false);//패들 등장음	//패들이 생성 될 때.
        SE_Popup_OFF               = this.game.add.audio( 'SE_Popup_OFF.mp3', 1, false); //팝업창 닫힘음	//모든 팝업창이 닫힐 때.
        SE_Popup_ON                = this.game.add.audio( 'SE_Popup_ON.mp3', 1, false);  //팝업창 열림음	//모든 팝업창이 열릴 때.
        SE_Star_Get                = this.game.add.audio( 'SE_Star_Get.mp3', 1, false);  //별점 연출음 //획득한 별점이 박힐 때.
        SE_Transform               = this.game.add.audio( 'SE_Transform.mp3', 1, false);  //변신음 //	아이템을 획득하여 패들이나 공에 사이즈 변화가 있을 때 사운드.
        //-------
        //-------새로 추가된 효과음
        SE_BearJelly_Hit           = this.game.add.audio( 'SE_BearJelly_Hit.mp3',           1, false); //곰젤리 맞았을때
        SE_Fire                    = this.game.add.audio( 'SE_Fire.mp3',                    1, false); //공 발사시
        SE_GameOver                = this.game.add.audio( 'SE_GameOver.mp3',                1, false); //게임오버 문구
        SE_Go                      = this.game.add.audio( 'SE_Go.mp3',                      1, false); //go 등장 -------------------------------------
        SE_Heart                   = this.game.add.audio( 'SE_Heart.mp3',                   1, false); //하트가 소모될때
        SE_InvincibleBrick_Blow_01 = this.game.add.audio( 'SE_InvincibleBrick_Blow-01.mp3', 1, false); //엔딩 무적블록터지는 연출사운드
        SE_Magnet                  = this.game.add.audio( 'SE_Magnet.mp3',                  1, false); //공 접착시
        SE_Paddle_Dead             = this.game.add.audio( 'SE_Paddle_Dead.mp3',             1, false); //패들이 파괴될때
        SE_Ready                   = this.game.add.audio( 'SE_Ready.mp3',                   1, false); //READY 등장 -------------------------------------
        SE_Score                   = this.game.add.audio( 'SE_Score.mp3',                   1, false); //점수가 올라갈 때
        SE_Shot                    = this.game.add.audio( 'SE_Shot.mp3',                    1, false); //미사일 발사
        SE_Star_off                = this.game.add.audio( 'SE_Star_off.mp3',                1, false); //패들이 죽어서 별점이 줄어들때
        SE_Brick_Extinction_F      = this.game.add.audio( 'SE_Brick_Extinction_F.mp3',      1, false); //폭발시(+관통조합)
        SE_Brick_Extinction_F_a    = this.game.add.audio( 'SE_Brick_Extinction_F.mp3',      1, false); //폭발시(+관통조합)
        SE_Brick_Extinction_F_b    = this.game.add.audio( 'SE_Brick_Extinction_F.mp3',      1, false); //폭발시(+관통조합)
        SE_Win                     = this.game.add.audio( 'SE_Win.mp3',                     1, false); //클리어문구가 나올때
        //-------새로 추가된 효과음

        //-------새로 추가된 효과음2
        SE_HurryUp                 = this.game.add.audio( 'SE_HurryUp.mp3',                 1, true); //
        SE_HurryUp2                = this.game.add.audio( 'SE_HurryUp2.mp3',                1, false); //
        SE_Heart_Brick_Extinction  = this.game.add.audio( 'SE_Heart_Brick_Extinction.mp3',  1, false); //
        SE_Page_Open               = this.game.add.audio( 'SE_Page_Open.mp3',               1, false); //
        SE_Brick_Drop              = this.game.add.audio( 'SE_Brick_Drop.mp3',              1, false); //
        //-------새로 추가된 효과음2
        //if(bSoundSE) SE_Transform.play();


        // //치트코드 //16까지 loadstate
        // kData = new Data();
        // InitData();
        // for (var i = LEVEL_MAX - 1; i >= 0; --i) {
        //     //if(i<45) kData.userData[i] = 2;
        //     if (i <14) { //보너스언락연출시작
        //         //페이지 열리기전 조건
        //         if (i < 9) kData.userData[i] = 3;
        //         else  kData.userData[i] = 2;
        //     }
        //     //if(i<3) kData.userData[i] = 2;
        //     //if(i<LEVEL_MAX-1) kData.userData[i] = 3;
        //     else kData.userData[i] = -1;
        // }
        // //치트코드 //16까지
	},
	
	shutdown: function() //로드상태제거
	{//게임시작1-3
        if(dm) console.log("- LoadState.shutdown");

		this.game = null;
		this.loadBar = null;
	},
    
    //update: function () { console.log("loadstate update!!!!"); },

    loadStart:function()  {
	        //text.setText("Loading ...");
            console.log("loadStart");
    },
    fileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles) {
        // text.setText("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);
        // var newImage = game.add.image(x, y, cacheKey);
        // newImage.scale.set(0.3);
        // x += newImage.width + 20;
        // if (x > 700) {
        //     x = 32;
        //     y += 332;
        // }
        console.log("fileComplete");
    },
    loadComplete: function () {
	    // text.setText("Load Complete");
        console.log("loadComplete");
    }

};
