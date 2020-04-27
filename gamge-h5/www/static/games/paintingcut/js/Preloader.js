'use strict';


var COMPLETE_AREA;
var FEVER_SUCCESS_AREA;
var DEFAULT_TIME_COUNT;
var ONE_PERCENT_ADDTIME;
var DEFAULT_HEART_COUNT;
var HURRYUP_TIME_COUNT;

function Preloader() {
    this.ready = false;
    this.loadingText = null;
    this.sprLoad = null;
}

Preloader.prototype = {

    preload: function () {
        this.grpLoad = this.game.add.group();

        this.grpLoad.x = this.game.width/2;
        this.grpLoad.y = this.game.height/2-120;


        MG.networkManager.refresh();

        this.stage.backgroundColor = '#FFFFFF';

        /*this.sprLoad = [];

        this.sprLoad[0] = this.add.sprite(0, 0, 'preloaderLogoMono');
        this.sprLoad[0].anchor.setTo(0.5, 0.5);

        this.sprLoad[1] = this.add.sprite(-117, 0, 'preloaderLogoColor'); //마스크적용-위치
        this.sprLoad[1].anchor.setTo(0, 0.5);                                      //마스크적용-피봇
        this.load.setPreloadSprite(this.sprLoad[1]);

        this.sprLoad[2] = this.add.sprite(0, 170, 'preloaderLogoText');
        this.sprLoad[2].anchor.setTo(0.5, 0.5);*/

        this.loading_banner = this.add.sprite(0, this.game.height - this.grpLoad.y, 'loading_banner');
        this.loading_banner.anchor.setTo(0.5, 1);

        /*this.loadingText = this.add.text(0, 250, "99%", { font: "23px Arial", fill: "#2E85ED", align: "center" });
       this.loadingText.anchor.setTo(0.5, 0.5);

       /is.load.onLoadStart.add(this.onLoadStart, this);                       //game.load도 동일
       this.load.onFileComplete.add(this.onFileComplete, this);*/
       this.load.onLoadComplete.add(this.onLoadComplete, this);


        /*this.grpLoad.addChild(this.sprLoad[0]);
        this.grpLoad.addChild(this.sprLoad[1]);
        this.grpLoad.addChild(this.sprLoad[2]);*/
        this.grpLoad.addChild(this.loading_banner);
        //this.grpLoad.addChild(this.loadingText);

        MG.stateThis = this;
        // 이미지 로드
        MG.resourcesManager.loader(ResourcesManager.Preloader);

        this.zhuye002  = this.add.sprite(0, 0, 'zhuye002', null, this.grpLoad);

        this.zhuye002.anchor.set(.5),
        this.zhuye002.scale.set(.1),
        this.zhuye002.rotation = 20,
        this.tween ? this.tween.kill() : this.tween = new TimelineLite,
        this.tween.to(this.zhuye002, 1, {
            rotation: 0, ease: Sine.easeOut
        }),
        this.tween.call(this.showLocoText.bind(this)),
        TweenMax.to(this.zhuye002.scale, 1, {x: 0.5, y: 0.5});
    },

    showLocoText: function () {
        TweenMax.to(this.zhuye002, 0.2, {
            x: 50, ease: Sine.easeIn
        });

        this.loading02  = this.add.sprite(0 - 70, 610-1280/2, 'loading02', null, this.grpLoad);
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

    onLoadStart: function() {
        this.loadingText.setText("0%");
        //console.log("loading_start ");
    },
    onFileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles) {
        this.loadingText.setText(progress + "%");
    },

    onLoadComplete: function () {
        var that = this;
        this.ready = true;
        // 리소스 로드 완료후 오디오 셋팅
        MG.AudioInit();


        MG.loadGameSheetsData(1, Define.GOOGLE_SHEETS_DATA, function(rep){
            that.game.time.events.add(300, function () {

                // console.log('AddTime = '+MG.gameSheetsData["AddTime"]);
                // console.log('Slow = '+MG.gameSheetsData["Slow"]);
                // console.log('AddLife = '+MG.gameSheetsData["AddLife"]);
                // console.log('StopTime = '+MG.gameSheetsData["StopTime"]);
                // console.log('AddTimePlus = '+MG.gameSheetsData["AddTimePlus"]);

                //COMPLETE_AREA = parseFloat(MG.gameSheetsData["CompleteArea"]);
                FEVER_SUCCESS_AREA = parseFloat(MG.gameSheetsData["FeverSuccessArea"]);
                DEFAULT_TIME_COUNT = MG.gameSheetsData["DefaultTimeCount"];
                timer = DEFAULT_TIME_COUNT;
                ONE_PERCENT_ADDTIME = MG.gameSheetsData["OnePercentAddTime"];
                DEFAULT_HEART_COUNT = MG.gameSheetsData["DefaultHeartCount"];
                gHeart = DEFAULT_HEART_COUNT;
                HURRYUP_TIME_COUNT = MG.gameSheetsData["HurryUPTimeCount"];


                // console.log('NoteCreate[0] '+ MG.gameSheetsData['NoteCreate'][0]);
                // console.log('NoteCreate[0] '+ MG.gameSheetsData['NoteCreate'][0]);
                // console.log('MG.gameSheetsData[InSul][0].Max  '+ MG.gameSheetsData['InSul'][0].Max);

                //that.nInSulCount = MG.gameSheetsData['InSul'][that.nInSulGrade].Max;

                that.game.state.start('game');
                that.destroy();
            });
        });

    },

    create: function () {
        //this.sprLoad[1].cropEnabled = false;
    },


    update: function () {
        //this.loadingText.setText("100%");
        if (this.ready) {
           // console.log('Ready ===  ');
           // this.game.state.start('game');
        }
    },
    destroy :function () {
        console.log("  >>>>  destroy  <<<<");
        /*this.sprLoad.forEach(function (t) {
            t.destroy();
        });*/

        if (this.tween) this.tween.kill();
        this.zhuye002.destroy(true, true);
        if (this.loading02) this.loading02.destroy(true, true);
        //this.loadingText.destroy();
    }
};




window[''] = window[''] || {};
window[''].Preloader = Preloader;


