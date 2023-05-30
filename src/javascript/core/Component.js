class Component {
    constructor(props){
        this.props = props;
        // console.log("props",props,"내용이 초기화 되었습니다.");
    }
    
    setState(newState){
        this.state = newState;
        this.updater();
    }

    updater(){
        const rendered = this.render();
        this.lastRendered.replaceWith(rendered);
        this.lastRendered = rendered;
    }

    render(){

    }
    
    initialize(){
        const rendered = this.render();
        this.lastRendered = rendered;
        return rendered;
    }
}

export default Component;