
class ProductItem {
    constructor(item){
        this.item = item;
    }

    render() {
        const productItem = document.createElement('li');

        const productCard = document.createElement('a');
        productCard.setAttribute('href', `/detail/${this.item.id}`);
        productCard.setAttribute('class', 'product-item');

        productCard.appendChild(productImageContainer);
        productCard.appendChild(productName);
        productCard.appendChild(productPriceContainer);

        productItem.appendChild(productCard);

        // productItem.innerHTML = `
        //     <a href='/detail/${this.item.id} class='product-item'>
        //         <div class='product-item'>
        //             <img src='http://test.api.weniv.co.kr/${this.item.thumbnailImg}' alt='상품이미지' />
        //         </div>
        //         <strong class='product-name'>${this.item.productName}</strong>
        //         <div class='product-price'>
        //             <strong class='product-price m-price'>${this.item.price}<span>원</span></strong>
        //         </div>
        //     </a>
        // `;
        return productItem;
    }
}

export default ProductItem;