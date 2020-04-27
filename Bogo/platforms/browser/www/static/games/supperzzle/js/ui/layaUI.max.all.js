var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var GameUI;
    (function (GameUI) {
        var AniViewUI = /** @class */ (function (_super) {
            __extends(AniViewUI, _super);
            function AniViewUI() {
                return _super.call(this) || this;
            }
            AniViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.GameUI.AniViewUI.uiView);
            };
            AniViewUI.uiView = { "type": "View", "props": { "width": 180, "height": 180 }, "compId": 2, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 180, "skin": "Frame/xiao0002.png", "height": 180 }, "compId": 3 }], "animations": [{ "nodes": [{ "target": 3, "keyframes": { "y": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "y", "index": 0 }], "x": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "x", "index": 0 }], "width": [{ "value": 180, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "width", "index": 0 }], "skin": [{ "value": "Frame/xiao0002.png", "tweenMethod": "linearNone", "tween": false, "target": 3, "key": "skin", "index": 0 }, { "value": "Frame/xiao0003.png", "tweenMethod": "linearNone", "tween": false, "target": 3, "key": "skin", "index": 1 }, { "value": "Frame/xiao0004.png", "tweenMethod": "linearNone", "tween": false, "target": 3, "key": "skin", "index": 2 }, { "value": "Frame/xiao0005.png", "tweenMethod": "linearNone", "tween": false, "target": 3, "key": "skin", "index": 3 }, { "value": "Frame/xiao0006.png", "tweenMethod": "linearNone", "tween": false, "target": 3, "key": "skin", "index": 4 }, { "value": "Frame/xiao0007.png", "tweenMethod": "linearNone", "tween": false, "target": 3, "key": "skin", "index": 5 }, { "value": "Frame/xiao0008.png", "tweenMethod": "linearNone", "tween": false, "target": 3, "key": "skin", "index": 6 }, { "value": "Frame/xiao0009.png", "tweenMethod": "linearNone", "tween": false, "target": 3, "key": "skin", "index": 7 }, { "value": "Frame/xiao0010.png", "tweenMethod": "linearNone", "tween": false, "target": 3, "key": "skin", "index": 8 }, { "value": "Frame/xiao0011.png", "tweenMethod": "linearNone", "tween": false, "target": 3, "key": "skin", "index": 9 }, { "value": "Frame/xiao0012.png", "tweenMethod": "linearNone", "tween": false, "target": 3, "key": "skin", "index": 10 }, { "value": "Frame/xiao0012.png", "tweenMethod": "linearNone", "tween": false, "target": 3, "key": "skin", "index": 11 }], "height": [{ "value": 180, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "height", "index": 0 }], "anchorY": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "anchorY", "index": 0 }], "anchorX": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "anchorX", "index": 0 }] } }, { "target": 2, "keyframes": { "width": [{ "value": 180, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "width", "index": 0 }, { "value": 180, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "width", "index": 1 }], "height": [{ "value": 180, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "height", "index": 0 }] } }], "name": "ani", "id": 1, "frameRate": 24, "action": 0 }], "loadList": ["Frame/xiao0002.png", "Frame/xiao0003.png", "Frame/xiao0004.png", "Frame/xiao0005.png", "Frame/xiao0006.png", "Frame/xiao0007.png", "Frame/xiao0008.png", "Frame/xiao0009.png", "Frame/xiao0010.png", "Frame/xiao0011.png", "Frame/xiao0012.png"], "loadList3D": [] };
            return AniViewUI;
        }(View));
        GameUI.AniViewUI = AniViewUI;
    })(GameUI = ui.GameUI || (ui.GameUI = {}));
})(ui || (ui = {}));
(function (ui) {
    var GameUI;
    (function (GameUI_1) {
        var GameUI = /** @class */ (function (_super) {
            __extends(GameUI, _super);
            function GameUI() {
                return _super.call(this) || this;
            }
            GameUI.prototype.createChildren = function () {
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.createView(ui.GameUI.GameUI.uiView);
            };
            GameUI.uiView = { "type": "View", "props": { "y": 0, "x": 0, "width": 750, "height": 1334, "centerY": 0, "centerX": 0 }, "compId": 1, "child": [{ "type": "Image", "props": { "visible": false, "var": "testBtn", "top": -1, "left": 0, "alpha": 1 }, "compId": 3, "child": [{ "type": "Label", "props": { "y": 34, "x": 89, "text": "菜单", "fontSize": 32, "font": "Arial", "color": "#ffffff", "bold": true, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 5 }] }, { "type": "Image", "props": { "y": 37, "x": 19, "skin": "Panel/GameBG.png" }, "compId": 6 }, { "type": "Image", "props": { "y": 133, "x": 632, "width": 67, "var": "img_player2_icon", "skin": "Frame/morentou.png", "pivotY": 38, "pivotX": 34, "height": 76 }, "compId": 53, "child": [{ "type": "Sprite", "props": { "renderType": "mask" }, "compId": 54, "child": [{ "type": "Circle", "props": { "y": 37.94464618328914, "x": 35.253564776278864, "radius": 38, "lineWidth": 1, "fillColor": "#ff0000" }, "compId": 55 }] }] }, { "type": "Image", "props": { "y": 133, "x": 102, "width": 67, "var": "img_player1_icon", "skin": "Frame/morentou.png", "pivotY": 38, "pivotX": 34, "height": 76 }, "compId": 50, "child": [{ "type": "Sprite", "props": { "renderType": "mask" }, "compId": 51, "child": [{ "type": "Circle", "props": { "y": 37.94464618328914, "x": 35.253564776278864, "radius": 38, "lineWidth": 1, "fillColor": "#ff0000" }, "compId": 52 }] }] }, { "type": "Image", "props": { "y": 95, "x": 65, "skin": "Frame/zhuangtai_L.png" }, "compId": 7 }, { "type": "Image", "props": { "y": 95, "x": 420, "skin": "Frame/zhuangtai_R.png" }, "compId": 8 }, { "type": "Image", "props": { "y": 187, "x": 512, "width": 114, "visible": false, "var": "img_combo", "skin": "Frame/Combo.png", "scaleY": 0.1, "scaleX": 0.1, "height": 28, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 26 }, { "type": "Image", "props": { "y": 35.5, "x": 431.5, "visible": true, "skin": "" }, "compId": 28 }, { "type": "Text", "props": { "y": 184, "x": 605, "width": 58, "visible": true, "var": "lbl_combo_num", "scaleY": 0.1, "scaleX": 0.1, "pivotY": 26, "pivotX": 29, "height": 52, "fontSize": 52, "font": "Arial", "color": "#ffff8d", "bold": true, "align": "center" }, "compId": 30 }, { "type": "Label", "props": { "y": 81, "x": 142, "width": 161, "var": "playerName1", "text": "play1", "height": 22, "fontSize": 22, "color": "#ffffff", "bold": true }, "compId": 31 }, { "type": "Label", "props": { "y": 81, "x": 447, "width": 145, "var": "playerName2", "text": "0", "overflow": "hidden", "height": 22, "fontSize": 22, "color": "#ffffff", "bold": true, "align": "right" }, "compId": 33 }, { "type": "Clip", "props": { "y": 119, "x": 303, "visible": false, "var": "clip_pb1", "skin": "Frame/clip_pb1.png", "pivotX": 162 }, "compId": 35 }, { "type": "Clip", "props": { "y": 144, "x": 593, "visible": false, "var": "clip_pb2", "skin": "Frame/clip_pb2.png", "rotation": 180, "autoPlay": true }, "compId": 36 }], "animations": [{ "nodes": [{ "target": 28, "keyframes": { "y": [{ "value": 35.5, "tweenMethod": "linearNone", "tween": true, "target": 28, "key": "y", "index": 0 }], "x": [{ "value": 431.5, "tweenMethod": "linearNone", "tween": true, "target": 28, "key": "x", "index": 0 }], "visible": [{ "value": true, "tweenMethod": "linearNone", "tween": false, "target": 28, "key": "visible", "index": 0 }, { "value": true, "tweenMethod": "linearNone", "tween": false, "target": 28, "key": "visible", "index": 12 }], "skin": [{ "value": "", "tweenMethod": "linearNone", "tween": false, "target": 28, "key": "skin", "index": 0 }, { "value": "Frame/baoji0003.png", "tweenMethod": "linearNone", "tween": false, "target": 28, "key": "skin", "index": 1 }, { "value": "Frame/baoji0004.png", "tweenMethod": "linearNone", "tween": false, "target": 28, "key": "skin", "index": 2 }, { "value": "Frame/baoji0013.png", "tweenMethod": "linearNone", "tween": false, "target": 28, "key": "skin", "index": 3 }, { "value": "Frame/baoji0006.png", "tweenMethod": "linearNone", "tween": false, "target": 28, "key": "skin", "index": 4 }, { "value": "Frame/baoji0007.png", "tweenMethod": "linearNone", "tween": false, "target": 28, "key": "skin", "index": 5 }, { "value": "Frame/baoji0008.png", "tweenMethod": "linearNone", "tween": false, "target": 28, "key": "skin", "index": 6 }, { "value": "Frame/baoji0009.png", "tweenMethod": "linearNone", "tween": false, "target": 28, "key": "skin", "index": 7 }, { "value": "Frame/baoji0010.png", "tweenMethod": "linearNone", "tween": false, "target": 28, "key": "skin", "index": 8 }, { "value": "Frame/baoji0011.png", "tweenMethod": "linearNone", "tween": false, "target": 28, "key": "skin", "index": 9 }, { "value": "Frame/baoji0012.png", "tweenMethod": "linearNone", "tween": false, "target": 28, "key": "skin", "index": 10 }, { "value": "", "tweenMethod": "linearNone", "tween": false, "target": 28, "key": "skin", "index": 12 }] } }], "name": "aniBoom", "id": 1, "frameRate": 24, "action": 0 }, { "nodes": [], "name": "heartAni", "id": 2, "frameRate": 30, "action": 0 }], "loadList": ["Panel/GameBG.png", "Frame/morentou.png", "Frame/zhuangtai_L.png", "Frame/zhuangtai_R.png", "Frame/Combo.png", "Frame/clip_pb1.png", "Frame/clip_pb2.png", "Frame/baoji0003.png", "Frame/baoji0004.png", "Frame/baoji0013.png", "Frame/baoji0006.png", "Frame/baoji0007.png", "Frame/baoji0008.png", "Frame/baoji0009.png", "Frame/baoji0010.png", "Frame/baoji0011.png", "Frame/baoji0012.png"], "loadList3D": [] };
            return GameUI;
        }(View));
        GameUI_1.GameUI = GameUI;
    })(GameUI = ui.GameUI || (ui.GameUI = {}));
})(ui || (ui = {}));
(function (ui) {
    var GameUI;
    (function (GameUI) {
        var OverUI = /** @class */ (function (_super) {
            __extends(OverUI, _super);
            function OverUI() {
                return _super.call(this) || this;
            }
            OverUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.GameUI.OverUI.uiView);
            };
            OverUI.uiView = { "type": "Dialog", "props": { "y": 0, "x": 0, "width": 750, "height": 1334 }, "compId": 1, "child": [{ "type": "Image", "props": { "y": 667, "width": 642, "var": "img_guangquan", "skin": "Frame/guangquan.png", "pivotY": 321, "pivotX": 321, "height": 642, "centerY": 0, "centerX": 0, "alpha": 0.5 }, "compId": 13 }, { "type": "Image", "props": { "y": 373, "x": 88, "var": "img_result_state", "skin": "Frame/win.png" }, "compId": 14 }, { "type": "Image", "props": { "y": 667, "x": 374, "var": "img_win_star", "skin": "Frame/xingxing.png", "scaleY": 0.1, "scaleX": 0.1, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 16 }, { "type": "Sprite", "props": { "y": 0, "x": 0, "width": 750, "var": "sp_back", "height": 1334 }, "compId": 17 }], "loadList": ["Frame/guangquan.png", "Frame/win.png", "Frame/xingxing.png"], "loadList3D": [] };
            return OverUI;
        }(Dialog));
        GameUI.OverUI = OverUI;
    })(GameUI = ui.GameUI || (ui.GameUI = {}));
})(ui || (ui = {}));
(function (ui) {
    var GameUI;
    (function (GameUI) {
        var PatternUI = /** @class */ (function (_super) {
            __extends(PatternUI, _super);
            function PatternUI() {
                return _super.call(this) || this;
            }
            PatternUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.GameUI.PatternUI.uiView);
            };
            PatternUI.uiView = { "type": "View", "props": { "width": 92, "height": 92 }, "compId": 2, "child": [{ "type": "Image", "props": { "y": 46, "x": 46, "width": 100, "visible": false, "var": "img_shine_bg", "skin": "Frame/select.png", "pivotY": 50, "pivotX": 50, "height": 100 }, "compId": 3 }, { "type": "Image", "props": { "y": 46, "x": 46, "width": 76, "var": "icon", "skin": "Icon/1.png", "pivotY": 38, "pivotX": 38, "height": 76 }, "compId": 4 }], "loadList": ["Frame/select.png", "Icon/1.png"], "loadList3D": [] };
            return PatternUI;
        }(View));
        GameUI.PatternUI = PatternUI;
    })(GameUI = ui.GameUI || (ui.GameUI = {}));
})(ui || (ui = {}));
(function (ui) {
    var Test;
    (function (Test) {
        var TestUI = /** @class */ (function (_super) {
            __extends(TestUI, _super);
            function TestUI() {
                return _super.call(this) || this;
            }
            TestUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.Test.TestUI.uiView);
            };
            TestUI.uiView = { "type": "View", "props": { "width": 1280, "height": 720, "centerY": 0, "centerX": 0 }, "compId": 1, "loadList": [], "loadList3D": [] };
            return TestUI;
        }(View));
        Test.TestUI = TestUI;
    })(Test = ui.Test || (ui.Test = {}));
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map