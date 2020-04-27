kStage = function(x, y, callback)
{
	var bg = SpriteLoad(sStageSelect, "StageSelect/btn_stage.png", x, y);
    bg.interactive = true;
    bg.on('mousedown', callback);
    bg.on('touchstart', callback);
	
	var sStar = new PIXI.Container();
    var sprStar = [];
    var sprFullCombo;

	//SpriteLoad(sStar, "star_2.png", -24, 17);
	//SpriteLoad(sStar, "star_2.png", 0, 23);
	//SpriteLoad(sStar, "star_2.png", 24, 17);

    sprStar.push(SpriteLoad(sStar, "inGame/time_star_1.png", -33, 36));
    sprStar.push(SpriteLoad(sStar, "inGame/time_star_1.png", 0, 36));
    sprStar.push(SpriteLoad(sStar, "inGame/time_star_1.png", 33, 36));
//    sprStar.push(SpriteLoad(sStar, "StageSelect/combo-icon_s.png", 34, -72));
    sprFullCombo = SpriteLoad(sStar, "StageSelect/combo-icon_s.png", 34, -72);

    var txtStage = new PIXI.Text("0", {font:'50px ' + tbTTF[lang], fill:'#ffffff',
		stroke:'#7d0000',strokeThickness:5,
		dropShadow:true, dropShadowColor:'#7d0000', dropShadowDistance:4});

    txtStage.anchor.set(0.5);
    txtStage.position.x = 0;
    txtStage.position.y = -22;
    sStar.addChild(txtStage);

    var sLock = new PIXI.spine.Spine(pixiRes.lock_eff.spineData);
    sLock.state.addListener({
		event:function(entry,event){
			//console.log(event);
		},
		complete:function (entry) {
			switch(entry.trackIndex){
				case 1: // idle
					break;
				case 2:
                    sLock.state.clearTracks();
					sLock.visible = false;
                    bg.texture = PIXI.Texture.fromImage("StageSelect/btn_stage.png");
                    txtStage.visible = true;

                    if(bIsNextStageButtonClicked) {
                        ShowPopup(true, POPUP_TYPE.GAME_START);
                        bIsNextStageButtonClicked = false;
                    }
					break;
			}
        }
	});
/*
    sLock.state.addListener({
        event:function(entry,event){
            switch(entry.trackIndex){
                case 1:
                    sStar.visible = true;
                    sStar.alpha = 0;

                    txtStage.text = kData.clearStage.length.toString();
                    for(var i=0;i<3;++i)
                        sprStar[i].visible = false;

                    TweenPlay(sStar, 1, 0, null, {alpha: 1}, false, PIXI.tween.Easing.outQuad());
                    //SpinePlay(sLock, null, null, "lock_eff", 1, false);
                    break;
            }
        },
        complete:function(entry){
            switch(entry.trackIndex){
                case 1: // 이팩트 진행 후에...
                    //SpinePlay(sLock, null, null, "lock_eff", 1, false);
                    SpinePlay(sLock, null, null, "lock_eff_loop", 0, true);
                    break;
            }
        }
	});*/

	/* lib 교체 후 spine 관련 변경
	 sLock.state.onEvent = function(trackIndex, event)
	 {
		 switch(trackIndex)
		 {
			 case 1: // 이펙트 진행후에..
			 sStar.visible = true;
			 sStar.alpha = 0;

			 txtStage.text = kData.clearStage.length.toString();
			 for(var i=0;i<3;++i)
			 sprStar[i].visible = false;

			 TweenPlay(sStar, 1, 0, null, {alpha: 1}, false, PIXI.tween.Easing.outQuad());
			 break;
		 }
	 }
	 sLock.state.onComplete = function(trackIndex, count)
	{
		 switch(trackIndex)
		 {
			 case 1: // 이펙트 진행후에..
			 SpinePlay(sLock, null, null, "lock_eff_loop", 0, true);
			 break;
		 }
	}
	 */

    bg.addChild(sStar);
    bg.addChild(sLock);
	
	this.Show = function(stageNum, starCnt)
	{
		if(stageNum >= 0)
		{
			if(starCnt > 0)
			{
				sStar.visible = true;
				//sLock.visible = false;

				txtStage.text = (stageNum + 1).toString();

				for(var i=0, imax = sprStar.length;i<imax;++i)
				{
					sprStar[i].visible = false;
					if(starCnt > i)
						sprStar[i].visible = true;
				}

				if(kData.clearFullCombStage[stageNum] >= 1)
					sprFullCombo.visible = true;
				else
                    sprFullCombo.visible = false;

                sLock.visible = false;
                bg.texture = PIXI.Texture.fromImage("StageSelect/btn_stage.png");
			}
			else if(starCnt == 0)
			{
				sStar.visible = true;
				//sLock.visible = false;
				txtStage.text = (stageNum + 1).toString();

				for(var i=0,imax = sprStar.length;i<imax;++i)
				{
					sprStar[i].visible = false;
					if(starCnt > i)
						sprStar[i].visible = true;
				}

                if(kData.clearFullCombStage[stageNum] >= 1)
                    sprFullCombo.visible = true;
                else
                    sprFullCombo.visible = false;

                //SpinePlay(sLock, null, null, "lock_eff", 2, false);
                bg.texture = PIXI.Texture.fromImage("StageSelect/btn_stage.png");
				//SpinePlay(sLock, null, null, "lock_eff_loop", 0, true);
			}
			else
			{
				sStar.visible = true;
                sLock.visible = true;
                txtStage.visible = false;
				SESoundPlay(SE_OPEN_STAGE);

                txtStage.text = (stageNum + 1).toString();
                for(var i=0, imax = sprStar.length;i<imax;++i)
                    sprStar[i].visible = false;
				sprFullCombo.visible = false;

                bg.texture = PIXI.Texture.fromImage("StageSelect/btn_stage_empty.png");
                // console.log('state : ' + state);
                // console.log('gameState : ' + gameState);

                sLock.state.clearTracks();
                SpinePlay(sLock, null, null, "lock_eff", 2, true);

                kData.clearStage[kData.clearStage.length-1] = 0;
                kData.clearFullCombStage[kData.clearFullCombStage.length-1] = 0;

				networkManager.ForcedSaveData();
			}
		}
		else
		{
			sLock.visible = true;
            bg.texture = PIXI.Texture.fromImage("StageSelect/btn_stage_empty.png");
			sStar.visible = false;
			SpinePlay(sLock, 0, 0, "lock_idle",1,false);
		}
	}
}