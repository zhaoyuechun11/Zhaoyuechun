/**
 * Created by admin on 2018-01-15.
 */
var LocalStorage = {
    BROWSER_DATE:"gameN_naver_wonderland_browserDate"
};

//스토리지 데이타 set, get
LocalStorage.storageSet = function ($type, $data) {
    // this.LOCAL_STORAGE.setItem($type, $data);

    var saveData = JSON.stringify($data);
    this.LOCAL_STORAGE.setItem($type, saveData);
};

//로컬스토리지의 변수명, 값이 없을 경우 리턴 되는 기본 값(새로운 스토리지 값이 추가 되었을 경우를 대비한 기본 값이다.)
LocalStorage.storageGet = function ($type, $default) {
    var temp = this.LOCAL_STORAGE.getItem($type);
    var originalData = "";
    if (temp == null || temp == "") {
        if ($default != null) {
            LocalStorage.storageSet($type, $default); //디폴트 값이 있는 경우 자동 저장
            originalData = $default;
        }
    }
    else {
        originalData = JSON.parse(temp);
    }
    return originalData;
};

//데이터 제거
LocalStorage.storageRemove = function ($type) {
    this.LOCAL_STORAGE.removeItem($type);
};

LocalStorage.LOCAL_STORAGE = localStorage;