var naverShop;
var naverShop2;
var iCenterSizeX=720/2;
var iCenterSizeY=1280/2;
//var naverShop = new NaverShop(uigame);
var NaverShopThis=undefined;
function NaverShop(g, par) {

	//this.main = new PIXI.Container();
    this.main = g.add.group();

	this.imgPath = "./atlas/shop/";
	this.bLoad = false;
	this.gameList;
	this.cbReward;
	this.bInit = false;
    NaverShopThis = this;
	NaverShop.prototype.loadImg = function() {
		// var loader = PIXI.loader;
		// loader.add(this.imgPath+"btn_close.png", this.imgPath+"btn_close.png");
		// loader.add(this.imgPath+"btn_ok.png", this.imgPath+"btn_ok.png");
		// loader.add(this.imgPath+"btn_shop_1.png", this.imgPath+"btn_shop_1.png");
		// loader.add(this.imgPath+"icon_0001.png", this.imgPath+"icon_0001.png");
		// loader.add(this.imgPath+"icon_0002.png", this.imgPath+"icon_0002.png");
		// loader.add(this.imgPath+"icon_0003.png", this.imgPath+"icon_0003.png");
		// loader.add(this.imgPath+"icon_0004.png", this.imgPath+"icon_0004.png");
		// loader.add(this.imgPath+"icon_0005.png", this.imgPath+"icon_0005.png");
		// loader.add(this.imgPath+"icon_0006.png", this.imgPath+"icon_0006.png");
		// loader.add(this.imgPath+"icon_0007.png", this.imgPath+"icon_0007.png");
		// loader.add(this.imgPath+"icon_0008.png", this.imgPath+"icon_0008.png");
		// loader.add(this.imgPath+"icon_0009.png", this.imgPath+"icon_0009.png");
		// loader.add(this.imgPath+"icon_0010.png", this.imgPath+"icon_0010.png");
		// loader.add(this.imgPath+"icon_0011.png", this.imgPath+"icon_0011.png");
		// loader.add(this.imgPath+"icon_0012.png", this.imgPath+"icon_0012.png");
		// loader.add(this.imgPath+"icon_0015.png", this.imgPath+"icon_0015.png");
		// loader.add(this.imgPath+"list_1.png", this.imgPath+"list_1.png");
		// loader.add(this.imgPath+"point_bg_naver.png", this.imgPath+"point_bg_naver.png");
		// loader.add(this.imgPath+"popup_green.png", this.imgPath+"popup_green.png");
		// loader.add(this.imgPath+"shop_naver_film.png", this.imgPath+"shop_naver_film.png");
		// loader.add(this.imgPath+"shop_naver_info.png", this.imgPath+"shop_naver_info.png");
        //
		// loader.once('complete', this.Init.bind(this)); //cbLogoComplete->cbImageDownComplete(loader, res) //State.TITLE로 대기모드로-->GameViewSetting(res)
		// loader.load();

        g.load.onLoadStart.add(function () {}, this);
    	//g.load.onFileComplete.add(fileComplete, this);
        g.load.onLoadComplete.add(this.Init.bind(this), this);

        // //-----------상점이미지이동
        // g.load.image(this.imgPath+"btn_close.png", this.imgPath+"btn_close.png");
        // g.load.image(this.imgPath+"btn_ok.png", this.imgPath+"btn_ok.png");
        // g.load.image(this.imgPath+"btn_shop_1.png", this.imgPath+"btn_shop_1.png");
        // g.load.image(this.imgPath+"icon_0001.png", this.imgPath+"icon_0001.png");
        // g.load.image(this.imgPath+"icon_0002.png", this.imgPath+"icon_0002.png");
        // g.load.image(this.imgPath+"icon_0003.png", this.imgPath+"icon_0003.png");
        // g.load.image(this.imgPath+"icon_0004.png", this.imgPath+"icon_0004.png");
        // g.load.image(this.imgPath+"icon_0005.png", this.imgPath+"icon_0005.png");
        // g.load.image(this.imgPath+"icon_0006.png", this.imgPath+"icon_0006.png");
        // g.load.image(this.imgPath+"icon_0007.png", this.imgPath+"icon_0007.png");
        // g.load.image(this.imgPath+"icon_0008.png", this.imgPath+"icon_0008.png");
        // g.load.image(this.imgPath+"icon_0009.png", this.imgPath+"icon_0009.png");
        // g.load.image(this.imgPath+"icon_0010.png", this.imgPath+"icon_0010.png");
        // g.load.image(this.imgPath+"icon_0011.png", this.imgPath+"icon_0011.png");
        // g.load.image(this.imgPath+"icon_0012.png", this.imgPath+"icon_0012.png");
        // g.load.image(this.imgPath+"icon_0015.png", this.imgPath+"icon_0015.png");
        // g.load.image(this.imgPath+"list_1.png", this.imgPath+"list_1.png");
        // g.load.image(this.imgPath+"point_bg_naver.png", this.imgPath+"point_bg_naver.png");
        // g.load.image(this.imgPath+"popup_green.png", this.imgPath+"popup_green.png");
        // g.load.image(this.imgPath+"shop_naver_film.png", this.imgPath+"shop_naver_film.png");
        // g.load.image(this.imgPath+"shop_naver_info.png", this.imgPath+"shop_naver_info.png");
        // g.load.image(this.imgPath+"white1x1.png", this.imgPath+"white1x1.png");
        // //-----------상점이미지이동

        //추가-나인슬라이스
        //g.load.nineSlice(this.imgPath+"popup_green.png", this.imgPath+"popup_green.png", 50, 50, 150, 50);
        //g.load.nineSlice('my-image', '/images/my-image.jpg', 10, 15, 20, 30);
        //추가-나인슬라이스
        g.load.start();


	};

	NaverShop.prototype.Init = function() {
        var spr0 = g.add.sprite(iCenterSizeX, iCenterSizeY, this.imgPath+"white1x1.png");
        this.main.addChild(spr0);
        spr0.anchor.setTo(0.5, 0.5);
        spr0.scale.setTo(720, 1280);
        //var spr = SpriteLoad(this.main, "white.png", iCenterSizeX, iCenterSizeY);
		//spr.scale.set(iMaxSizeX/4, iMaxSizeY/4);
		spr0.tint = 0x000000;
		spr0.alpha = 0.9;
		//spr0.interactive = true;
        spr0.inputEnabled = true;
		//픽시----
		//spr = SpriteSliceLoad(this.main, this.imgPath+"popup_green.png", iCenterSizeX, iCenterSizeY, 670, 950, 50, 50, 150, 50);
     	//페이저---
        var spr = new PhaserNineSlice.NineSlice( g, iCenterSizeX, iCenterSizeY, this.imgPath+"popup_green.png",null,
            670, 950, {top: 150, bottom: 50, left: 50, right: 50}
        );
        spr.anchor.setTo(0.5, 0.5);//spr.resize(100,200);//spr.scale.setTo(0.5,0.5);
        this.main.addChild(spr);

		//있으면 사용	var spr2 = SpriteLoad(spr, "title.png", 0, -412);
		//픽시-----
		// FontLoad(spr, "무료충전", 0, -415, 0.5, 0.5,
		// 	{fontFamily:"Arial", fontSize:'50px', fontWeight:'bold', align:'center', fill:'#ffffff', dropShadow:true, dropShadowColor:'#424242', dropShadowDistance:5, dropShadowAngle:Math.PI/3});
		//페이저----
        var stya = {font:'bold 55px '+"Arial", fill: "#ffffff", stroke:'#342d89', lineJoin:"round", strokeThickness:10}
        var txta = g.add.text(0, -415, "무료충전", stya);
        txta.anchor.setTo(0.5,0.5);
        txta.scale.setTo(1,1);
        spr.addChild(txta);

		//픽시----
		//var spr2 = SpriteSliceLoad(spr, this.imgPath+"shop_naver_info.png", 0, -260, 580, 120);
		//var spr3 = SpriteSliceLoad(spr2, this.imgPath+"point_bg_naver.png", 0, -55, 200, 60);
        //페이저---
        var spr2 = new PhaserNineSlice.NineSlice( g, 0, -260, this.imgPath+"shop_naver_info.png",null,
            580, 120, {top:10, bottom:10, left:10, right:10}
        );
        spr2.anchor.setTo(0.5, 0.5);
        spr.addChild(spr2);
        //페이저---포인트배경
        var spr3 = new PhaserNineSlice.NineSlice( g, 0, -55, this.imgPath+"point_bg_naver.png", null,
            200, 60, {top:10, bottom:10, left:10, right:10}
        );
        spr3.anchor.setTo(0.5, 0.5);
        spr2.addChild(spr3);

		//픽시--
		//this.sprTitleIcon = SpriteLoad(spr3, this.imgPath+"shop_naver_film.png", -80, 0);
		//페이저--하트마크
        this.sprTitleIcon = g.add.sprite(-80, 0, this.imgPath+"shop_naver_film.png");
        this.sprTitleIcon.anchor.setTo(0.5,0.5);
        spr3.addChild(this.sprTitleIcon);

        //픽시--
		//this.txtLifeCnt = FontLoad(this.sprTitleIcon, "10", -12, 0, 0.5, 0.5,
		//	{fontFamily:"Arial", fontSize:'38px', fontWeight:'bold', lineJoin:"round", align:'center', fill:'#ffffff', stroke:'#00877c', strokeThickness:5});
		//페이저--하트갯수
        var styLifeCnt = {font:'bold 35px '+"Arial", fill:'#FFFFFF', stroke:'#000000', lineJoin:"round", strokeThickness:5};
        this.txtLifeCnt = g.add.text(-0,0, "10", styLifeCnt);
        this.txtLifeCnt.anchor.setTo(0.5,0.5);
        this.sprTitleIcon.addChild(this.txtLifeCnt);

        navercount=this.txtLifeCnt;

        //픽시--
		//this.txtTime = FontLoad(spr3, "09:59", 20, 5, 0.5, 0.5,
		//	{fontFamily:"Arial", fontSize:'40px', fontWeight:'bold', align:'center', fill:'#ffffff', dropShadow:true, dropShadowColor:'#424242', dropShadowDistance:5, dropShadowAngle:Math.PI/3});
		//페이저--타이머
        var styTime = {font:'bold 40px '+"Arial", fill:'#FFFFFF', lineJoin:"round"};
        this.txtTime = g.add.text(20, 5, "10:00", styTime);
        this.txtTime.anchor.setTo(0.5,0.5);
        spr3.addChild(this.txtTime);

        navertime=this.txtTime;
        //픽시--
		//FontLoad(spr2, "필름이 부족하시군요!! 그럼 이 게임도 해보시겠어요??\n선물로 필름을 모두 채워드릴게요~", 0, 15, 0.5, 0.5,
		//	{fontFamily:"Arial", fontSize:'20px', fontWeight:'bold', align:'center', fill:'#ffffff', stroke:'#00877c', strokeThickness:5});
		//페이저--설명문구
        var styCmt = {font:'bold 21px '+"Arial", fill:'#FFFFFF', stroke:'#000000', lineJoin:"round", strokeThickness:5};
        this.txtCmt = g.add.text(0, 15, "하트가 부족하시군요!! 그럼 이 게임도 해보시겠어요??\n선물로 하트를 모두 채워드릴게요~", styCmt); spr.addChild(txta);
        this.txtCmt.anchor.setTo(0.5,0.5);
        spr2.addChild(this.txtCmt);

		this.sprIcon = [];
		this.txtTitle = [];
		this.txtContents = [];

        var arr_cb = [this.cbButtonClick0.bind(this)
                    , this.cbButtonClick1.bind(this)
                    , this.cbButtonClick2.bind(this)];
        var arr_ok = [this.cbButtonClose.bind(this)];

		for(var i=0;i<3;++i) {
			//픽시---
			//spr2 = SpriteSliceLoad(spr, this.imgPath + "list_1.png", 0, -100 + (160*i), 600, 160);
			//페이저---
            spr2 = new PhaserNineSlice.NineSlice( g, -300, -100+(160*i), this.imgPath + "list_1.png",null,
                600, 160, {top:50, bottom:50, left:20, right:20}
            );
            spr2.anchor.setTo(0.5, 0.5);//영향없음
            spr.addChild(spr2);

            //픽시---
			//this.sprIcon[i] = SpriteLoad(spr2, this.imgPath + "icon_0001.png", -222, -5);
			//페이저---
            this.sprIcon[i] = g.add.sprite(-222+300, -5, this.imgPath+"icon_0001.png");
            this.sprIcon[i].anchor.setTo(0.5,0.5);
            spr2.addChild(this.sprIcon[i]);

            //픽시---
			//this.txtTitle[i] = FontLoad(spr2, "상하이 쉐프", -150, -40, 0, 0.5,
			//	{fontFamily:"Arial", fontSize:'28px', fontWeight:'bold', align:'center', fill:'#ffffff', stroke:'#00877c', strokeThickness:5});
			//페이저---
            var styTitle = {font:'bold 25px '+"Arial", fill:'#FFFFFF', stroke:'#342d89', lineJoin:"round", strokeThickness:5};
            this.txtTitle[i] = g.add.text(-150+300, -40-25, "상하이 쉐프", styTitle);
            spr2.anchor.setTo(0.0, 0.5);
            spr2.addChild( this.txtTitle[i]);

            //픽시---
			//this.txtContents[i] = FontLoad(spr2, "같은패를 찾는 짝맞추기 게임!\n당신의 손은 눈보다 빠를 수 있습니까?\n어떤 블록을 이을 수 있을지 찾아보세요!", -150, 15, 0, 0.5,
			//	{fontFamily:"Arial", fontSize:'16px', fontWeight:'bold', align:'left', fill:'#000000'});
			//페이저---
            var styContents =  {font:'bold 15px '+"Arial", fill:ColorSet.white, lineJoin:"round"};
            this.txtContents[i] = g.add.text(-150+300, 15-30, "같은패를 찾는 짝맞추기 게임!\n당신의 손은 눈보다 빠를 수 있습니까?\n어떤 블록을 이을 수 있을지 찾아보세요!", styContents);
            spr2.anchor.setTo(0.0, 0.5);
            spr2.addChild(this.txtContents[i]);

            //픽시---
			//spr3 = SpriteSliceLoad(spr2, this.imgPath + "btn_shop_1.png", 0, 0, 110, 110);
            //페이저---
            spr3 = new PhaserNineSlice.NineSlice( g, 0, 0, this.imgPath + "btn_shop_1.png",null,
                110, 110, {top:10, bottom:10, left:10, right:10}
            );
            spr3.anchor.setTo(0.5, 0.5);
            //spr2.addChild(spr3);

            //픽시----
			//var btn = new Button(spr2, this.imgPath + "btn_shop_1.png", 215, 0, eval("this.cbButtonClick"+i+".bind(this)"), "scaleUp", 1, 1, 0.5, 0.5, spr3);
			//페이저----
            var styTitle = {font:'bold 25px '+"Arial", fill:'#FFFFFF', stroke:'#342d89', lineJoin:"round", strokeThickness:5}
            var btntxt = g.add.text(0, -10, "MAX", styTitle);

            var styBtn = {font:'bold 25px '+"Arial", fill:'#FFFFFF', stroke:'#342d89', lineJoin:"round", strokeThickness:5};
            var btn = createbtn(spr3,
                btntxt,
                g.add.sprite(0, -15, this.imgPath+"shop_naver_film.png"),
                215+300, 0,
                styBtn
            );

            btn.slotId = i;
            // fnok(this.slotid);
            btn.fnok = function (_slotid) {
                // eval("this.cbButtonClick"+i+".bind(this)");
                arr_cb[_slotid]();
            };
            spr2.addChild(btn);

            //픽시---
			//spr4 = SpriteLoad(spr3, this.imgPath+"shop_naver_film.png", 0, -17);
			//spr4.scale.set(0.9);
			//페이저---

            //픽시---
			//FontLoad(btn.sprite, "MAX", 0, -12, 0.5, 0.5,
			//	{fontFamily:"Arial", fontSize:'28px', fontWeight:'bold', lineJoin:"round", align:'center', fill:'#ffffff', stroke:'#00877c', strokeThickness:5});
			//페이저---
			// 위로이동

			//픽시----
			//FontLoad(btn.sprite, "바로가기", 0, 25, 0.5, 0.5,
			//	{fontFamily:"Arial", fontSize:'16px', fontWeight:'bold', align:'center', fill:'#ffffff', stroke:'#00877c', strokeThickness:4});
			//페이저---
            var stySmall = {font:'bold 20px '+"Arial", fill:'#FFFFFF', stroke:'#000000', lineJoin:"round", strokeThickness:5}
            smalltxt = g.add.text(0, 25, "바로가기", stySmall);
            smalltxt.anchor.setTo(0.5,0.5);
          	btn.tx.addChild(smalltxt);

        }
		//픽시---
		//var spr3 = SpriteSliceLoad(spr, this.imgPath + "btn_ok.png", 0, 0, 200, 90);
		//btn = new Button(spr, this.imgPath + "btn_ok.png", 0, 370, this.cbButtonClose.bind(this), "scaleUp", 1, 1, 0.5, 0.5, spr3);
		//FontLoad(btn.sprite, "OK", 0, 0, 0.5, 0.5,
		//	{fontFamily:"Arial", fontSize:'50px', fontWeight:'bold', align:'center', fill:'#ffffff', dropShadow:true, dropShadowColor:'#424242', dropShadowDistance:5, dropShadowAngle:Math.PI/3});

		//페이저---
        var sliceok = new PhaserNineSlice.NineSlice( g, 0, 0, this.imgPath + "btn_ok.png", null,
            200, 90, {top:45, bottom:45, left:32, right:32}
        );
        sliceok.anchor.setTo(0.5, 0.5);
        var styok ={font:'bold 35px '+"Arial", fill:'#FFFFFF', stroke:'#7F2D00', lineJoin:"round", strokeThickness:5};
        var txtok = g.add.text(0, 0, "닫기", styok);
        txtok.anchor.setTo(0.5,0.5);

        var btnOk = createbtn(sliceok,
            txtok,
            undefined,
            0, 370,
            styok
        );
        btnOk.fnok = function () {
            arr_ok[0]();
        };
		spr.addChild(btnOk);

		this.main.visible = false;
        //this.main.visible = true;
        // par.addChild(this.main);//혜관님
		par.addChild(this.main);
		this.bInit = true;
	}

	NaverShop.prototype.cbButtonClick0 = function() {
		//	location.href = this.gameList[0].aLNK;
		window.open(this.gameList[0].aLNK);
		this.cbReward();
		this.cbButtonClose();
	}

	NaverShop.prototype.cbButtonClick1 = function() {
	//	location.href = this.gameList[1].aLNK;
		window.open(this.gameList[1].aLNK);
		this.cbReward();
		this.cbButtonClose();
	}

	NaverShop.prototype.cbButtonClick2 = function() {
	//	location.href = this.gameList[2].aLNK;
		window.open(this.gameList[2].aLNK);
		this.cbReward();
		this.cbButtonClose();
	}

	NaverShop.prototype.Update = function(cnt, time) {
		if(this.bInit == true && this.main.visible == true){
			this.txtLifeCnt.text = cnt;
			this.txtTime.text = time;
		}
	}

	NaverShop.prototype.Show = function(_cbReward) {
		this.cbReward = _cbReward;
		if(this.bLoad == false){
			networkManager.GetNaverShop(this.cbGetNaverShopComplete.bind(this));
		}else{
			this.main.visible = true;
		}
	}

	NaverShop.prototype.cbGetNaverShopComplete = function(gamelist) {
		this.gameList = gamelist;
		RandomMix(this.gameList, 50);
	//	var options = {"Access-Control-Allow-Origin":"*"};
	//	var loader = PIXI.loader;
	//	loader.add(this.gameList[0].iconLNK, this.gameList[0].iconLNK, options);
	//	loader.add(this.gameList[1].iconLNK, this.gameList[1].iconLNK, options);
	//	loader.add(this.gameList[2].iconLNK, this.gameList[2].iconLNK, options);
	//	loader.once('complete', this.cbIconLoadComplete);
	//	loader.load();
		this.cbIconLoadComplete();
	}

	NaverShop.prototype.cbIconLoadComplete = function() {
 		for(var i=0;i<3;++i){
            this.sprIcon[i].loadTexture(this.imgPath + this.gameList[i].iconLNK.substring(this.gameList[i].iconLNK.lastIndexOf("/")+1,this.gameList[i].iconLNK.length));
		//	this.sprIcon[i].texture = PIXI.Texture.fromFrame(
		//	     this.imgPath + this.gameList[i].iconLNK.substring(this.gameList[i].iconLNK.lastIndexOf("/")+1,this.gameList[i].iconLNK.length)
        //    );
		////this.sprIcon[i].texture = PIXI.Texture.fromFrame(this.gameList[i].iconLNK);
			this.txtTitle[i].text = this.gameList[i].gName;
			this.txtContents[i].text = this.gameList[i].gContents;
		}
		this.main.visible = true;
	}

	NaverShop.prototype.cbButtonClose = function() {
		this.main.visible = false;
	}
}
function cbNaverShopReward()
{
    if(kData.iHeart < iHeartChargeMax)
        kData.iHeart = iHeartChargeMax;
    console.log("===== navershopreward");
    var sends={}; sends.iHeart=kData.iHeart;//네이버저장하기
    networkManager.AppDataPut(JSON.stringify(sends));
}
function RandomMix(random, mixCnt)
{
    var temp, r1, r2;

    for(var i=0;i<mixCnt;++i)
    {
        r1 = Math.floor(Math.random() * random.length);
        r2 = Math.floor(Math.random() * random.length);

        temp = random[r1];
        random[r1] = random[r2];
        random[r2] = temp;
    }
}
