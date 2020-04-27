window.skins={};
                function __extends(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                        function __() {
                            this.constructor = d;
                        }
                    __.prototype = b.prototype;
                    d.prototype = new __();
                };
                window.generateEUI = {};
                generateEUI.paths = {};
                generateEUI.styles = undefined;
                generateEUI.skins = {"eui.Button":"resource/eui_skins/ButtonSkin.exml","eui.CheckBox":"resource/eui_skins/CheckBoxSkin.exml","eui.HScrollBar":"resource/eui_skins/HScrollBarSkin.exml","eui.HSlider":"resource/eui_skins/HSliderSkin.exml","eui.Panel":"resource/eui_skins/PanelSkin.exml","eui.TextInput":"resource/eui_skins/TextInputSkin.exml","eui.ProgressBar":"resource/eui_skins/ProgressBarSkin.exml","eui.RadioButton":"resource/eui_skins/RadioButtonSkin.exml","eui.Scroller":"resource/eui_skins/ScrollerSkin.exml","eui.ToggleSwitch":"resource/eui_skins/ToggleSwitchSkin.exml","eui.VScrollBar":"resource/eui_skins/VScrollBarSkin.exml","eui.VSlider":"resource/eui_skins/VSliderSkin.exml","eui.ItemRenderer":"resource/eui_skins/ItemRendererSkin.exml"};generateEUI.paths['resource/eui_skins/ButtonSkin.exml'] = window.skins.ButtonSkin = (function (_super) {
	__extends(ButtonSkin, _super);
	function ButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay","iconDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this.iconDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
	}
	var _proto = ButtonSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	return ButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/CheckBoxSkin.exml'] = window.skins.CheckBoxSkin = (function (_super) {
	__extends(CheckBoxSkin, _super);
	function CheckBoxSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_disabled_png")
				])
		];
	}
	var _proto = CheckBoxSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "checkbox_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return CheckBoxSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HScrollBarSkin.exml'] = window.skins.HScrollBarSkin = (function (_super) {
	__extends(HScrollBarSkin, _super);
	function HScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = HScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 8;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.verticalCenter = 0;
		t.width = 30;
		return t;
	};
	return HScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HSliderSkin.exml'] = window.skins.HSliderSkin = (function (_super) {
	__extends(HSliderSkin, _super);
	function HSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = HSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.height = 6;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_sb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.source = "thumb_png";
		t.verticalCenter = 0;
		return t;
	};
	return HSliderSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ItemRendererSkin.exml'] = window.skins.ItemRendererSkin = (function (_super) {
	__extends(ItemRendererSkin, _super);
	function ItemRendererSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data"],[0],this.labelDisplay,"text");
	}
	var _proto = ItemRendererSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.fontFamily = "Tahoma";
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	return ItemRendererSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/PanelSkin.exml'] = window.skins.PanelSkin = (function (_super) {
	__extends(PanelSkin, _super);
	function PanelSkin() {
		_super.call(this);
		this.skinParts = ["titleDisplay","moveArea","closeButton"];
		
		this.minHeight = 230;
		this.minWidth = 450;
		this.elementsContent = [this._Image1_i(),this.moveArea_i(),this.closeButton_i()];
	}
	var _proto = PanelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(2,2,12,12);
		t.source = "border_png";
		t.top = 0;
		return t;
	};
	_proto.moveArea_i = function () {
		var t = new eui.Group();
		this.moveArea = t;
		t.height = 45;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this._Image2_i(),this.titleDisplay_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "header_png";
		t.top = 0;
		return t;
	};
	_proto.titleDisplay_i = function () {
		var t = new eui.Label();
		this.titleDisplay = t;
		t.fontFamily = "Tahoma";
		t.left = 15;
		t.right = 5;
		t.size = 20;
		t.textColor = 0xFFFFFF;
		t.verticalCenter = 0;
		t.wordWrap = false;
		return t;
	};
	_proto.closeButton_i = function () {
		var t = new eui.Button();
		this.closeButton = t;
		t.bottom = 5;
		t.horizontalCenter = 0;
		t.label = "close";
		return t;
	};
	return PanelSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ProgressBarSkin.exml'] = window.skins.ProgressBarSkin = (function (_super) {
	__extends(ProgressBarSkin, _super);
	function ProgressBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb","labelDisplay"];
		
		this.minHeight = 18;
		this.minWidth = 30;
		this.elementsContent = [this._Image1_i(),this.thumb_i(),this.labelDisplay_i()];
	}
	var _proto = ProgressBarSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_pb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.percentHeight = 100;
		t.source = "thumb_pb_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.horizontalCenter = 0;
		t.size = 15;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		return t;
	};
	return ProgressBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/RadioButtonSkin.exml'] = window.skins.RadioButtonSkin = (function (_super) {
	__extends(RadioButtonSkin, _super);
	function RadioButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_disabled_png")
				])
		];
	}
	var _proto = RadioButtonSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "radiobutton_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return RadioButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ScrollerSkin.exml'] = window.skins.ScrollerSkin = (function (_super) {
	__extends(ScrollerSkin, _super);
	function ScrollerSkin() {
		_super.call(this);
		this.skinParts = ["horizontalScrollBar","verticalScrollBar"];
		
		this.minHeight = 20;
		this.minWidth = 20;
		this.elementsContent = [this.horizontalScrollBar_i(),this.verticalScrollBar_i()];
	}
	var _proto = ScrollerSkin.prototype;

	_proto.horizontalScrollBar_i = function () {
		var t = new eui.HScrollBar();
		this.horizontalScrollBar = t;
		t.bottom = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.verticalScrollBar_i = function () {
		var t = new eui.VScrollBar();
		this.verticalScrollBar = t;
		t.percentHeight = 100;
		t.right = 0;
		return t;
	};
	return ScrollerSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/TextInputSkin.exml'] = window.skins.TextInputSkin = (function (_super) {
	__extends(TextInputSkin, _super);
	function TextInputSkin() {
		_super.call(this);
		this.skinParts = ["textDisplay","promptDisplay"];
		
		this.minHeight = 40;
		this.minWidth = 300;
		this.elementsContent = [this._Image1_i(),this._Rect1_i(),this.textDisplay_i()];
		this.promptDisplay_i();
		
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("textDisplay","textColor",0xff0000)
				])
			,
			new eui.State ("normalWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
			,
			new eui.State ("disabledWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
		];
	}
	var _proto = TextInputSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xffffff;
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto.textDisplay_i = function () {
		var t = new eui.EditableText();
		this.textDisplay = t;
		t.height = 24;
		t.left = "10";
		t.right = "10";
		t.size = 20;
		t.textColor = 0x000000;
		t.verticalCenter = "0";
		t.percentWidth = 100;
		return t;
	};
	_proto.promptDisplay_i = function () {
		var t = new eui.Label();
		this.promptDisplay = t;
		t.height = 24;
		t.left = 10;
		t.right = 10;
		t.size = 20;
		t.textColor = 0xa9a9a9;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	return TextInputSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ToggleSwitchSkin.exml'] = window.skins.ToggleSwitchSkin = (function (_super) {
	__extends(ToggleSwitchSkin, _super);
	function ToggleSwitchSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.elementsContent = [this._Image1_i(),this._Image2_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
		];
	}
	var _proto = ToggleSwitchSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.source = "on_png";
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = -18;
		t.source = "handle_png";
		t.verticalCenter = 0;
		return t;
	};
	return ToggleSwitchSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/VScrollBarSkin.exml'] = window.skins.VScrollBarSkin = (function (_super) {
	__extends(VScrollBarSkin, _super);
	function VScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 20;
		this.minWidth = 8;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = VScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 30;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.width = 8;
		return t;
	};
	return VScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/VSliderSkin.exml'] = window.skins.VSliderSkin = (function (_super) {
	__extends(VSliderSkin, _super);
	function VSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 30;
		this.minWidth = 25;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = VSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_png";
		t.width = 7;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.horizontalCenter = 0;
		t.source = "thumb_png";
		return t;
	};
	return VSliderSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ui/block.exml'] = window.block = (function (_super) {
	__extends(block, _super);
	function block() {
		_super.call(this);
		this.skinParts = ["_img","_border","_name","_goldimg","_cost","_border2"];
		
		this.height = 145;
		this.width = 115;
		this.elementsContent = [this._Image1_i(),this._img_i(),this._border_i(),this._name_i(),this._Group1_i(),this._border2_i()];
	}
	var _proto = block.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "gift_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._img_i = function () {
		var t = new eui.Image();
		this._img = t;
		t.horizontalCenter = 0;
		t.y = 45;
		return t;
	};
	_proto._border_i = function () {
		var t = new eui.Group();
		this._border = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 88;
		t.horizontalCenter = 0;
		t.width = 115;
		t.y = 0;
		return t;
	};
	_proto._name_i = function () {
		var t = new eui.Label();
		this._name = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "MyText";
		t.horizontalCenter = 0;
		t.size = 18;
		t.text = "123";
		t.textAlign = "center";
		t.textColor = 0x000000;
		t.verticalAlign = "middle";
		t.width = 115;
		t.y = 87;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 37;
		t.horizontalCenter = 0;
		t.width = 115;
		t.y = 111;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._goldimg_i(),this._cost_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 15;
		t.horizontalAlign = "center";
		return t;
	};
	_proto._goldimg_i = function () {
		var t = new eui.Image();
		this._goldimg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 37;
		t.width = 43;
		t.x = 85;
		t.y = 226.5;
		return t;
	};
	_proto._cost_i = function () {
		var t = new eui.Label();
		this._cost = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "MyText";
		t.height = 37;
		t.horizontalCenter = 71.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 20;
		t.text = "123";
		t.textAlign = "left";
		t.textColor = 0x000000;
		t.verticalAlign = "middle";
		t.x = 143;
		t.y = 3;
		return t;
	};
	_proto._border2_i = function () {
		var t = new eui.Group();
		this._border2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 36;
		t.width = 43;
		t.x = 7;
		t.y = 110;
		return t;
	};
	return block;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ui/singleprize.exml'] = window.singleprize = (function (_super) {
	__extends(singleprize, _super);
	function singleprize() {
		_super.call(this);
		this.skinParts = ["pricetxt","imggroup"];
		
		this.height = 200;
		this.width = 155;
		this.elementsContent = [this._Image1_i(),this.pricetxt_i(),this.imggroup_i()];
	}
	var _proto = singleprize.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 155;
		t.source = "mianban02_png";
		t.width = 155;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.pricetxt_i = function () {
		var t = new eui.Label();
		this.pricetxt = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "MyText";
		t.height = 57;
		t.horizontalCenter = 0;
		t.size = 25;
		t.text = "Label";
		t.textAlign = "center";
		t.textColor = 0xa2ff6d;
		t.verticalAlign = "middle";
		t.width = 155;
		t.wordWrap = true;
		t.y = 141;
		return t;
	};
	_proto.imggroup_i = function () {
		var t = new eui.Group();
		this.imggroup = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 125;
		t.width = 133;
		t.x = 9;
		t.y = 16;
		return t;
	};
	return singleprize;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ui/game.exml'] = window.game = (function (_super) {
	__extends(game, _super);
	function game() {
		_super.call(this);
		this.skinParts = ["egg","light1","light2","light3","light4","ribbon","hammer","di1","smash1","kuang1","chui1","di2","smash2","kuang2","chui2","di3","smash3","kuang3","chui3","giftgroup","left","right","golddesc","goldimg","goldtxt","xialabg","xialagroup","confirmbtn","prizegroup","singleprize","overgroup"];
		
		this.height = 1920;
		this.width = 1080;
		this.elementsContent = [this._Rect1_i(),this._Image1_i(),this._Image2_i(),this.egg_i(),this.light1_i(),this.light2_i(),this.light3_i(),this.light4_i(),this.ribbon_i(),this.hammer_i(),this.di1_i(),this.smash1_i(),this.kuang1_i(),this.chui1_i(),this.di2_i(),this.smash2_i(),this.kuang2_i(),this.chui2_i(),this.di3_i(),this.smash3_i(),this.kuang3_i(),this.chui3_i(),this._Image3_i(),this._Label1_i(),this.giftgroup_i(),this.left_i(),this.right_i(),this._Image4_i(),this._Image5_i(),this._Image6_i(),this._Image7_i(),this.golddesc_i(),this.goldimg_i(),this.goldtxt_i(),this.xialagroup_i(),this.overgroup_i()];
	}
	var _proto = game.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xffffff;
		t.height = 1920;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 1080;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "bg_01_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "bg_02_png";
		t.y = 339;
		return t;
	};
	_proto.egg_i = function () {
		var t = new eui.Image();
		this.egg = t;
		t.source = "E0001_png";
		t.x = 0;
		t.y = 341;
		return t;
	};
	_proto.light1_i = function () {
		var t = new eui.Image();
		this.light1 = t;
		t.source = "LIGHT_10001_png";
		t.x = 162;
		t.y = 530.5;
		return t;
	};
	_proto.light2_i = function () {
		var t = new eui.Image();
		this.light2 = t;
		t.scaleX = -1;
		t.source = "LIGHT_10001_png";
		t.x = 893;
		t.y = 528.5;
		return t;
	};
	_proto.light3_i = function () {
		var t = new eui.Image();
		this.light3 = t;
		t.source = "light_20001_png";
		t.x = 250;
		t.y = 965;
		return t;
	};
	_proto.light4_i = function () {
		var t = new eui.Image();
		this.light4 = t;
		t.source = "light_20001_png";
		t.x = 760;
		t.y = 969.5;
		return t;
	};
	_proto.ribbon_i = function () {
		var t = new eui.Image();
		this.ribbon = t;
		t.horizontalCenter = 0;
		t.source = "C0001_png";
		t.y = 293;
		return t;
	};
	_proto.hammer_i = function () {
		var t = new eui.Image();
		this.hammer = t;
		t.source = "T0001_png";
		t.x = 231.5;
		t.y = 604;
		return t;
	};
	_proto.di1_i = function () {
		var t = new eui.Image();
		this.di1 = t;
		t.source = "selectdi_png";
		t.x = 38;
		t.y = 1581;
		return t;
	};
	_proto.smash1_i = function () {
		var t = new eui.Image();
		this.smash1 = t;
		t.source = "smash_png";
		t.x = 74.5;
		t.y = 1748;
		return t;
	};
	_proto.kuang1_i = function () {
		var t = new eui.Image();
		this.kuang1 = t;
		t.source = "selectkuang_png";
		t.x = 126;
		t.y = 1591;
		return t;
	};
	_proto.chui1_i = function () {
		var t = new eui.Image();
		this.chui1 = t;
		t.source = "hammer3_png";
		t.x = 136;
		t.y = 1597;
		return t;
	};
	_proto.di2_i = function () {
		var t = new eui.Image();
		this.di2 = t;
		t.horizontalCenter = 0;
		t.source = "unselectdi_png";
		t.y = 1581;
		return t;
	};
	_proto.smash2_i = function () {
		var t = new eui.Image();
		this.smash2 = t;
		t.source = "smash_png";
		t.visible = false;
		t.x = 416.5;
		t.y = 1748;
		return t;
	};
	_proto.kuang2_i = function () {
		var t = new eui.Image();
		this.kuang2 = t;
		t.source = "unselectkuang_png";
		t.x = 476.5;
		t.y = 1591;
		return t;
	};
	_proto.chui2_i = function () {
		var t = new eui.Image();
		this.chui2 = t;
		t.source = "hammer2_png";
		t.x = 486;
		t.y = 1596;
		return t;
	};
	_proto.di3_i = function () {
		var t = new eui.Image();
		this.di3 = t;
		t.source = "unselectdi_png";
		t.x = 722;
		t.y = 1581;
		return t;
	};
	_proto.smash3_i = function () {
		var t = new eui.Image();
		this.smash3 = t;
		t.source = "smash_png";
		t.visible = false;
		t.x = 758.5;
		t.y = 1748;
		return t;
	};
	_proto.kuang3_i = function () {
		var t = new eui.Image();
		this.kuang3 = t;
		t.source = "unselectkuang_png";
		t.x = 811;
		t.y = 1591;
		return t;
	};
	_proto.chui3_i = function () {
		var t = new eui.Image();
		this.chui3 = t;
		t.source = "hammer1_png";
		t.x = 820.5;
		t.y = 1596;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "bg_03_png";
		t.y = 1165;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "MyText";
		t.height = 49;
		t.size = 41;
		t.text = "gift list";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 151;
		t.x = 49;
		t.y = 1185;
		return t;
	};
	_proto.giftgroup_i = function () {
		var t = new eui.Group();
		this.giftgroup = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 165;
		t.width = 964;
		t.x = 57;
		t.y = 1256;
		return t;
	};
	_proto.left_i = function () {
		var t = new eui.Image();
		this.left = t;
		t.source = "left_png";
		t.x = 38;
		t.y = 1288;
		return t;
	};
	_proto.right_i = function () {
		var t = new eui.Image();
		this.right = t;
		t.scaleX = -1;
		t.source = "left_png";
		t.x = 1042;
		t.y = 1288;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "bg_04_png";
		t.y = 1437;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "word_png";
		t.x = 380;
		t.y = 1453;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.source = "word_png";
		t.width = 299;
		t.x = 55.5;
		t.y = 1453;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.source = "xiala_png";
		t.x = 298;
		t.y = 1455;
		return t;
	};
	_proto.golddesc_i = function () {
		var t = new eui.Label();
		this.golddesc = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "MyText";
		t.height = 112;
		t.text = "Label";
		t.textAlign = "center";
		t.textColor = 0x000000;
		t.verticalAlign = "middle";
		t.width = 648;
		t.wordWrap = true;
		t.x = 380;
		t.y = 1453;
		return t;
	};
	_proto.goldimg_i = function () {
		var t = new eui.Image();
		this.goldimg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 50;
		t.width = 50;
		t.x = 70;
		t.y = 1483;
		return t;
	};
	_proto.goldtxt_i = function () {
		var t = new eui.Label();
		this.goldtxt = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "MyText";
		t.height = 112;
		t.size = 40;
		t.text = "diamonds";
		t.textAlign = "center";
		t.textColor = 0x000000;
		t.verticalAlign = "middle";
		t.width = 295;
		t.x = 56.5;
		t.y = 1453;
		return t;
	};
	_proto.xialagroup_i = function () {
		var t = new eui.Group();
		this.xialagroup = t;
		t.anchorOffsetY = 0;
		t.height = 304;
		t.visible = false;
		t.width = 295;
		t.x = 56.5;
		t.y = 1566;
		t.elementsContent = [this.xialabg_i()];
		return t;
	};
	_proto.xialabg_i = function () {
		var t = new eui.Image();
		this.xialabg = t;
		t.height = 300;
		t.source = "word_png";
		t.width = 295;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.overgroup_i = function () {
		var t = new eui.Group();
		this.overgroup = t;
		t.height = 1920;
		t.visible = false;
		t.width = 1080;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Rect2_i(),this._Image8_i(),this._Label2_i(),this._Label3_i(),this.confirmbtn_i(),this.prizegroup_i(),this.singleprize_i()];
		return t;
	};
	_proto._Rect2_i = function () {
		var t = new eui.Rect();
		t.fillAlpha = 0.5;
		t.height = 1920;
		t.horizontalCenter = 0;
		t.scaleX = 1.3;
		t.scaleY = 1.3;
		t.verticalCenter = 0;
		t.width = 1080;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "mianban01_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "MyText";
		t.height = 119;
		t.horizontalCenter = 0;
		t.size = 50;
		t.text = "Here are the gifts you draw";
		t.textAlign = "center";
		t.textColor = 0x77ce33;
		t.verticalAlign = "middle";
		t.width = 636;
		t.wordWrap = true;
		t.y = 549;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "MyText";
		t.height = 119;
		t.horizontalCenter = 0;
		t.size = 77;
		t.text = "Congratulations!";
		t.textAlign = "center";
		t.textColor = 0x5bb1cc;
		t.verticalAlign = "middle";
		t.width = 636;
		t.y = 446;
		return t;
	};
	_proto.confirmbtn_i = function () {
		var t = new eui.Image();
		this.confirmbtn = t;
		t.horizontalCenter = 0;
		t.source = "mianban_png";
		t.y = 1313;
		return t;
	};
	_proto.prizegroup_i = function () {
		var t = new eui.Group();
		this.prizegroup = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 600;
		t.horizontalCenter = 0;
		t.width = 620;
		t.y = 700;
		t.layout = this._TileLayout1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalGap = 0;
		return t;
	};
	_proto.singleprize_i = function () {
		var t = new singleprizeUI();
		this.singleprize = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 200;
		t.scaleX = 2;
		t.scaleY = 2;
		t.skinName = "singleprize";
		t.width = 155;
		t.x = 390;
		t.y = 782;
		return t;
	};
	return game;
})(eui.Skin);