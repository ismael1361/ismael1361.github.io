window.Matrix2 = (function(){
  var Matrix;
  var fn = Matrix = function(r, c){
    this.rows = r;
    this.cols = c;
    this.data = [];
    for(var i = 0; i < this.rows*this.cols; i++){this.data[i] = 0;}
  }

  var pr = fn.prototype = {};
  pr.xy2index = function(x, y){return x + this.rows*y;}
  pr.index2xy = function(i){return {x: i % this.rows, y: Math.floor(i / this.rows)}}

  pr.getValue = function(x, y){
    if(x >= this.rows || y >= this.cols){throw "ERROR! Position "+y+"x"+x+" does not exist!";}
    return this.data[this.xy2index(x, y)];
  }

  pr.setValue = function(x, y, v){
    if(x >= this.rows || y >= this.cols){throw "ERROR! Position "+y+"x"+x+" does not exist!";}
    if(typeof v != "number"){throw "ERROR! Value type is invalid, must be type number!"}
    return this.data[this.xy2index(x, y)] = v;
  }

  pr.print = function(){
    var data = [];
    for (var i = 0; i < this.rows; i++){
      data[i] = [];
      for(var j = 0; j < this.cols; j++){
        data[i][j] = this.getValue(i, j);
      }
    }
    console.table(data);
    return this;
  }

  pr.randomize = function(){
    for(var i = 0; i < this.rows*this.cols; i++){this.data[i] = Math.round(((Math.random() * 2) - 1)*1000)/1000;}
    return this;
  }
  
  pr.t = function(){
    var r = new Matrix(this.cols, this.rows);
    for(var i = 0; i < this.rows; i++){
      for(var j = 0; j < this.cols; j++){
        r.setValue(j, i, this.getValue(i, j));
      }
    }
    return r;
  }

  fn.transpose = function(a){
    if((a instanceof Matrix) == false){throw "ERROR! The attribute is not a Matrix!";}
    var r = new Matrix(a.cols, a.rows);
    for(var i = 0; i < a.rows; i++){
      for(var j = 0; j < a.cols; j++){
        r.setValue(j, i, a.getValue(i, j));
      }
    }
    return r;
  }
  
  pr.add = function(m){
    if(m instanceof Matrix){
      if(m.data.length == this.data.length){
        for(var i=0; i < this.data.length; i++){
          this.data[i] += m.data[i];
        }
      }
    }else if(typeof m == "number"){
      for(var i=0; i < this.data.length; i++){
        this.data[i] += m;
      }
    }
    return this;
  }

  fn.add = function(a, b){
    if((a instanceof Matrix) == false){throw "ERROR! The attribute is not a Matrix!";}
    var r = new Matrix(a.rows, a.cols);
    for(var i=0; i < r.data.length; i++){
      r.data[i] = a.data[i];
    }
    r.add(b);
    return r;
  }
  
  pr.sub = function(m){
    if(m instanceof Matrix){
      if(m.data.length == this.data.length){
        for(var i=0; i < this.data.length; i++){
          this.data[i] -= m.data[i];
        }
      }
    }else if(typeof m == "number"){
      for(var i=0; i < this.data.length; i++){
        this.data[i] -= m;
      }
    }
    return this;
  }

  fn.sub = function(a, b){
    if((a instanceof Matrix) == false){throw "ERROR! The attribute is not a Matrix!";}
    var r = new Matrix(a.rows, a.cols);
    for(var i=0; i < r.data.length; i++){
      r.data[i] = a.data[i];
    }
    r.sub(b);
    return r;
  }
  
  pr.mult = function(m){
    if(m instanceof Matrix){
      if(m.rows == this.cols){
        var r = new Matrix(this.rows, m.cols);
        for(var i = 0; i < r.rows; i++){
          for(var j = 0; j < r.cols; j++){
            var s = 0;
            for(var k = 0; k < this.cols; k++){
              s += this.getValue(i, k) * m.getValue(k, j);
            }
            r.setValue(i, j, s);
          }
        }
        this.rows = r.rows;
        this.cols = r.cols;
        this.data = r.data;
      }
    }else if(typeof m == "number"){
      for(var i=0; i < this.data.length; i++){
        this.data[i] *= m;
      }
    }
    return this;
  }

  fn.mult = function(a, b){
    if((a instanceof Matrix) == false){throw "ERROR! The attribute is not a Matrix!";}
    var r = new Matrix(a.rows, a.cols);
    for(var i=0; i < r.data.length; i++){
      r.data[i] = a.data[i];
    }
    r.mult(b);
    return r;
  }

  pr.map = function(f){
    for(var i = 0; i < this.rows; i++){
      for(var j = 0; j < this.cols; j++){
        this.setValue(i, j, f(this.getValue(i, j), i, j));
      }
    }
    return this;
  }

  fn.map = function(m, f){
    if((m instanceof Matrix) == false){throw "ERROR! The attribute is not a Matrix!";}
    var r = new Matrix(m.rows, m.cols);
    for(var i = 0; i < r.rows; i++){
      for(var j = 0; j < r.cols; j++){
        r.setValue(i, j, m.getValue(i, j));
        r.setValue(i, j, f(m.getValue(i, j), i, j));
      }
    }
    return r;
  }

  fn.fromArray = function(a){
    if(!(a instanceof Array)){
      return undefined
    }else if(!(a[0] instanceof Array)){
      var r = new Matrix(a.length, 1);
      for(var i = 0; i < a.length; i++){
        r.setValue(i, 0, a[i]);
      }
    }else{
      var r = new Matrix(a.length, a[0].length);
      for(var i = 0; i < a.length; i++){
        for(var j = 0; j < a[0].length; j++){
          r.setValue(i, j, a[i][j]);
        }
      }
    }
    return r;
  }

  pr.toArray = function(){
    var r = [];
    for(var i = 0; i < this.rows; i++){
      r[i] = [];
      for(var j = 0; j < this.cols; j++){
        r[i].push(this.getValue(i, j));
      }
    }
    return r;
  }

  pr.copy = function(){
    var r = new Matrix(this.rows, this.cols);
    for(var i = 0; i < this.data.length; i++){
      r.data[i] = this.data[i];
    }
    return r;
  }

  pr.serialize = function(){
    return JSON.stringify(this);
  }

  fn.deserialize = function(a){
    if (typeof a == 'string'){a = JSON.parse(a);}
    var r = new Matrix(a.rows, a.cols);
    r.data = a.data;
    return r;
  }
  return fn;
}());