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
		this.skinParts = ["img","imgmask","_name","_goldimg","_cost","_count","_border","_border2"];
		
		this.height = 288;
		this.width = 288;
		this.elementsContent = [this.img_i(),this.imgmask_i(),this._name_i(),this._Group1_i(),this._count_i(),this._border_i(),this._border2_i()];
	}
	var _proto = block.prototype;

	_proto.img_i = function () {
		var t = new eui.Image();
		this.img = t;
		t.horizontalCenter = 0;
		t.y = 144;
		return t;
	};
	_proto.imgmask_i = function () {
		var t = new eui.Image();
		this.imgmask = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	_proto._name_i = function () {
		var t = new eui.Label();
		this._name = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "MyText";
		t.horizontalCenter = 0;
		t.text = "123";
		t.textAlign = "center";
		t.textColor = 0xf4ab66;
		t.verticalAlign = "middle";
		t.width = 288;
		t.y = 185;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 37;
		t.horizontalCenter = 0;
		t.width = 288;
		t.y = 227;
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
		t.text = "123";
		t.textAlign = "left";
		t.textColor = 0xf4ab66;
		t.verticalAlign = "middle";
		t.x = 143;
		t.y = 3;
		return t;
	};
	_proto._count_i = function () {
		var t = new eui.Label();
		this._count = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "MyText";
		t.height = 61;
		t.size = 70;
		t.text = "";
		t.textAlign = "center";
		t.textColor = 0x029327;
		t.verticalAlign = "middle";
		t.visible = false;
		t.width = 80;
		t.x = 199;
		t.y = 172;
		return t;
	};
	_proto._border_i = function () {
		var t = new eui.Group();
		this._border = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 152;
		t.horizontalCenter = 0;
		t.width = 227;
		t.y = 20;
		return t;
	};
	_proto._border2_i = function () {
		var t = new eui.Group();
		this._border2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 36;
		t.horizontalCenter = -37.5;
		t.visible = false;
		t.width = 43;
		t.y = 227;
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
		this.skinParts = ["light0","light1","light2","light3","light4","light5","light6","light7","light8","light9","light10","light11","light12","light13","light14","light15","light16","light17","light18","light19","lightgroup","b0","b1","b2","b7","b3","b6","b5","b4","clickone","clickten","clickblock","di1","di2","desc","scrolgroup","toptxt1","toptxt2","topgroup","goldimg","golddesc","goldtxt","xialabg","goldtxt1","goldtxt2","goldtxt3","goldimg1","goldimg2","goldimg3","xialagroup","confirmbtn","pricegroup","singleprice","overgroup"];
		
		this.height = 1920;
		this.width = 1080;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.lightgroup_i(),this._Group1_i(),this._Image5_i(),this._Image6_i(),this.di1_i(),this.di2_i(),this.scrolgroup_i(),this.topgroup_i(),this._Image8_i(),this._Image9_i(),this._Image10_i(),this.goldimg_i(),this.golddesc_i(),this.goldtxt_i(),this.xialagroup_i(),this.overgroup_i()];
	}
	var _proto = game.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 600;
		t.horizontalCenter = 0;
		t.source = "selected_png";
		t.verticalCenter = 0;
		t.visible = false;
		t.width = 600;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "ditu_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.lightgroup_i = function () {
		var t = new eui.Group();
		this.lightgroup = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 976;
		t.width = 1022;
		t.x = 43;
		t.y = 752;
		t.elementsContent = [this.light0_i(),this.light1_i(),this.light2_i(),this.light3_i(),this.light4_i(),this.light5_i(),this.light6_i(),this.light7_i(),this.light8_i(),this.light9_i(),this.light10_i(),this.light11_i(),this.light12_i(),this.light13_i(),this.light14_i(),this.light15_i(),this.light16_i(),this.light17_i(),this.light18_i(),this.light19_i()];
		return t;
	};
	_proto.light0_i = function () {
		var t = new eui.Image();
		this.light0 = t;
		t.source = "zhuanpan010_png";
		t.x = 31;
		t.y = 15;
		return t;
	};
	_proto.light1_i = function () {
		var t = new eui.Image();
		this.light1 = t;
		t.source = "zhuanpan010_png";
		t.x = 208.5;
		t.y = 15;
		return t;
	};
	_proto.light2_i = function () {
		var t = new eui.Image();
		this.light2 = t;
		t.source = "zhuanpan010_png";
		t.x = 390.5;
		t.y = 15;
		return t;
	};
	_proto.light3_i = function () {
		var t = new eui.Image();
		this.light3 = t;
		t.source = "zhuanpan010_png";
		t.x = 568.5;
		t.y = 15;
		return t;
	};
	_proto.light4_i = function () {
		var t = new eui.Image();
		this.light4 = t;
		t.source = "zhuanpan010_png";
		t.x = 745.5;
		t.y = 15;
		return t;
	};
	_proto.light5_i = function () {
		var t = new eui.Image();
		this.light5 = t;
		t.source = "zhuanpan010_png";
		t.x = 925;
		t.y = 15;
		return t;
	};
	_proto.light6_i = function () {
		var t = new eui.Image();
		this.light6 = t;
		t.source = "zhuanpan010_png";
		t.x = 929;
		t.y = 194;
		return t;
	};
	_proto.light7_i = function () {
		var t = new eui.Image();
		this.light7 = t;
		t.source = "zhuanpan010_png";
		t.x = 929;
		t.y = 375;
		return t;
	};
	_proto.light8_i = function () {
		var t = new eui.Image();
		this.light8 = t;
		t.source = "zhuanpan010_png";
		t.x = 927;
		t.y = 555;
		return t;
	};
	_proto.light9_i = function () {
		var t = new eui.Image();
		this.light9 = t;
		t.source = "zhuanpan010_png";
		t.x = 928;
		t.y = 733;
		return t;
	};
	_proto.light10_i = function () {
		var t = new eui.Image();
		this.light10 = t;
		t.source = "zhuanpan010_png";
		t.x = 926;
		t.y = 908;
		return t;
	};
	_proto.light11_i = function () {
		var t = new eui.Image();
		this.light11 = t;
		t.source = "zhuanpan010_png";
		t.x = 746.5;
		t.y = 908;
		return t;
	};
	_proto.light12_i = function () {
		var t = new eui.Image();
		this.light12 = t;
		t.source = "zhuanpan010_png";
		t.x = 568.5;
		t.y = 908;
		return t;
	};
	_proto.light13_i = function () {
		var t = new eui.Image();
		this.light13 = t;
		t.source = "zhuanpan010_png";
		t.x = 390.5;
		t.y = 908;
		return t;
	};
	_proto.light14_i = function () {
		var t = new eui.Image();
		this.light14 = t;
		t.source = "zhuanpan010_png";
		t.x = 204.5;
		t.y = 908;
		return t;
	};
	_proto.light15_i = function () {
		var t = new eui.Image();
		this.light15 = t;
		t.source = "zhuanpan010_png";
		t.x = 31;
		t.y = 908;
		return t;
	};
	_proto.light16_i = function () {
		var t = new eui.Image();
		this.light16 = t;
		t.source = "zhuanpan010_png";
		t.x = 29;
		t.y = 732;
		return t;
	};
	_proto.light17_i = function () {
		var t = new eui.Image();
		this.light17 = t;
		t.source = "zhuanpan010_png";
		t.x = 31;
		t.y = 555;
		return t;
	};
	_proto.light18_i = function () {
		var t = new eui.Image();
		this.light18 = t;
		t.source = "zhuanpan010_png";
		t.x = 31;
		t.y = 375;
		return t;
	};
	_proto.light19_i = function () {
		var t = new eui.Image();
		this.light19 = t;
		t.source = "zhuanpan010_png";
		t.x = 29;
		t.y = 194;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 864;
		t.horizontalCenter = 4;
		t.verticalCenter = 282;
		t.width = 864;
		t.elementsContent = [this.b0_i(),this.b1_i(),this.b2_i(),this.b7_i(),this.b3_i(),this.b6_i(),this.b5_i(),this.b4_i(),this.clickblock_i()];
		return t;
	};
	_proto.b0_i = function () {
		var t = new blockUI();
		this.b0 = t;
		t.height = 288;
		t.width = 288;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.b1_i = function () {
		var t = new blockUI();
		this.b1 = t;
		t.height = 288;
		t.width = 288;
		t.x = 288;
		t.y = 0;
		return t;
	};
	_proto.b2_i = function () {
		var t = new blockUI();
		this.b2 = t;
		t.height = 288;
		t.width = 288;
		t.x = 576;
		t.y = 0;
		return t;
	};
	_proto.b7_i = function () {
		var t = new blockUI();
		this.b7 = t;
		t.height = 288;
		t.width = 288;
		t.x = 0;
		t.y = 288;
		return t;
	};
	_proto.b3_i = function () {
		var t = new blockUI();
		this.b3 = t;
		t.height = 288;
		t.width = 288;
		t.x = 576;
		t.y = 288;
		return t;
	};
	_proto.b6_i = function () {
		var t = new blockUI();
		this.b6 = t;
		t.height = 288;
		t.width = 288;
		t.x = 0;
		t.y = 567;
		return t;
	};
	_proto.b5_i = function () {
		var t = new blockUI();
		this.b5 = t;
		t.height = 288;
		t.width = 288;
		t.x = 288;
		t.y = 567;
		return t;
	};
	_proto.b4_i = function () {
		var t = new blockUI();
		this.b4 = t;
		t.height = 288;
		t.width = 288;
		t.x = 576;
		t.y = 568;
		return t;
	};
	_proto.clickblock_i = function () {
		var t = new eui.Group();
		this.clickblock = t;
		t.height = 288;
		t.width = 288;
		t.x = 287;
		t.y = 288;
		t.elementsContent = [this._Image3_i(),this._Image4_i(),this.clickone_i(),this.clickten_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "zhuanpan08_png";
		t.x = -11;
		t.y = -12;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "zhuanpan09_png";
		t.x = -13;
		t.y = 107;
		return t;
	};
	_proto.clickone_i = function () {
		var t = new eui.Label();
		this.clickone = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "MyText";
		t.height = 108;
		t.size = 46;
		t.text = "GO";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 264;
		t.x = 13;
		t.y = 14;
		return t;
	};
	_proto.clickten_i = function () {
		var t = new eui.Label();
		this.clickten = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "MyText";
		t.height = 108;
		t.size = 46;
		t.text = "GOX10";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 264;
		t.x = 12;
		t.y = 147;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.source = "zhuanpan02_png";
		t.width = 1080;
		t.x = 0;
		t.y = 131;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.source = "zhuanpan03_png";
		t.width = 1080;
		t.x = 0;
		t.y = 300;
		return t;
	};
	_proto.di1_i = function () {
		var t = new eui.Image();
		this.di1 = t;
		t.source = "zhuanpan04_png";
		t.x = 173;
		t.y = 292;
		return t;
	};
	_proto.di2_i = function () {
		var t = new eui.Image();
		this.di2 = t;
		t.source = "zhuanpan04_png";
		t.visible = false;
		t.x = 715;
		t.y = 292;
		return t;
	};
	_proto.scrolgroup_i = function () {
		var t = new eui.Group();
		this.scrolgroup = t;
		t.height = 161;
		t.width = 1080;
		t.x = 0;
		t.y = 300;
		t.elementsContent = [this.desc_i()];
		return t;
	};
	_proto.desc_i = function () {
		var t = new eui.Label();
		this.desc = t;
		t.fontFamily = "MyText";
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 40;
		t.text = "Introduction: From x to x, exclusive gifts worth 20,000 diamonds are added to the price pool, don't miss the chance to win!";
		t.textAlign = "center";
		t.textColor = 0xffffff;
		t.verticalAlign = "middle";
		t.width = 1000;
		t.wordWrap = true;
		t.y = 0;
		return t;
	};
	_proto.topgroup_i = function () {
		var t = new eui.Group();
		this.topgroup = t;
		t.height = 161;
		t.width = 1080;
		t.x = 0;
		t.y = 131;
		t.elementsContent = [this.toptxt1_i(),this.toptxt2_i(),this._Image7_i()];
		return t;
	};
	_proto.toptxt1_i = function () {
		var t = new eui.Label();
		this.toptxt1 = t;
		t.fontFamily = "MyText";
		t.height = 161;
		t.size = 40;
		t.text = "Premium Wheel";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 540;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.toptxt2_i = function () {
		var t = new eui.Label();
		this.toptxt2 = t;
		t.fontFamily = "MyText";
		t.height = 161;
		t.size = 40;
		t.text = "Happy Wheel";
		t.textAlign = "center";
		t.textColor = 0x878787;
		t.verticalAlign = "middle";
		t.width = 540;
		t.x = 540;
		t.y = 0;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.source = "zhuanpan05_png";
		t.visible = false;
		t.x = 1024;
		t.y = 45.5;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.source = "zhuanpan01_png";
		t.x = 7;
		t.y = 559;
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.scale9Grid = new egret.Rectangle(46,27,276,71);
		t.source = "zhuanpan01_png";
		t.width = 696;
		t.x = 375.5;
		t.y = 559;
		return t;
	};
	_proto._Image10_i = function () {
		var t = new eui.Image();
		t.source = "zhuanpan06_png";
		t.x = 191;
		t.y = 638;
		return t;
	};
	_proto.goldimg_i = function () {
		var t = new eui.Image();
		this.goldimg = t;
		t.height = 60;
		t.width = 60;
		t.x = 80;
		t.y = 591;
		return t;
	};
	_proto.golddesc_i = function () {
		var t = new eui.Label();
		this.golddesc = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "MyText";
		t.height = 100;
		t.size = 40;
		t.text = "Label";
		t.textAlign = "center";
		t.textColor = 0xff9900;
		t.verticalAlign = "middle";
		t.width = 680;
		t.wordWrap = true;
		t.x = 384;
		t.y = 571;
		return t;
	};
	_proto.goldtxt_i = function () {
		var t = new eui.Label();
		this.goldtxt = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "MyText";
		t.height = 100;
		t.size = 40;
		t.text = "Diamonds";
		t.textAlign = "center";
		t.textColor = 0xFF9900;
		t.verticalAlign = "middle";
		t.width = 254;
		t.x = 109;
		t.y = 571;
		return t;
	};
	_proto.xialagroup_i = function () {
		var t = new eui.Group();
		this.xialagroup = t;
		t.height = 215;
		t.visible = false;
		t.width = 384;
		t.x = 0;
		t.y = 682;
		t.elementsContent = [this.xialabg_i(),this.goldtxt1_i(),this.goldtxt2_i(),this.goldtxt3_i(),this.goldimg1_i(),this.goldimg2_i(),this.goldimg3_i()];
		return t;
	};
	_proto.xialabg_i = function () {
		var t = new eui.Image();
		this.xialabg = t;
		t.scale9Grid = new egret.Rectangle(48,34,288,98);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "zhuanpan07_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.goldtxt1_i = function () {
		var t = new eui.Label();
		this.goldtxt1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "MyText";
		t.height = 60;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 40;
		t.text = "Diamonds";
		t.textAlign = "center";
		t.textColor = 0xFF9900;
		t.verticalAlign = "middle";
		t.visible = false;
		t.width = 261;
		t.x = 107;
		t.y = 19;
		return t;
	};
	_proto.goldtxt2_i = function () {
		var t = new eui.Label();
		this.goldtxt2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "MyText";
		t.height = 60;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 40;
		t.text = "Diamonds";
		t.textAlign = "center";
		t.textColor = 0xFF9900;
		t.verticalAlign = "middle";
		t.visible = false;
		t.width = 261;
		t.x = 107;
		t.y = 76;
		return t;
	};
	_proto.goldtxt3_i = function () {
		var t = new eui.Label();
		this.goldtxt3 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "MyText";
		t.height = 60;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 40;
		t.text = "Diamonds";
		t.textAlign = "center";
		t.textColor = 0xFF9900;
		t.verticalAlign = "middle";
		t.visible = false;
		t.width = 260;
		t.x = 107;
		t.y = 137;
		return t;
	};
	_proto.goldimg1_i = function () {
		var t = new eui.Image();
		this.goldimg1 = t;
		t.height = 60;
		t.visible = false;
		t.width = 60;
		t.x = 42;
		t.y = 19;
		return t;
	};
	_proto.goldimg2_i = function () {
		var t = new eui.Image();
		this.goldimg2 = t;
		t.height = 60;
		t.visible = false;
		t.width = 60;
		t.x = 44;
		t.y = 77.5;
		return t;
	};
	_proto.goldimg3_i = function () {
		var t = new eui.Image();
		this.goldimg3 = t;
		t.height = 60;
		t.visible = false;
		t.width = 60;
		t.x = 44;
		t.y = 137.5;
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
		t.elementsContent = [this._Rect1_i(),this._Image11_i(),this._Image12_i(),this._Image13_i(),this._Label1_i(),this._Label2_i(),this.confirmbtn_i(),this.pricegroup_i(),this.singleprice_i()];
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillAlpha = 0.5;
		t.height = 1920;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 1080;
		return t;
	};
	_proto._Image11_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "mianban01_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image12_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "mianban03_png";
		t.visible = false;
		t.y = 461;
		return t;
	};
	_proto._Image13_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "mianban04_png";
		t.visible = false;
		t.y = 532;
		return t;
	};
	_proto._Label1_i = function () {
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
		t.y = 549;
		return t;
	};
	_proto._Label2_i = function () {
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
	_proto.pricegroup_i = function () {
		var t = new eui.Group();
		this.pricegroup = t;
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
	_proto.singleprice_i = function () {
		var t = new singlepriceUI();
		this.singleprice = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 200;
		t.scaleX = 2;
		t.scaleY = 2;
		t.skinName = "singleprize";
		t.visible = false;
		t.width = 155;
		t.x = 390;
		t.y = 782;
		return t;
	};
	return game;
})(eui.Skin);