
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


