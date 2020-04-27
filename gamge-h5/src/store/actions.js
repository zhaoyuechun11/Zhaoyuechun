import * as type from './types.js';

// export function LoginApp({commit}, title) {
//     commit('APP_LOGIN', title);
// }

// export function LogoutApp({commit}, title){
//     commit('APP_LOGOUT', title);
// }

// export function setUserInfo({commit}, userInfo) {
//   commit(type.SET_USER_INFO,userInfo);
// }

// export function setChatsUid({commit}, uid1,uid2) {
//   commit(type.SET_USER_UID,uid1,uid2);
// }

// export function setFriendInfo({commit}, friend) {
//   commit(type.SET_FRIENDINFO,friend);
// }





export default{
	showloader:({ commit }) => {
		commit( type.SHOWLOADING )
	},
	hideloader:({ commit }) => {
		commit( type.HIDELOADING )
	},
}
