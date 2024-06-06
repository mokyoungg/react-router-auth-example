import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import {
  fakeAuthProvider,
  loginAction,
  loginLoader,
  protectedLoader,
} from "./hooks/auth";
import Layout from "./component/Layout";
import PublicPage from "./component/PublicPage";
import ProtectedPage from "./component/ProtectedPage";
import LoginPage from "./component/LoginPage";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    // root 경로는 로그인한 경우 항상 사용자 정보를 제공합니다.
    loader() {
      return { user: fakeAuthProvider.username };
    },
    Component: Layout,
    children: [
      {
        index: true,
        Component: PublicPage,
      },
      {
        path: "login",
        action: loginAction,
        loader: loginLoader,
        Component: LoginPage,
      },
      {
        path: "protected",
        loader: protectedLoader,
        Component: ProtectedPage,
      },
    ],
  },
  {
    path: "/logout",
    async action() {
      await fakeAuthProvider.signout();
      return redirect("/");
    },
  },
]);

function App() {
  return (
    <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
  );
}

export default App;
