class productPrice {
    constructor(price){
        this.price = price;
    }

    render(){
        const productPriceContainer = document.createElement('div');
        productPriceContainer.setAttribute('class', 'product-price');

        const productPrice = document.createElement('strong');
        productPrice.setAttribute('class', 'price m-price');
        productPrice.innerText = this.price;

        const productType = document.createElement('span');
        productType.innerText = '원';
        
        productPrice.appendChild(productType);
        productPriceContainer.appendChild(productPrice);

        return productPrice;
    }
}

export default productPrice;