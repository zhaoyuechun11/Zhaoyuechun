/**
 * Created by admin on 2018-03-07.
 */
var bm = {
    idList:[]
};//버튼 매니저

bm.buttonEvent = function (obj, clickEfBool, start, move, end, out, preact) {
    obj.basicScaleX = obj.scale.x;
    obj.basicScaleY = obj.scale.y;
    bm.setInClick(obj, false);

    if (gc.IS_MOBILE) {
        //터치 시작
        obj.touchstart = (function (e) {
            if (!obj.inClick) {
                e.stopPropagation();
                if (start != null && start != undefined) {
                    bm.setInClick(obj, true);
                    bm.setClickId(obj, e.data.identifier);
                    if (clickEfBool) {//클릭했을 때의 오브젝트 이펙트 여부
                        if (preact) {
                            start(e);
                            bm.clickEffect(obj, (function () {
                                bm.setInClick(obj, false);
                                bm.removeClickId(obj);
                            }).bind(this));
                        }
                        else {
                            bm.clickEffect(obj, (function () {
                                start(e);
                                bm.setInClick(obj, false);
                                bm.removeClickId(obj);
                            }).bind(this));
                        }
                    }
                    else {//클릭했을 때 이펙트 없음
                        start(e);
                        if (!move && !end && !out) {
                            bm.setInClick(obj, false);
                            bm.removeClickId(obj);
                        }
                    }
                }
                else {
                    bm.setInClick(obj, true);
                    bm.setClickId(obj, e.data.identifier);
                }
            }
        }).bind(this);

        //터치 움직임
        obj.touchmove = (function (e) {
            if (obj.inClick) {
                e.stopPropagation();
                if (move != null && move != undefined) {
                    move(e);
                }
            }
        }).bind(this);

        //터치 끝남
        obj.touchend = (function (e) {
            GD.fullScreen();
            if (obj.inClick) {
                e.stopPropagation();
                if (end != null && end != undefined) {
                    var idInfo = bm.findIdList(obj);
                    var id = e.data.identifier;
                    if(idInfo.id == id) {
                        bm.removeClickId(obj);
                        if (clickEfBool) {//클릭했을 때의 오브젝트 이펙트 여부
                            if (preact) {
                                end(e);
                                bm.clickEffect(obj, (function () {
                                    bm.setInClick(obj, false);
                                }).bind(this));
                            }
                            else {
                                bm.clickEffect(obj, (function () {
                                    end(e);
                                    bm.setInClick(obj, false);
                                }).bind(this));
                            }
                        }
                        else {
                            end(e);
                            bm.setInClick(obj, false);
                        }
                    }
                }
            }
        }).bind(this);

        //터치 나감
        obj.touchout = obj.touchendoutside = (function (e) {
            if (obj.inClick) {
                e.stopPropagation();
                var idInfo = bm.findIdList(obj);
                var id = e.data.identifier;
                if(idInfo.id == id) {
                    bm.removeClickId(obj);

                    if (out != null && out != undefined) {
                        if (clickEfBool) {//클릭했을 때의 오브젝트 이펙트 여부
                            if (preact) {
                                out(e);
                                bm.clickEffect(obj, (function () {
                                    bm.setInClick(obj, false);
                                }).bind(this));
                            }
                            else {
                                bm.clickEffect(obj, (function () {
                                    out(e);
                                    bm.setInClick(obj, false);
                                }).bind(this));
                            }
                        }
                        else {
                            out(e);
                            bm.setInClick(obj, false);
                        }
                    }
                    else {//범위를 나갔을 때의 따로 처리가 없는 경우
                        if (end != null && end != undefined) {
                            if (clickEfBool) {//클릭했을 때의 오브젝트 이펙트 여부
                                if (preact) {
                                    end(e);
                                    bm.clickEffect(obj, (function () {
                                        bm.setInClick(obj, false);
                                    }).bind(this));
                                }
                                else {
                                    bm.clickEffect(obj, (function () {
                                        end(e);
                                        bm.setInClick(obj, false);
                                    }).bind(this));
                                }
                            }
                            else {
                                end(e);
                                bm.setInClick(obj, false);
                            }
                        }
                    }
                }
            }
        });
    }
    //pc에서 플레이중일 때
    else {
        //터치 시작
        obj.mousedown = obj.touchstart = (function (e) {
            if (!obj.inClick) {
                e.stopPropagation();
                if (start != null && start != undefined) {
                    bm.setInClick(obj, true);
                    if (clickEfBool) {//클릭했을 때의 오브젝트 이펙트 여부
                        if (preact) {
                            start(e);
                            bm.clickEffect(obj, (function () {
                                bm.setInClick(obj, false);
                            }).bind(this));
                        }
                        else {
                            bm.clickEffect(obj, (function () {
                                start(e);
                                bm.setInClick(obj, false);
                            }).bind(this));
                        }
                    }
                    else {
                        start(e);
                        if (!move && !end && !out) bm.setInClick(obj, false);
                    }
                }
                else {
                    bm.setInClick(obj, true);
                }
            }
        }).bind(this);

        //터치 움직임
        obj.mousemove = obj.touchmove = (function (e) {
            if (obj.inClick) {
                e.stopPropagation();
                if (move != null && move != undefined) {
                    move(e);
                }
            }
        }).bind(this);

        //터치 끝남
        obj.mouseup = obj.touchend = (function (e) {
            if (obj.inClick) {
                e.stopPropagation();
                if (end != null && end != undefined) {
                    if (clickEfBool) {//클릭했을 때의 오브젝트 이펙트 여부
                        if (preact) {
                            end(e);
                            bm.clickEffect(obj, (function () {
                                bm.setInClick(obj, false);
                            }).bind(this));
                        }
                        else {
                            bm.clickEffect(obj, (function () {
                                end(e);
                                bm.setInClick(obj, false);
                            }).bind(this));
                        }
                    }
                    else {
                        end(e);
                        bm.setInClick(obj, false);
                    }
                }
            }
        }).bind(this);

        //터치 나감
        obj.mouseout = obj.touchout = obj.mouseupoutside = obj.touchendoutside = (function (e) {
            if (obj.inClick) {
                e.stopPropagation();
                if (out != null && out != undefined) {
                    if (clickEfBool) {//클릭했을 때의 오브젝트 이펙트 여부
                        if (preact) {
                            out(e);
                            bm.clickEffect(obj, (function () {
                                bm.setInClick(obj, false);
                            }).bind(this));
                        }
                        else {
                            bm.clickEffect(obj, (function () {
                                out(e);
                                bm.setInClick(obj, false);
                            }).bind(this));
                        }
                    }
                    else {
                        out(e);
                        bm.setInClick(obj, false);
                    }
                }
                else {//범위를 나갔을 때의 따로 처리가 없는 경우
                    if (end != null && end != undefined) {
                        if (clickEfBool) {//클릭했을 때의 오브젝트 이펙트 여부
                            if (preact) {
                                end(e);
                                bm.clickEffect(obj, (function () {
                                    bm.setInClick(obj, false);
                                }).bind(this));
                            }
                            else {
                                bm.clickEffect(obj, (function () {
                                    end(e);
                                    bm.setInClick(obj, false);
                                }).bind(this));
                            }
                        }
                        else {
                            end(e);
                            bm.setInClick(obj, false);
                        }
                    }
                }
            }
        });
    }
};

bm.clickEffect = function (obj, func) {
    //오브젝트 크기 초기화
    obj.scale.x = obj.basicScaleX;
    obj.scale.y = obj.basicScaleY;

    var time = 0.02;
    //커졌다 작아지기
    // TweenMax.fromTo(obj.scale, time, { x: obj.scale.x, y: obj.scale.y }, { x: obj.scale.x - 0.1, y: obj.scale.y - 0.1, onComplete: (function () {
    //     TweenMax.fromTo(obj.scale, time, { x: obj.scale.x, y: obj.scale.y }, { x: obj.scale.x + 0.2, y: obj.scale.y + 0.2, onComplete: (function () {
    //         TweenMax.fromTo(obj.scale, time, { x: obj.scale.x, y: obj.scale.y }, { x: obj.scale.x - 0.1, y: obj.scale.y - 0.1, onComplete: (function () {
    //             //오브젝트 터치 활성화
    //             // obj.interactive = true;
    //             if (func != null && func != undefined) func();
    //         }) });
    //     }).bind(this) });
    // }).bind(this) });

    //작아졌다 커지기
    TweenMax.to(obj.scale, time, {
        x: obj.scale.x - 0.1, y: obj.scale.y - 0.1, yoyo: true, repeat: 1, onComplete: (function () {
            //오브젝트 터치 활성화
            // obj.interactive = true;
            if (func != null && func != undefined) func();
        }).bind(this)
    });
};

//해당 오브제트가 클릭되어있는 상태인지 여부 설정
bm.setInClick = function (obj, bool) {
    obj.inClick = bool;
};

//클릭된 오브젝트의 클릭 아이디 설정
bm.setClickId = function (obj, id) {
    var info = bm.findIdList(obj);

    if(info) info.id = id;
    else this.idList.push({obj:obj, id:id});
};
//클릭아이디 리스트에서 제거
bm.removeClickId = function (obj) {
    var index = -1;
    for(var i=0; i<this.idList.length; i++) {
        if(this.idList[i].obj == obj) {
            index = i;
            break;
        }
    }

    if(index != -1) {
        this.idList.splice(index, 1);
    }
};
//기존에 있는 아이디리스트 검색
bm.findIdList = function (obj) {
    var info = null;
    for(var i=0; i<this.idList.length; i++) {
        if(this.idList[i].obj == obj) {
            info = this.idList[i];
            break;
        }
    }

    return info;
};
//클릭 아이디 전체 초기화
bm.clearIdList = function () {
    this.idList = [];
};