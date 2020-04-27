<template>
  <div class="page-content pull-to-refresh-content">
    <div class="pull-to-refresh-layer">
      <div class="preloader"></div>
      <div class="pull-to-refresh-arrow"></div>
    </div>
    <div class="list-block media-list">
      <ul>
        <li class="item-content">
          <div class="item-media">
            <img src="http://hhhhold.com/88/d/jpg?1" width="44" />
          </div>
          <div class="item-inner">
            <div class="item-title-row">
              <div class="item-title">Yellow Submarine</div>
            </div>
            <div class="item-subtitle">Beatles</div>
          </div>
        </li>...
      </ul>
      <div class="list-block-label">
        <p>Just pull page down to let the magic happen.</p>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    var myApp = new Framework7();

    var $$ = Dom7;

    // 随意编造的内容
    var songs = [
      "Yellow Submarine",
      "Don't Stop Me Now",
      "Billie Jean",
      "Californication"
    ];
    var authors = [
      "Beatles",
      "Queen",
      "Michael Jackson",
      "Red Hot Chili Peppers"
    ];

    // 下拉刷新页面
    var ptrContent = $$(".pull-to-refresh-content");

    // 添加'refresh'监听器
    ptrContent.on("refresh", function(e) {
      // 模拟2s的加载过程
      setTimeout(function() {
        // 随机图片
        var picURL =
          "http://hhhhold.com/88/d/jpg?" + Math.round(Math.random() * 100);
        // 随机音乐
        var song = songs[Math.floor(Math.random() * songs.length)];
        // 随机作者
        var author = authors[Math.floor(Math.random() * authors.length)];
        // 列表元素的HTML字符串
        var itemHTML =
          '<li class="item-content">' +
          '<div class="item-media"><img src="' +
          picURL +
          '" width="44"/></div>' +
          '<div class="item-inner">' +
          '<div class="item-title-row">' +
          '<div class="item-title">' +
          song +
          "</div>" +
          "</div>" +
          '<div class="item-subtitle">' +
          author +
          "</div>" +
          "</div>" +
          "</li>";
        // 前插新列表元素
        ptrContent.find("ul").prepend(itemHTML);
        // 加载完毕需要重置
        myApp.pullToRefreshDone();
      }, 2000);
    });
  }
};
</script>

