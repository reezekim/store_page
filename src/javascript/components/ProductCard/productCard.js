import { ProductImage, ProductPrice, ProductName, ProductLikeButton } from "../Product/index.js";

class ProductItem {
    constructor(item){
        this.item = item;
    }

    render() {
        const product = document.createElement('a');
        product.setAttribute('href', `/detail/${this.item.id}`);
        product.setAttribute('class', 'product-item');

        const productImage = new ProductImage(this.item.thumbnailImg);
        const productName = new ProductName(this.item.productName);
        const productPrice = new ProductPrice(this.item.price);
        const productLikeButton = new ProductLikeButton();

        product.appendChild(productImage.render());
        product.appendChild(productName.render());
        product.appendChild(productPrice.render());
        product.appendChild(productLikeButton.render());

        return product;
    }
}

export default ProductItem;