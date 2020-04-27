import HomePage from './pages/home.vue';
import rankList from './pages/rankList/rankList.vue';
import level  from './pages/level/level.vue';//chenwei8.9

const routers = [
  {
    path:"/",
    component:HomePage,
    name:"HomePage"
  },
  {
    path:"/home/",
    component: HomePage,
    name:"HomePage"
  },
 
  {
    path:"/rankList/rankList",
    component: rankList,
    name:"rankList"
  },

  //chenwei8.9
  {
    path:"/level/level",
    component: level,
    name:"level"
  },
 ]
export default routers
