import { Component, createComponent } from '../../core/index.js';
import { QuantityInput, OptionSelector, SelectedOption } from './index.js'

class OrderForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            quantity:this.props.product.option.length>0?0:1,
            selectedProductOptions:[]
        }
    }
    addSelectedProductOption(optionId) {
        const isExist = this.state.selectedProductOptions.filter((selectedProduct)=>selectedProduct.optionId==optionId).length>0;
        if(isExist) return;

        const newSelectedProductOption = {
            optionId:optionId,
            quantity:1,
        }

        const newSelectedProductOptions = this.state.selectedProductOptions;
        newSelectedProductOptions.push(newSelectedProductOption);
        const newTotalQuantity = this.getTotalQuantity(newSelectedProductOptions);
        this.setState({...this.state,quantity:newTotalQuantity,selectedProductOptions:newSelectedProductOptions});
    }

    removeSelectedProductOption(optionId){
        const newSelectedProductOptions = this.state.selectedProductOptions.filter((selectedProductOption)=>{
            return selectedProductOption.optionId!=optionId;
        })
        const newTotalQuantity = this.getTotalQuantity(newSelectedProductOptions);
        this.setState({...this.state,quantity:newTotalQuantity,selectedProductOptions:newSelectedProductOptions})
    }

    getTotalQuantity(newSelectedProductOptions){
        const newTotalQuantity = newSelectedProductOptions.reduce((acc,selectedProductOption)=>{
            return acc+selectedProductOption.quantity;
        },0)
        return newTotalQuantity;
    }

    setOptionQuantity(optionId, newQuantity){
        const newSelectedProductOptions = this.state.selectedProductOptions.map((selectedOption)=>{
            if(optionId==selectedOption.optionId){
                return {...selectedOption, quantity:newQuantity}
            } else {
                return selectedOption;
            }
        })
        const newTotalQuantity = this.getTotalQuantity(newSelectedProductOptions);
        this.setState({...this.state,quantity:newTotalQuantity,selectedProductOptions:newSelectedProductOptions});
    }

    setTotalQuantity(newQuantity){
        const maxQuantity = this.props.product.stockCount;
        const minQuantity = 1;
        if(newQuantity>maxQuantity) this.setState({quantity:maxQuantity});
        else if(newQuantity<minQuantity) this.setState({quantity:1});
        else this.setState({...this.state,quantity:newQuantity});
    }

    getTotalPrice(){
        const product = this.props.product;
        const totalPrice = product.price*0.01*(100-product.discountRate)*this.state.quantity;
    
        const totalAdditionalfee = this.state.selectedProductOptions.reduce((acc,selectedProductOption)=>{
            const optionIdx = product.option.findIndex((option)=>option.id==selectedProductOption.optionId);
            acc += selectedProductOption.quantity*product.option[optionIdx].additionalFee;
            return acc;
        },0);
        return totalPrice+totalAdditionalfee;
    }

    render(){
        console.log(this.state.selectedProductOptions);
        const orderForm = document.createElement('form');
        orderForm.setAttribute('class', 'product-order-form');

        const productOptionContainer = document.createElement('div');
        productOptionContainer.setAttribute('class', 'product-option');

        const delivertyTitle = document.createElement('span');
        delivertyTitle.setAttribute('class', 'delivery-title');
        delivertyTitle.innerText = `택배 배송 / ${this.props.product.shippingFee>0?this.props.product.shippingFee.toLocaleString('ko-kr')+'원':'무료 배송'}`;

        const selectedProductContainer = document.createElement('div');
        selectedProductContainer.setAttribute('class', 'selected-product');

        // console.log(this.props.product.option.length, '옵션 갯수');
        if (this.props.product.option.length > 0) {
            // 옵션이 있을때 나오는 부분
            // 옵션을 선택했을때 선택한 옵션이 생겨야한다!
            const optionSelector = createComponent(OptionSelector, {
                option:this.props.product.option,
                addSelectedProductOption:this.addSelectedProductOption.bind(this)
            });
            const selectedProductOptionList = document.createElement('ul');
            this.state.selectedProductOptions.forEach((selectedProductOption)=>{
                const selectedOption = this.props.product.option.find((option) => option.id==selectedProductOption.optionId);
                const optionName = selectedOption.optionName;
                const productPrice = this.props.product.price*(1-this.props.product.discountRate*0.01);
                const optionPrice = productPrice + selectedOption.additionalFee;

                const quantityInput = createComponent(QuantityInput, {...this.props,
                        quantity:selectedProductOption.quantity, 
                        setQuantity:this.setOptionQuantity.bind(this,selectedProductOption.optionId)
                    });

                const selectedProductOptionItem = createComponent(SelectedOption,{
                    optionName:optionName,
                    optionPrice:optionPrice,
                    quantityInput:quantityInput,
                    removeSelectedProductOption:this.removeSelectedProductOption.bind(this,selectedProductOption.optionId)
                }); //옵션아이템에 해당되는 컴포넌트 만들기
                selectedProductOptionList.append(selectedProductOptionItem);
            })
            selectedProductContainer.append(optionSelector, selectedProductOptionList);
        } else {
            // 옵션이 없을때!
            const quantityInput = createComponent(QuantityInput, {...this.props,
                        quantity:this.state.quantity, 
                        setQuantity:this.setTotalQuantity.bind(this)
                    });
            selectedProductContainer.append(quantityInput);
        }

        const totalPriceContainer = document.createElement('div');
        totalPriceContainer.setAttribute('class', 'total-price');

        const totalPriceTitle = document.createElement('span');
        totalPriceTitle.setAttribute('class', 'title');
        totalPriceTitle.innerText = '총 상품금액';

        const totalOrderInfo = document.createElement('div');
        totalOrderInfo.setAttribute('class', 'total-order-info');

        const peoductQuantity = document.createElement('strong'); 
        peoductQuantity.setAttribute('class', 'quantity');

        const peoductQuantityNum = document.createElement('span'); 
        // Quantityinput기능 구현되면서 같이 변형하기
        peoductQuantityNum.innerText = this.state.quantity.toLocaleString('ko-kr');
        peoductQuantity.append('총 수량',peoductQuantityNum, '개');

        const totalPrice = document.createElement('strong'); 
        totalPrice.setAttribute('class', 'price l-price');
        const totalProductPrice = this.getTotalPrice();
        totalPrice.innerText = (totalProductPrice).toLocaleString('ko-kr');

        const priceType = document.createElement('span');
        priceType.innerText = '원';
        totalPrice.append(priceType);

        totalOrderInfo.append(peoductQuantity, totalPrice);

        totalPriceContainer.append(totalPriceTitle, totalOrderInfo);

        productOptionContainer.append(delivertyTitle, selectedProductContainer);
        orderForm.append(productOptionContainer, totalPriceContainer);
        return orderForm;
    }
}
export default OrderForm;