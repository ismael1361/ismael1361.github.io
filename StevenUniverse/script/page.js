var Page = (function(fn){
  var prototype = fn.prototype = {};

  prototype.transitionOlt = function(callback){
    this.mainWiki.removeClass("displayBlock");
    this.mainImage.removeClass("displayBlock");
    setTimeout(callback, 1000);
  }
  
  prototype.transitionIn = function(){
    this.mainWiki.addClass("displayBlock");
    this.mainImage.addClass("displayBlock");
  }

  prototype.open = function(op){
    var self = this;
    this.transitionOlt(function(){
      var info = self.mainWiki.find(".info");
      info.find("h1").html(op.title);
      info.find("p").html(op.wiki);
      self.mainImage.find(".img").css({"background-image": "url('./src/img/"+op.img+"')"});
      self.mainImage.find(".before > svg").getDom().setAttributeNS(null, "style", "fill: "+op.colors[0]+";");
      self.mainImage.find(".after > svg").getDom().setAttributeNS(null, "style", "fill: "+op.colors[1]+";");
      setTimeout(function(){self.transitionIn();}, 500);
    });
  }

  return fn;
}(function(wiki, image){
  this.mainWiki = wiki;
  this.mainImage = image;
}));