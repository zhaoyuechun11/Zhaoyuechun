/*
 * Globally accessible object with useful functions.
 */
Utilities = function() {};

Utilities.prototype = {
    lerp: function (v0, v1, t) {
        return v0 + (v1 - v0) * t;
    },

    clamp: function (min, max, val) {
        if (val < min) return min;
        else if (val > max) return max;
        return val;
    },

    zeroVelocity: function (sprite) {
        sprite.body.velocity.setTo(0, 0);
    },
    normalmaxVelocity: function (sprite) {
        if(sprite.name[0]!="m"
        && sprite.name[1]!="y") {
            sprite.body.velocity.setTo(0, cars_velocity_max);
        }
    },
    reverseVelocity: function (sprite) {
        //var isPlayer =  sprite.name[0]=='m' && sprite.name[1]=='y' && sprite.name[2]=='_';
        //if(isPlayer) return;
        if (!sprite.isPlayerVehicle) {
            var x = sprite.body.velocity.x;
            var y = sprite.body.velocity.y;
            sprite.body.velocity.setTo(x, y * -1);
        }
    },
    setVelocity: function (sprite) //적자동차 이동
    {
        if (!sprite.isPlayerVehicle)
            sprite.body.velocity.y = cars_velocity;
    },
    setVelocityBG: function (sprite) //부스터 이동
    {
        //sprite.body.velocity.y = cars_velocity*0.07;
        sprite.y += cars_velocity * uigame.state.states.game.bgController.bias_v;
        if (sprite.y > 1280 + sprite.height) sprite.kill();
    },


// var arSprCar = [
//     "enemy_car_small_4.png",   //0 //car_buggys
//     "enemy_car_small_5.png",   //1"enemy_car_small_3.png",   //1
//     "enemy_car_small_2.png",   //2
//     "enemy_car_small_1.png",   //3
//     "xcar1_middle_3_1.png",//"enemy_car_middle_3.png",  //4 //car_Humvees //프레임추가
//     "xcar2_middle_4_1.png",//"enemy_car_middle_2.png",  //5
//     "xcar3_middle_5_1.png",//"enemy_car_middle_1.png",  //6
//     "enemy_car_big_1.png",     //7 //car_trucks
//     "enemy_car_big_3.png"      //8"enemy_car_big_2.png"      //8
// ];
// var xcarFrm = [
//     ["xcar1_middle_3_1.png","xcar1_middle_3_2.png"],
//     ["xcar2_middle_4_1.png","xcar2_middle_4_2.png"],
//     ["xcar3_middle_5_1.png","xcar3_middle_5_2.png"]
// ];

    // setTextureAni: function (sprite){//텍스쳐애니1개
    //     // if(sprite.name[0]=="m" && sprite.name[1]=="y"){
    //     //     if(dm)console.log("sprite not changed texture: ");
    //     //     return;
    //     // }
    //     if(sprite.name[0]=="x" && sprite.name[1]=="c"){
    //
    //         // if(true) {
    //         //     if(dm)console.log("sprite changed texture: ");
    //         //     return;
    //         // }
    //         // //
    //         // sprite.namefrm=0;
    //         // sprite.namepic=0;
    //         // sprite.frm=0;
    //         // sprite.frmmax=0;
    //         // //
    //         if(sprite.frm>=sprite.frmmax-1){
    //             sprite.frm=0;
    //         }else{
    //             sprite.frm+=1;
    //         }
    //         var caridx =  Number(sprite.name[4]-1);
    //         var frmidx =  sprite.frm;
    //         var name = xcarFrm[caridx][frmidx];
    //         sprite.loadTexture('game_a',
    //             name
    //         );
    //         if(dm) console.log("sprite.name:"+"xcar1_middle_4_2.png");
    //     }
    //
    // },
    // setForEachTexutrAni: function () {//텍스쳐애니전체차들
    //     uigame.state.states.game.massiveController.vehicles.forEachAlive( this.utilities.setTextureAni, null);
    //
    // },


    // this.vehicles.forEachAlive( this.utilities.setVelocity, //적자동차 이동
    // null
    // );


    updateFxNormal: function () {
        // if(dm) console.log("--updateFxNormal--");
        // if(cars_velocity==0
        //     ||mistaking) {
        //     if(this.attachedVehicle.fxnormal.visible) this.attachedVehicle.fxnormal.visible=false;
        //     return;
        // }
        // if(this.attachedVehicle==null) return;
        // if(cars_velocity<cars_velocity_min){//속도0상태
        //     this.attachedVehicle.fxnormal.visible=false;
        // }else if(cars_velocity==cars_velocity_booster){ //부스터속도상태에서 노말이펙트 끄기
        //     this.attachedVehicle.fxnormal.visible=false;
        // }else{ //노말속도상태
        //     if(this.attachedVehicle.fxnormal.visible)
        //         this.attachedVehicle.fxnormal.visible=false;
        //     else
        //         this.attachedVehicle.fxnormal.visible=true;
        // }

    },


    setKill: function(sprite)
    {
        if(sprite.name[0]!='m'
            && sprite.name[1]!='y'
            && sprite.name[2]!='_')
        {
            sprite.kill();
        }
    },
    getLaneWhat: function (xp) {
	    //확율1/3으로 벗어나게
        var rand = uigame.rnd.integerInRange(0, 2);
        if(rand==0) return uigame.rnd.integerInRange(0, 2);
        //확율1/3으로 벗어나게

        var xbegin = 178;
        var xgrid1 = 122;

        if(xp < xbegin+(xgrid1*0.5) + (xgrid1*0)) return 0;
        else if(xp < xbegin+(xgrid1*0.5)+ (xgrid1*1)) return 1;
        else if(xp < xbegin+(xgrid1*0.5)+ (xgrid1*2)) return 2;
        else if(xp < xbegin+(xgrid1*0.5)+ (xgrid1*3)) return 3;
    },
    updateSide4: function () {
        if(alonemode){ //부스터 총량이 많으면 등수반전-->승리
            if(boostSumTimer>45) {
                if (net_yourname != net_userall[0]) swapArrayElements(net_userall, 0, 1);
            }
        }
        uigame.state.states.game.uiController.side4.onSwapRankSide4();//랭킹업데이트

        //사용자가 1명일때 메뉴 사라지게
        if(net_userall[1]==undefined) {
            item3btn[0].visible = false;
            item3btn[1].visible = false;
            item3btn[2].visible = false;
        }
    },

    updateTx20Sec: function () {
        //인게임 ~ 랭킹결과창 나오는 사이 업데이트
        if(mode20sec && timer20sec<11) { //예전<6초였음 //경기종료 신호
            //5초 적게 출력해서  5~0으로 보여주고, 0일때 경기 결과창으로 이동
            //나의 점수만 환산하는 코너
            if(uigame.state.states.game.uiController.tx20sec.visible===false) {
                if(0 != net_userall.indexOf(net_yourname)) {
                    uigame.state.states.game.uiController.tx20sec.visible = true;
                }
            }
            uigame.state.states.game.uiController.tx20sec.text = "TIME: " + float2int(timer20sec-6 > 0 ? timer20sec-6 : 0);
            //한번만 실행
            if (timer20sec-5 < 0) {
                //uigame.state.states.game.uiController.tx20sec.text.tint = ColorSet.yellow;
                // //게임진행중에 결과창으로나가는 조건
                // var myrankidx = net_userall.indexOf(net_yourname);//등수알기
                // var addMD = myrankidx===0?4
                //     :myrankidx===1?3
                //     :myrankidx===2?2
                //     :1;
                // var decMd=0; //메달
                // decMd+= net_userall[3]===undefined?-1:0;
                // decMd+= net_userall[2]===undefined?-1:0;
                // decMd+= net_userall[1]===undefined?-1:0;
                //
                // //메달저장
                // var v = addMD+decMd;
                // kData.WinCnt = (kData.WinCnt + (addMD+decMd));
                // kData.DayMedal = (kData.DayMedal + (addMD+decMd));
                // kData.CumulMedal = (kData.CumulMedal + (addMD+decMd));
                // networkManager.ForcedSaveData();
                //
                // if (!dm) console.log("save Medal-- win:" + kData.WinCnt + ", dayMd:" + kData.DayMedal + ", allMd:" + kData.CumulMedal);
                // //메달저장--end


                uimode = uimodeset.result;//게임중 강제로 결과창 나오게 하려고
                //대기시간 기본 5초, 내랭킹기준으로 차등
                //var myrankidx = net_userallfin.indexOf(net_yourname);
                //uigame.state.states.game.uiController.uiresult.onRefreshResult();
                //uigame.state.states.game.uiController.uiresult.visible = true;
                this.game.state.start('menu');


            }

            // if (timer20sec < 0) {
            //     //강제나가기
            //     mode20sec=false; //종료타이머 tx업데이트가 0이되면
            //     if (matchmode) {
            //         socket.emit('leaveRoom'); //타이머가 0
            //     }
            //
            //     uimode = uimodeset.select;
            //     uigame.state.game.state.start('menu');
            //     //강제나가기
            // }
        }

    }
};