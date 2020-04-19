var Menu = (function(fn){
  var prototype = fn.prototype = {};
  prototype.selected = 0;
  prototype.elList = [];
  prototype.onclick = function(){};

  prototype.init = function(){
    for(var i=0; i<this.list.length; i++){
      var value = this.list[i], div = js("<div><span>"+value+"</span></div>");
      this.mainMenu.append(div);
      this.elList.push(div);
      var self = this;
      div.getDom().key = i;
      div.on("mousedown", function(){
        self.selected = this.key;
        //self.select(this.key);
      });
    }
    this.selected = 0;
    this.update();

    var self = this;

    this.mainMenu.on("mousedown", function(e){
      this.move = true;
      this.backMove = e.clientY;
      self.mainMenu.css({"cursor": "move"});
    });
    this.mainMenu.on("mousemove", function(e){
      if(this.move){
        if(this.backMove < e.clientY){
          self.selected -= 0.1;
        }else{
          self.selected += 0.1;
        }
        self.update();
        this.backMove = e.clientY;
      }
    });
    this.mainMenu.on("mouseup", function(e){
      this.move = false;
      self.select(self.selected);
      self.mainMenu.css({"cursor": "auto"});
    });

    window.onresize = function(){
      self.update();
    }
  }

  prototype.select = function(s){
    var d = this.mainMenu, self = this;
    d.addClass("anime");
    setTimeout(function(){
      self.selected = typeof s == "number" ? Math.round(s) : Math.round(self.selected);
      self.update();
      setTimeout(function(){
        d.removeClass("anime");
      }, 500);
    }, 10);
    this.onclick(Math.round(this.selected), this.list[this.selected]);
  }

  prototype.update = function(){
    this.selected = this.selected < 0 ? 0 : this.selected >= this.elList.length-1 ? this.elList.length-1 : this.selected;
    for(var i=0; i<this.elList.length; i++){
      var div = this.elList[i], s = (i-this.selected);
      var h = 45, fs = 25;
      h = h - (Math.abs(s) * (h*0.05));
      h = (this.mainMenu.height()/2)-(h/2)+(h*s);
  
      fs = fs-(Math.abs(s)*(fs*0.15));
      fs = fs > 0 ? fs : 0;
  
      div.css({
        "top": (h)+"px",
        "font-size": (fs)+"px",
        "opacity": 1-(Math.abs(s)*0.1),
        "padding-left": fs+"px"
      });
    }
  }

  return fn;
}(function(list, el){
  this.list = list;
  this.mainMenu = el;
  this.init();
}));