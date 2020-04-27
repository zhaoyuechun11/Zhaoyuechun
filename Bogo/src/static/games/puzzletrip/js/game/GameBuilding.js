gc.GameBuilding = function(){
    PIXI.Container.call(this);

    this.buildingArray = ['123','korea_building_0001','korea_building_0002',                                    //���� ������ �� ���κ� �����̴� �ǹ�
        'china_building_0001','china_building_0002',
        'egypt_building_0001','egypt_building_0002',
        'greece_building_0001','greece_building_0002',
        'france_building_0001','france_building_0002',
        'brazil_building_0001','brazil_building_0002',
        'america_building_0001','america_building_0002'];
    this.moveTime = 1000;                                               //�ǹ� �����̴� �ӵ�
    this.Interval = null;                                               //Ÿ�̸�
    this.buildingTween1 = null;                                         //�ǹ� ���� tween
    this.buildingTween2 = null;
    this.isMoving = false;

    this.building1 = PIXI.Sprite.fromFrame(this.buildingArray[1]+".png");               //�ǹ� 1
    this.building1.anchor.set(0.5,1);
    this.building1.y = this.building1.height+GD.height*0.132;
    this.building1.x = GD.width/2;
    this.building1.rotation = Math.PI*0.268;
    this.addChild(this.building1);

    this.building2 = PIXI.Sprite.fromFrame(this.buildingArray[1]+".png");               //�ǹ� 2
    this.building2.anchor.set(0.5,1);
    this.building2.y = this.building2.height+GD.height*0.132;
    this.building2.x = GD.width/2;
    this.building2.rotation = 0;
    this.addChild(this.building2);

};

gc.GameBuilding.constructor = gc.GameBuilding;
gc.GameBuilding.prototype = Object.create(PIXI.Container.prototype);
//�ǹ� ����Ʈ ����
gc.GameBuilding.prototype.startMove = function(){
    this.isMoving = true;
    this.resetRotation();
    this.Interval = setInterval((function () {
        this.resetRotation();
    }).bind(this),this.moveTime);
};

gc.GameBuilding.prototype.setBuildingRotation = function () {
    this.building1.rotation = Math.PI*0.268;
    this.building2.rotation = 0;
}

//�ǹ� �̹��� ü����
gc.GameBuilding.prototype.resetBudingTexture = function (num) {
    this.building1.texture = new PIXI.Texture.fromFrame(this.buildingArray[num]+".png");
    this.building2.texture = new PIXI.Texture.fromFrame(this.buildingArray[num]+".png");
}
//�ǹ� ���� ����
gc.GameBuilding.prototype.resetRotation = function () {
    if(this.buildingTween1 != null){
        this.buildingTween1.kill(false);
        this.buildingTween2.kill(false);
    }

    if(this.building1.rotation <= -Math.PI*0.26){
        this.building1.rotation = this.building2.rotation + Math.PI*0.268;
    }

    if(this.building2.rotation <= -Math.PI*0.26){
        this.building2.rotation = this.building1.rotation + Math.PI*0.268;
    }
    var buildingRotation1 = this.building1.rotation;
    var buildingRotation2 = this.building2.rotation;
    buildingRotation1 -= Math.PI*0.01;
    buildingRotation2 -= Math.PI*0.01;

    this.buildingTween1 = TweenMax.to(this.building1,(this.moveTime-10)/1000,{rotation:buildingRotation1,ease:Linear.easeNone});
    this.buildingTween2 = TweenMax.to(this.building2,(this.moveTime-10)/1000,{rotation:buildingRotation2,ease:Linear.easeNone});

}
//�ǹ� �����̴� �ð� ����
gc.GameBuilding.prototype.resetTime = function (time) {
    //this.moveTime = time;
    if(time <= 100){
        time = 100;
    }
    this.moveTime = time;

}
//�ǹ� ���ϸ��̼� ����
gc.GameBuilding.prototype.stopInterval = function () {
    this.isMoving = false;
    if(this.buildingTween1 != null && this.buildingTween2 != null) {
        this.buildingTween1.kill(false);
        this.buildingTween2.kill(false);
    }
    clearInterval(this.Interval);
}

gc.GameBuilding.prototype.updateTransform = function() {

    PIXI.Container.prototype.updateTransform.call(this);
};