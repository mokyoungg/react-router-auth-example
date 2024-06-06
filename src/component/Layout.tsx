import { Link, Outlet } from "react-router-dom";
import AuthStatus from "./AuthStatus";

const Layout = () => {
  return (
    <div>
      <h1>Auth Example using RouterProvider</h1>

      <p>
        이 예제는 3가지 페이지의 간단한 로그인 흐름을 보여줍니다.
        <br />
        : public, protected, login <br />
        protected 페이지를 보려면 먼저 로그인해야 합니다.
      </p>

      <p>
        먼저, public 페이지를 방문합니다. 그리고 protected 페이지를 방문합니다.
        <br />
        아직 로그인 되어 있지 않으므로 로그인 페이지로 리다이렉트 됩니다. <br />
        로그인 된 후에는 protected 페이지로 다시 리다이렉트 됩니다.
      </p>

      <p>
        매번 URL이 변경되는 것에 주목하세요. 여기서 뒤로 버튼을 클릭하면, 로그인
        페이지로 돌아가지 않습니다.
        <br />
        이미 로그인을 했기 때문입니다.
        <br />
        한번 시도해보세요. 그러면 로그인하기 직전에 방문했던 public 페이지로
        돌아가는 것을 볼 수있습니다. <br />
      </p>

      <AuthStatus />

      <ul>
        <li>
          <Link to="/">Public Page</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
};

export default Layout;
