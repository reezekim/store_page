import { Component } from "../../core/index.js";

class ProductLikeButton extends Component{
    constructor(props){
        super(props)
        this.state = {
            liked:this.checkLikeList()
        }
    }

    checkLikeList(){
        if(!localStorage.getItem('likeList')){
            localStorage.setItem('likeList', JSON.stringify([]));
        }
        const likeList = JSON.parse(localStorage.getItem('likeList'));
        return likeList.includes(this.props.id);
    };
    
    changeLiked(){
        const likeList = JSON.parse(localStorage.getItem('likeList'));
        if(this.checkLikeList()){
            const newLikeList = likeList.filter((id)=>id!=this.props.id);
            localStorage.setItem('likeList',JSON.stringify(newLikeList));
        }else{
            likeList.push(this.props.id);
            localStorage.setItem('likeList',JSON.stringify(likeList));
        }
        console.log(this.checkLikeList());
        this.setState({liked:this.checkLikeList()});
    }

    render(){
        const likeButton = document.createElement('button');
        likeButton.setAttribute('class', `like-btn`);
        this.state.liked && likeButton.classList.add("on");

        const likeButtonIr = document.createElement('span');
        likeButtonIr.setAttribute('class', 'ir');
        likeButtonIr.innerText = '좋아요 버튼';

        likeButton.appendChild(likeButtonIr);
        likeButton.addEventListener('click', (e) => {
            // html 기본동작(새로고침, submit 등)을 막는다.
            e.preventDefault(); 
            // 클릭 했을 때 url이 이동하지 않도록 하기 위해 버블링 중단하기(이벤트 캡처링과 버블링) 
            // 기본 동작 외 이벤트의 전파를 막는다
            e.stopPropagation(); 
            this.changeLiked()
            // console.log(this.state.liked);
        })

        return likeButton;
    }
    // 최초 초기화 -> 내부적으로 render가 실행됨 -> 마지막 렌더링 결과 -> state가 바뀌면 새로운 state에 맞춰서 새로 render
}

export default ProductLikeButton;