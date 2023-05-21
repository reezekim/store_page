class ProductLikeButton {
    constructor(){}

    addClickEvent(likeButton) {
        likeButton.addEventListener('click', (e) => {
            // html 기본동작(새로고침, submit 등)을 막는다.
            e.preventDefault(); 
            // 클릭 했을 때 url이 이동하지 않도록 하기 위해 버블링 중단하기(이벤트 캡처링과 버블링) 
            // 기본 동작 외 이벤트의 전파를 막는다
            e.stopPropagation(); 
            console.log('좋아요 버튼 클릭');
        });
    }    

    render(){
        const likeButton = document.createElement('button');
        likeButton.setAttribute('class', 'like-btn');

        const likeButtonIr = document.createElement('span');
        likeButtonIr.setAttribute('class', 'ir');
        likeButtonIr.innerText = '좋아요 버튼';

        likeButton.appendChild(likeButtonIr);
        this.addClickEvent(likeButton);

        return likeButton;
    }
}

export default ProductLikeButton;