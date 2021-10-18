/**@license
Copyright 2015 Ismael Souza Silva.

Licenciado sob a Licença Apache, Versão 2.0 (the "License");
você não pode usar este arquivo, exceto em conformidade com a Licença.
Você pode obter uma cópia da Licença em

  http://www.apache.org/licenses/LICENSE-2.0

A menos que exigido por lei aplicável ou acordado por escrito, software
distribuído sob a Licença é distribuído em uma base "COMO ESTÁ",
SEM GARANTIAS OU CONDIÇÕES DE QUALQUER TIPO, expressas ou implícitas.
Veja a Licença para o idioma específico que governa as permissões e
limitações sob a licença.
*/

'use strict';
(function(isContainJS){
  try{
    if(typeof js != "function"){if(typeof js.type != "function"){js.type([]);}}
  }catch(e){
    if(e.message){
      isContainJS = false
      console.error("The JS library was not applied! The application of the library is necessary for a good functioning of the SGuide library. Obtain the library from this link: https://ismael1361.github.io/JS/js-1.1/src/JS.js");
    }
  }
  if(!isContainJS){return;}

  window.SGuide = (function(win, fn){
    var prot = fn.prototype = {};

    var styleCSS = [
      '::-webkit-scrollbar{height: 16px; overflow: visible; width: 16px;}',
      '::-webkit-scrollbar-corner{ background: transparent;}',
      '::-webkit-scrollbar-track { background-clip: padding-box; border: solid transparent; border-width: 0 0 0 4px; box-shadow: none; margin: 0 4px;}',
      '::-webkit-scrollbar-thumb{ background-clip: padding-box; min-height: 28px; padding: 100px 0 0; border-style: solid; border-color: transparent; border-width: 4px; background-color: rgba(97, 97, 97, .3); border-radius: 8px; box-shadow: none;}',
      '::-webkit-scrollbar-thumb:hover{ background-color: rgba(97, 97, 97, 1);}',
      '::-webkit-scrollbar-button{display:none; height: 0; width: 0;}',
      'html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video{margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;}',
      'article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}',
      'body{line-height:1; background: #fafafa; font-family: Arial,Verdana,Tahoma;}',
      'ol,ul{list-style:none}',
      'blockquote,q{quotes:none}',
      'blockquote:before,blockquote:after,q:before,q:after{content:\'\';content:none}',
      'table{border-collapse:collapse;border-spacing:0}',
      'textarea{resize: none;}',
      '.font-family-bold *{font-weight: 900;}',
      '.font-family-medium *{font-weight: 600;}',
      '.font-family-light *{font-weight: 200;}',
      'h1, h2, h3, h4, h5{margin-bottom: 10px;}',
      'h1{font: 700 48px/1.2 Arial,Verdana,Tahoma;}', 
      'h2{font: 700 32px/1.2 Arial,Verdana,Tahoma;}', 
      'h3{font: 700 24px/1.2 Arial,Verdana,Tahoma;}',
      'h4{font: 700 20px/1.2 Arial,Verdana,Tahoma;}',
      'h5, h6{font: 500 18px/1.2 Arial,Verdana,Tahoma;}',
      'h6{text-transform: uppercase;}',
      'strong{font-weight: bold;}',
      'em{font-style: italic;}',
      'a{display: inline; margin: 10px 30px 5px 0; border-bottom: 2px dashed; font-weight: 500; line-height: 2.5; cursor: pointer; color: var(--neutralShade600);}',
      'a:hover{color: var(--neutralShade800); border-bottom: 2px solid;}',
      'a.primary{color: var(--primaryShade800);}',
      'a.primary:hover{color: var(--primaryShade800);}',
      'a.secondary{color: var(--secondaryShade800);}',
      'a.secondary:hover{color: var(--secondaryShade800);}',
      'a.accent1{color: var(--accent1Shade800);}',
      'a.accent1:hover{color: var(--accent1Shade800);}',
      'a.accent2{color: var(--accent2Shade800);}',
      'a.accent2:hover{color: var(--accent2Shade800);}',
      'a.accent3{color: var(--accent3Shade800);}',
      'a.accent3:hover{color: var(--accent3Shade800);}',
      '.radius3{-webkit-border-radius: 3px; -moz-border-radius: 3px; -ms-border-radius: 3px; -o-border-radius: 3px; border-radius: 3px;}',
      '.radius5{-webkit-border-radius: 5px; -moz-border-radius: 5px; -ms-border-radius: 5px; -o-border-radius: 5px; border-radius: 5px;}',
      '.radius8{-webkit-border-radius: 8px; -moz-border-radius: 8px; -ms-border-radius: 8px; -o-border-radius: 8px; border-radius: 8px;}',
      '.radius10{-webkit-border-radius: 10px; -moz-border-radius: 10px; -ms-border-radius: 10px; -o-border-radius: 10px; border-radius: 10px;}',
      '.radius11{-webkit-border-radius: 11px; -moz-border-radius: 11px; -ms-border-radius: 11px; -o-border-radius: 11px; border-radius: 11px;}',
      '.radius15{-webkit-border-radius: 15px; -moz-border-radius: 15px; -ms-border-radius: 15px; -o-border-radius: 15px; border-radius: 15px;}',
      '.radius20{-webkit-border-radius: 20px; -moz-border-radius: 20px; -ms-border-radius: 20px; -o-border-radius: 20px; border-radius: 20px;}',
      '.radius50{-webkit-border-radius: 50%; -moz-border-radius: 50%; -ms-border-radius: 50%; -o-border-radius: 50%; border-radius: 50%;}',
      '.badge{display: inline-block; padding: 8px 15px; border-radius: 50px; font-size: 13px; font-weight: 600; text-transform: uppercase; margin: 5px 10px 5px 0; line-height: 1;}',
      '.badge.status-primary{background: var(--primaryShade100); color: var(--primaryShade800);}',
      '.badge.status-secondary{background: var(--secondaryShade100); color: var(--secondaryShade800);}',
      '.badge.status-info{background: var(--accent1Shade100); color: var(--accent1Shade800);}',
      '.badge.status-success{background: var(--accent2Shade100); color: var(--accent2Shade800);}',
      '.badge.status-error{background: var(--accent3Shade100); color: var(--accent3Shade800);}'
    ];

    var defineStyle = function(arr=[], s=document.createElement('style')){
      s = js(s);
      s.html(arr.join(' '));
      if(js.type(s.parent()) != "array"){
        js('head').append(s);
      };
      return s;
    }

    var shadowCSS = [
      ':root{',
      '--win2dp: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12);',
      '--win3dp: 0 3px 4px 0 rgba(0, 0, 0, .14), 0 3px 3px -2px rgba(0, 0, 0, .2), 0 1px 8px 0 rgba(0, 0, 0, .12);',
      '--win4dp: 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12), 0 2px 4px -1px rgba(0, 0, 0, .2);',
      '--win6dp: 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12), 0 3px 5px -1px rgba(0, 0, 0, .2);',
      '--win8dp: 0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12), 0 5px 5px -3px rgba(0, 0, 0, .2);',
      '--win16dp: 0 16px 24px 2px rgba(0, 0, 0, .14), 0 6px 30px 5px rgba(0, 0, 0, .12), 0 8px 10px -5px rgba(0, 0, 0, .2);',
      '--win24dp: 0 9px 46px 8px rgba(0, 0, 0, .14), 0 11px 15px -7px rgba(0, 0, 0, .12), 0 24px 38px 3px rgba(0, 0, 0, .2);',
      '}',
      '.win2dp{-webkit-box-shadow: var(--win2dp); -moz-box-shadow: var(--win2dp); -ms-box-shadow: var(--win2dp); -o-box-shadow: var(--win2dp);box-shadow: var(--win2dp);}',
      '.win3dp{-webkit-box-shadow: var(--win3dp); -moz-box-shadow: var(--win3dp); -ms-box-shadow: var(--win3dp); -o-box-shadow: var(--win3dp);box-shadow: var(--win3dp);}',
      '.win4dp{-webkit-box-shadow: var(--win4dp); -moz-box-shadow: var(--win4dp); -ms-box-shadow: var(--win4dp); -o-box-shadow: var(--win4dp);box-shadow: var(--win4dp);}',
      '.win6dp{-webkit-box-shadow: var(--win6dp); -moz-box-shadow: var(--win6dp); -ms-box-shadow: var(--win6dp); -o-box-shadow: var(--win6dp);box-shadow: var(--win6dp);}',
      '.win8dp{-webkit-box-shadow: var(--win8dp); -moz-box-shadow: var(--win8dp); -ms-box-shadow: var(--win8dp); -o-box-shadow: var(--win8dp);box-shadow: var(--win8dp);}',
      '.win16dp{-webkit-box-shadow: var(--win16dp); -moz-box-shadow: var(--win16dp); -ms-box-shadow: var(--win16dp); -o-box-shadow: var(--win16dp);box-shadow: var(--win16dp);}',
      '.win24dp{-webkit-box-shadow: var(--win24dp); -moz-box-shadow: var(--win24dp); -ms-box-shadow: var(--win24dp); -o-box-shadow: var(--win24dp);box-shadow: var(--win24dp);}'
    ];

    styleCSS = styleCSS.concat(shadowCSS);

    var defineColors = ["Blue", "DeepPurple", "Teal", "LightGreen", "Red", "Grey"], styleColorsVar = defineStyle();

    var palette = {
      "Red":{ "50":"#FFEBEE", "100":"#FFCDD2", "200":"#EF9A9A", "300":"#E57373", "400":"#EF5350", "500":"#F44336", "600":"#E53935", "700":"#D32F2F", "800":"#C62828", "900":"#B71C1C", "A100":"#FF8A80", "A200":"#FF5252", "A400":"#FF1744", "A700":"#D50000",
      },
      "Pink":{ "50":"#FCE4EC", "100":"#F8BBD0", "200":"#F48FB1", "300":"#F06292", "400":"#EC407A", "500":"#E91E63", "600":"#D81B60", "700":"#C2185B", "800":"#AD1457", "900":"#880E4F", "A100":"#FF80AB", "A200":"#FF4081", "A400":"#F50057", "A700":"#C51162",
      },
      "Purple":{ "50":"#F3E5F5", "100":"#E1BEE7", "200":"#CE93D8", "300":"#BA68C8", "400":"#AB47BC", "500":"#9C27B0", "600":"#8E24AA", "700":"#7B1FA2", "800":"#6A1B9A", "900":"#4A148C", "A100":"#EA80FC", "A200":"#E040FB", "A400":"#D500F9", "A700":"#AA00FF",
      },
      "DeepPurple":{ "50":"#EDE7F6", "100":"#D1C4E9", "200":"#B39DDB", "300":"#9575CD", "400":"#7E57C2", "500":"#673AB7", "600":"#5E35B1", "700":"#512DA8", "800":"#4527A0", "900":"#311B92", "A100":"#B388FF", "A200":"#7C4DFF", "A400":"#651FFF", "A700":"#6200EA",
      },
      "Indigo":{ "50":"#E8EAF6", "100":"#C5CAE9", "200":"#9FA8DA", "300":"#7986CB", "400":"#5C6BC0", "500":"#3F51B5", "600":"#3949AB", "700":"#303F9F", "800":"#283593", "900":"#1A237E", "A100":"#8C9EFF", "A200":"#536DFE", "A400":"#3D5AFE", "A700":"#304FFE",
      },
      "Blue":{ "50":"#E3F2FD", "100":"#BBDEFB", "200":"#90CAF9", "300":"#64B5F6", "400":"#42A5F5", "500":"#2196F3", "600":"#1E88E5", "700":"#1976D2", "800":"#1565C0", "900":"#0D47A1", "A100":"#82B1FF", "A200":"#448AFF", "A400":"#2979FF", "A700":"#2962FF",
      },
      "LightBlue":{ "50":"#E1F5FE", "100":"#B3E5FC", "200":"#81D4FA", "300":"#4FC3F7", "400":"#29B6F6", "500":"#03A9F4", "600":"#039BE5", "700":"#0288D1", "800":"#0277BD", "900":"#01579B", "A100":"#80D8FF", "A200":"#40C4FF", "A400":"#00B0FF", "A700":"#0091EA",
      },
      "Cyan":{ "50":"#E0F7FA", "100":"#B2EBF2", "200":"#80DEEA", "300":"#4DD0E1", "400":"#26C6DA", "500":"#00BCD4", "600":"#00ACC1", "700":"#0097A7", "800":"#00838F", "900":"#006064", "A100":"#84FFFF", "A200":"#18FFFF", "A400":"#00E5FF", "A700":"#00B8D4",
      },
      "Teal":{ "50":"#E0F2F1", "100":"#B2DFDB", "200":"#80CBC4", "300":"#4DB6AC", "400":"#26A69A", "500":"#009688", "600":"#00897B", "700":"#00796B", "800":"#00695C", "900":"#004D40", "A100":"#A7FFEB", "A200":"#64FFDA", "A400":"#1DE9B6", "A700":"#00BFA5",
      },
      "Green":{ "50":"#E8F5E9", "100":"#C8E6C9", "200":"#A5D6A7", "300":"#81C784", "400":"#66BB6A", "500":"#4CAF50", "600":"#43A047", "700":"#388E3C", "800":"#2E7D32", "900":"#1B5E20", "A100":"#B9F6CA", "A200":"#69F0AE", "A400":"#00E676", "A700":"#00C853",
      },
      "LightGreen":{ "50":"#F1F8E9", "100":"#DCEDC8", "200":"#C5E1A5", "300":"#AED581", "400":"#9CCC65", "500":"#8BC34A", "600":"#7CB342", "700":"#689F38", "800":"#558B2F", "900":"#33691E", "A100":"#CCFF90", "A200":"#B2FF59", "A400":"#76FF03", "A700":"#64DD17",
      },
      "Lime":{ "50":"#F9FBE7", "100":"#F0F4C3", "200":"#E6EE9C", "300":"#DCE775", "400":"#D4E157", "500":"#CDDC39", "600":"#C0CA33", "700":"#AFB42B", "800":"#9E9D24", "900":"#827717", "A100":"#F4FF81", "A200":"#EEFF41", "A400":"#C6FF00", "A700":"#AEEA00",
      },
      "Yellow":{ "50":"#FFFDE7", "100":"#FFF9C4", "200":"#FFF59D", "300":"#FFF176", "400":"#FFEE58", "500":"#FFEB3B", "600":"#FDD835", "700":"#FBC02D", "800":"#F9A825", "900":"#F57F17", "A100":"#FFFF8D", "A200":"#FFFF00", "A400":"#FFEA00", "A700":"#FFD600",
      },
      "Amber":{ "50":"#fff8e1", "100":"#ffecb3", "200":"#ffe082", "300":"#ffd54f", "400":"#ffca28", "500":"#ffc107", "600":"#ffb300", "700":"#ffa000", "800":"#ff8f00", "900":"#ff6f00", "A100":"#ffe57f", "A200":"#ffd740", "A400":"#ffc400", "A700":"#ffab00",
      },
      "Orange":{ "50":"#fff3e0", "100":"#ffe0b2", "200":"#ffcc80", "300":"#ffb74d", "400":"#ffa726", "500":"#ff9800", "600":"#fb8c00", "700":"#f57c00", "800":"#ef6c00", "900":"#e65100", "A100":"#ffd180", "A200":"#ffab40", "A400":"#ff9100", "A700":"#ff6d00",
      },
      "DeepOrange":{ "50":"#fbe9e7", "100":"#ffccbc", "200":"#ffab91", "300":"#ff8a65", "400":"#ff7043", "500":"#ff5722", "600":"#f4511e", "700":"#e64a19", "800":"#d84315", "900":"#bf360c", "A100":"#ff9e80", "A200":"#ff6e40", "A400":"#ff3d00", "A700":"#dd2c00",
      },
      "Brown":{ "50":"#efebe9", "100":"#d7ccc8", "200":"#bcaaa4", "300":"#a1887f", "400":"#8d6e63", "500":"#795548", "600":"#6d4c41", "700":"#5d4037", "800":"#4e342e", "900":"#3e2723",
      },
      "Grey":{ "50":"#fafafa", "100":"#f5f5f5", "200":"#eeeeee", "300":"#e0e0e0", "400":"#bdbdbd", "500":"#9e9e9e", "600":"#757575", "700":"#616161", "800":"#424242", "900":"#212121",
      },
      "BlueGrey":{ "50":"#eceff1", "100":"#cfd8dc", "200":"#b0bec5", "300":"#90a4ae", "400":"#78909c", "500":"#607d8b", "600":"#546e7a", "700":"#455a64", "800":"#37474f", "900":"#263238",
      }
    };

    prot.setColors = function(c=[]){
      var css = [":root{"], sl = ["primary", "secondary", "accent1", "accent2", "accent3", "neutral"];
      for(var i=0; i<defineColors.length; i++){
        var cs = i < defineColors.length-1 ? js.type(palette[c[i]]) == "object" ? palette[c[i]] : palette[defineColors[i]] : palette[defineColors[i]];
        css.push("--"+sl[i]+"Color: "+cs["500"]+";");
        for(var k in cs){
          css.push("--"+sl[i]+"Shade"+k+": "+cs[k]+";");
        }
      }
      css.push("}");
      defineStyle(css, styleColorsVar);
    }

    var observeDOM = (function(){
      var MO = window.MutationObserver || window.WebKitMutationObserver;
      return function(obj, callback){
        if(!obj || js.type(obj) != "object") return;
        if(MO){
          var obs = new MO(function(mutations, observer){callback(mutations);})
          obs.observe(obj, {childList:true, subtree:true});
        }else if(window.addEventListener){
          obj.addEventListener('DOMNodeInserted', callback, false);
          obj.addEventListener('DOMNodeRemoved', callback, false);
        }
      }
    })();

    var components = {};

    styleCSS = styleCSS.concat([
      'button{font-size: 14px; color: var(--neutralShade800); background-color: #FFF; transition: all .2s ease-in-out; display: inline-block; padding: 0 26px; margin: 6px 4px; border: none; border-radius: 4px; cursor: pointer; touch-action: manipulation; text-align: center; line-height: 36px; vertical-align: middle; white-space: nowrap; user-select: none; font-family: inherit; letter-spacing: 1px; position: relative; overflow: hidden;}',
      'button.btn_fab{box-shadow: var(--win3dp); position: relative; padding: 0; width: 55px; height: 55px; line-height: 55px; border-radius: 50%; z-index: 1;}',
      'button:disabled{cursor: not-allowed; pointer-events: none; opacity: .6; -webkit-box-shadow: none; box-shadow: none;}',
      'button:hover{box-shadow: var(--win3dp); opacity: 0.9;}',
      'button:active{box-shadow: var(--win2dp); opacity: 0.9;}',      
      'button:active, button:focus, button:hover{outline: 0; text-decoration: none;}',
      'button .ripple{position: absolute; top: 0; left: 0; border-radius: 50%; opacity: 0; background-color: #000000; pointer-events: none; transform: scale(.0001,.0001);}',
      'button .ripple.animating{transform: none; transition: width .3s cubic-bezier(0,0,.2,1),height .3s cubic-bezier(0,0,.2,1),opacity .3s cubic-bezier(0,0,.2,1),-webkit-transform .3s cubic-bezier(0,0,.2,1);}',
      'button .ripple.visible{opacity: .2;}',
      'button.btn_flat:active, button.btn_flat:focus, button.btn_flat:hover{box-shadow: none; background-color: rgba(0, 0, 0, 0.08) !important;}',
      'button.btn_radius{border-radius: 20px;}',
      'button{color: #FFF; background-color: var(--neutralColor);}',
      'button.btn_flat{color: var(--neutralColor); background-color: #FFF;}',
      'button.primary{color: #FFF; background-color: var(--primaryColor);}',
      'button.btn_flat.primary{color: var(--primaryColor); background-color: #FFF;}',
      'button.secondary{color: #FFF; background-color: var(--secondaryColor);}',
      'button.btn_flat.secondary{color: var(--secondaryColor); background-color: #FFF;}',
      'button.accent1{color: #FFF; background-color: var(--accent1Color);}',
      'button.btn_flat.accent1{color: var(--accent1Color); background-color: #FFF;}',
      'button.accent2{color: #FFF; background-color: var(--accent2Color);}',
      'button.btn_flat.accent2{color: var(--accent2Color); background-color: #FFF;}',
      'button.accent3{color: #FFF; background-color: var(--accent3Color);}',
      'button.btn_flat.accent3{color: var(--accent3Color); background-color: #FFF;}'
    ]);

    components.button = (function(){
      var fn = function(d){
        this.dom = js(d);
        if(this.isValid() == false){return;}

        this.dom.on("mousedown", function(t){
          var a = this, b = a._rippleEl;
          if(!a.disabled){
            if(!b){
              var span = js("<span class=\"ripple\"></span>");
              js(a).append(span);
              b = a._rippleEl = span;
            }
            var c, d,
                e = js(a).offset(),
                s = js(a).getSize(),
                f = "touchstart" === t.type ? t.touches[0] : t;
                d = 2 * (c = Math.sqrt(s.height * s.height + s.width * s.width)) + "px";
            b.css({
              'width': d,
              'height': d,
              'top': (Math.round(f.pageY - e.top - c) + "px"),
              'left': (Math.round(f.pageX - e.left - c) + "px")
            });
            
            b.removeClass("animating");
            b.addClass("visible");
            
            setTimeout(function(){
                b.addClass("animating");
                setTimeout(function(){
                  b.removeClass("visible");
                }, 200);
            }, 20);
          }
        });
      };

      var prototype = fn.prototype = {};
      prototype.isValid = function(){return String(this.dom[0].tagName).toLocaleLowerCase() === "button";}

      return function(d){return new fn(d);};
    }());

    styleCSS = styleCSS.concat([
      'div.__input{position: relative; margin: 25px 0 0;}',
      'div.__input > input, div.__input > textarea{background: none; color: var(--neutralShade800); font-size: 18px; padding: 6px 10px 5px 8px; display: block; width: 100%; border: none; border-radius: 0; border-bottom: 1px solid var(--neutralShade800); box-sizing: border-box; background: rgba(0, 0, 0, .05); border-radius: 5px 5px 0 0;}',
      'div.__input > input:focus, div.__input > textarea:focus{outline: none;}',
      'div.__input > input[type="password"]{letter-spacing: 0.3em;}',
      'div.__input > label{color: var(--neutralShade800); font-size: 16px; font-weight: normal; position: absolute; pointer-events: none; left: 8px; top: 9px; transition: 300ms ease all;}',
      'div.__input > .bar{height: 2px; width: auto; bottom: 0px; position: absolute; background: var(--primaryColor); transition: 400ms ease all; left: 0; right: 100%;}',
      'div.__input > input:disabled, div.__input > textarea:disabled, div.__input > input:disabled ~ label, div.__input > textarea:disabled ~ label, div.__input > input:disabled ~ .bar, div.__input > textarea:disabled ~ .bar{opacity: 0.4;}',
      'div.__input.active > label{top: -15px; left: 5px; font-size: 12px; color: var(--primaryColor);}',
      'div.__input.active > .bar{right: 0%;}',
      'div.__input > input:invalid, div.__input > textarea:invalid{border-bottom: 1px solid var(--accent3Shade400);}',
      'div.__input > input:invalid ~ label, div.__input > textarea:invalid ~ label{color: var(--accent3Color);}',
      'div.__input > input:invalid ~ .bar, div.__input > textarea:invalid ~ .bar{background: var(--accent3Color);}',
    ]);

    components.input = (function(){
      var fn = function(d){
        this.dom = js(d);
        if(this.isValid() == false || this.dom.parent()[0].isInput == true){return;}

        var div = js('<div class="__input"></div>');
        div[0].isInput = true;
        div.insertAfter(this.dom);
        div.append(this.dom);
        var label = this.dom.attr("label");
        label = typeof label == "string" ? label : "";
        div.append('<div class="bar"></div><label>'+label+'</label>');

        var divParent = this.dom.parent();

        this.dom.on("mousedown", function(){
          if(this.disabled){return;}
          divParent.addClass("active");
        });

        this.dom.on("focusout", function(){
          if(this.disabled || this.value.length > 0){return;}
          divParent.removeClass("active");
        });
      }

      var prototype = fn.prototype = {};
      prototype.isValid = function(){
        var isValid = String(this.dom[0].tagName).toLocaleLowerCase() === "input", type = isValid ? String(this.dom.attr("type")).toLocaleLowerCase() : null, typeList = ["text", "email", "number", "password", "hidden", "search", "tel", "url"], isValidType = false;
        
        for(var i=0; i<typeList.length; i++){if(type == typeList[i]){isValidType = true; break;}}
        return (isValid && isValidType) || String(this.dom[0].tagName).toLocaleLowerCase() === "textarea";
      }

      return function(d){return new fn(d);};
    }());

    styleCSS = styleCSS.concat([
      'div.__select{position: relative; margin: 25px 0 0;}',
      'div.__select > select{display: none;}',
      'div.__select > .selected > .value{background: none; color: var(--neutralShade800); font-size: 18px; padding: 6px 10px 5px 8px; display: block; width: 100%; border: none; border-radius: 0; border-bottom: 1px solid var(--neutralShade800); box-sizing: border-box; user-select: none; cursor: pointer; height: 33px; background: rgba(0, 0, 0, .05); border-radius: 5px 5px 0 0;}',
      'div.__select > .selected > .value::before{content: ""; position: absolute; top: 50%; transform: translate(0, -50%); right: 6px; width: 0; height: 0; border-left: 7px solid transparent; border-right: 7px solid transparent; border-top: 7px solid var(--neutralShade800); display: none;}',
      'div.__select > .selected > .indicatorContainer{position: absolute; top: 50%; transform: translate(0, -50%); right: 6px; width: 20px; height: 20px;}',
      'div.__select > .selected > .indicatorContainer > svg{fill: var(--neutralShade600);}',
      'div.__select > label{color: var(--neutralShade800); font-size: 16px; font-weight: normal; position: absolute; pointer-events: none; left: 8px; top: 9px; transition: 300ms ease all;}',
      'div.__select > .bar{height: 2px; width: auto; bottom: 0px; position: absolute; background: var(--primaryColor); transition: 400ms ease all; left: 0; right: 100%;}',
      'div.__select.active > label{top: -15px; left: 5px; font-size: 12px; color: var(--primaryColor);}',
      'div.__select.active > .bar{right: 0%;}',
      'div.__select.active > .selected > .value::before{border-top-color: var(--primaryColor);}',
      'div.__select.active > .selected > .indicatorContainer > svg{fill: var(--neutralShade800);}',
      'div.__select > .selected > .options{position: absolute; z-index: 10; margin: 0; padding: 4px 0; box-shadow: var(--win6dp); border-radius: 0 0 15px 15px; background: #ffffff; text-align: left; width: 100%; margin-bottom: 15px; height: 0; opacity: 0; overflow: hidden; pointer-events: none; transition: 300ms ease all;}',
      'div.__select > .selected > .options.active{height: auto; max-height: 20em; opacity: 1; pointer-events: all;}',
      'div.__select > .selected > .options > div{position: relative; margin: 0 4px; padding: 4px 10px; border-radius: 15px; white-space: pre; cursor: pointer; min-height: 24px; box-sizing: border-box;}',
      'div.__select > .selected > .options > div.opSelected{background: var(--neutralShade200);}',
      'div.__select > .selected > .options > div:hover{background: var(--primaryColor); color: white;}'
    ]);

    components.select = (function(){
      var fn = function(d){
        this.dom = js(d);
        if(this.isValid() == false || this.dom.parent()[0].isSelect == true){return;}

        var div = js('<div class="__select"></div>');
        div[0].isSelect = true;
        div.insertAfter(this.dom);
        div.append(this.dom);
        var label = this.dom.attr("label");
        label = typeof label == "string" ? label : "";
        div.append('<div class="selected"><span class="value"></span><div class="indicatorContainer"></div><div class="options"></div></div><div class="bar"></div><label>'+label+'</label>');

        div.find('div.selected > div.indicatorContainer').html('<svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" class="css-19bqh2r"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>');

        var self = this;
        var validValue = function(){
          if(self.dom.val().length > 0 || div.find('.selected > .value').html().length > 0){
            div.addClass("active");
          }else{
            div.removeClass("active");
          }
        }

        var updateList = function(){
          var op = div.find('.selected > .options');
          op.html("");
          self.dom.find('option').each(function(a){
            var s = js(this), t = self.dom.val() == s.attr("value");
            if(t){
              div.find('.selected > .value').html(s.html()); 
              validValue();
            }
            var opS = js('<div '+(t ? 'class="opSelected" ' : '')+'data-value="'+s.attr("value")+'">'+s.html()+'</div>');
            op.append(opS);
            opS.on("mousedown", function(){
              self.dom.val(js(this).attr("data-value"));
              div.find('.selected > .value').html(s.html()); 
              validValue();
              self.dom.triggerEvent("change");
            });
          });
        }

        updateList();

        var displayOptions = function(t){
          var op = div.find('.selected > .options');
          var t = typeof t == "boolean" ? t : !(op.hasClass("active") == true);
          if(t){
            var height = 0;
            op.find('div').each(function(a){
              height += js(this).getSize().height;
            });
            op.css("height", height+"px");
            op.addClass("active");
            setTimeout(function(){
              op.css("overflow-y", "auto");
            }, 300);
          }else{
            op.css({
              "height": "0px",
              "overflow-y": "hidden"
            });
            op.removeClass("active");
          }
        }

        div.on("mousedown", function(){
          updateList();
          displayOptions();
        });

        js(document.body).on("mousedown", function(e){
          if((js(e.target).getAllPath()).search(div.getAllPath()) < 0){
            displayOptions(false);
          }
        });
      }

      var prototype = fn.prototype = {};
      prototype.isValid = function(){return String(this.dom[0].tagName).toLocaleLowerCase() === "select"}

      return function(d){return new fn(d);};
    }());

    styleCSS = styleCSS.concat([
      'div.__checkbox{position: relative; font-size: 14px; color: var(--neutralShade800); user-select: none; display: inline-block;}',
      'div.__checkbox input ~ *{cursor: pointer;}',
      'div.__checkbox input:disabled ~ *{cursor: initial;}',
      'div.__checkbox > .input-checkbox{position: relative; display: inline-block; width: 32px; height: 32px; text-align: center; vertical-align: -10px; margin: 0px 10px 0px 0px;}',
      'div.__checkbox input:disabled ~ .input-checkbox{opacity: .6; -webkit-box-shadow: none; box-shadow: none;}',
      'div.__checkbox > .input-checkbox > .check::before{content: \'\'; position: absolute; top: 50%; left: 50%; width: 16px; height: 16px; border-radius: 3px; border: solid 2px var(--neutralColor); z-index: 1; background-color: transparent; transition: 300ms ease all; transform: translate(-50%, -50%);}',
      'div.__checkbox input:checked ~ .input-checkbox > .check::before{border-color: var(--accent1Color); background-color: var(--accent1Color); background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAAH9JREFUSMftkr0JgFAMhA9xG5dwCH8K3cNKtHQTR7RQ+GwsgogoLzbyrkzId8kRKSrqjYDsS3gBrMBk64kXXNIsKZW0fLU5wBDh4XCgB6qbfm3g41t4fgyuVyZBcAPpDsAGNKZeumV+Mmld4cZkNHGFxfLgEv9XPF3iu3nUv7QDdzzolivrh8EAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDQtMTRUMjA6NTg6NTQrMDA6MDBGhPGFAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTA0LTE0VDIwOjU4OjU0KzAwOjAwN9lJOQAAACh0RVh0c3ZnOmJhc2UtdXJpAGZpbGU6Ly8vdG1wL21hZ2ljay00OEVJeUI5Wlk7kzIAAAAASUVORK5CYII=\'); background-repeat: no-repeat; background-position: center; background-size: contain;}',
      'div.__checkbox > .input-checkbox.box_circle > .check::before{background-image: none; border-radius: 50%; background-color: var(--neutralColor);}',
      'div.__checkbox input:checked ~ .input-checkbox.box_circle > .check::before{background-image: none;}',
      'div.__checkbox > .input-checkbox.box_circle > .check::after{content: \'\'; position: absolute; top: 50%; left: 50%; width: 8px; height: 8px; border-radius: 50%; background-color: #ffffff; z-index: 1; transform: translate(-50%, -50%); opacity: 0; transition: 300ms ease all;}',
      'div.__checkbox input:checked ~ .input-checkbox.box_circle > .check::after{opacity: 1;}',
      'div.__checkbox > .input-checkbox > .ripple{position: absolute; top: 50%; left: 50%; width: 21px; height: 21px; border-radius: 50%; opacity: 0; background-color: #000000; pointer-events: none; transform: translate(-50%, -50%) scale(.0001,.0001);}',
      'div.__checkbox input:disabled:checked ~ .input-checkbox > .check::before{border-color: var(--neutralColor); background-color: var(--neutralColor);}',
      'div.__checkbox > .input-checkbox > .ripple.animating{transform: translate(-50%, -50%) scale(2); transition: width .3s cubic-bezier(0,0,.2,1),height .3s cubic-bezier(0,0,.2,1),opacity .3s cubic-bezier(0,0,.2,1),-webkit-transform .3s cubic-bezier(0,0,.2,1);}',
      'div.__checkbox > .input-checkbox > .ripple.visible{opacity: .13;}',
      'div.__checkbox input{visibility: hidden; position: absolute; left: 7px; bottom: 7px; margin: 0; padding: 0; outline: none; cursor: pointer; opacity: 0;}',
      'div.__checkbox > label{cursor: inherit;}'
    ]);

    components.checkbox = (function(){
      var fn = function(d){
        this.dom = js(d);
        if(this.isValid() == false || this.dom.parent()[0].isCheckbox == true){return;}

        var div = js('<div class="__checkbox"></div>');
        div[0].isCheckbox = true;
        div.insertAfter(this.dom);
        div.append(this.dom);
        var label = this.dom.attr("label");
        label = typeof label == "string" ? label : "";
        div.append('<div class="input-checkbox'+(String(this.dom.attr('type')).toLocaleLowerCase() == "radio" ? ' box_circle' : '')+'"><span class="check"></span><span class="ripple"></span></div><label>'+label+'</label>');

        var self = this, a = self.dom[0];
        div.on("mouseup", function(){
          self.dom.triggerEvent("mouseup");
        });
        div.on("mousedown", function(){
          if(a.disabled){return;}
          if(a.checked == true){
            a.checked = false;
          }else{
            a.checked = true;
          }
          
          self.dom.triggerEvent("mousedown");
          self.dom.triggerEvent("click");
          self.dom.triggerEvent("blur");
          self.dom.triggerEvent("focus");

          var c = div.find('.input-checkbox > .ripple');
          c.removeClass("animating");
          c.addClass("visible");

          setTimeout(function(){
            c.addClass("animating");
            setTimeout(function(){
              c.removeClass("visible");
            }, 200);
          }, 20);
        });
      }

      var prototype = fn.prototype = {};
      prototype.isValid = function(){return String(this.dom[0].tagName).toLocaleLowerCase() === "input" && (String(this.dom.attr('type')).toLocaleLowerCase() == "checkbox" || String(this.dom.attr('type')).toLocaleLowerCase() == "radio")}

      return function(d){return new fn(d);};
    }());

    styleCSS = styleCSS.concat([
      'div.__switch{position: relative; font-size: 14px; color: var(--neutralShade800); user-select: none; padding: 8px 45px 8px 5px;}',
      'div.__switch input{display: none;}',
      'div.__switch input ~ *{cursor: pointer;}',
      'div.__switch > .slider{position: absolute; top: 50%; transform: translate(0px, -50%); right: 5px; background-color: var(--neutralShade400); height: 16px; width: 34px; border-radius: 15px; transition: 300ms ease all;}',
      'div.__switch > .slider > .check{position: absolute; height: 20px; width: 20px; left: 0; transform: translateX(-2px); right: auto; bottom: -2px; background-color: white; transition: 300ms ease all; border-radius: 50%; box-shadow: var(--win3dp);}',
      'div.__switch input:checked ~ .slider{background-color: var(--accent1Shade200);}',
      'div.__switch input:checked ~ .slider > .check{left: 100%; transform: translateX(-18px); background-color: var(--accent1Color);}',
      'div.__switch input:disabled ~ .slider{opacity: .6;}',
      'div.__switch input:disabled ~ *{cursor: initial;}',
      'div.__switch > .slider > .check > .ripple{position: absolute; top: 50%; left: 50%; width: 21px; height: 21px; border-radius: 50%; opacity: 0; background-color: #000000; pointer-events: none; transform: translate(-50%, -50%) scale(.0001,.0001);}',
      'div.__switch > .slider > .check > .ripple.animating{transform: translate(-50%, -50%) scale(2); transition: width .3s cubic-bezier(0,0,.2,1),height .3s cubic-bezier(0,0,.2,1),opacity .3s cubic-bezier(0,0,.2,1),-webkit-transform .3s cubic-bezier(0,0,.2,1);}',
      'div.__switch > .slider > .check > .ripple.visible{opacity: .13;}'
    ]);

    components.switch = (function(){
      var fn = function(d){
        this.dom = js(d);
        if(this.isValid() == false || this.dom.parent()[0].isSwitch == true){return;}

        this.dom.attr('type', 'checkbox');
        var div = js('<div class="__switch"></div>');
        div[0].isSwitch = true;
        div[0].isCheckbox = true;
        div.insertAfter(this.dom);
        div.append(this.dom);
        var label = this.dom.attr("label");
        label = typeof label == "string" ? label : "";
        div.append('<label>'+label+'</label><div class="slider"><span class="check"><span class="ripple"></span></span></div>');

        var self = this, a = self.dom[0];
        div.on("mouseup", function(){
          self.dom.triggerEvent("mouseup");
        });
        div.on("mousedown", function(){
          if(a.disabled){return;}
          if(a.checked == true){
            a.checked = false;
          }else{
            a.checked = true;
          }

          self.dom.triggerEvent("mousedown");
          self.dom.triggerEvent("click");
          self.dom.triggerEvent("blur");
          self.dom.triggerEvent("focus");

          var c = div.find('.slider > .check > .ripple');
          c.removeClass("animating");
          c.addClass("visible");

          setTimeout(function(){
            c.addClass("animating");
            setTimeout(function(){
              c.removeClass("visible");
            }, 200);
          }, 20);
        });
      }

      var prototype = fn.prototype = {};
      prototype.isValid = function(){return String(this.dom[0].tagName).toLocaleLowerCase() === "input" && String(this.dom.attr('type')).toLocaleLowerCase() == "switch"}

      return function(d){return new fn(d);};
    }());

    styleCSS = styleCSS.concat([
      '.__sliderRange{position: relative; font-size: 14px; color: var(--neutralShade800); user-select: none; padding: 0px 20px;}',
      '.__sliderRange input{display: none;}',
      '.__sliderRange > .root{position: relative; cursor: pointer; padding: 15px 0;}',
      '.__sliderRange > .root.marked{margin-bottom: 24px;}',
      '.__sliderRange > .root > .rail{position: relative; width: 100%; height: 2px; background-color: var(--primaryShade100);}',
      '.__sliderRange > .root > .rail > .track{height: 2px; display: block; position: absolute; top: 0px; border-radius: 1px; background: var(--primaryColor);}',
      '.__sliderRange > .root > .rail > .thumb{width: 12px; height: 12px; display: flex; outline: none; position: absolute; box-sizing: border-box; margin-top: -5px; align-items: center; margin-left: -6px; border-radius: 50%; justify-content: center; background-color: var(--primaryShade500); z-index: 1;}',
      '.__sliderRange > .root > .rail > .thumb *{transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;}',
      '.__sliderRange > .root > .rail > .thumb > .ripple{position: absolute; width: 0px; height: 0px; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: var(--primaryShade500); opacity: 0; border-radius: 50%;}',
      '.__sliderRange > .root > .rail > .thumb:hover > .ripple{width: 28px; height: 28px; opacity: .2;}',
      '.__sliderRange > .root.active > .rail > .thumb > .ripple{width: 35px; height: 35px; opacity: .2;}',
      '.__sliderRange > .root > .rail > .thumb > .valueLabel{top: -34px; left: calc(-50% + -4px); z-index: 3; position: absolute; font-size: 0.75rem; transform: scale(0) translateY(-0%); font-weight: 400; line-height: 1.2; letter-spacing: 0.01071em; transform-origin: bottom center;}',
      '.__sliderRange > .root > .rail > .thumb > .valueLabel > .background{width: 32px; height: 32px; display: flex; transform: rotate(-45deg); align-items: center; border-radius: 50% 50% 50% 0; justify-content: center; background-color: var(--primaryShade500);}',
      '.__sliderRange > .root > .rail > .thumb > .valueLabel > .background > .label{color: #fff; transform: rotate(45deg);}',
      '.__sliderRange > .root.active > .rail > .thumb > .valueLabel, .__sliderRange > .root > .rail > .thumb > .valueLabel.activePermanent, .__sliderRange > .root > .rail > .thumb:hover > .valueLabel{transform: scale(1) translateY(-10px);}',
      '.__sliderRange > .root > .rail > .markIndicador{width: 2px; height: 2px; position: absolute; top: 0px; border-radius: 1px; background-color: var(--primaryShade500); z-index: 0;}',
      '.__sliderRange > .root > .rail > .markIndicador.active{background-color: var(--primaryShade100);}',
      '.__sliderRange > .root > .rail > .markLabel{top: 8px; color: var(--neutralShade800); opacity: .7; position: absolute; font-size: 0.875rem; transform: translateX(-50%); font-family: "Roboto", "Helvetica", "Arial", sans-serif; font-weight: 400; line-height: 1.43; white-space: nowrap; letter-spacing: 0.01071em;}',
      '.__sliderRange > .root > .rail > .markLabel.active{opacity: 1;}'
    ]);

    components.range = (function(){
      var fn = function(d){
        this.dom = js(d);
        if(this.isValid() == false || this.dom.parent()[0].isRange == true){return;}

        var div = js('<div class="__sliderRange"></div>');
        div[0].isRange = true;
        div.insertAfter(this.dom);
        div.append(this.dom);

        var isValueLabelDisplay = typeof this.dom.attr("valuelabeldisplay") == "string" ? String(this.dom.attr("valuelabeldisplay")).toLocaleLowerCase() : '';

        var min = typeof this.dom.attr("min") == "string" ? Number(this.dom.attr("min")) : 0;
        var max = typeof this.dom.attr("max") == "string" ? Number(this.dom.attr("max")) : 100;

        if(min > max){var temp = max; max = min; min = temp;}

        var value = typeof this.dom.attr("value") == "string" ? Number(this.dom.attr("value")) : min;

        var step = typeof this.dom.attr("step") == "string" ? String(this.dom.attr("step")).toLocaleLowerCase() == "mark" ? 'mark' : Number(this.dom.attr("step")) : null;

        var marks = typeof this.dom.attr("marks") == "string" ? this.dom.attr("marks") : null;
        if(marks != null){
          marks = String(marks).split(',');
          marks.forEach(function(a, b){marks[b] = Number(String(a).replace(/[a-z]/gi, '').replace(/^\s+/gi, '').replace(/\s+$/gi, ''))});
        }

        var valuetext = typeof this.dom.attr("valuetext") == "string" ? this.dom.attr("valuetext") : '{value}';

        var valueToPercent = function(val){
          val = typeof val == "number" ? val < min ? min : val > max ? max : val : min;
          var total = min < 0 ? Math.abs(min)+max : max-min;
          val = min < 0 ? Math.abs(min)+val : val-min;
          return val/total*100;
        }

        div.append('<div class="root'+(marks != null?' marked':'')+'"><div class="rail"><div class="track"></div><span class="thumb">'+(isValueLabelDisplay == "auto" || isValueLabelDisplay == "on" ? '<span class="valueLabel'+(isValueLabelDisplay == "on"?' activePermanent':'')+'"><span class="background"><span class="label">0</span></span></span>' : '')+'<span class="ripple"></span></span></div></div>');

        if(marks != null){
          for(var i=0; i<marks.length; i++){
            var val = marks[i], p = valueToPercent(val), label = valuetext.replace(/\{value\}/gi, val);
            div.find('.root > .rail').append('<span class="markIndicador" style="left:'+p+'%"></span><div class="markLabel" style="left:'+p+'%">'+label+'</div>');

            marks[i] = {
              percentage: p,
              val: val,
              markIndicador: div.find('.root > .rail > .markIndicador').getItem(i),
              markLabel:  div.find('.root > .rail > .markLabel').getItem(i)
            };
          }
        }

        var self = this, a = self.dom[0];

        div.find('.root')[0].min = min;
        div.find('.root')[0].max = max;

        div.find('.root')[0].active = function(t){
          var b = div.find('.root');
          t = typeof t == "boolean" ? t : b.hasClass("active") == true ? false : true;
          if(t){
            b.addClass("active");
          }else{
            b.removeClass("active");
          }
        }

        div.find('.root')[0].moveTo = function(start, end){
          start = typeof start == "number" ? start : this.min;
          end = typeof end == "number" ? end : this.max;

          var total = this.min < 0 ? Math.abs(this.min)+this.max : this.max-this.min;

          var _self = this, toFixed = function(a, b){b = typeof b == "number" ? b : 1; a = a.toFixed(b); return Number(a.split('.')[1] == '0' ? a.split('.')[0] : a);},
          toValue = function(a, b){a = total*(a/100); a = _self.min < 0 ? a - Math.abs(_self.min) : a + _self.min; return toFixed(a, b);}

          var valStart = toValue(start), valEnd = toValue(end);

          end = 100 - end;

          div.find('.root > .rail > .thumb').css({"right": end+"%"});
          div.find('.root > .rail > .track').css({"left": start+"%", "right": end+"%"});

          if(isValueLabelDisplay){
            div.find('.root > .rail > .thumb > .valueLabel > .background > .label').html(valEnd);
          }
          self.dom.val(valEnd);
        }

        div.find('.root')[0].value = function(valStart, valEnd){
          valStart = typeof valStart == "number" ? valStart < this.min ? this.min : valStart > this.max ? this.max : valStart : this.min;
          valEnd = typeof valEnd == "number" ? valEnd < this.min ? this.min : valEnd > this.max ? this.max : valEnd : this.min;

          valStart = 0;

          if(typeof step == "number"){
            valEnd = valEnd%step >= step/2 ? valEnd+(step-(valEnd%step)) : valEnd-(valEnd%step);
          }else if(step == 'mark' && marks != null){
              for(var i=0; i<marks.length-1; i++){
                var s = marks[i], e = marks[i+1];
                if(valEnd < e.val && valEnd >= s.val){
                  var sp = (e.val-s.val);
                  valEnd = (valEnd-s.val) >= sp/2 ? valEnd+(sp-(valEnd-s.val)) : valEnd-(valEnd-s.val);
                  break;
                }
              }
          }

          if(isValueLabelDisplay){
            div.find('.root > .rail > .thumb > .valueLabel > .background > .label').html(valEnd);
          }
          self.dom.val(valEnd);

          var total = this.min < 0 ? Math.abs(this.min)+this.max : this.max-this.min;

          var start = (this.min < 0 ? Math.abs(this.min)+valStart : valStart-this.min)/total*100;
          var end = (this.min < 0 ? Math.abs(this.min)+valEnd : valEnd-this.min)/total*100;

          div.find('.root > .rail > .thumb').css({"left": end+"%"});

          if(valStart > valEnd){
            div.find('.root > .rail > .track').css({"left": end+"%", "right": (100 - start)+"%"});
          }else{
            div.find('.root > .rail > .track').css({"left": start+"%", "right": (100 - end)+"%"});
          }

          if(marks != null){
            for(var i=0; i<marks.length; i++){
              var s = marks[i];
              if(s.percentage <= end && s.percentage >= start){
                s.markIndicador.addClass('active');
                s.markLabel.addClass('active');
              }else{
                s.markIndicador.removeClass('active');
                s.markLabel.removeClass('active');
              }
            }
          }
        }

        div.find('.root')[0].value(0, value);

        div.find('.root')[0].percentToValue = function(start, end){
          start = typeof start == "number" ? start > 100 ? 100 : start < 0 ? 0 : start : 0;
          end = typeof end == "number" ? end > 100 ? 100 : end < 0 ? 0 : end : 100;

          var total = this.min < 0 ? Math.abs(this.min)+this.max : this.max-this.min;

          var _self = this, toFixed = function(a, b){b = typeof b == "number" ? b : 1; a = a.toFixed(b); return Math.round(Number(a.split('.')[1] == '0' ? a.split('.')[0] : a));},
          toValue = function(a, b){a = total*(a/100); a = _self.min < 0 ? a - Math.abs(_self.min) : a + _self.min; return toFixed(a, b);}

          this.value(toValue(start), toValue(end));
        }

        var allEvent = function(){
          self.dom.triggerEvent("input");
          self.dom.triggerEvent("change");
        }

        div.find('.root')[0].mutation = function(e){
          if(a.disabled || this.ranged != true){return;}
          if(e.type.search("touch") >= 0){e.pageX = e.touches[0].pageX; e.pageY = e.touches[0].pageY;};
          var b = div.offset(), d = div.getSize(), c = e.pageX-b.left;
          c = (c > d.width ? d.width : c < 0 ? 0 : c);
          this.percentToValue(0, Math.round((c/d.width)*100));
          var out = Math.round(e.pageY - b.top);
          if(out >= d.height || out < 0){this.ranged = false;}
          allEvent();
        }

        var move = function(e){this.mutation(e);},
            down = function(e){this.ranged = true; this.mutation(e); this.active(true); allEvent();},
            up = function(){this.ranged = false; this.active(false); allEvent();};

        div.find('.root').on("mousemove", move);
        div.find('.root').on("touchmove", move);
        div.find('.root').on("mousedown", down);
        div.find('.root').on("touchstart", down);
        div.find('.root').on("mouseup", up);
        div.find('.root').on("touchend", up);
      }

      var prototype = fn.prototype = {};
      prototype.isValid = function(){return String(this.dom[0].tagName).toLocaleLowerCase() === "input" && String(this.dom.attr('type')).toLocaleLowerCase() == "range"}

      return function(d){return new fn(d);};
    }());

    observeDOM(document, function(m){
      //var newsNodes = [];
      m.forEach(function(a){
        a.addedNodes.forEach(function(b){
          //newsNodes.push(b); 
          for(var i in components){
            components[i](b);
          }
        });
      });
    });

    prot.setColors();
    defineStyle(styleCSS);
    return fn;
  }(window, function(){
  
  }));
}(true));