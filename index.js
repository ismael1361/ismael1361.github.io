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

function no_page(){
    const element = document.querySelector(".main > #content");

    element.innerHTML = `<div style="color: #9e9e9e; padding: 25px 0px; display: flex; flex-direction: column; align-items: center; justify-content: center; user-select: none;">
        <svg style="width:100px; height:100px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" />
        </svg>
        <h1 style="margin-top: 10px; font-weight: bold;">Página não encontrada!</h1>
    </div>`;
}

window.readPage = function(url){
    const element = document.querySelector(".main > #content");
    fetch(url).then(r => {
        return (r.status !== 200) ? Promise.reject() : r.text();
    }).then((page)=>{
        var mdConverter = new showdown.Converter();
        mdConverter.setOption('tables', true);
        mdConverter.setOption('tasklists', true);
        mdConverter.setOption('rawHeaderId', true);
        mdConverter.setOption('markdown', '1');
        element.innerHTML = mdConverter.makeHtml(page);
        
        element.querySelectorAll("p > img").forEach(p => {
            p.parentNode.style.textAlign = "center";
        });

        element.querySelectorAll("pre").forEach(p => {
            let is_prettyprint = 0;

            let codes = p.querySelectorAll("code");

            codes.forEach(c => {
                if((/(language-([a-z]+))/gi).test(c.className)){
                    is_prettyprint += 1;
                }
            });

            is_prettyprint = is_prettyprint >= codes.length;

            if(!is_prettyprint){return;}

            p.setAttribute("class", "prettyprint");
        });
        prettyPrint({}, element);
        renderMathInElement(element);
    }).catch(()=>{
        no_page();
    });
};

(function(){
    let params = new URLSearchParams(window.location.search);

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
            window.readPage("./pages/syntax");
        }else if(params.has("id")){
            window.readPage("./pages/"+params.get("id"));
        }else if(params.get("page") === "archive"){
            window.readPage("./pages/archive");
        }else{
            no_page();
        }
    }else{
        window.readPage("./pages/home");
    }
})();