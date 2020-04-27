<template lang="html">
 <div class="loadMoudle" @touchstart="touchStart($event)" @touchmove="touchMove($event)" :style="{transform: 'translate3d(0,' + top + 'px, 0)'}">
  <slot></slot>
  <footer class="load-more">
   <slot name="load-more">
    <div class="moreData-tip" v-if="pullUpState==1">
     <span class="moreData-tip-text">{{pullUpStateText.moreDataTxt}}</span>
    </div>
    <div class="loadingMoreData-tip" v-if="pullUpState==2">
     <span class="icon-loading"></span>
     <span class="loadingMoreData-tip-text">{{pullUpStateText.loadingMoreDataTxt}}</span>
    </div>
    <div class="noMoreData-tip" v-if="pullUpState==3">
     <span class="connectingLine"></span>
     <span class="noMoreData-tip-text">{{pullUpStateText.noMoreDataTxt}}</span>
     <span class="connectingLine"></span>
    </div>
   </slot>
  </footer>
 </div>
</template>
 
<script>
export default {
 props: {
  parentPullUpState: {
   default: 0
  },
  onInfiniteLoad: {
   type: Function,
   require: false
  }
 },
 data () {
  return {
   top: 0,
   startY: 0,
   pullUpState: 0, // 1:上拉加载更多, 2:加载中……, 3:我是有底线的
   isLoading: false, // 是否正在加载
   pullUpStateText: {
    moreDataTxt: '上拉加载更多',
    loadingMoreDataTxt: '加载中...',
    noMoreDataTxt: '我是有底线的'
   }
  }
 },
 methods: {
  touchStart (e) {
   this.startY = e.targetTouches[0].pageY
  },
  touchMove (e) {
   if (e.targetTouches[0].pageY < this.startY) { // 上拉
    this.judgeScrollBarToTheEnd()
   }
  },
 
  // 判断滚动条是否到底
  judgeScrollBarToTheEnd () {
   let innerHeight = document.querySelector('.loadMoudle').clientHeight
   // 变量scrollTop是滚动条滚动时，距离顶部的距离
   let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
   // 变量scrollHeight是滚动条的总高度
   let scrollHeight = document.documentElement.clientHeight || document.body.scrollHeight
   // 滚动条到底部的条件
   if (scrollTop + scrollHeight >= innerHeight) {
    if (this.pullUpState !== 3 && !this.isLoading) {
     this.pullUpState = 1
     this.infiniteLoad()
     // setTimeout(() => {
     //  this.infiniteLoad()
     // }, 200)
    }
   }
  },
 
  infiniteLoad () {
   this.pullUpState = 2
   this.isLoading = true
   setTimeout(() => {
    this.onInfiniteLoad(this.infiniteLoadDone)
   }, 800)
  },
  infiniteLoadDone () {
   this.pullUpState = 0
   this.isLoading = false
  }
 },
 watch: {
  parentPullUpState (curVal, oldVal) {
   this.pullUpState = curVal
  }
 }
}
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.load-more {
 width: 100%;
 color: #c0c0c0;
 background: #f7f7f7;
}
.moreData-tip,
.loadingMoreData-tip,
.noMoreData-tip {
 display: flex;
 align-items: center;
 justify-content: center;
 height: 150px;
}
.loadMoudle .icon-loading {
 display: inline-flex;
 width: 35px;
 height: 35px;
 /* background: url(../../assets/images/refreshAndReload/loading.png) no-repeat; */
 background-size: cover;
 margin-right: 5px;
 animation: rotating 2s linear infinite;
}
@keyframes rotating {
 0% {
  transform: rotate(0deg);
 }
 100% {
  transform: rotate(1turn);
 }
}
.connectingLine {
 display: inline-flex;
 width: 150px;
 height: 2px;
 background: #ddd;
 margin-left: 20px;
 margin-right: 20px;
}
</style>