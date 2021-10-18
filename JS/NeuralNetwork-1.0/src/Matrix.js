window.NeuralNetwork = ("NeuralNetwork" in window == false) || typeof window.NeuralNetwork != "object" ? {} : window.NeuralNetwork;

window.NeuralNetwork.Matrix = (function($root){
  var Matrix;
  var fn = Matrix = function(r, c){

    this.rows = r;
    this.cols = c;
    this.data = [];

    for (var i = 0; i < this.rows; i++){
      this.data[i] = [];
      for(var j = 0; j < this.cols; j++){
        this.data[i][j] = 0;
      }
    }
  }

  var pr = fn.prototype = {}, st = {};

  pr.print = function(){
    console.table(this.data);
    return this;
  }

  pr.randomize = function(){
    for(var i = 0; i < this.rows; i++){
      for(var j = 0; j < this.cols; j++){
        this.data[i][j] = Math.random() * 2 - 1;
      }
    }
    return this;
  }

  pr.t = function(){
    var r = new Matrix(this.cols, this.rows);
    for(var i = 0; i < this.rows; i++){
      for(var j = 0; j < this.cols; j++){
        r.data[j][i] = this.data[i][j];
      }
    }
    return r;
  }

  fn.transpose = function(a){
    var r = new Matrix(a.cols, a.rows);
    for(var i = 0; i < a.rows; i++){
      for(var j = 0; j < a.cols; j++){
        r.data[j][i] = a.data[i][j];
      }
    }
    return r;
  }

  pr.add = function(m){
    if(m instanceof Matrix){
      for(var i = 0; i < this.rows; i++){
        for(var j = 0; j < this.cols; j++){
          this.data[i][j] += m.data[i][j];
        }
      }
    }else{
      for(var i = 0; i < this.rows; i++){
        for(var j = 0; j < this.cols; j++){
          this.data[i][j] += m;
        }
      }
    }
    return this;
  }

  fn.add = function(a, b){
    if(!(a instanceof Matrix || b instanceof Matrix) || !(a.rows == b.rows && a.cols == b.cols)){return undefined;}
    var r = new Matrix(a.rows, a.cols);
    for(var i = 0; i < r.rows; i++){
      for(var j = 0; j < r.cols; j++){
        r.data[i][j] = a.data[i][j] + b.data[i][j];
      }
    }
    return r;
  }

  pr.sub = function(m){
    if(m instanceof Matrix){
      for(var i = 0; i < this.rows; i++){
        for(var j = 0; j < this.cols; j++){
          this.data[i][j] -= m.data[i][j];
        }
      }
    }else{
      for(var i = 0; i < this.rows; i++){
        for(var j = 0; j < this.cols; j++){
          this.data[i][j] -= m;
        }
      }
    }
    return this;
  }

  fn.sub = function(a, b){
    if(!(a instanceof Matrix || b instanceof Matrix) || !(a.rows == b.rows && a.cols == b.cols)){return undefined;}
    var r = new Matrix(a.rows, a.cols);
    for(var i = 0; i < r.rows; i++){
      for(var j = 0; j < r.cols; j++){
        r.data[i][j] = a.data[i][j] - b.data[i][j];
      }
    }
    return r;
  }

  pr.mult = function(m){
    if(m instanceof Matrix){
      var r = new Matrix(this.rows, m.cols);
      for(var i = 0; i < r.rows; i++){
        for(var j = 0; j < r.cols; j++){
          var s = 0;
          for(var k = 0; k < this.cols; k++){
            s += this.data[i][k] * m.data[k][j];
          }
          r.data[i][j] = s;
        }
      }
      this.rows = r.rows;
      this.cols = r.cols;
      this.data = r.data;
    }else{
      for(var i = 0; i < this.rows; i++){
        for(var j = 0; j < this.cols; j++){
          this.data[i][j] *= m;
        }
      }
    }
    return this;
  }

  fn.mult = function(a, b){
    if(!(a instanceof Matrix || b instanceof Matrix) || !(a.cols == b.rows)){return undefined;}
    var r = new Matrix(a.rows, b.cols);
    for(var i = 0; i < r.rows; i++){
      for(var j = 0; j < r.cols; j++){
        var s = 0;
        for(var k = 0; k < a.cols; k++){
          s += a.data[i][k] * b.data[k][j];
        }
        r.data[i][j] = s;
      }
    }
    return r;
  }

  pr.map = function(f){
    for(var i = 0; i < this.rows; i++){
      for(var j = 0; j < this.cols; j++){
        this.data[i][j] = f(this.data[i][j], i, j);
      }
    }
    return this;
  }

  fn.map = function(m, f){
    if(!(m instanceof Matrix)){return undefined;}
    var r = new Matrix(m.rows, m.cols);
    for(var i = 0; i < r.rows; i++){
      for(var j = 0; j < r.cols; j++){
        r.data[i][j] = m.data[i][j];
        r.data[i][j] = f(r.data[i][j], i, j);
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
        r.data[i][0] = a[i];
      }
    }else{
      var r = new Matrix(a.length, a[0].length);
      for(var i = 0; i < a.length; i++){
        for(var j = 0; j < a[0].length; j++){
          r.data[i][j] = a[i][j];
        }
      }
    }
    return r;
  }

  pr.toArray = function(){
    var r = [];
    for(var i = 0; i < this.rows; i++){
      for(var j = 0; j < this.cols; j++){
        r.push(this.data[i][j]);
      }
    }
    return r;
  }

  pr.copy = function(){
    var r = new Matrix();
    for(var i = 0; i < this.rows; i++){
      for(var j = 0; j < this.cols; j++){
        r.data[i][j] = this.data[i][j];
      }
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
}(window.NeuralNetwork));