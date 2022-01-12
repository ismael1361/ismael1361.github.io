//https://github.com/msindwan/mhtml2html
//https://stackoverflow.com/questions/9244649/downloading-a-javascript-blob-variable-as-mhtml
//https://stuk.github.io/jszip/
//https://stackoverflow.com/questions/8608724/how-to-zip-files-using-javascript

const loadPageUrl = function(url){
    console.log(url);

    fetch(url, {mode:'no-cors', cache: 'default'}).then(r=>r.text()).then(r=>{
        console.log(r);
        console.log(parseHTML(r));
    });
};

(function(){
    let archive_page = document.getElementById("archive-page");

    archive_page.addEventListener("change", (event)=>{
        let input = event.target, dom;

        if(["text/html", "multipart/related"].includes(input.files[0].type) !== true){
            return;
        }

        let reader = new FileReader();
        reader.onload = function(){
            if(input.files[0].type === "multipart/related"){
                dom = mhtml2html.convert(reader.result)?.window.document.body;
            }else{
                let parser = (function(){return new window.DOMParser()}());
                dom = parser.parseFromString(reader.result, "text/html").body;
            }
            console.log(dom);
        };
        reader.readAsText(input.files[0]);
    });
})();