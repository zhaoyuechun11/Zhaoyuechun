
Define = function () {
},
    Define.GIDX = 6,
    Define.NS_IMAGE_URL = "./atlas_ko/shop/";

var networkManager = new NetworkManager,
    iToadBase = 10,
    iToadHPIncreate = 2,
    iHeroRebirthCash = 10,
    iItemBaseDmg = 50,
    iItemBaseMoney = 100,
    fItemIncreateDmg = .52,
    fItemBuyMoney = .6,
    iSkillCashBase = [5, 5, 100, 50, 50, 20, 50],
    iSkillVauleLv0Division = 25,
    iSkillVauleLv1Division = 25,
    iSkillVauleIncreate = [20, 20, 100, 50, 1, 1e3, 10],
    iSkillVauleBase = [100, 100, 100, 200, 5, 1e3, 600],
    iSkillLvMax = [9999, 9999, 4, 9999, 45, 100, 50],
    fFeverTimeMax = 5,
    fADCreateTime = 60,
    fADViewTime = 10,
    fGoldShopADTimeMax = 1800,
    iAD1Create = 30,
    iCashChargeValues = [1e3, 1e4, 1e3, 1500],
    GOLDSHOP_STATUS_1 = 8,
    GOLDSHOP_STATUS_2 = 12,
    GOLDSHOP_STATUS_3 = 800,
    GOLDSHOP_MONEY = [10, .6, .9, 1.3, 1.8],
    tbString_json = '{"goldshopADBtn":{"en":"OK","ja":"OK","ko":"OK"},"gemshopRebirth":{"en":"If you start a new one{E}you will get the jewels{E}necessary to raise{E}your ability.","ja":"新しく始めると{E}能力値上昇に{E}必要な宝石が得られます。","ko":"새로 시작하면 능력치{E}상승에 필요한{E}보석을 얻습니다."},"gemshopRebirthBtn":{"en":"Reincarnate","ja":"転生","ko":"환생"},"NO":{"en":"Cancel","ja":"キャンセル","ko":"취소"},"gemshopM0":{"en":"Shuriken{E}Damage Amplification","ja":"手裏剣{E}ダメージ増幅","ko":"수리검{E}데미지 증폭"},"gemshopM1":{"en":"Kunei{E}Damage Amplification","ja":"クナイ{E}ダメージ増幅","ko":"쿠나이{E}데미지 증폭"},"gemshopM2":{"en":"Shadow{E}Speed Amplification","ja":"影{E}速度増幅","ko":"그림자{E}속도 증폭"},"gemshopM3":{"en":"Shuriken{E}Critical Amplification","ja":"手裏剣{E}クリティカル増幅","ko":"수리검{E}크리티컬 증폭"},"gemshopM4":{"en":"Shuriken{E}Critical Probability","ja":"手裏剣{E}クリティカル・確率","ko":"수리검{E}크리티컬 확률"},"gemshopM5":{"en":"Ninja{E}Damage Amplification","ja":"忍法{E}被害量増幅","ko":"인법{E}피해량 증폭"},"gemshopM6":{"en":"Ninja{E}Gauge Shortening","ja":"忍法{E}ゲージ短縮","ko":"인법{E}게이지 단축"},"TAP":{"en":"TAP","ja":"TAP","ko":"TAP"},"LvUP":{"en":"Lv UP","ja":"Lv UP","ko":"Lv UP"},"MAX":{"en":"MAX","ja":"MAX","ko":"MAX"},"DMG":{"en":"DMG","ja":"DMG","ko":"DMG"},"AddCash":{"en":"Acquired gems","ja":"獲得宝石","ko":"획득보석"},"AddGold":{"en":"Acquisition","ja":"獲得ゴールド","ko":"획득 골드"},"AddGauge":{"en":"Ninja gauge increase","ja":"忍法ゲージ増加","ko":"인법게이지증가"},"AddToadHP":{"en":"Reduced physical strength of Hiki Kael","ja":"ヒキカエルの体力減少","ko":"두꺼비체력감소"},"Notice":{"en":"Caution","ja":"注意","ko":"주 의"},"NoticeAD":{"en":"The compensation disappears when the window is closed.","ja":"ウィンドウを閉じると補償が消えます。","ko":"창을닫으면보상이사라집니다."},"RebirthContents":{"en":"If you start out newly,{E}gold, shuriken, kunei, toad level{E} will be initialized.{E}{E} Ability value purchased at{E}jewelry and jewelry shop is maintained.{E}{E}Do you really want to start a new one?","ja":"新しく始めれば{E}ゴールド、手裏剣、クナイ、ヒキガエルレベルが{E}初期化されます。{E}{E}宝石と宝石ショップで購入した{E}能力値は維持されます。{E}{E}本当に新たに始めますか。","ko":"새로시작하면{E}골드,수리검,쿠나이,두꺼비레벨이{E}초기화됩니다.{E}{E}보석과 보석샵에서 구매한{E}능력치는유지됩니다.{E}{E}정말새로시작하시겠습니까?"},"Reward":{"en":"OK","ja":"補償。","ko":"보상받기"},"optionT0":{"en":"Total Gold","ja":"トータルゴールド","ko":"총 골드"},"optionT1":{"en":"Total treasure","ja":"トータル宝","ko":"총 보석"},"optionT2":{"en":"Total Clicks","ja":"トータルクリック数","ko":"총 클릭수"},"optionT3":{"en":"Total Reincarnate","ja":"トータル転生回数","ko":"총 환생 횟수"},"optionT4":{"en":"Total blown toad number","ja":"トータル撃破ヒキガエル数","ko":"총 격파 두꺼비 수"},"optionT5":{"en":"Best toad level","ja":"最高ヒキガエルレベル","ko":"최고 두꺼비 레벨"},"optionT6":{"en":"The best Shuriken level","ja":"最高手裏剣レベル","ko":"최고 수리검 레벨"},"optionT7":{"en":"The best Kunei level","ja":"最高クナイレベル","ko":"최고 쿠나이 레벨"},"Shuriken1":{"en":"Iron Shuriken","ja":"鉄の手裏剣","ko":"아연 십자 수리검"},"Shuriken2":{"en":"Bronze shuriken","ja":"青銅の手裏剣","ko":"구리 십자 수리검"},"Shuriken3":{"en":"Black steel shuriken","ja":"黒鋼の手裏剣","ko":"철 십자 수리검"},"Shuriken4":{"en":"Shuriken\'s Shuriken","ja":"白銀の手裏剣","ko":"은 십자 수리검"},"Shuriken5":{"en":"Golden shuriken","ja":"黄金の手裏剣","ko":"금 십자 수리검"},"Shuriken6":{"en":"Jade Shuriken","ja":"翡翠の手裏剣","ko":"터키석 십자 수리검"},"Shuriken7":{"en":"Kurama no Shuriken","ja":"黄玉の手裏剣","ko":"토파즈 십자 수리검"},"Shuriken8":{"en":"Pearl shuriken","ja":"真珠の手裏剣","ko":"진주 십자 수리검"},"Shuriken9":{"en":"Shuriken with indigo","ja":"藍玉の手裏剣","ko":"아쿠아 마린 십자 수리검"},"Shuriken10":{"en":"Shuriken Stars","ja":"柘榴石の手裏剣","ko":"가넷 십자 수리검"},"Shuriken11":{"en":"Prosthetic shuriken","ja":"蛋白石の手裏剣","ko":"오팔 십자 수리검"},"Shuriken12":{"en":"Purple Crystal Shuriken","ja":"紫水晶の手裏剣","ko":"자수정 십자 수리검"},"Shuriken13":{"en":"Golden-green stone shuriken","ja":"金緑石の手裏剣","ko":"페리도트 십자 수리검"},"Shuriken14":{"en":"Aoto\'s shuriken","ja":"蒼玉の手裏剣","ko":"사파이어 십자 수리검"},"Shuriken15":{"en":"Raspe no Shuriken","ja":"紅玉の手裏剣","ko":"루비 십자 수리검"},"Shuriken16":{"en":"Shuriken\'s Shuriken","ja":"翠玉の手裏剣","ko":"에메랄드 십자 수리검"},"Shuriken17":{"en":"Bamboo shuriken","ja":"金剛石の手裏剣","ko":"다이아 십자 수리검"},"Shuriken18":{"en":"Iga Shuriken","ja":"伊賀手裏剣","ko":"이가 십자 수리검"},"Shuriken19":{"en":"Koka Shuriken","ja":"甲賀手裏剣","ko":"코가 십자 수리검"},"Shuriken20":{"en":"Furankari Shuriken","ja":"風魔手裏剣","ko":"풍마 십자 수리검"},"Shuriken21":{"en":"Meishon\'s Shuriken","ja":"明王の手裏剣","ko":"주술 십자 수리검"},"Shuriken22":{"en":"Rainbow Shuriken","ja":"虹の手裏剣","ko":"전설의 십자 수리검"},"Shuriken23":{"en":"Windmaster Shuriken - Kai","ja":"風魔手裏剣-改","ko":"풍마 십자 수리검-改"},"Shuriken24":{"en":"Meishon\'s Shuriken - Reform","ja":"明王の手裏剣-改","ko":"주술 십자 수리검-改"},"Shuriken25":{"en":"Shuriken of the rainbow - reform","ja":"虹の手裏剣-改","ko":"전설의 십자 수리검-改"},"Shuriken26":{"en":"Iron awakening. Iron shuriken","ja":"覚醒. 鉄の手裏剣","ko":"각성. 아연 십자 수리검"},"Shuriken27":{"en":"Awakens. Bronze shuriken","ja":"覚醒. 青銅の手裏剣","ko":"각성. 구리 십자 수리검"},"Shuriken28":{"en":"Awakens. Black steel shuriken","ja":"覚醒. 黒鋼の手裏剣","ko":"각성. 철 십자 수리검"},"Shuriken29":{"en":"Awakening. Shirane no Shuriken","ja":"覚醒. 白銀の手裏剣","ko":"각성. 은 십자 수리검"},"Shuriken30":{"en":"Awakens: Golden shuriken","ja":"覚醒. 黄金の手裏剣","ko":"각성. 금 십자 수리검"},"Shuriken31":{"en":"Awakens. Jade shuriken","ja":"覚醒. 翡翠の手裏剣","ko":"각성. 터키석 십자 수리검"},"Shuriken32":{"en":"Awakens. Kurama no Shuriken","ja":"覚醒. 黄玉の手裏剣","ko":"각성. 토파즈 십자 수리검"},"Shuriken33":{"en":"Awakens: Pearl shuriken","ja":"覚醒. 真珠の手裏剣","ko":"각성. 진주 십자 수리검"},"Shuriken34":{"en":"Awakens. Indigo\'s shuriken","ja":"覚醒. 藍玉の手裏剣","ko":"각성. 아쿠아 마린 십자 수리검"},"Shuriken35":{"en":"Awakening. Shuriken Stemaster","ja":"覚醒. 柘榴石の手裏剣","ko":"각성. 가넷 십자 수리검"},"Shuriken36":{"en":"Arousal. Prosthetic turkmen","ja":"覚醒. 蛋白石の手裏剣","ko":"각성. 오팔 십자 수리검"},"Shuriken37":{"en":"Awakens. Purple Crystal Shuriken","ja":"覚醒. 紫水晶の手裏剣","ko":"각성. 자수정 십자 수리검"},"Shuriken38":{"en":"Awakens. Golden-green stone shuriken","ja":"覚醒. 金緑石の手裏剣","ko":"각성. 페리도트 십자 수리검"},"Shuriken39":{"en":"Awakening. Akita\'s shuriken","ja":"覚醒. 蒼玉の手裏剣","ko":"각성. 사파이어 십자 수리검"},"Shuriken40":{"en":"Awakening. Trademark of Ruby","ja":"覚醒. 紅玉の手裏剣","ko":"각성. 루비 십자 수리검"},"Shuriken41":{"en":"Awakens: Shuriken\'s Shuriken","ja":"覚醒. 翠玉の手裏剣","ko":"각성. 에메랄드 십자 수리검"},"Shuriken42":{"en":"Awakens. Trike sword stones","ja":"覚醒. 金剛石の手裏剣","ko":"각성. 다이아 십자 수리검"},"Shuriken43":{"en":"Awakens. Iga Shuriken","ja":"覚醒. 伊賀手裏剣","ko":"각성. 이가 십자 수리검"},"Shuriken44":{"en":"Awakens. Koka Shuriken","ja":"覚醒. 甲賀手裏剣","ko":"각성. 코가 십자 수리검"},"Shuriken45":{"en":"Awakens. Fumigari","ja":"覚醒. 風魔手裏剣","ko":"각성. 풍마 십자 수리검"},"Shuriken46":{"en":"Awakens. Meishon\'s Shuriken","ja":"覚醒. 明王の手裏剣","ko":"각성. 주술 십자 수리검"},"Shuriken47":{"en":"Awakens. Rainbow Shuriken","ja":"覚醒. 虹の手裏剣","ko":"각성. 전설의 십자 수리검"},"Shuriken48":{"en":"Awakens. Fuma Shuriken - Kai","ja":"覚醒. 風魔手裏剣-改","ko":"각성. 풍마 십자 수리검-改"},"Shuriken49":{"en":"Awakens. Meishon\'s Shuriken - Reform","ja":"覚醒. 明王の手裏剣-改","ko":"각성. 주술 십자 수리검-改"},"Shuriken50":{"en":"Rainbow Shuriken - Kai","ja":"覚醒. 虹の手裏剣-改","ko":"각성. 전설의 십자 수리검-改"},"Shuriken51":{"en":"Shin. Iron\'s Shuriken","ja":"眞. 鉄の手裏剣","ko":"진. 아연 십자 수리검"},"Shuriken52":{"en":"Shin. Bronze shuriken","ja":"眞. 青銅の手裏剣","ko":"진. 구리 십자 수리검"},"Shuriken53":{"en":"Truth Black Steel Shuriken","ja":"眞. 黒鋼の手裏剣","ko":"진. 철 십자 수리검"},"Shuriken54":{"en":"Makoto Shuriken\'s Shuriken","ja":"眞. 白銀の手裏剣","ko":"진. 은 십자 수리검"},"Shuriken55":{"en":"Shin. Golden shuriken","ja":"眞. 黄金の手裏剣","ko":"진. 금 십자 수리검"},"Shuriken56":{"en":"Shinki jade shuriken","ja":"眞. 翡翠の手裏剣","ko":"진. 터키석 십자 수리검"},"Shuriken57":{"en":"Truth Shuriken\'s Shuriken","ja":"眞. 黄玉の手裏剣","ko":"진. 토파즈 십자 수리검"},"Shuriken58":{"en":"True Shuriken\'s Shuriken","ja":"眞. 真珠の手裏剣","ko":"진. 진주 십자 수리검"},"Shuriken59":{"en":"Shin. Indigo\'s Shuriken","ja":"眞. 藍玉の手裏剣","ko":"진. 아쿠아 마린 십자 수리검"},"Shuriken60":{"en":"Shuri Shuriken\'s Shuriken","ja":"眞. 柘榴石の手裏剣","ko":"진. 가넷 십자 수리검"},"Shuriken61":{"en":"Truth Shuriken Protein","ja":"眞. 蛋白石の手裏剣","ko":"진. 오팔 십자 수리검"},"Shuriken62":{"en":"Shin. Purple Crystal Shuriken","ja":"眞. 紫水晶の手裏剣","ko":"진. 자수정 십자 수리검"},"Shuriken63":{"en":"Shinku ginkgo stone shuriken","ja":"眞. 金緑石の手裏剣","ko":"진. 페리도트 십자 수리검"},"Shuriken64":{"en":"Truth Shuriken\'s Shuriken","ja":"眞. 蒼玉の手裏剣","ko":"진. 사파이어 십자 수리검"},"Shuriken65":{"en":"True Shuriken\'s Shuriken","ja":"眞. 紅玉の手裏剣","ko":"진. 루비 십자 수리검"},"Shuriken66":{"en":"Truth Shuriken\'s Shuriken","ja":"眞. 翠玉の手裏剣","ko":"진. 에메랄드 십자 수리검"},"Shuriken67":{"en":"True story of monk","ja":"眞. 金剛石の手裏剣","ko":"진. 다이아 십자 수리검"},"Shuriken68":{"en":"Makoto Iga Shuriken","ja":"眞. 伊賀手裏剣","ko":"진. 이가 십자 수리검"},"Shuriken69":{"en":"Makoto Kika Shuriken","ja":"眞. 甲賀手裏剣","ko":"진. 코가 십자 수리검"},"Shuriken70":{"en":"Makoto Hime","ja":"眞. 風魔手裏剣","ko":"진. 풍마 십자 수리검"},"Shuriken71":{"en":"Makoto\'s shuriken","ja":"眞. 明王の手裏剣","ko":"진. 주술 십자 수리검"},"Shuriken72":{"en":"Shin. Rainbow Shuriken","ja":"眞. 虹の手裏剣","ko":"진. 전설의 십자 수리검"},"Shuriken73":{"en":"Makoto Fuwa Shuriken - Kai","ja":"眞. 風魔手裏剣-改","ko":"진. 풍마 십자 수리검-改"},"Shuriken74":{"en":"True Shuriken\'s Shuriken - Kai","ja":"眞. 明王の手裏剣-改","ko":"진. 주술 십자 수리검-改"},"Shuriken75":{"en":"Shin. Rainbow Shuriken - Kai","ja":"眞. 虹の手裏剣-改","ko":"진. 전설의 십자 수리검-改"},"Kunai1":{"en":"Iron Kunei","ja":"鉄のクナイ","ko":"철 쿠나이"},"Kunai2":{"en":"Golden Kunei","ja":"黄金のクナイ","ko":"금 쿠나이"},"Kunai3":{"en":"Agate Kunei","ja":"瑪瑙のクナイ","ko":"마노 쿠나이"},"Kunai4":{"en":"Golden stone Kunei","ja":"砂金石のクナイ","ko":"어벤츄린 쿠나이"},"Kunai5":{"en":"Blood stone Kunei","ja":"血石のクナイ","ko":"블러드스톤 쿠나이"},"Kunai6":{"en":"Knei of mule of mule","ja":"紅玉髄のクナイ","ko":"카넬리안 쿠나이"},"Kunai7":{"en":"Green lead stone Kunei","ja":"緑鉛石のクナイ","ko":"에피도트 쿠나이"},"Kunai8":{"en":"Yellow Crystal Kunai","ja":"黄水晶のクナイ","ko":"골드 스톤 쿠나이"},"Kunai9":{"en":"Kayai of hematite","ja":"赤鉄鉱のクナイ","ko":"히머타이트 쿠나이"},"Kunai10":{"en":"Tsukishi no Kunei","ja":"月石のクナイ","ko":"래브라도라이트 쿠나이"},"Kunai11":{"en":"Rule\'s Kunai","ja":"瑠璃のクナイ","ko":"라피스 자줄리 쿠나이"},"Kunai12":{"en":"Tianhe\'s Kunai","ja":"天河のクナイ","ko":"라리마 쿠나이"},"Kunai13":{"en":"Knei of Tora eyes","ja":"虎目のクナイ","ko":"타이거 아이 쿠나이"},"Kunai14":{"en":"Kanei of an ascension stone","ja":"灰簾石のクナイ","ko":"탠저나이트 쿠나이"},"Kunai15":{"en":"Kinai of Iga","ja":"伊賀のクナイ","ko":"이가 쿠나이"},"Kunai16":{"en":"Kunei of Koka","ja":"甲賀のクナイ","ko":"코가 쿠나이"},"Kunai17":{"en":"Funeral Kunai","ja":"風魔のクナイ","ko":"풍마 쿠나이"},"Kunai18":{"en":"Ming Owner\'s Kunai","ja":"明王のクナイ","ko":"주술 쿠나이"},"Kunai19":{"en":"Rainbow Kunei","ja":"虹のクナイ","ko":"전설의 쿠나이"},"Kunai20":{"en":"Iron Kunei - Kai","ja":"鉄のクナイ-改","ko":"철 쿠나이-改"},"Kunai21":{"en":"Golden Kunei - Kai","ja":"黄金のクナイ-改","ko":"금 쿠나이-改"},"Kunai22":{"en":"Tsukishi no Kunai - Kai","ja":"月石のクナイ-改","ko":"래브라도라이트 쿠나이-改"},"Kunai23":{"en":"Kunei of Tora eyes - Kai","ja":"虎目のクナイ-改","ko":"타이거 아이 쿠나이-改"},"Kunai24":{"en":"Meiwa\'s Kunai - Kai","ja":"明王のクナイ-改","ko":"주술 쿠나이-改"},"Kunai25":{"en":"Rainbow Kune - Kai","ja":"虹のクナイ-改","ko":"전설의 쿠나이-改"},"Kunai26":{"en":"Awakens. Iron Kunei","ja":"覚醒. 鉄のクナイ","ko":"각성. 철 쿠나이"},"Kunai27":{"en":"Awakens. Golden Kunei","ja":"覚醒. 黄金のクナイ","ko":"각성. 금 쿠나이"},"Kunai28":{"en":"Awakens. Agate Kunei","ja":"覚醒. 瑪瑙のクナイ","ko":"각성. 마노 쿠나이"},"Kunai29":{"en":"Awakens. Golden stone Kunei","ja":"覚醒. 砂金石のクナイ","ko":"각성. 어벤츄린 쿠나이"},"Kunai30":{"en":"Awakens. Blood stone Kunei","ja":"覚醒. 血石のクナイ","ko":"각성. 블러드스톤 쿠나이"},"Kunai31":{"en":"Awakens. Kunei of Mahora marrow","ja":"覚醒. 紅玉髄のクナイ","ko":"각성. 카넬리안 쿠나이"},"Kunai32":{"en":"Awakens. Green Lead Stone Kune","ja":"覚醒. 緑鉛石のクナイ","ko":"각성. 에피도트 쿠나이"},"Kunai33":{"en":"Awakens. Yellow Crystal Kune","ja":"覚醒. 黄水晶のクナイ","ko":"각성. 골드 스톤 쿠나이"},"Kunai34":{"en":"Awakens. Red iron ore Kunei","ja":"覚醒. 赤鉄鉱のクナイ","ko":"각성. 히머타이트 쿠나이"},"Kunai35":{"en":"Awakens. Moon stone Kunei","ja":"覚醒. 月石のクナイ","ko":"각성. 래브라도라이트 쿠나이"},"Kunai36":{"en":"Awakens. Rule\'s Kunai","ja":"覚醒. 瑠璃のクナイ","ko":"각성. 라피스 자줄리 쿠나이"},"Kunai37":{"en":"Awakens. Tianhe\'s Kunai","ja":"覚醒. 天河のクナイ","ko":"각성. 라리마 쿠나이"},"Kunai38":{"en":"Awakens. Kanai of Tora eyes","ja":"覚醒. 虎目のクナイ","ko":"각성. 타이거 아이 쿠나이"},"Kunai39":{"en":"Awakens. Kanei of ashikari","ja":"覚醒. 灰簾石のクナイ","ko":"각성. 탠저나이트 쿠나이"},"Kunai40":{"en":"Awakens. Kanai of Iga","ja":"覚醒. 伊賀のクナイ","ko":"각성. 이가 쿠나이"},"Kunai41":{"en":"Awakens. Konai of Koka","ja":"覚醒. 甲賀のクナイ","ko":"각성. 코가 쿠나이"},"Kunai42":{"en":"Awakens. Funeral Kunai","ja":"覚醒. 風魔のクナイ","ko":"각성. 풍마 쿠나이"},"Kunai43":{"en":"Awakens. Miku\'s Kunai","ja":"覚醒. 明王のクナイ","ko":"각성. 주술 쿠나이"},"Kunai44":{"en":"Awakens. Rainbow Kunei","ja":"覚醒. 虹のクナイ","ko":"각성. 전설의 쿠나이"},"Kunai45":{"en":"Awakens. Iron Kunei - Kai","ja":"覚醒. 鉄のクナイ-改","ko":"각성. 철 쿠나이-改"},"Kunai46":{"en":"Awakens. Golden Kunei - Kai","ja":"覚醒. 黄金のクナイ-改","ko":"각성. 금 쿠나이-改"},"Kunai47":{"en":"Awakens. Tsukishi no Kunai - Kai","ja":"覚醒. 月石のクナイ-改","ko":"각성. 래브라도라이트 쿠나이-改"},"Kunai48":{"en":"Awakens. Kunei of Tora eyes - Kai","ja":"覚醒. 虎目のクナイ-改","ko":"각성. 타이거 아이 쿠나이-改"},"Kunai49":{"en":"Awakening. Meiwa\'s Kunai - Kai","ja":"覚醒. 明王のクナイ-改","ko":"각성. 주술 쿠나이-改"},"Kunai50":{"en":"Awakens. Rainbow Kunei - Kai","ja":"覚醒. 虹のクナイ-改","ko":"각성. 전설의 쿠나이-改"},"Kunai51":{"en":"Shin. Iron Kunei","ja":"眞. 鉄のクナイ","ko":"진. 철 쿠나이"},"Kunai52":{"en":"Shin. Golden Kunei","ja":"眞. 黄金のクナイ","ko":"진. 금 쿠나이"},"Kunai53":{"en":"True. Agate Kunei","ja":"眞. 瑪瑙のクナイ","ko":"진. 마노 쿠나이"},"Kunai54":{"en":"True. Golden stone Kunei","ja":"眞. 砂金石のクナイ","ko":"진. 어벤츄린 쿠나이"},"Kunai55":{"en":"True Stone Kunei","ja":"眞. 血石のクナイ","ko":"진. 블러드스톤 쿠나이"},"Kunai56":{"en":"Kanei of true mind spinal cord","ja":"眞. 紅玉髄のクナイ","ko":"진. 카넬리안 쿠나이"},"Kunai57":{"en":"True Green Lead Stone Kune","ja":"眞. 緑鉛石のクナイ","ko":"진. 에피도트 쿠나이"},"Kunai58":{"en":"True. Yellow Crystal Kunai","ja":"眞. 黄水晶のクナイ","ko":"진. 골드 스톤 쿠나이"},"Kunai59":{"en":"Makoto Iron Ore Kunei","ja":"眞. 赤鉄鉱のクナイ","ko":"진. 히머타이트 쿠나이"},"Kunai60":{"en":"Shin. Moon Stone Kunei","ja":"眞. 月石のクナイ","ko":"진. 래브라도라이트 쿠나이"},"Kunai61":{"en":"Makoto Ruri\'s Kunai","ja":"眞. 瑠璃のクナイ","ko":"진. 라피스 자줄리 쿠나이"},"Kunai62":{"en":"Shin. Tianhe Kunai","ja":"眞. 天河のクナイ","ko":"진. 라리마 쿠나이"},"Kunai63":{"en":"True. Tora eyes Kunei","ja":"眞. 虎目のクナイ","ko":"진. 타이거 아이 쿠나이"},"Kunai64":{"en":"True, ashikari kune","ja":"眞. 灰簾石のクナイ","ko":"진. 탠저나이트 쿠나이"},"Kunai65":{"en":"Kanei of Iga","ja":"眞. 伊賀のクナイ","ko":"진. 이가 쿠나이"},"Kunai66":{"en":"Kunai of Makoto Koka","ja":"眞. 甲賀のクナイ","ko":"진. 코가 쿠나이"},"Kunai67":{"en":"Makoto Fuwa Kunei","ja":"眞. 風魔のクナイ","ko":"진. 풍마 쿠나이"},"Kunai68":{"en":"Makoto king of True Ming","ja":"眞. 明王のクナイ","ko":"진. 주술 쿠나이"},"Kunai69":{"en":"Shin. Rainbow Kunei","ja":"眞. 虹のクナイ","ko":"진. 전설의 쿠나이"},"Kunai70":{"en":"Kanei of iron","ja":"眞. 鉄のクナイ-改","ko":"진. 철 쿠나이-改"},"Kunai71":{"en":"True. Golden Kunei - Kai","ja":"眞. 黄金のクナイ-改","ko":"진. 금 쿠나이-改"},"Kunai72":{"en":"Shinranchi Mononoke Kune - Kai","ja":"眞. 月石のクナイ-改","ko":"진. 래브라도라이트 쿠나이-改"},"Kunai73":{"en":"Kanai of the Tora eyes - Kai","ja":"眞. 虎目のクナイ-改","ko":"진. 타이거 아이 쿠나이-改"},"Kunai74":{"en":"Makoto Ming\'s Kunai - Kai","ja":"眞. 明王のクナイ-改","ko":"진. 주술 쿠나이-改"},"Kunai75":{"en":"Shin. Rainbow Kunei - Kai","ja":"眞. 虹のクナイ-改","ko":"진. 전설의 쿠나이-改"},"tuto00":{"en":"Start the tutorial.","ja":"チュートリアルを始めます。","ko":"안녕하세요!{E}튜토리얼을시작합니다."},"tuto01":{"en":"Shuriken increases {E}the amount when touching","ja":"タッチすると手裏剣を投げ、{E}敵からゴールドを奪います。","ko":"수리검은 터치 시 {E}금액을 증가시킵니다."},"tuto02":{"en":"If you raise the level, {E}you get more money {E}when you touch it.","ja":"レベルがUPすると、{E}より多くのゴールドを{E}奪えることができます。","ko":"레벨을 올리면 터치 시 {E}더 많은 금액을 획득합니다."},"tuto03":{"en":"Kunei will automatically {E}increase the amount.","ja":"クナイはタッチしなくても{E}自動で投げ、{E}敵からゴールドを奪います。","ko":"쿠나이는 자동으로 {E}금액을 증가시킵니다."},"tuto04":{"en":"If you raise the level {E}you automatically earn {E}more money.","ja":"レベルがUPすると、{E}より多いゴールドを{E}奪えることができます。","ko":"레벨을 올리면 자동으로 {E}더 많은 금액을 획득합니다."},"tuto05":{"en":"DPS indicates the{E}amount of{E}increase per second.","ja":"DPSは、{E}1秒当り増加する{E}ゴールドを表示します。","ko":"DPS는 초당 증가하는 {E}금액을 나타냅니다."},"tuto06":{"en":"DPS compares the Hiki Kael\'s{E}HP to let you know the{E}current state.","ja":"DPSはカエルのHPを{E}比較して現在の状態を{E}知らせてくれます。","ko":"DPS와 두꺼비의 HP를 {E}비교하여 현재상태를 알려줍니다."},"tuto07":{"en":"Toad will drop jewels {E}at the time of defeating.","ja":"カエルを倒すと宝石を{E}ドロップできます。","ko":"두꺼비는 격파 시 보석을 {E}드랍합니다."},"tuto08":{"en":"Gems dropping by the toad{E}level and acquired gems{E}during incarnation increase.","ja":"カエルのレベルによって{E}ドロップできる宝石と蘇った{E}時の獲得できる{E}宝石が増加します。","ko":"두꺼비의 레벨에 따라{E}드랍 보석과 환생 시{E}획득 보석이 증가합니다."},"tuto09":{"en":"You can use the acquired {E}jewels at the shop.","ja":"獲得した宝石は{E}アップグレードする{E}際に必要になります。","ko":"획득한 보석은 보석샾에서 {E}사용할 수 있습니다."},"tuto10":{"en":"If you strengthen your{E}ability value with jewelry{E}you can reach{E} even higher levels faster!","ja":"能力値をアップグレードすれば{E}するほどより{E}早くカエルを倒し、{E}ゴールドをたくさん奪えます。","ko":"보석으로 능력치를 강화하면 {E}더욱 빠르게 높은 단계까지 {E}도달 할 수 있습니다!"},"tuto11":{"en":"Then quit the tutorial.","ja":"これで、{E}チュートリアルを終了します。","ko":"그럼 튜토리얼을 종료합니다."},"dps_message_1":{"en":"One shot!","ja":"一発!","ko":"한방!"},"dps_message_2":{"en":"Easy","ja":"簡単","ko":"쉬움!"},"dps_message_3":{"en":"Normal","ja":"普通","ko":"보통!"},"dps_message_4":{"en":"Hard","ja":"難しい","ko":"힘듦!"},"dps_message_5":{"en":"Reincarnation{E}Recommended!","ja":"転生おすすめ!","ko":"환생 추천!"},"fever_on":{"en":"Ninja triggered!","ja":"忍法発動!","ko":"인법 발동!"},"title_option":{"en":"OPTION","ja":"OPTION","ko":"OPTION"},"title_collection":{"en":"COLLECTION","ja":"COLLECTION","ko":"COLLECTION"},"weapon_level_1":{"en":"1steps","ja":"1段階","ko":"1단계"},"weapon_level_2":{"en":"2steps","ja":"2段階","ko":"2단계"},"weapon_level_3":{"en":"3steps","ja":"3段階","ko":"3단계"},"title_upgrade":{"en":"UPGRADE","ja":"UPGRADE","ko":"UPGRADE"},"title_gemshop":{"en":"GEM SHOP","ja":"GEM SHOP","ko":"GEM SHOP"},"btn_ok":{"en":"OK","ja":"OK","ko":"OK"},"shop_onlyclient":{"en":"Members Only","ja":"会員専用","ko":"회원전용"},"shop_joinclient":{"en":"Sign Up","ja":"会員登録","ko":"회원가입"},"shop_cashconfirm":{"en":"Earn {V} gems!","ja":"ジェム{V}個を獲得!","ko":"보석 {V}개 획득!"},"popup_class_1":{"en":"1steps","ja":"1段階","ko":"1단계"},"popup_class_2":{"en":"2steps","ja":"2段階","ko":"2단계"},"popup_class_3":{"en":"3steps","ja":"3段階","ko":"3단계"},"btn_close":{"en":"BACK","ja":"BACK","ko":"닫기"},"title_ranking":{"en":"RANKING","ja":"RANKING","ko":"RANKING"},"rank_daily":{"en":"DAILY","ja":"DAILY","ko":"일일"},"rank_total":{"en":"TOTAL","ja":"TOTAL","ko":"종합"},"sign_up":{"en":"SIGN UP","ja":"サイン アップ","ko":"회원가입"},"shuriken_upgrade":{"en":"Upgraded","ja":"手裏剣 強化","ko":"수리검 강화"},"kunai_upgrade":{"en":"Upgraded","ja":"クナイ 強化","ko":"쿠나이 강화"},"title_shuriken":{"en":"Shuriken","ja":"手裏剣","ko":"수리검"},"title_kunai":{"en":"Kunai","ja":"クナイ","ko":"쿠나이"},"title_tutorial":{"en":"Tutorial","ja":"Tutorial","ko":"튜토리얼"},"level_up":{"en":"LEVEL UP","ja":"レベルアップ","ko":"LEVEL UP"},"login":{"en":"LOGIN","ja":"ログイン","ko":"로그인"},"signup":{"en":"Members only!<br/>Would you like to go to the sign up page?","ja":"会員専用<br/>会員登録をしますか?","ko":"회원전용!<br/>회원가입 하시겠습니까?"},"gotogpg":{"en":"Only available in the Moby Games app.<br/>Would you like to go to the Moby Games app?","ja":"モビーゲームアプリのみ購入で きます。<br/>モビーゲームアプリに移動しますか？","ko":"모비게임 앱에서만 구매 가능합니다.<br/>모비게임 앱으로 이동하시겠습니까?"},"lowpoint":{"en":"Not enough points!","ja":"ポイントが足りません!","ko":"포인트가 부족합니다!"},"optionM0":{"en":"Shuriken Damage Amplification","ja":"手裏剣ダメージ増幅","ko":"수리검데미지증폭"},"optionM1":{"en":"Kunei Damage Amplification","ja":"クナイダメージ増幅","ko":"쿠나이데미지증폭"},"optionM2":{"en":"Shadow Speed Amplification","ja":"影速度増幅","ko":"그림자속도증폭"},"optionM3":{"en":"Shuriken Critical Amplification","ja":"手裏剣クリティカル増幅","ko":"수리검크리티컬증폭"},"optionM4":{"en":"Shuriken Critical Probability","ja":"手裏剣クリティカル・確率","ko":"수리검크리티컬확률"},"optionM5":{"en":"Ninja Damage Amplification","ja":"忍法被害量増幅","ko":"인법피해량증폭"},"optionM6":{"en":"Ninja Gauge Shortening","ja":"忍法ゲージ短縮","ko":"인법게이지단축"},"skip":{"en":"SKIP","ja":"SKIP","ko":"SKIP"},"next":{"en":"NEXT","ja":"NEXT","ko":"NEXT"},"MGM_Title":{"en":"NEKO NINJA","ja":"ネコ忍者","ko":"네코닌자"},"MGM_Contents":{"en":"Incremental game.{E}Try to smash different toads for peace.","ja":"はるか昔忍者は黙々とカエル退治を{E}続けていたという。カエルを倒して{E}小判を稼ぐ本格放置ゲームの登場！","ko":"어느 겁나먼 동방의 동물 나라.{E}평화를 위하여 그들을 물리쳐야 해요!{E}어떻게 하냐고요? 눌러만 주세요!"}}',
    tbString = JSON.parse(tbString_json);






var iMaxSizeX = 720;
var iMaxSizeY = 1280;
var iCenterSizeX = iMaxSizeX >> 1;
var iCenterSizeY = iMaxSizeY >> 1;
var renderer = PIXI.autoDetectRenderer(iMaxSizeX, iMaxSizeY);

var KEY_LEFT = 37;
var KEY_UP = 38;
var KEY_RIGHT = 39;
var KEY_DOWN = 40;

$(window).resize(resize);	// jquery를 사용한다.
window.onorientationchange = resize; // 화면이 리사이즈되면 리사이즈 함수를 콜한다.
resize(); // 최초 한번 리사이즈를 해주고 변동사항이 있을경우 리사이즈를 계속 해준다.

// 윈도우창 포커스가 돌아올때 처리 사운드 관련 처리를 해준다.
/*
abort: 이미지 로딩이 중단될 경우 실행된다.
blur: 엘리먼트가 입력 포커스를 잃어버릴 경우 실행된다.
change: 폼 엘리먼트가 포커스를 잃고 값이 변경될 경우 실행된다.
click: 마우스 버튼이 눌렸다 떼어질 때 실행된다. mouseup 이벤트가 이어서 발생한다. 기본 동작 방식을 취소하려면 false를 반환한다.
dblclick: 마우스가 더블클릭될 때 실행된다.
error: 이미지 로딩 오류가 일어날 경우 실행된다.
focus: 엘리먼트가 입력 포커스를 얻을 경우 실행된다.
keydown: 키가 눌렸을 때 실행된다. 취소하려면 false를 반환한다.
keypress: 키가 눌렸을 때 실행된다. keydown 이벤트가 이어서 발생한다. 취소하려면 false를 반환한다.
keyup: 키에서 손을 뗐을 때 실행된다. keypress 이벤트가 이어서 발생한다.
mousedown: 마우스 버튼이 눌렸을 때 실행된다.
mousemove: 마우스가 이동할 경우 실행된다.
mouseout: 마우스가 엘리먼트에서 벗어났을 때 실행된다.
mouseover: 마우스가 엘리먼트 위로 이동할 때 실행된다.
mouseup: 마우스 버튼에서 손을 뗐을 때 실행된다.
resize: 윈도우 크기가 변경될 경우 실행된다.
select: 텍스트가 선택됐을 때 실행된다.
reset: 폼 초기화가 요청됐을 때 실행된다. 초기화를 방지하려면 false를 반환한다.
submit: 폼 제출이 요청됐을 때 실행된다. 제출을 방지하려면 false를 반환한다.
load: 문서 로딩이 완료됐을 때 실행된다.
unload: 문서나 프레임셋이 사라졌을 때 실행된다.
*/
//================================================================
// 사운드 제어.
window.addEventListener('focus', function() {
	SoundResume();
}, false);

// 윈도우창을 닫을때 이벤트.
window.addEventListener('blur', function() {
	SoundPause();
}, false);

//Set the name of the hidden property and the change event for visibility
var hidden, visibilityChange; 
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
	hidden = "hidden";
	visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
	hidden = "msHidden";
	visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
	hidden = "webkitHidden";
	visibilityChange = "webkitvisibilitychange";
}

function handleVisibilityChange() {
  if (document[hidden]) {
    SoundPause();
  } else {
    SoundResume();
  }
}

// Warn if the browser doesn't support addEventListener or the Page Visibility API
if (typeof document.addEventListener === "undefined" || typeof document[hidden] === "undefined") {
	console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
} else {
	// Handle page visibility change
	document.addEventListener(visibilityChange, handleVisibilityChange, false);
}
// end 사운드 제어.

document.body.appendChild(renderer.view);
var stage = new PIXI.Container();
var sLoading = new PIXI.Container();
var sTitle = new PIXI.Container();
var sGame = new PIXI.Container();
var sMenuGoldShop = new PIXI.Container();
var sMenuGoldShopPage1 = new PIXI.Container();
var sMenuGoldShopPage2 = new PIXI.Container();
var sMenuGemShop = new PIXI.Container();
var sMenuGemShopPage1 = new PIXI.Container();
var sMenuGemShopPage2 = new PIXI.Container();
var sMenuGemShopPopup = new PIXI.Container();
var sMenuOption = new PIXI.Container();
var sMenuCashShop = new PIXI.Container();
var sPopupCashConfirm = new PIXI.Container();
// var sADView1 = new PIXI.Container();
var sADView2 = new PIXI.Container();
var sUpgradePopup = new PIXI.Container();
var sTutorial = new PIXI.Container();

var sRanking = new PIXI.Container();
var sRankUp = new PIXI.Container();
// 랭킹 sign up 관련
var sSignUp = new PIXI.Container();

var sMenuGemShopPopup = new PIXI.Container();

var sTutorial = new PIXI.Container();

stage.addChild(sLoading);

var ShopNumTTF = 'shop_no-export';
var RankNumTTF = 'no-export';

var tbImgGame = [];
tbImgGame['ko'] = [
    "img_ko/toad_hp_gauge.png",
    'atlas_ko/GameResource_0.json',
    'atlas_ko/GameResource_1.json',
    'atlas_ko/GameResource_2.json'
];

tbImgGame['en'] = [
    "img_en/toad_hp_gauge.png",
    'atlas_en/GameResource_0.json',
    'atlas_en/GameResource_1.json',
    'atlas_en/GameResource_2.json'
];

tbImgGame['ja'] = [
    "img_ja/toad_hp_gauge.png",
    'atlas_ja/GameResource_0.json',
    'atlas_ja/GameResource_1.json',
    'atlas_ja/GameResource_2.json'
];

/** var tbImgGame = [
    "img/toad_hp_gauge.png",
	'atlas/GameResource_0.json',
	'atlas/GameResource_1.json',
	'atlas/GameResource_2.json'
]; */
//========================================================================
// 언어 이미지  설정
var LANGUAGE_ENG = 0;
var LANGUAGE_JPN = 1;
var LANGUAGE_KOR = 2;
var CURRENT_LANGUAGE = LANGUAGE_ENG;
var tbTTF = [];
tbTTF['ko'] = 'HYB';
tbTTF['ja'] = 'HYB';
tbTTF['en'] = 'HYB';

var tbPopupTitleTTF = [];
tbPopupTitleTTF['ko'] = 'Conv_Molot';
tbPopupTitleTTF['ja'] = 'bokutachi';
tbPopupTitleTTF['en'] = 'Conv_Molot';
//var tbTTF = ["Passion One", "Passion One", "Nanum Gothic"];
var tbNumTTF = "Conv_Molot";

function GetString(key, data)
{
	/*switch(lang)
	{
		case 'en':*/
			if(data === undefined)
				return tbString[key].en.replace(/{E}/gi, "\n");
			else
				return tbString[key].en.replace("{V}", data.toString()).replace(/{E}/gi, "\n");
	/*		break;
		case 'ja':
			if(data === undefined)
				return tbString[key].ja.replace(/{E}/gi, "\n");
			else
				return tbString[key].ja.replace("{V}", data.toString()).replace(/{E}/gi, "\n");
			break;
		case 'ko':
			if(data === undefined)
				return tbString[key].ko.replace(/{E}/gi, "\n");
			else
				return tbString[key].ko.replace("{V}", data.toString()).replace(/{E}/gi, "\n");
			break;
	}*/
	
	return "";
}
//=============================================================================
// 스프라이트 생성 관련
//=============================================================================
function SpriteLoad(parent, url, px, py, ax, ay)
{
	if(ax === undefined) ax = 0.5;
	if(ay === undefined) ay = 0.5;
	var spr = SpritePool.getInstance().get(url);
	spr.position.x = px;
	spr.position.y = py;
	spr.anchor.x = ax;
	spr.anchor.y = ay;
	
	parent.addChild(spr);
	
	return spr;
}

function PIXIGraphics(parent, color, alpha, startx,starty,endx,endy) {
    if(startx === undefined)
        startx = 0;
    if(starty === undefined)
        starty = 0;
    if(endx === undefined)
        endx = iMaxSizeX;
    if(endy === undefined)
        endy = iMaxSizeY;

    var spr = new PIXI.Graphics();
    parent.addChild(spr);

    spr.position.set(0,0);
    spr.lineStyle(0);

    spr.clear();
    spr.beginFill(color,alpha);
    spr.moveTo(startx,starty);
    spr.lineTo(endx, starty);
    spr.lineTo(endx, endy);
    spr.lineTo(startx, endy);

    return spr;
}

function PIXIGraphicsResize(spr,color,alpha,startx,starty,endx,endy){
    spr.clear();
    spr.beginFill(color,alpha);

    spr.moveTo(startx,starty);
    spr.lineTo(endx, starty);
    spr.lineTo(endx, endy);
    spr.lineTo(startx, endy);
}

function PIXIGraphicsRect(parent, color, alpha, posx,posy, width, height) {
    var retData = new PIXI.Graphics();

    retData.position.set(posx,posy);
    retData.lineStyle(0);

    retData.clear();
    retData.beginFill(color,alpha);

    retData.drawRect(-width / 2,-height / 2, width,height);
    retData.endFill();

    parent.addChild(retData);

    return retData;
}

function SpriteSliceLoad(parent, url, px, py, ax, ay, lc, rc, tc, bc, w, h, option)
{
    var main = new PIXI.Container();
    var tex = new PIXI.Texture.fromFrame(url);
    var bw = tex.width;
    var bh = tex.height;

    if(lc===undefined) lc = Math.floor(bw/2)-1;
    if(rc===undefined) rc = Math.floor(bw/2)-1;
    if(tc===undefined) tc = Math.floor(bh/2)-1;
    if(bc===undefined) bc = Math.floor(bh/2)-1;
    if(ax===undefined) ax = 0.5;
    if(ay===undefined) ay = 0.5;

    var TL = new PIXI.Sprite(new PIXI.Texture(tex.baseTexture, new PIXI.Rectangle(tex.frame.x, tex.frame.y, lc, tc)));
    TL.position.set((-w*ax), (-h*ay));
    var TC = new PIXI.Sprite(new PIXI.Texture(tex.baseTexture, new PIXI.Rectangle(tex.frame.x+lc, tex.frame.y, bw-lc-rc, tc)));
    TC.position.set((-w*ax)+lc, (-h*ay));
    TC.scale.set((w-lc-rc)/(bw-lc-rc), 1);
    var TR = new PIXI.Sprite(new PIXI.Texture(tex.baseTexture, new PIXI.Rectangle(tex.frame.x+(bw-rc), tex.frame.y, rc, tc)));
    TR.position.set((-w*ax)+w-rc, (-h*ay));
    var CL = new PIXI.Sprite(new PIXI.Texture(tex.baseTexture, new PIXI.Rectangle(tex.frame.x, tex.frame.y+tc, lc, bh-tc-bc)));
    CL.position.set((-w*ax), (-h*ay)+tc);
    CL.scale.set(1, (h-tc-bc)/(bh-tc-bc));
    var CC = new PIXI.Sprite(new PIXI.Texture(tex.baseTexture, new PIXI.Rectangle(tex.frame.x+lc, tex.frame.y+tc, bw-lc-rc, bh-tc-bc)));
    CC.position.set((-w*ax)+lc, (-h*ay)+tc);
    CC.scale.set((w-lc-rc)/(bw-lc-rc), (h-tc-bc)/(bh-tc-bc));
    var CR = new PIXI.Sprite(new PIXI.Texture(tex.baseTexture, new PIXI.Rectangle(tex.frame.x+(bw-rc), tex.frame.y+tc, rc, bh-tc-bc)));
    CR.position.set((-w*ax)+w-rc, (-h*ay)+tc);
    CR.scale.set(1, (h-tc-bc)/(bh-tc-bc));
    var BL = new PIXI.Sprite(new PIXI.Texture(tex.baseTexture, new PIXI.Rectangle(tex.frame.x, tex.frame.y+(bh-bc), lc, bc)));
    BL.position.set((-w*ax), (-h*ay)+h-bc);
    var BC = new PIXI.Sprite(new PIXI.Texture(tex.baseTexture, new PIXI.Rectangle(tex.frame.x+lc, tex.frame.y+(bh-bc), bw-lc-rc, bc)));
    BC.position.set((-w*ax)+lc, (-h*ay)+h-bc);
    BC.scale.set((w-lc-rc)/(bw-lc-rc), 1);
    var BR = new PIXI.Sprite(new PIXI.Texture(tex.baseTexture, new PIXI.Rectangle(tex.frame.x+(bw-rc), tex.frame.y+(bh-bc), rc, bc)));
    BR.position.set((-w*ax)+w-rc, (-h*ay)+h-bc);

    main.addChild(TL);
    main.addChild(TC);
    main.addChild(TR);
    main.addChild(CL);
    main.addChild(CC);
    main.addChild(CR);
    main.addChild(BL);
    main.addChild(BC);
    main.addChild(BR);
    main.position.set(px, py);
    parent.addChild(main);
    return main;
}

function SpriteSlicedAlphaChange(_spr, _falpha) {
    for(var i=0,imax = 9;i<imax;++i){
        _spr.children[i].alpha = _falpha;
    }
}

function FontLoad(parent, str, x, y, ax, ay, style, limitWidth)
{
	if(limitWidth === undefined) limitWidth = 0;
	var txt = new PIXI.Text(str, style);
	txt.anchor.set(ax, ay);
	txt.position.x = x;
	txt.position.y = y;
	
	if(limitWidth > 0 && txt.width > limitWidth) // 자동으로 사이즈를 줄여준다.
		txt.scale.set(limitWidth/txt.width);
	
	parent.addChild(txt);
	
	return txt;
}

function BitmapFontLoad(parent, str, x, y, ax, ay, style, limitWidth)
{
	if(limitWidth === undefined) limitWidth = 0;
	var txt = new PIXI.extras.BitmapText(str, style);
	if(limitWidth > 0 && txt.width > limitWidth) // 자동으로 사이즈를 줄여준다.
		txt.scale.set(limitWidth/txt.width);
	txt.position.x = x - (txt.width*ax);
	txt.position.y = y - (txt.height*ay);
	
	parent.addChild(txt);
	
	return txt;
}

var SPINE_INIT_NONE = 0;
var SPINE_INIT_SLOTS = 1;
var SPINE_INIT_BONES = 2;
var SPINE_INIT_ALL = 3;
function SpinePlay(spine, x, y, aniName, trackIndex, loop, initType)
{
    if(trackIndex === undefined) trackIndex = 0;
    if(loop === undefined) loop = false;
    if(initType === undefined) initType = SPINE_INIT_ALL;
    spine.visible = true;
    spine.alpha = 1;
    if(x != null) spine.position.x = x;
    if(y != null) spine.position.y = y;

    switch(initType)
    {
        case SPINE_INIT_NONE:
            break;
        case SPINE_INIT_SLOTS:
            spine.skeleton.setSlotsToSetupPose();
            break;
        case SPINE_INIT_BONES:
            spine.skeleton.setBonesToSetupPose();
            break;
        case SPINE_INIT_ALL:
            spine.skeleton.setToSetupPose();		// 아래 슬롯 및 본 두개다 초기화.
            break;
    }
    spine.state.clearTracks();	// 애니메이션 초기화.
    spine.state.setAnimation (trackIndex, aniName, loop);
//	spine.state.timeScale = 1;
//	spine.skeleton.setSlotsToSetupPose();	// 슬롯만 초기화.
//	spine.skeleton.setBonesToSetupPose();	// 본만 초기화.	
//	spine.state.update(0);
}

//=============================================================================
// 폰트 로드.
//=============================================================================
/*window.WebFontConfig = {
	active: function() {
	},
	custom: {
		families:[tbTTF[lang]],
		urls: [strGamePath+'./css/font.css']
	}
};

(function() {
	var wf = document.createElement('script');
	wf.src = wf.src = strGamePath+"../Common/webfont.js";
	wf.type = 'text/javascript';
	wf.async = 'true';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(wf, s);
})();*/
//=============================================================================
// 사운드 관련 변수
//=============================================================================
var tbSoundName = [
    ["sound/BGM_Game.ogg", "sound/BGM_Game.mp3"],
    ["sound/BGM_Title.ogg", "sound/BGM_Title.mp3"],

    ["sound/SE_Achievements.ogg", "sound/SE_Achievements.mp3"],
    ["sound/SE_bonusCount.ogg", "sound/SE_bonusCount.mp3"],
    ["sound/SE_bonusend.ogg", "sound/SE_bonusend.mp3"],
    ["sound/SE_bonusfly.ogg", "sound/SE_bonusfly.mp3"],
    ["sound/SE_Button.ogg", "sound/SE_Button.mp3"],
    ["sound/SE_buy.ogg", "sound/SE_buy.mp3"],
    ["sound/SE_empty.ogg", "sound/SE_empty.mp3"],
    ["sound/SE_num.ogg", "sound/SE_num.mp3"],
    ["sound/SE_Shop.ogg", "sound/SE_Shop.mp3"],
    ["sound/SE_yo.ogg", "sound/SE_yo.mp3"],
    ["sound/BGM_Fever.ogg", "sound/BGM_Fever.mp3"],
    ["sound/SE_Shurikenfly.ogg", "sound/SE_Shurikenfly.mp3"], // InvalidStateError
    ["sound/VOICE_Nyan.ogg", "sound/VOICE_Nyan.mp3"],	// InvalidStateError
    ["sound/SE_Shuriken.ogg", "sound/SE_Shuriken.mp3"]	// InvalidStateError
];


var BGM_Game = 0;
var BGM_Title = 1;

var SE_Achievements = 0;
var SE_bonusCount = 1;
var SE_bonusend = 2;
var SE_bonusfly = 3;
var SE_Button = 4;
var SE_buy = 5;
var SE_empty = 6;
var SE_num = 7;
var SE_Shop = 8;
var SE_yo = 9;
var BGM_Fever = 10;
var SE_Shurikenfly = 11;
var VOICE_Nyan = 12;
var SE_Shuriken = 13;

// var arrBGM = [];
// var arrSE = [];
// var arrSE_pool = [];
var iBGMCurrent = -1;
var iBGMOld = -1;

var soundCtrl = [];
var bgm_title;
//var bSoundLoad = false;
function BGMSoundPlay(index, loop)
{
    if(!clientData.bSoundBGM)
        return;

    if(iBGMCurrent != -1)
        soundCtrl[iBGMCurrent].pause();

    soundCtrl[index].play();
    iBGMCurrent = index;

    return;

	// if(loop === undefined) loop = true;
	//
	// if(clientData.bSoundBGM == false) return;
	//
	// if(iBGMCurrent != -1 && iBGMCurrent != index)
	// 	if(arrBGM[iBGMCurrent].playing == true)
	// 		arrBGM[iBGMCurrent].stop();
    //
     //    iBGMCurrent = index;
    //
     //    if(arrBGM[iBGMCurrent] != null){
     //        arrBGM[iBGMCurrent].play();
     //        arrBGM[iBGMCurrent].loop = loop;
	// 	}
}

function BGMSoundStop()
{
	// if(clientData.bSoundBGM == false) return;
	// if(iBGMCurrent == -1) return;
	//
	// if(arrBGM[iBGMCurrent].playing == true)
	// 	arrBGM[iBGMCurrent].reset();
}

function BGMSoundPause()
{
    if(iBGMCurrent != -1)
        soundCtrl[iBGMCurrent].pause();

    return;

	// if(iBGMCurrent == -1) return;
	// if(arrBGM[iBGMCurrent] == null) return;
    //
	// if(arrBGM[iBGMCurrent].playing == true)
	// 	arrBGM[iBGMCurrent].paused = true;
}

function BGMSoundResume()
{
    if(!clientData.bSoundBGM)
        return;

    if(soundCtrl[iBGMCurrent] != null && soundCtrl[iBGMCurrent].playing())
        return;

    if(iBGMCurrent != -1)
        soundCtrl[iBGMCurrent].play();

    return;

	// if(iBGMCurrent != -1)
	// {
	// 	if(clientData.bSoundBGM == true)
	// 	{
	// 		if(arrBGM[iBGMCurrent] != null && arrBGM[iBGMCurrent].paused)
	// 			arrBGM[iBGMCurrent].paused = false;
	// 		else if(arrBGM[iBGMCurrent] == null){
     //            if(state == STATE_TITLE)
     //                iBGMCurrent = 1;
     //            else
     //                iBGMCurrent = 0;
    //
     //            BGMSoundPlay(iBGMCurrent);
	// 		}
	// 	}
	// }
	// else
	// {
	// //	BGMSoundPlay(BGM_BG);
	// 	if(state == STATE_TITLE)
	// 		iBGMCurrent = 1;
	// 	else
     //        iBGMCurrent = 0;
    //
	// 	BGMSoundPlay(iBGMCurrent);
	// }
}

function SESoundPlay(index, stop)
{
    if(!clientData.bSoundSE)
        return;

    if(stop)
        soundCtrl[index+2].stop();

    soundCtrl[index+2].play();
    return;

	// if(arrSE.length < index) return;
	// if(loop === undefined) loop = false;
	// if(clientData.bSoundSE == false) return;
	// if(arrSE[index] == null) return;
	//
	// if(arrSE[index].playing == true){
     //    if(arrSE_pool[index] === undefined || arrSE_pool[index] == null){
     //        arrSE_pool[index] = [];
     //        arrSE_pool[index][0] = PIXI.audioManager.getAudio(tbSoundName[index+2][0]);
     //        arrSE_pool[index][0].play();
     //        arrSE_pool[index][0].loop = loop;
     //        return;
	// 	}else{
     //    	var b_check = false;
	// 		for(var i=0,imax=arrSE_pool[index].length;i<imax;++i){
	// 			if(!arrSE_pool[index][i].playing){
     //                arrSE_pool[index][i].play();
     //                arrSE_pool[index][i].loop = loop;
     //                b_check = true;
     //                break;
	// 			}
	// 		}
    //
	// 		if(!b_check){
     //            var se_Length = arrSE_pool[index].length;
     //            // console.log('se_Length : ' + se_Length);
	// 			if(se_countMax >= se_Length){
     //                arrSE_pool[index][se_Length] = PIXI.audioManager.getAudio(tbSoundName[index+2][0]);
     //                arrSE_pool[index][se_Length].play();
     //                arrSE_pool[index][se_Length].loop = loop;
	// 			}
	// 		}
    //
     //        return;
	// 	}
     //    // arrSE[index].reset();
	// }else{
     //    arrSE[index].play();
     //    arrSE[index].loop = loop;
     //    return;
	// }
}

function SESoundStop(index)
{
	// if(clientData.bSoundSE == false) return;
	// if(arrSE[index] == null) return;
	//
	// arrSE[index].stop();
}

function SESoundPause()
{
    for(var i=0,imax=soundCtrl.length-2;i<imax;++i)
        if(soundCtrl[i+2].playing())
            soundCtrl[i+2].pause();
    return;

	// for(var i=0;i<arrSE.length;++i)
	// {
	// 	if(arrSE[i] != null && arrSE[i].playing == true)
	// 		arrSE[i].paused = true;
	// }
    //
	// for(var mainx = 0,mainxmax = arrSE_pool.length;mainx<mainxmax; ++mainx){
     //    if(arrSE_pool[mainx] !== undefined && arrSE_pool[mainx] != null){
     //        for(var i=0, imax = arrSE_pool[mainx].length;i<imax;++i){
     //            if(arrSE_pool[mainx][i] != null && arrSE_pool[mainx][i].playing)
     //                arrSE_pool[mainx][i].paused = true;
     //        }
     //    }
	// }
}

function SESoundResume()
{
    return;

	// if(clientData.bSoundSE == true)
	// {
	// 	for(var i=0;i<arrSE.length;++i)
	// 	{
	// 		if(arrSE[i] != null && arrSE[i].paused == true)
	// 			arrSE[i].paused = false;
	// 	}
	// }
}

function SoundPause()
{
	BGMSoundPause();
	SESoundPause();
}

function SoundResume()
{
//	if(gameState == STATE_GAME_PAUSE) return;
	BGMSoundResume();
	SESoundResume();
}
//=============================================================================
// 화면이 리사이즈되면 처리한다.
//=============================================================================
function resize()
{
	var w, h, per;	// modifier : kook : 일본대응. : yahooIN
	w = window.innerWidth;
	h = window.innerHeight;

	if(w * iMaxSizeY <= h * iMaxSizeX){
		renderer.view.style.position = "absolute";	// "absolute"가 셋팅되어 있으면 가운데 정렬이 되지 않는다.
		renderer.view.style.width = "100%";
		renderer.view.style.height = "100%";
		renderer.view.style.left = "0px";
		renderer.view.style.top = "0px";
	}else{ // 게임 사이즈보다 세로가 더 클경우 자동확대되는것을 방지한다.
		if(((h * iMaxSizeX) / (w * iMaxSizeY)*100) >= 80){
			renderer.view.style.position = "absolute"; // 이 옵션을 사용할경우 윈도우 사이즈에 맞게 스케일링이 되어 버린다.
			renderer.view.style.width = "100%";
			renderer.view.style.height = "100%";
			renderer.view.style.left = "0px";
			renderer.view.style.top = "0px";
		}else{
			per = (h * iMaxSizeX) / (w * iMaxSizeY);
			renderer.view.style.position = "absolute";
			renderer.view.style.width = (per*100) + "%";
			renderer.view.style.height = "100%";
			renderer.view.style.left = (1-per) * w / 2 + "px";
			renderer.view.style.top = "0px";
		}
	}
}
//=============================================================================
// 타이머 관련
//=============================================================================
var tickNow;
var tickLast = Date.now();
var deltaTime = 0;
function updateTick()
{
	tickNow = Date.now();
	deltaTime = (tickNow - tickLast) * 0.001;
	tickLast = tickNow;
}

var SAVE_TIME_INIT = 10;
var time_save_tick = SAVE_TIME_INIT;
function UpdateSaveTick() {
    time_save_tick -= deltaTime;
    if(time_save_tick<0){
        time_save_tick = SAVE_TIME_INIT;
        networkManager.SaveData();
	}
}
//=============================================================================
//점수 카운트 관련
//=============================================================================
function lerp(minNum, maxNum, t){ //t 값은 0~1사이의 값을 가집니다.
	var _num;
	if(t>=1){
		_num = maxNum;
		return Math.floor(_num);
	}
	
	_num = (maxNum - minNum)*t + minNum;
	
	return Math.floor(_num);
}//t 값 구성 방법 : updateTick()을 이용 , 쌓이는 시간 변수 += deltaTime, t = 쌓이는 시간 변수 / 맥스지점까지 도달하는데 걸리는 시간 입니다.
//=============================================================================
// 자릿수에 맞게 0값을 앞에 넣기..
//=============================================================================
function leadingZeros(n, digits){
	var zero = '';
	n = n.toString();
	
	if (n.length < digits){
		for (var i = 0; i < digits - n.length; i++)
		zero += '0';
	}
	return zero + n;
}

function RandomMix(random, mixCnt)
{
	var temp, r1, r2;
	
	for(var i=0;i<mixCnt;++i)
	{
		r1 = Math.floor(Math.random() * random.length);
		r2 = Math.floor(Math.random() * random.length);
		
		temp = random[r1];
		random[r1] = random[r2];
		random[r2] = temp;
	}
}
//=============================================================================
//	세이브 관련
//=============================================================================
var kData = new Data();
var clientData = new ClientData();

var SAVE_VER = 1;
//LoadDataInClient();

function Data(){
	this.iVer;
	this.bTutorial;
	this.nMyMoney;
	
	// 클릭당 데미지
	this.nBaseClickDmg;				// ???
	this.nBaseClickDmgBuyMoney;		// 현 단계 1Lv 골드

	// 초당 데미지
	this.nBaseSecondDmg;
	this.nBaseSecondDmgBuyMoney;

	this.iCash;
	
	this.iToadLevel;
	
	this.iSkillLv;

	this.nOptionGlod;
	this.iOptionCash;
	this.iOptionClickCnt;
	this.iOptionRebirthCnt;
	this.iOptionToadCnt;
	this.iOptionToadLvMax;
	this.iOptionShurikenLvMax;
	this.iOptionKunaiLvMax;
	
	this.RankVal; // 랭킹 value
	this.greappoint;

    this.timeSTAMP;
    this.calcedTimeStamp;

    this.fCooltime_Gamemoney = [];
}

function ClientData() {
	this.bSoundBGM;
	this.bSoundSE;

    this.nMyClickDmg;					// 현 피해량
    this.nNextClickDmg;				// 다음 피해량
    this.nClickDmgMultiply;
    this.nNextClickDmgBuyMoney;		// Lv 필요 골드

    // 초당 데미지
    this.nMySecondDmg;
    this.nNextSecondDmg;
    this.nSecondDmgMultiply;
    this.nNextSecondDmgBuyMoney;

    this.nToadHPMax;

    this.iSkillValue;

    this.iMyMoneyLengthNum;

    this.nToadHPIncreate;	// 두꺼비 체력증가 변수.

    this.timeSTAMP;
}

// 데이터 초기화..
function InitData()
{
	kData.iVer = SAVE_VER;
	clientData.bSoundBGM = true;
	clientData.bSoundSE = true;
	kData.bTutorial = true;
	kData.nMyMoney = [0];

	kData.iSkillLv = [0, 0, 0, 0, 0, 0, 0];
	clientData.iSkillValue = $.extend({}, iSkillVauleBase);

	// 클릭당 데미지
	clientData.nMyClickDmg = [1];
	kData.iMyClickDmgLevel = 1;
	kData.iMyClickDmgLevelSub = 1;
	kData.nBaseClickDmg = [1];
	clientData.nNextClickDmg = XMultiplyEx(XMultiplyEx(kData.nBaseClickDmg, fItemIncreateDmg * (kData.iMyClickDmgLevelSub + 1)), clientData.iSkillValue[0]/100);
	clientData.nClickDmgMultiply = [2];	// Math.pow(2, 70)을 할경우 지수로 나와서 설정함
	kData.nBaseClickDmgBuyMoney = XMultiply(kData.nBaseClickDmg, clientData.nClickDmgMultiply);
	clientData.nNextClickDmgBuyMoney = XMultiplyEx(kData.nBaseClickDmgBuyMoney, fItemBuyMoney * (kData.iMyClickDmgLevelSub + 1));
	
	// 초당 데미지
	clientData.nMySecondDmg = XNumToNum(iItemBaseDmg);
	kData.iMySecondDmgLevel = 1;
	kData.iMySecondDmgLevelSub = 1;
	kData.nBaseSecondDmg = XNumToNum(iItemBaseDmg);
	clientData.nNextSecondDmg = XMultiplyEx(XMultiplyEx(kData.nBaseSecondDmg, fItemIncreateDmg * (kData.iMySecondDmgLevelSub + 1)), clientData.iSkillValue[1]/100);
	clientData.nSecondDmgMultiply = [2];
	kData.nBaseSecondDmgBuyMoney = XMultiply(kData.nBaseSecondDmg, clientData.nSecondDmgMultiply);
	clientData.nNextSecondDmgBuyMoney = XMultiplyEx(kData.nBaseSecondDmgBuyMoney, fItemBuyMoney * (kData.iMySecondDmgLevelSub + 1));
	
	kData.iCash = 0;

	kData.fCooltime_Gamemoney = [0,0,0,0];

	kData.timeSTAMP = 0;
	kData.calcedTimeStamp = 0;

	clientData.timeSTAMP = 0;

	kData.iToadLevel = 1;
	clientData.nToadHPIncreate = [2];
	clientData.nToadHPMax = [0,0,1];
	
	kData.nOptionGlod = [0];
	kData.iOptionCash = 0;
	kData.iOptionClickCnt = 0;
	kData.iOptionRebirthCnt = 0;
	kData.iOptionToadCnt = 0;
	kData.iOptionToadLvMax = 0;
	kData.iOptionShurikenLvMax = 1;
	kData.iOptionKunaiLvMax = 1;
	
	clientData.iMyMoneyLengthNum = 1;

	kData.RankVal = 0;
	kData.greappoint = 0;

	//SaveDataInClient();
	networkManager.ForcedSaveData();
}

function SaveDataInClient()
{
    if(loginTF == 0){
        networkManager.GetServerTime(function (_time) {
            clientData[TIME_STAMP] = _time;

            var strJson = JSON.stringify(kData);
            var strJsonClient = JSON.stringify(clientData);
            localStorage.setItem('Neo_NinjaClicker.game.co.kr', strJson);
            localStorage.setItem('Neo_NinjaClickerClient.game.co.kr', strJsonClient);
            saveLocal('Neo_NinjaClicker.game.co.kr');
        });
    }else{
        var strJson = JSON.stringify(kData);
        var strJsonClient = JSON.stringify(clientData);
        localStorage.setItem('Neo_NinjaClicker.game.co.kr', strJson);
        localStorage.setItem('Neo_NinjaClickerClient.game.co.kr', strJsonClient);
        saveLocal('Neo_NinjaClicker.game.co.kr');
	}

//	$.cookie('Neo_NinjaClicker.game.co.kr', strJson, {expires: 9999});
}

function SaveOnlyClientData() {
    var strJsonClient = JSON.stringify(clientData);

    if(strJsonClient != null)
        localStorage.setItem('Neo_NinjaClickerClient.game.co.kr', strJsonClient);
}

function LoadDataInClient()
{
	var strJson = localStorage.getItem('Neo_NinjaClicker.game.co.kr');
	var strJsonClient = localStorage.getItem('Neo_NinjaClickerClient.game.co.kr');
//	var strJson = $.cookie('Neo_NinjaClicker.game.co.kr');



	if(strJson != null)
	{
		kData = JSON.parse(strJson);

        if(kData.iVer === undefined || kData.iVer != SAVE_VER) // 버젼이 없거나 버젼이 다르면 세이브를 초기화 시킨다.
            InitData();
        else
            InitOnlyClient();


		// else if(kData.bTutorial == true)
		// 	InitData();
	}
	else
		InitData();


}

function LoadOnlyClientData() {
    var strJsonClient = localStorage.getItem('Neo_NinjaClickerClient.game.co.kr');

    if(strJsonClient !== undefined && strJsonClient != null)
        clientData = JSON.parse(strJsonClient);
    else
        InitOnlyClient();
}

function InitOnlyClient() {
    clientData.bSoundBGM = true;
    clientData.bSoundSE = true;

    clientData.iSkillValue = $.extend({}, iSkillVauleBase);

    // 클릭당 데미지
    clientData.nMyClickDmg = [1];
    clientData.nNextClickDmg = XMultiplyEx(XMultiplyEx(kData.nBaseClickDmg, fItemIncreateDmg * (kData.iMyClickDmgLevelSub + 1)), clientData.iSkillValue[0]/100);
    clientData.nClickDmgMultiply = [2];	// Math.pow(2, 70)을 할경우 지수로 나와서 설정함
    clientData.nNextClickDmgBuyMoney = XMultiplyEx(kData.nBaseClickDmgBuyMoney, fItemBuyMoney * (kData.iMyClickDmgLevelSub + 1));

    // 초당 데미지
    clientData.nMySecondDmg = XNumToNum(iItemBaseDmg);
    clientData.nNextSecondDmg = XMultiplyEx(XMultiplyEx(kData.nBaseSecondDmg, fItemIncreateDmg * (kData.iMySecondDmgLevelSub + 1)), clientData.iSkillValue[1]/100);
    clientData.nSecondDmgMultiply = [2];
    clientData.nNextSecondDmgBuyMoney = XMultiplyEx(kData.nBaseSecondDmgBuyMoney, fItemBuyMoney * (kData.iMySecondDmgLevelSub + 1));

    clientData.nToadHPIncreate = [2];
    clientData.nToadHPMax = [0,0,1];

    clientData.iMyMoneyLengthNum = 1;

    SaveOnlyClientData();
}

//=============================================================================
// SpritePool을 관리한다. 남이 사용하던거 카피함..
//=============================================================================
function SpritePool ()
{
    if (SpritePool._isBirth)
        throw new Error("This class is a singleton!");
    else
    {
        SpritePool._instance = this;
        SpritePool._isBirth = true;
    };
    var _pool = [];
    this.get = function (frameId)
    {
        for (var i in _pool)
        {
            if (_pool[i].texture === PIXI.TextureCache[frameId])
            return _pool.splice(i, 1)[0];
        }
        return PIXI.Sprite.fromFrame(frameId);
    };
    this.recycle = function (sprite)
    {
        _pool.push(sprite);
    }
};
SpritePool._isBirth = false;
SpritePool.getInstance = function ()
{
    return SpritePool._instance != null ? SpritePool._instance : new SpritePool();
};
//=============================================================================
//버튼 스케일링
//=============================================================================
Object.defineProperties(PIXI.Sprite.prototype, {
	scaleX: {
	     get: function () { return this.scale.x; },
	     set: function (v) { this.scale.x = v; }
	},
	scaleY: {
	     get: function () { return this.scale.y; },
	     set: function (v) { this.scale.y = v; }
	}
});//pixi.js의 sprite에 greensock tweenmax scale을 적용하기 위한 프로퍼티 설정.

function scaleUp(){ //크기 키우기
	TweenMax.to(this, 0.2, {scaleX:1.05, scaleY:1.05, ease:Back.easeOut.config(5.0)});
}

function restoreScale(){ //크기 되돌리기
	TweenMax.to(this, 0.2, {scaleX:1, scaleY:1, ease:Linear()});
}

// TweenPlay(sStar, 1, 0, null, {alpha: 1}, false, PIXI.tween.Easing.outQuad());
// linear, inQuad, outQuad, inOutQuad, inCubic, outCubic, inOutCubic
// inQuart, outQuart, inOutQuart, inQuint, outQuint, inOutQuint
// inSine, outSine, inOutSine, inExpo, outExpo, inOutExpo, inCirc, outCirc, inOutCirc,
/*
var Easing = {
  linear: function(){return function(t){return t;};},
  inQuad: function(){return function(t){return t*t;};},
  outQuad: function(){return function(t){return t*(2-t);};},
  inOutQuad: function(){return function(t){t *= 2;if ( t < 1 ) return 0.5 * t * t;return - 0.5 * ( --t * ( t - 2 ) - 1 );};},
  inCubic: function(){return function(t){return t * t * t;};},
  outCubic: function(){return function(t){return --t * t * t + 1;};},
  inOutCubic: function(){return function(t){t *= 2;if ( t < 1 ) return 0.5 * t * t * t;t -= 2return 0.5 * ( t * t * t + 2 );};},
  inQuart: function(){return function(t){return t * t * t * t;};},
  outQuart: function(){return function(t){return 1 - ( --t * t * t * t );};},
  inOutQuart: function(){return function(t){t *= 2;if ( t < 1) return 0.5 * t * t * t * t;t -= 2;return - 0.5 * ( t * t * t * t - 2 );};},
  inQuint: function(){return function(t){return t * t * t * t * t;};},
  outQuint: function(){return function(t){return --t * t * t * t * t + 1;};},
  inOutQuint: function(){return function(t){t *= 2;if ( t < 1 ) return 0.5 * t * t * t * t * t;t -= 2;return 0.5 * ( t * t * t * t * t + 2 );};},
  inSine: function(){return function(t){return 1 - Math.cos( t * Math.PI / 2 );};},
  outSine: function(){return function(t){return Math.sin( t * Math.PI / 2 );};},
  inOutSine: function(){return function(t){return 0.5 * ( 1 - Math.cos( Math.PI * t));};},
  inExpo: function(){return function(t){return t === 0 ? 0 : Math.pow( 1024, t - 1 );};},
  outExpo: function(){return function(t){return t === 1 ? 1 : 1 - Math.pow( 2, - 10 * t );};},
  inOutExpo: function(){return function(t){if ( t === 0 ) return 0;if ( t === 1 ) return 1;t *= 2;if ( t < 1 ) return 0.5 * Math.pow( 1024, t - 1 );return 0.5 * ( - Math.pow( 2, - 10 * ( t - 1 ) ) + 2 );};},
  inCirc: function(){return function(t){return 1 - Math.sqrt( 1 - t * t );};},
  outCirc: function(){return function(t){return Math.sqrt( 1 - ( --t * t ) );};},
  inOutCirc: function(){return function(t){t *= 2;if ( t < 1) return - 0.5 * ( Math.sqrt( 1 - t * t) - 1);return 0.5 * ( Math.sqrt( 1 - (t - 2) * (t - 2)) + 1);};},
  inElastic: function(a = 0.1,p = 0.4){return function(t){let s;if ( t === 0 ) return 0;if ( t === 1 ) return 1;if ( !a || a < 1 ) { a = 1; s = p / 4; }else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );return - ( a * Math.pow( 2, 10 * (t-1) ) * Math.sin( ( (t-1) - s ) * ( 2 * Math.PI ) / p ) );};},
  outElastic: function(a = 0.1,p = 0.4){return function(t){let s;if ( t === 0 ) return 0;if ( t === 1 ) return 1;if ( !a || a < 1 ) { a = 1; s = p / 4; }else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );return ( a * Math.pow( 2, - 10 * t) * Math.sin( ( t - s ) * ( 2 * Math.PI ) / p ) + 1 );};},
  inOutElastic: function(a = 0.1,p = 0.4){return function(t){let s;if ( t === 0 ) return 0;if ( t === 1 ) return 1;if ( !a || a < 1 ) { a = 1; s = p / 4; }else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );t *= 2;if ( t < 1 ) return - 0.5 * ( a * Math.pow( 2, 10 * ( t - 1 ) ) * Math.sin( ( (t-1) - s ) * ( 2 * Math.PI ) / p ) );return a * Math.pow( 2, -10 * ( t - 1 ) ) * Math.sin( ( (t-1) - s ) * ( 2 * Math.PI ) / p ) * 0.5 + 1;};},
  inBack: function(v){return function(t){let s = v || 1.70158;return t * t * ( ( s + 1 ) * t - s );};},
  outBack: function(v){return function(t){let s = v || 1.70158;return --t * t * ( ( s + 1 ) * t + s ) + 1;};},
  inOutBack: function(v){return function(t){let s =  (v || 1.70158) * 1.525;t *= 2;if ( t < 1 ) return 0.5 * ( t * t * ( ( s + 1 ) * t - s ) );return 0.5 * ( ( t - 2 ) * (t-2) * ( ( s + 1 ) * (t-2) + s ) + 2 );};},
  inBounce: function(){return function(t){return 1 - Easing.outBounce()( 1 - t );};},
  outBounce: function(){return function(t){if ( t < ( 1 / 2.75 ) ) {return 7.5625 * t * t;} else if ( t < ( 2 / 2.75 ) ) {t = ( t - ( 1.5 / 2.75 ) );return 7.5625 * t * t + 0.75;} else if ( t < ( 2.5 / 2.75 ) ) {t = (t - ( 2.25 / 2.75 ));return 7.5625 * t * t + 0.9375; } else {t -= ( 2.625 / 2.75 );return 7.5625 * t * t + 0.984375; }};},
  inOutBounce: function(){return function(t){if ( t < 0.5 ) return Easing.inBounce()( t * 2 ) * 0.5;return Easing.outBounce()( t * 2 - 1 ) * 0.5 + 0.5;};},
  customArray: function(arr){if(!arr)return Easing.linear();return function(t){//todo: convert array => ease return t;}}
};
export default Easing;
 */
// 트윈할 오브젝트, 플레이타임, 딜레이타임, from, to, 루프 여부, easing메쏘드
function TweenPlay(obj, playtime, delaytime, from, to, loop, easing, callback)
{
	var tween = PIXI.tweenManager.createTween(obj);
	tween.time = playtime * 1000;
	tween.delay = delaytime * 1000;
	tween.easing = easing;
	if(from != null)	tween.from(from);
    if(to != null)		tween.to(to);
	tween.loop = loop;
	tween.start();
	
	if(callback != undefined)
		tween.on('end', callback);
	
	return tween;
}
//=============================================================================
// 숫자 관련 로직 
//=============================================================================
function XPlus(iA, iB)
{
	var max = Math.max(iA.length, iB.length);
	var iC = [];
	for(var i=0;i<max;++i)
	{
		if(iC[i] === undefined) iC[i] = 0;
		
		if(iA[i] != null && iB[i] != null)
			iC[i] += iA[i] + iB[i];
		else{
			if(iA[i] != null)	iC[i] += iA[i];
			else				iC[i] += iB[i];
		}
		// 올림 처리..
		if(iC[i] >= 10) // 올림작업
		{
			iC[i+1] = Math.floor(iC[i] / 10);
			iC[i] = iC[i] % 10;
		}
	}
	
	return iC;
}

// 캐쉬나 아이템 구매시 이 비교문으로 비교후에 구매를 할수 있을때 구매한다.
function IsXMinus(iA, iB)
{
	if(iA.length < iB.length) // 오른쪽이 자릿수가 맞으면 마이너스를 할수 없다
		return false;
	else if(iA.length == iB.length) // 값이 같을경우 비교해서 왼쪽이 크면 true, 오른쪽이 크면 false;
	{
		for(var i=iA.length-1;i>=0;--i)
		{
			if(iA[i] > iB[i])
				return true;
			else if(iA[i] < iB[i])
				return false;
		}
	}
	else
		return true;
		
	return true;
}

function XMinus(iA, iB)
{
	if(iA.length < iB.length)	return [0];	// 오른쪽이 클경우 0으로 처리한다. 
		
	var max = Math.max(iA.length, iB.length); // iA가 같거나 무조건 커야 한다.
	var iC = [];
	for(var i=0;i<max;++i)
	{
		if(iC[i] === undefined) iC[i] = 0;
		
		if(iA[i] != null && iB[i] != null)
			iC[i] = iC[i] + iA[i] - iB[i];
		else{
			if(iA[i] != null)	iC[i] += iA[i];
			else				iC[i] += iB[i];
		}

		if(iC[i] < 0) // 올림작업
		{
			iC[i] = 10 + iC[i];
			iC[i+1] = -1;
		}		
	}
	
	// 앞쪽에 0이 들어가게 되면 빼준다.
	for(var i=iC.length-1;i>0;--i)
	{
		if(iC[i] == 0)
			iC.pop();
		else
			break;
	}
	
	// 0보다 작을경우 0을 반환한다.
	for(var i=iC.length-1;i>=0;--i)
		if(iC[i] < 0)
			return [0];
	
	return iC;
}

function XMultiply(iA, iB)
{
	var iS = [];
	for(var i=0;i<iB.length;++i)
	{
		var iC = [];
		for(var j=0;j<i;++j) // 10의배수 자릿수 설정..
			iC[j] = 0;
		for(var j=0;j<iA.length;++j)
		{
			if(iC[j+i] === undefined) iC[j+i] = 0;
			iC[j+i] += iB[i] * iA[j];
			if(iC[j+i] >= 10) // 올림작업
			{
				iC[j+i+1] = Math.floor(iC[j+i] / 10);
				iC[j+i] = iC[j+i] % 10;
			}
		}
		iS = XPlus(iS, iC);
	}
	
	return iS;
}

// 소수점이나 지수갑으로 들어온값으로 계산한다.
function XMultiplyEx(iA, iT)
{
	var iS = [];
	var iB = [];
	var multiply = 0;
	if(iT.toString().indexOf(".") >= 0) // 소수점일경우..
	{
		multiply = iT.toString().length - (iT.toString().indexOf(".") + 1);
		iT = Math.floor(iT * Math.pow(10, multiply));
	}
	iB = XNumToNum(iT);
	
	for(var i=0;i<iB.length;++i)
	{
		var iC = [];
		for(var j=0;j<i;++j) // 10의배수 자릿수 설정..
			iC[j] = 0;
		for(var j=0;j<iA.length;++j)
		{
			if(iC[j+i] === undefined) iC[j+i] = 0;
			iC[j+i] += iB[i] * iA[j];
			if(iC[j+i] >= 10) // 올림작업
			{
				iC[j+i+1] = Math.floor(iC[j+i] / 10);
				iC[j+i] = iC[j+i] % 10;
			}
		}
		iS = XPlus(iS, iC);
	}
	
	if(multiply > 0)
		for(var i=0;i<multiply;++i)
			iS.shift();
	
	return iS;
}


// 문자열을 숫자로 변경.
function XStringToNum(str)
{
	var iT = [];
	var is = 0;
	for(var i=0;i<str.length;++i)
	{
		is = str.length - 1 - i;
		iT[i] = parseInt(str.slice(is, is+1)); // 거꾸로 넣는다.
	}
	return iT;
}

function NumToXNum(_str) {
	var iretVal = 0;
	for(var i=0,imax=_str.length;i<imax;++i){
		iretVal += (Math.pow(10,i) * _str[i]);
	}

	return iretVal;
}

function XNumToNum(num)
{
    var iT = [];

    var bCheck = false;

    if(num.toString().length > 4){
        var calc10Data = 0;

        for(var i=0,imax = num.toString().length;i<imax;++i){
            if(num.toString()[i] == 'e' && num.toString().length > i+1 && num.toString()[i+1] == '+'){
                bCheck = true;
            }

            if(num.toString()[2+i] === undefined)
                break;

            if(bCheck){
                calc10Data *= 10;
                calc10Data += (num.toString()[i+2]*1);
            }
        }

        for(var i=0,imax=calc10Data;i<imax;++i){
            iT[i] = 0;
        }
        iT[iT.length] = 1;
    }

    if(!bCheck){
        var str = num.toString();
        var is = 0;
        for(var i=0;i<str.length;++i)
        {
            is = str.length - 1 - i;
            iT[i] = parseInt(str.slice(is, is+1)); // 거꾸로 넣는다.
        }
	}

	return iT;
}
/*
function XNumViewString(iA)
{
	var str = "";
	for(var i=iA.length-1;i>=0;--i)
		str += iA[i];
	return str;
}
*/
// 단위처리..
function XNumViewString(iA)
{
	var str = "";
	var res = "";
	var len = iA.length;
	for(var i=len-1;i>=0;--i)
		str += iA[i];
	
	if(len >= 4)
	{
		switch(len%3)
		{
		case 0:
			res += str.slice(0,3) + "." + str.slice(3,4);
			break;
		case 1:
			res += str.slice(0,1) + "." + str.slice(1,2);
			break;
		case 2:
			res += str.slice(0,2) + "." + str.slice(2,3);
			break;
		}
		len--;
		if(Math.floor(len/3) <= 26)
			res += String.fromCharCode(64 + Math.floor(len/3));
		else if(Math.floor(len/3) <= 52)
			res += String.fromCharCode(64 + (Math.floor(len/3)-26)) + String.fromCharCode(64 + (Math.floor(len/3)-26));
		else if(Math.floor(len/3) <= 78)
            res += String.fromCharCode(64 + (Math.floor(len/3)-52)) + String.fromCharCode(64 + (Math.floor(len/3)-52)) + String.fromCharCode(64 + (Math.floor(len/3)-52));
		else
            res += String.fromCharCode(64 + (Math.floor(len/3)-78)) + String.fromCharCode(64 + (Math.floor(len/3)-78)) + String.fromCharCode(64 + (Math.floor(len/3)-78)) + String.fromCharCode(64 + (Math.floor(len/3)-78));
	}
	else
		res = str;
	return res;
}

function XNumViewStringEx(iA)
{
	var str = "";
	var res = "";
	var len = iA;
	
	if(len >= 4)
	{
		switch(len%3)
		{
		case 0:
			str = "1000";
			res += str.slice(0,3) + "." + str.slice(3,4);
			break;
		case 1:
			str = "10";
			res += str.slice(0,1) + "." + str.slice(1,2);
			break;
		case 2:
			str = "100";
			res += str.slice(0,2) + "." + str.slice(2,3);
			break;
		}
		len--;
		if(Math.floor(len/3) <= 26)
			res += String.fromCharCode(64 + Math.floor(len/3));
		else if(Math.floor(len/3) <= 52)
			res += String.fromCharCode(64 + (Math.floor(len/3)-26)) + String.fromCharCode(64 + (Math.floor(len/3)-26));
        else if(Math.floor(len/3) <= 78)
            res += String.fromCharCode(64 + (Math.floor(len/3)-52)) + String.fromCharCode(64 + (Math.floor(len/3)-52)) + String.fromCharCode(64 + (Math.floor(len/3)-52));
        else
            res += String.fromCharCode(64 + (Math.floor(len/3)-78)) + String.fromCharCode(64 + (Math.floor(len/3)-78)) + String.fromCharCode(64 + (Math.floor(len/3)-78)) + String.fromCharCode(64 + (Math.floor(len/3)-78));
	}
	else
		res = str;
	return res;
}

function XNumViewStringComma(iA)
{
	var str = "";
	var len = iA.length;
	var min = 0;
	var n = 0;
	if(len > 18)
	{
		n = Math.floor((len-19)/3)+1;
		min = n * 3;
	}
	
	for(var i=len-1;i>=min;--i)
	{
		str += iA[i];
		if(i!=min && i%3 == 0)
			str += ",";
	}
	
	if(n > 0)
	{
		if(n <= 26)
			str += String.fromCharCode(64 + n);
		else if(n <= 52)
            str += String.fromCharCode(64 + (n-26)) + String.fromCharCode(64 + (n-26));
        else if(n <= 78)
            str += String.fromCharCode(64 + (n-52)) + String.fromCharCode(64 + (n-52)) + String.fromCharCode(64 + (n-52));
        else
            str += String.fromCharCode(64 + (n-78)) + String.fromCharCode(64 + (n-78)) + String.fromCharCode(64 + (n-78)) + String.fromCharCode(64 + (n-78));

	}
	return str;
}