window.__require=function e(t,o,n){function i(s,c){if(!o[s]){if(!t[s]){var r=s.split("/");if(r=r[r.length-1],!t[r]){var d="function"==typeof __require&&__require;if(!c&&d)return d(r,!0);if(a)return a(r,!0);throw new Error("Cannot find module '"+s+"'")}}var p=o[s]={exports:{}};t[s][0].call(p.exports,function(e){return i(t[s][1][e]||e)},p,p.exports,e,t,o,n)}return o[s].exports}for(var a="function"==typeof __require&&__require,s=0;s<n.length;s++)i(n[s]);return i}({ClimbPoint:[function(e,t,o){"use strict";cc._RF.push(t,"94b5aDyDsJIK69LOb0m0ZtN","ClimbPoint"),Object.defineProperty(o,"__esModule",{value:!0});var n=cc._decorator,i=n.ccclass,a=(n.property,function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.prototype.dropDown=function(){var e=this,t=cc.sequence(cc.moveBy(3,0,this.node.y-this.node.parent.parent.height/2-this.node.height).easing(cc.easeOut(1)),cc.callFunc(function(){e.node.active=!1}));this.node.runAction(t)},t.prototype.start=function(){},t=__decorate([i],t)}(cc.Component));o.default=a,cc._RF.pop()},{}],GameSocket:[function(e,t,o){"use strict";cc._RF.push(t,"40a0cN3UX1DWqcelYu5mw3E","GameSocket"),Object.defineProperty(o,"__esModule",{value:!0});var n=function(){function e(e,t){this.timeOutHandle=null,this.retryCount=0,this.isOpen=!1,this.host=e,this.port=t}return e.prototype.connect=function(e){var t=this,o=this;this.socket=new WebSocket("ws://"+this.host+":"+this.port),this.socket.onclose=function(e){console.log("GameSocket","onClose",e),o.onClose(),o.timeOutHandle&&(clearTimeout(o.timeOutHandle),o.timeOutHandle=null)},this.socket.onerror=function(o){console.log("GameSocket","onError",o),t.isOpen||(t.retryCount>=3?t.onClose():setTimeout(function(){t.retryCount++,t.connect(e)},.5))},this.socket.onmessage=function(e){if(console.log("GameSocket","onMessage",e.data),"pi"!==e.data){var t=JSON.parse(e.data);switch(t.type){case"begin":o.onBegin(t.msg.countdown,t.msg.mappointer);break;case"over":o.onOver(t.msg.reason);break;case"move":o.onMove(t.msg.step)}}},this.socket.onopen=function(n){console.log("GameSocket","onOpen"),t.isOpen=!0,o.heartCheck(),e()}},e.prototype.heartCheck=function(){var e=this;this.timeOutHandle&&clearTimeout(this.timeOutHandle),this.timeOutHandle=setInterval(function(){e.socket.send("pi")},5e3)},e.prototype.send=function(e){this.socket.send(JSON.stringify(e))},e.prototype.init=function(e){console.log("GameSocket","init"),this.send({type:"init",msg:{id:"climbhigh",name:"Climb High",userid:e[0].toString(),userlist:e.map(function(e){return e.toString()})}})},e.prototype.ready=function(){console.log("GameSocket","ready"),this.send({type:"ready",msg:{}})},e.prototype.move=function(e){console.log("GameSocket","move"),this.send({type:"move",msg:{step:e}})},e.prototype.mapindex=function(e){console.log("GameSocket","mapindex"),this.send({type:"mapindex",msg:e})},e.prototype.temp=function(e){console.log("GameSocket","temp"),this.send({type:"temp",msg:e})},e.prototype.disconnect=function(){this.socket.close()},e}();o.default=n,cc._RF.pop()},{}],GameView:[function(e,t,o){"use strict";cc._RF.push(t,"e1b90/rohdEk4SdmmEZANaD","GameView"),Object.defineProperty(o,"__esModule",{value:!0});var n=e("./Player"),i=e("./ClimbPoint"),a=e("./MessageComponent"),s=e("./GameSocket"),c=cc._decorator,r=c.ccclass,d=c.property,p=(function(){}(),function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.user1=null,t.user2=null,t.headFrame=null,t.headFrame2=null,t.progress1=null,t.progress2=null,t.gameTimer=null,t.playerLeft=null,t.playerRight=null,t.background=null,t.pointPrefab=null,t.pointPrefab2=null,t.gameCountDown=90,t.climbNodes=[],t.climbNodes2=[],t.fakeNodes=[],t.fakeNodes2=[],t.player=null,t.player2=null,t.playerPos=0,t.playerPos2=0,t.playerXSum=0,t.isOver=!1,t.stackCount=0,t.tapAudio=null,t.dropAudio=null,t._showIcon=!0,t.yindaoAction=cc.sequence(cc.moveBy(.25,-50,0),cc.moveBy(.25,50,0)).easing(cc.easeInOut(2)).repeatForever(),t.startCount=0,t}return __extends(t,e),t.prototype.onLoad=function(){var t=this;e.prototype.onLoad.call(this),cc.loader.loadRes("sound/tap",cc.AudioClip,function(e,o){t.tapAudio=o}),cc.loader.loadRes("sound/drop",cc.AudioClip,function(e,o){t.dropAudio=o}),cc.loader.loadRes("texture/bg_top",cc.SpriteFrame,function(e,o){console.log("loadRes",e,o),t.background.node.getChildByName("bg_top").getComponent(cc.Sprite).spriteFrame=o})},t.prototype.start=function(){0},t.prototype.onGameBegin=function(e,t){var o=this,n=this.node.getChildByName("ui-bg").getChildByName("nameLeft").getComponent(cc.Label),i=this.node.getChildByName("ui-bg").getChildByName("nameRight").getComponent(cc.Label);n.string=e[0].userName,i.string=e[1].userName,n.node.active=!0,i.node.active=!0,this.socket=new s.default(t.url,t.port),this.socket.onBegin=function(e,t){e&&(o.gameCountDown=e-1),o.onReceiveMapData(t.ptr1,t.ptr2),o.gameStart()},this.socket.onMove=function(e){o.onPlayer2Move(e)},this.socket.onOver=function(t){"win"==t?o.sendGameData(1):"timeout"==t?(o.sendGameData(1),e[1].isRobot&&o.sendGameData(1,e[1].userId)):(o.sendGameData(0),e[1].isRobot&&o.sendGameData(1,e[1].userId))},this.socket.onClose=function(){},this.socket.connect(function(){o.socket.init(e.map(function(e){return e.isRobot?"&bot;":e.userId})),o.checkStart()}),cc.loader.load(e[0].userHead,function(e,t){e||(o.user1.node.active=!0,o.user1.spriteFrame=new cc.SpriteFrame(t))}),cc.loader.load(e[1].userHead,function(e,t){e||(o.user2.node.active=!0,o.user2.spriteFrame=new cc.SpriteFrame(t),o.node.getChildByName("icon").getChildByName("mask").getChildByName("icon").getComponent(cc.Sprite).spriteFrame=new cc.SpriteFrame(t))}),e[0].userHeadFrame&&cc.loader.load(e[0].userHeadFrame,function(e,t){e||(o.headFrame.node.active=!0,o.headFrame.spriteFrame=new cc.SpriteFrame(t))}),e[1].userHeadFrame&&cc.loader.load(e[1].userHeadFrame,function(e,t){e||(o.headFrame2.node.active=!0,o.headFrame2.spriteFrame=new cc.SpriteFrame(t))}),this.playerLeft.zIndex=1,this.playerRight.zIndex=1,this.playerXSum=this.playerLeft.position.x+this.playerRight.position.x,e[0].userId<e[1].userId?(this.player=this.playerLeft,this.player2=this.playerRight):(this.player=this.playerRight,this.player2=this.playerLeft),this.progress1.node.width=0,this.progress2.node.width=0;var a=this.player==this.playerLeft?864:-864;this.background.node.runAction(cc.moveBy(.5,a,0).easing(cc.easeIn(2))),this.readyGo()},t.prototype.readyGo=function(){var e=this;cc.loader.loadRes("sound/readygo",cc.AudioClip,function(t,o){var n=e.node.getChildByName("ready"),i=e.node.getChildByName("go");n.active=!0,n.scale=0,n.runAction(cc.sequence(cc.scaleTo(.3,1).easing(cc.easeIn(2)),cc.delayTime(.3),cc.scaleTo(.3,0).easing(cc.easeOut(2)),cc.callFunc(function(){n.active=!1,i.active=!0,i.scale=0,i.runAction(cc.sequence(cc.delayTime(.3),cc.scaleTo(.3,1).easing(cc.easeIn(2)),cc.delayTime(.8),cc.scaleTo(.3,0).easing(cc.easeOut(2)),cc.callFunc(function(){i.active=!1,e.checkStart()})))}))),cc.audioEngine.play(o,!1,1)})},t.prototype.checkStart=function(){this.startCount++,this.startCount>=2&&this.socket.ready()},t.prototype.onGameOver=function(e){cc.audioEngine.stopAll(),this.socket.disconnect(),this.isOver=!0,cc.loader.loadRes(1==e?"sound/win":"sound/over",cc.AudioClip,function(e,t){cc.audioEngine.play(t,!1,1)});var t=this.node.getChildByName(1==e?"win":0==e?"tie":"fail");t.scale=0,t.active=!0,t.runAction(cc.scaleTo(1,1).easing(cc.easeBackOut()))},t.prototype.onBroadcast=function(e){},t.prototype.onPlayer2Move=function(e){-1==e?this.player2.getComponent(n.default).dropDown():(this.playerPos2=e,this.progress2.node.width=231*this.playerPos2/this.climbNodes2.length,this.player2.getComponent(n.default).climbSuccess(this.climbNodes2[e-1].position))},t.prototype.onReceiveMapData=function(e,t){this.player==this.playerRight?(this.climbNodes2=this.generatePointsByPos(e),this.fakeNodes2=this.generateFakePointsByPos(t),this.climbNodes=this.generatePointsRight(this.climbNodes2),this.fakeNodes=this.generateFakePointsRight(this.fakeNodes2)):(this.climbNodes=this.generatePointsByPos(e),this.fakeNodes=this.generateFakePointsByPos(t),this.climbNodes2=this.generatePointsRight(this.climbNodes),this.fakeNodes2=this.generateFakePointsRight(this.fakeNodes))},t.prototype.gameStart=function(){var e=this;cc.loader.loadRes("sound/bg",cc.AudioClip,function(e,t){cc.audioEngine.play(t,!0,1)}),this.playerLeft.getComponent(n.default).gameReady(),this.playerRight.getComponent(n.default).gameReady(),this.node.on(cc.Node.EventType.TOUCH_START,this.onTouchStart,this);var t=this.gameCountDown,o=this.background.node.getChildByName("yindao");o.zIndex=2,this.schedule(function(){if(!e.isOver&&(e.gameTimer.string=--t+"",e.playerPos<3&&null==e.yindaoAction.getTarget())){var n=e.climbNodes[e.playerPos];o.setPosition(n.position.x+n.width+50,n.position.y),o.active=!0,o.runAction(e.yindaoAction)}},1,this.gameCountDown-1)},t.prototype.onTouchStart=function(){var e=this.climbNodes[this.playerPos],t=this.fakeNodes[this.playerPos];if(!(this.playerPos>=this.climbNodes.length||this.isOver||this.player.getComponent("Player").touching)){this.player.getComponent("Player").touching=!0;var o=this.player.getComponent(n.default),i=e.position.sub(o.anotherHandPos()).mag();if(console.log(e.position,i),i<=65*e.scale&&this.playerPos+1>=this.climbNodes.length){this.playerPos+=1,this.progress1.node.width=231*this.playerPos/this.climbNodes.length,this.player.stopAllActions();var a=this.player.getChildByName("pc_01_ske").getComponent(dragonBones.ArmatureDisplay);a.node.position=cc.v2(0,0),this.player.anchorX<.5?a.playAnimation("Animation_grip_left",1):a.playAnimation("Animation_grip_right",1);var s=this;return a.removeEventListener(dragonBones.EventObject.COMPLETE),void a.addEventListener(dragonBones.EventObject.COMPLETE,function(){a.removeEventListener(dragonBones.EventObject.COMPLETE);var t=.1==this.anchorX?.9:.1,o=(.1==t?1:-1)*this.width*.8;a.node.setPosition(a.node.position.x+o,a.node.position.y),this.anchorX=t,this.setPosition(e),s.onWin()},this.player)}if(this.onClimb(e,t)){this.playerPos+=1,this.progress1.node.width=231*this.playerPos/this.climbNodes.length;var c=this.yindaoAction.getTarget();c&&(this.yindaoAction.setTarget(null),c.stopAllActions(),c.active=!1),this.socket.move(this.playerPos)}else this.socket.move(-1)}},t.prototype.onWin=function(){var e=this;this.player.stopAllActions();var t=(this.player.rotation%360+360)%360,o=.1==this.player.anchorX,n=cc.rotateBy(.5,o?-t:360-t).easing(cc.easeIn(1)),i=this,a=cc.callFunc(function(e){var t=e.getChildByName("pc_01_ske").getComponent(dragonBones.ArmatureDisplay);t.node.position=cc.v2(0,0),e.anchorX<.5?t.playAnimation("Animation_win_01_left",1):t.playAnimation("Animation_win_01_right",1),t.removeEventListener(dragonBones.EventObject.COMPLETE),t.addEventListener(dragonBones.EventObject.COMPLETE,function(){t.removeEventListener(dragonBones.EventObject.COMPLETE),i.player.runAction(cc.sequence(cc.delayTime(.1),cc.callFunc(function(e){i.player.anchorX<.5?t.playAnimation("Animation_win_02_left",1):t.playAnimation("Animation_win_02_right",1),t.removeEventListener(dragonBones.EventObject.COMPLETE),t.addEventListener(dragonBones.EventObject.COMPLETE,function(){t.removeEventListener(dragonBones.EventObject.COMPLETE)})})))},i.player)}),s=new cc.Vec2(2048,-800-.5*this.player.height),c=cc.moveTo(.5,s);this.player.runAction(cc.sequence(n,cc.spawn(a,c,cc.callFunc(function(t){e.background.node.runAction(cc.moveTo(.5,-2048,e.node.height/2)),t.getComponent("Player").touching=!1}))));var r=this.yindaoAction.getTarget();r&&(this.yindaoAction.setTarget(null),r.stopAllActions(),r.active=!1),this.socket.move(this.playerPos)},t.prototype.onClimb=function(e,t){var o=this.player.getComponent(n.default),a=e.position.sub(o.anotherHandPos()).mag(),s=t.position.sub(o.anotherHandPos()).mag();if(console.log(e.position,a),a<=65*e.scale){var c=e.position.sub(this.player.position);o.climbSuccess(e.position),this.tapAudio&&cc.audioEngine.play(this.tapAudio,!1,1);var r=this.background.node.position.x-c.x,d=this.background.node.position.y-c.y;return d<this.node.height/2&&(d=this.node.height/2),this.background.node.runAction(cc.moveTo(.5,r,d)),!0}return s<=65*t.scale?(t.getComponent(i.default).dropDown(),o.dropDown(),this.dropAudio&&cc.audioEngine.play(this.dropAudio,!1,1)):(o.dropDown(),this.dropAudio&&cc.audioEngine.play(this.dropAudio,!1,1)),!1},t.prototype.generatePoints=function(){var e=[];this.stackCount=0;for(var t=0;;t++){var o,n=cc.instantiate(this.pointPrefab);if(n.scale=1+.5*Math.random(),!(o=0==t?this.calculateNewPos(this.playerLeft.position):this.calculateNewPos(e[t-1].position)))break;this.background.node.addChild(n),n.setPosition(o),e.push(n)}return console.log("Total Size",e.length,this.stackCount),e},t.prototype.generatePointsByPos=function(e){for(var t=[],o=0;o<e.length;o++){var n=cc.instantiate(this.pointPrefab),i=e[o];n.scale=i.scale,this.background.node.addChild(n),n.setPosition(i.x,i.y),t.push(n)}return t},t.prototype.generateFakePointsByPos=function(e){for(var t=[],o=0;o<e.length;o++){var n=cc.instantiate(this.pointPrefab2),i=e[o];n.scale=i.scale,this.background.node.addChild(n),n.setPosition(i.x,i.y),t.push(n)}return t},t.prototype.generateFakePoints=function(e){var t=[];this.stackCount=0;for(var o=0;o<e.length;o++){var n,i=new cc.Node("empty"),a=cc.instantiate(this.pointPrefab2);a.scale=1+.5*Math.random(),(n=0==o?this.calculateNewPos(this.playerLeft.position):this.calculateNewPos(e[o-1].position))?e[o].position.sub(n).mag()<=90?t.push(i):t.length>0&&n.sub(t[t.length-1].position).mag()<=90?t.push(i):o>0&&n.sub(e[o-1].position).mag()<=90?t.push(i):o<e.length-1&&n.sub(e[o+1].position).mag()<=90?t.push(i):(this.background.node.addChild(a),a.setPosition(n),t.push(a)):t.push(i)}return t},t.prototype.generatePointsRight=function(e){for(var t=[],o=0;o<e.length;o++){var n=cc.instantiate(this.pointPrefab);n.scale=e[o].scale,this.background.node.addChild(n);var i=e[o].position;n.setPosition(this.playerXSum-i.x,i.y),t.push(n)}return t},t.prototype.generateFakePointsRight=function(e){var t=this,o=[];return e.forEach(function(e){if("empty"!=e.name){var n=cc.instantiate(t.pointPrefab2);n.scale=e.scale,t.background.node.addChild(n),n.setPosition(t.playerXSum-e.position.x,e.position.y),o.push(n)}else o.push(e)}),o},t.prototype.calculateNewPos=function(e){if(this.stackCount++,this.stackCount>1e3)return null;var t=10*(14*Math.random()+2),o=this.background.node.width/2,n=new cc.Vec2;if(n.x=e.x+.8*this.player.width*Math.cos(t*Math.PI/180),n.y=e.y+.8*this.player.width*Math.sin(t*Math.PI/180),n.y>=-1200)return null;if(n.x>=o-.2*this.player.width)return console.log(n),this.calculateNewPos(e);if(n.x<1.2*this.player.width)return console.log(n),this.calculateNewPos(e);var i=Math.round(n.x/2/16),a=-Math.round(n.y/2/16),s=4*(128*(a-1)+i),c=4*(128*(a-1)+Math.round(this.playerXSum/2/16)-i);return 255!=this.wbTexture[s]||255!=this.wbTexture[s+1]||255!=this.wbTexture[s+2]||255!=this.wbTexture[s+3]?(console.log(i,a),this.calculateNewPos(e)):255!=this.wbTexture[c]||255!=this.wbTexture[c+1]||255!=this.wbTexture[c+2]||255!=this.wbTexture[c+3]?(console.log(i,a),this.calculateNewPos(e)):n},t.prototype.CrossPoint=function(e,t,o,n){var i,a,s,c,r=cc.v2(0,0);return a=n.x*t.y-n.x*e.y-o.x*t.y+o.x*e.y-t.x*n.y+t.x*o.y+e.x*n.y-e.x*o.y,i=o.y*n.x*t.x-n.y*o.x*t.x-o.y*n.x*e.x+n.y*o.x*e.x-e.y*t.x*n.x+t.y*e.x*n.x+e.y*t.x*o.x-t.y*e.x*o.x,0!=a&&(r.x=i/a),c=n.y*t.x-n.y*e.x-o.y*t.x+e.x*o.y-t.y*n.x+t.y*o.x+e.y*n.x-e.y*o.x,s=-o.y*n.x*t.y+n.y*o.x*t.y+o.y*n.x*e.y-n.y*o.x*e.y+e.y*t.x*n.y-e.y*t.x*o.y-t.y*e.x*n.y+t.y*e.x*o.y,0!=c&&(r.y=s/c),r},t.prototype.lineLine=function(e,t,o,n){var i=(n.x-o.x)*(e.y-o.y)-(n.y-o.y)*(e.x-o.x),a=(t.x-e.x)*(e.y-o.y)-(t.y-e.y)*(e.x-o.x),s=(n.y-o.y)*(t.x-e.x)-(n.x-o.x)*(t.y-e.y);if(0!==s){var c=i/s,r=a/s;if(0<=c&&c<=1&&0<=r&&r<=1)return!0}return!1},t.prototype.showIcon=function(e,t){var o=this.node.getChildByName("icon"),n=(1-o.anchorX)*o.width,i=Math.sqrt((e.x-t.x)*(e.x-t.x)+(e.y-t.y)*(e.y-t.y)),a=e.x-(e.x-t.x)*n/i,s=e.y-(e.y-t.y)*n/i;o.position=cc.v2(a,s);var c=e.y>t.y?1:-1;o.rotation=180*Math.atan((e.x-t.x)/(e.y-t.y))/Math.PI-90*c,o.getChildByName("mask").getChildByName("icon").rotation=-o.rotation},t.prototype.update=function(){if(this._showIcon){var e=this.playerRight.convertToWorldSpaceAR(cc.v2(0,0)),t=this.playerLeft.convertToWorldSpaceAR(cc.v2(0,0)),o=this.node.convertToNodeSpaceAR(e),n=this.node.convertToNodeSpaceAR(t),i=cc.v2(-cc.winSize.width/2,-cc.winSize.height/2),a=cc.v2(-cc.winSize.width/2,cc.winSize.height/2),s=cc.v2(cc.winSize.width/2,cc.winSize.height/2),c=cc.v2(cc.winSize.width/2,-cc.winSize.height/2);if(n.x<-cc.winSize.width/2||n.x>cc.winSize.width/2||n.y<-cc.winSize.height/2||n.y>cc.winSize.height/2){var r=cc.v2(0,0);this.lineLine(o,n,i,a)&&(r=this.CrossPoint(o,n,i,a)),this.lineLine(o,n,a,s)&&(r=this.CrossPoint(o,n,a,s)),this.lineLine(o,n,s,c)&&(r=this.CrossPoint(o,n,s,c)),this.lineLine(o,n,c,i)&&(r=this.CrossPoint(o,n,c,i)),this.node.getChildByName("icon").active=!0,this.showIcon(r,o)}else this.node.getChildByName("icon").active=!1}},__decorate([d(cc.Sprite)],t.prototype,"user1",void 0),__decorate([d(cc.Sprite)],t.prototype,"user2",void 0),__decorate([d(cc.Sprite)],t.prototype,"headFrame",void 0),__decorate([d(cc.Sprite)],t.prototype,"headFrame2",void 0),__decorate([d(cc.Sprite)],t.prototype,"progress1",void 0),__decorate([d(cc.Sprite)],t.prototype,"progress2",void 0),__decorate([d(cc.Label)],t.prototype,"gameTimer",void 0),__decorate([d(cc.Node)],t.prototype,"playerLeft",void 0),__decorate([d(cc.Node)],t.prototype,"playerRight",void 0),__decorate([d(cc.Sprite)],t.prototype,"background",void 0),__decorate([d(cc.Prefab)],t.prototype,"pointPrefab",void 0),__decorate([d(cc.Prefab)],t.prototype,"pointPrefab2",void 0),t=__decorate([r],t)}(a.default));o.default=p,cc._RF.pop()},{"./ClimbPoint":"ClimbPoint","./GameSocket":"GameSocket","./MessageComponent":"MessageComponent","./Player":"Player"}],MessageComponent:[function(e,t,o){"use strict";cc._RF.push(t,"677bdc+rJBO4KhTHrz0qwgc","MessageComponent"),Object.defineProperty(o,"__esModule",{value:!0});var n=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.myUserId=0,t}return __extends(t,e),t.prototype.onLoad=function(){var e=this;window.addEventListener("message",function(t){switch(console.log("receive message",t.data),t.data.cmd){case"Broadcast":e.onBroadcast(t.data.data);break;case"UpdateData":e.onUpdateUserScore(t.data.data.userId==e.myUserId,t.data.data.userScore);break;case"GameResult":e.onGameOver(t.data.data);break;case"GameBegin":e.myUserId=t.data.data[0].userId,e.onGameBegin(t.data.data,t.data.server)}}),window.parent.postMessage({cmd:"GameLoadReady"},"*"),window.parent.postMessage({cmd:"GamePlayReady"},"*")},t.prototype.onBroadcast=function(e){},t.prototype.onGameBegin=function(e,t){},t.prototype.onGameOver=function(e){},t.prototype.onUpdateUserScore=function(e,t){},t.prototype.sendBroadcast=function(e){window.parent.postMessage({cmd:"BroadCastData",uid:this.myUserId,data:e},"*")},t.prototype.sendGameData=function(e,t){t?window.parent.postMessage({cmd:"SendGameData",data:e,uid:t},"*"):window.parent.postMessage({cmd:"SendGameData",data:e},"*")},t.prototype.sendGameOver=function(){window.parent.postMessage({cmd:"GameOver"},"*")},t}(cc.Component);o.default=n,cc._RF.pop()},{}],Player:[function(e,t,o){"use strict";cc._RF.push(t,"88c96DJAp9A/4aBCzfprYGS","Player"),Object.defineProperty(o,"__esModule",{value:!0});var n=cc._decorator,i=n.ccclass,a=(n.property,function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.dropAction=null,t.rotateLeftAction=null,t.rotateRightAction=null,t.touching=!1,t}return __extends(t,e),t.prototype.onLoad=function(){var e=this.node.getChildByName("pc_01_ske").getComponent(dragonBones.ArmatureDisplay);e.playAnimation("Animation_again_left",1),e.addEventListener(dragonBones.EventObject.LOOP_COMPLETE,function(){e.node.position=cc.v2(0,0)},e)},t.prototype.gameReady=function(){this.rotateLeftAction=cc.rotateBy(2,-360).repeatForever(),this.rotateRightAction=cc.rotateBy(2,360).repeatForever(),this.node.runAction(this.rotateLeftAction)},t.prototype.dropDown=function(){if(!this.dropAction||!this.dropAction.getTarget()){this.node.stopAllActions();var e=this.node.y,t=this;this.node.parent.parent.getComponent("GameView")._showIcon=!1,this.dropAction=cc.sequence(cc.spawn(cc.moveBy(.8,0,e-960-t.node.height).easing(cc.easeOut(1)),cc.rotateBy(.8,360).easing(cc.easeOut(1))),cc.callFunc(function(e){e.anchorX<.5?e.rotation=40:e.rotation=-40}),cc.spawn(cc.moveTo(.8,t.node.x,e).easing(cc.easeBackOut()),cc.callFunc(function(e){var o=e.getChildByName("pc_01_ske").getComponent(dragonBones.ArmatureDisplay);o.node.position=cc.v2(0,0),e.anchorX<.5?o.playAnimation("Animation_again_left",1):o.playAnimation("Animation_again_right",1),o.removeEventListener(dragonBones.EventObject.COMPLETE),o.addEventListener(dragonBones.EventObject.COMPLETE,function(){o.removeEventListener(dragonBones.EventObject.COMPLETE),o.node.position=cc.v2(0,0),t.node.runAction(.1==t.node.anchorX?t.rotateLeftAction:t.rotateRightAction),t.touching=!1,t.node.parent.parent.getComponent("GameView")._showIcon=!0},o)}))),this.node.runAction(this.dropAction)}},t.prototype.climbSuccess=function(e){this.node.stopAllActions();var t=this.node.getChildByName("pc_01_ske").getComponent(dragonBones.ArmatureDisplay);t.node.position=cc.v2(0,0),this.node.anchorX<.5?t.playAnimation("Animation_grip_left",1):t.playAnimation("Animation_grip_right",1);var o=(.1==(.1==this.node.anchorX?.9:.1)?1:-1)*this.node.width*.8,n=cc.v2(t.node.position.x-o,t.node.position.y),i=t.node.convertToWorldSpaceAR(n),a=this.node.parent.convertToNodeSpaceAR(i);this.node.runAction(cc.moveBy(.1,cc.v2(e.x-a.x,e.y-a.y)));var s=this;t.removeEventListener(dragonBones.EventObject.COMPLETE),t.addEventListener(dragonBones.EventObject.COMPLETE,function(){t.removeEventListener(dragonBones.EventObject.COMPLETE);var o=.1==this.anchorX?.9:.1,n=(.1==o?1:-1)*this.width*.8;t.node.setPosition(t.node.position.x+n,t.node.position.y),this.stopAllActions(),this.anchorX=o,this.setPosition(e),this.runAction(.1==o?s.rotateLeftAction:s.rotateRightAction),this.getComponent("Player").touching=!1,this.runAction(cc.sequence(cc.delayTime(.1),cc.callFunc(function(e){var n=t.node.position;t.node.position=cc.v2(0,0),o<.5?t.playAnimation("Animation_go_left",0):t.playAnimation("Animation_go_right",0),t.removeEventListener(dragonBones.EventObject.COMPLETE),t.addEventListener(dragonBones.EventObject.COMPLETE,function(){t.removeEventListener(dragonBones.EventObject.COMPLETE),t.node.setPosition(n)})})))},this.node)},t.prototype.changeAnchor=function(){var e=this,t=.1==this.node.anchorX?.9:.1;this.node.children.forEach(function(o){var n=(.1==t?1:-1)*e.node.width*.8;o.setPosition(o.position.x+n,o.position.y)}),this.node.anchorX=t},t.prototype.anotherHandPos=function(){var e=.1==this.node.anchorX?.9:.1,t=(360-this.node.rotation)*Math.PI/180,o=(e-this.node.anchorX)*this.node.width*Math.cos(t),n=(e-this.node.anchorX)*this.node.width*Math.sin(t);return new cc.Vec2(this.node.position.x+o,this.node.position.y+n)},t.prototype.start=function(){},t.prototype.onDestroy=function(){},t=__decorate([i],t)}(cc.Component));o.default=a,cc._RF.pop()},{}]},{},["ClimbPoint","GameSocket","GameView","MessageComponent","Player"]);