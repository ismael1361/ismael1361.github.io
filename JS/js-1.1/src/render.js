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
(function(win, Render){
    if(!win.isJS)throw new Error("It is necessary to include the JS (version - 1.1 ~ higher) library for the Render to work!");
    var version = "1.1";
    if("object" == typeof module && "object" == typeof module.exports){
        if(module.exports = win.document){
        module.exports = Render(win, version, !0);
        }else{
        module.exports = function(a){
            if(!a.document)throw new Error("Render requires a window with a document!");
            return Render(a, version);
        }
        }
    }else{
        Render(win, version);
    }
}("undefined"!=typeof window ? window : this, function(win, version, noGlobal){
    var Render = function(selector){return new fn.init(selector);}
    var fn = Render.prototype = {};

    fn.init = function(){
        
    }

    Render.history = function(){
        var state = win.history.state && js.isJson(win.history.state) ? win.history.state : {};
        var path = ("toPath" in state && typeof state.toPath === "string" ? win.history.state.toPath : "index");
        return {
            path: path,
            state: Object.assign(("state" in state && typeof state.state === "string" ? win.history.state.state : {}), js.getUrlLocation().vars),
            push: function(path2, state){
                win.history.pushState({toPath: (typeof path2 === "string" ? path2 : path), state: (state || {})}, "", window.location.href);
            },
            replace: function(state){
                win.history.replaceState({toPath: path, state: (state || {})}, "", window.location.href);
            },
            back: win.history.back,
            forward: win.history.forward,
            go: function(path){
                if(typeof path === "string"){
                    this.push(path, {});
                }else{
                    win.history.go(path);
                }
            }
        }
    }

    Render.to = function(selector){
        this.root = js(selector);
        this.pages = {"index" : function(){return;}};
        var self = this, observePath = function(path){
            if(Render.history().path !== path){
                path = Render.history().path;
                self.render();
            }
            window.requestAnimationFrame(function(){
                observePath(path);
            });
        }
        observePath(Render.history().path);
        this.render();
    }

    var rRoot = Render.to.prototype = {};
    rRoot.getSelf = function(){
        var self = {}, _self = this;
        self.state = Render.history().state;
        self.history = Render.history();
        self.css = function(style){
            _self.css(style, true);
        }
        return self;
    }
    rRoot.css = function(style, isPage){
        js.CSSJSON.toHEAD(style, isPage ? "PageStyle" : null);
    }
    rRoot.render = function(){
        var page = Render.history().path in this.pages ? Render.history().path : "index";
        var r = this.pages[page](this.getSelf());
        this.root.html("");
        if(r && "isElementJS" in r){
            this.root.append(r);
        }
    }
    rRoot.page = function(path, render){
        this.pages[path] = render;
        if(Render.history().path === path){
            this.render();
        }
    }

    var _render = window.Render;

    Render.noConflict = function(deep){
        if(deep && window.Render === Render){window.Render = _render;}
        return Render;
    };

    if(!noGlobal){window.Render = window._ = Render; window.isRender = true;}
    return Render;
}));