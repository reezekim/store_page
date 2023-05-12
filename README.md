# 과제11_ store page (스토어 페이지)

## 바닐라JS로 SPA 만들기 및 API 비동기 통신 (스토어 페이지) 구현하기
<br /><br />

## 1. 요구사항
- **Vanilla JS로 제작**합니다.
- 외부 라이브러리를 사용하지 않습니다.
- SPA로 구현합니다.
    - 상품페이지
    - 상세페이지(모달)
    - 장바구니(주문페이지)
- `<div id="root"></div>` 안에 추가되도록 구현합니다.
- 장바구니 추가와 상품 좋아요 기능을 구현해야 합니다.
    - 장바구니 추가와 좋아요 상품 추가는 클라이언트내에서만 기록되고 동작합니다.
    - API를 사용하지 않습니다.
- GET 작업 외 POST, PUT, DELETE 작업은 요청만 보내고 반영되지 않습니다.
    - 혹시 이상한 게시물이 올라갈 수 있기 때문에 실제로 동작하지는 않습니다.
    - success 메시지를 통해 제대로 전송이 되었는지만 확인이 가능합니다.

### 1.1 추가 요구사항
- 쿠폰 기능 추가하기
    - discount : 할인가
    - discountRate : 할인율
    - 할인가 = 원가*할인율
- 존재하지 않는 상품처리
- 뒤로가기, 앞으로가기 기능 추가하기

### 1.2 디자인 요구사항
링크 : [디자인 피그마 링크](https://www.figma.com/file/KdWIgQ5VBQYPPlMB2ER6TX/%ED%8C%8C%EC%9D%B4%EB%84%90%EC%BD%94%EB%94%A9%ED%85%8C%EC%8A%A4%ED%8A%B8_API?node-id=0%3A1)

<br /><br />

## 2. Data 구조
- [데이터](http://35.76.53.28:8080/mall)를 미리 확인해 보세요.
    - 게시물 Data : [http://35.76.53.28:8080/mall](http://35.76.53.28:8080/mall)
    - 쿠폰 Data : [http://35.76.53.28:8080/coupon](http://35.76.53.28:8080/coupon)
- URL([https://test.api.weniv.co.kr/](http://test.api.weniv.co.kr/))로도 접속 가능합니다.
- image 요청 예시 : [https://test.api.weniv.co.kr/asset/img/5/thumbnailImg.jpg](https://test.api.weniv.co.kr/asset/img/5/thumbnailImg.jpg)

### 2.1 게시물 Data schema

```
{
		// 고유, 게시물번호로 사용
    id : 5,
    productName : "Hack Your Life 개발자 노트북 파우치",
    price : 36000,
    stockCount : 230,
    thumbnailImg : "asset/img/5/thumbnailImg.jpg",
		// 상품별 옵션
    option : [
        {
				// 각 상품별 옵션 id
        id:1,
        optionName:"13인치",
				// 옵션별 추가금
        additionalFee:0
        },
        {
        id:2,
        optionName:"15인치",
        additionalFee:1000
        }
    ],
    discountRate: 19,
    shippingFee: 1500,
		// 이미지 주소 배열형태로 제공
    detailInfoImage : ["asset/detail/5/detail1.png","asset/detail/5/detail2.png"],
    viewCount : 0,
    pubDate : "2022-02-28",
    modDate : "2022-02-28"
}
```

### 2.2 쿠폰 Data schema
```
{
		// 고유, 게시물번호로 사용
    id : 1,
    productid: 7,
    couponName : "제주코딩베이스캠프 코딩 연습장 세트 2,000원 할인 쿠폰",
    discount: 2000,
    discountRate: 0,
		//쿠폰 재고
    stockCount : 100,
    pubDate : "2022-02-28",
    modDate : "2022-02-28"
}
```

<br /><br />

## 3. API 명세
- http://35.76.53.28:8080/mall chrome 창에 위 URL을 입력해 보세요.

### 3.1 GET
```
* / - 메인화면, hello world 출력
* /mall - 전체 prodoct 출력
* /mall/:id - product 상세 정보
* /coupon - 전체 coupon 출력
* /coupon/:productid - coupon 상세 정보
```

### 3.2 POST (생성)
```
* /mall - 실제 생성 되지 않고, success만 body에 추가해서 다시 던져줌
```

### 3.3 PUT (수정)
```
* /mall/:id - 실제 수정 되지 않고, success만 body에 추가해서 다시 던져줌
```

### 3.4 DELETE (삭제)
```
* /mall/:id - 실제 삭제 되지 않고, success만 body에 추가해서 다시 던져줌
```

<br /><br />

## 4. 사용 기술
- HTML5
- CSS3
- JavaScript

<br /><br />

<!-- ## 5. 폴더구조 -->

