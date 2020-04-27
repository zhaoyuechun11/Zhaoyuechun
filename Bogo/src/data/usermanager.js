
import Response from '../socket/down.js';
import Request from '../socket/up.js';
import Types from '../socket/types.js';
import store from '../store/index'

var userInfoKey={
  id:'id',
  name:'name',
  birthday:'birthday',
  head_portrait:'head_portrait',
  sex:'sex',
  job:'job',
  homeland:'homeland',
  signature:'signature',
  constellation:'constellation'
}
export { userInfoKey }

var achieveParams={
  achievementNameArray:['continue_login','like','belike','use_face','friend','game_win','agile_game_win','brain_game_win','operate_game_win','knowledge_game_win','fortune_game_win','game'],
}
export { achieveParams }

/**
 * 获取好友列表请求封装
 * @param websocket 套接字请求接口
 * @param succesCallBack 成功回调
 * @param failCallBack 失败回调
 */
const getFriendList = function (websocket, succesCallBack, failCallBack) {
  const self = this;
  console.log("usermanager  getFriendList")
  if (null == websocket) {
    console.log("websocket can not be null")
    return;
  }
  let buf = Request.up.get_friend_list.encode().finish();
  websocket.send(Types.MsgEnum.get_friend_list, buf).then((msg) => {
      // 请求好友列表成功，通过id请求其信息
      let data = Response.down.get_friend_list.decode(msg);
      let uidList = data._uid_list;
      if (succesCallBack != null) {
        succesCallBack(uidList)
      }
    },
    (error) => {
      // 请求失败
      console.log(error)
      if (failCallBack != null) {
        failCallBack(error)
      }
    });

};
export {getFriendList}

/**
 * 删除好友
 * @param webSocket
 * @param uid
 * @param succesCallBack
 * @param failCallBack
 */
const removeFriend = function (webSocket, uid, succesCallBack, failCallBack) {
  if (webSocket == null || uid == null) {
    return
  }
  let _this = this;
  let msg = Request.up.remove_friend.create({
    _uid: uid
  });
  let buf = Request.up.remove_friend.encode(msg).finish();
  webSocket.send(Types.MsgEnum.remove_friend, buf).then((msg) => {
    console.log("remove friend  success!")

    // 请求好友列表成功，通过id请求其信息
    var removeResult = Response.down.remove_friend.decode(msg);
    if (succesCallBack != null) {
      succesCallBack(removeResult)
    }
  })
    .catch((msg) => {
      console.log("fail")
      if (failCallBack != null) {
        failCallBack(msg)
      }
    });
}
export {removeFriend}

/**
 * 添加好友
 * @param webSocket
 * @param uid
 * @param succesCallBack
 * @param failCallBack
 */
const addFriend=function (webSocket, uid, succesCallBack, failCallBack) {
  const self = this
  console.log(self.added);
  if (self.added == true) {
    return
  }
  console.log('add friends : ' + this.uid);
  let msg = Request.up.add_friend.create({
    _uid: uid
  });
  let buf = Request.up.add_friend.encode(msg).finish();
  webSocket.send(Types.MsgEnum.add_friend, buf).then((msg) => {
    console.log("add_friend  success!")
    // 请求好友列表成功，通过id请求其信息
    var friend = Response.down.add_friend.decode(msg);
    console.log(friend)
    if (succesCallBack != null) {
      succesCallBack(friend)
    }
    })
    .catch((msg) => {
      console.log("add friend fail"+msg)
      if (failCallBack != null) {
        failCallBack(msg)
      }
    });

}
export {addFriend}


const searchFriend = function (webSocket, selValue, page, succesCallBack, failCallBack) {
  let msg = Request.up.search_friend.create({
    _uid_or_name: selValue,
    _page: page
  });
  let buf = Request.up.search_friend.encode(msg).finish();
  webSocket.send(Types.MsgEnum.search_friend, buf).then((msg) => {
      let resp = Response.down.search_friend.decode(msg);
      console.log(resp);
      // 请求好友列表成功，通过id请求其信息
      var fList = resp._user_info_list;
      if (succesCallBack != null) {
        succesCallBack(fList)
      }
    },
    (msg) => {
      // 请求失败
      if (failCallBack != null) {
        failCallBack(msg)
      }
    });
}
export {searchFriend}

/**
 * 获取用户信息
 * @param websocket
 * @param uid
 * @param succesCallBack
 * @param failCallBack
 */
const getUserInfo = function (webSocket, uid, succesCallBack, failCallBack) {
  if(webSocket==null){
    console.log("webSocket is null")
    return
  }
  const self = this;
  var msg = Request.up.get_user_info.create({
    _uid: uid
  });
  console.log(msg);
  var buf = Request.up.get_user_info.encode(msg).finish();
  webSocket.send(Types.MsgEnum.get_user_info, buf).then((msg) => {
    var userInfo = Response.down.get_user_info.decode(msg);
    if (succesCallBack != null) {
      succesCallBack(userInfo)
    }
  }, (msg) => {
    if (failCallBack != null) {
      failCallBack(msg)
    }
  });
};
export {getUserInfo}

/**
 * 更新用户信息
 * @param websocket
 * @param key
 * @param value
 * @param succesCallBack
 * @param failCallBack
 */
const updateUserInfo = function (websocket, key,value, succesCallBack, failCallBack) {
  var user_info;
  switch (key){
      case userInfoKey.id:
        user_info= {
          _uid: value
        }
      break;
    case userInfoKey.name:
      user_info= {
        _user_name: value
      }
      break;
    case userInfoKey.birthday:
      user_info= {
        _birthday:value
      }
      break;
    case userInfoKey.head_portrait:
      user_info= {
        _head_portrait:value
      }
      break;
    case userInfoKey.sex:
      user_info= {
        _sex:value
      }
      break;
    case userInfoKey.job:
      user_info= {
        _job:value
      }
      break;
    case userInfoKey.homeland:
      user_info= {
        _homeland:value
      }
      break;
    case userInfoKey.signature:
      user_info= {
        _signature:value
      }
      break;
    case userInfoKey.constellation:
      user_info= {
        _constellation:value
      }
      break;
  }

  let msg = Request.up.modify_user_info.create({
    _user_info: user_info
  });
  let buf = Request.up.modify_user_info.encode(msg).finish();
  websocket.send(Types.MsgEnum.modify_user_info, buf).then((msg)=>{
    console.log("modify_user_info success!")
    // 更新个人信息成功
    var friend = Response.down.modify_user_info.decode(msg);
    console.log(friend)
    if(succesCallBack!=null){
      succesCallBack(friend)
    }
  })
    .catch((msg)=>{
      console.log("fail")
      if(failCallBack!=null){
        failCallBack(msg)
      }
    });
};
export {updateUserInfo}

/**
 * 设置用户头像
 * @param websocket
 * @param succesCallBack
 * @param failCallBack
 */
const setHeadPortrait = function (websocket, succesCallBack, failCallBack) {
  const self = this;
  console.log("usermanager  setHeadPortrait")
  if (null == websocket) {
    console.log("websocket can not be null")
    return;
  }
  let buf = Request.up.head_portrait_set.encode().finish();
  websocket.send(Types.MsgEnum.head_portrait_set, buf).then((msg) => {
      // 请求好友列表成功，通过id请求其信息
      let data = Response.down.head_portrait_set.decode(msg);
      let url = data._url;
      if (succesCallBack != null) {
        succesCallBack(url)
      }
    },
    (error) => {
      // 请求失败
      console.log("4444444444444444444: "+error)
      console.log(error)
      if (failCallBack != null) {
        failCallBack(error)
      }
    });

};
export {setHeadPortrait}


const getUserAchievement = function (webSocket,uid, succesCallBack, failCallBack) {
  const self = this;
  console.log("usermanager  setHeadPortrait")
  if (null == webSocket) {
    console.log("websocket can not be null")
    return;
  }
  let msg = Request.up.get_user_achievement.create({
    _uid: uid
  });
  let buf = Request.up.get_user_achievement.encode(msg).finish();
  webSocket.send(Types.MsgEnum.get_user_achievement, buf).then((msg) => {
      console.log(" get_user_achievement success");
      var achievementList=[{'_achievement_name':'continue_login','_level':2},{'_achievement_name':'like','_level':1},{'_achievement_name':'belike','_level':1},{'_achievement_name':'use_face','_level':2},{'_achievement_name':'friend','_level':1},{'_achievement_name':'game_win','_level':2},{'_achievement_name':'game_win','_level':2},{'_achievement_name':'agile_game_win','_level':2},{'_achievement_name':'brain_game_win','_level':2},{'_achievement_name':'operate_game_win','_level':2},{'_achievement_name':'knowledge_game_win','_level':2},{'_achievement_name':'fortune_game_win','_level':2}];
      // console.log(resp);
      // 请求好友列表成功，通过id请求其信息
      let resp = Response.down.get_user_achievement.decode(msg);
      var myAchievementIconArray;
      for (var item of achievementList){
           myAchievementIconArray=getStarIcon(item)
      }
      console.log("------------------------------");
      console.log(myAchievementIconArray)
      if (succesCallBack != null) {
        succesCallBack(myAchievementIconArray)
      }
    },
    (error) => {
      // 请求失败
      if (failCallBack != null) {
        failCallBack(error)
      }
    });

};
export {getUserAchievement}

const getStarIcon=function (item) {
  var myAchievementIconArray=[]
  const self=this
  let achieveMent=store.getters.getAchievementObj()
  // this.achievementNameArray.indexOf(item._achievement_name)>-1&&item._achievement_name=='continue_login'&&continuLogin.findIndex(achieve => achieve.level === item.level)>0&&this.myAchievementIconArray.push(achieve)
  let level=item._level
  switch (item._achievement_name){
    case achieveParams.achievementNameArray[0]:
      let continueLogin=achieveMent.continue_login
      for (var item of continueLogin){
        if(level==item.level){
          myAchievementIconArray.push(item.img)
        }
      }
      break;
    case achieveParams.achievementNameArray[1]:
      let like=achieveMent.like
      for (var item of like){
        if(level==item.level){
          myAchievementIconArray.push(item.img)
        }
      }
      break
    case achieveParams.achievementNameArray[2]:
      let belike=achieveMent.belike
      for (var item of belike){
        if(level==item.level){
          myAchievementIconArray.push(item.img)
        }
      }
      break
    case achieveParams.achievementNameArray[3]:
      let use_face=achieveMent.use_face
      for (var item of use_face){
        if(level==item.level){
          myAchievementIconArray.push(item.img)
        }
      }
      break
    case achieveParams.achievementNameArray[4]:
      let friend=achieveMent.friend
      for (var item of friend){
        if(level==item.level){
          myAchievementIconArray.push(item.img)
        }
      }
      break
    case achieveParams.achievementNameArray[5]:
      let game_win=achieveMent.game_win
      for (var item of game_win){
        if(level==item.level){
          myAchievementIconArray.push(item.img)
        }
      }
      break
    case achieveParams.achievementNameArray[6]:
      let agile_game_win=achieveMent.agile_game_win
      for (var item of agile_game_win){
        if(level==item.level){
          myAchievementIconArray.push(item.img)
        }
      }
      break
    case achieveParams.achievementNameArray[7]:
      let brain_game_win=achieveMent.brain_game_win
      for (var item of brain_game_win){
        if(level==item.level){
          myAchievementIconArray.push(item.img)
        }
      }
      break
    case achieveParams.achievementNameArray[8]:
      let operate_game_win=achieveMent.operate_game_win
      for (var item of operate_game_win){
        if(level==item.level){
          myAchievementIconArray.push(item.img)
        }
      }
      break
    case achieveParams.achievementNameArray[9]:
      let knowledge_game_win=achieveMent.knowledge_game_win
      for (var item of knowledge_game_win){
        if(level==item.level){
          myAchievementIconArray.push(item.img)
        }
      }
      break
    case achieveParams.achievementNameArray[10]:
      let fortune_game_win=achieveMent.fortune_game_win
      for (var item of fortune_game_win){
        if(level==item.level){
          myAchievementIconArray.push(item.img)
        }
      }
      break
    case achieveParams.achievementNameArray[10]:
      let game=achieveMent.game
      for (var item of game){
        if(level==item.level){
          myAchievementIconArray.push(item.img)
        }
      }
      break
  };

  for (var item of myAchievementIconArray){
    console.log(item)
  }
  return myAchievementIconArray
}

/**
 * 获取喜欢玩的游戏列表
 * @param webSocket
 * @param uid
 * @param succesCallBack
 * @param failCallBack
 */
const getLoveGameList=function(self,webSocket,uid, succesCallBack, failCallBack){
  //获取喜爱的游戏
  let msg = Request.up.get_love_game_list.create({
    _uid:uid
  });
  let buf = Request.up.get_love_game_list.encode(msg).finish();
  webSocket.send(Types.MsgEnum.get_love_game_list, buf).then((msg)=>{
      // 请求好友列表成功，通过id请求其信息
      let resp = Response.down.get_love_game_list.decode(msg);
      console.log(resp);
      var loveGame=resp._love_game
      var gameInfoList=[]
      if(loveGame!=null){
        for(var game of loveGame){
          let gameData=self.$gameManager.getGameData(game._gid)
          gameInfoList.push(gameData)
        }
      }
      if(succesCallBack!=null){
        succesCallBack(gameInfoList)
      }
    },
    (msg)=>{
      if(failCallBack!=null){
        failCallBack(msg)
      }
    });
}
export {getLoveGameList}


const getAchievementObj=function(http,url,succesCallBack, failCallBack){
  http.get(url)
    .then(resp => {
      if (resp.status == 200) {
        let achievement = resp.data
        if (succesCallBack != null) {
          succesCallBack(achievement)
        }

      } else {
        if (failCallBack != null) {
          failCallBack({'status': resp.status})
        }
      }
    })
    .catch(error => {
      console.log(error)
      if (failCallBack != null) {
        failCallBack(error)
      }
    })
}
export {getAchievementObj}

/**
 * 获取推荐好友
 * @param webSocket
 * @param uid
 * @param succesCallBack
 * @param failCallBack
 */
const getRecommendFriends = function (webSocket, sex, succesCallBack, failCallBack) {
  if(webSocket==null){
    console.log("webSocket is null")
    return
  }
  const self = this;
  var msg = Request.up.recommend_friend.create({
    _sex:sex,
  });
  console.log(msg);
  var buf = Request.up.recommend_friend.encode(msg).finish();
  webSocket.send(Types.MsgEnum.recommend_friend, buf).then((msg) => {
    var resp = Response.down.recommend_friend.decode(msg);
    var friendList=resp._user_info_list
    if (succesCallBack != null) {
      succesCallBack(friendList)
    }
  }, (msg) => {
    if (failCallBack != null) {
      failCallBack(msg)
    }
  });
};
export {getRecommendFriends}
