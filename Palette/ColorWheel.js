var ColorWheel = (function(){
  var deg2rec = function(deg, rad){
    var x = 0, y = 0;
    deg = typeof deg == "number" ? deg%360 : 0;
    deg = deg < 0 ? deg+360 : deg;
    rad = typeof rad == "number" ? (rad/100) : 1;
  
    if(deg >= 0 && deg <= 45){
      var temp = deg-0, total = 45-0;
      x = 100; y = 50-(temp/total*50);
    }else if(deg > 45 && deg <= 135){
      var temp = deg-45, total = 135-45;
      x = 100-(temp/total*100); y = 0;
    }else if(deg > 135 && deg <= 225){
      var temp = deg-135, total = 225-135;
      x = 0; y = (temp/total*100);
    }else if(deg > 225 && deg <= 315){
      var temp = deg-225, total = 315-225;
      x = (temp/total*100); y = 100;
    }else if(deg > 315 && deg <= 360){
      var temp = deg-315, total = 360-315;
      x = 100; y = 100-(temp/total*50);
    }
  
    var p = (100-(100*rad))/2;
    x = p+(x*rad);
    y = p+(y*rad);
  
    return [x, y];
  }

  var rec2deg = function(x, y){
    var deg = 0;
    x = typeof x == "number" ? x : 100;
    y = typeof y == "number" ? y : 100;

    deg = (360-Angle.pointsToDeg(50, 50, x, y))%360;

    var p = deg2rec(deg, 100), 
        r1 = dist(p[0], p[1], 50, 50), 
        r2 = dist(x, y, 50, 50);

    return [deg, (r2/r1)*100];
  }

  var fn = function(can){
    this.can = can;
    this.ctx = this.can.getContext("2d");
    this.w = can.width;
    this.h = can.height;
    this.r = this.w/2;

    this.canPiker = document.createElement("canvas");
    this.ctxPiker = this.canPiker.getContext("2d");
    this.canPiker.width = this.w;
    this.canPiker.height = this.h;
  
    this.sizeWheel = 25;
    this.marginDisc = 10;
  
    this.discHue = 360;
    this.discAngle = 315;
    this.discRadius = 100;

    this.value = {rgb: [255, 0, 0], hsl: [360, 100, 50], hsv: [360, 100, 100], har: [360, 315, 100]};
  
    var self = this;
  
    var eventMove = function(e){
      if(e.type.search("touch") >= 0){
        e.preventDefault();
        var r = this.getBoundingClientRect();
        e.offsetX = e.touches[0].pageX - r.x; 
        e.offsetY = e.touches[0].pageY - r.y;
      };
      var x = e.offsetX, y = e.offsetY;
      if(this.hoverHue == true){
        self.discHue = Math.floor((180+Angle.pointsToDeg(x, self.h-y, self.r, self.r)));
        window.requestAnimationFrame(function(){self.draw(true, false)});
      }else if(this.hoverDisc == true){
        var sD = (100-self.sizeWheel)-self.marginDisc, d = (dist(x, y, self.r, self.r)/self.r)*100;

        self.discAngle = Math.floor((180+Angle.pointsToDeg(x, y, self.r, self.r)));
        self.discRadius = d < sD ? (d/sD)*100 : 100;
        window.requestAnimationFrame(function(){self.draw(false, true)});
      }

      if(this.hoverHue == true || this.hoverDisc == true){
        self.ondrag(self.updateValue());
      }
    }

    var eventStart = function(e){
      if(e.type.search("touch") >= 0){
        e.preventDefault();
        var r = this.getBoundingClientRect();
        e.offsetX = e.touches[0].pageX - r.x; 
        e.offsetY = e.touches[0].pageY - r.y;
      };
      this.hoverHue = false; this.hoverDisc = false;
      var x = e.offsetX, y = e.offsetY;
      var sW = 100-self.sizeWheel, sD = sW-self.marginDisc, d = (dist(x, y, self.r, self.r)/self.r)*100;
      if(d >= sW){this.hoverHue = true;}else if(d < sD){this.hoverDisc = true;}
      eventMove.call(this, e);
    }
  
    this.can.onmousedown = eventStart;
    this.can.ontouchstart = eventStart;

    this.can.onmousemove = eventMove;
    this.can.ontouchmove = eventMove;

    var eventOut = function(e){
      if(e.type.search("touch") >= 0){
        e.preventDefault();
      }
      this.hoverHue = false; this.hoverDisc = false;
      window.requestAnimationFrame(function(){
        self.draw();
        setTimeout(function(){
          var r = self.updateValue();
          self.onselect(r);
          self.onchange(r);
          self.ondrag(r);
        }, 5);
      });
    }

    this.can.onmouseup = eventOut;
    this.can.onmouseout = eventOut;
    this.can.ontouchend = eventOut;
    this.can.ontouchleave = eventOut;
    
    this.draw();
  }
  
  var p = fn.prototype = {};

  p.onselect = function(){return;}
  p.onchange = function(){return;}
  p.ondrag = function(){return;}

  p.updateValue = function(){
    var rec = deg2rec(this.discAngle, this.discRadius), hsl = hsvToHsl(this.discHue/360, rec[0]/100, rec[1]/100);
    this.value.rgb = hsvToRgb(this.discHue/360, rec[0]/100, rec[1]/100);
    this.value.hsv = [this.discHue, rec[0], rec[1]];
    this.value.hsl = [hsl[0]*360, hsl[1]*100, hsl[2]*100];
    this.value.har = [this.discHue, this.discAngle, this.discRadius];
    return this.value;
  }

  p.setHSV = function(h, s, v){
    var self = this, rd = rec2deg(s, v);
    this.discHue = h;
    this.discAngle = rd[0];
    this.discRadius = rd[1];
    window.requestAnimationFrame(function(){
      self.draw();
      setTimeout(function(){
        var r = self.updateValue();
        self.onselect(r);
        self.onchange(r);
        self.ondrag(r);
      }, 5);
    });
  }

  p.setRGB = function(r, g, b){
    var hsv = rgbToHsv(r, g, b);
    this.setHSV(hsv[0]*360, hsv[1]*100, hsv[2]*100);
  }

  p.setHSL = function(h, s, l){
    var hsv = hslToHsv(h/360, s/100, l/100);
    this.setHSV(hsv[0]*360, hsv[1]*100, hsv[2]*100);
  }

  p.setHAR = function(h, a, r){
    var rec = deg2rec(a, r);
    this.setHSV(h, rec[0], rec[1]);
  }

  p.draw = function(dDisc, mDisc){
    dDisc = typeof dDisc == "boolean" ? dDisc : true; 
    mDisc = typeof mDisc == "boolean" ? mDisc : false; 
    var sW = 100-this.sizeWheel, sD = sW-this.marginDisc;

    this.ctx.clearRect(0, 0, this.w, this.h);

    if(dDisc){
      this.ctxPiker.clearRect(0, 0, this.w, this.h);
      var img = this.ctxPiker.createImageData(this.w, this.h);

      for(var y = 0; y < this.h; y++){
        for(var x = 0; x < this.w; x++){
          var i = (y*this.w+x)*4, color = [255, 255, 255], t = 0, maxT = 1.2, d, angle, rec;
          d = (dist(x, y, this.r, this.r)/this.r)*100;

          if(d > sW && d <= 100){
            angle = Angle.pointsToDeg(this.r, this.r, x, this.h-y);
            color = hsvToRgb(angle/360, 1, 1);
            t = (100-d);
            t = t <= maxT ? (t/maxT) : t >= ((100-sW)-maxT) ? 1-((t-((100-sW)-maxT))/maxT) : 1;
          }else if(d < sD){
            angle = Angle.pointsToDeg(this.r, this.r, x, y);
            rec = deg2rec(angle, (d/sD)*100);
            color = hsvToRgb(this.discHue/360, rec[0]/100, rec[1]/100);
            t = (100-((d/sD)*100));
            t = t <= maxT ? (t/maxT) : 1;
          }

          t = t < 0 ? 0 : t > 1 ? 1 : t;
    
          img.data[i+0] = color[0];
          img.data[i+1] = color[1];
          img.data[i+2] = color[2];
          img.data[i+3] = Math.round(255*(t));
        }
      }
    
      this.ctxPiker.putImageData(img, 0, 0);
    }

    this.ctx.drawImage(this.canPiker, 0, 0, this.w, this.h);

    var color = hsvToRgb(this.discHue/360, 1, 1), 
        r = (sW/100)*this.r, 
        pointCirclePos = Angle.findNewPoint(this.r, this.r, this.discHue, r+this.r*((this.sizeWheel/2)/100));

    this.ctx.beginPath();
    this.ctx.lineWidth = 4;
    this.ctx.strokeStyle = "rgba(255, 255, 255, 1)";
    this.ctx.fillStyle = "rgb("+color[0]+", "+color[1]+", "+color[2]+")";
    this.ctx.arc(pointCirclePos.x, this.h-pointCirclePos.y, ((this.r*(this.sizeWheel/100))/2)-3, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.fill();

    var rec = deg2rec(this.discAngle, this.discRadius); 

    color = hsvToRgb(this.discHue/360, rec[0]/100, rec[1]/100);
    r = (sD/100)*this.r;

    var grey = 255-((color[0]+color[1]+color[2])/3), pointCirclePos = Angle.findNewPoint(this.r, this.r, this.discAngle, r*(this.discRadius/100));

    //grey = grey > 255/3 ? 255 : 150;
    grey = 255;

    if(mDisc){
      //pointCirclePos.x = pointCirclePos.x-2;
      pointCirclePos.y = pointCirclePos.y-6;
    }

    this.ctx.beginPath();
    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = "rgba("+grey+","+grey+","+grey+",1)";
    this.ctx.fillStyle = "rgb("+color[0]+", "+color[1]+", "+color[2]+")";
    this.ctx.arc(pointCirclePos.x, pointCirclePos.y, mDisc == false ? 6 : 15 , 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.fill();
  }

  return fn;
}());