var UNO = (function(main){
  var self = main.prototype = {};
  self.CARDS = [
    "R00", "R01", "R02", "R03", "R04", "R05", "R06", "R07", "R08", "R09", "R0B", "R0R", "R0+2", "R0C", "R11", "R12", "R13", "R14", "R15", "R16", "R17", "R18", "R19", "R1B", "R1R", "R1+2", "R1+4", 
    "G00", "G01", "G02", "G03", "G04", "G05", "G06", "G07", "G08", "G09", "G0B", "G0R", "G0+2", "G0C", "G11", "G12", "G13", "G14", "G15", "G16", "G17", "G18", "G19", "G1B", "G1R", "G1+2", "G1+4", 
    "B00", "B01", "B02", "B03", "B04", "B05", "B06", "B07", "B08", "B09", "B0B", "B0R", "B0+2", "B0C", "B11", "B12", "B13", "B14", "B15", "B16", "B17", "B18", "B19", "B1B", "B1R", "B1+2", "B1+4", 
    "Y00", "Y01", "Y02", "Y03", "Y04", "Y05", "Y06", "Y07", "Y08", "Y09", "Y0B", "Y0R", "Y0+2", "Y0C", "Y11", "Y12", "Y13", "Y14", "Y15", "Y16", "Y17", "Y18", "Y19", "Y1B", "Y1R", "Y1+2", "Y1+4"
  ];
  self.CARD_COLOR = {"R": "red", "G": "blue", "B": "green", "Y": "yellow"};
  self.PLAYERS = [];
  self.cardsShuffled = [];
  self.currentColor = null;
  self.direction = "l";
  self.btts = {};
  self.turnPlayer = 0;
  self.CountChargeCard = 0;
  self.colorChangeDom = null;
  self.isUnoShout = false;
  self.isWinner = false;

  self.workspaceDom = function(el){
    self.element = js(el);
    self.element.on("click", function(e){
      for(var i=0; i<e.path.length-2; i++){
        var el = js(e.path[i]);
        if(el.hasClass("card")){
          if(el[0].player == 0 && self.turnPlayer == 0 && el[0].isActive){
            self.playCard(self.PLAYERS[0], self.PLAYERS[4], el[0].keyPlay);
          }
          break;
        }
      }
    });
  }

  self.clearVariables = function(){
    for(var i=0; i<self.PLAYERS.length; i++){
      self.PLAYERS[i].cards = [];
    }
    self.cardsShuffled = [];
    self.currentColor = null;
    self.direction = (Math.floor(Math.random()*2)) == 0? "l": "r";
    self.btts = {};
    self.turnPlayer = (Math.floor(Math.random()*4));
    self.CountChargeCard = 0;
    self.colorChangeDom = null;
    self.isUnoShout = false;
    self.isWinner = false;
    self.element.html("");
  }

  self.players = function(){
    self.PLAYERS = [];
    for(var i=0; i<4; i++){
      self.PLAYERS.push({
        name: typeof arguments[i] == "string" ? arguments[i] : "Jogador 0"+(i+1),
        cards: [],
        key: i
      });
    }
    self.PLAYERS.push({
      name: "cardsPlayed",
      cards: [],
      key: self.PLAYERS.length
    });
  }

  self.gameOver = function(){}

  self.defineGameOver = function(f){
    self.gameOver = typeof f == "function" ? f : self.gameOver;
  }

  self.getCard = function(type){
    var card = {
      type: "back",
      color: "black",
      value: "",
      name: type
    };

    if(type == null || type == ""){return card;}
  
    type = (/(R|G|B|Y)(0|1)?([0-9BR\+C]+)/g).exec(type);

    card.type = type[3];
    card.value = type[3];
    card.color = (card.type == "C" || card.type == "+4") ? "black" : self.CARD_COLOR[type[1]];
    return card;
  }

  self.cardToElement = function(card, el){
    if(!el || !el.getDom){
      if(card == null || card.type == null || card.type == "back"){
        return js('<div class="card back"></div>');
      }else if(card.type == "C" || card.type == "+4"){
        return js('<div class="card" color="'+card.color+'" value="'+card.value+'"><div value="'+card.value+'"></div></div>');
      }else{
        return js('<div class="card" color="'+card.color+'" value="'+card.value+'"><div value="'+card.value+'"></div></div>');
      }
    }else{
      if(card == null || card.type == null || card.type == "back"){
        el.html("");
        el.attr("class", "card back");
        el.removeAttr("color, value");
        return el;
      }else{
        el.html('<div value="'+card.value+'"></div>');
        el.attr({"class": "card", "color": card.color, "value": card.value});
        return el;
      }
    }
  }

  self.draw = function(){
    /*for(var i=1; i<=4; i++){
      var bench = js('<div class="bench'+(i == 1 ? ' active' : '')+'" player="'+i+'"></div>');
      self.PLAYERS[i-1].bench = bench;
      this.element.append(bench);
    }*/

    var rd = js('<div class="direction" direction="'+self.direction+'"></div>');
    self.PLAYERS[4].direction = rd;
    this.element.append(rd);

    var bttUno = js('<div class="bttUno" value="UNO!"><div class="selecting"></div></div>');
    self.btts.UNO = bttUno;
    bttUno.on('click', function(){
      if(bttUno.hasClass('active') && self.isUnoShout == false){
        self.isUnoShout = true;
        bttUno.removeClass('active');
        self.PLAYERS[0].displayUnoShout(true);
        self.PLAYERS[4].displayUnoShout();
      }
    });
    this.element.append(bttUno);
    
    self.PLAYERS[4].unoShout = js('<div class="mainUnoShout" value="UNO!"></div>');
    this.element.append(self.PLAYERS[4].unoShout);
    self.PLAYERS[4].displayUnoShout = function(){
      this.unoShout.addClass("active");
      var s = this;
      setTimeout(function(){
        s.unoShout.removeClass("active");
      }, 1000);
    }

    self.PLAYERS[4].playerIndicator = js('<div class="playerIndicator"></div>');
    this.element.append(self.PLAYERS[4].playerIndicator);
    self.PLAYERS[4].updatePlayerIndicator = function(){
      this.playerIndicator.attr("player", String(self.turnPlayer+1));
    }


    var bttCharge = self.cardToElement();
    self.btts.chargeCards = bttCharge;
    this.element.append(bttCharge);

    //bttCharge.addClass("main");
    bttCharge.css({
      "bottom": "130px",
      "left": "10%",
      "transform": "rotate(30deg)",
      "transform-origin": "center bottom",
      "box-shadow": "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
      "cursor": "pointer",
      "z-index": "9000",
      "scale": "0.5"
    });

    var r = this;

    bttCharge.on("click", function(){
      if(self.turnPlayer != 0 || this.noGet){return;}

      var cP = self.PLAYERS[4], 
          lc = cP.cards[cP.cards.length-1],
          p = false;

      for(var i=0; i<self.PLAYERS[0].cards.length; i++){
        if(self.canPlay(lc, self.PLAYERS[0].cards[i])){
          p = true;
        }
      }

      if(p != false){
        this.noGet = true;
        return;
      }
      
      p = false;

      if(self.canPlay(lc, self.cardsShuffled[0])){
        p = true;
      }

      r.chargeCard(self.PLAYERS[0], 1);

      if(p == false){
        setTimeout(function(){r.changeTurn();}, 15);
      }else{
        this.noGet = true;
      }
    });

    self.colorChangeDom = js('<div class="colorChange"><p>Esolha uma cor:</p><div id="colorChangeOp"></div></div>');
    this.element.append(self.colorChangeDom);

    for(var i=0; i<4; i++){
      self.PLAYERS[i].bloqued = js('<div class="bloquedPlayer" player="'+(i+1)+'">🛇</div>');
      self.PLAYERS[i].displayBloqued = function(){
        this.bloqued.html(self.CountChargeCard > 0 ? '+'+self.CountChargeCard : '🛇');
        this.bloqued.addClass("active");
        var s = this;
        setTimeout(function(){
          s.bloqued.removeClass("active");
        }, 1000);
      }
      this.element.append(self.PLAYERS[i].bloqued);

      self.PLAYERS[i].unoShout = js('<div class="unoShout" player="'+(i+1)+'"></div>');
      self.PLAYERS[i].displayUnoShout = function(a){
        if(!a){
          this.unoShout.removeClass("active");
        }else{
          this.unoShout.addClass("active");
        }
      }
      this.element.append(self.PLAYERS[i].unoShout);
    }

    this.update();
  }

  self.update = function(){
    var r = this,
        cP = self.PLAYERS[4], 
        lc = cP.cards[cP.cards.length-1];

    self.PLAYERS[4].updatePlayerIndicator();

    for(var i=0; i<5; i++){
      var cards = self.PLAYERS[i].cards, isCardsValids = false;

      if(cards.length == 1 && i < 4){
        self.PLAYERS[i].displayUnoShout(true);
      }else if(i < 4){
        self.PLAYERS[i].displayUnoShout(false);
      }

      if(i == 4 && cards.length > 7){
        for(var j=0; j<cards.length-8; j++){
          if(!cards[0].dom){
          }else{
            cards[0].dom.remove();
            cards[0].dom = null;
          }
          self.cardsShuffled.push(cards[0]);
          cards.splice(0, 1);
        }
      }

      for(var j=0; j<cards.length; j++){
        var card;
        if(!cards[j].dom){
          card = self.cardToElement(i == 0 || i == 4? cards[j] : null);
          this.element.append(card);
          cards[j].dom = card;
        }else{
          cards[j].dom = self.cardToElement(i == 0 || i == 4? cards[j] : null, cards[j].dom);
          card = cards[j].dom;
        }
        card[0].keyPlay = j;
        card[0].player = i;

        var activePlay = false;

        if(i < 4){
          if(i == self.turnPlayer){
            card.addClass("activePlay");
            card.removeClass("desactivePlay");
            activePlay = true;
          }else{
            card.removeClass("activePlay");
            card.addClass("desactivePlay");
          }
        }
        
        var l = cards.length, d = j-(l/2), deg = 30;

        var f = function(x){
          x = x*5;
          return (((x*0.6)**2)+0.8)*(1);
        }

        var left = (35/l);
        left = left < 3 ? left > -3 ? left : -3 : 3;
        left = (d*left+48);

        var s = self.element.width()*0.5;
        s = s > 300 ? 300 : s;
        s = s/l;
        s = s < 20 ? s : 20;
        var left = (d*s)+(-60);

        s = self.element.height()*0.5;
        s = s > 200 ? 200 : s;
        s = s/l;
        s = s < 20 ? s : 20;
        var top = (d*s)+(-70);

        var r = (j*((deg*2)/l))-deg*0.8;

        if(i == 0){
          card.addClass("main");
          var isActive = true;
          if(activePlay && lc){
            isActive = self.CountChargeCard == 0 ? self.canPlay(lc, cards[j]) : (cards[j].type == "+2" || cards[j].type == "+4");
            if(isActive){
              card.removeClass("desactiveCart");
              card.addClass("activeCart");
            }else{
              card.removeClass("activeCart");
              card.addClass("desactiveCart");
            }
          }
          card[0].isActive = isActive;
          isCardsValids = isActive ? isActive : isCardsValids;

          card.css({
            "left": "50%",
            "bottom": activePlay ? isActive ? "-30px" : "-40px" : "-80px",
            "transform": "translate("+(left)+"%, "+(f(d/(l/2)))+"%) rotate("+(r)+"deg)",
            "z-index": (j*(i+2)+100),
            "cursor": activePlay && isActive ? "pointer" : "auto"
          });
        }else if(i == 1){
          card.css({
            "top": "50%",
            "left": activePlay ? "-40px" : "-90px",
            "bottom": "0%",
            "transform": "translate(-"+(f(d/(l/2)))+"%, "+(top)+"%) rotate("+(r+90)+"deg)",
            "z-index": (j*(i+2)+100)
          });
        }else if(i == 2){
          card.css({
            "left": "50%",
            "bottom": activePlay ? "calc(100% - 130px)" : "calc(100% - 80px)",
            "transform": "translate("+(left)+"%, -"+(f(d/(l/2)))+"%) rotate("+(r*(-1)+(-180))+"deg)",
            "z-index": (j*(i+2)+100)
          });
        }else if(i == 3){
          card.css({
            "top": "50%",
            "left": activePlay ? "calc(100% - 100px)" : "calc(100% - 50px)",
            "bottom": "0px",
            "transform": "translate("+(f(d/(l/2)))+"%, "+(top)+"%) rotate("+(r*(-1)+270)+"deg)",
            "z-index": (j*(i+2)+100)
          });
        }else if(i == 4){
          card.__memoryRandom = !card.__memoryRandom ? Math.random() : card.__memoryRandom;
          var r = Math.round(card.__memoryRandom*180)-90, 
              l = -70-(Math.round(card.__memoryRandom*20)-10), 
              t = -50-(Math.round(card.__memoryRandom*20)-10);
          card.css({
            "top": "45%",
            "left": "50%",
            "transform": "translate("+l+"%, "+t+"%) rotate("+(r)+"deg) scale(0.9)",
            "z-index": j
          });
        }
      }

      if(i == 0 && cards.length == 2 && i == self.turnPlayer && isCardsValids){
        self.btts.UNO.addClass("active");
        self.isUnoShout = false;
      }else if(i == self.turnPlayer){
        self.btts.UNO.removeClass("active");
        self.isUnoShout = false;
      }
    }

    self.PLAYERS[4].direction.attr("direction", self.direction);
  }

  self.chargeCard = function(p, i){
    i = !i || i < 1 ? 1 : i;
    for(var j=0; j<i; j++){
      var card = self.cardsShuffled[j];
      card.dom = self.cardToElement();
      card.dom.css({
        "left": "10%",
        "bottom": "110px",
        "transform": "translate(25%, 25%) rotate(30deg)",
        "z-index": "900000"
      });
      this.element.append(card.dom);

      var r = this;
      setTimeout(function(){
        self.addCards(p, 1);
        r.update();
      }, 20+(150*j));
    }
  }

  self.addCards = function(p, n){
    var c = self.cardsShuffled, cP = self.PLAYERS[4];
    for(var i=1; i<=n; i++){
      if(c.length <= 4){
        for(var j=0; j<cP.cards.length-8; j++){
          if(!cP.cards[0].dom){
          }else{
            cP.cards[0].dom.remove();
            cP.cards[0].dom = null;
          }
          c.push(cP.cards[0]);
          cP.cards.splice(0, 1);
        }
      }
      p.cards.push(c[0]);
      if(p == cP){
        self.currentColor = cP.cards[cP.cards.length - 1].color;
      }
      c.splice(0, 1);
    }
  }

  self.removeCard = function(p1, p2, i){
    var cP = self.PLAYERS[4];
    p2.cards.push(p1.cards[i]);
    if(p2 == cP){
      self.currentColor = cP.cards[cP.cards.length - 1].color;
    }
    p1.cards.splice(i, 1);
  }

  self.shuffle = function(a){
    a = new Array().concat(a);
    var j = 0, t = null;
    for(var i=a.length-1; i>0; i--){
      j = Math.floor(Math.random() * (a.length - 1));
      t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  self.transferCards = function(p1, p2){
    for(var i=1; i<p1.cards.length-1; i++){
      if(!p1.cards[0].dom){
      }else{
        p1.cards[0].dom.remove();
        p1.cards[0].dom = null;
      }
      p2.cards.push(p1.cards[i]);
    }
    p1.cards.splice(1, p1.cards.length-2);
    p2.cards = self.shuffle(p2.cards);
  }

  self.canPlay = function(lc, c){
    if(lc.name == c.name){
      return true;
    }else if(self.currentColor == c.color){
      return true;
    }else if(lc.type == c.type){
      return true;
    }else if((c.type == 'C') || (c.type == "+4")){
      return true;
    }else if((c.type == '+2') && (lc.type == "+4") && (self.CountChargeCard > 0)){
      return true;
    }else{
      return false;
    }
  }

  self.playCard = function(p1, p2, i){
    var cP = self.PLAYERS[4], 
        lc = cP.cards[cP.cards.length-1],
        c = p1.cards[i],
        sP = self.turnPlayer;
    if(self.canPlay(lc, c)){
      if(self.cardsShuffled.length == 1){
        self.transferCards(cP, self.cardsShuffled);
      }

      if(c.type == "B"){
        var k = self.direction == 'l' ? (self.turnPlayer+1)%4 : (self.turnPlayer-1)%4;
        k = k < 0 ? 4+k : k;
        self.PLAYERS[k].displayBloqued();
        this.changeTurn(true);
      }else if(c.type == "+2"){
        self.CountChargeCard += 2;
        this.changeTurn();
      }else if(c.type == "+4"){
        if(c.color != "black"){
          self.CountChargeCard += 4;
          this.changeTurn();
        }else{
          this.colorChange(p1, p2, i, true);
          return;
        }
      }else if(c.type == "R"){
        self.direction = self.direction == 'l' ? 'r' : 'l';
        this.changeTurn();
      }else if(c.type == "C"){
        if(c.color != "black"){}else{
          this.colorChange(p1, p2, i);
          return;
        }
        this.changeTurn();
      }else{
        this.changeTurn();
      }

      self.removeCard(p1, p2, i);
    }else{
      this.chargeCard(p1, 2);
      this.changeTurn();
    }
    if(p1.cards.length == 0){
      self.isWinner = true;
      var oppositions = [];
      for(var i=0; i<4; i++){
        var p = {}, s = self.PLAYERS[i];
        p.name = s.name;
        p.points = 0;
        for(var j=0; j<s.cards.length; j++){
          var t = s.cards[j].type;
          if(isNaN(Number(t)) != true && t != "+2" && t != "+4"){
            p.points += Number(t);
          }else if(t == "+2" || t == "R" || t == "B"){
            p.points += 20;
          }else if(t == "+4" || t == "C"){
            p.points += 50;
          }
        }
        oppositions.push(p);
      }

      oppositions.sort(function(a, b) {
        return a.points - b.points;
      });

      setTimeout(function(){self.gameOver(sP == 0, oppositions);}, 1000);
    }else if(p1.cards.length == 1 && self.isUnoShout == false){
      this.chargeCard(p1, 2);
    }else if(p1.cards.length == 1 && self.isUnoShout == true){
      self.isUnoShout = false;
      if(sP != 0){
        game.PLAYERS[4].displayUnoShout();
      }
    }
    this.update();
  }

  self.changeTurn = function(jump){
    if(self.isWinner){return;}
    var th = this;
    if(self.direction == 'l'){
      self.turnPlayer = (self.turnPlayer+(jump ? 2 : 1))%4;
    }else{
      self.turnPlayer = (self.turnPlayer-(jump ? 2 : 1))%4;
      self.turnPlayer = self.turnPlayer < 0 ? 4+self.turnPlayer : self.turnPlayer;
    }

    if(self.CountChargeCard > 0){
      var t = false;
      for(var i=0; i<self.PLAYERS[self.turnPlayer].cards.length; i++){
        var c = self.PLAYERS[self.turnPlayer].cards[i];
        if(c.type == "+2" || c.type == "+4"){
          t = true;
        }
      }

      if(t == false){
        self.PLAYERS[self.turnPlayer].displayBloqued();
        setTimeout(function(){
          th.chargeCard(self.PLAYERS[self.turnPlayer], self.CountChargeCard);
          self.CountChargeCard = 0;
          setTimeout(function(){th.changeTurn();}, 50);
        }, 1000);
        return;
      }
    }

    if(self.turnPlayer != 0){
      var playTime = Math.floor(Math.random() * 1500) + 1500;
      setTimeout(function(){
        self.IA(self.turnPlayer);
      }, playTime);
    }

    if(self.turnPlayer == 0){
      self.btts.chargeCards[0].noGet = false;
    }else{
      self.btts.chargeCards[0].noGet = true;
    }
  }

  self.colorChange = function(p1, p2, i){
    var c = p1.cards[i], th = this;
    if(self.turnPlayer == 0){
      var r, g, b, y;
      r = js('<div color="red"></div>');
      g = js('<div color="green"></div>');
      b = js('<div color="blue"></div>');
      y = js('<div color="yellow"></div>');

      self.colorChangeDom.find('#colorChangeOp').append(r);
      self.colorChangeDom.find('#colorChangeOp').append(g);
      self.colorChangeDom.find('#colorChangeOp').append(b);
      self.colorChangeDom.find('#colorChangeOp').append(y);

      self.colorChangeDom.addClass("block");

      var selectColor = function(){
        self.colorChangeDom.removeClass("block");
        self.currentColor = js(this).attr("color");
        c.color = self.currentColor;
        if(c.dom){
          c.dom.attr("color", c.color);
        }
        r.remove();
        g.remove();
        b.remove();
        y.remove();
        th.playCard(p1, p2, i);
      }

      r.on('click', selectColor);
      g.on('click', selectColor);
      b.on('click', selectColor);
      y.on('click', selectColor);
    }else{
      self.currentColor = self.IAColorChange();
      c.color = self.currentColor;
      if(c.dom){
        c.dom.attr("color", c.color);
      }
      this.playCard(p1, p2, i);
    }
  }

  self.newGame = function(){
    self.clearVariables();

    if(self.PLAYERS.length < 4){console.error("Defina os Jogadores"); return;}
    self.cardsShuffled = [];

    for(var i=0; i<self.CARDS.length; i++){
      self.cardsShuffled.push(self.getCard(self.CARDS[i]));
    }

    self.cardsShuffled = self.shuffle(self.cardsShuffled);
    
    for(var i=0; i<4; i++){
      self.addCards(self.PLAYERS[i], 7);
    }

    if(self.cardsShuffled[0].type == "+4" || self.cardsShuffled[0].type == "C"){
      self.currentColor = self.IAColorChange();
      self.cardsShuffled[0].color = self.currentColor;
    }

    self.chargeCard(self.PLAYERS[4], 1);

    this.draw();

    if(self.turnPlayer != 0){
      setTimeout(function(){
        self.IA(self.turnPlayer);
      }, 2500);
    }
  }

  self.IA = function(tP){
    if(self.isWinner || tP == 0){return;}
    var p = self.PLAYERS[tP];

    var cP = self.PLAYERS[4], 
        lc = cP.cards[cP.cards.length-1]
        select = null;

    for(var i=0; i<p.cards.length; i++){
      if(self.CountChargeCard > 0 && (p.cards[i].type == "+2" || p.cards[i].type == "+4")){
        select = i;
        break;
      }else if(self.CountChargeCard == 0 && self.canPlay(lc, p.cards[i])){
        select = i;
      }
    }
    if(p.cards.length == 2){
      self.isUnoShout = true;
    }
    if(select != null){
      this.playCard(p, cP, select);
    }else{
      this.chargeCard(p, 1);
      this.changeTurn();
    }
  }

  self.IAColorChange = function(){
    var c = ['R', 'G', 'B', 'Y'],
        k = Math.floor(Math.random()*c.length);
    return self.CARD_COLOR[c[k]];
  }

  return main;
}(function(el){
  this.workspaceDom(el);
  var s = this;

  window.onresize = function(){
    s.update();
  };
}));

var Home = (function(main){
  var self = main.prototype = {};
  self.element = null;

  self.workspaceDom = function(el){
    self.element = js(el);
  }

  self.show = function(game){
    var divMain = js('<div class="HomeGame"></div>'), contant = js('<div></div>');

    divMain.append(js('<div class="card" color="red" value="3"><div value="3"></div></div>'));
    divMain.append(js('<div class="card" color="black" value="+4"><div value="+4"></div></div>'));
    divMain.append(js('<div class="card back"></div>'));
    divMain.append(js('<div class="card" color="yellow" value="0"><div value="0"></div></div>'));
    divMain.append(js('<div class="card" color="blue" value="5"><div value="5"></div></div>'));
    divMain.append(js('<div class="card" color="black" value="C"><div value="C"></div></div>'));
    divMain.append(js('<div class="card back"></div>'));
    divMain.append(js('<div class="card" color="green" value="3"><div value="3"></div></div>'));

    contant.append(js('<div class="title" value="UNO"></div>'));

    var btt = js('<div class="bttNewGame">Jogar</div>');
    btt.on('click', function(){
      divMain.removeClass("active");
      setTimeout(function(){
        game.newGame();
      }, 300);
    });
    contant.append(btt);

    setTimeout(function(){
      divMain.addClass("active");
    }, 300);

    divMain.append(contant);
    self.element.append(divMain);
  }

  return main;
}(function(el){
  this.workspaceDom(el);
}));

var GameOver = (function(main){
  var self = main.prototype = {};
  self.element = null;

  self.workspaceDom = function(el){
    self.element = js(el);
  }

  self.show = function(game, winner, players){
    var divMain = js('<div class="GameOver"></div>'), contant = js('<div></div>');

    divMain.append(js('<div class="card" color="red" value="3"><div value="3"></div></div>'));
    divMain.append(js('<div class="card" color="black" value="+4"><div value="+4"></div></div>'));
    divMain.append(js('<div class="card back"></div>'));
    divMain.append(js('<div class="card" color="yellow" value="0"><div value="0"></div></div>'));
    divMain.append(js('<div class="card" color="blue" value="5"><div value="5"></div></div>'));
    divMain.append(js('<div class="card" color="black" value="C"><div value="C"></div></div>'));
    divMain.append(js('<div class="card back"></div>'));
    divMain.append(js('<div class="card" color="green" value="3"><div value="3"></div></div>'));

    contant.append(js('<h1>Fim de Jogo</h1>'));

    if(winner){
      contant.append(js('<h2>Parabéns, você ganhou!</h2>'));
    }else{
      contant.append(js('<h2>Você perdeu, tente novamente!</h2>'));
    }

    var btt = js('<div class="bttNewGame">Novo Jogo</div>');
    btt.on('click', function(){
      divMain.removeClass("active");
      setTimeout(function(){
        game.newGame();
      }, 300);
    });
    contant.append(btt);

    setTimeout(function(){
      divMain.addClass("active");
    }, 300);

    divMain.append(contant);
    self.element.append(divMain);
  }

  return main;
}(function(el){
  this.workspaceDom(el);
}));

var game = new UNO("#game"),
    home = new Home("#game"),
    GaOv = new GameOver("#game");

game.defineGameOver(function(a, b){
  GaOv.show(game, a, b);
});

game.players("Você", "Jogador 2", "Jogador 3", "Jogador 4");

home.show(game);