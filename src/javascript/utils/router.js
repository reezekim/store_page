class Router {
    // const router = new Router({
    //     "/":ProductPage,
    //     "/detail":ProductDetail
    //     "/detail/:id":ProductDetail
    // });
    constructor(routes){
        if(!routes){
            console.error("Can not initailize Routes, need routes!");
        }
        this.routes = routes;

        for (const key in routes) {
            const route = routes[key];
            if(key.indexOf(':') > -1) {
                const [_, routeName, param] = key.split('/');
                this.routes['/' + routeName] = route;
                delete this.routes[key];
            }
        }
        console.log(this.routes);
    }

    init(rootElementId) {
        if(!rootElementId){
            console.error("Can not initailize Route, not define rootElementId");
            return null;
        }
        this.rootElementId = rootElementId;

        // 라우팅 되는 부분
        // about:blank의 window.location.pathname은 blank
        // http://paullab.co.kr/abc의 window.location.pathname은 /abc
        // http://paullab.co.kr/about.html의 window.location.pathname은 /about.html
        this.routing(window.location.pathname);

        window.addEventListener('click', (e) => {
            if(e.target.tagName.toLowerCase() === 'a'){
                e.preventDefault();
                this.routePush(e.target.href);
            }
        });

        window.onpopstate = () => this.routing(window.location.pathname);
    }

    routePush(pathname) {
        window.history.pushState({}, null, pathname);
        this.routing(window.location.pathname);
    }

    routing(pathname) {
        const [_, routeName, param] = pathname.split('/');
        let page = '';

        // /detail/10
        if(this.routes[pathname]){
            const component = new this.routes[pathname];
            page = component.render();
        } else if(param) {
            const component = new this.routes['/' + routeName](param);
            page = component.render();
        }

        if(page){
            this.render(page);
        }
    }

    render(page){
        const rootElement = document.querySelector(this.rootElementId);
        rootElement.innerHTML = '';
        rootElement.appendChild(page);
    }
}

export default Router;