import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { userLogin } from "store/reducers/currentUser.reducer";
import { CurrentUser } from "services/User/user.service";

interface Props {
  router: ReturnType<typeof useRouter>;
  redirectBasedOnStatus: (status: boolean) => Promise<boolean>;
  dispatchUserLogin: (userData: CurrentUser) => void;
}

export const useCustomNavigation = (): Props => {
  const router = useRouter();
  const dispatch = useDispatch();
  const location = router.pathname;

  // Redirige basado en el estado
  const redirectBasedOnStatus = (status: boolean): Promise<boolean> => {
    try {
      if (location === "/terminosycondiciones" && status) {
        return router.push("/dashboard");
      }

      if (location === "/" && status) {
        return router.push("/dashboard");
      }

      if(!status){
        return router.push("/terminosycondiciones");
      }

      return Promise.reject(true)
    } catch (error) {
      console.error("Navigation error:", error);
      return Promise.reject(error);
    }
  };

  // Dispatch para iniciar sesión
  const dispatchUserLogin = (userData: CurrentUser): void => {
    if (typeof window !== "undefined") {
      const token = window.sessionStorage.getItem("token");
      dispatch(userLogin({ ...userData, token: token as string }));
    }

   
  };

  return {
    router,
    redirectBasedOnStatus,
    dispatchUserLogin,
  };
};
