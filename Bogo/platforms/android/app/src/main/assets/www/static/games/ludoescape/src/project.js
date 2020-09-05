window.__require=function e(t,i,a){function o(c,n){if(!i[c]){if(!t[c]){var d=c.split("/");if(d=d[d.length-1],!t[d]){var s="function"==typeof __require&&__require;if(!n&&s)return s(d,!0);if(r)return r(d,!0);throw new Error("Cannot find module '"+c+"'")}}var l=i[c]={exports:{}};t[c][0].call(l.exports,function(e){return o(t[c][1][e]||e)},l,l.exports,e,t,i,a)}return i[c].exports}for(var r="function"==typeof __require&&__require,c=0;c<a.length;c++)o(a[c]);return o}({Main:[function(e,t,i){"use strict";cc._RF.push(t,"c3799BDsnJC14a/cl21Mhdu","Main"),cc.Class({extends:cc.Component,properties:{m_playerNode:cc.Node,m_lyGrid:cc.Node,m_diceAudio:{default:null,url:cc.AudioClip},m_moveClickAudio:{default:null,url:cc.AudioClip},m_returnHomeAudio:{default:null,url:cc.AudioClip},m_myId:-1,m_otherId:-1},onLoad:function(){this.node.getChildByName("my").active=!1,this.node.getChildByName("other").active=!1,window.parent.postMessage({cmd:"GameLoadReady"},"*");var e=this;window.addEventListener("message",function(t){switch(console.log("receive message listener",t.data),t.data.cmd){case"Broadcast":var i=JSON.parse(t.data.data.data);if(i.userId!=e.m_myId)if("rollDice"==i.type)e.onCastDice_other(i.dice);else if("movePlayer"==i.type){var a=e._players[1];a[i.movePlayerId].getChildByName("circle").getComponents(cc.Animation)[0].play(),e.movePlayerNode(a[i.movePlayerId])}break;case"UpdateData":console.log("=========recive: UpdateData");break;case"GameResult":console.log("=========recive: GameResult");break;case"GameBegin":e.onGameBegin(t.data)}}),this._schedulerDelayTime=5},onGameBegin:function(e){var t=this.node.getChildByName("my");t.getChildByName("label").getComponents(cc.Label)[0].string=e.data[0].userName,cc.loader.load(e.data[0].userHead,function(e,i){t.getChildByName("mask").getChildByName("icon").getComponents(cc.Sprite)[0].spriteFrame=new cc.SpriteFrame(i)}),e.data[0].userHeadFrame&&cc.loader.load(e.data[0].userHeadFrame,function(e,i){t.getChildByName("frame").getComponents(cc.Sprite)[0].spriteFrame=new cc.SpriteFrame(i)}),this.m_myId=e.data[0].userId,t.active=!0,this._isRobot=!1;var i=this.node.getChildByName("other");i.getChildByName("label").getComponents(cc.Label)[0].string=e.data[1].userName,cc.loader.load(e.data[1].userHead,function(e,t){i.getChildByName("mask").getChildByName("icon").getComponents(cc.Sprite)[0].spriteFrame=new cc.SpriteFrame(t)}),e.data[1].userHeadFrame&&cc.loader.load(e.data[1].userHeadFrame,function(e,t){i.getChildByName("frame").getComponents(cc.Sprite)[0].spriteFrame=new cc.SpriteFrame(t)}),this.m_otherId=e.data[1].userId,i.active=!0,1==e.data[1].isRobot&&(this._isRobot=!0,this._isRobotId=e.data[1].userId),this.initUI()},initUI:function(){this._startSpace=cc.v2(96,92),this._redBeginPos=9,this._greenBeginPos=35,this.node.getChildByName("LudoTexture").getChildByName("Frame_1").runAction(cc.repeatForever(cc.sequence(cc.scaleTo(.15,1.03),cc.scaleTo(.15,.97)))),this.node.getChildByName("LudoTexture").getChildByName("Frame_3").runAction(cc.repeatForever(cc.sequence(cc.scaleTo(.15,1.03),cc.scaleTo(.15,.97)))),this.m_playerNode.getChildByName("circle_ring").active=!1;for(var e=0;e<52;e++)this.m_lyGrid.getChildByName("grid_"+(e+1).toString())._id=e+1;for(e=0;e<5;e++)this.m_lyGrid.getChildByName("grid_r"+(e+1).toString())._id=e+1,this.m_lyGrid.getChildByName("grid_b"+(e+1).toString())._id=e+1,this.m_lyGrid.getChildByName("grid_g"+(e+1).toString())._id=e+1,this.m_lyGrid.getChildByName("grid_y"+(e+1).toString())._id=e+1;if(this.m_myId>this.m_otherId)this._redStartPos=cc.v2(-379.5,-361.5),this._greenStartPos=cc.v2(291,334),this.node.getChildByName("DiceRoll_3").getComponents(cc.Button)[0].interactable=!1,this.init(!0);else{this.node.getChildByName("LudoTexture").rotation=180,this.node.getChildByName("LudoTexture").position=cc.v2(1,-34.5),this.node.getChildByName("qipan").getComponents(cc.Sprite)[0].spriteFrame=this.node.getChildByName("c3").getComponents(cc.Sprite)[0].spriteFrame,this._redStartPos=cc.v2(291,334),this._greenStartPos=cc.v2(-379.5,-361.5);var t=this.node.getChildByName("DiceRoll_1").position;this.node.getChildByName("DiceRoll_1").position=this.node.getChildByName("DiceRoll_3").position,this.node.getChildByName("DiceRoll_3").position=t,this.node.getChildByName("DiceRoll_1").getComponents(cc.Button)[0].interactable=!1;var i=this.node.getChildByName("LudoTexture").getChildByName("Frame_1").position,a=this.node.getChildByName("LudoTexture").getChildByName("Frame_3").position;this.node.getChildByName("LudoTexture").getChildByName("Frame_1").position=cc.v2(i.x+6,i.y+26),this.node.getChildByName("LudoTexture").getChildByName("Frame_3").position=cc.v2(a.x+6,a.y+26),this.init(!1)}},init:function(e){this._canRoll=!1,this._canMove=!1,this.node.getChildByName("DiceRoll_3").active=!1,this.m_myId>this.m_otherId?e?(this.node.getChildByName("LudoTexture").getChildByName("Frame_3").active=!1,this._canRoll=!0):this.node.getChildByName("LudoTexture").getChildByName("Frame_1").active=!1:e?(this.node.getChildByName("LudoTexture").getChildByName("Frame_1").active=!1,this._canRoll=!0):this.node.getChildByName("LudoTexture").getChildByName("Frame_3").active=!1;for(var t=[],i=[],a=0;a<2;a++)for(var o=0;o<2;o++){var r=cc.instantiate(this.m_playerNode);r.x=this._redStartPos.x+a*this._startSpace.x,r.y=this._redStartPos.y-o*this._startSpace.y,r.getChildByName("circle_ring").active=!1,r._step=0,r._parentId=1,r._selfId=2*a+o,r._colorName="r";var c=cc.instantiate(this.node.getChildByName("rslm_idle"));c.parent=r,c.name="circle",c.position=cc.v2(0,0),r.parent=this.node,t[2*a+o]=r,r.on(cc.Node.EventType.TOUCH_START,this.onMovePlayerNode,this);var n=cc.instantiate(this.m_playerNode);n.x=this._greenStartPos.x+a*this._startSpace.x,n.y=this._greenStartPos.y-o*this._startSpace.y,n.getChildByName("circle_ring").active=!1,n._step=0,n._parentId=3,n._selfId=2*a+o,n._colorName="y";var d=cc.instantiate(this.node.getChildByName("yslm_idle"));d.parent=n,d.name="circle",d.position=cc.v2(0,0),n.parent=this.node,i[2*a+o]=n,n.on(cc.Node.EventType.TOUCH_START,this.onMovePlayerNode,this)}this.m_myId>this.m_otherId?this._players=[t,i]:this._players=[i,t],this._isRobotId!=this.m_myId&&e&&cc.director.getScheduler().schedule(this.hosting_roll,this,this._schedulerDelayTime,!1,0,!1)},onCastDice:function(e){this.onCastDice_me(e.target)},onCastDice_me:function(e){if(cc.director.getScheduler().unschedule(this.hosting_roll,this),this._canRoll){cc.audioEngine.playEffect(this.m_diceAudio,!1),this._canRoll=!1;var t=Math.floor(6*Math.random())+1;null==e._times?e._times=0:e._times<3?e._times++:t=6,6==t&&(e._times=null),this.DiceRoll(t,!0),window.parent.postMessage({cmd:"BroadCastData",uid:this.m_myId,data:{type:"rollDice",dice:t,userId:this.m_myId}},"*")}},onCastDice_other:function(e){cc.audioEngine.playEffect(this.m_diceAudio,!1),this.DiceRoll(e,!1)},DiceRoll:function(e,t){for(var i=[1,2,3,4,5,6],a=0;a<6;a++){var o=Math.floor(6*Math.random());if(a!=o){var r=i[o];i[o]=i[a],i[a]=r}}for(a=0;a<4;a++)if(i[a]==e){i[a]=i[4],i[4]=e;break}i[4]!=e&&(i[5]=i[4],i[4]=e),console.log("isMe:"+t+" points:"+e+" dice:",i);var c=cc.sequence(cc.delayTime(.1),cc.callFunc(this.changeDiceImg,this,i),cc.delayTime(.1),cc.callFunc(this.changeDiceImg,this,i),cc.delayTime(.1),cc.callFunc(this.changeDiceImg,this,i),cc.delayTime(.1),cc.callFunc(this.changeDiceImg,this,i),cc.delayTime(.1),cc.callFunc(this.changeDiceImg,this,i),cc.delayTime(.1),cc.callFunc(this.changeDiceEnd,this,[e,t])),n="";this.m_myId>this.m_otherId?(n="DiceRoll_1",t||(n="DiceRoll_3")):(n="DiceRoll_3",t||(n="DiceRoll_1")),this.node.getChildByName(n).runAction(c),this.node.getChildByName(n).getComponents(cc.Button)[0].interactable=!1},changeDiceImg:function(e,t){var i="Dice"+t.shift().toString();e.getComponents(cc.Sprite)[0].spriteFrame=this.node.getChildByName(i).getComponents(cc.Sprite)[0].spriteFrame},changeDiceEnd:function(e,t){var i=t[0],a=t[1];e._curPoints=i;var o=this._players[0];if(this._canMove=!0,a||(o=this._players[1],this._canMove=!1),6==i){for(var r=!1,c=[],n=0;n<4;n++)o[n]._step+i<=57&&(o[n].getChildByName("circle_ring").active=!0,o[n].getChildByName("circle_ring").runAction(cc.repeatForever(cc.rotateBy(.8,-90))),r=!0,c.push(o[n]));if(r){var d=Math.floor(Math.random()*c.length);this._isRobot&&!a&&window.parent.postMessage({cmd:"BroadCastData",uid:this.m_myId,data:{type:"movePlayer",movePlayerId:c[d]._selfId,userId:this.m_otherId}},"*"),this._isRobotId!=this.m_myId&&a&&(this._hosting_move_playerNode=c[d],cc.director.getScheduler().schedule(this.hosting_move,this,this._schedulerDelayTime,!1,0,!1))}else this.changePlayerFrame(a,!1)}else{for(r=!1,c=[],n=0;n<4;n++)o[n]._step>0&&o[n]._step+i<=57&&(o[n].getChildByName("circle_ring").active=!0,o[n].getChildByName("circle_ring").runAction(cc.repeatForever(cc.rotateBy(.8,-90))),r=!0,c.push(o[n]));if(r){d=Math.floor(Math.random()*c.length);this._isRobot&&!a&&window.parent.postMessage({cmd:"BroadCastData",uid:this.m_myId,data:{type:"movePlayer",movePlayerId:c[d]._selfId,userId:this.m_otherId}},"*"),this._isRobotId!=this.m_myId&&a&&(this._hosting_move_playerNode=c[d],cc.director.getScheduler().schedule(this.hosting_move,this,this._schedulerDelayTime,!1,0,!1))}else e.getComponents(cc.Sprite)[0].spriteFrame=this.node.getChildByName("DiceRoll").getComponents(cc.Sprite)[0].spriteFrame,this.changePlayerFrame(a,!1)}this.checkNodeZOrder(o)},changePlayerFrame:function(e,t){var i=!e;t&&(i=e),this.m_myId>this.m_otherId?i?(this._canRoll=!0,this.node.getChildByName("LudoTexture").getChildByName("Frame_1").active=!0,this.node.getChildByName("DiceRoll_1").active=!0,this.m_myId>this.m_otherId&&(this.node.getChildByName("DiceRoll_1").getComponents(cc.Button)[0].interactable=!0),this.node.getChildByName("LudoTexture").getChildByName("Frame_3").active=!1,this.node.getChildByName("DiceRoll_3").active=!1):(this.node.getChildByName("LudoTexture").getChildByName("Frame_1").active=!1,this.node.getChildByName("DiceRoll_1").active=!1,this.node.getChildByName("LudoTexture").getChildByName("Frame_3").active=!0,this.node.getChildByName("DiceRoll_3").active=!0,this.m_myId<this.m_otherId&&(this.node.getChildByName("DiceRoll_3").getComponents(cc.Button)[0].interactable=!0)):i?(this._canRoll=!0,this.node.getChildByName("LudoTexture").getChildByName("Frame_1").active=!1,this.node.getChildByName("DiceRoll_1").active=!1,this.node.getChildByName("LudoTexture").getChildByName("Frame_3").active=!0,this.node.getChildByName("DiceRoll_3").active=!0,this.m_myId<this.m_otherId&&(this.node.getChildByName("DiceRoll_3").getComponents(cc.Button)[0].interactable=!0)):(this.node.getChildByName("LudoTexture").getChildByName("Frame_1").active=!0,this.node.getChildByName("DiceRoll_1").active=!0,this.m_myId>this.m_otherId&&(this.node.getChildByName("DiceRoll_1").getComponents(cc.Button)[0].interactable=!0),this.node.getChildByName("LudoTexture").getChildByName("Frame_3").active=!1,this.node.getChildByName("DiceRoll_3").active=!1),this._isRobot&&(e||!e&&t)&&window.parent.postMessage({cmd:"BroadCastData",uid:this.m_otherId,data:{type:"rollDice",dice:Math.floor(6*Math.random())+1,userId:this.m_otherId}},"*"),this._isRobotId!=this.m_myId&&(e||!e&&t)&&cc.director.getScheduler().schedule(this.hosting_roll,this,this._schedulerDelayTime,!1,0,!1)},onMovePlayerNode:function(e){this.onMovePlayerNode_me(e.target)},onMovePlayerNode_me:function(e){cc.director.getScheduler().unschedule(this.hosting_move,this),this._canMove&&e.getChildByName("circle_ring").active&&(window.parent.postMessage({cmd:"BroadCastData",uid:this.m_myId,data:{type:"movePlayer",movePlayerId:e._selfId,userId:this.m_myId}},"*"),e._touchListener.setSwallowTouches(!0),e.getChildByName("circle").getComponents(cc.Animation)[0].play(),this.movePlayerNode(e))},movePlayerNode:function(e){if(e.getChildByName("circle_ring").active){cc.audioEngine.playEffect(this.m_moveClickAudio,!1),this._canMove=!1;var t=this._players[0];this.m_myId>this.m_otherId?3==e._parentId&&(t=this._players[1]):1==e._parentId&&(t=this._players[1]);for(var i=0;i<4;i++){t[i].getChildByName("circle_ring").active=!1}var a=!0,o=null;this.m_myId>this.m_otherId?(o=this.node.getChildByName("DiceRoll_1"),3==e._parentId&&(a=!1,o=this.node.getChildByName("DiceRoll_3"))):(o=this.node.getChildByName("DiceRoll_3"),1==e._parentId&&(a=!1,o=this.node.getChildByName("DiceRoll_1")));var r=o._curPoints;if(0==e._step){e._step=1,e.position=cc.v2(0,0),this.m_myId<this.m_otherId&&(e.rotation=180),1==e._parentId?e.parent=this.m_lyGrid.getChildByName("grid_"+this._redBeginPos):3==e._parentId&&(e.parent=this.m_lyGrid.getChildByName("grid_"+this._greenBeginPos)),this.changePlayerFrame(a,!0),e.getChildByName("circle").getComponents(cc.Animation)[0].stop();var c=this.node.getChildByName("rslm_idle");"y"==e._colorName&&(c=this.node.getChildByName("yslm_idle")),e.getChildByName("circle").getComponents(cc.Sprite)[0].spriteFrame=c.getComponents(cc.Sprite)[0].spriteFrame,o.getComponents(cc.Sprite)[0].spriteFrame=this.node.getChildByName("DiceRoll").getComponents(cc.Sprite)[0].spriteFrame,this.showMultiNode(e.parent)}else this.movePlayer(e,r)}},movePlayer:function(e,t){e._step++,t--;var i=!0,a=null,o="";this.m_myId>this.m_otherId?(a=this.node.getChildByName("DiceRoll_1"),3==e._parentId&&(i=!1,a=this.node.getChildByName("DiceRoll_3")),o="r",i||(o="g")):(a=this.node.getChildByName("DiceRoll_3"),1==e._parentId&&(i=!1,a=this.node.getChildByName("DiceRoll_1")),o="g",i||(o="r"));var r=null,c=(r=e._step>=57?this.m_lyGrid.getChildByName("grid_"+o+"d"):e._step>=52&&e._step<57?52==e._step?this.m_lyGrid.getChildByName("grid_"+o+"1"):this.m_lyGrid.getChildByName("grid_"+o+(e.parent._id+1).toString()):e.parent._id>=52?this.m_lyGrid.getChildByName("grid_1"):this.m_lyGrid.getChildByName("grid_"+(e.parent._id+1).toString())).convertToWorldSpace(cc.v2(0,0)),n=e.parent.convertToNodeSpace(c);e.scale=1;var d=this;e.runAction(cc.sequence(cc.moveTo(.2,n),cc.callFunc(function(o,c){e.position=cc.v2(0,0);var n=e.parent;if(e.parent=r,d.showMultiNode(n),t>0)d.movePlayer(e,t);else if(console.log("player_"+e._parentId+"_"+e._selfId+":"+e._step),o._step>=57)d.showScore(o,i),d.movePlayerEnd(a,i,e);else{var s=r.childrenCount;if(s>1){if(r.getChildByName("star"))return s--,void d.movePlayerEnd(a,i,e);2==s?d.gotoHomePos(r,e,a,i):d.movePlayerEnd(a,i,e)}else d.movePlayerEnd(a,i,e)}})))},showMultiNode:function(e){for(var t=[],i=e.childrenCount,a=0;a<i;a++)"star"!=e.children[a].name&&t.push(e.children[a]);if(!(t.length<=0))if(1==t.length)t[0].scale=1,t[0].position=cc.v2(0,0);else if(2==t.length)for(a=0;a<t.length;a++)t[a].scale=.5,t[a].x=-e.width/4+a*e.width/2;else if(t.length<=4)for(a=0;a<t.length;a++)t[a].scale=1/3,t[a].x=-e.width/4+a%2*e.width/2,t[a].y=e.height/4-Math.floor(a/2)*e.height/2;else if(t.length<=6)for(a=0;a<t.length;a++)t[a].scale=.25,t[a].x=-e.width/4+a%3*e.width/4,t[a].y=e.height/4-Math.floor(a/3)*e.height/2;else for(a=0;a<t.length;a++)t[a].scale=.25,t[a].x=-e.width/4+a%3*e.width/4,t[a].y=e.height/4-Math.floor(a/3)*e.height/4},gotoHomePos:function(e,t,i,a){for(var o=null,r=0;r<e.childrenCount;r++)if(e.children[r]._parentId&&e.children[r]._parentId!=t._parentId){o=e.children[r];break}if(null!=o){var c=cc.v2(0,0);1==o._parentId?c=this._redStartPos:3==o._parentId&&(c=this._greenStartPos);var n=cc.v2(0,0);for(r=0;r<2;r++)for(var d=0;d<2;d++)if(o._selfId==2*r+d){n.x=c.x+r*this._startSpace.x,n.y=c.y-d*this._startSpace.y;break}var s=this.node.convertToNodeSpaceAR(o.convertToWorldSpaceAR(cc.v2(0,0)));o.parent=this.node,o.position=s,o._step=0,this.m_myId<this.m_otherId&&(o.rotation=0),cc.audioEngine.playEffect(this.m_returnHomeAudio,!1);var l=this;o.runAction(cc.sequence(cc.moveTo(.2,n),cc.callFunc(function(e,i){l.movePlayerEnd(i[0],i[1],t)},l,[i,a])))}else this.movePlayerEnd(i,a,t)},movePlayerEnd:function(e,t,i){e.getComponents(cc.Sprite)[0].spriteFrame=this.node.getChildByName("DiceRoll").getComponents(cc.Sprite)[0].spriteFrame,6==e._curPoints?this.changePlayerFrame(t,!0):this.changePlayerFrame(t,!1),i.getChildByName("circle").getComponents(cc.Animation)[0].stop();var a=this.node.getChildByName("rslm_idle");"y"==i._colorName&&(a=this.node.getChildByName("yslm_idle")),i.getChildByName("circle").getComponents(cc.Sprite)[0].spriteFrame=a.getComponents(cc.Sprite)[0].spriteFrame,i._touchListener.setSwallowTouches(!1),this.showMultiNode(i.parent)},showScore:function(e,t){var i=e.parent.childrenCount;if(this.m_myId>this.m_otherId){if(1==e._parentId)(a=this.node.getChildByName("my").getChildByName("node"+i.toString()))&&this.manAct(a);else if(3==e._parentId){(a=this.node.getChildByName("other").getChildByName("node"+i.toString()))&&this.manAct(a)}}else if(3==e._parentId)(a=this.node.getChildByName("my").getChildByName("node"+i.toString()))&&this.manAct(a);else if(1==e._parentId){var a;(a=this.node.getChildByName("other").getChildByName("node"+i.toString()))&&this.manAct(a)}t&&window.parent.postMessage({cmd:"SendGameData",data:i,uid:this.m_myId},"*")},manAct:function(e){var t=cc.instantiate(this.node.getChildByName("man"));t.parent=e,t.position=cc.v2(0,0),t.scale=.1,t.runAction(cc.spawn(cc.fadeIn(.3),cc.sequence(cc.scaleTo(.3,1.1),cc.scaleTo(.1,1))))},checkNodeZOrder:function(e){for(var t=0;t<e.length;t++){var i=e[t];if(i.parent.childrenCount>0&&i._step<57){for(var a=0;a<i.parent.childrenCount;a++)i.parent.children[a]!=i&&(i.parent.children[a].zIndex=0);i.zIndex=1}}},hosting_roll:function(){var e=this.node.getChildByName("DiceRoll_1");this.onCastDice_me(e)},hosting_move:function(){this.onMovePlayerNode_me(this._hosting_move_playerNode),this._hosting_move_playerNode=null}}),cc._RF.pop()},{}]},{},["Main"]);