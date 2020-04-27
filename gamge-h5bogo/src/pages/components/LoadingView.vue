<template>
    <div class="loaderstyle loader"  v-show="showLoading">
        <div></div>
        <div></div>
        <div></div>
    </div>
</template>

<script>
	export default {
		name: "LoadingView",
		props: ["showLoading"]
	}
</script>

<style scoped>
    .loader {
        position: absolute;
        top: 35%;
        width: 200px;
        height: 200px;
        display: -webkit-flex;/*safari弹性布局*/
        justify-content: center;
        display: flex;
        align-content: center;
    }
    @-webkit-keyframes loaderstyle {
        0% {
            -webkit-transform: scale(1);
            opacity: 1;
        }
        45% {
            -webkit-transform: scale(0.1);
            opacity: 0.7;
        }
        80% {
            -webkit-transform: scale(1);
            opacity: 1;
        }
    }
    .loaderstyle div {
        width: 15px;
        height: 15px;
        background: #fff;
        border-radius: 50%;
        float: left;
        display: inline-block;
        margin: 2px;
    }
    .loaderstyle div:nth-child(1) {
        -webkit-animation: loaderstyle 0.75s -0.12s ease infinite;
    }
    .loaderstyle div:nth-child(2) {
        -webkit-animation: loaderstyle 0.75s -0.24s ease infinite;
    }
    .loaderstyle div:nth-child(3) {
        -webkit-animation: loaderstyle 0.75s 0s ease infinite;
    }
    .loaderstyle div {
        width: 15px;
        height: 15px;
        background: #fff;
        border-radius: 50%;
        float: left;
        display: inline-block;
        margin: 2px;
    }

</style>
