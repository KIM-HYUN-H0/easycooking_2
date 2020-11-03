# Typescript, Firebase 를 사용한 내 냉장고를 부탁해

## 요약

### 소개
#### https://github.com/KIM-HYUN-H0/easycooking ( React(class Component) + Node.js + MongoDB )
#### 기존에 React + Express 로 제작한 프로젝트인 내 냉장고를 부탁해를 얼추 완성하고 나서, 현재 실력으로는 프론트엔드와 백엔드 둘다 공부하는 것이 욕심이라고 생각하여 백엔드를 파이어베이스로, 리액트는 타입스크립트로 다시 작성한 프로젝트입니다.
#### create-react-app 으로 프로젝트를 생성할때 타입스크립트 옵션을 주고, Redux를 적용하고부터 타입스크립트를 사용하였습니다.

### 개발환경
#### Front
- [React](#react)

#### Back
- [Firebase](#firebase)

#### ETC
- [Material-UI](#material-ui)
- [Tui-editor](#tui-editor)
- [Redux ( Ducks 패턴으로 구현 )](#redux)
- [Intersection Observer ( Infinite Scroll 구현 )](#intersection-observer)

### [미흡했던 부분](#미흡한-부분)
- Typescript 로 만들기만 했고 공부가 미흡해 적용하지 못함 ( Redux를 시작으로 개선중 )
- 디자인
- 테스트 부족

### 배포 
https://easycooking-f4984.firebaseapp.com/


-------------


## 본문

### 개발환경
#### Front
- ##### React
  - Function Component, Hooks 

#### Back
- ##### Firebase
  - Node.js 로 백엔드까지 한번에 구성하기에는 실력이 많이 미흡하다고 느껴 프론트에 집중하고자 파이어베이스를 사용하였습니다. 
  - Auth(인증), Firestore(데이터베이스), Storage(사진 업로드) 기능을 사용하였고, 요금제 업그레이드를 하지 않아서 Function은 사용하지 않았습니다.

#### ETC
- ##### Material-UI
  - Material-UI 공식 사이트를 참고하여 디자인 대부분에 사용되었습니다. 바꾸고싶은 부분은 MakeStyles를 사용하였습니다.
  
- ##### Tui-editor
  - 위지윅 에디터를 찾아보다가, 제일 먼저 발견하게 되어 사용하게 되었습니다. 
  - 기능은 Image 업로드 기능만 사용하였고, 그에 대한 코드는 다음과 같습니다.
  ```
  //Write.tsx
  <Editor
                previewStyle="vertical"
                height="300px"
                initialEditType="wysiwyg"
                placeholder="가장 마지막 사진이 썸네일로 자동저장됩니다."
                toolbarItems={["image"]}                                 
                ref={content}
                hooks={{
                    addImageBlobHook: async (blob, callback) => {
                        const upload = await uploadImage(blob);
                        callback(upload, 'alt text');
                        return false;
                    },
                }}
            />
            
  //uploadImage Function
  const uploadImage =  (blob: any) => {
          return dbs                                    //Firebase Storage
              .child(uuidv4())                          //uuidv4() = 구글링해서 가져온 사진 제목 랜덤으로 붙이기 https://stackoverflow.com/questions/105034/how-to-create-guid-uuid
              .put(blob)
              .then(async (snapshot) => {
                  let returnURL = '';
                  await snapshot.ref.getDownloadURL().then((URL) => {
                      returnURL = URL;
                  })
                  return returnURL;
              })
      }
  ```
  
- ##### Redux
  - Redux는 이해하기 굉장히 어려웠는데, 프로젝트의 디렉토리 구조도 개선이 필요했고, Action, store, reducer 전부 나눠져서 관리해야 하는 것도 Mobx 에 비해서 까다롭다고 느껴졌습니다. 하지만 Ducks 패턴을 알고나니 학습속도가 빨라져서 Redux 학습이라는 목표를 성공시킬 수 있었습니다.
  
- ##### Intersection Observer
  - 게시물들을 불러올 때 뉴스피드처럼 무한스크롤 기능을 구현하고 싶었습니다. 얼추 구현은 했는데, 솔직히 원활하지 않다고 생각합니다. 다른 글들은 타겟을 게시물의 맨 마지막 글로 하는데, 이부분이 조금 힘들어서 아래 코드처럼 하단부분에 div 태그를 줘서 타겟으로 잡았습니다. 
```
//Board.tsx
...
<div id="target" ></div>

//Infinite Scroll 적용 부분
useEffect(() => {
        const ioOptions = {
            root: null,                //element | null = viewport
            threshold: 1
        }
        const target = document.querySelector('#target');
        const io = new IntersectionObserver(callback, ioOptions);       //callback 하단 참조
        io.observe(target!);

        return () => {
            io.disconnect();
        }
}, [pageCount, props.match.params.idx])

//callback
const callback = (entries: any, observer: any) => {
        if (entries[0].isIntersecting) {
            LoadRecipe();                                     //레시피 불러오는 함수
        }
}
```

### 미흡한 부분
- Typescript 로 만들기만 했고 공부가 미흡해 적용하지 못함 ( Redux를 시작으로 개선중 )
  - 타입스크립트로 개발환경을 만드니, 오류를 잡아주는 것이 너무 편했습니다. 하지만 자바스크립트처럼 작성한 제 코드는 내일의 저에게 오류를 알려주지 않았고, 점차 타입스크립트 사용을 습관화할 것입니다.
- 디자인
  - 예술감각이 정말 떨어지다 보니 디자인은 둘째 치고, 최대한 보기 불편하지만 않게끔 노력했습니다. 피드백 주시면 정말 감사드립니다. 
- 테스트 부족
  - 유저가 많을 때, 게시판이 어떤 오류가 날지 확인을 하지 않았습니다. 
  - 오류 예상 부분 1. A 사용자가 레시피 구경중에, B 사용자가 글을 올리면 레시피 로딩에 오류가 있을 것 같습니다. 
  - 오류 예상 부분 2. 게시물 작성 버튼을 누르면, 다음과 같이 동작됩니다. ( 게시물 작성 버튼 클릭 -> idx 변수에 autoIncrement - board - count 저장 후 1 추가 -> idx와 함께 레시피 작성 ) 이 부분에서, 동시에 작성 버튼을 누르면 오류가 생길 수도 있을 것 같습니다.
  

### 배포 
https://easycooking-f4984.firebaseapp.com/
