

var yahooIN = yahooIN || void 0x0,
    yahooTest = void 0x0 === yahooTest ? void 0x0 : yahooTest,
    strGamePath = strGamePath || '',
    getTimestamp = function () {
        proto['stat'] = statusTYPE['LOGOUTTIME'];
        var _0x180d86 = $['post'](baseURL, proto);
        _0x180d86['done'](function (_0x4faebc) {
            0x1 == _0x4faebc['TF'] ? networkManager['GetServerTimeComplete'](_0x4faebc) : errorProcess(_0x4faebc);
        }), _0x180d86['fail'](function (_0x3b3f16) {
            errorProcess(_0x3b3f16);
        });
    },
    servicePos = 0x0,
    networkTF = 0x0,
    Deduplication = function (_0x1fd80c) {
        return _0x1fd80c['reduce'](function (_0x394964, _0x21118a) {
            return _0x394964['indexOf'](_0x21118a) < 0x0 && _0x394964['push'](_0x21118a), _0x394964;
        }, []);
    },
    saveLocal = function (_0x3e5497) {
        if (void 0x0 != localStorage['clientSaveList']) {
            var _0x2a717d = localStorage['clientSaveList']['split'](',');
            _0x2a717d['push'](_0x3e5497), _0x2a717d = Deduplication(_0x2a717d), localStorage['clientSaveList'] = _0x2a717d['toString']();
        } else localStorage['clientSaveList'] = _0x3e5497;
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

    setAcctk = function (_0x4e632f) {
        proto['actk'] = _0x4e632f,
        void 0x0 == yahooIN && parent['postMessage']('{"TKchange":"' + _0x4e632f + '"}', '*');
    },
    requestRepeat = {
        'RequestTimerID': 0x0,
        'RequestTerm': 0x7d0,
        'RequestFunc': null,
        'RepeatTIme': 0x0,
        'RepeatTImeMax': 0x3,
        'b_Repeating': !0x1
    },
    errorProcess = function (_0x4ea759) {
        requestRepeat['b_Repeating'] || (requestRepeat['b_Repeating'] = !0x0,
            requestRepeat['RequestTimerID'] = setInterval('RequestRepeating()',
                requestRepeat['RequestTerm']));
    },
    datacheckErrorProcess = function (_0x471e32) {
        parent['postMessage']('{"disease":"1"}', '*');
    },
    memberCall = function () {
        parent['postMessage']('{"memberCALL":"1"}', '*');
    },
    setGidx = function (_0x119425) {
        proto['gidx'] = _0x119425;
    },
    logOutRanking = function () {
        proto['RankVal'] = 0x0, proto['save'] = null, proto['stat'] = statusTYPE['LOGOUTRANK'], null == requestRepeat['RequestFunc'] && (requestRepeat['RequestFunc'] = function () {
            logOutRanking();
        });
        var _0x41b7e7 = $['post'](baseURL, proto);
        _0x41b7e7['done'](function (_0x1da9ac) {
            0x1 == _0x1da9ac['TF'] ? (setAcctk(_0x1da9ac['actk']), requestRepeat['b_Repeating'] && (clearInterval(requestRepeat['RequestTimerID']), requestRepeat['b_Repeating'] = !0x1, requestRepeat['RequestFunc'] = null), networkManager['LoadRankingComplete'](_0x1da9ac)) : datacheckErrorProcess(_0x1da9ac);
        }), _0x41b7e7['fail'](function (_0x24abfc) {
            errorProcess(_0x24abfc);
        });
    },
    getRankingList = function () {
        if (0x0 == loginTF || null == proto['actk']) return logOutRanking(), !0x1;
        proto['RankVal'] = 0x0, proto['save'] = null, proto['stat'] = statusTYPE['RANKING'], null == requestRepeat['RequestFunc'] && (requestRepeat['RequestFunc'] = function () {
            getRankingList();
        });
        var _0x1c3e92 = $['post'](baseURL, proto);
        _0x1c3e92['done'](function (_0x3e7564) {
            0x1 == _0x3e7564['TF'] ? (setAcctk(_0x3e7564['actk']), requestRepeat['b_Repeating'] && (clearInterval(requestRepeat['RequestTimerID']), requestRepeat['b_Repeating'] = !0x1, requestRepeat['RequestFunc'] = null), networkManager['LoadRankingComplete'](_0x3e7564)) : datacheckErrorProcess(_0x3e7564);
        }), _0x1c3e92['fail'](function (_0x286650) {
            errorProcess(_0x286650);
        });
    },
    savecall = function (_0x5da2eb, _0x584847, _0x1488ee) {
        if (0x0 == loginTF || null == proto['actk']) return !0x1;
        proto['RankVal'] = 0x0, void 0x0 !== _0x5da2eb[_0x584847] && (proto['RankVal'] = _0x5da2eb[_0x584847]), proto['save'] = JSON['stringify'](_0x5da2eb), proto['stat'] = 0x0 == networkTF ? statusTYPE['SAVE'] : statusTYPE['NETWORKSAVE'], proto['gamemoney'] = _0x1488ee, null == requestRepeat['RequestFunc'] && (requestRepeat['RequestFunc'] = function () {
            savecall(_0x5da2eb, _0x584847, _0x1488ee);
        });
        var _0x181217 = $['post'](baseURL, proto);
        _0x181217['done'](function (_0x381a57) {
            0x1 == _0x381a57['TF'] ? (setAcctk(_0x381a57['actk']), requestRepeat['b_Repeating'] && (clearInterval(requestRepeat['RequestTimerID']), requestRepeat['b_Repeating'] = !0x1, requestRepeat['RequestFunc'] = null), networkManager['SaveDataComplete'](_0x381a57)) : datacheckErrorProcess(_0x381a57);
        }), _0x181217['fail'](function (_0x2e2374) {
            errorProcess(_0x2e2374);
        });
    },
    dataLoading = function () {
        if (0x0 == loginTF || null == proto['actk']) return !0x1;
        proto['stat'] = 0x0 == networkTF ? statusTYPE['LOADING'] : statusTYPE['NETWORKLOAD'], null == requestRepeat['RequestFunc'] && (requestRepeat['RequestFunc'] = function () {
            dataLoading();
        });
        var _0x3f5bca = $['post'](baseURL, proto);
        _0x3f5bca['done'](function (_0x5682ed) {
            0x1 == _0x5682ed['TF'] ? (setAcctk(_0x5682ed['actk']), requestRepeat['b_Repeating'] && (clearInterval(requestRepeat['RequestTimerID']), requestRepeat['b_Repeating'] = !0x1, requestRepeat['RequestFunc'] = null), networkManager['LoadDataComplete'](_0x5682ed['data'])) : datacheckErrorProcess(_0x5682ed);
        }), _0x3f5bca['fail'](function (_0x53bd56) {
            errorProcess(_0x53bd56);
        });
    },

    getParameter = function (_0x3436ff) {
        for (var _0x2edaa4,
                 _0x570123 = location['href']['replace'](/amp;/gi, ''),
                 _0xd65202 = _0x570123['slice'](_0x570123['indexOf']('?') + 0x1,
                     _0x570123['length'])['split']('&'),
                 _0xa2816c = 0x0; _0xa2816c < _0xd65202['length']; _0xa2816c++)
            if (_0xd65202[_0xa2816c]['split']('=')[0x0]['toUpperCase']() == _0x3436ff['toUpperCase']())
                return _0x2edaa4 = _0xd65202[_0xa2816c]['split']('=')[0x1], decodeURIComponent(_0x2edaa4);

        return null;
    },


    marketList = function (_0x2b3eea) {
        if (0x2 != _0x2b3eea && 0x1 != _0x2b3eea) return !0x1;
        proto['stat'] = 0x0 == loginTF || null == proto['actk'] ? statusTYPE['PLAYTABLE_LOGOUT'] : statusTYPE['PLAYTABLE_LOGIN'], proto['takeType'] = _0x2b3eea, null == requestRepeat['RequestFunc'] && (requestRepeat['RequestFunc'] = function () {
            marketList(_0x2b3eea);
        });
        var _0x43e845 = $['post'](baseURL, proto);
        _0x43e845['done'](function (_0x119c3f) {
            0x1 == _0x119c3f['TF'] ? (setAcctk(_0x119c3f['actk']), requestRepeat['b_Repeating'] && (clearInterval(requestRepeat['RequestTimerID']), requestRepeat['b_Repeating'] = !0x1, requestRepeat['RequestFunc'] = null), networkManager['GetShoppingListComplete'](_0x119c3f['data'])) : datacheckErrorProcess(_0x119c3f);
        }), _0x43e845['fail'](function (_0x1938b4) {
            errorProcess(_0x1938b4);
        });
    },
    setServicePos = function (_0x458c47) {
        proto['serPos'] = _0x458c47;
    },
    heartUse = function (_0xcad796) {
        if (_0xcad796 <= 0x0) return !0x1;
        if (0x0 == loginTF || null == proto['actk']) return !0x1;
        proto['stat'] = statusTYPE['TAKE'], proto['UseCount'] = _0xcad796, null == requestRepeat['RequestFunc'] && (requestRepeat['RequestFunc'] = function () {
            heartUse();
        });
        var _0x29a283 = $['post'](baseURL, proto);
        _0x29a283['done'](function (_0x5e7108) {
            0x1 == _0x5e7108['TF'] ? (setAcctk(_0x5e7108['actk']), requestRepeat['b_Repeating'] && (clearInterval(requestRepeat['RequestTimerID']), requestRepeat['b_Repeating'] = !0x1, requestRepeat['RequestFunc'] = null), networkManager['UseHeartComplete'](_0x5e7108)) : datacheckErrorProcess(_0x5e7108);
        }), _0x29a283['fail'](function (_0xb52fe2) {
            errorProcess(_0xb52fe2);
        });
    },
    logoutPay = function (_0x4dafdb) {
        proto['stat'] = statusTYPE['PURCHASE_LOGOUT'], proto['mkidx'] = _0x4dafdb, null == requestRepeat['RequestFunc'] && (requestRepeat['RequestFunc'] = function () {
            logoutPay(_0x4dafdb);
        });
        var _0x2a4c51 = $['post'](baseURL, proto);
        _0x2a4c51['done'](function (_0x26f17d) {
            0x1 == _0x26f17d['TF'] ? (setAcctk(_0x26f17d['actk']), requestRepeat['b_Repeating'] && (clearInterval(requestRepeat['RequestTimerID']), requestRepeat['b_Repeating'] = !0x1, requestRepeat['RequestFunc'] = null), networkManager['LoadDataComplete'](_0x26f17d['data'])) : datacheckErrorProcess(_0x26f17d);
        }), _0x2a4c51['fail'](function (_0x2519a7) {
            errorProcess(_0x2519a7);
        });
    },
    googleplayCK = function () {
        parent['postMessage']('{"ad":"3332"}', '*');
    },
    mkPayment = function (_0x4c6a4f) {
        if (_0x4c6a4f <= 0x0) return !0x1;
        if (0x1 == apkTF && (proto['stat'] = statusTYPE['adType'], proto['mkidx'] = _0x4c6a4f, (_0x20bb23 = $['post'](baseURL, proto))['done'](function (_0x15ccd2) {
            0x1 == _0x15ccd2['TF'] && parent['postMessage']('{"ad":"' + _0x15ccd2['pType'] + '"}', '*');
        })), 0x0 != loginTF && null != proto['actk']) {
            proto['stat'] = statusTYPE['PURCHASE'], proto['mkidx'] = _0x4c6a4f, null == requestRepeat['RequestFunc'] && (requestRepeat['RequestFunc'] = function () {
                mkPayment(_0x4c6a4f);
            });
            var _0x20bb23 = $['post'](baseURL, proto);
            _0x20bb23['done'](function (_0x452573) {
                0x1 == _0x452573['TF'] ? (setAcctk(_0x452573['actk']), requestRepeat['b_Repeating'] && (clearInterval(requestRepeat['RequestTimerID']), requestRepeat['b_Repeating'] = !0x1, requestRepeat['RequestFunc'] = null), networkManager['LoadDataComplete'](_0x452573['data'])) : datacheckErrorProcess(_0x452573);
            }), _0x20bb23['fail'](function (_0x17ff12) {
                errorProcess(_0x17ff12);
            });
        } else logoutPay(_0x4c6a4f);
    },
    msgModalBack = function (_0x436ed8) {
        switch (_0x436ed8) {
            case!0x0:
                void 0x0 != networkManager['cb_ModalOK'] && null != networkManager['cb_ModalOK'] && (networkManager['cb_ModalOK'](), networkManager['cb_ModalOK'] = null);
                break;
            case!0x1:
                void 0x0 != networkManager['cb_ModalCancel'] && null != networkManager['cb_ModalCancel'] && (networkManager['cb_ModalCancel'](), networkManager['cb_ModalCancel'] = null);
        }
    },
    googleplaypopCall = function () {
        window['open']('https://play.google.com/store/apps/details?id=com.LAMPgame.home', '_blank');
    },
    baseinfoCall = function (_0x40e8b7) {
        proto['stat'] = statusTYPE['BASE_INFO'], null == requestRepeat['RequestFunc'] && (requestRepeat['RequestFunc'] = function () {
            baseinfoCall(_0x40e8b7);
        }), $['post'](baseURL, proto)['done'](function (_0x436177) {
            0x1 == _0x436177['TF'] ? (requestRepeat['b_Repeating'] && (clearInterval(requestRepeat['RequestTimerID']), requestRepeat['b_Repeating'] = !0x1, requestRepeat['RequestFunc'] = null), networkManager['GetGameInfoComplete'](_0x436177)) : errorProcess(_0x436177);
        });
    },
    idchange = function (_0x41778c, _0x411386) {
        if (0x0 == loginTF || null == proto['actk']) return !0x1;
        proto['stat'] = statusTYPE['ID_CHANGE'], proto['uid'] = _0x41778c, $['post'](baseURL, proto)['done'](function (_0x178192) {
            _0x411386(_0x178192), 0x1 == _0x178192['TF'] && (setAcctk(_0x178192['actk']), 0x0 == servicePos && parent['postMessage']({'ID_CHANGE': _0x41778c}, '*'));
        });
    },
    daily_refill = function () {
        if (0x0 == loginTF || null == proto['actk']) return !0x1;
        proto['stat'] = statusTYPE['SLOT_DAILY'];
        var _0x4bac4a = $['post'](baseURL, proto);
        _0x4bac4a['done'](function (_0x1db055) {
            0x1 == _0x1db055['TF'] && setAcctk(_0x1db055['actk']);
        }), _0x4bac4a['fail'](function (_0x266f6e) {
            errorProcess(_0x266f6e);
        });
    },
    slot_doubleup_stop = function (_0x3294a1) {
        if (0x0 == loginTF || null == proto['actk']) return !0x1;
        proto['stat'] = statusTYPE['SLOT_DOUBLEUPSTOP'], $['post'](baseURL, proto)['done'](function (_0x559a01) {
            0x1 == _0x559a01['TF'] && (_0x3294a1(_0x559a01), setAcctk(_0x559a01['actk']));
        });
    },
    slot_doubleup_pick = function (_0x5578e8, _0x3e38b0) {
        if (0x0 == loginTF || null == proto['actk']) return !0x1;
        proto['stat'] = statusTYPE['SLOT_DOUBLEUPPICK'], proto['highlow'] = _0x5578e8, $['post'](baseURL, proto)['done'](function (_0x22d324) {
            0x1 == _0x22d324['TF'] && (_0x3e38b0(_0x22d324), setAcctk(_0x22d324['actk']));
        });
    },
    slot_doubleUpInit = function (_0x31470c, _0x3374d3) {
        if (0x0 == loginTF || null == proto['actk']) return !0x1;
        proto['stat'] = statusTYPE['SLOT_DOUBLEUPINIT'], proto['batting'] = _0x31470c, $['post'](baseURL, proto)['done'](function (_0x18bbff) {
            0x1 == _0x18bbff['TF'] && (_0x3374d3(_0x18bbff), setAcctk(_0x18bbff['actk']));
        });
    },
    slot_pay = function (_0x704c99, _0x55cb29) {
        if (0x0 == loginTF || null == proto['actk']) return !0x1;
        proto['stat'] = statusTYPE['SLOT_PAY'], proto['billidx'] = _0x704c99;
        var _0x22bbc4 = $['post'](baseURL, proto);
        _0x22bbc4['done'](function (_0x4a02d2) {
            0x1 == _0x4a02d2['TF'] && (_0x55cb29(_0x4a02d2), setAcctk(_0x4a02d2['actk']));
        }), _0x22bbc4['fail'](function (_0x13951d) {
            errorProcess(_0x13951d);
        });
    },
    slotShopList = function (_0x1fea94) {
        if (0x0 == loginTF || null == proto['actk']) return !0x1;
        proto['stat'] = statusTYPE['SLOT_SHOP'];
        var _0x53fe77 = $['post'](baseURL, proto);
        _0x53fe77['done'](function (_0x246054) {
            0x1 == _0x246054['TF'] && (_0x1fea94(_0x246054), setAcctk(_0x246054['actk']));
        }), _0x53fe77['fail'](function (_0x16d8c7) {
            errorProcess(_0x16d8c7);
        });
    },
    slot_mega = function (_0x12d7db) {
        if (0x0 == loginTF || null == proto['actk']) return !0x1;
        proto['stat'] = statusTYPE['SLOT_MEGA'];
        var _0x5000c5 = $['post'](baseURL, proto);
        _0x5000c5['done'](function (_0x11e8b5) {
            0x1 == _0x11e8b5['TF'] && (_0x12d7db(_0x11e8b5), setAcctk(_0x11e8b5['actk']));
        }), _0x5000c5['fail'](function (_0x74c822) {
            errorProcess(_0x74c822);
        });
    },
    speical_money = function (_0x4d7502) {
        if (0x0 == loginTF || null == proto['actk']) return !0x1;
        proto['stat'] = statusTYPE['SLOT_SPEICAL'];
        var _0x51c45a = $['post'](baseURL, proto);
        _0x51c45a['done'](function (_0x313fbb) {
            0x1 == _0x313fbb['TF'] && (_0x4d7502(_0x313fbb), setAcctk(_0x313fbb['actk']));
        }), _0x51c45a['fail'](function (_0x205d7b) {
            errorProcess(_0x205d7b);
        });
    },
    slotCall = function (_0x1c26a0, _0xe02107, _0x52155a) {
        if (0x0 == loginTF || null == proto['actk']) return !0x1;
        proto['stat'] = statusTYPE['SLOT_CALL'], proto['batMoney'] = _0x1c26a0, proto['prize'] = _0xe02107;
        var _0x1b9a0b = $['post'](baseURL, proto);
        _0x1b9a0b['done'](function (_0x547069) {
            0x1 == _0x547069['TF'] && (_0x52155a(_0x547069), setAcctk(_0x547069['actk']));
        }), _0x1b9a0b['fail'](function (_0x4a99c0) {
            errorProcess(_0x4a99c0);
        });
    },
    slotdataLoading = function (_0x12837f) {
        if (0x0 == loginTF || null == proto['actk']) return !0x1;
        proto['stat'] = statusTYPE['SLOT_LOAD'];
        var _0x28cba2 = $['post'](baseURL, proto);
        _0x28cba2['done'](function (_0x31081e) {
            0x1 == _0x31081e['TF'] && (_0x12837f(_0x31081e), setAcctk(_0x31081e['actk']));
        }), _0x28cba2['fail'](function (_0x199170) {
            errorProcess(_0x199170);
        });
    },
    inappList = function (_0x242a99) {
        if (0x0 == loginTF || null == proto['actk']) return !0x1;
        proto['stat'] = statusTYPE['YAHOO_INAPP_LIST'];
        var _0x2393ec = {'NORMAL': 0x1, 'EVENT': 0x2, 'TEST': 0x3};
        proto['inappType'] = _0x2393ec['TEST'], $['post'](baseURL, proto)['done'](function (_0x482321) {
            0x1 == _0x482321['TF'] && (setAcctk(_0x482321['actk']), _0x242a99(_0x482321));
        });
    },
    inappCall = function (_0x42c9e7, _0x522b12) {
        if (0x0 == loginTF || null == proto['actk']) return !0x1;
        if (void 0x0 == yahooTest || 0x0 == yahooTest) return !0x1;
        var _0x358882 = $['post']('https://game.jp/yahoo/inapp/start/test/index.do', {
            'user_id': 'c8ea76167e3b4d3c8fdb25170cae81f28fc02e7b', 'product_code': _0x42c9e7, 'price': 0x1f4
        });
        _0x358882['done'](function (_0x4b735c) {
            inappCHECK(_0x4b735c['transaction_code'], _0x42c9e7);
        }), _0x358882['fail'](function (_0x388ada) {
        });
    },
    inappCHECK = function (_0x857784, _0x451049) {
        if (0x0 == loginTF || null == proto['actk']) return !0x1;
        proto['stat'] = statusTYPE['YAHOO_INAPP_CHECK'];
        $['post']('https://game.jp/yahoo/inapp/end/test/index.do', {
            'transaction_code': _0x857784, 'product_code': _0x451049, 'purchase_status': 'puchase'
        })['done'](function (_0x592e88) {
        });
    },
    yahooenventLIst = function (_0xa0c1f7) {
        if (0x0 == loginTF || null == proto['actk']) return !0x1;
        proto['stat'] = statusTYPE['YHAOO_EVENT_LIST'], $['post'](baseURL, proto)['done'](function (_0x41e3b6) {
            _0xa0c1f7(_0x41e3b6);
        });
    },
    yahooenventSkip = function (_0x411d7f) {
        if (0x0 == loginTF || null == proto['actk']) return !0x1;
        proto['stat'] = statusTYPE['YAHOO_EVENT_SKIP'], proto['yeidx'] = _0x411d7f, $['post'](baseURL, proto)['done'](function (_0x5b54f4) {
        });
    },
    ikon_rank = function (_0x30a060) {
        if (0x0 == loginTF || null == proto['actk']) return !0x1;
        proto['stat'] = statusTYPE['IKON_RANK'], $['post'](baseURL, proto)['done'](function (_0xedf94) {
            setAcctk(_0xedf94['actk']), requestRepeat['b_Repeating'] && (clearInterval(requestRepeat['RequestTimerID']), requestRepeat['b_Repeating'] = !0x1, requestRepeat['RequestFunc'] = null), void 0x0 !== networkManager['getiKonRank'] && null !== networkManager['getiKonRank'] && networkManager['getiKonRank'](_0xedf94);
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

var net_getDecPara = function (_0x280f88) {
        proto['stat'] = statusTYPE['GETPARA'],
            proto['usrStr'] = actk,
            $['post'](baseURL, proto)['done'](function (_0x32531c) {
                _0x280f88(_0x32531c);
            });
    },
    net_RankSave = function (_0x8e9f7e, _0x26f46c, _0x4c7334) {
        if (console['log']('=======movi network===score====' + _0x8e9f7e), 0x0 == loginTF)
            return (_0x35939d = {})['TF'] = 0x1f4,
                void _0x4c7334(_0x35939d);

        if (null == proto['actk']) {
            var _0x35939d = {};
            return _0x35939d['TF'] = 0x1f5,
                void _0x4c7334(_0x35939d);
        }
        proto['stat'] = statusTYPE['SAVE'],
            proto['RankVal'] = _0x8e9f7e,
            proto['save'] = JSON['stringify'](_0x26f46c);

        var _0x1f8589 = $['post'](baseURL, proto);
        _0x1f8589['done'](function (_0x2fb76a) {
            _0x4c7334(_0x2fb76a);
        }),
            _0x1f8589['fail'](function (_0x4bb45b) {
                _0x4c7334(_0x4bb45b);
            });
    };


function RequestRepeating() {
    requestRepeat['RepeatTIme']++,
        requestRepeat['RepeatTIme'] <= requestRepeat['RepeatTImeMax']
            ? requestRepeat['RequestFunc']()
            : parent['postMessage']('{"disease":"1"}', '*');
}