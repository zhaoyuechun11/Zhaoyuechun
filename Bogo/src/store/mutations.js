import * as type from './types';

export default {

  // setAccount(state, account)
  // {
  //   state.account = account;
  // },

  // setUserInfo(state, userInfo)
  // {
  //   state.userInfo = userInfo;
  //   //console.log(state.userInfo);
  // },

  // setUserId(state, userId)
  // {
  //   state.userId = userId;
  // },

  setOpenedPanel(state, panel)
  {
    state.openedPanel = panel;
  },
  setUserName(state, userName)
  {
    state.userInfo.userName = userName;
    console.log(state.userInfo.userName);
  },
  setUserAge(state, age){
    state.userInfo.age = age;
    console.log(state.userInfo.age);
  },
  setOnLineAddIdList:(state,list) =>{
    state.onLineAddIdList=list;
  },

  setOnLineAgreeIdList:(state,list)  =>{
    state.onLineAgreeIdList=list;
  },

  setOnLineChatIdList:(state,list)  =>{
    state.onLineChatIdList=list;
  },

  setFbUid:(state,fbUid)=>{
    state.fbUid=fbUid;
  },

  setMatchUser:(state,user) =>{
    state.mathUser = user;
  },

  setCountry:(state,country)=>{
    state.country=country;
  },

  setPairGender:(state,pairGender)=>{
    console.log("setPairGender "+ pairGender)
    localStorage.setItem('pairGender',pairGender);
  },

  setHeadPortraitFrame(state,headPortraitFrame){
    state.userInfo.headPortraitFrame=headPortraitFrame
  },

  setTotalCredit(state,totalCredit){
    state.userInfo.totalCredit=totalCredit
  },

  setMyPortraitFrame(state, headPortraitFrame){
    state.headPortraitFrame=headPortraitFrame
  },

  setHeadPortraitFrameArray(state, headPortraitFrameArray){
    state.headPortraitFrameArray=headPortraitFrameArray;
  },

  setShopObj(state,shopObject){
   state.shopObject=shopObject;
  },

  setAgreeIdArray(state,agreeIdArray){
    state.agreeIdArray=agreeIdArray;
  },

  setAcheiveMentObj(state,acheivementObj){
    state.achievementObj=acheivementObj;
  },

  setLoveGameList(state,loveGameList){
    state.loveGameList=loveGameList;
  },

  setScreenWidth(state,screenWidth){
    state.screenWidth=screenWidth
  },
}
