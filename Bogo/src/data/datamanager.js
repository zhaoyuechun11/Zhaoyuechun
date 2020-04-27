import Response from '../socket/down.js';
import Request from '../socket/up.js';
import Types from '../socket/types.js';
import {setFriendsLocal,getFriendsLocal,setStrongerLocal,getStrongerLocal,getChatToBongoLocal,saveChatToBongoLocal} from '../utils/localStorageUtil.js';
var DataManager = (function () {

  function DataManager() {
    this.websocket = null;
    this.userList = [];
    this.friendList = [];
    this.addSendAddFriendList = [];
    this.invitedList = [];
    this.agreeList = [];
    this.matchUsers = [];
    this.chatList = {};
    this.matchGame = '';
    this.joinMatchList = {};
    this.cancelInvitedList = {};
    this.invitedMatchGame = undefined;
    this.onInvitedCallback = null;
    this.onMatchedCallback = null;
    this.onInvitedCallbackChat = null;
    this.onHandleChatCallback = null;
    this.onRejectInvitedGame = null;
    this.gameHistoryList = {};
    this.notifyMessage = {};
    this.playGamesWithTime = [];
    this.lastPlayGame = "";
    this.strongerInfoList = [];
    this.chatToBongoList=[];
    this.mySelfId = -1;
  }

  DataManager.prototype.init = function (socket) {
    this.websocket = socket;
  };

  DataManager.prototype.hasUser = function (uid) {
    var ret = this.userList.find(function (element) {
      return element.userId == uid;
    });
    return ret;
  };

  DataManager.prototype.addUser = function (user) {
    var _this = this;
    var newUser = {
      userId: user._user_info._user_base_info._uid,
      userName: user._user_info._user_base_info._user_name,
      userHead: user._user_info._user_base_info._head_portrait,
      userBirthDay: user._user_info._user_base_info._birthday,
      isRobot: user._user_info._user_base_info._is_robot,
      headPortraitFrame: user._user_info._head_portrait_frame,
      birthday: user._user_info._user_base_info._birthday,
      headPortrait: user._user_info._user_base_info._head_portrait,
      sex: user._user_info._user_base_info._sex,
      job: user._user_info._user_base_info._job,
      homeland: user._user_info._user_base_info._homeland,
      signature: user._user_info._user_base_info._signature,
      constellation: user._user_info._user_base_info._constellation,
      age: 0,
      totalCredit: user._user_info._total_integral,
      totalBelike: user._user_info._total_belike
    };

    var ret = _this.userList.find(function (element) {
      return element.userId == newUser.userId;
    });

    if (ret === undefined) {
      this.userList.push(newUser);
    }

    console.log(newUser);
    return newUser;
  };

  DataManager.prototype.getMyself = function() {
      var _this = this;
      return _this.userList.find( function (element) {
          return element.userId == _this.mySelfId;
      })
  };

  DataManager.prototype.setMyself = function(uid){
      this.mySelfId = uid;
  };

  DataManager.prototype.getMyselfId = function() {
      return this.mySelfId;
  };

  DataManager.prototype.getUser = function (uid) {
    var _this = this;
    return new Promise(function (resolve, reject) {
      var ret = _this.userList.find(function (element) {
        return element.userId == uid;
      });

      if (ret) {
        resolve(ret);
      } else {
        var msg = Request.up.get_user_info.create({
          _uid: uid
        });
        var buf = Request.up.get_user_info.encode(msg).finish();
        _this.websocket.send(Types.MsgEnum.get_user_info, buf).then((msg) => {
          console.log(msg);
          var user = Response.down.get_user_info.decode(msg);
          console.log("img url: "+user._user_info._user_base_info._head_portrait);
          console.log(user);
          var addUser = {
            userId: user._user_info._user_base_info._uid,
            userName: user._user_info._user_base_info._user_name,
            userHead: user._user_info._user_base_info._head_portrait,
            userBirthDay: user._user_info._user_base_info._birthday,
            isRobot: user._user_info._user_base_info._is_robot,
            headPortraitFrame: user._user_info._head_portrait_frame,
            birthday: user._user_info._user_base_info._birthday,
            headPortrait: user._user_info._user_base_info._head_portrait,
            sex: user._user_info._user_base_info._sex,
            job: user._user_info._user_base_info._job,
            homeland: user._user_info._user_base_info._homeland,
            signature: user._user_info._user_base_info._signature,
            constellation: user._user_info._user_base_info._constellation,
            age: 0,
            totalCredit: user._user_info._total_integral,
            totalBelike: user._user_info._total_belike
          };
          _this.userList.push(addUser);
          resolve(addUser);
        }, (msg) => {
          reject(msg);
        });
      }
    })
  };

  DataManager.prototype.getAllUser = function () {
    return this.userList;
  };

  DataManager.prototype.getAllFriend = function () {
    this.friendList=getFriendsLocal()
    return this.friendList;
  };
  /**
   * 设置好友id列表
   * @param friendList
   */
  DataManager.prototype.setFriendList = function (friendList) {
    this.friendList = friendList;
    setFriendsLocal(friendList)
  };

  /**
   * 添加好友id到列表
   * @param friend
   */
  DataManager.prototype.addFriend = function (friend) {
    this.addFriendData(friend)
    setFriendsLocal(this.friendList)
  };

  /**
   * 删除好友id到列表
   * @param friend
   */
  DataManager.prototype.removeFriend = function (friend) {
    var index = this.friendList.indexOf(friend);
    if ( index > 0 )
    {
      this.friendList.splice(index, 1);
    }
    setFriendsLocal(this.friendList)
  };

  /**
   * 是否有当前好友
   * @param uid
   * @returns {*}
   */
  DataManager.prototype.hasFriend = function (uid) {
    var ret = this.friendList.find(function (element) {
      return element == uid;
    });
    return ret;
  };

  /**
   * 添加陌生人列表
   * @param stronger
   */
  DataManager.prototype.addStronger = function (stronger) {
    console.log(stronger)
    this.getAllStrongerList()
    if(this.strongerInfoList!=null){
    var userIndex = this.strongerInfoList.findIndex(function (element) {
      return element.userId ==stronger.userId
    });
    if (userIndex < 0) {
      this.strongerInfoList.push(stronger);
    } else {
      this.strongerInfoList.splice(userIndex, 1, stronger)
    }
    }else{
      this.strongerInfoList=[]
      this.strongerInfoList.push(stronger);
    }
    setStrongerLocal(this.strongerInfoList)
  };

  /**
   * 获取陌生人列表
   * @returns {Array|*}
   */
  DataManager.prototype.getAllStrongerList = function () {
    this.strongerInfoList = getStrongerLocal()
    return this.strongerInfoList;
  };

  DataManager.prototype.loadSendAddFriend = function () {
    let data = localStorage.getItem('addSendAddFriendList');
    if (data != null) {
      this.addSendAddFriendList = JSON.parse(data);
    }
  };

  DataManager.prototype.addSendAddFriend = function (uid) {
    if (this.addSendAddFriendList.indexOf(uid) < 0) {
      this.addSendAddFriendList.push(uid);
    }
    let json = JSON.stringify(this.addSendAddFriendList);
    localStorage.setItem('addSendAddFriendList', json);
  };

  DataManager.prototype.removeSendAddFriend = function (uid) {
    let index = this.addSendAddFriendList.indexOf(uid);
    if (index >= 0) {
      this.addSendAddFriendList.splice(index, 1);
    }
  };

  DataManager.prototype.isSendAddFriend = function (uid) {
    return this.addSendAddFriendList.indexOf(uid) >= 0;
  };

  DataManager.prototype.addFriendData = function (uid) {
    if (this.friendList.indexOf(uid) < 0) {
      this.friendList.push(uid);
    }
    console.log(this.friendList);
  };

  DataManager.prototype.isMyFriend = function (uid) {
    return this.friendList.indexOf(uid) >= 0;
  };

  DataManager.prototype.getInvitedFriend = function () {
    return this.invitedList;
  };

  DataManager.prototype.getAllAgree = function () {
    return this.agreeList;
  }

  DataManager.prototype.addInvitedFriend = function (uid) {
    if (this.invitedList.indexOf(uid) < 0) {
      this.invitedList.push(uid);
    }
  };

  DataManager.prototype.removeInvitedFriend = function (uid) {
    //console.log(this.invitedList);
    let index = this.invitedList.indexOf(uid);
    if (index >= 0) {
      this.invitedList.splice(index, 1);
    }
    //console.log(this.invitedList);
  };

  DataManager.prototype.addAgreeFriend = function (uid) {
    //console.log(this.agreeList);
    let index = this.agreeList.indexOf(uid);
    //console.log('find add user ' + index);
    if (this.agreeList.indexOf(uid) < 0) {
      this.agreeList.push(uid);
    }
    //console.log(this.agreeList);
  };

  DataManager.prototype.removeAgreeFriend = function (uid) {
    //console.log(this.agreeList);
    var index = this.agreeList.indexOf(uid);
    if (index >= 0) {
      this.agreeList.splice(index, 1);
    }
    //console.log(this.agreeList);
  };

  DataManager.prototype.addChatInfo = function (toId, chat) {
    if (this.chatList[toId] === undefined) {
      this.chatList[toId] = [];
    }
    this.chatList[toId].push(chat);
    this.saveChatInfo();
  };

  DataManager.prototype.getChatInfo = function (toId) {
    //console.log(this.chatList[toId]);
    if (this.chatList[toId] !== undefined) {
      return this.chatList[toId];
    }
    return []
  };

  DataManager.prototype.copyAllChat = function () {
    let ret = {...this.chatList};
    // for(let userId in this.chatList)
    // {
    //   ret[userId] = this.chatList[userId];
    // }
    return ret;
  };

  DataManager.prototype.getAllChat = function () {
    return this.chatList;
  };

  DataManager.prototype.saveChatInfo = function () {
    let json = JSON.stringify(this.chatList);
    localStorage.setItem('chatInfo', json);
  };

  DataManager.prototype.loadChatInfo = function () {
    let json = localStorage.getItem('chatInfo');
    //console.log(json);
    if (json != null) {
      this.chatList = JSON.parse(json);
    }
    //console.log(this.chatList);
  };


  DataManager.prototype.clearMatchUser = function () {
    this.matchUsers = [];
  };

  //如果是自己放到第一个位置
  DataManager.prototype.addMatchUser = function (user) {
    this.matchUsers.push(user);
    //console.log(this.matchUsers);
  };

  DataManager.prototype.getMatchUser = function () {
    return this.matchUsers;
  };

  DataManager.prototype.setMatchGame = function (game) {
    this.matchGame = game;
  };

  DataManager.prototype.getMatchGame = function (game) {
    return this.matchGame;
  };

  DataManager.prototype.sendInvitedGame = function (game, userId, timestamp) {
    var buf = Request.up.invite_game.encode({
      _uid: userId,
      _gid: game,
      _timestamp: timestamp
    }).finish();
    this.websocket.send(Types.MsgEnum.invite_game, buf, false).then((msg) => {
        console.log(msg);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  DataManager.prototype.cancelInviteGame = function (game, userId) {
    let buf = Request.up.cancel_invite_game.encode({
      _uid: userId,
      _gid: game
    }).finish();

    this.websocket.send(Types.MsgEnum.cancel_invite_game, buf, false).then((msg) => {
      },
      (error) => {
        console.log(error);
      }
    );
  };

  DataManager.prototype.agreeInviteGame = function (game, userId, agree) {
    var buf = Request.up.agree_invite_game.encode({
      _uid: userId,
      _gid: game,
      _agree: agree
    }).finish();
    this.websocket.send(Types.MsgEnum.agree_invite_game, buf, false).then((msg) => {
        console.log(msg);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  DataManager.prototype.fetchUserInfo = function (uid) {
    //获取当前用户个人信息
    var buf = Request.up.get_user_info.encode({
      _uid: uid
    }).finish();

    this.websocket.send(Types.MsgEnum.get_user_info, buf, false).then(
      (msg) => {
        //console.log(msg);
      },
      (error) => {
        //console.log(error);
      }
    );
  };

  // matchgame { userId, gameId }
  DataManager.prototype.addJoinMatchGame = function (matchGame) {
    let toId = matchGame.userId;
    this.joinMatchList[toId] = matchGame;
  };

  DataManager.prototype.removeJoinMatchGame = function (toId) {
    if (this.joinMatchList[toId] !== undefined) {
      delete this.joinMatchList[toId];
    }
  };

  DataManager.prototype.getJoinMatchGame = function (userId) {
    return this.joinMatchList[userId];
  };

  DataManager.prototype.setInvitedGame = function (game) {
    this.invitedMatchGame = game;
  };

  DataManager.prototype.getInvitedGame = function () {
    return this.invitedMatchGame;
  };

  DataManager.prototype.addCancelInvited = function () {

  };

  DataManager.prototype.getCancelInvited = function () {
    return this.cancelInvitedList;
  };

  DataManager.prototype.addGameHistory = function (toUser, win) {

    if (this.gameHistoryList[toUser] == undefined) {
      this.gameHistoryList[toUser] = [];
      this.gameHistoryList[toUser][0] = 0;
      this.gameHistoryList[toUser][1] = 0;
    }

    if (win) {
      this.gameHistoryList[toUser][0] = this.gameHistoryList[toUser][0] + 1;
    } else {
      this.gameHistoryList[toUser][1] = this.gameHistoryList[toUser][1] + 1;
    }
    this.saveGameHistory();
  };

  DataManager.prototype.getGameHistory = function (toUser) {
    if (this.gameHistoryList[toUser] == undefined) {
      this.gameHistoryList[toUser] = [];
      this.gameHistoryList[toUser][0] = 0;
      this.gameHistoryList[toUser][1] = 0;
    }
    return this.gameHistoryList[toUser];
  };

  DataManager.prototype.saveGameHistory = function () {
    let json = JSON.stringify(this.gameHistoryList);
    localStorage.setItem('gameHistory', json);
  };

  DataManager.prototype.loadGameHistory = function () {
    let json = localStorage.getItem('gameHistory');
    if (json != null) {
      this.gameHistoryList = JSON.parse(json);
    }
  };

  DataManager.prototype.addNotifyMessage = function (fromUser, message) {
    if (this.notifyMessage[fromUser] === undefined) {
      this.notifyMessage[fromUser] = [];
    }

    this.notifyMessage[fromUser].push(message);
    this.saveNotifyMessage();
  };

  DataManager.prototype.getNotifyMessage = function (fromUser) {
    return this.notifyMessage[fromUser]
  };

  DataManager.prototype.getAllNotifyMessage = function () {
    return this.notifyMessage;
  };

  DataManager.prototype.copyAllNotifyMessage = function () {
    let ret = {...this.notifyMessage};
    return ret;
  };

  DataManager.prototype.removeNotifyMessage = function (fromUser) {
    if (this.notifyMessage[fromUser] !== null) {
      delete this.notifyMessage[fromUser];
    }
    this.saveNotifyMessage();
  };

  DataManager.prototype.saveNotifyMessage = function () {
    let json = JSON.stringify(this.notifyMessage);
    localStorage.setItem('notifyMessage', json);
  };

  DataManager.prototype.loadNotifyMessage = function () {
    let json = localStorage.getItem('notifyMessage');
    if (json != null) {
      this.notifyMessage = JSON.parse(json);
    }
  };

  DataManager.prototype.initLoad = function () {
    this.loadNotifyMessage();
    this.loadChatInfo();
    this.loadGameHistory();
    this.loadRecordPlayGame();
    this.loadSendAddFriend();
  }

  DataManager.prototype.setRecordPlayGame = function (gameId) {

    console.log(JSON.stringify(this.playGamesWithTime));

    var record = this.playGamesWithTime.find(function (element) {
      return element.gameId == gameId;
    });

    if (record != undefined) {
      record.playTime = record.playTime + 1;
    } else {
      this.playGamesWithTime.push({
        gameId: gameId,
        playTime: 1
      });
    }

    this.lastPlayGame = gameId;

    let json = JSON.stringify(this.playGamesWithTime);
    localStorage.setItem('recordPlayGame', json);
    //console.log(json);
  }

  DataManager.prototype.loadRecordPlayGame = function () {
    let json = localStorage.getItem('recordPlayGame');
    //console.log('load record play games ');
    //console.log(json);
    if (json != null) {
      this.playGamesWithTime = JSON.parse(json);
    }
  }

  DataManager.prototype.getRecordPlayGame = function () {
    //console.log(this.playGamesWithTime);
    return this.playGamesWithTime.sort((a, b) => {
      return a.playTime < b.playTime
    });
  }

  DataManager.prototype.getLastPlayGame = function () {
    return this.lastPlayGame;
  }

  DataManager.prototype.saveChatToBongo=function (chatBean) {
    if(this.chatToBongoList==null||(this.chatToBongoList!=null&&this.chatToBongoList.length==0)){
      //内存中集合为空或者无元素则从本地保存中获取
      this.getAllChatToBongo()
    }
    //如果集合为空，则本地无保存聊天数据
    if(this.chatToBongoList==null){
      this.chatToBongoList=[]
    }
    let index=this.chatToBongoList.indexOf(chatBean)
    if (index < 0) {
      this.chatToBongoList.push(chatBean);
    } else {
      this.chatToBongoList.splice(index,1,chatBean)
    }
    saveChatToBongoLocal(this.chatToBongoList)
  }

  DataManager.prototype.getAllChatToBongo=function () {
    // this.chatToBongoList
    this.chatToBongoList=getChatToBongoLocal()

    return this.chatToBongoList;
  }

  return DataManager;
}());

export {DataManager}
