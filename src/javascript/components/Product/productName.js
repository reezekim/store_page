import { Component } from "../../core/index.js";

class productName extends Component{
    render(){
        const productName = document.createElement('strong');
        productName.setAttribute('class', 'product-name sl-ellipsis');
        productName.innerText = this.props.name;
        return productName;
    }
}

export default productName;