var mtx = new Matrix2(5, 8);
mtx.randomize();
mtx.print();

var mtx2 = Matrix2.add(mtx, 2);
mtx2.print();

mtx.add(mtx2);
mtx.print();

console.table(mtx.toArray());

var nn = new NeuralNetwork.Brain(2, 4, 1);

nn.setLearningRate(0.8);

var result = null;

result = nn.execute([0, 0]);
console.log(result);
result = nn.execute([0, 1]);
console.log(result);
console.log("--------------");

var trainData = [
  {input: [0, 0], output: [1]},
  {input: [0, 1], output: [1]},
  {input: [1, 0], output: [0]},
  {input: [1, 1], output: [0]},
];

nn.trainByData(trainData, 200).oncomplete(function(self){
  result = self.execute([0, 0]);
  console.log(result);
  result = self.execute([0, 1]);
  console.log(result);
  console.log("--------------");

  nn.setLayerOfNeurons(1, 5);
  nn.setLayerOfNeurons(2, 2);

  trainData = [
    {input: [0, 0], output: [1, 1]},
    {input: [0, 1], output: [1, 0]},
    {input: [1, 0], output: [0, 1]},
    {input: [1, 1], output: [0, 0]},
  ];
  
  nn.trainByData(trainData, 400).oncomplete(function(self){
    result = self.execute([0, 0]);
    console.log(result);
    result = self.execute([0, 1]);
    console.log(result);
    console.log("--------------");
  });
});

/*
setInterval(function(){
  for(var i=0; i<200; i++){
    for(var j=0; j<trainData.length; j++){
      nn.train(trainData[j].input, trainData[j].output);
    }
  }
  
  result = nn.execute([0, 0]);
  console.log(result);
  result = nn.execute([0, 1]);
  console.log(result);
  console.log("--------------");
}, 1000);*/