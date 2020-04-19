var fileSave = function(sourceText, fileIdentity){
  var workElement = document.createElement("a");
  if('download' in workElement){
    workElement.href = "data:" + 'text/plain' + "charset=utf-8," + escape(sourceText);
    workElement.setAttribute("download", fileIdentity);
    document.body.appendChild(workElement);
    var eventMouse = document.createEvent("MouseEvents");
    eventMouse.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    workElement.dispatchEvent(eventMouse);
    document.body.removeChild(workElement);
  }else{throw 'File saving not supported for this browser';}
}

var hex2ascii = function(value){
  value = value.match(/[0-9A-Fa-f]{2}/g);
  var len = hex.length;
  if(len==0){return '';}
  var txt='';
  for(var i=0; i<len; i++){
    txt += String.fromCharCode(parseInt(hex[i],16));
  }
  return txt;
}

var ascii2hex = function(value){
  var len = value.length;
  if(len==0){return '';}
  var hex='';
  for(var i=0; i<len; i++){
    var h = value.charCodeAt(i).toString(16);
    hex += (h.length==1 ? '0' : '')+h;
  }
  return hex;
}

var dist = function(x1, y1, x2, y2){
  var diff = function(a, b){return a > b ? a-b : b-a;},
      deltaX = diff(x1, x2), deltaY = diff(y1, y2);
  return (Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2)));
};

var Angle = function(){return this;};
Angle.radiansToDeg = function(a){return a * 180 / Math.PI;}
Angle.degToRadians = function(a){return a * Math.PI / 180;}
Angle.pointsToRadians = function(x1, y1, x2, y2){return Math.atan2(y2-y1, x2-x1);}
Angle.pointsToDeg = function(x1, y1, x2, y2){return this.radiansToDeg(this.pointsToRadians(x1, y1, x2, y2))}
Angle.findNewPoint = function(x, y, a, d){
  return {
    x: Math.round(Math.cos(this.degToRadians(a)) * d + x), 
    y: Math.round(Math.sin(this.degToRadians(a)) * d + y)
  };
}

var rgbToHsl = function(r, g, b){
  r /= 255, g /= 255, b /= 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b), h, s, l = (max + min) / 2;
  if(max == min){h = s = 0;}else{
    var d = max - min; s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if(max == r){h = (g - b) / d + (g < b ? 6 : 0);}else if(max == g){h = (b - r) / d + 2;}else if(max == b){h = (r - g) / d + 4;}
    h /= 6;
  }
  return [h, s, l];
}

var rgbToHsv = function(r, g, b){
  r /= 255, g /= 255, b /= 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b), h, s, v = max, d = max - min;
  s = max == 0 ? 0 : d / max;
  if(max == min){h = 0;}else{
    if(max == r){h = (g - b) / d + (g < b ? 6 : 0);}else if(max == g){h = (b - r) / d + 2;}else if(max == b){h = (r - g) / d + 4;}
    h /= 6;
  }
  return [h, s, v];
}

var hslToRgb = function(h, s, l){
  var r, g, b;
  if(s == 0){r = g = b = l;}else{
    var hue2rgb = function hue2rgb(p, q, t){
      if(t < 0){t += 1;} if(t > 1){t -= 1;}
      if(t < 1/6){return p + (q - p) * 6 * t;} if(t < 1/2){return q;} if(t < 2/3){return p + (q - p) * (2/3 - t) * 6;}
      return p;
    }
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3); g = hue2rgb(p, q, h); b = hue2rgb(p, q, h - 1/3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

var hsvToRgb = function(h, s, v){
  var l = (2-s)*v/2;
  s = l != 0 ? (l == 1 ? 0 : l < 0.5 ? s*v/(l*2) : s*v/(2-l*2)) : s;
  return hslToRgb(h, s, l);
}

var hsvToHsl = function(h, s, v){var l = (2-s)*v/2; s = l != 0 ? (l == 1 ? 0 : l < 0.5 ? s*v/(l*2) : s*v/(2-l*2)) : s; h = h > 1 ? 1 : h < 0 ? 0 : h; s = s > 1 ? 1 : s < 0 ? 0 : s; l = l > 1 ? 1 : l < 0 ? 0 : l; return [h, s, l];}

var hslToHsv = function(a, b, c){var corlor = hslToRgb(a, b, c); return rgbToHsv(corlor[0], corlor[1], corlor[2]);}