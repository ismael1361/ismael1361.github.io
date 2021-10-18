window.NeuralNetwork = ("NeuralNetwork" in window == false) || typeof window.NeuralNetwork != "object" ? {} : window.NeuralNetwork;

window.NeuralNetwork.Brain = (function($root){
  var name_version = "NeuralNetwork v1.0";
  var sigmoid = function(a){return 1 / (1 + Math.exp(-a));}
  var dsigmoid = function(a){return a * (1 - a);}

  var Matrix = $root.Matrix;

  var fn = Brain = function(){
    var err = "";

    if(arguments.length < 3){
      err = name_version+" => Error: It takes at least 3 arguments to build a neural network!";
      console.error(err); throw err;
    }

    this.nodes = [];

    for(var i=0; i<arguments.length; i++){
      if(typeof arguments[i] != "number"){
        err = name_version+" => Error: The type of the arguments must be numeric to determine the layers of a neural network!";
        console.error(err); throw err;
      }else if(arguments[i] <= 0){
        err = name_version+" => Error: Argument values must be greater than 0 to determine the layers of a neural network!";
        console.error(err); throw err;
      }else{
        this.nodes.push(arguments[i]);
      }
    }

    this.layers = [];
    this.bias = [];

    for(var i=1; i<this.nodes.length; i++){
      var weights = new Matrix(this.nodes[i], this.nodes[i-1]);
      weights.randomize();
      var bias = new Matrix(this.nodes[i], 1);
      bias.randomize();
      this.layers.push(weights);
      this.bias.push(bias);
    }

    this.learningRate = 0.3;
  }

  var pr = fn.prototype = {};

  pr.setLayerOfNeurons = function(a, b){
    if(a > this.nodes.length){
      err = name_version+" => Error: There is no layer "+a+" of neurons!";
      console.error(err); throw err;
    }
    this.nodes[a] = b;
    
    for(var i=1; i<this.nodes.length; i++){
      var weights = new Matrix(this.nodes[i], this.nodes[i-1]);
      weights.randomize();

      if(i-1 < this.layers.length){
        this.layers[i-1].map(function(value, row, col){
          if(typeof weights.data[row] != "number" || typeof weights.data[row][col] != "number"){return;}
          weights.data[row][col] = value;
        });

        this.layers[i-1] = weights;
      }else{
        this.layers.push(weights);
      }

      var bias = new Matrix(this.nodes[i], 1);
      bias.randomize();

      if(i-1 < this.bias.length){
        this.bias[i-1].map(function(value, row, col){
          if(typeof bias.data[row] != "number" || typeof bias.data[row][col] != "number"){return;}
          bias.data[row][col] = value;
        });

        this.bias[i-1] = bias;
      }else{
        this.bias.push(bias);
      }
    }
  }

  pr.setLearningRate = function(a){this.learningRate = typeof a == Number ? a : 0.3;}

  pr.execute = function(input){
    var i = Matrix.fromArray(input), l = [];

    for(var j=0; j<this.layers.length; j++){
      var lj = j<1 ? Matrix.mult(this.layers[j], i) : Matrix.mult(this.layers[j], l[j-1]);
      lj.add(this.bias[j]);
      lj.map(sigmoid);
      l.push(lj);
    }

    return l[l.length-1].toArray();
  }

  pr.formalizeInput = function(a, b){
    var input = a;
    if(a.length < b){
      while(a.length < b){
        a.push(Math.random());
      }
    }else if(a.length > b){
      a.splice(b-1, (a.length-b));
    }
    return input;
  }

  pr.train = function(a, b){
    a = this.formalizeInput(a, this.nodes[0]);
    b = this.formalizeInput(b, this.nodes[this.nodes.length-1]);
    var input = Matrix.fromArray(a), l = [];

    for(var j=0; j<this.layers.length; j++){
      var lj = j<1 ? Matrix.mult(this.layers[j], input) : Matrix.mult(this.layers[j], l[j-1]);
      lj.add(this.bias[j]);
      lj.map(sigmoid);
      l.push(lj);
    }

    var error = Matrix.sub(Matrix.fromArray(b), l[l.length-1]);

    for(var i=this.layers.length-1; i>=0; i--){
      var gradient = Matrix.map(l[i], dsigmoid);
      gradient.mult(error);
      gradient.mult(this.learningRate);

      var t = Matrix.transpose(i<1 ? input : l[i-1]),
          delta = Matrix.mult(gradient, t);

      this.layers[i].add(delta);
      this.bias[i].add(gradient);

      if(i==0){break;}
      error = Matrix.mult(Matrix.transpose(this.layers[i]), error);
    }
  }

  pr.trainByData = function(data, loop, oncomplete){
    if(Array.isArray(data) == false){
      err = name_version+" => Error: To perform current training, the argument must be an array of documents with input and output values in array format of the size specified for the input and output layers of the neural network!";
      console.error(err); throw err;
    }

    loop = typeof loop != "number" || loop <= 0 ? 1 : loop > 999 ? 999 : loop;
    oncomplete = typeof oncomplete != "function" ? function(){} : oncomplete;
    
    for(var j=0; j<100; j++){
      for(var i=0; i<data.length; i++){
        this.train(data[i].input, data[i].output);
      }
    }

    var _self = this;

    if(loop > 1){
      window.requestAnimationFrame(function(){
        _self.trainByData(data, loop-1, oncomplete);
      });
    }else{
      oncomplete(_self);
    }

    return {
      oncomplete: function(fn){oncomplete = typeof fn == "function" ? fn : oncomplete;}
    }
  }
  
  pr.serialize = function(){
    var data = {};
    data.nodes = this.nodes;
    data.layers = [];
    for(var i=0; i<this.layers.length; i++){
      data.layers[i] = this.layers[i].toArray();
    }
    data.bias = [];
    for(var i=0; i<this.bias.length; i++){
      data.bias[i] = this.bias[i].toArray();
    }
    data.learningRate = this.learningRate;
    return JSON.stringify(data);
  }

  fn.deserialize = function(a){
    if (typeof a == 'string'){a = JSON.parse(a);}
    let r = new Brain(1, 1, 1);
    r.nodes = a.nodes;
    r.layers = [];
    for(var i=0; i<a.layers.length; i++){
      r.layers[i] = Matrix.fromArray(a.layers[i]);
    }
    r.bias = [];
    for(var i=0; i<a.bias.length; i++){
      r.bias[i] = Matrix.fromArray(a.bias[i]);
    }
    r.learningRate = a.learningRate;
    return r;
  }

  pr.copy = function(){
    return Brain.deserialize(this.serialize());
  }

  pr.mutate = function(a){
    for(var i=0; i<this.layers.length; i++){
      this.layers[i].map(a);
    }
    for(var i=0; i<this.bias.length; i++){
      this.bias[i].map(a);
    }
  }

  return fn;
}(window.NeuralNetwork));