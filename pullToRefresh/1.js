(function(){
  var ele=document.getElementById('ul'),

title=document.getElementById('title'),

footer=document.getElementById('footer'),

touchStart=0,

touchMove=0;

var num=15;

var isRef='';

var foisRef='';

ele.addEventListener('touchstart',function(e){

touchStart=Math.floor(e.touches[0].pageY);

ele.style.position = 'relative';

ele.style.transition='transform 0s';

// console.log(touchStart)

},false)

ele.addEventListener('touchmove',function(e){

touchMove=Math.floor(e.touches[0].pageY)-touchStart;

// 上拉控制

if(touchMove<=0&&touchMove>-200){

  if(touchMove<-60){

  foisRef=true;

  }

// console.log(touchMove)

 ele.style.transform='translateY('+touchMove+'px)';

  if(touchMove<-60){

  footer.innerText='释放加载。。。。'

  }

}

// 下拉控制

if(touchMove>0&&touchMove<150){

  if(touchMove>50){

    isRef=true;

  }

   title.innerText='下拉刷新'

  ele.style.transform='translateY('+touchMove+'px)';

  if(touchMove>100){

  title.innerText='释放刷新'

  }

}

},false)

ele.addEventListener('touchend',function(e){

ele.style.transition='transform 0.5s ease 1s';

ele.style.transform='translateY(0)';

if(isRef){

title.innerText='更新中。。。。';

}else if(foisRef){

footer.innerText='更新中........'

}

setTimeout(function(){

// 下拉控制

if(isRef){

for(let i=0,len=3;i<len;i++){

$('#ul').prepend('<li>第'+num+'</li>')

num++

}

showTip().show

showTip().hide

}

// 上拉控制

if(foisRef){

for(let i=0,len=3;i<len;i++){

$('#ul').append('<li>第'+num+'行</li>')

num++

}

footer.innerText='上拉加载更多';

showTip().show

showTip().hide

}

foisRef=false;

isRef=false;

},2000)

},false)

var showTip=()=>{

var obj={

show:$('#msg').animate({opacity:'1'},2000)

.html('为您加载<i>&nbsp3&nbsp</i>条内容'),

// console.log($('#msg'))

hide:setTimeout(() => {

$('#msg').animate({opacity:'0'},'slow');

}, 1000)

}

return obj

}



})()

