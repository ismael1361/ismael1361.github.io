(()=>{
    categories.forEach(category => {
        let title = document.createElement("h1");
        title.appendChild(document.createTextNode(category));
        document.body.appendChild(title);

        let p = document.createElement("p");
        p.style["font-size"] = "3.5em";

        summary(category).forEach(v => {
            p.innerHTML += " " + v.html;
        });

        document.body.appendChild(p);
    });
})();

var getSkin = async (name, callback)=>{
    let t = await fetch("https://emojipedia.org/"+name).then(t => t.text()).catch(console.error);

    let title = t.match(/name\: ([\'\"])(.*?)\1/)[2].split(":")[0];

    callback = typeof callback === "function" ? callback : ()=>{return;};
    
    const createElementFromHTML = (htmlString)=>{
        var div = document.createElement('div');
        div.innerHTML = htmlString.trim();
        return div.firstChild;
    }
    
    let r = [];
    
    t = t.replace(/<\/?(ul)\/?>?/gi, "<<UL>>").split("<<UL>>").filter(e => e.indexOf(" class=\"emoji-list\">") == 0 && e.indexOf(title+":") >= 0).map(m => "<ul" + m + "</ul>").join("");
    t = createElementFromHTML(t);

    if(!t){return callback([]);}
    
    let list = t.querySelectorAll("li > a");
    for(let i=0; i<list.length; i++){
        let text = list[i].textContent;
        if(text.indexOf(title+":") < 0){continue;}
        r.push(text);
    }
    
    return callback(r);
}

String.prototype.toUnicode = function(){
    var hex, i;
    var result = [];
    for (i=0; i<this.length; i++) {
        hex = this.charCodeAt(i).toString(18);
        result.push("U+"+hex);
    }

    return result.join(" ");
};

[...document.querySelectorAll(".content > .emoji-list > li")].map(i => {
    let text = i.textContent.split(" ");
    let emoji = text.shift();
    let hex = emoji.codePointAt(0).toString(16)
    
    return {
        name: i.querySelector("a").href.replace(/(\/+)$/gi, "").split("/").pop(), 
        code: "U+"+hex,
        emoji: emoji,
        description: text.join(" ").toUpperCase()
    }
});