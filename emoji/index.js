(()=>{
    const update = ()=>{
        const root = document.getElementById("root");
        root.innerHTML = "";

        categories.forEach(category => {
            let title = document.createElement("h1");
            title.appendChild(document.createTextNode(category));
            title.style["font-size"] = "30px";
            root.appendChild(title);

            let p = document.createElement("p");
            p.style["font-size"] = "30px";

            summary(category).forEach(v => {
                p.innerHTML += " " + v.html;
            });

            root.appendChild(p);
        });
    }

    update();

    fetch("./emoji-list.txt").then(t => t.text()).then(text => {
        let blocks = text.split(/\r\n\r\n/).map(v => v.replace(/(\s+){1,}[\;\#](\s+)/g, " | ").split(/\r\n/));
        let category = "";
        let categories = [];
        let emojis = [];

        const getFormatEmoji = (c, s, e)=>{
            e = e.split(" | ");
            if(["fully-qualified"].includes(e[1]) !== true){return;}

            let details = e.pop().split(" "), emoji, version, description, skin, code;

            code = "U+" + e[0].split(" ").join(" U+");
            html = "&#" + e[0].split(" ").map(h => parseInt(h, 16)).join(";&#") + ";";
            emoji = details.shift();
            version = details.shift();
            description = details.join(" ");

            skin = description.indexOf(": ") > 1 ? description.split(": ")[0] : null;

            if(skin && description.split(": ")[1].indexOf(", ") > 1){
                skin += ": "+description.split(": ")[1].split(", ")[0];
            }

            let result = {
                code, html,
                emoji, version, description,
                subgroup: s, category: c
            }

            if(skin){ result.skin = skin; }
            
            return result;
        }

        blocks.forEach((block)=>{
            if(block.length === 1 && block[0].indexOf("# group: ") === 0){
                category = block[0].replace(/^\#\sgroup\:(\s+)?/gi, "");
                categories.push(category);
                emojis.push({
                    category: category,
                    subgroups: [],
                    emojis: []
                });
            }else if(block[0].indexOf("# subgroup: ") === 0){
                let categoryIndex = emojis.length-1;
                let subgroup = block[0].replace(/^\#\ssubgroup\:(\s+)?/gi, "");
                emojis[categoryIndex].subgroups.push(subgroup);

                block.forEach((e, i)=>{
                    if(i < 1){return;}
                    let emoji = getFormatEmoji(category, subgroup, e);

                    if(!emoji){return;}

                    if(emoji.skin){
                        let indexSkins = emojis[categoryIndex].emojis.findIndex(e => e.description == emoji.skin);

                        if(indexSkins < 0){
                            indexSkins = emojis[categoryIndex].emojis.findIndex(e => {
                                let t = Array.isArray(e.skins) ? e.skins.findIndex(e => e.description == emoji.skin) : -1;
                                return t >= 0;
                            });

                            if(indexSkins >= 0){

                            let skins = emojis[categoryIndex].emojis[indexSkins].skins || null;

                            if(!Array.isArray(skins)){emojis[categoryIndex].emojis[indexSkins].skins = [];}
                                emojis[categoryIndex].emojis[indexSkins].skins.push(emoji);
                            }

                        }
                        
                        if(indexSkins >= 0){
                            let skins = emojis[categoryIndex].emojis[indexSkins].skins || null;

                            if(!Array.isArray(skins)){emojis[categoryIndex].emojis[indexSkins].skins = [];}
                            emojis[categoryIndex].emojis[indexSkins].skins.push(emoji);
                            return;
                        }
                    }

                    emojis[categoryIndex].emojis.push(emoji);
                });
            }
        });

        emojis = emojis.filter((a) => a.emojis.length > 0);

        console.log(JSON.stringify(emojis));

        /*emoji = emojis;
        update();*/
    }).catch(console.error);
})();