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

    if(selectBubble != null){PP.focusPaint(selectBubble.key);}else{PP.focusPaint(null);}

    if(selectPalette == 1){
      bts[0].setAttribute("type", "paletteBubble");
      var c = memoryColorSelect;
      CW.setRGB(c[0], c[1], c[2]);
    }else if(selectPalette == 2){
      bts[0].setAttribute("type", "colorWheel");
      bts[2].setAttribute("type", "settings");
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
  can[1].pos = {x: 0, y: 0};

  var __eventMove = function(e){
    if(!this.isMove){return;}
    if(e.type.search("touch") >= 0){
      e.preventDefault();
      var r = this.getBoundingClientRect();
      e.offsetX = e.touches[0].pageX - r.x; 
      e.offsetY = e.touches[0].pageY - r.y;
    };
    this.pos = {x: e.offsetX, y: e.offsetY};
    if(selectPalette == 2){
      PP.movePickerIdentifier(true, e.offsetX, e.offsetY);
      var c = PP.getPicker(e.offsetX, e.offsetY);
      CW.setRGB(c[0], c[1], c[2]);
      memoryColorSelect = c;
      updateColorSelect();
    }else if(selectPalette == 4 && this.objSelect != null){
      var d = dist(e.offsetX, e.offsetY, PP.r, PP.r);
      if(d > PP.r){
        var ang = 180+Angle.pointsToDeg(e.offsetX, e.offsetY, PP.r, PP.r), p = Angle.findNewPoint(PP.r, PP.r, ang, PP.r);
        this.objSelect.move(p.x, p.y);
      }else{
        this.objSelect.move(e.offsetX, e.offsetY);
      }
      PP.update();
    }
  }

  can[1].onmousemove = __eventMove;
  can[1].ontouchmove = __eventMove;

  var __eventStart = function(e){
    this.pos = {x: e.offsetX, y: e.offsetY};
    if(dist(e.offsetX, e.offsetY, PP.r, PP.r) > PP.r){return;}

    this.objSelect = PP.selectPaint(e.offsetX, e.offsetY);
    this.isMove = true;
    
    if(selectBubble != null){
      var checkBubble = PP.selectPaint(e.offsetX, e.offsetY);
      if(checkBubble != null){
        selectBubble = checkBubble;
      }else{
        selectBubble = null;
        selectPalette = 2;
      }
      update();
    }
  }

  can[1].onmousedown = __eventStart;

  var __doubleClick = function(e){
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

  can[1].ondblclick = __doubleClick;

  can[1].clickTimer = null;
  can[1].ontouchstart = function(e){
    e.preventDefault();
    var r = this.getBoundingClientRect();
    e.offsetX = e.touches[0].pageX - r.x; 
    e.offsetY = e.touches[0].pageY - r.y;
    var self = this;
    if(this.clickTimer == null){
      this.clickTimer = setTimeout(function(){
        self.clickTimer = null;
        __eventStart.call(self, e);
      }, 300);
    }else{
        clearTimeout(this.clickTimer);
        this.clickTimer = null;
        setTimeout(function(){
          __doubleClick.call(self, e);
        }, 100);
    }
  };

  var __eventOut = function(e){
    if(selectPalette == 2 && this.isMove){
      if(e.type.search("touch") >= 0){
        e.preventDefault();
        e.offsetX = this.pos.x; 
        e.offsetY = this.pos.y;
      };
      PP.movePickerIdentifier(false, e.offsetX, e.offsetY);
      update();
    }
    this.objSelect = null; 
    this.isMove = false;
  }

  can[1].onmouseup = __eventOut;
  can[1].onmouseout = __eventOut;
  can[1].ontouchend = __eventOut;
  can[1].ontouchleave = __eventOut;

  bts[0].onmousedown = function(){
    if(selectPalette == 4){
      PP.paints.remove(selectBubble.key);
      PP.update();
      selectPalette = 4;
      selectBubble = PP.paints.root[0];
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
      selectBubble = PP.paints.root[0];
      selectPalette = 4;
    }else if(selectPalette == 3){
      if(selectBubble == null){
        selectPalette = 4;
        PP.addPaint(CW.value.rgb).move(selectNewbubble.x, selectNewbubble.y).ray(70);
        selectBubble = PP.selectPaint(selectNewbubble.x, selectNewbubble.y);
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
      if(selectBubble == null){
        selectPalette = 2;
      }else{
        selectPalette = 4;
      }
    }else if(selectPalette == 4){
      selectPalette = 3;
      var c = selectBubble.color;
      CW.setRGB(c[0], c[1], c[2]);
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