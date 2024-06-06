# React Router Auth Provider Example
React Router 에서 제공하는 auth provider example 을 연습합니다.<br/> 
https://github.com/remix-run/react-router/tree/dev/examples/auth-router-provider


이 예는 RouterProvider를 사용할 때 인증된 사용자로 라우터에 대한 액세스를 제한하는 방법을 설명합니다.<br/>
BrowserRouter 에서 인증이 처리되는 방식과 비교했을 때 가장 큰 차이점은 RouterProvider 가 렌더링에서 페칭을 분리하기 때문에 <br/>
사용자 인증 상태를 얻기 위해 더 이상 React 컨텍스트 및/또는 훅에 의존할 수 없다는 것입니다.<br/> 
route laoder와 action 함수에서 이 정보를 사용할 수 있도록 React 트리 외부에서 이 정보에 액세스해야 합니다.
