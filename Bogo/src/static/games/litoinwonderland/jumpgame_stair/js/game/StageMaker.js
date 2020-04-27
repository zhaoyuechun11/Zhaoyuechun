/**
 * Created by admin on 2018-06-21.
 */
//스테이지 발판 구성을 미리 만들어 두기 위한 js
var stageMaker = {};

//발판 이미지 타입 구하기
stageMaker.setStageMapSkinType = function () {
    var list = [];
    var rand;

    //기본 발판 타입 설정
    for(var i=0; i<gc.progress.endStep; i++) {
        rand = setRandomSkin();
        list.push(rand);
    }

    //방해발판 위치 설정
    setObstacleFootHold();
    function setObstacleFootHold() {//100:얼음, 200:슬라이드
        var indexList = [], rand, ice = 0, slide = 0;
        if(gc.chapter == 2) {
            if(gc.progressType == 0) ice = 5;
            else ice = 1;
        }
        else if(gc.chapter == 3){
            if(gc.progressType == 0) {
                ice = 5;
                slide = 5;
            }
        }
        else if(gc.chapter == 4){
            if(gc.progressType == 0) {
                ice = 10;
                slide = 5;
            }
        }
        else if(gc.chapter == 5){
            if(gc.progressType == 0) {
                ice = 10;
                slide = 10;
            }
        }

        var i;
        for(i=0; i<ice+slide; i++) {
            rand = setRandValue();
            indexList.push(rand);
        }

        for(i=0; i<indexList.length; i++) {
            if(i < ice) list[indexList[i]] = 100;//얼음
            else list[indexList[i]] = 200;//슬라이드
        }

        //랜덤 발판 종류 설정
        function setRandValue() {
            var fine = false, rand;
            while(!fine) {
                fine = true;
                rand = Math.floor(Math.random()*(gc.progress.endStep-2)) + 1;//첫번째 발판과 포탈 발판은 반드시 일반 발판
                for(var i=0; i<indexList.length; i++) {
                    if(indexList[i] == rand) {
                        fine = false;
                        break;
                    }
                }
            }

            return rand;
        };
    };

    //랜덤 스킨 타입 설정
    function setRandomSkin() {
        var rand, type;//타입 0:작음 1:중간 2:큼
        rand = Math.floor(Math.random()*100);
        if(gc.chapter == 1) {
            if(list.length < 10) type = 2;
            else if(list.length < 20) {
                if(rand < 50) type = 1;
                else type = 2;
            }
            else {
                if(rand < 15) type = 0;
                else if(rand < 65) type = 1;
                else type = 2;
            }
        }
        else if(gc.chapter == 2) {
            if(list.length < 10) {
                if(rand < 15) type = 0;
                else if(rand < 65) type = 1;
                else type = 2;
            }
            else if(list.length < 20) {
                if(rand < 20) type = 0;
                else if(rand < 70) type = 1;
                else type = 2;
            }
            else if(list.length < 30) {
                if(rand < 20) type = 0;
                else if(rand < 70) type = 1;
                else type = 2;
            }
            else if(list.length < 40) {
                if(rand < 25) type = 0;
                else if(rand < 70) type = 1;
                else type = 2;
            }
            else {
                if(rand < 25) type = 0;
                else if(rand < 70) type = 1;
                else type = 2;
            }
        }
        else if(gc.chapter == 3) {
            if(list.length < 10) {
                if(rand < 25) type = 0;
                else if(rand < 70) type = 1;
                else type = 2;
            }
            else if(list.length < 20) {
                if(rand < 25) type = 0;
                else if(rand < 75) type = 1;
                else type = 2;
            }
            else if(list.length < 30) {
                if(rand < 30) type = 0;
                else if(rand < 80) type = 1;
                else type = 2;
            }
            else if(list.length < 40) {
                if(rand < 35) type = 0;
                else if(rand < 85) type = 1;
                else type = 2;
            }
            else {
                if(rand < 40) type = 0;
                else if(rand < 90) type = 1;
                else type = 2;
            }
        }
        else if(gc.chapter == 4) {
            if(list.length < 10) {
                if(rand < 40) type = 0;
                else if(rand < 90) type = 1;
                else type = 2;
            }
            else if(list.length < 20) {
                if(rand < 45) type = 0;
                else if(rand < 90) type = 1;
                else type = 2;
            }
            else if(list.length < 30) {
                if(rand < 50) type = 0;
                else if(rand < 90) type = 1;
                else type = 2;
            }
            else if(list.length < 40) {
                if(rand < 55) type = 0;
                else if(rand < 90) type = 1;
                else type = 2;
            }
            else {
                if(rand < 60) type = 0;
                else if(rand < 90) type = 1;
                else type = 2;
            }
        }
        else if(gc.chapter == 5) {
            if(list.length < 10) {
                if(rand < 60) type = 0;
                else if(rand < 90) type = 1;
                else type = 2;
            }
            else if(list.length < 20) {
                if(rand < 70) type = 0;
                else if(rand < 90) type = 1;
                else type = 2;
            }
            else if(list.length < 30) {
                if(rand < 80) type = 0;
                else if(rand < 90) type = 1;
                else type = 2;
            }
            else if(list.length < 40) {
                if(rand < 90) type = 0;
                else if(rand < 95) type = 1;
                else type = 2;
            }
            else {
                type = 0;
            }
        }

        return type;
    }
    return list;
};

//발판 층 구하기
stageMaker.setStageMapFloor = function () {
    var list = stageMaker.setFootHoldFloorList();
    var order = stageMaker.setFootHoldFloorOrder(list);
    var fullList = [];
    for(var i=0; i<order.length; i++) {
        fullList = fullList.concat(list[order[i]]);
    }

    return fullList;
};

//발판 높이 리스트
stageMaker.setFootHoldFloorList = function () {
    var list = [];
    switch (gc.chapter) {
        case 1:{
            list[0] = [3, 4, 3, 3, 4, 3, 4, 3, 4, 3];
            list[1] = [3, 3, 4, 3, 3, 3, 4, 3, 4, 4];
            list[2] = [2, 3, 4, 5, 2, 3, 4, 5, 2, 3];
            break;
        }
        case 2: {
            list[0] = [2, 3, 4, 5, 2, 3, 4, 5, 2, 3];
            list[1] = [2, 5, 2, 5, 2, 5, 2, 5, 2, 5];
            list[2] = [2, 2, 5, 2, 3, 5, 2, 3, 5, 5];
            list[3] = [2, 4, 3, 2, 2, 2, 2, 3, 4, 5];
            break;
        }
        case 3: {
            list[0] = [2, 3, 4, 5, 6, 2, 3, 4, 5, 6];
            list[1] = [2, 6, 2, 6, 2, 6, 2, 6, 2, 6];
            list[2] = [2, 2, 2, 6, 2, 3, 6, 2, 6, 6];
            list[3] = [3, 5, 4, 3, 2, 2, 3, 4, 5, 6];
            break;
        }
        case 4: {
            list[0] = [3, 4, 5, 6, 7, 3, 4, 5, 6, 7];
            list[1] = [2, 7, 2, 7, 2, 7, 2, 7, 2, 7];
            list[2] = [2, 2, 2, 7, 2, 4, 7, 2, 6, 7];
            list[3] = [4, 6, 5, 4, 3, 3, 4, 5, 6, 7];
            break;
        }
        case 5: {
            list[0] = [2, 8, 2, 8, 2, 8, 2, 8, 2, 8];
            list[1] = [2, 2, 2, 8, 2, 4, 8, 2, 8, 8];
            list[2] = [5, 6, 4, 3, 2, 2, 3, 4, 6, 8];
            break;
        }
    }

    return list;
};

//발판 높이 순서 설정
stageMaker.setFootHoldFloorOrder = function (list) {
    var rand, max, listallused, order = [];
    max = Math.ceil(gc.progress.endStep/10);//순서 정하기 길이

    if(gc.chapter == 1) {//챕터1은 20번째 발판 높이까지만 정해져있고 마지막은 정해져있음
        rand = Math.floor(Math.random()*2);
        order.push(rand);
        if(rand == 0) order.push(1);
        else order.push(0);
        order.push(2);
        return order;
    }

    while(order.length < max) {
        listallused = checkListAllPushed();
        if(listallused) {
            rand = Math.floor(Math.random()*list.length);
            order.push(rand);
        }//모든 리스트가 사용되었으면 중복 상관없이 추가
        else {
            rand = setRandValue();
            order.push(rand);
        }//모든 리스트가 사용되지 않았으면 사용가능한 랜덤값 구하기
    }

    //모든 리스트가 사용되었는지 체크
    function checkListAllPushed() {
        var fine = true, inorder = [], allUsed = false;
        for(var i=0; i<order.length; i++) {
            fine = true;
            for(var j=0; j<inorder.length; j++) {
                if(order[i] == inorder[j]) {
                    fine = false;
                    break;
                }
            }
            if(fine) inorder.push(order[i]);
        }

        if(inorder.length == list.length) allUsed = true;

        return allUsed;
    }

    //사용되지 않은 리스트 랜덤 인덱스값 구하기
    function setRandValue() {
        var fine = false, rand;
        while (!fine) {
            rand = Math.floor(Math.random()*list.length);
            fine = true;
            for(var i=0; i<order.length; i++) {
                if(rand == order[i]) {
                    fine = false;
                    break;
                }
            }
        }

        return rand;
    }

    return order;
};

//새 방해물 나올 타이밍 설정
stageMaker.setObstacleBirdTiming = function () {
    var list = [], timing;
    if(gc.progressType == 0) {
        if (gc.chapter == 3 || gc.chapter == 5) {
            for (var i = 0; i < 6; i++) {
                timing = setRandTiming();
                list.push(timing);
            }
        }
    }

    function setRandTiming() {
        var fine = false;
        var rand;
        while(!fine) {
            fine = true;
            rand = Math.floor(Math.random()*(gc.progress.endStep-2))+1;
            for(var i=0; i<list.length; i++) {
                if(rand == list[i] || Math.abs(rand - list[i]) == 2) {//연속 3번 안나오게 하기위함
                    fine = false;
                    break;
                }
            }
        }
        return rand;
    };

    return list;
};

//암전 타이밍 설정
stageMaker.setObstacleBlacoutTiming = function () {
    var list = [], timing;
    if(gc.progressType == 0) {
        if (gc.chapter == 4 || gc.chapter == 5) {
            for (var i = 0; i < 6; i++) {
                timing = setRandTiming();
                list.push(timing);
            }
        }
    }

    function setRandTiming() {
        var fine = false;
        var rand;
        while(!fine) {
            fine = true;
            rand = Math.floor(Math.random()*(gc.progress.endStep-2))+1;
            for(var i=0; i<list.length; i++) {
                if(rand == list[i]) {
                    fine = false;
                    break;
                }
            }
        }
        return rand;
    };

    return list;
};