(function(){
  var bts = document.querySelectorAll('#Palette > .content > .btt'), selectPalette = 2, memoryColorSelect = [0, 196, 180];

  var can = document.querySelectorAll('#Palette > .content > canvas');

  var CW = new ColorWheel(can[0]);
  CW.ondrag = function(e){
    if(selectPalette != 1){return;}
    memoryColorSelect = e.rgb;
    updateColorSelect();
  }

  var PP = new PlayfulPalette(can[1]);
  PP.addPaint([204, 0, 255]).move(106, 175).radius(70);
  PP.addPaint([255, 221, 0]).move(65, 143).radius(70);
  PP.addPaint([0, 136, 255]).move(82, 85).radius(70);
  PP.addPaint([0, 255, 106]).move(136, 60).radius(70);

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
    can[1].style.cursor = "";
    if(selectPalette == 1 || selectPalette == 3){
      can[0].style.display = "block"; can[1].style.display = "none";
    }else{
      can[0].style.display = "none"; can[1].style.display = "block";
    }

    //if(PP.selectBubble != null){PP.focusPaint(PP.selectBubble.key);}else{PP.focusPaint(null);}

    if(selectPalette == 1){
      bts[0].setAttribute("type", "paletteBubble");
      var c = memoryColorSelect;
      CW.setRGB(c[0], c[1], c[2]);
    }else if(selectPalette == 2){
      bts[0].setAttribute("type", "colorWheel");
      if(PP.paints.root.length > 0){
        bts[2].setAttribute("type", "settings");
        bts[1].setAttribute("type", "clear");
        bts[3].setAttribute("type", "moveBubble");
        if(PP.isMoveAllBubbles == true){
          PP.toMoveAllBubbles();
          bts[3].style.backgroundColor = "#1565c0";
          can[1].style.cursor = "move";
        }else{
          PP.toSelectPicker();
        }
      }else{
        bts[2].setAttribute("type", "addBubble");
        PP.toSelectPicker();
      }
    }else if(selectPalette == 3){
      bts[2].setAttribute("type", "confirm");
      bts[3].setAttribute("type", "cancel");
    }else if(selectPalette == 4){
      if(PP.selectBubble == null){
        selectPalette == 2;
        update();
      }
      PP.toMoveBubbles();
      bts[0].setAttribute("type", "delete");
      bts[2].setAttribute("type", "picker");
      bts[3].setAttribute("type", "setColors");
      bts[3].style.backgroundColor = "rgb("+PP.selectBubble.color[0]+", "+PP.selectBubble.color[1]+", "+PP.selectBubble.color[2]+")";
      bts[4].setAttribute("type", "plusZoom");
      bts[5].setAttribute("type", "minusZoom");
    }
  }

  var selectNewbubble = {x: 0, y: 0};

  PP.onpicker = function(c){
    CW.setRGB(c[0], c[1], c[2]);
    memoryColorSelect = c;
    updateColorSelect();
  }
  PP.toSelectPicker();

  PP.onselectbubble = function(s){
    if(s == null){selectPalette = 2;}
    update();
  }

  PP.onselectnewbubble = function(e){
    selectNewbubble.x = e.x;
    selectNewbubble.y = e.y;
    selectPalette = 3;
    update();
  };

  PP.onsetbubble = function(s){
    selectPalette = s == null ? 2 : 4;
    update();
  };

  PP.oneventout = function(){
    update();
  };

  bts[0].onmousedown = function(){
    if(selectPalette == 4){
      selectPalette = 4;
      PP.removePaint(PP.selectBubble.key);
    }else{
      selectPalette = selectPalette == 1 ? 2 : 1;
    }
    update();
  }

  bts[1].onmousedown = function(){
    if(selectPalette == 2){
      PP.clearAllBubbles();
    }
    update();
  }

  bts[2].onmousedown = function(){
    if(selectPalette == 2){
      if(PP.paints.root.length > 0){
        PP.selectBubble = PP.paints.root[0];
        selectPalette = 4;
      }else{
        var p = Angle.findNewPoint(PP.r, PP.r, Math.round(Math.random()*360), Math.round(Math.random()*PP.r-30));
        selectNewbubble.x = p.x;
        selectNewbubble.y = p.y;
        selectPalette = 3;
      }
    }else if(selectPalette == 3){
      if(PP.selectBubble == null){
        selectPalette = 4;
        PP.addPaint(CW.value.rgb).move(selectNewbubble.x, selectNewbubble.y).radius(60);
        PP.selectBubble = PP.selectPaint(selectNewbubble.x, selectNewbubble.y);
      }else{
        selectPalette = 4;
        PP.selectBubble.color = CW.value.rgb;
      }
    }else if(selectPalette == 4){
      selectPalette = 2;
      PP.selectBubble = null;
    }
    update();
  }

  bts[3].onmousedown = function(){
    if(selectPalette == 2){
      if(PP.isMoveAllBubbles == false){
        PP.toMoveAllBubbles();
      }else{
        PP.toSelectPicker();
      }
    }else if(selectPalette == 3){
      if(PP.selectBubble == null){
        selectPalette = 2;
      }else{
        selectPalette = 4;
      }
    }else if(selectPalette == 4){
      selectPalette = 3;
      var c = PP.selectBubble.color;
      CW.setRGB(c[0], c[1], c[2]);
    }
    update();
  }

  bts[4].onmousedown = function(){
    if(selectPalette == 4){
      PP.selectBubble.radius(PP.selectBubble.r+5);
    }
    update();
  }

  bts[5].onmousedown = function(){
    if(selectPalette == 4){
      PP.selectBubble.radius(PP.selectBubble.r-5);
    }
    update();
  }

  update();
}());