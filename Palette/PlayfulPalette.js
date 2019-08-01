var PlayfulPalette = (function(){
  var bubble = function(x, y, color, r){
    this.x = x;
    this.y = y;
    this.color = Array.isArray(color) ? color : [Math.round(Math.random()*255), Math.round(Math.random()*255), Math.round(Math.random()*255)];
    this.r = typeof r == "number"? r : 50;
    this.key = 0;
  }

  bubble.prototype.move = function(x, y){
    this.x = x;
    this.y = y;
    return this;
  };

  bubble.prototype.ray = function(r){
    this.r = r;
    return this;
  };

  bubble.prototype.containThisPosition = function(x, y){
    return this.x - this.r < x && this.x + this.r > x && this.y - this.y < y && this.y + this.r > y;
  }

  var blend = function(){
    this.root = [];
  }

  blend.prototype.remove = function(k){
    if(typeof k != "number"){return;}
    k = k < 0 ? 0 : k >= this.root.length ? this.root.length-1 : k;
    for(var i=0; i<this.root.length; i++){if(this.root[i].key == k){this.root.splice(i, 1); break;}}
    for(var i=0; i<this.root.length; i++){this.root[i].key = i;}
  }
  
  blend.prototype.add = function(color){
    var a = new bubble(10, 10, color);
    this.root.push(a);
    for(var i=0; i<this.root.length; i++){this.root[i].key = i;}
    return a;
  }

  function getFragColor(x, y, blend){
    blend = !blend.root || !(blend.root instanceof Array) ? [] : blend.root;
    if(blend.length == 0){return [255, 255, 255, 0];}
  
    var b2 = 0.25, b3 = b2 * b2, b4 = b3 * b2, f = 0, p = 1, c = [0, 0, 0, 255];
  
    for(var i=0; i<blend.length; i++){
      if(!blend[i].containThisPosition(x, y)){continue;}
      var bub = blend[i], r = bub.r*2,
          dx = (bub.x-x), dy = (bub.y-y),
          d2 = (dx * dx + dy * dy) / r / r;
      if(d2 <= b2){
        var d4 = d2 * d2, d5 = 1-(4*d4*d2 / b4-17*d4 / b3+22*d2 / b2)/9;
        c[0] = (c[0] + bub.color[0] * d5);
        c[1] = (c[1] + bub.color[1] * d5);
        c[2] = (c[2] + bub.color[2] * d5);
        f += d5;
      }
    }
  
    var max = 0.4, border = 0.03;
  
    if(f < max){
      return [255, 255, 255, 0];
    }else{
      p = f < (max+border) ? Math.min(Math.max(((f-max)/(border)), 0), 1) : 1;
      c[0] = Math.round((c[0] / f));
      c[1] = Math.round((c[1] / f));
      c[2] = Math.round((c[2] / f));
      c[3] = 255*p;
      return c;
    }
  }

  var fn = function(can){
    this.can = can;
    this.ctx = this.can.getContext("2d");
    this.w = can.width;
    this.h = can.height;
    this.r = this.w/2;

    this.bubblesCan = document.createElement("canvas");
    this.bubblesCtx = this.bubblesCan.getContext("2d");
    this.bubblesCan.width = this.w;
    this.bubblesCan.height = this.h;

    this.paints = new blend();

    this.pickerIdentifier = null;
    this.update();
  }

  var p = fn.prototype = {};

  p.addPaint = function(c){
    var a = this.paints.add(c);
    this.update();
    return a;
  }

  p.getPicker = function(x, y){
    return getFragColor(x, y, this.paints);
  }

  p.selectPaint = function(x, y){
    var p = this.paints.root,
        dist = function(a, b, r){
          var r = typeof r == "number" ? r : 50,
              diff = function(a, b){if (a > b){return (a - b);}else{return (b - a);}},
              dx = diff(a.x, b.x),
              dy = diff(a.y, b.y);
          return (dx * dx + dy * dy) / r / r;
        };
    if(p.length < 1){return null;}
    
    p.sort(function(a, b){
      var pt = {x: x, y: y};
      return dist(pt, a, a.r)-dist(pt, b, b.r);
    });
  
    if(dist({x: x, y: y}, p[0], p[0].r) <= 0.25){
      return p[0];
    }
    return null;
  }

  p.update = function(){var self = this; window.requestAnimationFrame(function(){self.draw();});}

  p.movePickerIdentifier = function(t, x, y){
    if(typeof t != "boolean" || t == false){
      this.pickerIdentifier = null;
      this.update();
      return;
    }

    this.pickerIdentifier = {x: x, y: y};
    this.update();
  }

  p.draw = function(){
    this.ctx.clearRect(0, 0, this.w, this.h);
    this.bubblesCtx.clearRect(0, 0, this.w, this.h);
    var img1 = this.ctx.createImageData(this.w, this.h), img2 = this.bubblesCtx.createImageData(this.w, this.h);

    for(var y = 0; y < this.h; y++){
      for(var x = 0; x < this.w; x++){
        var i = (y*this.w+x)*4, color = [255, 255, 255, 100], t = 0, maxT = 1.2, d;
        d = (dist(x, y, this.r, this.r)/this.r)*100;
        t = (100-d);
        t = t <= maxT ? (t/maxT) : 1;
        t = t < 0 ? 0 : t > 1 ? 1 : t;

        img1.data[i+0] = color[0];
        img1.data[i+1] = color[1];
        img1.data[i+2] = color[2];
        img1.data[i+3] = Math.round(color[3]*(t));

        color = getFragColor(x, y, this.paints);
        img2.data[i+0] = color[0];
        img2.data[i+1] = color[1];
        img2.data[i+2] = color[2];
        img2.data[i+3] = Math.round(color[3]*(t));
      }
    }

    this.ctx.putImageData(img1, 0, 0);
    this.bubblesCtx.putImageData(img2, 0, 0);
    this.ctx.drawImage(this.bubblesCan, 0, 0, this.w, this.h);

    if(this.pickerIdentifier != null){
      var x = this.pickerIdentifier.x, y = this.pickerIdentifier.y, color = getFragColor(x, y, this.paints), d;
      d = dist(x, y, this.r, this.r);

      if(d > this.r){
        var ang = 180+Angle.pointsToDeg(x, y, this.r, this.r), p = Angle.findNewPoint(this.r, this.r, ang, this.r);
        x = p.x; y = p.y;
      }
  
      this.ctx.beginPath();
      this.ctx.lineWidth = 3;
      this.ctx.strokeStyle = "rgba(255, 255, 255 ,1)";
      this.ctx.fillStyle = "rgb("+color[0]+", "+color[1]+", "+color[2]+")";
      this.ctx.arc(x, y, 15, 0, 2 * Math.PI);
      this.ctx.stroke();
      this.ctx.fill();
    }
  }

  return fn;
}());