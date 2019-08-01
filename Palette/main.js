(function(){
  var bts = document.querySelectorAll('#Palette > .content > .btt'), selectPalette = 2, selectBubble = null, isPickerBubble = false, memoryColorSelect = [0, 196, 180];

  var can = document.querySelectorAll('#Palette > .content > canvas');

  var CW = new ColorWheel(can[0]);
  CW.ondrag = function(e){
    if(selectPalette != 1){return;}
    memoryColorSelect = e.rgb;
    updateColorSelect();
  }

  var PP = new PlayfulPalette(can[1]);
  PP.addPaint([204, 0, 255]).move(106, 175).ray(70);
  PP.addPaint([255, 221, 0]).move(65, 143).ray(70);
  PP.addPaint([0, 136, 255]).move(82, 85).ray(70);
  PP.addPaint([0, 255, 106]).move(136, 60).ray(70);

  var updateColorSelect = function(){
    var div = document.getElementById("GetColor"), c = memoryColorSelect;
    div.innerHTML = "RGB("+c[0]+", "+c[1]+", "+c[2]+")";
    div.style.backgroundColor = "rgb("+c[0]+", "+c[1]+", "+c[2]+")";
    var grey = (c[0]+c[1]+c[2])/3;
    if(grey <= 127){
      div.style.color = "rgba(236,239,241,1)";
    }else{
      div.style.color = "rgba(38,50,56,1)";
    }
  }

  CW.setRGB(memoryColorSelect[0], memoryColorSelect[1], memoryColorSelect[2]);
  updateColorSelect();

  var update = function(){
    for(var i=0; i<bts.length; i++){bts[i].setAttribute("type", ""); bts[i].style.backgroundColor = "";}
    if(selectPalette == 1 || selectPalette == 3){
      can[0].style.display = "block"; can[1].style.display = "none";
    }else{
      can[0].style.display = "none"; can[1].style.display = "block";
    }

    if(isPickerBubble != false && selectPalette != 2){isPickerBubble = false;}

    if(selectPalette == 1){
      bts[0].setAttribute("type", "paletteBubble");
      var c = memoryColorSelect;
      CW.setRGB(c[0], c[1], c[2]);
    }else if(selectPalette == 2){
      bts[0].setAttribute("type", "colorWheel");
      bts[2].setAttribute("type", isPickerBubble == false ? "picker" : "pickerActive");
      //bts[3].setAttribute("type", "moveBubble");

    }else if(selectPalette == 3){
      bts[2].setAttribute("type", "confirm");
      bts[3].setAttribute("type", "cancel");
    }else if(selectPalette == 4){
      bts[0].setAttribute("type", "delete");
      bts[2].setAttribute("type", "confirm");
      bts[3].setAttribute("type", "setColors");
      bts[3].style.backgroundColor = "rgb("+selectBubble.color[0]+", "+selectBubble.color[1]+", "+selectBubble.color[2]+")";
      bts[4].setAttribute("type", "plusZoom");
      bts[5].setAttribute("type", "minusZoom");
    }
  }

  var selectNewbubble = {x: 0, y: 0};

  can[1].objSelect = null;
  can[1].isMove = false;

  can[1].onmousemove = function(e){
    if(isPickerBubble){
      PP.movePickerIdentifier(true, e.offsetX, e.offsetY);
      return;
    }

    if(!this.isMove || this.objSelect == null){return;}

    var d = dist(e.offsetX, e.offsetY, PP.r, PP.r);
    if(this.isMove){
      if(d > PP.r){
        var ang = 180+Angle.pointsToDeg(e.offsetX, e.offsetY, PP.r, PP.r), p = Angle.findNewPoint(PP.r, PP.r, ang, PP.r);
        this.objSelect.move(p.x, p.y);
      }else{
        this.objSelect.move(e.offsetX, e.offsetY);
      }
    }
    PP.update();
  }

  can[1].onmousedown = function(e){
    if(dist(e.offsetX, e.offsetY, PP.r, PP.r) > PP.r){return;}
    if(isPickerBubble != false){
      var c = PP.getPicker(e.offsetX, e.offsetY);
      CW.setRGB(c[0], c[1], c[2]);
      memoryColorSelect = c;
      updateColorSelect();
      isPickerBubble = false; 
      PP.movePickerIdentifier(false);
      update();
    }
    this.objSelect = PP.selectPaint(e.offsetX, e.offsetY);
    this.isMove = true;
  }

  can[1].onmouseup = function(){this.objSelect = null; this.isMove = false;}
  can[1].onmouseout = function(){this.objSelect = null; this.isMove = false;}

  can[1].ondblclick = function(e){
    if(dist(e.offsetX, e.offsetY, PP.r, PP.r) > PP.r){return;}
    selectBubble = null;
    var checkBubble = PP.selectPaint(e.offsetX, e.offsetY);
    if(checkBubble != null){
      selectPalette = 4;
      selectBubble = checkBubble;
    }else{
      selectNewbubble.x = e.offsetX;
      selectNewbubble.y = e.offsetY;
      selectPalette = 3;
    }
    update();
  }

  bts[0].onmousedown = function(){
    if(selectPalette == 4){
      PP.paints.remove(selectBubble.key);
      PP.update();
      selectPalette = 2;
    }else{
      selectPalette = selectPalette == 1 ? 2 : 1;
    }
    update();
  }

  bts[1].onmousedown = function(){
    if(selectPalette == 4){
      
    }
    update();
  }

  bts[2].onmousedown = function(){
    if(selectPalette == 2){
      isPickerBubble = isPickerBubble == false ? true : false;
    }else if(selectPalette == 3){
      if(selectBubble == null){
        selectPalette = 2;
        PP.addPaint(CW.value.rgb).move(selectNewbubble.x, selectNewbubble.y).ray(70);
      }else{
        selectPalette = 4;
        selectBubble.color = CW.value.rgb;
        PP.update();
      }
    }else if(selectPalette == 4){
      selectPalette = 2;
      selectBubble = null;
    }
    update();
  }

  bts[3].onmousedown = function(){
    if(selectPalette == 3){
      selectPalette = 2;
    }else if(selectPalette == 4){
      selectPalette = 3;
    }
    update();
  }

  bts[4].onmousedown = function(){
    if(selectPalette == 4){
      selectBubble.ray(selectBubble.r+5);
      PP.update();
    }
    update();
  }

  bts[5].onmousedown = function(){
    if(selectPalette == 4){
      selectBubble.ray(selectBubble.r-5);
      PP.update();
    }
    update();
  }

  update();
}());