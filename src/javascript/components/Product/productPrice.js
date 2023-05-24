import Component from '../../../core/Component.js';

class productPrice extends Component{
    render(){
        const productPriceContainer = document.createElement('div');
        productPriceContainer.setAttribute('class', 'product-price');

        const productPrice = document.createElement('strong');
        productPrice.setAttribute('class', 'price m-price');

        const priceType = document.createElement('span');
        priceType.innerText = '원';
        productPriceContainer.appendChild(productPrice);

        if(this.props.discountRate > 0){
            console.log("할인된 상품이 있다!");
            // 할인된 금액 계산
            // this.price = 뭔가 할인율이 계산된 금액!
            // 할인과 관련된 eleement를 추가한다.
            const disconutRateContainer = document.createElement('div');
            disconutRateContainer.setAttribute('class', 'price-discount');

            const originPrice = document.createElement('strong');
            originPrice.setAttribute('class', 'price-strikethrough');
            originPrice.innerText = this.props.price;

            const disconutRateDisplay = document.createElement('strong');
            disconutRateDisplay.setAttribute('class', 'discount-rate');
            disconutRateDisplay.innerText = this.props.discountRate + '%';

            this.price = this.props.price - this.props.price*(0.01*this.props.discountRate);

            disconutRateContainer.appendChild(originPrice);
            disconutRateContainer.appendChild(priceType.cloneNode(true));
            disconutRateContainer.appendChild(disconutRateDisplay);
            productPriceContainer.appendChild(disconutRateContainer);
        } 

        productPrice.innerText = this.props.price;
        productPrice.appendChild(priceType);
        return productPriceContainer;
    }
}

export default productPrice;