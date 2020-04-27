/**
 * Created by juho on 2016-03-28.
 */

var gc = {
    isDebug:true,
    loader:null,
    stats:null,
    width:720,
    height:1230,

    IS_MOBILE:false,
    IS_LOCAL:false,

    onBgm:true,
    onFx:!getIE11(),

    guideOn:false,
    gameOver:false,
    pauseGame:false,

    sink:true,

    stage:null,
    soundPopup:null,
    intro:null,
    tutorial:null,
    game:null,

    chapter:1,//게임 챕터.. 1:카드랜드 2:버섯랜드 3:장미랜드 4:모자랜드 5:나무랜드
};