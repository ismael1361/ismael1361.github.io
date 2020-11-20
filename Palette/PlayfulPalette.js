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

  bubble.prototype.radius = function(r){
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
	this.root.splice(k, 1);
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

	this.backgroundCan = document.createElement("canvas");
	this.backgroundCtx = this.backgroundCan.getContext("2d");
	this.backgroundCan.width = this.w;
	this.backgroundCan.height = this.h;

	this.bubblesCan = document.createElement("canvas");
	this.bubblesCtx = this.bubblesCan.getContext("2d");
	this.bubblesCan.width = this.w;
	this.bubblesCan.height = this.h;

	this.paints = new blend();

	this.pickerIdentifier = null;
	this.focusedPaint = null;

	this.isSelectPicker = false;
	this.isMoveBubbles = false;
	this.isMoveAllBubbles = false;

	this.selectBubble = null;

	var self = this;

	this.can.objSelect = null;
	this.can.isMove = false;
	this.can.pos = {x: 0, y: 0};

	var __eventMove = function(e){
	  if(!this.isMove){return;}
	  if(e.type.search("touch") >= 0){
		e.preventDefault();
		var r = this.getBoundingClientRect();
		e.offsetX = e.touches[0].pageX - r.x; 
		e.offsetY = e.touches[0].pageY - r.y;
	  };
	  if(this.pos.x == e.offsetX && this.pos.y == e.offsetY){return;}
	  if(self.isSelectPicker == true){

		self.movePickerIdentifier(true, e.offsetX, e.offsetY);
		var c = self.getPicker(e.offsetX, e.offsetY);
		self.onpicker(c, e.offsetX, e.offsetY);

	  }else if(self.isMoveBubbles == true && this.objSelect != null){
		var d = dist(e.offsetX, e.offsetY, self.r, self.r);
		if(d > self.r){
		  var ang = 180+Angle.pointsToDeg(e.offsetX, e.offsetY, self.r, self.r), p = Angle.findNewPoint(self.r, self.r, ang, self.r);
		  this.objSelect.move(p.x, p.y);
		}else{
		  this.objSelect.move(e.offsetX, e.offsetY);
		}
	  }else if(self.isMoveAllBubbles == true){
		var pX = e.offsetX-this.pos.x, pY = e.offsetY-this.pos.y;
		self.moveAllBubblesBy(pX, pY);
	  }
	  this.pos = {x: e.offsetX, y: e.offsetY};
	  self.update();
	}

	this.can.onmousemove = __eventMove;
	this.can.ontouchmove = __eventMove;

	var __eventStart = function(e){
	  this.pos = {x: e.offsetX, y: e.offsetY};
	  if(dist(e.offsetX, e.offsetY, self.r, self.r) > self.r){return;}
  
	  this.objSelect = self.selectPaint(e.offsetX, e.offsetY);
	  this.isMove = true;
	  
	  if(self.selectBubble != null){
		var checkBubble = self.selectPaint(e.offsetX, e.offsetY);
		if(checkBubble != null){
		  self.selectBubble = checkBubble;
		  self.toMoveBubbles();
		  self.onsetbubble(checkBubble);
		}else{
		  self.selectBubble = null;
		  self.toSelectPicker();
		}
		self.onselectbubble(self.selectBubble);
	  }
	  self.update();
	}
  
	this.can.onmousedown = __eventStart;

	var __doubleClick = function(e){
	  if(dist(e.offsetX, e.offsetY, self.r, self.r) > self.r){return;}
	  self.selectBubble = null;
	  var checkBubble = self.selectPaint(e.offsetX, e.offsetY);
	  if(checkBubble != null){
		self.toMoveBubbles();
		self.selectBubble = checkBubble;
		self.onsetbubble(checkBubble);
	  }else{
		self.onselectnewbubble({x: e.offsetX, y: e.offsetY});
	  }
	  self.update();
	}

	this.can.ondblclick = __doubleClick;
	this.can.clickTimer = null;
	this.can.ontouchstart = function(e){
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
	  this.objSelect = null; 
	  this.isMove = false;
	  if(self.isSelectPicker == true){
		if(e.type.search("touch") >= 0){
		  e.preventDefault();
		  e.offsetX = this.pos.x; 
		  e.offsetY = this.pos.y;
		};
		self.movePickerIdentifier(false, e.offsetX, e.offsetY);
		self.oneventout(e.offsetX, e.offsetY);
	  }
	}

	this.can.onmouseup = __eventOut;
	this.can.onmouseout = __eventOut;
	this.can.ontouchend = __eventOut;
	this.can.ontouchleave = __eventOut;

	this.onpicker = function(){return;};
	this.onselectbubble = function(){return;};
	this.onselectnewbubble = function(){return;};
	this.onsetbubble = function(){return;};
	this.oneventout = function(){return;};

	var img = this.backgroundCtx.createImageData(this.w, this.h);
	for(var y = 0; y < this.h; y++){
	  for(var x = 0; x < this.w; x++){
		var i = (y*this.w+x)*4, color = [255, 255, 255, 100], t = 0, maxT = 1.2, d;
		d = (dist(x, y, this.r, this.r)/this.r)*100;
		t = (100-d);
		t = t <= maxT ? (t/maxT) : 1;
		t = t < 0 ? 0 : t > 1 ? 1 : t;
		img.data[i+0] = color[0];
		img.data[i+1] = color[1];
		img.data[i+2] = color[2];
		img.data[i+3] = Math.round(color[3]*(t));
	  }
	}
	this.backgroundCtx.putImageData(img, 0, 0);

	this.update(true);
  }

  var p = fn.prototype = {};

  p.toSelectPicker = function(){
	this.isSelectPicker = true;
	this.isMoveBubbles = false;
	this.isMoveAllBubbles = false;
	this.selectBubble = null;
	this.update();
  }

  p.toMoveBubbles = function(){
	this.isSelectPicker = false;
	this.isMoveBubbles = true;
	this.isMoveAllBubbles = false;
	this.selectBubble = this.selectBubble == null ? this.paints.root[0] : this.selectBubble;
	this.update();
  }

  p.toMoveAllBubbles = function(){
	this.isSelectPicker = false;
	this.isMoveBubbles = false;
	this.isMoveAllBubbles = true;
	this.selectBubble = null;
	this.update();
  }

  p.addPaint = function(c){
	var a = this.paints.add(c);
	this.update(true);
	return a;
  }

  p.removePaint = function(k){
	this.paints.remove(k);
	this.update(true);
	this.selectBubble = this.paints.root.length > 0 ? this.paints.root[0] : null;
	this.onselectbubble(this.selectBubble);
	if(this.selectBubble == null){this.toSelectPicker();}
  }

  p.clearAllBubbles = function(){
	if(this.paints.root.length <= 0){return;}
	this.paints = new blend();
	this.update(true);
  }

  p.moveAllBubblesBy = function(x, y){
	if(this.paints.root.length <= 0){return;}
	for(var i=0; i<this.paints.root.length; i++){
	  var b = this.paints.root[i];
	  b.move(b.x+x, b.y+y);
	}
  }

  p.getPicker = function(x, y){
  	var color = getFragColor(x, y, this.paints);
  	if(color[3] === 0){
  		color = this.__backColor || color;
  		if(this.pickerIdentifier){
  			this.pickerIdentifier = this.__backPickerIdentifier;
  		}
  	}else{
  		this.__backColor = color;
  		if(this.pickerIdentifier){
  			this.__backPickerIdentifier = this.pickerIdentifier;
  		}
  	}
	return color;
  }

  p.selectNearestBubble = function(x, y){
	var p = this.paints.root,
		k = [],
		dist = function(a, b, r){
		  var r = typeof r == "number" ? r : 50,
			  diff = function(a, b){if (a > b){return (a - b);}else{return (b - a);}},
			  dx = diff(a.x, b.x),
			  dy = diff(a.y, b.y);
		  return (dx * dx + dy * dy) / r / r;
		};
	if(p.length < 1){return null;}
	
	for(var i=0; i<p.length; i++){k.push(p[i].key);}

	k.sort(function(a, b){
	  a = p[a]; b = p[b];
	  var pt = {x: x, y: y};
	  return dist(pt, a, a.r)-dist(pt, b, b.r);
	});

	return p[k[0]];
  }

  p.selectPaint = function(x, y){
	var p = this.selectNearestBubble(x, y),
		dist = function(a, b, r){
		  var r = typeof r == "number" ? r : 50,
			  diff = function(a, b){if (a > b){return (a - b);}else{return (b - a);}},
			  dx = diff(a.x, b.x),
			  dy = diff(a.y, b.y);
		  return (dx * dx + dy * dy) / r / r;
		};

	if(p == null){return null;}

	if(dist({x: x, y: y}, p, p.r) <= 0.25){
	  return p;
	}
	return null;
  }

  p.update = function(isDraw){var self = this; window.requestAnimationFrame(function(){self.draw(typeof isDraw == "boolean" ? isDraw : false);});}

  p.movePickerIdentifier = function(t, x, y){
	if(typeof t != "boolean" || t == false){
	  this.pickerIdentifier = null;
	  this.update(false);
	  return;
	}

	this.pickerIdentifier = {x: x, y: y};
	this.update(false);
  }

  p.focusPaint = function(k){
	this.focusedPaint = typeof k == "number" ? k < 0 ? null : k >= this.paints.root.length ? null : k : null;
	this.update(false);
  }

  p.draw = function(isDraw){
	this.ctx.clearRect(0, 0, this.w, this.h);

	if(isDraw || this.isSelectPicker != true){
	  this.bubblesCtx.clearRect(0, 0, this.w, this.h);
	  var img = this.bubblesCtx.createImageData(this.w, this.h);
	  for(var y = 0; y < this.h; y++){
		for(var x = 0; x < this.w; x++){
		  var i = (y*this.w+x)*4, color = [255, 255, 255, 100], t = 0, maxT = 1.2, d, alp = 1;
		  d = (dist(x, y, this.r, this.r)/this.r)*100;
		  t = (100-d);
		  t = t <= maxT ? (t/maxT) : 1;
		  t = t < 0 ? 0 : t > 1 ? 1 : t;

		  color = getFragColor(x, y, this.paints);

		  img.data[i+0] = color[0];
		  img.data[i+1] = color[1];
		  img.data[i+2] = color[2];
		  img.data[i+3] = Math.round(color[3]*(t)*alp);
		}
	  }
	  this.bubblesCtx.putImageData(img, 0, 0);
	}

	this.ctx.drawImage(this.backgroundCan, 0, 0, this.w, this.h);
	this.ctx.drawImage(this.bubblesCan, 0, 0, this.w, this.h);

	if(this.selectBubble != null){
	  var p = this.selectBubble;
	  this.ctx.beginPath();
	  this.ctx.lineWidth = 2;
	  this.ctx.strokeStyle = "rgba(255, 255, 255 ,1)";
	  this.ctx.arc(p.x, p.y, p.r/2, 0, 2 * Math.PI);
	  this.ctx.stroke();
	}

	if(this.pickerIdentifier != null){
	  var x = this.pickerIdentifier.x, y = this.pickerIdentifier.y, color = this.getPicker(x, y), d;
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