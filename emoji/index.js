(()=>{
    const icon = (d, width, height)=>{
        d = typeof d !== "string" ? "" : d;
        width = typeof width !== "number" ? 24 : width;
        height = typeof height !== "number" ? 24 : height;

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

        const newElement = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        newElement.setAttribute("d", d);
        newElement.style.fill = "currentColor";
        svg.appendChild(newElement);

        svg.style.fill = "currentColor";
        svg.style.width = "1em";
        svg.style.height = "1em";

        return svg;
    }

    const update = ()=>{
        const root = document.getElementById("root");
        root.innerHTML = "";

        const categories = document.createElement("div");
        categories.setAttribute("class", "categories");

        const emojis = document.createElement("div");
        emojis.setAttribute("class", "emojis");

        let category;
        let categoryClick = function(){
            categories.querySelector("div.active").classList.remove("active");
            this.classList.add("active");

            emojis.style.setProperty('--translate', (parseInt(this.getAttribute("index") * -100) + "%"));
        }

        category = document.createElement("div");
        category.setAttribute("class", "active");
        category.setAttribute("index", "0");
        category.appendChild(icon("M 13,4 11,4 10.999,11 9,11 l 0,2 2,0 0,2 2,0 0,-2 4,0 0,-2 -4,0 z M12,0C5.373,0,0,5.373,0,12s5.373,12,12,12s12-5.373,12-12S18.627,0,12,0 M12,22C6.486,22,2,17.514,2,12    S6.486,2,12,2s10,4.486,10,10S17.514,22,12,22"));
        category.onclick = categoryClick;
        categories.appendChild(category);

        category = document.createElement("div");
        category.setAttribute("index", "1");
        category.appendChild(icon("M12,0C5.373,0,0,5.373,0,12s5.373,12,12,12s12-5.373,12-12S18.627,0,12,0 M12,22C6.486,22,2,17.514,2,12   S6.486,2,12,2s10,4.486,10,10S17.514,22,12,22 z M8,7C6.895,7,6,7.895,6,9s0.895,2,2,2s2-0.895,2-2S9.105,7,8,7 z M16,7c-1.105,0-2,0.895-2,2s0.895,2,2,2s2-0.895,2-2S17.105,7,16,7 z M15.232,15c-0.693,1.195-1.87,2-3.349,2c-1.477,0-2.655-0.805-3.347-2H15 M18,13H6c0,3.314,2.686,6,6,6   S18,16.314,18,13"));
        category.onclick = categoryClick;
        categories.appendChild(category);

        category = document.createElement("div");
        category.setAttribute("index", "2");
        category.appendChild(icon("M18.933,0h-0.027c-0.97,0-2.138,0.787-3.018,1.497c-1.274-0.374-2.612-0.51-3.887-0.51   c-1.285,0-2.616,0.133-3.874,0.517C7.245,0.79,6.069,0,5.093,0H5.066C3.352,0,0.07,2.67,0.002,7.026   c-0.039,2.479,0.276,4.238,1.04,5.013c0.254,0.258,0.882,0.677,1.295,0.882c0.191,3.177,0.922,5.238,2.536,6.38   c0.897,0.637,2.187,0.949,3.2,1.102C8.04,20.6,8,20.795,8,21c0,1.773,2.35,3,4,3c1.648,0,4-1.227,4-3   c0-0.201-0.038-0.393-0.072-0.586c2.573-0.385,5.435-1.877,5.925-7.587c0.396-0.22,0.887-0.568,1.104-0.788   c0.763-0.774,1.079-2.534,1.04-5.013C23.929,2.67,20.646,0,18.933,0 M3.223,9.135c-0.237,0.281-0.837,1.155-0.884,1.238   c-0.15-0.41-0.368-1.349-0.337-3.291C2.053,3.801,4.48,2.11,5.093,2.051c0.256,0.015,0.731,0.27,1.265,0.646   c-1.11,1.171-2.275,2.915-2.352,5.125C3.873,8.368,3.608,8.68,3.223,9.135 M12,22c-0.901,0-1.954-0.693-2-1   c0-0.654,0.475-1.236,1-1.602V20c0,0.553,0.447,1,1,1s1-0.447,1-1v-0.602c0.524,0.365,1,0.947,1,1.602   C13.954,21.307,12.901,22,12,22 M15,18.52v0.02c-0.366-0.418-0.798-0.762-1.262-1.02c1.092-0.516,2.239-1.334,2.239-2.217   c0-1.842-1.781-2.195-3.977-2.195c-2.196,0-3.978,0.354-3.978,2.195c0,0.883,1.148,1.701,2.238,2.217   C9.799,17.777,9.368,18.121,9,18.539v-0.025c-1-0.076-2.182-0.281-2.973-0.842c-1.301-0.92-1.838-3.045-1.853-6.478   c0.008-0.014,0.016-0.028,0.023-0.041c0.496-0.826,1.49-1.45,1.804-3.102c0-2.047,1.357-3.631,2.362-4.522   C9.37,3.178,10.555,3,11.948,3c1.447,0,2.685,0.192,3.733,0.57c1,0.9,2.316,2.465,2.316,4.48c0.313,1.651,1.307,2.275,1.803,3.102   c0.035,0.058,0.068,0.117,0.102,0.178C19.843,17.297,17.953,18.34,15,18.52 M21.628,10.318c-0.037-0.065-0.074-0.13-0.113-0.195   c-0.233-0.387-0.502-0.706-0.739-0.987c-0.385-0.455-0.648-0.768-0.782-1.313c-0.076-2.209-1.241-3.954-2.353-5.124   c0.531-0.376,1.004-0.63,1.261-0.647c0.636,0.071,3.044,1.764,3.096,5.031C22.025,8.893,21.651,10.301,21.628,10.318"));
        category.onclick = categoryClick;
        categories.appendChild(category);

        category = document.createElement("div");
        category.setAttribute("index", "3");
        category.appendChild(icon("M17,4.978c-1.838,0-2.876,0.396-3.68,0.934c0.513-1.172,1.768-2.934,4.68-2.934c0.552,0,1-0.448,1-1   s-0.448-1-1-1c-2.921,0-4.629,1.365-5.547,2.512c-0.064,0.078-0.119,0.162-0.18,0.244c-0.543-1.896-1.475-3.711-3.066-3.711   C8.579,0.022,7.85,0.306,7,0.978C5.027,2.54,5.329,3.902,6.492,4.999C3.609,5.222,0,7.352,0,12.969c0,4.582,4.961,11.009,9,11.009   c1.975,0,2.371-0.486,3-1c0.629,0.514,1.025,1,3,1c4.039,0,9-6.418,9-11C24,7.025,19.945,4.978,17,4.978 M8.242,2.546   c0.641-0.508,0.943-0.523,0.965-0.523c0.426,0.169,0.975,1.405,1.357,3.055c-1.527-0.629-2.741-1.352-2.98-1.846   C7.643,3.12,7.825,2.876,8.242,2.546 M15,21.978c-1.08,0-1.21-0.109-1.559-0.402l-0.176-0.146   c-0.367-0.302-0.816-0.452-1.266-0.452s-0.898,0.15-1.266,0.452l-0.176,0.146C10.21,21.868,10.08,21.978,9,21.978   c-2.813,0-7-5.389-7-9.009c0-5.823,4.488-5.991,5-5.991c1.939,0,2.484,0.471,3.387,1.251c0.107,0.092,0.215,0.185,0.323,0.276   C11.083,8.82,11.541,8.978,12,8.978s0.917-0.157,1.29-0.473c0.108-0.092,0.216-0.185,0.323-0.276   c0.902-0.78,1.447-1.251,3.387-1.251c0.512,0,5,0.168,5,6C22,16.595,17.813,21.978,15,21.978"));
        category.onclick = categoryClick;
        categories.appendChild(category);

        category = document.createElement("div");
        category.setAttribute("index", "4");
        category.appendChild(icon("M12,0C5.373,0,0,5.372,0,12c0,6.627,5.373,12,12,12c6.628,0,12-5.373,12-12C24,5.372,18.628,0,12,0    M21.949,11H17.05c0.224-2.527,1.232-4.773,1.968-6.113C20.634,6.481,21.712,8.618,21.949,11 M13,11V2.051   c1.623,0.162,3.13,0.719,4.432,1.564C16.574,5.106,15.276,7.835,15.04,11H13z M11,11H8.961C8.723,7.835,7.425,5.106,6.568,3.615   C7.871,2.77,9.377,2.213,11,2.051V11z M11,13v8.949c-1.623-0.162-3.129-0.718-4.432-1.564C7.425,18.893,8.723,16.164,8.961,13H11z    M15.04,13c0.236,3.164,1.534,5.893,2.392,7.385c-1.302,0.847-2.809,1.402-4.432,1.564V13H15.04z M4.982,4.887   C5.718,6.227,6.726,8.473,6.951,11h-4.9C2.289,8.618,3.367,6.481,4.982,4.887 M2.051,13h4.9c-0.226,2.527-1.233,4.771-1.969,6.113   C3.367,17.52,2.289,15.383,2.051,13 M19.018,19.113c-0.735-1.342-1.744-3.586-1.968-6.113h4.899   C21.712,15.383,20.634,17.52,19.018,19.113"));
        category.onclick = categoryClick;
        categories.appendChild(category);

        category = document.createElement("div");
        category.setAttribute("index", "5");
        category.appendChild(icon("M6.5,12C5.122,12,4,13.121,4,14.5S5.122,17,6.5,17S9,15.879,9,14.5S7.878,12,6.5,12 M6.5,15   C6.225,15,6,14.775,6,14.5S6.225,14,6.5,14S7,14.225,7,14.5S6.775,15,6.5,15 z M17.5,12c-1.378,0-2.5,1.121-2.5,2.5s1.122,2.5,2.5,2.5s2.5-1.121,2.5-2.5S18.878,12,17.5,12 M17.5,15   c-0.275,0-0.5-0.225-0.5-0.5s0.225-0.5,0.5-0.5s0.5,0.225,0.5,0.5S17.775,15,17.5,15 z M22.482,9.494l-1.039-0.346L21.4,9H22c0.552,0,1-0.439,1-0.992C23,8.002,22.997,8,22.997,8H23   c0-1-0.889-2-1.984-2h-0.642l-0.731-1.717C19.262,3.012,18.091,2,16.764,2H7.236C5.909,2,4.738,3.012,4.357,4.283L3.626,6H2.984   C1.889,6,1,7,1,8h0.003C1.003,8,1,8.002,1,8.008C1,8.561,1.448,9,2,9h0.6L2.557,9.148L1.518,9.494   C0.63,9.79,0.066,10.661,0.159,11.591l0.751,7.508C0.961,19.611,1.391,20,1.904,20H3v1c0,1.103,0.896,2,2,2h2c1.104,0,2-0.897,2-2   v-1h6v1c0,1.103,0.896,2,2,2h2c1.104,0,2-0.897,2-2v-1h1.096c0.514,0,0.943-0.389,0.994-0.901l0.751-7.508   C23.934,10.661,23.37,9.79,22.482,9.494 M6.273,4.857C6.402,4.43,6.788,4,7.236,4h9.527c0.448,0,0.834,0.43,0.963,0.857L19.313,9   H4.688L6.273,4.857z M7,21H5v-1h2V21z M19,21h-2v-1h2V21z M21.189,18H21h-6H9H3H2.811l-0.662-6.607L3,11h18l0.852,0.393L21.189,18z"));
        category.onclick = categoryClick;
        categories.appendChild(category);

        category = document.createElement("div");
        category.setAttribute("index", "6");
        category.appendChild(icon("M 12 0 C 7.029 0 3 4.029 3 9 C 3 12.120081 4.5888411 14.867862 7 16.482422 L 7 21 C 7 21 9.035 24 12 24 C 14.965 24 17 21 17 21 L 17 16.482422 C 19.411159 14.867862 21 12.120081 21 9 C 21 4.029 16.971 0 12 0 z M 12 2 C 15.86 2 19 5.141 19 9 C 19 12.859 15.86 16 12 16 C 8.14 16 5 12.859 5 9 C 5 5.141 8.14 2 12 2 z M 9 17.476562 C 9.9397054 17.809261 10.946226 18 12 18 C 13.053774 18 14.060295 17.809261 15 17.476562 L 15 18.310547 C 14.089581 18.746635 13.074971 19 12 19 C 10.925029 19 9.9104192 18.746635 9 18.310547 L 9 17.476562 z M 9.2363281 20.546875 C 10.108023 20.832252 11.032636 21 12 21 C 12.965197 21 13.887813 20.832689 14.757812 20.548828 C 14.155076 21.173162 13.152816 22 12 22 C 10.89775 22 9.8827458 21.211335 9.2363281 20.546875 z M14.745,12.449h-0.004c-0.852-0.024-1.188-0.858-1.577-1.824c-0.421-1.061-0.703-1.561-1.182-1.566h-0.009    c-0.481,0-0.783,0.497-1.235,1.537c-0.436,0.982-0.801,1.811-1.636,1.791l-0.276-0.043c-0.565-0.171-0.853-0.691-1.284-1.794    c-0.125-0.313-0.202-0.632-0.27-0.913C7.221,9.424,7.145,9.107,7.077,9.003C7.067,9.004,7.039,9,6.99,9    C6.438,8.994,5.994,8.543,6,7.99C6.006,7.441,6.452,7,7,7h0.01c1.662,0.017,2.015,1.373,2.198,2.134    c0.486-0.981,1.304-2.058,2.797-2.075c1.531,0.018,2.28,1.153,2.731,2.141c0-0.002,0.001-0.006,0.002-0.008    C14.944,8.424,15.327,7,16.979,7h0.032C17.563,7.007,18.006,7.459,18,8.012C17.994,8.56,17.547,9,17,9h-0.011    c-0.149,0.076-0.256,0.474-0.319,0.709c-0.079,0.295-0.169,0.629-0.311,0.951C15.93,11.633,15.569,12.449,14.745,12.449"));
        category.onclick = categoryClick;
        categories.appendChild(category);

        category = document.createElement("div");
        category.setAttribute("index", "7");
        category.appendChild(icon("M15.5,17c1.381,0,2.5-1.116,2.5-2.493s-1.119-2.493-2.5-2.493S13,13.13,13,14.507S14.119,17,15.5,17    M15.5,14.014c0.276,0,0.5,0.222,0.5,0.493C16,14.779,15.776,15,15.5,15S15,14.779,15,14.507C15,14.235,15.224,14.014,15.5,14.014 z M21.5,19.014c-1.381,0-2.5,1.116-2.5,2.493S20.119,24,21.5,24s2.5-1.116,2.5-2.493   S22.881,19.014,21.5,19.014 M21.5,22c-0.276,0-0.5-0.221-0.5-0.493c0-0.271,0.224-0.493,0.5-0.493s0.5,0.222,0.5,0.493   C22,21.779,21.776,22,21.5,22 z m 22,13 -9,9 1.513,1.5 8.99,-9.009 z M17,11c2.209,0,4-1.119,4-2.5V2c0,0,0.985-0.161,1.498,0.949C23.01,4.055,23,6,23,6s1-1.119,1-3.135   C24-0.02,21,0,21,0h-2v6.347C18.41,6.132,17.732,6,17,6c-2.209,0-4,1.119-4,2.5S14.791,11,17,11 z M10.297,20.482l-1.475-1.585c-0.773,0.619-1.254,0.995-1.442,1.129c-0.307-0.288-0.989-1.016-2.045-2.183   c0.902-0.836,1.479-1.466,1.729-1.892s0.376-0.871,0.376-1.336c0-0.592-0.273-1.178-0.818-1.759   c-0.546-0.581-1.329-0.871-2.349-0.871c-1.008,0-1.79,0.293-2.344,0.879c-0.556,0.587-0.832,1.181-0.832,1.784   c0,0.813,0.419,1.748,1.256,2.805c-0.847,0.614-1.444,1.208-1.794,1.784c-0.35,0.575-0.523,1.186-0.523,1.833   c0,0.857,0.308,1.56,0.924,2.107C1.576,23.726,2.383,24,3.38,24c1.173,0,2.444-0.379,3.813-1.137L8.235,24h2.819l-2.09-2.383   L10.297,20.482z M3.561,14.093c0.199-0.19,0.443-0.286,0.73-0.286c0.31,0,0.559,0.085,0.747,0.254   c0.189,0.171,0.283,0.391,0.283,0.659c0,0.518-0.419,1.112-1.257,1.784c-0.536-0.651-0.805-1.231-0.805-1.742   C3.26,14.508,3.36,14.284,3.561,14.093 M3.74,22c-0.427,0-0.778-0.116-1.057-0.349c-0.279-0.232-0.418-0.487-0.418-0.766   c0-0.594,0.509-1.288,1.527-2.083c0.968,1.134,1.717,1.946,2.248,2.438C5.119,21.747,4.354,22,3.74,22"));
        category.onclick = categoryClick;
        categories.appendChild(category);

        category = document.createElement("div");
        category.setAttribute("index", "8");
        category.appendChild(icon("M21,5h-4l-1-4H4l3,12h3l1,4h2h11L21,5z M6.563,3h7.875l2,8H8.563L6.563,3z M15.395,13l-2.856,1.904   L12.063,13H15.395z M19,13l-1.5-6h1.938l2,8H16L19,13z"));
        category.onclick = categoryClick;
        categories.appendChild(category);

        root.appendChild(categories);

        const summaries = [[""], ["Smileys & Emotion", "People & Body"], ["Animals & Nature"], ["Food & Drink"], ["Objects"], ["Travel & Places"], ["Activities"], ["Symbols"], ["Flags"]];

        summaries.forEach((e, i) => {
            let emojis_list = summary(e);
            const emojis_div = document.createElement("div");

            emojis_list.forEach((j)=>{
                const emoji = document.createElement("span");
                emoji.innerHTML = j.html;
                emojis_div.appendChild(emoji);
            });

            for(let a=0; a<20; a++){
                const emoji = document.createElement("span");
                emojis_div.appendChild(emoji);
            }

            emojis.appendChild(emojis_div);
        });

        root.appendChild(emojis);

        return;
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

    return;

    fetch("./emoji-list.txt").then(t => t.text()).then(text => {
        let blocks = text.split(/\r?\n\r?\n/).map(v => v.replace(/(\s+){1,}[\;\#](\s+)/g, " | ").split(/\r?\n/));
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
                //skin += ": "+description.split(": ")[1].split(", ")[0];
            }

            let result = {
                emoji, description, code, html, version,
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

        //emoji = emojis;
        //update();
    }).catch(console.error);
})();

//document.body.innerHTML = document.body.innerHTML.replace(/(\u{1F636}\u{200D}\u{1F32B}\u{FE0F})/ug, '<span>$&</span>');
//"U+0037 U+FE0F U+20E3".replace(/U\+/gi, "").split(" ").join("-").toLocaleLowerCase()
//https://github.com/twitter/twemoji