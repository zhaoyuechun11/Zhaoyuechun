
import Response from '../socket/down.js';
import Request from '../socket/up.js';
import Types from '../socket/types.js';
import store from '../store/index'
const getShopData=function(http,url,succesCallBack, failCallBack){

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
export {getShopData}
