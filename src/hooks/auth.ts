import { LoaderFunctionArgs, redirect } from "react-router-dom";

interface AuthProvider {
  isAuthenticated: boolean;
  username: null | string;
  signin: (useranme: string) => Promise<void>;
  signout: () => Promise<void>;
}

export const fakeAuthProvider: AuthProvider = {
  isAuthenticated: false,
  username: null,
  signin: async (username: string) => {
    await new Promise((_) => setTimeout(_, 500));
    fakeAuthProvider.isAuthenticated = true;
    fakeAuthProvider.username = username;
  },
  signout: async () => {
    await new Promise((_) => setTimeout(_, 500));
    fakeAuthProvider.isAuthenticated = false;
    fakeAuthProvider.username = null;
  },
};

export const loginAction = async ({ request }: LoaderFunctionArgs) => {
  let formData = await request.formData();
  let userName = formData.get("username") as string | null;

  // useActionData() 를 통해 form input 을 검증하고 검증 오류를 반환합니다.
  if (!userName) {
    return {
      error: "You must provide a username to log in",
    };
  }

  // 로그인이 성공한 경우 올바른 대상으로 리다이렉트합니다.
  try {
    await fakeAuthProvider.signin(userName);
  } catch (error) {
    // 현재 사용되지 않았지만 이것이 오류를 처리하는 방법입니다.
    // 사용자 이름 / 비밀번호 조합의 입력을 확인하는 것과 같습니다.
    error: "Invalid login attempt";
  }

  let redirectTo = formData.get("redirectTo") as string | null;

  return redirect(redirectTo || "/");
};

export const loginLoader = async () => {
  if (fakeAuthProvider.isAuthenticated) {
    return redirect("/");
  }
  return null;
};

export const protectedLoader = ({ request }: LoaderFunctionArgs) => {
  // 사용자가 로그인하지 않은 상태에서 '/protected' 에 접속하려고 하는 경우
  // 인증이 성공하면 로그인한 유저를 다시 이 페이지로 리다이렉트 할 수 있는
  // 'from' 매개 변수를 주면서 '/login' 으로 리다이렉트합니다.
  if (!fakeAuthProvider.isAuthenticated) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }

  return null;
};
