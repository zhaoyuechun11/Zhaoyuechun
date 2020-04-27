// // import * as type from './types';
// import { SHOWLOADING,HIDELOADING } from './types.js'
// const state = {
// 	showLoading:false
// }
 
// const mutations = {
// 	[SHOWLOADING](state){
// 		state.showLoading = true;
// 	},
// 	[HIDELOADING](state){
// 		state.showLoading = false;
// 	}
// }
 
// const getters = {
// 	showLoading(state){
// 		return state.showLoading
// 	}
// }


// export default {

// 	state,mutations,getters
//   // setAccount(state, account)
//   // {
//   //   state.account = account;
//   // },

//   // setUserInfo(state, userInfo)
//   // {
//   //   state.userInfo = userInfo;
//   //   //console.log(state.userInfo);
//   // },

//   // setUserId(state, userId)
//   // {
//   //   state.userId = userId;
//   // },

//   // setOpenedPanel(state, panel)
//   // {
//   //   state.openedPanel = panel;
//   // },
//   // setUserName(state, userName)
//   // {
//   //   state.userInfo.userName = userName;
//   //   console.log(state.userInfo.userName);
//   // },
//   // setUserAge(state, age){
//   //   state.userInfo.age = age;
//   //   console.log(state.userInfo.age);
//   // },
//   // setOnLineAddIdList:(state,list) =>{
//   //   state.onLineAddIdList=list;
//   // },

//   // setOnLineAgreeIdList:(state,list)  =>{
//   //   state.onLineAgreeIdList=list;
//   // },

//   // setOnLineChatIdList:(state,list)  =>{
//   //   state.onLineChatIdList=list;
//   // },

//   // setFbUid:(state,fbUid)=>{
//   //   state.fbUid=fbUid;
//   // },

//   // setMatchUser:(state,user) =>{
//   //   state.mathUser = user;
//   // },

//   // setCountry:(state,country)=>{
//   //   state.country=country;
//   // },

//   // setPairGender:(state,pairGender)=>{
//   //   console.log("setPairGender "+ pairGender)
//   //   localStorage.setItem('pairGender',pairGender);
//   // },

//   // setHeadPortraitFrame(state,headPortraitFrame){
//   //   state.userInfo.headPortraitFrame=headPortraitFrame
//   // },

//   // setTotalCredit(state,totalCredit){
//   //   state.userInfo.totalCredit=totalCredit
//   // },

//   // setMyPortraitFrame(state, headPortraitFrame){
//   //   state.headPortraitFrame=headPortraitFrame
//   // },

//   // setHeadPortraitFrameArray(state, headPortraitFrameArray){
//   //   state.headPortraitFrameArray=headPortraitFrameArray;
//   // },

//   // setShopObj(state,shopObject){
//   //  state.shopObject=shopObject;
//   // },

//   // setAgreeIdArray(state,agreeIdArray){
//   //   state.agreeIdArray=agreeIdArray;
//   // },

//   // setAcheiveMentObj(state,acheivementObj){
//   //   state.achievementObj=acheivementObj;
//   // },

//   // setLoveGameList(state,loveGameList){
//   //   state.loveGameList=loveGameList;
//   // },

//   // setScreenWidth(state,screenWidth){
//   //   state.screenWidth=screenWidth
//   // },
// }
import { SHOWLOADING,HIDELOADING } from './types.js'  
  
const state = {  
    showLoading:false,

    
    //chenwei8.9
    username: '',
    userImg: '',
    userLevel: '',
    userLevelExp: '',
    userLevelTotalExp: '',
    userRank: '',
    levelProcess: '',
}  
  
const mutations = {  
    [SHOWLOADING](state){  
        state.showLoading = true;  
    },  
    [HIDELOADING](state){  
        state.showLoading = false;  
    },

    //chenwei8.9
    setUsername(state,username){
      state.username = username
    },

    setUserImg(state,userImg){
      state.userImg = userImg
    },

    setUserLevel(state,userLevel){
      state.userLevel = userLevel
    },

    setUserLevelExp(state,userLevelExp){
      state.userLevelExp = userLevelExp
    },

    setUserLevelTotalExp(state,userLevelTotalExp){
      state.userLevelTotalExp = userLevelTotalExp
    },

    setUserRank(state,userRank){
      state.userRank = userRank
    },

    setLevelProcess(state,levelProcess){
      state.levelProcess = levelProcess
    },
}  
  
const getters = {  
    showLoading(state){  
        return state.showLoading  
    },

     //chenwei78.9
    getUsername:(state)=>()=>{
      return state.username
    },

    getUserImg:(state)=>()=>{
      return state.userImg
    },

    getUserLevel:(state)=>()=>{
      return state.userLevel
    },

    //chenwei7.26
    getUserLevelExp:(state)=>()=>{
      return state.userLevelExp
    },

    getUserLevelTotalExp:(state)=>()=>{
      return state.userLevelTotalExp
    },

    getUserRank:(state)=>()=>{
      return state.userRank
    },

    getLevelProcess:(state)=>()=>{
      return state.levelProcess
    },
}  
  
export default {  
    state,mutations,getters  
}  
