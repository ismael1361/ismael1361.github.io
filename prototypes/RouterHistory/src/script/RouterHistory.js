//import React, {component} from 'React';

export default class RouterHistory extends React.Component{
    constructor(props){
        super(props);

        this.indexPage = -1;
        this.pages = [];
        this.history = [];
    }

    componentDidMount(){
        window.onpopstate = ()=>{
            this.toURLPage();
        };
    }

    equalPaths(a, b){
        a = a.replace(/^(\/+)/gi, "").replace(/(\/+)$/gi, "").split("/");
        b = b.replace(/^(\/+)/gi, "").replace(/(\/+)$/gi, "").split("/");
        if(a.length == 1 && a[0] == ""){return true;}
        let c = true;
        a.forEach((d, e)=>{
            if((/^\{\{([-a-zA-Z0-9@:%_\+.~#?&=]+)\}\}$/gi).test(d) !== true && d != b[e] && c == true){
                c = false;
                return true;
            }
        });
        return c;
    }

    toURLPage(){
        let path = window.location.pathname, index;
        index = this.pages.findIndex((a, b)=> this.equalPaths(a.path, path));

        if(index < 0 || index >= this.pages.length){
            return;
        }

        this.indexPage = index;
        this.setState({});
    }

    addPage(path, component){
        window.clearTimeout(this._updatePageTimeOut);

        let infoPage = {}, index;
        index = this.pages.findIndex((a, b)=> a.path == path);
        index = index >= 0 ? index : this.pages.length;

        infoPage.index = index;
        infoPage.path = path;
        infoPage.component = component instanceof React.Component || typeof component === "function" ? component : ()=>{return [];};

        this.pages[index] = infoPage;

        this._updatePageTimeOut = window.setTimeout(()=>{
            this.toURLPage();
        }, 20);
    }

    render(){
        if(this.indexPage >= 0 && this.indexPage < this.pages.length){
            return this.pages[this.indexPage].component({});
        }

        return [];
    }
}