!function(t,n,i){i.un,i.uns;var r=i.static,e=i.class,s=i.getset,o=(i.__newvec,laya.utils.ColorUtils),_=laya.filters.Filter,a=laya.maths.Matrix,l=(laya.renders.Render,laya.utils.RunDriver,laya.webgl.shader.d2.ShaderDefines2D,laya.display.Sprite,laya.webgl.shader.d2.value.Value2D),u=function(){function t(){}e(t,"laya.filters.GlowFilterGLRender");var n=t.prototype;return n.setShaderInfo=function(t,n,i,r){t.defines.add(r.type);var e=t;e.u_blurInfo1=r._sv_blurInfo1;var s=r._sv_blurInfo2;s[0]=n,s[1]=i,e.u_blurInfo2=s,e.u_color=r.getColor()},n.render=function(t,n,i,r,e){var s=i,o=r,_=l.create(1,0);this.setShaderInfo(_,s,o,e);var u=l.create(1,0),h=a.TEMP.identity();n.drawTarget(t,0,0,s,o,h,_),n.drawTarget(t,0,0,s,o,h,u)},t}(),h=function(){function t(){}e(t,"laya.filters.BlurFilterGLRender");var n=t.prototype;return n.render=function(t,n,i,r,e){var s=l.create(1,0);this.setShaderInfo(s,e,t.width,t.height),n.drawTarget(t,0,0,i,r,a.EMPTY.identity(),s)},n.setShaderInfo=function(n,i,r,e){n.defines.add(16);var s=n;t.blurinfo[0]=r,t.blurinfo[1]=e,s.blurInfo=t.blurinfo;var o=i.strength/3,_=o*o;i.strength_sig2_2sig2_gauss1[0]=i.strength,i.strength_sig2_2sig2_gauss1[1]=_,i.strength_sig2_2sig2_gauss1[2]=2*_,i.strength_sig2_2sig2_gauss1[3]=1/(2*Math.PI*_),s.strength_sig2_2sig2_gauss1=i.strength_sig2_2sig2_gauss1},r(t,["blurinfo",function(){return this.blurinfo=new Array(2)}]),t}();(function(t){function n(t){this.strength=NaN,this.strength_sig2_2sig2_gauss1=[],this.strength_sig2_native=null,this.renderFunc=null,n.__super.call(this),void 0===t&&(t=4),this.strength=t,this._action=null,this._glRender=new h}e(n,"laya.filters.BlurFilter",_);var i=n.prototype;i.getStrenth_sig2_2sig2_native=function(){this.strength_sig2_native||(this.strength_sig2_native=new Float32Array(4));var t=this.strength/3,n=t*t;return this.strength_sig2_native[0]=this.strength,this.strength_sig2_native[1]=n,this.strength_sig2_native[2]=2*n,this.strength_sig2_native[3]=1/(2*Math.PI*n),this.strength_sig2_native},s(0,i,"type",function(){return 16})})(),function(t){function n(t,i,r,e){this._sv_blurInfo2=[0,0,1,0],this._color=null,this._color_native=null,this._blurInof1_native=null,this._blurInof2_native=null,n.__super.call(this),this._elements=new Float32Array(9),this._sv_blurInfo1=new Array(4),void 0===i&&(i=4),void 0===r&&(r=6),void 0===e&&(e=6),this._color=new o(t),this.blur=Math.min(i,20),this.offX=r,this.offY=e,this._sv_blurInfo1[0]=this._sv_blurInfo1[1]=this.blur,this._sv_blurInfo1[2]=r,this._sv_blurInfo1[3]=-e,this._glRender=new u}e(n,"laya.filters.GlowFilter",_);var i=n.prototype;i.getColor=function(){return this._color.arrColor},i.getColorNative=function(){this._color_native||(this._color_native=new Float32Array(4));var t=this.getColor();return this._color_native[0]=t[0],this._color_native[1]=t[1],this._color_native[2]=t[2],this._color_native[3]=t[3],this._color_native},i.getBlurInfo1Native=function(){return this._blurInof1_native||(this._blurInof1_native=new Float32Array(4)),this._blurInof1_native[0]=this._blurInof1_native[1]=this.blur,this._blurInof1_native[2]=this.offX,this._blurInof1_native[3]=this.offY,this._blurInof1_native},i.getBlurInfo2Native=function(){return this._blurInof2_native||(this._blurInof2_native=new Float32Array(4)),this._blurInof2_native[2]=1,this._blurInof2_native},s(0,i,"type",function(){return 8}),s(0,i,"offY",function(){return this._elements[6]},function(t){this._elements[6]=t,this._sv_blurInfo1[3]=-t}),s(0,i,"offX",function(){return this._elements[5]},function(t){this._elements[5]=t,this._sv_blurInfo1[2]=t}),s(0,i,"blur",function(){return this._elements[4]},function(t){this._elements[4]=t,this._sv_blurInfo1[0]=this._sv_blurInfo1[1]=t})}()}(window,document,Laya);