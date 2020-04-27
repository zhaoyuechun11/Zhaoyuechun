Define = function () {};

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
Define.GIDX = 25;       // 펭귄 구조대
Define.SAVE_VER = 1;    // 세이브버젼
Define.IMG_VER = 1;     // 이미지 버젼
Define.SND_VER = 1;     // 사운드 버젼
Define.SPINE_VER = 1;	// 스파인 버젼
Define.SERVICE = Enum.SERVICE_CODE.MOVI_KR; // 접속경로를 설정한다.
Define.strGamePath = "";    // 게임url을 셋팅한다. : 야후에 런칭할때 필요함
Define.DEVICE = Enum.DEVICE_STATE.PC;
Define.LANGUAGE = Enum.LANGUAGE.EN;


//https://docs.google.com/spreadsheets/d/e/2PACX-1vSI10icWxXkF37grlNGxFo6rnssk13yVe2VAF7B8peD8FKDnU56R_1etl34k1aIoTFMilE662UKyo5r/pubhtml?gid=1189915267&single=true
//https://docs.google.com/spreadsheets/d/1EuCUI5_Yr-GHXl8l2uoXSthQL_dXQUQlZcKTrLCXK2U/edit?usp=sharing
//https://docs.google.com/spreadsheets/d/e/2PACX-1vSGr3WZOLh4uW2R4gEKOCoSQMM37gYV142hRVD-jAKzbZYa2d8S6ywIAKcgR3N3YDCSg0FgyIxsA2en/pubhtml

Define.GOOGLE_SHEETS_DATA = true;
Define.GOOGLE_SPREADSHEET_ID = "1dO8D17Xq2Xb9pV34YBNn5NWVp5hep6Bq2UC08g5Sfws";
Define.SHEET_LOCAL_STRING = 'json: {"game":{"en":"GAME","jp":"ゲーム","kr":"game"},"start":{"en":"START","jp":"スタト","kr":"gamestart"},"tuto_1":{"en":"Move the blocks{E}to escape the whale{E}on the penguin.","jp":"펭귄이 타고 있는 고래가 탈출구로{E}빠져 나갈 수 있도록{E}블록들을 옮겨주세요.","kr":"펭귄이 타고 있는 고래가 탈출구로{E}빠져 나갈 수 있도록{E}블록들을 옮겨주세요."},"reGame":{"en":"Stage again{E}Do you want to play?","jp":"Stage again{E}Do you want to play?","kr":"Stage again{E}Do you want to play?"},"heart":{"en":"Would you like to purchase the {E} hint by consuming the heart? {E} The hint will be applied immediately.","jp":"Would you like to purchase the {E} hint by consuming the heart? {E} The hint will be applied immediately.","kr":"Would you like to purchase the {E} hint by consuming the heart? {E} The hint will be applied immediately."},"exitGame":{"en":"Would you like to exit {E} to the stage selection screen? ","jp":"Would you like to exit {E} to the stage selection screen? ","kr":"Would you like to exit {E} to the stage selection screen? "}}';

var tbString_json =  '{"game":{"en":"GAME","ja":"ゲーム","ko":"game"},"start":{"en":"START","ja":"スタト","ko":"gamestart"},"":{"en":"Please take the baby penguins \\nout of the egg!","ja":"Please take the baby penguins out of the egg!","ko":"Please take the baby penguins out of the egg!"},"":{"en":"I need you to rescue the glacier\\n trapped eggs.!","ja":"I need you to rescue the glacier trapped eggs.!","ko":"I need you to rescue the glacier trapped eggs.!"},"tuto_1":{"en":"Move the glaciers so the rescue team\\ncan escape safely with the egg to the escape! ","ja":"Move the glaciers so the rescue team can escape safely with the egg to the escape! ","ko":"Move the glaciers so the rescue team can escape safely with the egg to the escape! "},"reGame":{"en":"Will you challenge again?","ja":"Will you challenge again?","ko":"Will you challenge again?"},"heart":{"en":"Would you like to use the heart \\nto see the hint? "," Ja ":" Would you like to see the hint using the heart?","ko":"광고를 시청하고{E}힌트를 사용할까요?"},"exitGame":{"en":"Move to the stage selection screen?","ja":"Move to the stage selection screen?","ko":"Move to the stage selection screen?"},"baby_1":{"en":"Lovely penguin","ja":"Lovely penguin","ko":"Lovely penguin"},"baby_2":{"en":"Artist Penguin","ja":"Artist Penguin","ko":"Artist Penguin"},"baby_3":{"en":"Royal Penguin","ja":"Royal Penguin","ko":"Royal Penguin"},"baby_4":{"en":"Carrot penguin","ja":"Carrot penguin","ko":"Carrot penguin"},"baby_5":{"en":"Princess Penguin","ja":"Princess Penguin","ko":"Princess Penguin"},"baby_6":{"en":" Angry penguin","ja":" Angry penguin","ko":" Angry penguin"},"baby_7":{"en":"Rapper penguin","ja":"Rapper penguin","ko":"Rapper penguin"},"baby_8":{"en":"A cowardly penguin","ja":"A cowardly penguin","ko":"A cowardly penguin"},"baby_9":{"en":"Doctor Penguin","ja":"Doctor Penguin","ko":"Doctor Penguin"},"baby_10":{"en":"An obnoxious penguin","ja":"An obnoxious penguin","ko":"An obnoxious penguin"},"baby_1_profile":{"en":"I gathered all the loveliness of the world \\ntogether! Charming point of flowers!","ja":"I gathered all the loveliness\\n of the world together! \\nCharming point of flowers!","ko":"I gathered all the loveliness of the world together! Charming point of flowers!"},"baby_2_profile":{"en":"The road to art is long and the life \\nof the penguins is short. "," ja ":" The road to art is long, and the life of the penguin is short ... ","ko":"예술의 길은 길고{E}펭귄의 삶은 짧아요…"},"baby_3_profile":{"en":"It is noble, different from other \\npenguins!It is pure blood. Atheem!","ja":"It is noble, different from other penguins! It is pure blood. Atheem!","ko":"It is noble, different from other penguins! It is pure blood. Atheem!"},"baby_4_profile":{"en":"I fell in love with my first tasty \\ncarrot, but I\'m not a vegetarian!","ja":"I fell in love with my first tasty carrot,\\n but I\'m not a vegetarian!","ko":"I fell in love with my first tasty carrot, but I\'m not a vegetarian!"},"baby_5_profile":{"en":"I do not have a glacier that can \\nstop the road in front of the princess! Dig it! "," Ja ":" There is no glacier to stop the princess\'s road!","ko":"공주님의 앞 길을{E}막을 수 있는 빙하는 없어요!{E}물럿거라!"},"baby_6_profile":{"en":"Handle with care! I\'m always upset!\\n Maybe he\'s squatting in his beak!","ja":"Handle with care! I\'m always upset! Maybe he\'s squatting in his beak!","ko":"Handle with care! I\'m always upset! Maybe he\'s squatting in his beak!"},"baby_7_profile":{"en":"Oh~ It\'s a penguin who can play?","ja":"Oh~ It\'s a penguin who can play.?","ko":"Oh~ It\'s a penguin who can play.?"},"baby_8_profile":{"en":"I\'ll cry if you smuggle it in the back!\\n There are too many scary things. Hing ...","ja":"I\'ll cry if you smuggle it in the back! There are too many scary things. Hing ...","ko":"I\'ll cry if you smuggle it in the back! There are too many scary things. Hing ..."},"baby_9_profile":{"en":"I do not know anything about it!\\n But the calculator is more comfortable.","ja":"I do not know anything about it! But the calculator is more comfortable.","ko":"I do not know anything about it! But the calculator is more comfortable."},"baby_10_profile":{"en":"I\'m trapped in the body of a small penguin, \\nbut I think is a big whale! ....","ja":"I\'m trapped in the body of a small penguin, but I think is a big whale! ....","ko":"I\'m trapped in the body of a small penguin, but I think is a big whale! ...."}}';
Define.tbString = JSON.parse(tbString_json);

function GetString(key, data)
{
    switch(Define.LANGUAGE)
    {
        case Enum.LANGUAGE.EN:
            if(data === undefined)
                return Define.tbString[key].en.replace(/{E}/gi, "\n");
            else
                return Define.tbString[key].en.replace("{V}", data.toString()).replace(/{E}/gi, "\n");
            break;
        case Enum.LANGUAGE.JP:
            if(data === undefined)
                return Define.tbString[key].ja.replace(/{E}/gi, "\n");
            else
                return Define.tbString[key].ja.replace("{V}", data.toString()).replace(/{E}/gi, "\n");
            break;
        case Enum.LANGUAGE.KR:
            if(data === undefined)
                return Define.tbString[key].ko.replace(/{E}/gi, "\n");
            else
                return Define.tbString[key].ko.replace("{V}", data.toString()).replace(/{E}/gi, "\n");
            break;
    }
    return "";
}
Define.LANDSCAPE = false;