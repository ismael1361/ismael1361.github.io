function parse_query_string(query){
    var vars = query.split("&");
    var query_string = {};
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        var key = decodeURIComponent(pair[0]);
        var value = decodeURIComponent(pair[1]);
        if(typeof query_string[key] === "undefined"){
            query_string[key] = decodeURIComponent(value);
        }else if(typeof query_string[key] === "string"){
            var arr = [query_string[key], decodeURIComponent(value)];
            query_string[key] = arr;
        }else{
            query_string[key].push(decodeURIComponent(value));
        }
    }
    return query_string;
};

function copyTextToClipboard(text) {
    const fallbackCopyTextToClipboard = (text)=>{
        var textArea = document.createElement("textarea");
        textArea.value = text;

        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            let successful = document.execCommand('copy');
            let msg = successful ? 'successful' : 'unsuccessful';
            console.log('Fallback: Copying text command was ' + msg);
        }catch(err){
            console.error('Fallback: Oops, unable to copy', err);
        }
        document.body.removeChild(textArea);
    }

    if(!navigator.clipboard){
        fallbackCopyTextToClipboard(text);
        return;
    }

    navigator.clipboard.writeText(text).then(function() {
        console.log('Async: Copying to clipboard was successful!');
    }, function(err){
        fallbackCopyTextToClipboard(text);
    });
}

let params = new URLSearchParams(window.location.search);

function no_page(){
    const element = document.querySelector(".main > #content");

    element.innerHTML = `<div style="color: #9e9e9e; padding: 25px 0px; display: flex; flex-direction: column; align-items: center; justify-content: center; user-select: none;">
        <svg style="width:100px; height:100px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" />
        </svg>
        <h1 style="margin-top: 10px; font-weight: bold;">Página não encontrada!</h1>
    </div>`;
}

function fileNameFromUrl(url){
   var matches = url.match(/\/([^\/?#]+)[^\/]*$/);
   //return url ? url.split('/').pop().split('#').shift().split('?').shift() : null

   if (matches.length > 1) {
     return matches[1];
   }
   return null;
}

function dirNameFromUrl(url){
    var fileName = fileNameFromUrl(url);
    return (url.search(fileName) > 0 ? url.substr(0, url.search(fileName)) : url).replace(/\/$/gi, "");
}

window.readPage = function(url){
    const element = document.querySelector(".main > #content");
    fetch(url).then(r => {
        return (r.status !== 200) ? Promise.reject() : r.text();
    }).then((page)=>{
        var dirName = dirNameFromUrl(url);
        page = page.replace(/%PUBLIC_URL%/gi, dirName);
        page = page.replace(/%PAGE_ID%/gi, params.get("id"));

        var mdConverter = new showdown.Converter();
        mdConverter.setOption('tables', true);
        mdConverter.setOption('tasklists', true);
        mdConverter.setOption('rawHeaderId', true);
        mdConverter.setOption('markdown', '1');
        element.innerHTML = "<div>"+mdConverter.makeHtml(page)+"</div>";
        
        element.querySelectorAll("p > img").forEach(p => {
            p.parentNode.style.textAlign = "center";
        });

        element.querySelectorAll("pre").forEach(p => {
            let is_prettyprint = 0;

            let codes = p.querySelectorAll("code");

            let code = "";

            codes.forEach(c => {
                if((/(language-([a-z]+))/gi).test(c.className)){
                    is_prettyprint += 1;
                    code += c.innerText;
                }
            });

            is_prettyprint = is_prettyprint >= codes.length;

            if(!is_prettyprint){return;}

            p.setAttribute("class", "prettyprint");

            let clipboard = document.createElement("div");
            clipboard.setAttribute("class", "clipboard-container");
            clipboard.setAttribute("value", code);

            let copy_path = "M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z";

            let success_path = "M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z";

            clipboard.onclick = function(){
                this.classList.add("success");
                this.querySelector("svg > path").setAttributeNS(null, "d", success_path);
                copyTextToClipboard(this.getAttribute("value"));

                setTimeout(()=>{
                    this.classList.remove("success");
                    this.querySelector("svg > path").setAttributeNS(null, "d", copy_path);
                }, 2000);
            }

            let ns_svg = "http://www.w3.org/2000/svg";

            let clipboard_svg = document.createElementNS(ns_svg, "svg");
            clipboard_svg.setAttributeNS(null, "height", "16");
            clipboard_svg.setAttributeNS(null, "width", "16");
            clipboard_svg.setAttributeNS(null, "viewBox", "0 0 16 16");
            clipboard_svg.setAttributeNS(null, "version", "1.1");

            let clipboard_path = document.createElementNS(ns_svg, "path");
            clipboard_path.setAttributeNS(null, "d", copy_path);

            clipboard_svg.appendChild(clipboard_path);
            clipboard.appendChild(clipboard_svg);
            p.appendChild(clipboard);
        });
        prettyPrint({}, element);
        renderMathInElement(element);
        if(params.has("page") && params.get("page") === "archive" && params.has("id")){
            let links = document.querySelectorAll("a");
            links.forEach((a)=>{
                if(a.href !== window.location.href && (a.parentNode.classList.contains("btn-page-prev") || a.parentNode.classList.contains("btn-page-next")) !== true){
                    a.setAttribute("target", "_blank");
                }else if(a.href === window.location.href){
                    a.addEventListener("click", function(e){
                        e.preventDefault();
                        return true;
                    }, false);
                }
            });
        }
    }).catch(()=>{
        no_page();
    });
};

(function(){
    let nav = document.querySelectorAll(".main > .nav li > a");

    nav.forEach((link)=>{
        let s = link.href.indexOf("?") >= 0 ? parse_query_string(link.href.split("?")[1]) : {};
        let is_active = true;

        for(let k in s){
            if(params.has(k) !== true || params.get(k) !== s[k]){
                is_active = false;
                break;
            }
        }

        if(is_active){
            document.querySelector(".main > .nav li.active").setAttribute("class", "");
            link.parentNode.setAttribute("class", "active");
        }
    });

    if(params.has("page")){
        if(params.get("page") === "syntax"){
            window.readPage("./pages/syntax.md");
        }else if(params.has("id")){
            window.readPage("./pages/"+params.get("id")+"/index.md");
        }else if(params.get("page") === "archive"){
            window.readPage("./pages/archive.md");
        }else{
            no_page();
        }
    }else{
        window.readPage("./pages/home.md");
    }
})();