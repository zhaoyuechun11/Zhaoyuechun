/**
 * Created by admin on 2018-04-05.
 */
gc.Intro = function () {
    PIXI.Container.call(this);

    this.bg = new PIXI.spine.Spine(GD.loader.resources["intro"].spineData);
    this.bg.autoUpdate = false;
    gc.spineManager.pushList(this.bg);
    gc.spineManager.setSpineListener(this.bg);
    this.gameGrade = new PIXI.Sprite(GD.loader.resources['game_grade'].texture);
    this.btnStart = new PIXI.Sprite.fromFrame("intro_btn_start.png");
    this.btnTuto = new PIXI.Sprite.fromFrame("intro_btn_tutorial.png");
    this.btnSound = new PIXI.Sprite.fromFrame("intro_btn_sound.png");
    //this.copyRight = new PIXI.Sprite.fromFrame("copybar_naver_w.png");
};

gc.Intro.constructor = gc.Intro;
gc.Intro.prototype = Object.create(PIXI.Container.prototype);

//인트로 init
gc.Intro.prototype.init = function () {
    gc.spineManager.setupPlayAnimate(this.bg, 'intro', false);
    this.bg.x = gc.width*0.5;
    this.bg.y = gc.height*0.5;

    //카피라이트
    //this.copyRight.anchor.set(0.5);
    //this.copyRight.x = gc.width*0.5;
    //this.copyRight.y = gc.height - 20;
    //게임 등급
    var gap = 10;
    this.gameGrade.x = gc.width - (this.gameGrade.width + gap);
    this.gameGrade.y = gap;

    this.updateTransform();
    this.btnStart.anchor.set(0.5);
    this.btnStart.x = gc.width*0.5;
    this.btnStart.y = this.bg.height - 160;
    bm.buttonEvent(this.btnStart, true, null, null, (function () {
        gc.spineManager.removeSpineListener(this.bg);
        gc.spineManager.resetAnimateFull(this.bg);
        gc.spineManager.removeObj(this.bg);
        onGame();
    }).bind(this));

    var gap = 260;
    this.btnTuto.anchor.set(0.5);
    this.btnTuto.x = this.btnStart.x - gap;
    this.btnTuto.y = this.btnStart.y;
    bm.buttonEvent(this.btnTuto, true, null, null, this.onTutorial.bind(this));//튜토리얼 열기

    this.btnSound.anchor.set(0.5);
    this.btnSound.x = this.btnStart.x + gap;
    this.btnSound.y = this.btnStart.y;
    bm.buttonEvent(this.btnSound, true, null, null, (function () {
        this.setInteractive(false);
        gc.soundPopup.onSoundPopup();
    }).bind(this));

    this.addChild(this.bg);
    this.addChild(this.btnStart);
    this.addChild(this.btnTuto);
    this.addChild(this.btnSound);
    //this.addChild(this.copyRight);
    this.addChild(this.gameGrade);

    this.setInteractive(true);

    // this.testOption();

    this.browserGuidePopup = new gc.BrowserGuidePopup();
    this.browserGuidePopup.on('BROWSER_GUIDE_POPUP_EVENT', this.hideBrowserGuidePopup.bind(this));
    if(getIE11()) {
        var predate = LocalStorage.storageGet(LocalStorage.BROWSER_DATE);
        var nowdate = Util.getNowDate();
        if(!gc.guideOn) {
            gc.guideOn = true;
            if (predate != nowdate) this.showBrowserGuidePopup();
        }
    }
};

//터치 이벤트 활성화
gc.Intro.prototype.setInteractive = function (bool) {
    this.btnStart.interactive = bool;
    this.btnTuto.interactive = bool;
    this.btnSound.interactive = bool;
};

//인트로 초기화
gc.Intro.prototype.reset = function () {
    this.setInteractive(false);
    this.bg.removeChildren();
    this.removeChildren();
};

//테스트용 옵션
gc.Intro.prototype.testOption = function () {
    var baseX = 50, baseY = 700, gapY = 50;
    //챕터 선택
    var chapter_t = new PIXI.Text("chapter: ");
    chapter_t.x = baseX;
    chapter_t.y = baseY;
    this.addChild(chapter_t);
    var chapter = new PIXI.Text(gc.chapter);
    chapter.x = 70;
    bm.buttonEvent(chapter_t, true, (function () {
        if(gc.chapter < 5) gc.chapter++;
        else gc.chapter = 1;
        chapter.text = gc.chapter;
    }).bind(this));
    chapter_t.addChild(chapter);
    chapter_t.interactive = true;

    //스텝 수
    gc.progressType = 0;
    var progress_t = new PIXI.Text("");
    progress_t.x = baseX;
    progress_t.y = baseY + gapY;
    this.addChild(progress_t);
    progress_t.interactive = true;
    setProgressText();
    bm.buttonEvent(progress_t, true, setProgressType.bind(this));
    function setProgressType() {
        gc.progressType = (gc.progressType == 0)?1:0;
        setProgressText();
    }
    function setProgressText() {
        var type = ["basic", "five"];
        progress_t.text = "Number of footprints per chapter: " + type[gc.progressType];
    }

    //퍼펙트 점프
    gc.perfect = false;
    var perfectJump = new PIXI.Text("");
    perfectJump.x = baseX;
    perfectJump.y = baseY + gapY*2;
    this.addChild(perfectJump);
    perfectJump.interactive = true;
    setPerfectText();
    bm.buttonEvent(perfectJump, true, setPerfect.bind(this));
    function setPerfect() {
        gc.perfect = !gc.perfect;
        setPerfectText();
    };

    function setPerfectText() {
        if(gc.perfect) perfectJump.text = "Jump method: Perfect";
        else perfectJump.text = "Jump method: General";
    }

    //발판 내려가기
    gc.sink = true;//발판 내려가기
    var sink = new PIXI.Text("");
    sink.x = baseX;
    sink.y = baseY + gapY*4;
    this.addChild(sink);
    sink.interactive = true;
    setSinkText();
    bm.buttonEvent(sink, true, setSink.bind(this));
    function setSink() {
        gc.sink = !gc.sink;
        setSinkText();
    };
    function setSinkText() {
        var txt = "Go down the footboard: ";
        if(gc.sink) txt += "ON";
        else txt += "OFF";
        sink.text = txt;
    }
};

//튜토리얼 열기
gc.Intro.prototype.onTutorial = function () {
    this.setInteractive(false);
    gc.tutorial.onIntroTutorial();
};

// 브라우저 안내팝업 보이기
gc.Intro.prototype.showBrowserGuidePopup = function(){
    this.browserGuidePopup.init();
    this.addChild(this.browserGuidePopup);
};

// 브라우저 안내팝업 닫기
gc.Intro.prototype.hideBrowserGuidePopup = function(){
    this.setInteractive(true);
    this.removeChild(this.browserGuidePopup);
    // this.showEventPopup();//점프게임에는 이벤트가 없으므로 안씀
};

//인트로 애니메이션 루프
gc.Intro.prototype.introAnimateLoop = function (obj, time) {
    var update = time;
    gc.spineManager.playAnimate(obj, 'intro', false);
    obj.state.update(update);
    obj.state.apply(obj.skeleton);
};

gc.Intro.prototype.updateTransform = function() {
    try {
        PIXI.Container.prototype.updateTransform.call(this);
    } catch(e) {

    }
};