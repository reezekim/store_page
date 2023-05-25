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

    // state가 바뀌면 리렌더링이 일어나야함.
    // setState만 해주는 곳.
    // 리렌더링도 하고있다.
    setState(newState){
        this.state = newState;
        this.updater();
    }

    updater(){
        const rendered = this.render();
        this.lastRendered.replaceWith(rendered);
        this.lastRendered = rendered;
    }

    // 클릭을 하면 좋아요 목록을 추가한다.
    // 추가되어있다면 "on"클래스를 버튼에 추가한다.
    // 좋아요 목록은 로컬스토리를 활용하여 클라이언트에서 저장하도록 한다.
    // 문제점 -> Componenet에서는 render에서 요소를 만들고 컴포넌트를 생성한다.
    // 해당 부분에서 요소를 직접 조작하는 것은 우리가 만든 규칙에 맞지 않아 보인다.
    // 그럼 직접 요소를 조작하지 않고 하려면 어떻게 해야할까?

    // 아이디어 -> 그러면 render에서 this.liked에 맞춰 렌더링 해주도록 하자!
    // 클릭을 했을때 this.liked만 바꾸자! 

    // render 밖에서 요소에 접근해서 조작하는걸 막아줬다. 없애줬다?
    // 바뀐 상태가 적용되지 않고 있다.
    // 이유 -> 해당 컴포넌트가 새로 렌더링이 되지 않고 있다. 

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

    initailize(){
        const rendered = this.render();
        this.lastRendered = rendered;
        return rendered;
    }
}

export default ProductLikeButton;