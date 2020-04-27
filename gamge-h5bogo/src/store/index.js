import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);
//176.9.127.88 外网
//172.31.2.107 虚拟机
//120.132.18.158
//46.4.66.144
const state = {
  userId: 0,
  account: {},
  user: {},
  userInfo: {},
  friends: [],
  websocket: null,
  dataManager: null,
  gameInfo:[],
  friend:{uid:1,headImg:'https://0.s3.envato.com/files/200941226/avatar.jpg'},
  ip:'172.31.2.108',
  openedPanel:null,
  onLineAddIdList:[],
  onLineAgreeIdList:[],
  onLineChatIdList:[],
  fbUid:null,
  matchUser: {},
  tempHeadImg:[
    'temphead01.png',
    'temphead02.png',
    'temphead03.png',
    'temphead04.png',
    'temphead05.png',
    'temphead06.png',
    'temphead07.png',
    'temphead08.png',
    'temphead10.png',
    'temphead11.png',
    'temphead12.png'
  ],
  utils:null,
  bgColor:[
    '#481E82',
    '#003ab4',
    '#4d9500',
    '#af5e00'
  ],
  country:{country: 'China', code: '+86',abbreviation:'CN'},
  screenWidth:360,
  pairGender:'未知',
  headPortraitFrame:null,
  head_portrait_frame:null,
  shopObject:null,
  agreeIdArray:null,
  achievementObj:null,
  loveGameList:null,
  headPortraitFrameArray:null,
}

const getters = {
  // 获取朋友列表
  getFriendList: (state)=> {

  },

  getUserInfo: (state) => () => {
    return state.userInfo;
  },

  getAccount:(state) => {
    return state.account;
  },

  getUserId: (state) => () => {
    return state.userId;
  },

  //用于临时生成头像
  getTempHead:(state)=>()=>{
    return state.tempHeadImg;
  },

  getTempCol:(state)=>()=>{
    return state.bgColor;
  },

  getHeadImg:(state)=>(headport)=>{
    var fdStart = headport.startsWith("temphead");
    if(fdStart){
      return "http://176.9.127.88:8585/"+headport
    }
   return headport
  },

  getPicUrl:(state)=>(url)=>{
    return "http://176.9.127.88:8585/"+url
  },

  getCountry:(state)=>()=>{
    return state.country
  },

  getPairGender:(state)=>()=>{
    console.log("getPairGender "+ localStorage.getItem('pairGender'))
    return  null==localStorage.getItem('pairGender')?"未知":localStorage.getItem('pairGender');
  },

  getMyPortraitFrame:(state)=>()=>{
    return state.headPortraitFrame
  },

  getHeadPortraitFrameArray:(state)=>()=>{
    if(state.headPortraitFrameArray==null){
      return null
    }
    return state.headPortraitFrameArray
  },

  getHeadFrameImage:(state)=>(index)=>{
    if(state.headPortraitFrameArray==null){
      return ""
    }
    for (let headPortraitFrame of state.headPortraitFrameArray) {
      if(headPortraitFrame.id == index){
        return headPortraitFrame.image;
      }
    }
    return ""
  },

  getShopObj:(state)=>()=>{
    return state.shopObject
  },

  getAgreeIdArray:(state)=>()=>{
    return state.agreeIdArray
  },

  getAchievementObj:(state)=>()=>{
    return state.achievementObj
  },
  getLoveGameList:(state)=>()=>{
    return state.loveGameList
  },

  getScreenWidth:(state)=>()=>{
    return state.screenWidth
  },

  }

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
