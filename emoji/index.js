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