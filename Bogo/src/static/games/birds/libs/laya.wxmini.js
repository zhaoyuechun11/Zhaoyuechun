window=window||global,window.layalib||(window.layalib=function(i,e){(window._layalibs||(window._layalibs=[])).push({f:i,i:e})}),window.layalib(function(i,e,t){t.un,t.uns;var n=t.static,a=t.class,o=t.getset,s=(t.__newvec,laya.utils.Browser),l=(laya.events.Event,laya.events.EventDispatcher),r=laya.resource.HTMLImage,u=laya.utils.Handler,c=laya.display.Input,d=laya.net.Loader,f=laya.net.LocalStorage,h=laya.maths.Matrix,p=laya.renders.Render,v=laya.utils.RunDriver,g=laya.media.SoundChannel,m=laya.media.SoundManager,w=(laya.display.Stage,laya.net.URL),y=laya.utils.Utils,_=function(){function i(){}return a(i,"laya.wx.mini.MiniLocalStorage"),i.__init__=function(){i.items=i},i.setItem=function(i,e){try{wx.setStorageSync(i,e)}catch(t){wx.setStorage({key:i,data:e})}},i.getItem=function(i){return wx.getStorageSync(i)},i.setJSON=function(e,t){i.setItem(e,t)},i.getJSON=function(e){return i.getItem(e)},i.removeItem=function(i){wx.removeStorageSync(i)},i.clear=function(){wx.clearStorageSync()},i.getStorageInfoSync=function(){try{var i=wx.getStorageInfoSync();return console.log(i.keys),console.log(i.currentSize),console.log(i.limitSize),i}catch(i){}return null},i.support=!0,i.items=null,i}(),x=function(){function e(){}return a(e,"laya.wx.mini.MiniAdpter"),e.getJson=function(i){return JSON.parse(i)},e.enable=function(){e.init(t.isWXPosMsg,t.isWXOpenDataContext)},e.init=function(n,a){void 0===n&&(n=!1),void 0===a&&(a=!1),e._inited||(e._inited=!0,(e.window=i).navigator.userAgent.indexOf("MiniGame")<0||(e.isZiYu=a,e.isPosMsgYu=n,e.EnvConfig={},e.isZiYu||(F.setNativeFileDir("/layaairGame"),F.existDir(F.fileNativeDir,u.create(e,e.onMkdirCallBack))),e.systemInfo=wx.getSystemInfoSync(),e.window.focus=function(){},t._getUrlPath=function(){},e.window.logtime=function(i){},e.window.alertTimeLog=function(i){},e.window.resetShareInfo=function(){},e.window.CanvasRenderingContext2D=function(){},e.window.CanvasRenderingContext2D.prototype=e.window.wx.createCanvas().getContext("2d").__proto__,e.window.document.body.appendChild=function(){},e.EnvConfig.pixelRatioInt=0,s._pixelRatio=e.pixelRatio(),e._preCreateElement=s.createElement,s.createElement=e.createElement,v.createShaderCondition=e.createShaderCondition,y.parseXMLFromString=e.parseXMLFromString,c._createInputElement=b._createInputElement,e.EnvConfig.load=d.prototype.load,d.prototype.load=L.prototype.load,d.prototype._loadImage=C.prototype._loadImage,_.__init__(),f._baseClass=_,e.window.wx.onMessage(e._onMessage)))},e._onMessage=function(i){switch(i.type){case"changeMatrix":t.stage.transform.identity(),t.stage._width=i.w,t.stage._height=i.h,t.stage._canvasTransform=new h(i.a,i.b,i.c,i.d,i.tx,i.ty);break;case"display":t.stage.frameRate=i.rate||"fast";break;case"undisplay":t.stage.frameRate="sleep"}"opendatacontext"==i.isLoad?i.url&&(F.ziyuFileData[i.url]=i.atlasdata,F.ziyuFileTextureData[i.imgReadyUrl]=i.imgNativeUrl):"openJsondatacontext"==i.isLoad?i.url&&(F.ziyuFileData[i.url]=i.atlasdata):"openJsondatacontextPic"==i.isLoad&&(F.ziyuFileTextureData[i.imgReadyUrl]=i.imgNativeUrl)},e.getUrlEncode=function(i,e){return"arraybuffer"==e?"":"utf8"},e.downLoadFile=function(i,e,t,n){void 0===e&&(e=""),void 0===n&&(n="utf8");F.getFileInfo(i)?null!=t&&t.runWith([0]):F.downLoadFile(i,e,t,n)},e.remove=function(i,e){F.deleteFile("",i,e,"",0)},e.removeAll=function(){F.deleteAll()},e.hasNativeFile=function(i){return F.isLocalNativeFile(i)},e.getFileInfo=function(i){return F.getFileInfo(i)},e.getFileList=function(){return F.filesListObj},e.exitMiniProgram=function(){e.window.wx.exitMiniProgram()},e.onMkdirCallBack=function(i,e){i||(F.filesListObj=JSON.parse(e.data))},e.pixelRatio=function(){if(!e.EnvConfig.pixelRatioInt)try{return e.EnvConfig.pixelRatioInt=e.systemInfo.pixelRatio,e.systemInfo.pixelRatio}catch(i){}return e.EnvConfig.pixelRatioInt},e.createElement=function(t){if("canvas"==t){var n;return 1==e.idx?e.isZiYu?(n=sharedCanvas).style={}:n=i.canvas:n=i.wx.createCanvas(),e.idx++,n}if("textarea"==t||"input"==t)return e.onCreateInput(t);if("div"==t){var a=e._preCreateElement(t);return a.contains=function(i){return null},a.removeChild=function(i){},a}return e._preCreateElement(t)},e.onCreateInput=function(i){var t=e._preCreateElement(i);return t.focus=b.wxinputFocus,t.blur=b.wxinputblur,t.style={},t.value=0,t.parentElement={},t.placeholder={},t.type={},t.setColor=function(i){},t.setType=function(i){},t.setFontFace=function(i){},t.addEventListener=function(i){},t.contains=function(i){return null},t.removeChild=function(i){},t},e.createShaderCondition=function(i){var e=this;return function(){return e[i.replace("this.","")]}},e.sendAtlasToOpenDataContext=function(i){if(!laya.wx.mini.MiniAdpter.isZiYu){var t=d.getRes(w.formatURL(i));if(!t)throw"传递的url没有获取到对应的图集数据信息，请确保图集已经过！";t.meta.image.split(",");if(t.meta&&t.meta.image)for(var n=t.meta.image.split(","),a=i.indexOf("/")>=0?"/":"\\",o=i.lastIndexOf(a),s=o>=0?i.substr(0,o+1):"",l=0,r=n.length;l<r;l++)n[l]=s+n[l];else n=[i.replace(".json",".png")];for(l=0;l<n.length;l++){var u=n[l];e.postInfoToContext(i,u,t)}}},e.postInfoToContext=function(i,e,t){var n={frames:t.frames,meta:t.meta},a=e,o=F.getFileInfo(w.formatURL(e));if(o)var s=o.md5,l=F.getFileNativePath(s);else l=a;if(!l)throw"获取图集的磁盘url路径不存在！";wx.postMessage({url:i,atlasdata:n,imgNativeUrl:l,imgReadyUrl:a,isLoad:"opendatacontext"})},e.sendSinglePicToOpenDataContext=function(i){var e=w.formatURL(i),t=F.getFileInfo(e);if(t){var n=t.md5,a=F.getFileNativePath(n);i=e}else a=i;if(!a)throw"获取图集的磁盘url路径不存在！";wx.postMessage({url:i,imgNativeUrl:a,imgReadyUrl:i,isLoad:"openJsondatacontextPic"})},e.sendJsonDataToDataContext=function(i){if(!laya.wx.mini.MiniAdpter.isZiYu){var e=d.getRes(i);if(!e)throw"传递的url没有获取到对应的图集数据信息，请确保图集已经过！";wx.postMessage({url:i,atlasdata:e,isLoad:"openJsondatacontext"})}},e.EnvConfig=null,e.window=null,e._preCreateElement=null,e._inited=!1,e.systemInfo=null,e.isZiYu=!1,e.isPosMsgYu=!1,e.autoCacheFile=!0,e.minClearSize=5242880,e.subNativeFiles=null,e.subNativeheads=[],e.subMaps=[],e.AutoCacheDownFile=!1,e.parseXMLFromString=function(e){var t;e=e.replace(/>\s+</g,"><");try{t=(new i.Parser.DOMParser).parseFromString(e,"text/xml")}catch(i){throw"需要引入xml解析库文件"}return t},e.idx=1,n(e,["nativefiles",function(){return this.nativefiles=["layaNativeDir","wxlocal"]}]),e}(),F=function(){function e(){}return a(e,"laya.wx.mini.MiniFileMgr"),e.isLocalNativeFile=function(i){for(var e=0,t=x.nativefiles.length;e<t;e++)if(-1!=i.indexOf(x.nativefiles[e]))return!0;return!1},e.getFileInfo=function(i){var t=e.filesListObj[i];return null==t?null:t},e.read=function(i,t,n,a,o,s){void 0===t&&(t="ascill"),void 0===a&&(a=""),void 0===o&&(o=!1),void 0===s&&(s="");var l;l=""==a||-1==a.indexOf("http://")&&-1==a.indexOf("https://")?i:e.getFileNativePath(i),l=w.getAdptedFilePath(l),e.fs.readFile({filePath:l,encoding:t,success:function(i){null!=n&&n.runWith([0,i])},fail:function(i){i&&""!=a?e.downFiles(a,t,n,a,o,s):null!=n&&n.runWith([1])}})},e.downFiles=function(i,t,n,a,o,s,l){void 0===t&&(t="ascii"),void 0===a&&(a=""),void 0===o&&(o=!1),void 0===s&&(s=""),void 0===l&&(l=!0);e.wxdown({url:i,success:function(r){200===r.statusCode?e.readFile(r.tempFilePath,t,n,a,o,s,l):403===r.statusCode?null!=n&&n.runWith([0,i]):null!=n&&n.runWith([1,r])},fail:function(i){null!=n&&n.runWith([1,i])}}).onProgressUpdate(function(i){null!=n&&n.runWith([2,i.progress])})},e.readFile=function(i,t,n,a,o,s,l){void 0===t&&(t="ascill"),void 0===a&&(a=""),void 0===o&&(o=!1),void 0===s&&(s=""),void 0===l&&(l=!0),i=w.getAdptedFilePath(i),e.fs.readFile({filePath:i,encoding:t,success:function(s){-1!=i.indexOf("http://")||-1!=i.indexOf("https://")?(x.autoCacheFile||o)&&e.copyFile(i,a,n,t,l):null!=n&&n.runWith([0,s])},fail:function(i){i&&null!=n&&n.runWith([1,i])}})},e.downOtherFiles=function(i,t,n,a,o){void 0===n&&(n=""),void 0===a&&(a=!1),void 0===o&&(o=!0),e.wxdown({url:i,success:function(i){200===i.statusCode?(x.autoCacheFile||a)&&-1==n.indexOf("wx.qlogo.cn")&&-1==n.indexOf(".php")?e.copyFile(i.tempFilePath,n,t,"",o):null!=t&&t.runWith([0,i.tempFilePath]):null!=t&&t.runWith([1,i])},fail:function(i){null!=t&&t.runWith([1,i])}})},e.downLoadFile=function(n,a,o,s){void 0===a&&(a=""),void 0===s&&(s="ascii"),i.navigator.userAgent.indexOf("MiniGame")<0?t.loader.load(n,o):"image"==a||"sound"==a?e.downOtherFiles(n,o,n,!0,!1):e.downFiles(n,s,o,n,!0,a,!1)},e.copyFile=function(i,t,n,a,o){void 0===a&&(a=""),void 0===o&&(o=!0);var s=i.split("/"),l=s[s.length-1],r=e.getFileInfo(t),u=e.getFileNativePath(l),c=e.getCacheUseSize();r?r.readyUrl!=t?e.fs.getFileInfo({filePath:i,success:function(i){o&&c+4194304+i.size>=52428800&&(i.size>x.minClearSize&&(x.minClearSize=i.size),e.onClearCacheRes()),e.deleteFile(l,t,n,a,i.size)},fail:function(i){null!=n&&n.runWith([1,i])}}):null!=n&&n.runWith([0]):e.fs.getFileInfo({filePath:i,success:function(s){o&&c+4194304+s.size>=52428800&&(s.size>x.minClearSize&&(x.minClearSize=s.size),e.onClearCacheRes()),e.fs.copyFile({srcPath:i,destPath:u,success:function(i){e.onSaveFile(t,l,!0,a,n,s.size)},fail:function(i){null!=n&&n.runWith([1,i])}})},fail:function(i){null!=n&&n.runWith([1,i])}})},e.onClearCacheRes=function(){var i=x.minClearSize,t=[];for(var n in e.filesListObj)t.push(e.filesListObj[n]);e.sortOn(t,"times",16);for(var a=0,o=1,s=t.length;o<s;o++){var l=t[o];if(a>=i)break;a+=l.size,e.deleteFile("",l.readyUrl)}},e.sortOn=function(i,e,t){return void 0===t&&(t=0),16==t?i.sort(function(i,t){return i[e]-t[e]}):18==t?i.sort(function(i,t){return t[e]-i[e]}):i.sort(function(i,t){return i[e]-t[e]})},e.getFileNativePath=function(i){return laya.wx.mini.MiniFileMgr.fileNativeDir+"/"+i},e.deleteFile=function(i,t,n,a,o){void 0===t&&(t=""),void 0===a&&(a=""),void 0===o&&(o=0);var s=e.getFileInfo(t),l=e.getFileNativePath(s.md5);e.fs.unlink({filePath:l,success:function(s){var l=""!=i;if(""!=i){var r=e.getFileNativePath(i);e.fs.copyFile({srcPath:i,destPath:r,success:function(o){e.onSaveFile(t,i,l,a,n,o.size)},fail:function(i){null!=n&&n.runWith([1,i])}})}else e.onSaveFile(t,i,l,a,n,o)},fail:function(i){}})},e.deleteAll=function(){var i=[];for(var t in e.filesListObj)i.push(e.filesListObj[t]);for(var n=1,a=i.length;n<a;n++){var o=i[n];e.deleteFile("",o.readyUrl)}laya.wx.mini.MiniFileMgr.filesListObj&&laya.wx.mini.MiniFileMgr.filesListObj.fileUsedSize&&(laya.wx.mini.MiniFileMgr.filesListObj.fileUsedSize=0),laya.wx.mini.MiniFileMgr.writeFilesList("",JSON.stringify({}),!1)},e.onSaveFile=function(i,t,n,a,o,l){void 0===n&&(n=!0),void 0===a&&(a=""),void 0===l&&(l=0);var r=i;if(null==e.filesListObj.fileUsedSize&&(e.filesListObj.fileUsedSize=0),n){e.getFileNativePath(t);e.filesListObj[r]={md5:t,readyUrl:i,size:l,times:s.now(),encoding:a},e.filesListObj.fileUsedSize=parseInt(e.filesListObj.fileUsedSize)+l,e.writeFilesList(r,JSON.stringify(e.filesListObj),!0),null!=o&&o.runWith([0])}else if(e.filesListObj[r]){var u=parseInt(e.filesListObj[r].size);e.filesListObj.fileUsedSize=parseInt(e.filesListObj.fileUsedSize)-u,delete e.filesListObj[r],e.writeFilesList(r,JSON.stringify(e.filesListObj),!1),null!=o&&o.runWith([0])}},e.writeFilesList=function(i,t,n){var a=e.fileNativeDir+"/"+e.fileListName;e.fs.writeFile({filePath:a,encoding:"utf8",data:t,success:function(i){},fail:function(i){}}),!x.isZiYu&&x.isPosMsgYu&&wx.postMessage({url:i,data:e.filesListObj[i],isLoad:"filenative",isAdd:n})},e.getCacheUseSize=function(){return e.filesListObj&&e.filesListObj.fileUsedSize?e.filesListObj.fileUsedSize:0},e.existDir=function(i,t){e.fs.mkdir({dirPath:i,success:function(i){null!=t&&t.runWith([0,{data:JSON.stringify({})}])},fail:function(i){-1!=i.errMsg.indexOf("file already exists")?e.readSync(e.fileListName,"utf8",t):null!=t&&t.runWith([1,i])}})},e.readSync=function(i,t,n,a){void 0===t&&(t="ascill"),void 0===a&&(a="");var o,s=e.getFileNativePath(i);try{o=e.fs.readFileSync(s,t),null!=n&&n.runWith([0,{data:o}])}catch(i){null!=n&&n.runWith([1])}},e.setNativeFileDir=function(i){e.fileNativeDir=wx.env.USER_DATA_PATH+i},e.filesListObj={},e.fileNativeDir=null,e.fileListName="layaairfiles.txt",e.ziyuFileData={},e.ziyuFileTextureData={},e.loadPath="",e.DESCENDING=2,e.NUMERIC=16,n(e,["fs",function(){return this.fs=wx.getFileSystemManager()},"wxdown",function(){return this.wxdown=wx.downloadFile}]),e}(),C=function(){function i(){}a(i,"laya.wx.mini.MiniImage");return i.prototype._loadImage=function(e){if(x.isZiYu)i.onCreateImage(e,this,!0);else{var t=!1;if(F.isLocalNativeFile(e)){if(-1!=e.indexOf("http://")||-1!=e.indexOf("https://"))if(""!=F.loadPath)e=e.split(F.loadPath)[1];else{var n=""!=w.rootPath?w.rootPath:w.basePath,a=e;""!=n&&(e=e.split(n)[1]),e||(e=a)}if(x.subNativeFiles&&0==x.subNativeheads.length)for(var o in x.subNativeFiles){var s=x.subNativeFiles[o];x.subNativeheads=x.subNativeheads.concat(s);for(var l=0;l<s.length;l++)x.subMaps[s[l]]=o+"/"+s[l]}if(x.subNativeFiles&&-1!=e.indexOf("/")){var r=e.split("/")[0]+"/";if(r&&-1!=x.subNativeheads.indexOf(r)){var c=x.subMaps[r];e=e.replace(r,c)}}}else t=!0,e=w.formatURL(e);F.getFileInfo(e)?i.onCreateImage(e,this,!t):-1!=e.indexOf("http://")||-1!=e.indexOf("https://")?x.isZiYu?i.onCreateImage(e,this,!0):F.downOtherFiles(e,new u(i,i.onDownImgCallBack,[e,this]),e):i.onCreateImage(e,this,!0)}},i.onDownImgCallBack=function(e,t,n,a){void 0===a&&(a=""),n?t.onError(null):i.onCreateImage(e,t,!1,a)},i.onCreateImage=function(i,e,t,n){function a(){var i=e._imgCache[o];i&&(i.onload=null,i.onerror=null,delete e._imgCache[o])}void 0===t&&(t=!1),void 0===n&&(n="");var o;if(x.autoCacheFile)if(t)if(x.isZiYu){var l=w.formatURL(i);o=F.ziyuFileTextureData[l]?F.ziyuFileTextureData[l]:i}else o=i;else if(""!=n)o=n;else{var u=F.getFileInfo(i).md5;o=F.getFileNativePath(u)}else o=t?i:n;null==e._imgCache&&(e._imgCache={});var c,d=function(){a(),e.event("error","Load image failed")};if("nativeimage"==e._type){var f=function(){a(),e._url=w.formatURL(e._url),e.onLoaded(c)};(c=new s.window.Image).crossOrigin="",c.onload=f,c.onerror=d,c.src=o,e._imgCache[o]=c}else{var h=new s.window.Image;f=function(){e._url=w.formatURL(e._url),(c=r.create(h.width,h.height)).loadImageSource(h,!0),c._setUrl(o),a(),e.onLoaded(c)},h.crossOrigin="",h.onload=f,h.onerror=d,h.src=o,e._imgCache[o]=h}},i}(),b=(function(){function i(){}a(i,"laya.wx.mini.MiniLocation"),i.__init__=function(){x.window.navigator.geolocation.getCurrentPosition=i.getCurrentPosition,x.window.navigator.geolocation.watchPosition=i.watchPosition,x.window.navigator.geolocation.clearWatch=i.clearWatch},i.getCurrentPosition=function(i,e,t){var n;(n={}).success=function(e){null!=i&&i(e)},n.fail=e,x.window.wx.getLocation(n)},i.watchPosition=function(e,n,a){i._curID++;var o;return o={},o.success=e,o.error=n,i._watchDic[i._curID]=o,t.systemTimer.loop(1e3,null,i._myLoop),i._curID},i.clearWatch=function(e){delete i._watchDic[e],i._hasWatch()||t.systemTimer.clear(null,i._myLoop)},i._hasWatch=function(){var e;for(e in i._watchDic)if(i._watchDic[e])return!0;return!1},i._myLoop=function(){i.getCurrentPosition(i._mySuccess,i._myError)},i._mySuccess=function(e){var t={};t.coords=e,t.timestamp=s.now();var n;for(n in i._watchDic)i._watchDic[n].success&&i._watchDic[n].success(t)},i._myError=function(e){var t;for(t in i._watchDic)i._watchDic[t].error&&i._watchDic[t].error(e)},i._watchDic={},i._curID=0}(),function(){function e(){}return a(e,"laya.wx.mini.MiniInput"),e._createInputElement=function(){c._initInput(c.area=s.createElement("textarea")),c._initInput(c.input=s.createElement("input")),c.inputContainer=s.createElement("div"),c.inputContainer.style.position="absolute",c.inputContainer.style.zIndex=1e5,s.container.appendChild(c.inputContainer),c.inputContainer.setPos=function(i,e){c.inputContainer.style.left=i+"px",c.inputContainer.style.top=e+"px"},t.stage.on("resize",null,e._onStageResize),wx.onWindowResize&&wx.onWindowResize(function(e){i.dispatchEvent&&i.dispatchEvent("resize")}),m._soundClass=S,m._musicClass=S;var n=x.systemInfo.model,a=x.systemInfo.system;-1!=n.indexOf("iPhone")&&(s.onIPhone=!0,s.onIOS=!0,s.onIPad=!0,s.onAndroid=!1),-1==a.indexOf("Android")&&-1==a.indexOf("Adr")||(s.onAndroid=!0,s.onIPhone=!1,s.onIOS=!1,s.onIPad=!1)},e._onStageResize=function(){t.stage._canvasTransform.identity().scale(s.width/p.canvas.width/s.pixelRatio,s.height/p.canvas.height/s.pixelRatio)},e.wxinputFocus=function(i){var e=c.inputElement.target;e&&!e.editable||(x.window.wx.offKeyboardConfirm(),x.window.wx.offKeyboardInput(),x.window.wx.showKeyboard({defaultValue:e.text,maxLength:e.maxChars,multiple:e.multiline,confirmHold:!0,confirmType:e.confirmType||"done",success:function(i){},fail:function(i){}}),x.window.wx.onKeyboardConfirm(function(i){var t=i?i.value:"";e.text=t,e.event("input"),laya.wx.mini.MiniInput.inputEnter(),e.event("confirm")}),x.window.wx.onKeyboardInput(function(i){var t=i?i.value:"";e.multiline||-1==t.indexOf("\n")?(e.text=t,e.event("input")):laya.wx.mini.MiniInput.inputEnter()}))},e.inputEnter=function(){c.inputElement.target.focus=!1},e.wxinputblur=function(){e.hideKeyboard()},e.hideKeyboard=function(){x.window.wx.offKeyboardConfirm(),x.window.wx.offKeyboardInput(),x.window.wx.hideKeyboard({success:function(i){console.log("隐藏键盘")},fail:function(i){console.log("隐藏键盘出错:"+(i?i.errMsg:""))}})},e}()),L=function(i){function e(){e.__super.call(this)}a(e,"laya.wx.mini.MiniLoader",l);return e.prototype.load=function(i,t,n,a,o){void 0===n&&(n=!0),void 0===o&&(o=!1);if(this._url=i,0===i.indexOf("data:image")?this._type=t="image":this._type=t||(t=d.getTypeFromUrl(i)),this._cache=n,this._data=null,!o&&d.loadedMap[w.formatURL(i)])return this._data=d.loadedMap[w.formatURL(i)],this.event("progress",1),void this.event("complete",this._data);if(null!=d.parserMap[t])return this._customParse=!0,void(d.parserMap[t]instanceof laya.utils.Handler?d.parserMap[t].runWith(this):d.parserMap[t].call(null,this));var s=x.getUrlEncode(i,t),l=y.getFileExtension(i);if(-1!=e._fileTypeArr.indexOf(l))x.EnvConfig.load.call(this,i,t,n,a,o);else{if(x.isZiYu&&!F.ziyuFileData[i]&&(i=w.formatURL(i)),x.isZiYu&&F.ziyuFileData[i]){var r=F.ziyuFileData[i];return void this.onLoaded(r)}if(F.getFileInfo(i)){var c=F.getFileInfo(i);c.encoding=null==c.encoding?"utf8":c.encoding,F.readFile(i,c.encoding,new u(e,e.onReadNativeCallBack,[s,i,t,n,a,o,this]),i)}else{if(F.isLocalNativeFile(i)){if(x.subNativeFiles&&0==x.subNativeheads.length)for(var f in x.subNativeFiles){var h=x.subNativeFiles[f];x.subNativeheads=x.subNativeheads.concat(h);for(var p=0;p<h.length;p++)x.subMaps[h[p]]=f+"/"+h[p]}if(x.subNativeFiles&&-1!=i.indexOf("/")){var v=i.split("/")[0]+"/";if(v&&-1!=x.subNativeheads.indexOf(v)){var g=x.subMaps[v];i=i.replace(v,g)}}return void F.read(i,s,new u(e,e.onReadNativeCallBack,[s,i,t,n,a,o,this]))}-1!=(i=w.formatURL(i)).indexOf("http://")||-1!=i.indexOf("https://")&&!x.AutoCacheDownFile?x.EnvConfig.load.call(this,i,t,n,a,o):F.readFile(i,s,new u(e,e.onReadNativeCallBack,[s,i,t,n,a,o,this]),i)}}},e.onReadNativeCallBack=function(i,e,t,n,a,o,s,l,r){if(void 0===n&&(n=!0),void 0===o&&(o=!1),void 0===l&&(l=0),l)1==l&&x.EnvConfig.load.call(s,e,t,n,a,o);else{var u;u="json"==t||"atlas"==t||"prefab"==t?x.getJson(r.data):"xml"==t?y.parseXMLFromString(r.data):r.data,!x.isZiYu&&x.isPosMsgYu&&"arraybuffer"!=t&&wx.postMessage({url:e,data:u,isLoad:"filedata"}),s.onLoaded(u)}},n(e,["_fileTypeArr",function(){return this._fileTypeArr=["png","jpg","bmp","jpeg","gif"]}]),e}(),S=function(i){function e(){this._sound=null,this.url=null,this.loaded=!1,this.readyUrl=null,e.__super.call(this)}a(e,"laya.wx.mini.MiniSound",l);var t=e.prototype;return t.load=function(i){if(F.isLocalNativeFile(i)){if(-1!=i.indexOf("http://")||-1!=i.indexOf("https://"))if(""!=F.loadPath)i=i.split(F.loadPath)[1];else{var t=""!=w.rootPath?w.rootPath:w.basePath;""!=t&&(i=i.split(t)[1])}}else i=w.formatURL(i);if(this.url=i,this.readyUrl=i,e._audioCache[this.readyUrl])this.event("complete");else if(x.autoCacheFile&&F.getFileInfo(i))this.onDownLoadCallBack(i,0);else if(x.autoCacheFile)if(F.isLocalNativeFile(i)){var n=i;if(""!=(t=""!=w.rootPath?w.rootPath:w.basePath)&&(i=i.split(t)[1]),i||(i=n),x.subNativeFiles&&0==x.subNativeheads.length)for(var a in x.subNativeFiles){var o=x.subNativeFiles[a];x.subNativeheads=x.subNativeheads.concat(o);for(var s=0;s<o.length;s++)x.subMaps[o[s]]=a+"/"+o[s]}if(x.subNativeFiles&&-1!=i.indexOf("/")){var l=i.split("/")[0]+"/";if(l&&-1!=x.subNativeheads.indexOf(l)){var r=x.subMaps[l];i=i.replace(l,r)}}this.onDownLoadCallBack(i,0)}else F.downOtherFiles(i,u.create(this,this.onDownLoadCallBack,[i]),i);else this.onDownLoadCallBack(i,0)},t.onDownLoadCallBack=function(i,t){if(t)this.event("error");else{var n;if(x.autoCacheFile){if(F.isLocalNativeFile(i)){var a=""!=w.rootPath?w.rootPath:w.basePath,o=i;""==a||-1==i.indexOf("http://")&&-1==i.indexOf("https://")||(n=i.split(a)[1]),n||(n=o)}else{var s=F.getFileInfo(i);if(s&&s.md5){var l=s.md5;n=F.getFileNativePath(l)}else n=i}this._sound=e._createSound(),this._sound.src=this.url=n}else this._sound=e._createSound(),this._sound.src=i;this._sound.onCanplay(e.bindToThis(this.onCanPlay,this)),this._sound.onError(e.bindToThis(this.onError,this))}},t.onError=function(i){try{console.log("-----1---------------minisound-----id:"+e._id),console.log(i)}catch(i){console.log("-----2---------------minisound-----id:"+e._id),console.log(i)}this.event("error"),this._sound.offError(null)},t.onCanPlay=function(){this.loaded=!0,this.event("complete"),this._sound.offCanplay(null)},t.play=function(i,t){void 0===i&&(i=0),void 0===t&&(t=0);var n;if(this.url==m._bgMusic?(e._musicAudio||(e._musicAudio=e._createSound()),n=e._musicAudio):n=e._audioCache[this.readyUrl]?e._audioCache[this.readyUrl]._sound:e._createSound(),x.autoCacheFile&&F.getFileInfo(this.url)){var a=F.getFileInfo(this.url).md5;n.src=this.url=F.getFileNativePath(a)}else n.src=this.url;var o=new I(n,this);return o.url=this.url,o.loops=t,o.loop=0===t,o.startTime=i,o.play(),m.addChannel(o),o},t.dispose=function(){var i=e._audioCache[this.readyUrl];i&&(i.src="",i._sound&&(i._sound.destroy(),i._sound=null,i=null),delete e._audioCache[this.readyUrl])},o(0,t,"duration",function(){return this._sound.duration}),e._createSound=function(){return e._id++,x.window.wx.createInnerAudioContext()},e.bindToThis=function(i,e){return i.bind(e)},e._musicAudio=null,e._id=0,e._audioCache={},e}(),I=(function(i){function e(){e.__super.call(this)}a(e,"laya.wx.mini.MiniAccelerator",i);var t=e.prototype;t.on=function(t,n,a,o){return i.prototype.on.call(this,t,n,a,o),e.startListen(this.onDeviceOrientationChange),this},t.off=function(t,n,a,o){return void 0===o&&(o=!1),this.hasListener(t)||e.stopListen(),i.prototype.off.call(this,t,n,a,o)},e.__init__=function(){try{var i;if(!(i=laya.device.motion.Accelerator))return;i.prototype.on=e.prototype.on,i.prototype.off=e.prototype.off}catch(i){}},e.startListen=function(i){if(e._callBack=i,!e._isListening){e._isListening=!0;try{wx.onAccelerometerChange(e.onAccelerometerChange)}catch(i){}}},e.stopListen=function(){e._isListening=!1;try{wx.stopAccelerometer({})}catch(i){}},e.onAccelerometerChange=function(i){var t;(t={}).acceleration=i,t.accelerationIncludingGravity=i,t.rotationRate={},null!=e._callBack&&e._callBack(t)},e._isListening=!1,e._callBack=null}(l),function(i){function e(i,t){this._audio=null,this._onEnd=null,this._miniSound=null,e.__super.call(this),this._audio=i,this._miniSound=t,this._onEnd=e.bindToThis(this.__onEnd,this),i.onEnded(this._onEnd)}a(e,"laya.wx.mini.MiniSoundChannel",g);var n=e.prototype;return n.__onEnd=function(){if(1==this.loops)return this.completeHandler&&(t.systemTimer.once(10,this,this.__runComplete,[this.completeHandler],!1),this.completeHandler=null),this.stop(),void this.event("complete");this.loops>0&&this.loops--,this.startTime=0,this.play()},n.play=function(){this.isStopped=!1,m.addChannel(this),this._audio.play()},n.stop=function(){this.isStopped=!0,m.removeChannel(this),this.completeHandler=null,this._audio&&(this._audio.pause(),this._audio.offEnded(null),this._audio=null,this._miniSound=null,this._onEnd=null)},n.pause=function(){this.isStopped=!0,this._audio.pause()},n.resume=function(){this._audio&&(this.isStopped=!1,m.addChannel(this),this._audio.play())},o(0,n,"startTime",null,function(i){this._audio&&(this._audio.startTime=i)}),o(0,n,"autoplay",function(){return this._audio.autoplay},function(i){this._audio.autoplay=i}),o(0,n,"position",function(){return this._audio?this._audio.currentTime:0}),o(0,n,"duration",function(){return this._audio?this._audio.duration:0}),o(0,n,"loop",function(){return this._audio.loop},function(i){this._audio.loop=i}),o(0,n,"volume",function(){return this._audio?this._audio.volume:1},function(i){this._audio&&(this._audio.volume=i)}),e.bindToThis=function(i,e){return i.bind(e)},e}())},1e3);