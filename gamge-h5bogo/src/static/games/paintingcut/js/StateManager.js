'use strict';

var _stateManager = _stateManager||{};

_stateManager.Instance = (function () {
    var _Instance = {};
    // var isPlaying = false;
    var isTimeOver = false;
    var isContinue = false;
    var isFeverMode = false;
    var isClear = false;
    var isUIMessage = false;
    var isHurryUp = false;
    var isStopSkill = false;
    var isPauseWindow = false;
    var isGameFail = false;
    var isGameSuccess = false;
    var isLineDrawing = false;
    var isMaskDrawing = false;

    // 초기화
    _Instance.Init = function () {
        isTimeOver = false;
        isFeverMode = false;
        isClear = false;
        isUIMessage = false;
        isHurryUp = false;
        isStopSkill = false;
        isPauseWindow = false;
        isGameFail = false;
        isGameSuccess = false;
        isLineDrawing = false;
        isMaskDrawing = false;
    };

    // 게임상의 터치 허용 유무
    _Instance.onGameTouch = function () {
        if(isMaskDrawing || isLineDrawing || isGameSuccess || isGameFail || isUIMessage || isFeverMode || isClear || isTimeOver || isPauseWindow) return false;

        return true
    };

    // 게임 성공 연출을 진행할까?
    _Instance.onGameSuccess = function () {
        if(isFeverMode || isTimeOver) {
            return false;
        } else {
            isGameSuccess = true;

            if(isHurryUp) assetManager.StopWarning();
        }

        return isGameSuccess;
    };
    _Instance.offGameSuccess = function () {
        isGameSuccess = false;
    };
    /*** @return {boolean} */
    _Instance.IsGameSuccess = function () {
        return isGameSuccess;
    };

    // 게임 실패 연출을 진행할까?
    _Instance.onGameFail = function () {
        if(isFeverMode) {
            return false;
        } else {
            isGameFail = true;
        }

        return isGameFail;
    };
    _Instance.offGameFail = function () {
        isGameFail = false;
    };
    /*** @return {boolean} */
    _Instance.IsGameFail = function () {
        return isGameFail;
    };

    // 라인이 그려지고 있다.
    _Instance.onLineDrawing = function () {
        isLineDrawing = true;
    };
    _Instance.offLineDrawing = function () {
        isLineDrawing = false;
    };
    /*** @return {boolean} */
    _Instance.IsLineDrawing = function () {
        return isLineDrawing;
    };

    // 도형 마스크가 그려지고 있다.
    _Instance.onMaskDrawing = function () {
        isMaskDrawing = true;
    };
    _Instance.offMaskDrawing = function () {
        isMaskDrawing = false;
    };
    /*** @return {boolean} */
    _Instance.IsMaskDrawing = function () {
        return isMaskDrawing;
    };

    // Pause 일시정지 윈도우 오픈
    _Instance.onPauseWindow = function () {
        if(isPauseWindow || isGameSuccess || isGameFail || isUIMessage || isHurryUp || isFeverMode || isClear || isTimeOver || isContinue) {
            return false;
        } else {
            isPauseWindow = true;
        }

        return isPauseWindow;
    };
    _Instance.offPauseWindow = function () {
        isPauseWindow = false;
    };
    /*** @return {boolean} */
    _Instance.IsPauseWindow = function () {
        return isPauseWindow;
    };

    // U.I 메세지 표시
    _Instance.onUIMessage = function () {
        if(isUIMessage) return false;
        isUIMessage = true;

        return isUIMessage;
    };
    _Instance.offUIMessage = function () {
        isUIMessage = false;
    };
    /*** @return {boolean} */
    _Instance.IsUIMessage = function () {
        return isUIMessage;
    };

    // Hurry Up 메세지 표시
    _Instance.onHurryUp = function () {
        if(isHurryUp || isClear || isGameSuccess || isGameFail || isFeverMode || isTimeOver) return false;
        isHurryUp = true;

        return isHurryUp;
    };
    _Instance.offHurryUp = function () {
        isHurryUp = false;
    };
    /*** @return {boolean} */
    _Instance.IsHurryUp = function () {
        return isHurryUp;
    };

    ///////////////////////////////////////////// 타임 오버 //////////////////////////////////////////
    _Instance.onTimeOver = function () {
        if(isTimeOver) return false;
        if(isFeverMode) {
            return false;
        } else {
            // if(isStopSkill) {
            //     ballManager.StopSkill_Cancle();
            //     isStopSkill = false;
            // }
            if(isGameSuccess) {
                isGameSuccess = false;
            }
            isTimeOver = true
        }

        return isTimeOver;
    };
    _Instance.offTimeOver = function () {
        isTimeOver = false;
    };
    /*** @return {boolean} */
    _Instance.IsTimeOver = function () {
        return isTimeOver;
    };

    //////////////////////////////////////////////// 이어하기 창 ////////////////////////
    _Instance.onContinue = function () {
        if(isTimeOver == false) {
            return false;
        } else {
            isContinue = true;
        }

        return isContinue;
    };
    _Instance.offContinue = function () {
        isContinue = false;
    };
    _Instance.IsCon

    /////////////////////////////////////////////// 피버모드 /////////////////////////////
    _Instance.onFeverMode = function () {
        if(isFeverMode) {
            return false;
        } else {
            if(isStopSkill) {
                ballManager.StopSkill_Cancle();
                isStopSkill = false;
            }
            isFeverMode = true;
        }

        return isFeverMode;
    };
    _Instance.offFeverMode = function () {
        isFeverMode = false;
    };
    /*** @return {boolean} */
    _Instance.IsFeverMode = function () {
        return isFeverMode;
    };

    // stop skill
    _Instance.onStopSkill = function () {
        if(isStopSkill || isTimeOver || isFeverMode || isClear || isGameSuccess || isGameFail) {
            return false;
        } else {
            if(isStopSkill) {        // Stop 아이템 이미 실행중이다. 아이템 ReStart 해주자,
                ballManager.StopSkill_ReStart();
            } else {
                isStopSkill = true;
            }
        }

        return isStopSkill;
    };
    _Instance.offStopSkill = function () {
        isStopSkill = false;
    };
    /*** @return {boolean} */
    _Instance.IsStopSkill = function () {
        return isStopSkill;
    };

    return _Instance;
}
)();