//https://github.com/msindwan/mhtml2html
//https://stackoverflow.com/questions/9244649/downloading-a-javascript-blob-variable-as-mhtml
//https://stuk.github.io/jszip/
//https://stackoverflow.com/questions/8608724/how-to-zip-files-using-javascript

const loadPageUrl = function(url){
    let parser = (function(){return new window.DOMParser()}());

    let parseHTML = function(a){
        if(!a || typeof a !== "string"){return [];}
        var b, c = []; 
        b = parser.parseFromString(a, "text/html").body;
        if (!b || b.getElementsByTagName("parsererror").length){
            new Error( "Invalid XML: " + a);
        }else{
            while(b.firstChild){c.push(b.firstChild); b.removeChild(b.firstChild);}
        }
        return c;
    }

    console.log(url);

    fetch(url, {mode:'no-cors', cache: 'default'}).then(r=>r.text()).then(r=>{
        console.log(r);
        console.log(parseHTML(r));
    });
};

(function(){
    let url_page = document.getElementById("url-page");
    let iframe_page = document.getElementById("iframe-page");

    url_page.addEventListener("input", (a)=>{
        url_page.disabled = true;
        iframe_page.src = url_page.value;
        loadPageUrl(url_page.value);
        url_page.disabled = false;
    });
})();