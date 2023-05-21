import { ProductPage, ProductDetail } from './pages/index.js';
import { Router } from "./utils/index.js";

export default class App {
    constructor(props){
        this.props = props;
    }

    setup(){
        const {el} = this.props;

        const router = new Router({
            "/":ProductPage,
            // "/detail":ProductDetail, 
            //라우터를 정의할 때 좀 더 명확하게 확인할 수 있도록 파라미터를 적어둔 하나만 남겨둔다.
            "/detail/:id":ProductDetail,
        });

        router.init(el);
    }
}

