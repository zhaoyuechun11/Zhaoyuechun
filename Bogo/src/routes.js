import HomePage from './pages/home.vue';
import GamePage from './pages/game.vue';
//import MatchPage from './pages/gameMatch.vue';
//import ResultPage from './pages/gameResult';
import RolePage from './pages/role.vue';
import FriendsPage from './pages/friends.vue';
import ChatPage from './pages/chat.vue';
//import SignupPage  from './pages/signup.vue';
import CreatePage from './pages/create.vue'
//import About from './pages/about.vue'
import AddFriend from './pages/addfriends.vue'
import SearchFriend from './pages/searchfriends.vue'
import Shenmi from './pages/shenmi.vue'
import BongoChat from './pages/bongochat.vue'
import GainFriends from './pages/gainfriends.vue'
import Recomfriends from './pages/recomfriends.vue'
import PersonalInfo from './pages/personInfo.vue'
import Mine from './pages/minedit.vue'
import Stronger from './pages/stronger.vue'
import settings from './pages/settings.vue'
import countrySelect from './pages/countrySelect.vue'
import phoneLogin from './pages/phoneLogin.vue'
import scoreStore from './pages/scorestore.vue'
import checkeGender from './pages/checkegender.vue'
import testLogin from './pages/testlogin.vue'
import MineInfo from './pages/minelInfo.vue'
import discovery from './pages/discovery.vue'

export default [

  {
    path:"/",
    component:HomePage,
    name:"HomePage"
  },
  {
    path:"/create/",
    component:CreatePage
  },
  {
    path:"/home/",
    component: HomePage,
    name:"HomePage"
  },
  {
    path: "/game/",
    component: GamePage,
    props: true
  },
  {
    path: "/chat/",
    name: "ChatPage",
    component: ChatPage,
    props: true

  },
  {
    path: "/role/",
    name: "RolePage",
    component: RolePage
  },
  {
    path: "/friends/",
    name: "FriendsPage",
    component: FriendsPage
  },
  {
    path: "/addfriends/",
    component: AddFriend
  },
  {
    path: "/searchfriends/",
    name: "SearchFriend",
    component: SearchFriend
  },
  {
    path: "/shenmi/:title",
    name: "Shenmi",
    component: Shenmi
  },
  {
    path: "/bongochat/",
    name: "BongoChat",
    component: BongoChat
  },
  {
    path: "/gainfriends/",
    name: "GainFriends",
    component: GainFriends
  },
  {
    path:"/recomfriends/",
    name:"recomfriends",
    component:Recomfriends
  },
  {
    path:"/personalinfo/:uid/:type",
    name:"PersonalInfo",
    component:PersonalInfo,
    keepAlive: false,
  },
  {
    path:"/mineinfo/:uid",
    name:"MineInfo",
    component:MineInfo
  },
  {
    path:"/mine/",
    name:"Mine",
    component:Mine
  },
  {
    path:"/stronger/",
    name:Stronger,
    component:Stronger
  },
  {
    path:"/settings/",
    name:settings,
    component:settings
  },
  {
    path:"/countrySelect/",
    name:countrySelect,
    component:countrySelect
  },
  {
    path:"/phoneLogin/",
    name:phoneLogin,
    component:phoneLogin
  },
  {
    path:"/scoreStore/",
    name:scoreStore,
    component:scoreStore
  },
  {
    path:"/testlogin/",
    name:testLogin,
    component:testLogin
  },
  {
    path:'/checkeGender/',
    name:checkeGender,
    component:checkeGender,
  },
  {
    path:'/discovery/',
    name:discovery,
    component:discovery,
  }

]
