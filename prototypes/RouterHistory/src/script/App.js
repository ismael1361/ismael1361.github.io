//https://www.examplefiles.net/cs/412432

import Root from './src/script/RouterHistory';

class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount(){
        
    }

    refe(e){
        e.addPage("/prototypes/{{id}}", ()=>{
            console.log("ok 1");
            return <h1>Title 01</h1>
        });
        e.addPage("/", ()=>{console.log("ok")});
    }

    render(){
        return <Root ref={this.refe}/>
    }
}

ReactDOM.render(<Main />, document.getElementById("app"));