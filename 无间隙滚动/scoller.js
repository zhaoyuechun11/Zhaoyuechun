function Scroll(options){
  this.el = document.getElementById(options.el);
  this.ul = this.el.getElementsByTagName("ul")[0];
  this.li = this.ul.getElementsByTagName("li");
  this.direction = options.direction;
  this.speed = options.speed;
  this.index = 0;
  this.init();
}


Scroll.prototype = {
  init:function(){
    // 效果的开始
    this.li_num = this.li.length;
    this.el.style.overflow = 'hidden';
    if(this.direction == "x"){
      //  设置宽
      this.change("width","marginLeft");
    }else if(this.direction == "y"){
      //  设置高
      this.change("height","marginTop");
    }

  },
  change:function(attr1,attr2){
    var _this = this;
     // 定时器内容
     this.li_attr = parseInt(this.getAttr(attr1));
     this.ul.style[attr1] = this.li_num * this.li_attr + "px";

     setInterval(function() {
       // body...
       _this.index--;
       _this.ul.style[attr2] = _this.index + "px";
       if( Math.abs(_this.index) >= _this.li_attr ){
         _this.ul.appendChild(_this.ul.firstElementChild);
         _this.ul.style[attr2] = "0px";
         _this.index = 0;
       }
     }, _this.speed);

  },

  getAttr:function(attr){
     // 获取样式值的
     if (this.li[0].currentStyle) {
       return  this.li[0].currentStyle[attr]
     }else{
       return getComputedStyle(this.li[0],null)[attr]
     }
  }

};

new Scroll({
  el: "box1",
  direction: "x",
  speed: 50,
})


new Scroll({
  el: "box2",
  direction: "y",
  speed: 30,
})