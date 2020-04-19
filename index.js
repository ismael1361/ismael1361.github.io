var root = new Render.to("#root");
root.css({
    "body, html":{
        "margin": "0px",
        "padding": "0px"
    },
    "body": {
        "background": "#eeeeee",
        "display": "flex",
        "align-items": "center",
        "text-align": "center",
        "justify-content": "center",
        "height": "100vh",
        "color": "#666666"
    }
});
root.page("index", function(self){
    var ell = js("<div></div>");
    ell.append("<h1>@ismael1361</h1>");
    return ell;
});