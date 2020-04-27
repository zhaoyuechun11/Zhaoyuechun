
import {logV} from '../utils/logger.js';
import {lzwCompress,lzwDecompress} from '../utils/utils.js';

var keyConstant={
  friendListLocal:'friendListLocal',
  strongerListLocal:'strongerListLocal',
  gameUserConnectListLocal:'gameUserConnectListLocal',
  saveChatToBongoLocal:'saveChatToBongoLocal'
}
export { keyConstant }
/**
 * 保存当前日期
 */
const saveCurrentDate = function () {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var currentDate=year+"-"+month+"-"+day
  logV("localStorageUtil","saveCurrentDate ",currentDate)
  localStorage.setItem('currentDate',currentDate)
};
export { saveCurrentDate }

/**
 * 获取当前日期
 */
const getCurrentDate = function () {
  var currentDate=localStorage.getItem('currentDate')
  logV("localStorageUtil","saveCurrentDate",currentDate)
  return currentDate==null?null:currentDate
};
export { getCurrentDate }

/**
 * 保存当天可达到的最大积分
 * @param {String} totalCredit 总积分
 */
const saveMaxTotalCredit = function (totalCredit) {
  logV("localStorageUtil saveMaxTotalCredit ",totalCredit)
  localStorage.setItem('currentTotalCredit',totalCredit)
};
export { saveMaxTotalCredit }

/**
 * 获取当天可达到的最大积分
 * @param {String} totalCredit 总积分
 */
const getMaxTotalCredit = function () {
  var currentTotalCredit=localStorage.getItem('currentTotalCredit')
  logV("localStorageUtil"," getMaxTotalCredit ",currentTotalCredit)
  return currentTotalCredit==null?null:currentTotalCredit
};
export { getMaxTotalCredit }

/**
 * 保存当前好友id列表到本地
 * @param friendList
 */
const setFriendsLocal = function (friendList) {
  let json = JSON.stringify(friendList);
  logV("localStorageUtil","setFriendsLoacal",json)
  localStorage.setItem(keyConstant.friendListLocal, json);
};
export { setFriendsLocal }

const getFriendsLocal = function () {
  var friendListLocal = JSON.parse(localStorage.getItem(keyConstant.friendListLocal));
  logV("localStorageUtil","getFriendsLoacal",friendListLocal)
  return friendListLocal==null?null:friendListLocal
};
export { getFriendsLocal }

const setStrongerLocal = function (strongerList) {
  let json = JSON.stringify(strongerList);
  localStorage.setItem(keyConstant.strongerListLocal, json);
};
export { setStrongerLocal }

const getStrongerLocal = function () {
  var strongerListLocal=JSON.parse(localStorage.getItem(keyConstant.strongerListLocal))
  logV("localStorageUtil","getStrongerLocal",strongerListLocal)
  return strongerListLocal==null?null:strongerListLocal
};
export { getStrongerLocal }

const setGameUserConnectLocal = function (gameUserConnectList) {
  let json = JSON.stringify(gameUserConnectList);
  logV("localStorageUtil","setGameUserConnectLocal",json)
  localStorage.setItem(keyConstant.gameUserConnectListLocal, json);
};
export { setGameUserConnectLocal }

const getGameUserConnectLocal = function () {
  var gameUserConnectList=JSON.parse(localStorage.getItem(keyConstant.gameUserConnectListLocal))
  logV("localStorageUtil","getGameUserConnectLocal",gameUserConnectList)
  return gameUserConnectList==null?null:gameUserConnectList
};
export { getGameUserConnectLocal }

const saveChatToBongoLocal = function (chatToBongoList) {
  let json = JSON.stringify(chatToBongoList);
  log('saveChatToBongoLocal',json)
  let compressString=lzwCompress(json)
  localStorage.setItem(keyConstant.saveChatToBongoLocal, compressString);
};
export { saveChatToBongoLocal }

const getChatToBongoLocal = function () {
  let compressJson=localStorage.getItem(keyConstant.saveChatToBongoLocal)
  if(compressJson==null){
    return null
  }
  let json=lzwDecompress(compressJson)
  log('getChatToBongoLocal----------------',json)
  var chatToBongoList=JSON.parse(json)
  return chatToBongoList
};
export { getChatToBongoLocal }


const clearLocalStorage=function () {
  localStorage.clear()
}

const log=function (lab,string) {
  logV("localStorageUtil",lab,string)
}
