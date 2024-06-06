import {
  Form,
  useActionData,
  useLocation,
  useNavigation,
} from "react-router-dom";

const LoginPage = () => {
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  let from = params.get("from") || "/";

  let navigation = useNavigation();
  let isLogginIn = navigation.formData?.get("username") != null;

  let actionData = useActionData() as { error: string } | undefined;

  return (
    <div>
      <p>You must log in to view the page at</p>

      <Form method="post" replace>
        <input type="hidden" name="redirectTo" value={from} />
        <label>
          Username : <input name="username" />
        </label>
        <button type="submit" disabled={isLogginIn}>
          {isLogginIn ? "Logging in..." : "Login"}
        </button>

        {actionData && actionData?.error ? (
          <p style={{ color: "red" }}>{actionData?.error}</p>
        ) : null}
      </Form>
    </div>
  );
};

export default LoginPage;
