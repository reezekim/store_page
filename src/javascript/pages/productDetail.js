import { Component } from '../core/index.js';

class ProductDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product:{}
        }
        this.getProductData();
    }

    // 전체 상품 정보 가져오기
    async getProductData(){
        const response = await fetch(`http://test.api.weniv.co.kr/mall/${this.props.id}`);
        const data = await response.json();

        this.setState({product:data});
    }

    render(){
        const container = document.createElement('div');
        const element = document.createElement('h1');
        element.innerText = `${this.props.id} 상품상세 페이지입니다!`;

        const anchor = document.createElement('a');
        anchor.href = '/';
        anchor.innerText = '상품 목록 페이지로 이동';

        container.appendChild(anchor);
        container.appendChild(element);

        return container;
    }
}

export default ProductDetail;