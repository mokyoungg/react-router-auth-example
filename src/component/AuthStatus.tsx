import { useFetcher, useRouteLoaderData } from "react-router-dom";

const AuthStatus = () => {
  // root route 에서 loader 한 로그인 유저 데이터를 가져옵니다.(존재하는 경우)
  let { user } = useRouteLoaderData("root") as { user: string | null };
  let fetcher = useFetcher();

  if (!user) {
    return <p>You are no logged in.</p>;
  }

  let isLoggingOut = fetcher.formData != null;

  return (
    <div>
      <p>Welcome {user}!</p>
      <fetcher.Form method="post" action="/logout">
        <button type="submit" disabled={isLoggingOut}>
          {isLoggingOut ? "Signing out..." : "Sign out"}
        </button>
      </fetcher.Form>
    </div>
  );
};

export default AuthStatus;
