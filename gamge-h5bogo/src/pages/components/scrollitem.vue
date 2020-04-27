<template>
  <div class="scroll-item">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "scrollitem",
    data() {
      return {
        isIn: true,
        lastTimeStamp:0,
      }
    },

    methods : {
      addEventListener()
      {
        let _this = this;
        let posTopY = _this.$el.getBoundingClientRect().top;
        let posButtomY = _this.$el.getBoundingClientRect().bottom;

        let height = window.screen.height;
        if ( posTopY <= height && posButtomY > 0 )
        {
          this.isIn = true;
        }

        let offset = height / 2;

        window.addEventListener('scroll', function (e) {

          let posTop = _this.$el.getBoundingClientRect().top;
          let posButtom = _this.$el.getBoundingClientRect().bottom;
          if (posTop <= (height + offset) && posButtom > -offset) {
            if (_this.isIn == false ) {
              _this.$el.animate([
                {
                  'transform':'scale(0.6, 0.5)',
                  '-webkit-transform':'scale(0.6,0.5)'
                },
                {
                  'transform':'scale(1.0, 1.0)',
                  '-webkit-transform':'scale(0.6,0.5)'
                },
              ],{
                duration:250
              });
              _this.isIn = true;
            }
          } else {
            _this.$el.animate([
              {
                'transform':'scale(1.0, 1.0)',
                '-webkit-transform':'scale(1.0,1.0)'
              },
              {
                'transform':'scale(0.6, 0.5)',
                '-webkit-transform':'scale(0.6,0.5)'
              }
            ], {
              duration:250
            });
            _this.isIn = false;
          }
        }, true);
      }
    },

    mounted : function () {
      //this.addEventListener();
    }
  }
</script>

