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
	KR : 0,
	JP : 1,
	EN : 2,
};

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

Define.staticWidth  = window.innerWidth;
Define.staticHeight = window.innerHeight;

Define.LANDSCAPE = false;

Define.GIDX = 18;       // 다루마
Define.SAVE_VER = 1;    // 세이브버젼
Define.IMG_VER = 1;     // 이미지 버젼
Define.SND_VER = 1;     // 사운드 버젼
Define.SPINE_VER = 1;	// 스파인 버젼
Define.SERVICE = Enum.SERVICE_CODE.MOVI_KR; // 접속경로를 설정한다.
Define.strGamePath = "";    // 게임url을 셋팅한다. : 야후에 런칭할때 필요함
Define.DEVICE = Enum.DEVICE_STATE.PC;
Define.LANGUAGE = Enum.LANGUAGE.EN;



