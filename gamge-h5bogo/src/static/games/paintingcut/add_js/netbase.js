var yahooIN = yahooIN || void 0x0,
    yahooTest = void 0x0 === yahooTest ? void 0x0 : yahooTest,
    strGamePath = strGamePath || '',


    getTimestamp = function () {
        //networkManager['GetServerTimeComplete'](result);
        //return;


        proto['stat'] = statusTYPE['LOGOUTTIME'];

        console.warn(baseURL);
        var data = $['post'](baseURL, proto);

        data['done'](function (result) {
            0x1 == result['TF']
                ? networkManager['GetServerTimeComplete'](result) //获取服务器时间完成
                : errorProcess(result);
        }),
            data['fail'](function (result) {
                errorProcess(result);
            });
    },


    servicePos = 0x0,
    networkTF = 0x0,
    Deduplication = function (clientSave) {
        return clientSave['reduce'](function (ids, id) {
            return ids['indexOf'](id) < 0x0 && ids['push'](id), ids;
        }, []);
    },
    saveLocal = function (name) {
        if (void 0x0 != localStorage['clientSaveList']) {
            var clientSave = localStorage['clientSaveList']['split'](',');
            clientSave['push'](name),
                clientSave = Deduplication(clientSave),
                localStorage['clientSaveList'] = clientSave['toString']();
        } else localStorage['clientSaveList'] = name;
    },
    apkTF = 0x0,
    baseURL;
baseURL = void 0x0 === yahooIN
    ? '/scr/network/control.do'
    : 'https://game.jp/yahoo/ctr/network/control.do';

var statusTYPE = {
        'LOADING': 0x1, 'SAVE': 0x2, 'RANKING': 0x3, 'TAKE': 0x4, 'PLAYTABLE_LOGIN': 0x5, 'PURCHASE': 0x6,
        'NETWORKLOAD': 0x7, 'NETWORKSAVE': 0x8, 'PLAYTABLE_LOGOUT': 0x26f3, 'LOGOUTTIME': 0x26f6, 'PURCHASE_LOGOUT': 0x26f5,
        'LOGOUTRANK': 0x26f4, 'adType': 0x26f7, 'BASE_INFO': 0x26fa, 'GETPARA': 0x2706, 'SLOT_LOAD': 0x385,
        'SLOT_CALL': 0x386, 'SLOT_SHOP': 0x387, 'SLOT_SPEICAL': 0x388, 'SLOT_MEGA': 0x389, 'SLOT_DAILY': 0x38a,
        'SLOT_PAY': 0x38b, 'SLOT_DOUBLEUPINIT': 0x38c, 'SLOT_DOUBLEUPPICK': 0x38d, 'SLOT_DOUBLEUPSTOP': 0x38e,
        'ID_CHANGE': 0x321, 'YHAOO_EVENT_LIST': 0x7d0, 'YAHOO_EVENT_SKIP': 0x7d1, 'YAHOO_INAPP_LIST': 0xfa1,
        'YAHOO_INAPP_CALL': 0xfa2, 'YAHOO_INAPP_CHECK': 0xfa3, 'IKON_RANK': 0x1387
    },
    proto;

void 0x0 == yahooIN && (proto = {
    'stat': 0x0,
    'gidx': 0x0,
    'actk': null,
    'save': null,
    'RankVal': 0x0,
    'gamemoney': 0x0,
    'UseCount': 0x1,
    'serPos': 0x0,
    'takeType': 0x1,
    'mkidx': 0x0,
    'batMoney': 0x0,
    'prize': 0x0
});

var gidx = 0x0,
    lang;
lang = void 0x0 !== yahooIN ? 'ja' : 'ko';

var actk = null,
    loginTF = 0x0,

    setAcctk = function (actk) {
        proto['actk'] = actk,
        void 0x0 == yahooIN
        && parent['postMessage']('{"TKchange":"' + actk + '"}', '*');
    },
    requestRepeat = {
        'RequestTimerID': 0x0,
        'RequestTerm': 0x7d0,
        'RequestFunc': null,
        'RepeatTIme': 0x0,
        'RepeatTImeMax': 0x3,
        'b_Repeating': !0x1
    },
    errorProcess = function (v) {
        requestRepeat['b_Repeating'] || (requestRepeat['b_Repeating'] = !0x0,
            requestRepeat['RequestTimerID'] = setInterval('RequestRepeating()',
                requestRepeat['RequestTerm']));
    },
    datacheckErrorProcess = function (v) {
        parent['postMessage']('{"disease":"1"}', '*');
    },
    memberCall = function () {
        parent['postMessage']('{"memberCALL":"1"}', '*');
    },
    setGidx = function (gidx) {
        proto['gidx'] = gidx;
    },
    logOutRanking = function () {
        proto['RankVal'] = 0x0,
            proto['save'] = null,
            proto['stat'] = statusTYPE['LOGOUTRANK'],
        null == requestRepeat['RequestFunc']
        && (requestRepeat['RequestFunc'] = function () {
            logOutRanking();
        });
        var data = $['post'](baseURL, proto);
        data['done'](function (result) {
            0x1 == result['TF']
                ? (setAcctk(result['actk']), requestRepeat['b_Repeating'] && (clearInterval(requestRepeat['RequestTimerID']),
                    requestRepeat['b_Repeating'] = !0x1,
                    requestRepeat['RequestFunc'] = null),
                    networkManager['LoadRankingComplete'](result))
                : datacheckErrorProcess(result);
        }),
            data['fail'](function (result) {
                errorProcess(result);
            });
    },
    getRankingList = function () {
        if (0x0 == loginTF || null == proto['actk']) return logOutRanking(), !0x1;
        proto['RankVal'] = 0x0,
            proto['save'] = null,
            proto['stat'] = statusTYPE['RANKING'],
        null == requestRepeat['RequestFunc']
        && (requestRepeat['RequestFunc'] = function () {
            getRankingList();
        });
        var data = $['post'](baseURL, proto);
        data['done'](function (result) {
            0x1 == result['TF'] ? (setAcctk(result['actk']), requestRepeat['b_Repeating'] && (clearInterval(requestRepeat['RequestTimerID']), requestRepeat['b_Repeating'] = !0x1, requestRepeat['RequestFunc'] = null), networkManager['LoadRankingComplete'](result)) : datacheckErrorProcess(result);
        }),
            data['fail'](function (result) {
                errorProcess(result);
            });
    },

    savecall = function (sendData, isNull, name) {
        if (0x0 == loginTF || null == proto['actk']) return !0x1;
        proto['RankVal'] = 0x0, void 0x0 !== sendData[isNull]
        && (proto['RankVal'] = sendData[isNull]),
            proto['save'] = JSON['stringify'](sendData),
            proto['stat'] = 0x0 == networkTF
                ? statusTYPE['SAVE']
                : statusTYPE['NETWORKSAVE'],

            proto['gamemoney'] = name,
        null == requestRepeat['RequestFunc']
        && (requestRepeat['RequestFunc'] = function () {
            savecall(sendData, isNull, name);
        });
        var data = $['post'](baseURL, proto);
        data['done'](function (result) {
            0x1 == result['TF'] ? (setAcctk(result['actk']), requestRepeat['b_Repeating'] && (clearInterval(requestRepeat['RequestTimerID']), requestRepeat['b_Repeating'] = !0x1, requestRepeat['RequestFunc'] = null), networkManager['SaveDataComplete'](result)) : datacheckErrorProcess(result);
        }), data['fail'](function (result) {
            errorProcess(result);
        });
    },
    dataLoading = function () {
        if (0x0 == loginTF || null == proto['actk']) return !0x1;
        proto['stat'] = 0x0 == networkTF ? statusTYPE['LOADING'] : statusTYPE['NETWORKLOAD'], null == requestRepeat['RequestFunc'] && (requestRepeat['RequestFunc'] = function () {
            dataLoading();
        });
        var data = $['post'](baseURL, proto);
        data['done'](function (result) {
            0x1 == result['TF'] ? (setAcctk(result['actk']), requestRepeat['b_Repeating'] && (clearInterval(requestRepeat['RequestTimerID']), requestRepeat['b_Repeating'] = !0x1, requestRepeat['RequestFunc'] = null), networkManager['LoadDataComplete'](result['data'])) : datacheckErrorProcess(result);
        }), data['fail'](function (result) {
            errorProcess(result);
        });
    },

    getParameter = function (key) {
        for (var uri,
                 loc = location['href']['replace'](/amp;/gi, ''),
                 locb = loc['slice'](loc['indexOf']('?') + 0x1,
                     loc['length'])['split']('&'),
                 n = 0x0; n < locb['length']; n++)
            if (locb[n]['split']('=')[0x0]['toUpperCase']() == key['toUpperCase']())
                return uri = locb[n]['split']('=')[0x1], decodeURIComponent(uri);

        return null;
    },


    marketList = function (shopType) {
        if (0x2 != shopType && 0x1 != shopType) return !0x1;
        proto['stat'] = 0x0 == loginTF || null == proto['actk']
            ? statusTYPE['PLAYTABLE_LOGOUT']
            : statusTYPE['PLAYTABLE_LOGIN'],
            proto['takeType'] = shopType,
        null == requestRepeat['RequestFunc']
        && (requestRepeat['RequestFunc'] = function () {
            marketList(shopType);
        });
        var data = $['post'](baseURL, proto);
        data['done'](function (result) {
            0x1 == result['TF'] ? (setAcctk(result['actk']), requestRepeat['b_Repeating'] && (clearInterval(requestRepeat['RequestTimerID']), requestRepeat['b_Repeating'] = !0x1, requestRepeat['RequestFunc'] = null), networkManager['GetShoppingListComplete'](result['data'])) : datacheckErrorProcess(result);
        }), data['fail'](function (result) {
            errorProcess(result);
        });
    },

    heartUse = function (useCount) {
        if (useCount <= 0x0) return !0x1;
        if (0x0 == loginTF || null == proto['actk']) return !0x1;
        proto['stat'] = statusTYPE['TAKE'],
            proto['UseCount'] = useCount,
        null == requestRepeat['RequestFunc']
        && (requestRepeat['RequestFunc'] = function () {
            heartUse();
        });
        var data = $['post'](baseURL, proto);
        data['done'](function (result) {
            0x1 == result['TF'] ? (setAcctk(result['actk']),
                requestRepeat['b_Repeating']
                && (clearInterval(requestRepeat['RequestTimerID']),
                    requestRepeat['b_Repeating'] = !0x1,
                    requestRepeat['RequestFunc'] = null),
                    networkManager['UseHeartComplete'](result))
                : datacheckErrorProcess(result);
        }),
            data['fail'](function (result) {
                errorProcess(result);
            });
    },
    logoutPay = function (mkidx) {
        proto['stat'] = statusTYPE['PURCHASE_LOGOUT'],
            proto['mkidx'] = mkidx,
        null == requestRepeat['RequestFunc']
        && (requestRepeat['RequestFunc'] = function () {
            logoutPay(mkidx);
        });
        var data = $['post'](baseURL, proto);
        data['done'](function (result) {
            0x1 == result['TF'] ? (setAcctk(result['actk']), requestRepeat['b_Repeating'] && (clearInterval(requestRepeat['RequestTimerID']), requestRepeat['b_Repeating'] = !0x1, requestRepeat['RequestFunc'] = null), networkManager['LoadDataComplete'](result['data'])) : datacheckErrorProcess(result);
        }), data['fail'](function (result) {
            errorProcess(result);
        });
    },

    mkPayment = function (mkidx) {
        if (mkidx <= 0x0) return !0x1;
        if (0x1 == apkTF && (proto['stat'] = statusTYPE['adType'],
            proto['mkidx'] = mkidx,
            (data = $['post'](baseURL, proto))['done'](function (_0x15ccd2) {
                0x1 == _0x15ccd2['TF'] && parent['postMessage']('{"ad":"' + _0x15ccd2['pType'] + '"}', '*');
            })),
        0x0 != loginTF
        && null != proto['actk']) {
            proto['stat'] = statusTYPE['PURCHASE'], proto['mkidx'] = mkidx, null == requestRepeat['RequestFunc'] && (requestRepeat['RequestFunc'] = function () {
                mkPayment(mkidx);
            });
            var data = $['post'](baseURL, proto);
            data['done'](function (result) {
                0x1 == result['TF'] ? (setAcctk(result['actk']), requestRepeat['b_Repeating'] && (clearInterval(requestRepeat['RequestTimerID']), requestRepeat['b_Repeating'] = !0x1, requestRepeat['RequestFunc'] = null), networkManager['LoadDataComplete'](result['data'])) : datacheckErrorProcess(result);
            }), data['fail'](function (result) {
                errorProcess(result);
            });
        } else logoutPay(mkidx);
    },

    googleplaypopCall = function () {
        window['open']('https://play.google.com/store/apps/details?id=com.game.home', '_blank');
    },
    baseinfoCall = function (backup) {
        proto['stat'] = statusTYPE['BASE_INFO'], null == requestRepeat['RequestFunc'] && (requestRepeat['RequestFunc'] = function () {
            baseinfoCall(backup);
        }),
            $['post'](baseURL, proto)['done'](function (result) {
                0x1 == result['TF'] ? (requestRepeat['b_Repeating'] && (clearInterval(requestRepeat['RequestTimerID']), requestRepeat['b_Repeating'] = !0x1, requestRepeat['RequestFunc'] = null),
                    networkManager['GetGameInfoComplete'](result)) : errorProcess(result);
            });
    },
    idchange = function (uid, pName) {
        if (0x0 == loginTF || null == proto['actk']) return !0x1;
        proto['stat'] = statusTYPE['ID_CHANGE'], proto['uid'] = uid, $['post'](baseURL, proto)['done'](function (result) {
            pName(result),
            0x1 == result['TF']
            && (setAcctk(result['actk']),
            0x0 == servicePos && parent['postMessage']({'ID_CHANGE': uid}, '*'));
        });
    },

    inappList = function (pName) {
        if (0x0 == loginTF || null == proto['actk']) return !0x1;
        proto['stat'] = statusTYPE['YAHOO_INAPP_LIST'];
        var _0x2393ec = {'NORMAL': 0x1, 'EVENT': 0x2, 'TEST': 0x3};
        proto['inappType'] = _0x2393ec['TEST'], $['post'](baseURL, proto)['done'](function (result) {
            0x1 == result['TF'] && (setAcctk(result['actk']), pName(result));
        });
    },
    inappCall = function (product_code, v) {
        if (0x0 == loginTF || null == proto['actk']) return !0x1;
        if (void 0x0 == yahooTest || 0x0 == yahooTest) return !0x1;
        var data = $['post']('https://game.jp/yahoo/inapp/start/test/index.do', {
            'user_id': 'c8ea76167e3b4d3c8fdb25170cae81f28fc02e7b', 'product_code': product_code, 'price': 0x1f4
        });
        data['done'](function (result) {
            inappCHECK(result['transaction_code'], product_code);
        }), data['fail'](function (result) {
        });
    },
    inappCHECK = function (transaction_code, product_code) {
        if (0x0 == loginTF || null == proto['actk']) return !0x1;
        proto['stat'] = statusTYPE['YAHOO_INAPP_CHECK'];
        $['post']('https://game.jp/yahoo/inapp/end/test/index.do', {
            'transaction_code': transaction_code, 'product_code': product_code, 'purchase_status': 'puchase'
        })['done'](function (result) {
        });
    },
    yahooenventLIst = function (pName) {
        if (0x0 == loginTF || null == proto['actk']) return !0x1;
        proto['stat'] = statusTYPE['YHAOO_EVENT_LIST'], $['post'](baseURL, proto)['done'](function (result) {
            pName(result);
        });
    },
    yahooenventSkip = function (yeidx) {
        if (0x0 == loginTF || null == proto['actk']) return !0x1;
        proto['stat'] = statusTYPE['YAHOO_EVENT_SKIP'], proto['yeidx'] = yeidx, $['post'](baseURL, proto)['done'](function (result) {
        });
    },

    yahooInappURL = '';

$(document)['ready'](function () {
    /*   loginTF = getParameter('login'),
           loginTF = null == loginTF || '' == loginTF ? 0x0 : parseInt(loginTF),
       void 0x0 != yahooIN && (loginTF = 0x1, yahooInappURL = 0x1 == yahooTest ? 'https://gameqa.private-games.yahoo-net.jp:20443/purchase/casual/' + contents_code : 'https://games.yahoo-net.jp/purchase/casual/' + contents_code),
           gidx = getParameter('g'),
       0x0 != (gidx = null == gidx || '' == gidx ? 0x0 : parseInt(gidx)) && setGidx(gidx),
           lang = getParameter('lang'),
           lang = void 0x0 !== yahooIN ? null == lang || '' == lang ? 'ja' : lang : null == lang || '' == lang ? 'ko' : lang, apkTF = getParameter('apkTF'),
           apkTF = null == apkTF || '' == apkTF ? '0' : apkTF,
           apkTF = parseInt(apkTF),
           actk = getParameter('actk'),
       null != (actk = null == actk || '' == actk || 0x80 != actk['length'] ? null : actk) && setAcctk(actk),
           networkTF = getParameter('networkTF'),
           networkTF = null == networkTF || '' == networkTF ? 0x0 : parseInt(networkTF),
           servicePos = getParameter('servicePos'),
           servicePos = void 0x0 != yahooIN ? null == servicePos || '' == servicePos ? 0x1 : parseInt(servicePos) : null == servicePos || '' == servicePos ? 0x0 : parseInt(servicePos),
           setServicePos(servicePos);*/
});


net_RankSave = function (RankVal, kData, pName) {
    if (console['log']('=======movi network===score====' + RankVal), 0x0 == loginTF)
        return (_0x35939d = {})['TF'] = 0x1f4,
            void pName(_0x35939d);

    if (null == proto['actk']) {
        var _0x35939d = {};
        return _0x35939d['TF'] = 0x1f5,
            void pName(_0x35939d);
    }
    proto['stat'] = statusTYPE['SAVE'],
        proto['RankVal'] = RankVal,
        proto['save'] = JSON['stringify'](kData);

    var data = $['post'](baseURL, proto);
    data['done'](function (_0x2fb76a) {
        pName(_0x2fb76a);
    }),
        data['fail'](function (_0x4bb45b) {
            pName(_0x4bb45b);
        });
};


function RequestRepeating() {
    requestRepeat['RepeatTIme']++,
        requestRepeat['RepeatTIme'] <= requestRepeat['RepeatTImeMax']
            ? requestRepeat['RequestFunc']()
            : parent['postMessage']('{"disease":"1"}', '*');
}