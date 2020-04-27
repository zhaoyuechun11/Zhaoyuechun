if (!SoundLoader)
    var SoundLoader = {
        loadSoundTotal: 0,
        SoundLoader: 0,
        callback: null,
        target: null
    };

SoundLoader.loadSound = function (sounds, callback, target) {
    SoundLoader.loadSoundTotal = sounds.length,
        SoundLoader.loadSoundCount = 0,
        SoundLoader.callback = callback,
        SoundLoader.target = target;

    for (var r, o = SoundLoader.loadSoundTotal; o--;)
        r = sounds[o],

            gc.sound[r] = "sound_bgm_1" == r || "sound_bgm_2" == r || "sound_bgm_3" == r
                ? new Howl({
                    src: [RES_DIR_SOUND + r + ".mp3?ver=" + VERSION], buffer: false, onload: SoundLoader.loadSoundComp,
                    onend: function () {
                        "game" == gc.state && (++gc.bgmIndex > 3 && (gc.bgmIndex = 1),
                            gc.log("bgm : " + gc.bgmIndex),
                            gc.bgmSoundPlay(gc.bgmIndex))
                    }
                })
                : new Howl({
                    src: [RES_DIR_SOUND + r + ".mp3?ver=" + VERSION], buffer: false, onload: SoundLoader.loadSoundComp
                })
},
    SoundLoader.loadSoundComp = function () {
        if (SoundLoader.loadSoundCount++, SoundLoader.loadSoundCount == SoundLoader.loadSoundTotal) {
            if (gc.isSound) {
                var t = LocalStorageManager.getItem(LocalStorageManager.BGM_SOUND);
                t
                    ? (
                        gc.isBgmSound = "true" == t,
                            gc.isEffectSound = "true" == LocalStorageManager.getItem(LocalStorageManager.EFFECT_SOUND))
                    : (
                        gc.isSoundSet = true,
                            gc.isBgmSound = true,
                            gc.isEffectSound = true,
                            LocalStorageManager.setItem(LocalStorageManager.EFFECT_SOUND, "true"))
            }

            gc.isSoundLoad && (gc.hideProgress(),
            SoundLoader.callback && SoundLoader.callback.call(SoundLoader.target))
        }
    },


    window.SoundLoader = SoundLoader