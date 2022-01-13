class EPub{
    constructor(options){
        this.options = options;
        let self = this;

        if(!options.title || !options.content){
            console.error(new Error("Title and content are both required"));
            return;
        }

        this.options = Object.assign({
            description: options.title,
            publisher: "anonymous",
            author: ["anonymous"],
            tocTitle: "Table Of Contents",
            appendChapterTitles: true,
            date: new Date().toISOString(),
            lang: "pt-BR",
            fonts: [],
            customOpfTemplatePath: null,
            customNcxTocTemplatePath: null,
            customHtmlTocTemplatePath: null,
            version: 3
        }, options);

        if(this.options.version === 2){
            this.options.docHeader = `<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">\n<html xmlns="http://www.w3.org/1999/xhtml" lang="${self.options.lang}">`;
        }else{
            this.options.docHeader = `<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE html>\n<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" lang="${self.options.lang}">`;
        }

        if(typeof this.options.author === "string"){
            this.options.author = [this.options.author];
        }

        if(EPub.isEmpty(this.options.author)){
            console.log("anonymous");
            this.options.author = ["anonymous"];
        }

        this.options.id = EPub.uuid();
        this.options.images = [];

        this.zip = new JSZip();

        let allowedAttributes = ["content", "alt", "id", "title", "src", "href", "about", "accesskey", "aria-activedescendant", "aria-atomic", "aria-autocomplete", "aria-busy", "aria-checked", "aria-controls", "aria-describedat", "aria-describedby", "aria-disabled", "aria-dropeffect", "aria-expanded", "aria-flowto", "aria-grabbed", "aria-haspopup", "aria-hidden", "aria-invalid", "aria-label", "aria-labelledby", "aria-level", "aria-live", "aria-multiline", "aria-multiselectable", "aria-orientation", "aria-owns", "aria-posinset", "aria-pressed", "aria-readonly", "aria-relevant", "aria-required", "aria-selected", "aria-setsize", "aria-sort", "aria-valuemax", "aria-valuemin", "aria-valuenow", "aria-valuetext", "class", "content", "contenteditable", "contextmenu", "datatype", "dir", "draggable", "dropzone", "hidden", "hreflang", "id", "inlist", "itemid", "itemref", "itemscope", "itemtype", "lang", "media", "ns1:type", "ns2:alphabet", "ns2:ph", "onabort", "onblur", "oncanplay", "oncanplaythrough", "onchange", "onclick", "oncontextmenu", "ondblclick", "ondrag", "ondragend", "ondragenter", "ondragleave", "ondragover", "ondragstart", "ondrop", "ondurationchange", "onemptied", "onended", "onerror", "onfocus", "oninput", "oninvalid", "onkeydown", "onkeypress", "onkeyup", "onload", "onloadeddata", "onloadedmetadata", "onloadstart", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "onmousewheel", "onpause", "onplay", "onplaying", "onprogress", "onratechange", "onreadystatechange", "onreset", "onscroll", "onseeked", "onseeking", "onselect", "onshow", "onstalled", "onsubmit", "onsuspend", "ontimeupdate", "onvolumechange", "onwaiting", "prefix", "property", "rel", "resource", "rev", "role", "spellcheck", "style", "tabindex", "target", "title", "type", "typeof", "vocab", "xml:base", "xml:lang", "xml:space", "colspan", "rowspan", "epub:type", "epub:prefix"];

        let allowedXhtml11Tags = ["div", "p", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li", "dl", "dt", "dd", "address", "hr", "pre", "blockquote", "center", "ins", "del", "a", "span", "bdo", "br", "em", "strong", "dfn", "code", "samp", "kbd", "bar", "cite", "abbr", "acronym", "q", "sub", "sup", "tt", "i", "b", "big", "small", "u", "s", "strike", "basefont", "font", "object", "param", "img", "table", "caption", "colgroup", "col", "thead", "tfoot", "tbody", "tr", "th", "td", "embed", "applet", "iframe", "img", "map", "noscript", "ns:svg", "object", "script", "table", "tt", "var"];

        this.contentEach("*", function(index, elem){
            let attrs, name, child, k, ref, ref1, that, v;
            attrs = elem.attributes;
            that = this;
            name = String(that.nodeName).toLocaleLowerCase();
            if(name === "img" || name === "br" || name === "hr"){
                if(name === "img"){
                    that.setAttribute("alt", that.getAttribute("alt") || "image-placeholder");
                }
            }

            for(k in attrs){
                v = attrs[k];
                if(allowedAttributes.includes(k)){
                    if(k === "type"){
                        if(name !== "script"){
                            that.removeAttribute(k);
                        }
                    }
                }else{
                    that.removeAttribute(k);
                }
            }

            if(self.options.version === 2){
                if(ref1 = that.name, indexOf.call(allowedXhtml11Tags, ref1) >= 0){

                }else{
                    if(self.options.verbose){
                        console.log("Warning (content[" + index + "]):", that.name, "tag isn't allowed on EPUB 2/XHTML 1.1 DTD.");
                    }

                    let newItem = document.createElement("div");
                    newItem.appendChild(that.cloneNode(true));
                    that.parentNode.replaceChild(newItem, that);
                }
            }
        });

        let img_folder = this.zip.folder("images");

        this.contentEach("img", function(index, elem){
            var extension, id, image, mediaType, url, data;
            url = this.getAttribute("src");
            if(image = self.options.images.find(function(element){
                return element.url === url;
            })){
                id = image.id;
                extension = image.extension;
                data = image.data;
                //img_folder.file(`${id}.${extension}`, images[i].data, {base64: true});
            }else{
                id = EPub.uuid();
                mediaType = "image/png";
                extension = "png";

                EPub.convertImgToBase64URL(url, function(data){
                    self.options.images.push({id, url, data, mediaType, extension});
                    img_folder.file(`${id}.${extension}`, data.split(',')[1], {base64: true});
                }, mediaType);
            }
        });

        /*setTimeout(()=>{
            this.zip.generateAsync({type:"base64"}).then(function (base64) {
                location.href="data:application/zip;base64," + base64;
            });
        }, 5000);*/

        this.render();
    }

    static uuid(){
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r;
            r = Math.random() * 16 | 0;
            return (c === 'x' ? r : r & 0x3 | 0x8).toString(16);
        });
    }

    static isEmpty(n){
        return !(!!n ? typeof n === 'object' ? Array.isArray(n) ? !!n.length : !!Object.keys(n).length : true : false);
    }

    contentEach(q, fn){
        let content = this.options.content, elements = [];
        if(this.options.content.parentNode){
            content = this.options.content;
        }

        for(let i=0; i<content.length; i++){
            let component = content[i];
            elements = elements.concat(Array.prototype.slice.call(component.querySelectorAll(q)));
        }
        
        for(let i=0; i<elements.length; i++){
            fn.apply(elements[i], [i, elements[i], elements]);
        }
    }

    static convertImgToBase64URL(url, callback, outputFormat){
        let img = new Image();
        img.crossOrigin = 'Anonymous';
        img.setAttribute('crossOrigin', 'anonymous');
        img.onload = function () {
            let canvas = document.createElement('CANVAS'),
                ctx = canvas.getContext('2d'), dataURL;
            canvas.height = this.height;
            canvas.width = this.width;
            ctx.drawImage(this, 0, 0);
            dataURL = canvas.toDataURL(outputFormat || 'image/png');
            callback(dataURL, url);
            canvas = null;
        };
        img.src = url;
    }

    render(){
        let self = this;
        if(self.options.verbose){
            console.log("Generating Template Files.....");
        }

        this.generateTempFile().then(function(){
            if(self.options.verbose){
                console.log("Downloading Images...");
            }
        }, function(err){
            console.error(new Error(err));
        });
    }

    generateTempFile(){
        
    }
}