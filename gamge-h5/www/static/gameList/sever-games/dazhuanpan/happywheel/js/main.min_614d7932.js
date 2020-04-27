var __reflect=this&&this.__reflect||function(t,e,i){t.__class__=e,i?i.push(e):i=[e],t.__types__=t.__types__?i.concat(t.__types__):i},__extends=this&&this.__extends||function(t,e){function i(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);i.prototype=e.prototype,t.prototype=new i},__awaiter=this&&this.__awaiter||function(t,e,i,n){return new(i||(i=Promise))(function(s,r){function o(t){try{a(n.next(t))}catch(e){r(e)}}function l(t){try{a(n["throw"](t))}catch(e){r(e)}}function a(t){t.done?s(t.value):new i(function(e){e(t.value)}).then(o,l)}a((n=n.apply(t,e||[])).next())})},__generator=this&&this.__generator||function(t,e){function i(t){return function(e){return n([t,e])}}function n(i){if(s)throw new TypeError("Generator is already executing.");for(;a;)try{if(s=1,r&&(o=r[2&i[0]?"return":i[0]?"throw":"next"])&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[0,o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(o=a.trys,!(o=o.length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=e.call(t,a)}catch(n){i=[6,n],r=0}finally{s=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}var s,r,o,l,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return l={next:i(0),"throw":i(1),"return":i(2)},"function"==typeof Symbol&&(l[Symbol.iterator]=function(){return this}),l},SCENE_ID_BEGIN="scene_begin",SCENE_ID_GAME="scene_game",SCENE_ID_RESULT="scene_result",SceneContainer=function(t){function e(){return t.call(this)||this}return __extends(e,t),e.prototype.partAdded=function(e,i){t.prototype.partAdded.call(this,e,i)},e.prototype.childrenCreated=function(){t.prototype.childrenCreated.call(this),this.init()},e.prototype.init=function(){this.changeScene(SCENE_ID_BEGIN)},e.getInstance=function(){return e.instance||(e.instance=new e),e.instance},e.prototype.changeScene=function(t){this.removeChildren();var e;e=new gameUI,e.name=t;var i=new eui.Image,n=RES.getRes("ditu_png");i.texture=n,i.width=1.3*this.stage.stageWidth,i.height=1.3*this.stage.stageHeight,i.verticalCenter=i.horizontalCenter=0,this.addChild(i),this.addChild(e),this.currentScene=e;var s=(window.ww,window.hh,1920*this.stage.stageWidth/1080);return e.y=(this.stage.stageHeight-s)/2,console.log(e.y,this.stage.stageHeight),e},e}(eui.Component);__reflect(SceneContainer.prototype,"SceneContainer");var AssetAdapter=function(){function t(){}return t.prototype.getAsset=function(t,e,i){function n(n){e.call(i,n,t)}if(RES.hasRes(t)){var s=RES.getRes(t);s?n(s):RES.getResAsync(t,n,this)}else RES.getResByUrl(t,n,this,RES.ResourceItem.TYPE_IMAGE)},t}();__reflect(AssetAdapter.prototype,"AssetAdapter",["eui.IAssetAdapter"]);var LoadingUI=function(t){function e(){var e=t.call(this)||this;return e.createView(),e}return __extends(e,t),e.prototype.createView=function(){var t=new eui.Rect(1080,1920,16777215);this.addChild(t);var e=new egret.Bitmap,i=RES.getRes("jindutiao02_png");e.texture=i,e.scale9Grid=new egret.Rectangle(39,32,72,11),e.width=800,e.x=(1080-e.width)/2,e.y=760,this.addChild(e),this.bm2=new egret.Bitmap;var n=RES.getRes("jindutiao01_png");this.bm2.texture=n,this.bm2.scale9Grid=new egret.Rectangle(39,32,72,11),this.bm2.width=148,this.bm2.x=(1080-e.width)/2,this.bm2.y=760,this.addChild(this.bm2)},e.prototype.onProgress=function(t,e){this.bm2.width=148>800*(t/e)?148:800*(t/e);var i=this.bm2.width/800*100;window.setJindu(i)},e}(egret.Sprite);__reflect(LoadingUI.prototype,"LoadingUI",["RES.PromiseTaskReporter"]);var Main=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.prototype.createChildren=function(){t.prototype.createChildren.call(this),egret.lifecycle.addLifecycleListener(function(t){}),egret.lifecycle.onPause=function(){egret.ticker.pause()},egret.lifecycle.onResume=function(){egret.ticker.resume()};var e=new AssetAdapter;egret.registerImplementation("eui.IAssetAdapter",e),egret.registerImplementation("eui.IThemeAdapter",new ThemeAdapter),this.runGame()["catch"](function(t){console.log(t)})},e.prototype.runGame=function(){return __awaiter(this,void 0,void 0,function(){var t;return __generator(this,function(e){switch(e.label){case 0:return[4,this.loadResource()];case 1:return e.sent(),this.createGameScene(),[4,platform.login()];case 2:return e.sent(),[4,platform.getUserInfo()];case 3:return t=e.sent(),console.log(t),[2]}})})},e.prototype.loadResource=function(){return __awaiter(this,void 0,void 0,function(){var t,e,i,n,s,r,o,l,a,c,h=this;return __generator(this,function(u){switch(u.label){case 0:return u.trys.push([0,5,,6]),t="file:///storage/emulated/0/cache/juicypang/juicypang1.0.2/juicypang/",e=window.location.href,i=e.indexOf("index.html"),n=e.substring(0,i),console.log(n),[4,RES.loadConfig("resource/default.res.json","resource/")];case 1:return u.sent(),[4,this.loadTheme()];case 2:return u.sent(),[4,RES.loadGroup("loading",1)];case 3:return u.sent(),s=new LoadingUI,this.stage.addChild(s),[4,RES.loadGroup("preload",0,s)];case 4:return u.sent(),r=egret.getOption("x-auth-token"),console.log("token:"+r),o="eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyLWlkIjo1LCJyZWZyZXNoLXRva2VuIjoiZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKMWMyVnlMV2xrSWpvMUxDSnlZVzVrSWpveE5qWTNOREkzTkRFeGZRLnZpUHNBLUFUeUljSHZFUnI3S01wMlQ4cDUyOWpvR3Q0WklNNDBCMjFLNmciLCJyZWZyZXNoLXRpbWUiOjE1NjA0MTQ5ODUxNTd9.nTOpETidfWTgoUf7Qj6KlyJakYZKlaYvfOkOnrwtEEk",r=""==r||null==r||void 0==r?o:r,ConfigController.getInstance().token=r,l="http://172.31.2.218:8087/game/get_turntable_info?x-auth-token="+r,a=RES.getResByUrl(l,function(t){console.log("json:",t),ConfigController.getInstance().initTableList(t.data),SceneContainer.getInstance().currentScene.init(),h.stage.removeChild(s),window.hideJindu()},this,RES.ResourceItem.TYPE_JSON),[3,6];case 5:return c=u.sent(),console.error(c),[3,6];case 6:return[2]}})})},e.prototype.loadTheme=function(){var t=this;return new Promise(function(e,i){var n=new eui.Theme("resource/default.thm.json",t.stage);n.addEventListener(eui.UIEvent.COMPLETE,function(){e()},t)})},e.prototype.createGameScene=function(){this.addChild(SceneContainer.getInstance())},e.prototype.createBitmapByName=function(t){var e=new egret.Bitmap,i=RES.getRes(t);return e.texture=i,e},e.prototype.startAnimation=function(t){var e=this,i=new egret.HtmlTextParser,n=t.map(function(t){return i.parse(t)}),s=this.textfield,r=-1,o=function(){r++,r>=n.length&&(r=0);var t=n[r];s.textFlow=t;var i=egret.Tween.get(s);i.to({alpha:1},200),i.wait(2e3),i.to({alpha:0},200),i.call(o,e)};o()},e.prototype.onButtonClick=function(t){var e=new eui.Panel;e.title="Title",e.horizontalCenter=0,e.verticalCenter=0,this.addChild(e)},e}(eui.UILayer);__reflect(Main.prototype,"Main");var Net=function(t){function e(){return t.call(this)||this}return __extends(e,t),e.getInstance=function(){return e.instance||(e.instance=new e),e.instance},e.prototype.sendGetRequest=function(t,e,i){var n="&id_turntable="+t+"&id_cost="+e+"&times="+i,s=new egret.HttpRequest;s.responseType=egret.HttpResponseType.TEXT,s.open("http://172.31.2.218:8087/game/draw_lottery?x-auth-token=eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyLWlkIjo1LCJyZWZyZXNoLXRva2VuIjoiZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKMWMyVnlMV2xrSWpvMUxDSnlZVzVrSWpveE5qWTNOREkzTkRFeGZRLnZpUHNBLUFUeUljSHZFUnI3S01wMlQ4cDUyOWpvR3Q0WklNNDBCMjFLNmciLCJyZWZyZXNoLXRpbWUiOjE1NjA0MTQ5ODUxNTd9.nTOpETidfWTgoUf7Qj6KlyJakYZKlaYvfOkOnrwtEEk"+n,egret.HttpMethod.GET),s.send(),s.addEventListener(egret.Event.COMPLETE,this.onGetComplete,this),s.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onGetIOError,this),s.addEventListener(egret.ProgressEvent.PROGRESS,this.onGetProgress,this)},e.prototype.onGetComplete=function(t){var e=t.currentTarget;console.log("get data : ",e.response)},e.prototype.onGetIOError=function(t){console.log("get error : "+t)},e.prototype.onGetProgress=function(t){console.log("get progress : "+Math.floor(100*t.bytesLoaded/t.bytesTotal)+"%")},e.prototype.sendPostRequest=function(){var t=new egret.TextField;this.statusPostLabel=t,this.addChild(t),t.size=18,t.x=300,t.y=40,t.text="Sending POST request to httpbin.org";var e="p1=postP1&p2=postP2",i=new egret.HttpRequest;i.responseType=egret.HttpResponseType.TEXT,i.open("php/post_test.php",egret.HttpMethod.POST),i.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),i.send(e),i.addEventListener(egret.Event.COMPLETE,this.onPostComplete,this),i.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onPostIOError,this),i.addEventListener(egret.ProgressEvent.PROGRESS,this.onPostProgress,this)},e.prototype.onPostComplete=function(t){var e=t.currentTarget;console.log("post data : ",e.response);var i=new egret.TextField;i.size=18,i.text="POST response:\n"+e.response.substring(0,50)+"...",this.addChild(i),i.x=300,i.y=70,this.statusPostLabel.text="Get POST response!"},e.prototype.onPostIOError=function(t){console.log("post error : "+t)},e.prototype.onPostProgress=function(t){console.log("post progress : "+Math.floor(100*t.bytesLoaded/t.bytesTotal)+"%")},e}(egret.DisplayObjectContainer);__reflect(Net.prototype,"Net");var DebugPlatform=function(){function t(){}return t.prototype.getUserInfo=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){return[2,{nickName:"username"}]})})},t.prototype.login=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){return[2]})})},t}();__reflect(DebugPlatform.prototype,"DebugPlatform",["Platform"]),window.platform||(window.platform=new DebugPlatform);var TABLE_LIST=function(){function t(){}return t}();__reflect(TABLE_LIST.prototype,"TABLE_LIST");var COST_LIST=function(){function t(){}return t}();__reflect(COST_LIST.prototype,"COST_LIST");var AWARD_LIST=function(){function t(){}return t}();__reflect(AWARD_LIST.prototype,"AWARD_LIST");var ConfigController=function(){function t(){this.tableList=[],this.balanceList={}}return t.getInstance=function(){return null==this._instance&&(this._instance=new t),this._instance},t.prototype.initTableList=function(t){var e=t.turntable_list;for(var i in e){var n=e[i];this.tableList.push(n)}if(2==this.tableList[0].id){var s=this.tableList[0];this.tableList[0]=this.tableList[1],this.tableList[1]=s}e=t.balance;for(var i in e){var n=e[i];this.balanceList[i]=n}},t}();__reflect(ConfigController.prototype,"ConfigController");var ThemeAdapter=function(){function t(){}return t.prototype.getTheme=function(t,e,i,n){function s(t){e.call(n,t)}function r(e){e.resItem.url==t&&(RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,r,null),i.call(n))}var o=this;"undefined"!=typeof generateEUI?egret.callLater(function(){e.call(n,generateEUI)},this):"undefined"!=typeof generateEUI2?RES.getResByUrl("resource/gameEui.json",function(t,i){window.JSONParseClass.setData(t),egret.callLater(function(){e.call(n,generateEUI2)},o)},this,RES.ResourceItem.TYPE_JSON):(RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,r,null),RES.getResByUrl(t,s,this,RES.ResourceItem.TYPE_TEXT))},t}();__reflect(ThemeAdapter.prototype,"ThemeAdapter",["eui.IThemeAdapter"]);var Utils=function(){function t(){}return t.getInstance=function(){return t.instance||(t.instance=new t),t.instance},t.prototype.changeImageSize=function(t,e){var i=e.width,n=e.height;t.width/t.height>i/n?(t.height*=i/t.width,t.width=i):(t.width*=n/t.height,t.height=n)},t}();__reflect(Utils.prototype,"Utils");var blockUI=function(t){function e(){var e=t.call(this)||this;return e._priceNum=0,e.skinName="resource/eui_skins/ui/block.exml",e}return __extends(e,t),e.prototype.childrenCreated=function(){t.prototype.childrenCreated.call(this)},e}(eui.Component);__reflect(blockUI.prototype,"blockUI",["eui.UIComponent","egret.DisplayObject"]);var gameUI=function(t){function e(){var e=t.call(this)||this;return e.blist=[],e.index=-1,e.count=8,e.timer=0,e.speed=20,e.times=0,e.cycle=50,e.prize=-1,e.clickcount=1,e.sum=0,e.topselect=0,e.goldselect=0,e.goldlist={},e.resultList=[],e.goldlabellist=[],e.skinName="resource/eui_skins/ui/game.exml",e}return __extends(e,t),e.prototype.childrenCreated=function(){t.prototype.childrenCreated.call(this)},e.prototype.init=function(){var t=this;this.tablelist=ConfigController.getInstance().tableList,this.goldlist=ConfigController.getInstance().balanceList,this.blist=[this.b0,this.b1,this.b2,this.b3,this.b4,this.b5,this.b6,this.b7];for(var e=0;e<this.blist.length;e++)this.blist[e].img.source=this.tablelist[0].award_list[e].icon,this.blist[e].imgmask.source="zhuanpan011_png",this.blist[e].imgmask.visible=!1;var i=new eui.Scroller;i.skinName="resource/eui_skins/ScrollerSkin.exml",i.viewport=this.scrolgroup,i.width=this.scrolgroup.width,i.height=this.scrolgroup.height,i.x=this.scrolgroup.x,i.y=this.scrolgroup.y,this.addChild(i),this.clickblock.touchEnabled=!0,this.clickone.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){t.clickblock.touchChildren=!1,t.touchChildren=!1,t.clickcount=1,t.clickNext()},this),this.clickten.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){t.clickblock.touchChildren=!1,t.touchChildren=!1,t.clickcount=10,t.clickNext()},this),this.toptxt1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickTop,this),this.toptxt2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickTop,this),this.goldtxt.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){t.xialagroup.visible=!t.xialagroup.visible},this),this.newXiala(),this.addEventListener(egret.TouchEvent.TOUCH_TAP,function(e){e.target!=t.xialagroup&&e.target!=t.goldtxt&&(t.xialagroup.visible=!1)},this),this.confirmbtn.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){t.singleprice.visible=!1,t.pricegroup.removeChildren(),t.overgroup.visible=!1;for(var e=0;e<t.blist.length;e++)t.blist[e]._count.visible=!1,t.blist[e]._priceNum=0,t.blist[e].imgmask.visible=!1},this),this.playLightEffect(),this.flushPage()},e.prototype.clickNext=function(){for(var t=this,e=0;e<this.blist.length;e++)this.blist[e]._count.visible=!1,this.blist[e]._priceNum=0;var i=(egret.getOption("token"),"http://172.31.2.218:8087/game/draw_lottery?x-auth-token="+ConfigController.getInstance().token+"&id_turntable="+this.tablelist[this.topselect].id+"&id_cost="+this.tablelist[this.topselect].cost_list[this.goldselect].cost_id+"&times="+this.clickcount);RES.getResByUrl(i,function(e){if(console.log("json:",e),0==e.code){t.resultList=[],t.resultList=e.data;for(var n=0;n<e.data.length;n++)egret.Tween.get(t).wait(400*n).call(t.clickRoll,t,[e.data[n]]);t.goldlist[t.tablelist[t.topselect].cost_list[t.goldselect].cost_id]-=t.tablelist[t.topselect].cost_list[t.goldselect].count*t.clickcount,t.flushPage();var s=function(){RES.destroyRes(i).then(function(t){t||s()})};s()}else alert(e.message),t.clickblock.touchChildren=!0,t.touchChildren=!0},this,RES.ResourceItem.TYPE_JSON)},e.prototype.clickGoldNext=function(t){for(var e=0;e<this.goldlabellist.length;e++)t.target==this.goldlabellist[e]&&(this.goldselect=e);this.xialagroup.visible=!1,this.flushPage()},e.prototype.newXiala=function(){var t=this,e=70,i=this.tablelist[this.topselect].cost_list.length;this.xialabg.height=i*e+50;for(var n=function(i){var n=new eui.Label(s.tablelist[s.topselect].cost_list[i].name);n.x=107,n.y=19+e*i,n.width=260,n.height=60,n.textColor=16750848,n.verticalAlign="middle",n.textAlign="center",n.fontFamily="MyText",n.size=40,n.addEventListener(egret.TouchEvent.TOUCH_TAP,s.clickGoldNext,s),s.xialagroup.addChild(n),s.goldlabellist.push(n);var r=new eui.Image;RES.getResByUrl(s.tablelist[s.topselect].cost_list[i].icon,function(n){r.source=n,r.width=r.height=60,r.x=60,r.y=19+e*i,t.xialagroup.addChild(r)},s,RES.ResourceItem.TYPE_IMAGE)},s=this,r=0;i>r;r++)n(r)},e.prototype.clickRoll=function(t){this.clickblock.touchChildren=!1,this.touchChildren=!1;var e=new Lottery;e.prize=t,e.clickRoll()},e.prototype.clickTop=function(t){t.target==this.toptxt1?(this.topselect=0,this.toptxt1.textColor=16777215,this.di1.visible=!0,this.toptxt2.textColor=8882055,this.di2.visible=!1):t.target==this.toptxt2&&(this.topselect=1,this.toptxt1.textColor=8882055,this.di1.visible=!1,this.toptxt2.textColor=16777215,this.di2.visible=!0),this.flushPage()},e.prototype.flushPage=function(){var t=this;this.toptxt1.text=this.tablelist[0].name,this.toptxt2.text=this.tablelist[1].name,this.desc.text=this.tablelist[this.topselect].desc,this.desc.y=this.desc.height<this.scrolgroup.height?(this.scrolgroup.height-this.desc.height)/2:0,this.goldtxt.text=this.tablelist[this.topselect].cost_list[this.goldselect].name,RES.getResByUrl(this.tablelist[this.topselect].cost_list[this.goldselect].icon,function(e){t.goldimg.source=e},this,RES.ResourceItem.TYPE_IMAGE);var e=Math.floor(this.goldlist[this.tablelist[this.topselect].cost_list[this.goldselect].cost_id]/this.tablelist[this.topselect].cost_list[this.goldselect].count),i=e>1?"s":"";this.golddesc.text=this.tablelist[this.topselect].cost_list[this.goldselect].count+this.tablelist[this.topselect].cost_list[this.goldselect].name+"/chance,You have "+e+" spin"+i+" remaining";for(var n=function(e){var i=s.tablelist[s.topselect].award_list[e].icon;RES.getResByUrl(i,function(i){t.blist[e].img.source=i,Utils.getInstance().changeImageSize(t.blist[e].img,t.blist[e]._border),t.blist[e].img.y=(t.blist[e]._border.height-t.blist[e].img.height)/2+t.blist[e]._border.y},s,RES.ResourceItem.TYPE_IMAGE);var n=s.tablelist[s.topselect].award_list[e].price_icon;RES.getResByUrl(n,function(i){t.blist[e]._goldimg.source=i,Utils.getInstance().changeImageSize(t.blist[e]._goldimg,t.blist[e]._border2)},s,RES.ResourceItem.TYPE_IMAGE),s.blist[e]._name.text=s.tablelist[s.topselect].award_list[e].name+"x"+s.tablelist[s.topselect].award_list[e].count,s.blist[e]._cost.text=s.tablelist[s.topselect].award_list[e].price.toString()},s=this,r=0;r<this.blist.length;r++)n(r)},e.prototype.clickOver=function(){if(this.overgroup.visible=!0,1==this.resultList.length){this.singleprice.visible=!0;var t=this.resultList[0];this.singleprice.pricetxt.text=this.tablelist[this.topselect].award_list[t].name+"x"+this.tablelist[this.topselect].award_list[t].count,this.singleprice.imggroup.removeChildren();var e=new eui.Image(this.blist[t].img.source);this.singleprice.imggroup.addChild(e),Utils.getInstance().changeImageSize(e,this.singleprice.imggroup),e.verticalCenter=e.horizontalCenter=0}else for(var t=0;t<this.resultList.length;t++){var i=this.resultList[t],n=new singlepriceUI;this.pricegroup.addChild(n),n.skinName="singleprize",n.pricetxt.text=this.tablelist[this.topselect].award_list[i].name+"x"+this.tablelist[this.topselect].award_list[i].count;var e=new eui.Image(this.blist[i].img.source);n.imggroup.addChild(e),Utils.getInstance().changeImageSize(e,n.imggroup),e.verticalCenter=e.horizontalCenter=0}},e.prototype.playLightEffect=function(){for(var t=this,e=0;20>e;e++)e%2==0&&(this["light"+e].visible=!1);egret.Tween.get(this,{loop:!0}).wait(1e3).call(function(){for(var e=0;20>e;e++)t["light"+e].visible=!t["light"+e].visible},this)},e}(eui.Component);__reflect(gameUI.prototype,"gameUI",["eui.UIComponent","egret.DisplayObject"]);var Lottery=function(t){function e(){var e=t.call(this)||this;return e.index=-1,e.count=8,e.timer=0,e.speed=20,e.times=0,e.cycle=50,e.prize=-1,e}return __extends(e,t),e.prototype.clickRoll=function(){var t=this;if(this.gameui=SceneContainer.getInstance().currentScene,this.times+=1,this.roll(),this.times>this.cycle+10&&this.prize==this.index){clearTimeout(this.timer);var e=this.gameui["b"+this.prize];e._priceNum++,e._count.text="x"+e._priceNum,e._count.visible=!0,this.gameui.sum++,this.gameui.sum>=this.gameui.clickcount&&(this.gameui.sum=0,this.prize=-1,this.times=0,this.speed=20,egret.Tween.get(this).wait(500).call(function(){t.gameui.clickOver(),t.gameui.clickblock.touchChildren=!0,t.gameui.touchChildren=!0},this))}else this.times<this.cycle?this.speed-=10:this.times==this.cycle||(this.times>this.cycle+10&&(0==this.prize&&7==this.index||this.prize==this.index+1)?this.speed+=110:this.speed+=20),this.speed<40&&(this.speed=40),this.timer=setTimeout(function(){t.clickRoll()},this.speed,this);return!1},e.prototype.roll=function(){var t=this.index,e=this.count;return t>=0&&this.gameui["b"+t]._priceNum<=0&&(this.gameui.blist[t].imgmask.visible=!1),t+=1,t>e-1&&(t=0),this.gameui.blist[t].imgmask.visible=!0,this.index=t,!1},e.prototype.stop=function(){},e}(egret.DisplayObjectContainer);__reflect(Lottery.prototype,"Lottery");var singlepriceUI=function(t){function e(){var e=t.call(this)||this;return e.skinName="resource/eui_skins/ui/singleprize.exml",e}return __extends(e,t),e.prototype.childrenCreated=function(){t.prototype.childrenCreated.call(this)},e}(eui.Component);__reflect(singlepriceUI.prototype,"singlepriceUI",["eui.UIComponent","egret.DisplayObject"]);