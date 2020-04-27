Define = function () {};
Enum = function () {};


Enum.SERVICE_CODE = {
    MOVI_KR : 0,
    MOVI_JP : 1,
    YAHOO : 2,
    NAVER : 3
};

Enum.MOVI_STATE = {
    PreLoader : 0,
    Menu : 1,
    Game : 2
};

Enum.DEVICE_STATE = {
	PC : 0,
	IOS : 1,
	ANDROID : 2
};

Enum.LANGUAGE = {
    korea : 0,
    english : 1,
    japan : 2
};

// 언어 설정
Define.LANGUAGE = Enum.LANGUAGE.english;


/*
1	상하이타운
2	펭귄 대쉬
3	네오 2048
4	상하이쉐프
5	스페이스버블
6	네코닌자
7	좀비건
8	코스믹팝
9	네코팡
10	모미모미
11	요괴파티
12	라이벌레이싱
13	트레져 아일랜드(슬롯01)
14	창업신화
15	쥬얼리 스타(슬롯02)
16	IKON틀린그림찾기
17	"스위트블릭스
(벽돌깨기)"
18	다루마
20	"몬스터크로니클
(드래곤마스터)"
 */

Define.staticWidth = window.innerWidth;
Define.staticHeight = window.innerHeight;

Define.GIDX = 24;       // 페인팅컷
Define.SAVE_VER = 1;    // 세이브버젼
Define.IMG_VER = 1;     // 이미지 버젼
Define.SND_VER = 1;     // 사운드 버젼
Define.SPINE_VER = 1;	// 스파인 버젼
Define.SERVICE = Enum.SERVICE_CODE.MOVI_KR; // 접속경로를 설정한다.
Define.strGamePath = "";    // 게임url을 셋팅한다. : 야후에 런칭할때 필요함
Define.DEVICE = Enum.DEVICE_STATE.PC;
Define.LANGUAGE = Enum.LANGUAGE.english;
Define.CURRENT_VERSION = "ver. " + "0511:1023";

//https://docs.google.com/spreadsheets/d/e/2PACX-1vSI10icWxXkF37grlNGxFo6rnssk13yVe2VAF7B8peD8FKDnU56R_1etl34k1aIoTFMilE662UKyo5r/pubhtml?gid=1189915267&single=true
//https://docs.google.com/spreadsheets/d/1EuCUI5_Yr-GHXl8l2uoXSthQL_dXQUQlZcKTrLCXK2U/edit?usp=sharing


Define.GOOGLE_SHEETS_DATA = true;
Define.GOOGLE_SHEETS_DATA = false;
Define.GOOGLE_SPREADSHEET_ID = "13ROXLBwfLQFybHL4qu_iGFNk4dXCBBnQA_Sln9p0Sb0",
    Define.SHEET_LOCAL_STRING = 'json: {"debug":false,"AddTimePlus":30,"StageData":[{"Index":0,"NormalBall":0,"FastBall":0,"SlowBall":0,"BlinkBall":0,"SplitBall":0},{"Index":1,"NormalBall":1,"FastBall":0,"SlowBall":0,"BlinkBall":0,"SplitBall":0},{"Index":2,"NormalBall":2,"FastBall":0,"SlowBall":0,"BlinkBall":0,"SplitBall":0},{"Index":3,"NormalBall":3,"FastBall":0,"SlowBall":0,"BlinkBall":0,"SplitBall":0},{"Index":4,"NormalBall":3,"FastBall":0,"SlowBall":1,"BlinkBall":0,"SplitBall":0},{"Index":5,"NormalBall":3,"FastBall":1,"SlowBall":1,"BlinkBall":0,"SplitBall":0},{"Index":6,"NormalBall":2,"FastBall":1,"SlowBall":2,"BlinkBall":0,"SplitBall":0},{"Index":7,"NormalBall":1,"FastBall":2,"SlowBall":2,"BlinkBall":0,"SplitBall":0},{"Index":8,"NormalBall":2,"FastBall":1,"SlowBall":1,"BlinkBall":1,"SplitBall":0},{"Index":9,"NormalBall":0,"FastBall":0,"SlowBall":0,"BlinkBall":0,"SplitBall":2},{"Index":10,"NormalBall":1,"FastBall":1,"SlowBall":1,"BlinkBall":1,"SplitBall":1}],"RandomStageData":[{"Index":0,"StartNumber":0,"BallTotalCount":5,"Bomb_Min":0,"Bomb_Max":0,"ItemBox_Min":0,"ItemBox_Max":1,"DamageTime":5,"CompleteArea":0.8},{"Index":1,"StartNumber":11,"BallTotalCount":10,"Bomb_Min":0,"Bomb_Max":0,"ItemBox_Min":1,"ItemBox_Max":1,"DamageTime":6,"CompleteArea":0.75},{"Index":2,"StartNumber":21,"BallTotalCount":11,"Bomb_Min":0,"Bomb_Max":0,"ItemBox_Min":1,"ItemBox_Max":1,"DamageTime":7,"CompleteArea":0.7},{"Index":3,"StartNumber":31,"BallTotalCount":12,"Bomb_Min":0,"Bomb_Max":0,"ItemBox_Min":1,"ItemBox_Max":1,"DamageTime":8,"CompleteArea":0.65},{"Index":4,"StartNumber":41,"BallTotalCount":13,"Bomb_Min":0,"Bomb_Max":0,"ItemBox_Min":1,"ItemBox_Max":2,"DamageTime":9,"CompleteArea":0.6},{"Index":5,"StartNumber":51,"BallTotalCount":14,"Bomb_Min":0,"Bomb_Max":0,"ItemBox_Min":1,"ItemBox_Max":2,"DamageTime":10,"CompleteArea":0.55},{"Index":6,"StartNumber":61,"BallTotalCount":15,"Bomb_Min":0,"Bomb_Max":0,"ItemBox_Min":2,"ItemBox_Max":2,"DamageTime":11,"CompleteArea":0.5},{"Index":7,"StartNumber":71,"BallTotalCount":9,"Bomb_Min":1,"Bomb_Max":1,"ItemBox_Min":2,"ItemBox_Max":2,"DamageTime":12,"CompleteArea":0.75},{"Index":8,"StartNumber":81,"BallTotalCount":10,"Bomb_Min":1,"Bomb_Max":1,"ItemBox_Min":2,"ItemBox_Max":3,"DamageTime":13,"CompleteArea":0.7},{"Index":9,"StartNumber":91,"BallTotalCount":11,"Bomb_Min":1,"Bomb_Max":1,"ItemBox_Min":2,"ItemBox_Max":3,"DamageTime":14,"CompleteArea":0.65},{"Index":10,"StartNumber":101,"BallTotalCount":12,"Bomb_Min":1,"Bomb_Max":1,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":15,"CompleteArea":0.6},{"Index":11,"StartNumber":111,"BallTotalCount":13,"Bomb_Min":1,"Bomb_Max":1,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":16,"CompleteArea":0.55},{"Index":12,"StartNumber":121,"BallTotalCount":14,"Bomb_Min":1,"Bomb_Max":1,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":17,"CompleteArea":0.5},{"Index":13,"StartNumber":131,"BallTotalCount":8,"Bomb_Min":2,"Bomb_Max":2,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":18,"CompleteArea":0.75},{"Index":14,"StartNumber":141,"BallTotalCount":9,"Bomb_Min":2,"Bomb_Max":2,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":19,"CompleteArea":0.7},{"Index":15,"StartNumber":151,"BallTotalCount":10,"Bomb_Min":2,"Bomb_Max":2,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":20,"CompleteArea":0.65},{"Index":16,"StartNumber":161,"BallTotalCount":11,"Bomb_Min":2,"Bomb_Max":2,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":21,"CompleteArea":0.6},{"Index":17,"StartNumber":171,"BallTotalCount":12,"Bomb_Min":2,"Bomb_Max":2,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":22,"CompleteArea":0.55},{"Index":18,"StartNumber":181,"BallTotalCount":13,"Bomb_Min":2,"Bomb_Max":2,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":23,"CompleteArea":0.5},{"Index":19,"StartNumber":191,"BallTotalCount":7,"Bomb_Min":3,"Bomb_Max":3,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":24,"CompleteArea":0.75},{"Index":20,"StartNumber":201,"BallTotalCount":8,"Bomb_Min":3,"Bomb_Max":3,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":25,"CompleteArea":0.7},{"Index":21,"StartNumber":211,"BallTotalCount":9,"Bomb_Min":3,"Bomb_Max":3,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":26,"CompleteArea":0.65},{"Index":22,"StartNumber":221,"BallTotalCount":10,"Bomb_Min":3,"Bomb_Max":3,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":27,"CompleteArea":0.6},{"Index":23,"StartNumber":231,"BallTotalCount":11,"Bomb_Min":3,"Bomb_Max":3,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":28,"CompleteArea":0.55},{"Index":24,"StartNumber":241,"BallTotalCount":12,"Bomb_Min":3,"Bomb_Max":3,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":29,"CompleteArea":0.5},{"Index":25,"StartNumber":251,"BallTotalCount":6,"Bomb_Min":4,"Bomb_Max":4,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":30,"CompleteArea":0.75},{"Index":26,"StartNumber":261,"BallTotalCount":7,"Bomb_Min":4,"Bomb_Max":4,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":31,"CompleteArea":0.7},{"Index":27,"StartNumber":271,"BallTotalCount":8,"Bomb_Min":4,"Bomb_Max":4,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":32,"CompleteArea":0.65},{"Index":28,"StartNumber":281,"BallTotalCount":9,"Bomb_Min":4,"Bomb_Max":4,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":33,"CompleteArea":0.6},{"Index":29,"StartNumber":291,"BallTotalCount":10,"Bomb_Min":4,"Bomb_Max":4,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":34,"CompleteArea":0.55},{"Index":30,"StartNumber":301,"BallTotalCount":11,"Bomb_Min":4,"Bomb_Max":4,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":35,"CompleteArea":0.5},{"Index":31,"StartNumber":311,"BallTotalCount":5,"Bomb_Min":5,"Bomb_Max":5,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":36,"CompleteArea":0.75},{"Index":32,"StartNumber":321,"BallTotalCount":6,"Bomb_Min":5,"Bomb_Max":5,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":37,"CompleteArea":0.7},{"Index":33,"StartNumber":331,"BallTotalCount":7,"Bomb_Min":5,"Bomb_Max":5,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":38,"CompleteArea":0.65},{"Index":34,"StartNumber":341,"BallTotalCount":8,"Bomb_Min":5,"Bomb_Max":5,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":39,"CompleteArea":0.6},{"Index":35,"StartNumber":351,"BallTotalCount":9,"Bomb_Min":5,"Bomb_Max":5,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":40,"CompleteArea":0.55},{"Index":36,"StartNumber":361,"BallTotalCount":10,"Bomb_Min":5,"Bomb_Max":5,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":41,"CompleteArea":0.5}],"MonthsBackground":[{"Index":0,"topBG":"bg_top_01.png","bottomBG":"bg_bottom_01.png","pencil":"pencil_2.png","mainBG":"BG_11.png"},{"Index":1,"topBG":"bg_top_01.png","bottomBG":"bg_bottom_01.png","pencil":"pencil_2.png","mainBG":"BG_11.png"},{"Index":2,"topBG":"bg_top_02.png","bottomBG":"bg_bottom_02.png","pencil":"pencil_3.png","mainBG":"BG_12.png"},{"Index":3,"topBG":"bg_top_03.png","bottomBG":"bg_bottom_03.png","pencil":"pencil_4.png","mainBG":"BG_13.png"},{"Index":4,"topBG":"bg_top_04.png","bottomBG":"bg_bottom_04.png","pencil":"pencil_5.png","mainBG":"BG_14.png"},{"Index":5,"topBG":"bg_top_05.png","bottomBG":"bg_bottom_05.png","pencil":"pencil_6.png","mainBG":"BG_15.png"},{"Index":6,"topBG":"bg_top_06.png","bottomBG":"bg_bottom_06.png","pencil":"pencil_7.png","mainBG":"BG_16.png"},{"Index":7,"topBG":"bg_top_07.png","bottomBG":"bg_bottom_07.png","pencil":"pencil_8.png","mainBG":"BG_17.png"},{"Index":8,"topBG":"bg_top_08.png","bottomBG":"bg_bottom_08.png","pencil":"pencil_9.png","mainBG":"BG_18.png"},{"Index":9,"topBG":"bg_top_09.png","bottomBG":"bg_bottom_09.png","pencil":"pencil_10.png","mainBG":"BG_19.png"},{"Index":10,"topBG":"bg_top_10.png","bottomBG":"bg_bottom_10.png","pencil":"pencil_11.png","mainBG":"BG_110.png"},{"Index":11,"topBG":"bg_top_11.png","bottomBG":"bg_bottom_11.png","pencil":"pencil_12.png","mainBG":"BG_111.png"},{"Index":12,"topBG":"bg_top_12.png","bottomBG":"bg_bottom_12.png","pencil":"pencil_3.png","mainBG":"BG_112.png"},{"Index":13,"topBG":"bg_top_01.png","bottomBG":"bg_bottom_01.png","pencil":"pencil_12.png","mainBG":"BG_21.png"},{"Index":14,"topBG":"bg_top_02.png","bottomBG":"bg_bottom_02.png","pencil":"pencil_10.png","mainBG":"BG_22.png"},{"Index":15,"topBG":"bg_top_03.png","bottomBG":"bg_bottom_03.png","pencil":"pencil_4.png","mainBG":"BG_23.png"},{"Index":16,"topBG":"bg_top_04.png","bottomBG":"bg_bottom_04.png","pencil":"pencil_10.png","mainBG":"BG_24.png"},{"Index":17,"topBG":"bg_top_05.png","bottomBG":"bg_bottom_05.png","pencil":"pencil_7.png","mainBG":"BG_25.png"},{"Index":18,"topBG":"bg_top_06.png","bottomBG":"bg_bottom_06.png","pencil":"pencil_4.png","mainBG":"BG_26.png"},{"Index":19,"topBG":"bg_top_07.png","bottomBG":"bg_bottom_07.png","pencil":"pencil_8.png","mainBG":"BG_27.png"},{"Index":20,"topBG":"bg_top_08.png","bottomBG":"bg_bottom_08.png","pencil":"pencil_9.png","mainBG":"BG_28.png"},{"Index":21,"topBG":"bg_top_09.png","bottomBG":"bg_bottom_09.png","pencil":"pencil_8.png","mainBG":"BG_29.png"},{"Index":22,"topBG":"bg_top_10.png","bottomBG":"bg_bottom_10.png","pencil":"pencil_3.png","mainBG":"BG_210.png"},{"Index":23,"topBG":"bg_top_11.png","bottomBG":"bg_bottom_11.png","pencil":"pencil_7.png","mainBG":"BG_211.png"},{"Index":24,"topBG":"bg_top_12.png","bottomBG":"bg_bottom_12.png","pencil":"pencil_2.png","mainBG":"BG_212.png"},{"Index":25,"topBG":"bg_top_01.png","bottomBG":"bg_bottom_01.png","pencil":"pencil_10.png","mainBG":"BG_31.png"},{"Index":26,"topBG":"bg_top_02.png","bottomBG":"bg_bottom_02.png","pencil":"pencil_12.png","mainBG":"BG_32.png"},{"Index":27,"topBG":"bg_top_03.png","bottomBG":"bg_bottom_03.png","pencil":"pencil_9.png","mainBG":"BG_33.png"},{"Index":28,"topBG":"bg_top_04.png","bottomBG":"bg_bottom_04.png","pencil":"pencil_5.png","mainBG":"BG_34.png"},{"Index":29,"topBG":"bg_top_05.png","bottomBG":"bg_bottom_05.png","pencil":"pencil_6.png","mainBG":"BG_35.png"},{"Index":30,"topBG":"bg_top_06.png","bottomBG":"bg_bottom_06.png","pencil":"pencil_7.png","mainBG":"BG_36.png"},{"Index":31,"topBG":"bg_top_07.png","bottomBG":"bg_bottom_07.png","pencil":"pencil_9.png","mainBG":"BG_37.png"},{"Index":32,"topBG":"bg_top_08.png","bottomBG":"bg_bottom_08.png","pencil":"pencil_3.png","mainBG":"BG_38.png"},{"Index":33,"topBG":"bg_top_09.png","bottomBG":"bg_bottom_09.png","pencil":"pencil_10.png","mainBG":"BG_39.png"},{"Index":34,"topBG":"bg_top_10.png","bottomBG":"bg_bottom_10.png","pencil":"pencil_8.png","mainBG":"BG_310.png"},{"Index":35,"topBG":"bg_top_11.png","bottomBG":"bg_bottom_11.png","pencil":"pencil_9.png","mainBG":"BG_311.png"},{"Index":36,"topBG":"bg_top_12.png","bottomBG":"bg_bottom_12.png","pencil":"pencil_1.png","mainBG":"BG_312.png"}],"CompleteArea":"0.6999","FeverSuccessArea":"1","DefaultTimeCount":60,"OnePercentAddTime":0.25,"DefaultHeartCount":0,"ContinueHeartCount":3,"HurryUPTimeCount":10,"BallMaxCount":10,"NormalBallSpeed":250,"FastBallSpeed":400,"SlowBallSpeed":100,"SplitBallSpeed":125,"BlinkBallSpeed":150,"BombBallSpeed":1000,"BuffBallSpeed":300,"BuffCreation":"random","DefaultJewelryCount":10,"TimeItemPayCount":0.3,"SlowItemPayCount":0.2,"LifeItemPayCount":0.1,"SlowItemSkill":0.8,"LifeItemSkill":3,"Shake_intensity":0.05,"Shake_duration":70,"BombPower":100,"NoShieldDamage":10,"NormalBallPoint":1,"FastBallPoint":1,"SlowBallPoint":0.5,"SplitBallPoint":2,"BlinkBallPoint":1,"FeverJumpStageCount":5,"StopSkillTime":7,"StopSkillBlinkTime":1.5,"SuperRatio":30,"StopRatio":30,"ShieldRatio":15,"TimeUpRatio":15,"FeverRatio":10,"DrawLine_Speed":25,"DrawMask_Speed":30}';

var tbString_json = '{"Item_Description":{"en":"A child who helps the gameFit the system","jp":"A child who helps the gameFit the system","kr":"A child who helps the gameFit the system"},"Passive_Item01_Name":{"en":"TIME","jp":"TIME","kr":"TIME"},"Passive_Item02_Name":{"en":"SLOW","jp":"SLOW","kr":"SLOW"},"Passive_Item03_Name":{"en":"SHIELD","jp":"SHIELD","kr":"SHIELD"},"Passive_Item01_Explanation":{"en":"Maximum time {E} {V} seconds added","jp":"Maximum time {E} {V} seconds added","kr":"Maximum time {E} {V} seconds added"},"Passive_Item02_Explanation":{"en":"Reduced blockage {E} {V}%","jp":"Reduced blockage {E} {V}%","kr":"Reduced blockage {E} {V}%"},"Passive_Item03_Explanation":{"en":"Added {V} shields","jp":"Added {V} shields {V}","kr":"Added {V} shields {V}"},"Release":{"en":"release","jp":"release","kr":"release"},"Stage_Select":{"en":"Using gems {E} Starting at the selected LEVEL?","jp":"Using gems {E} Starting at the selected LEVEL?","kr":"Using gems {E} Starting at the selected LEVEL?"},"Stage_Open":{"en":"From now on, you can select {V} LEVEL and start it.","jp":"From now on, you can select {V} LEVEL and start it.","kr":"From now on, you can select {V} LEVEL and start it."},"Stage_Continue":{"en":"Would you like to charge up {E} time with your gem? {E} (bonus: Shield + {V} shipped)","jp":"Would you like to charge up {E} time with your gem? {E} (bonus: Shield + {V} shipped)","kr":"Would you like to charge up {E} time with your gem? {E} (bonus: Shield + {V} shipped)"},"GEM_Shop":{"en":"Jewelry store","jp":"Jewelry Store","kr":"Jewelry Store"},"Login":{"en":"login","jp":"login","kr":"login"},"Members":{"en":"Members Only","jp":"Members Only","kr":"Members Only"},"AD":{"en":"AD","jp":"AD","kr":"AD"},"GEM_Get":{"en":"You have {V} gems.","jp":"You have {V} gems.","kr":"You have {V} gems."},"Purchase_Complete":{"en":"Your purchase is complete!","jp":"Your purchase is complete!","kr":"Your purchase is complete!"},"Error":{"en":"The network connection is not smooth. {E} Restart the game.","jp":"The network connection is not smooth. {E} Restart the game.","kr":"The network connection is not smooth. {E} Restart the game."},"YES":{"en":"Yes","jp":"Yes","kr":"Yes"},"NO":{"en":"No","jp":"No","kr":"No"},"Connection_Error":{"en":"Your network connection is not good. {E} Are you sure you want to try again?","jp":"Your network connection is not good. {E} Are you sure you want to try again?","kr":"Your network connection is not good. {E} Are you sure you want to try again?"},"GEM_None":{"en":"{E} Would you like to charge it?","jp":"{E} Would you like to charge it?","kr":"{E} Would you like to charge it?"},"Tuto_01":{"en":"If you slide horizontally or vertically,\\n the boundary line is drawn.","jp":"If you slide horizontally or vertically, the {E} boundary line is drawn.","kr":"If you slide horizontally or vertically, the {E} boundary line is drawn."},"Tuto_02_1":{"en":"Occupy the area","jp":"If you are till the end","kr":"If you are till the end"},"Tuto_02_2":{"en":"except the ball.","jp":"The screen is free of obstructions and has a different color!","kr":"방해물이 없는 화면에{E}다른색이 칠해져요!"},"Tuto_03":{"en": "When the screen is painted as\\n much as the scope of the mission,\\n the mission is completed!~","jp":"When the {E} screen is painted as much as the mission\'s scope, the mission is completed!{E}go to the next level~","kr":"When the {E} screen is painted as much as the mission\'s scope, the mission is completed!{E}go to the next level~"},"Tuto_04":{"en":"Watch out! When you hit with\\n the obstacles when the border is\\n drawn, time is reduced!","jp":"Watch out! {E} When you hit {E} with the obstacles when the border is drawn, time is reduced!","kr":"Watch out! {E} When you hit {E} with the obstacles when the border is drawn, time is reduced!"},"Tuto_05":{"en":"When the time is up, the game\\n is over.","jp":"{E} When the time is up, the game is over.","kr":"{E} When the time is up, the game is over."},"Tuto_06":{"en":"The roaming item box can only\\n be obtained if is in the colored\\n screen.","jp":"The roaming item box can only be obtained if {E} is in the colored screen.","kr":"The roaming item box can only be obtained if {E} is in the colored screen."},"Tuto_07":{"en":"Spring, Summer, Fall and Winter\\nEnjoy the four seasons and try\\n as high as you can!","jp":"Spring, Summer, Fall and Winter Enjoy {E} the four seasons and try as high as you can {E}!","kr":"Spring, Summer, Fall and Winter Enjoy {E} the four seasons and try as high as you can {E}!"},"SUPER":{"en":"The line is drawn invincible one time!","jp":"The line is drawn invincible one time!","kr":"The line is drawn invincible one time!"},"STOP":{"en":"Blockage stops {V} seconds!","jp":"Blockage stops {V} seconds!","kr":"Blockage stops {V} seconds!"},"Goto_Home":{"en":"Would you like to give up\\n the game?","jp":"Would you like to give up the game?","kr":"Would you like to give up the game?"},"MustTuto_01":{"en":"If you slide horizontally or vertically, the {E} boundary line is drawn.{E}{E}where your fingers move{E}try the same thing!","jp":"If you slide horizontally or vertically, the {E} boundary line is drawn.{E}{E}where your fingers move{E}try the same thing!","kr":"If you slide horizontally or vertically, the {E} boundary line is drawn.{E}{E}where your fingers move{E}try the same thing!"},"MustTuto_02":{"en":"good! {E} {E} {E} If you do not hit the obstacle, {E} If you are till the end!","jp":"good! {E} {E} {E} If you do not hit the obstacle, {E} If you are till the end!","kr":"good! {E} {E} {E} If you do not hit the obstacle, {E} If you are till the end!"},"MustTuto_03":{"en":"Split screen {E} Screen without blur is colored {E} differently!","jp":"Split screen {E} Screen without blur is colored {E} differently!","kr":"Split screen {E} Screen without blur is colored {E} differently!"},"MustTuto_04":{"en":"When the {E} screen is painted as much as the mission\'s scope, the mission is completed!{E}{E}color the remaining area.{E}go to the next level~!","jp":"When the {E} screen is painted as much as the mission\'s scope, the mission is completed!{E}{E}color the remaining area.{E}go to the next level~!","kr":"When the {E} screen is painted as much as the mission\'s scope, the mission is completed!{E}{E}color the remaining area.{E}go to the next level~!"}}';
Define.tbString = JSON.parse(tbString_json);
Define.fontStyle = 'Arial';//'HYDNKB';//HYDNKB';
Define.fontStyleTitle = 'Arial';//'HYDNKB';//'Arial';

function GetString(key, data)
{
    /*switch(Define.LANGUAGE)
    {
        case Enum.LANGUAGE.english:*/
            if(data === undefined)
                return Define.tbString[key].en.replace(/{E}/gi, "\n");
            else
                return Define.tbString[key].en.replace("{V}", data.toString()).replace(/{E}/gi, "\n");
     /*       break;
        case Enum.LANGUAGE.japan:
            if(data === undefined)
                return Define.tbString[key].jp.replace(/{E}/gi, "\n");
            else
                return Define.tbString[key].jp.replace("{V}", data.toString()).replace(/{E}/gi, "\n");
            break;
        case Enum.LANGUAGE.korea:
            if(data === undefined)
                return Define.tbString[key].kr.replace(/{E}/gi, "\n");
            else
                return Define.tbString[key].kr.replace("{V}", data.toString()).replace(/{E}/gi, "\n");
            break;
    }
    return "";*/
}
