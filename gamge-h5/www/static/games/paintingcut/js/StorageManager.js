//'isBGM,isSfx,nBestCombo,nBestScore'
Define.StorageDataKey = ["nVer","isBGM", "isSfx", "isViewTutorial", "nStage", "nBestScore", "nBestCompleteArea", "nJewelryCount"];

// // package everything you need into an object.
// var saveObject = {
//     level: 5,
//     highScore: 3742
// };
//
// // localStorage only works with strings, so JSON.stringify first.
//localStorage.setItem("save", JSON.stringify(saveObject));

StorageManager = function (game) {
    this.game = game;
    this.StorageData = {};

    this.StorageData['nVer'] = 0;
    this.StorageData['isBGM'] = true;
    this.StorageData['isSfx'] = true;
    this.StorageData['isViewTutorial'] = false;
    this.StorageData['nStage'] = 0;
    this.StorageData['nBestScore'] = 0;
    this.StorageData['nBestCompleteArea'] = "0";
    this.StorageData['nJewelryCount'] = 0;

    // console.log(this.StorageData);
    // console.log(JSON.stringify(this.StorageData));

    this.isLocal = false;
};
StorageManager.prototype = {
    preload: function () {
    },
    create: function () {

    },
    init: function () {
        var that = this;
        this.getDataAllString();
        if(Define.SERVICE === Enum.SERVICE_CODE.MOVI_KR)
        {
            this.isLocal = true;
        }

        if(this.isLocal === false)
        {
            MG.networkManager.refresh(function(){
                if(MG.networkManager.isLogin === true)
                {
                    MG.networkManager.AppDataGet(that.getDataAllString(), function(data){
                        if(data.code === 0) {
                            if(data.nVer === undefined)
                            {
                                MG.networkManager.AppDataPut(JSON.stringify(this.StorageData),function (response) {
                                    
                                });
                            }
                            else
                            {
                                // this.StorageData['isBGM'] = data.isBGM;
                                // this.StorageData['isSfx'] = data.isSfx;
                                // this.StorageData['nStage'] = parseInt(data.nStage);
                                // this.StorageData['nBestScore'] = parseInt(data.nBestScore);
                            }
                        }
                        else
                        {
                            this.loadData();
                        }
                    });
                }
                else
                {
                    this.loadData();
                }

            });
            return;
        }

        this.loadData();



    },
    loadData : function()
    {
        console.log('window.localStorage '+window.localStorage);
        if(window.localStorage !== undefined)
        {
            for(var i=0; i < Define.StorageDataKey.length; i++)
            {
                var value = this.get(Define.StorageDataKey[i]);
                if(value !== undefined && value !== null)
                    this.StorageData[Define.StorageDataKey[i]] = value;
            }
        }
        else
        {
            console.log('window.Define.StorageDataKey.lengt '+Define.StorageDataKey.lengt);
            for(var i=0; i < Define.StorageDataKey.length; i++)
            {
                this.set(Define.StorageDataKey[i], this.StorageData[Define.StorageDataKey[i]]);
            }

        }
    },
    getDataAllString : function () {
        var strKeys = '';
        for(var i=0; i < Define.StorageDataKey.length; i++)
        {
            strKeys+=(Define.StorageDataKey[i]+ (i===(Define.StorageDataKey.length-1)? '':",") );
        }
        return strKeys;
    },
    availability: function () {

        if(!(!(typeof(window.localStorage) === 'undefined'))) {
            console.log('localStorage not available');
            return null;
        }

    },
    get : function(key) {
        if(MG.networkManager.isLogin === true)
        {


            return;
        }
        this.availability();
        try {
            return JSON.parse(window.localStorage.getItem(key));
        }
        catch(e) {
            return window.localStorage.getItem(key);
        }
    },
    setPut : function(putData) {
        if(MG.networkManager.isLogin === true)
        {
            var putData = {};
            putData[key] = value;
            MG.networkManager.AppDataPut(JSON.stringify(putData));
            return;
        }

        this.availability();
        try {

            //window.localStorage.setItem(key, JSON.stringify(value));
        }
        catch(e) {
            console.log('e '+e);
            if(e == QUOTA_EXCEEDED_ERR) {
                console.log('localStorage quota exceeded');
            }
        }
    },
    set : function(key, value) {
        if(MG.networkManager.isLogin === true)
        {
            var putData = {};
            putData[key] = value;
            MG.networkManager.AppDataPut(JSON.stringify(putData));
            return;
        }

        this.availability();
        try {

            window.localStorage.setItem(key, JSON.stringify(value));
        }
        catch(e) {
            console.log('e '+e);
            if(e == QUOTA_EXCEEDED_ERR) {
                console.log('localStorage quota exceeded');
            }
        }
    },
    set_json : function(putData, callback ) {
        var jsonString = JSON.stringify(putData);
        if(MG.networkManager.isLogin === true)
        {
            // var putData = {};
            // putData[key] = value;
            MG.networkManager.AppDataPut(jsonString, callback);
            return;
        }
        this.availability();
        JSON.parse(jsonString, function(key, value) {

            if (key === '') { return value; }
            console.log(key + " = " + value);
            try {

                window.localStorage.setItem(key, JSON.stringify(value));
            }
            catch(e) {
                console.log('e '+e);
                if(e == QUOTA_EXCEEDED_ERR) {
                    console.log('localStorage quota exceeded');
                }
            }

        });
    },
    remove : function(key) {
        this.availability();
        window.localStorage.removeItem(key);
    },

    clear : function() {
        this.availability();
        window.localStorage.clear();
    },
    update: function () {
    }
};


