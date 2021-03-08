// adapted from: https://dev.to/siim/working-with-access-and-refresh-tokens-using-next-js-and-apollo-30c6
import { createContext, useContext, useEffect, useReducer } from "react";
import { isServer } from "../lib/utilities.is-server";

interface IAuthContextProps {
  authState: IAuthState;
  setAuthToken?: (obj: IAuthState) => void;
  signIn?: (userId: string, token: string) => void;
  signOut?: () => void;
}

export interface IAuthState {
  token?: string;
  userId?: string;
}

type AuthAction =
  | { type: "set_auth_token"; payload: string }
  | { type: "set_user_id"; payload: string }
  | { type: "sign_in"; payload: { token: string; userId: string } }
  | { type: "sign_out" };

const AuthContext = createContext<IAuthContextProps>({
  authState: { token: undefined, userId: undefined }
});

const useAuth = () => useContext(AuthContext);

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AuthProviderProps {}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const initialAuthState = {
    token: undefined,
    userId: undefined
  };
  // const [authState, setAuthState] = useState(initialAuthState);

  const [authState, authDispatch] = useReducer(
    authReducer,
    initialAuthState,
    initAuth
  );

  function signIn(userId: string, token: string): void {
    authDispatch({
      type: "sign_in",
      payload: {
        token,
        userId
      }
    });

    if (!isServer()) {
      localStorage.setItem("userId", userId);
    }
  }

  function signOut(): void {
    authDispatch({ type: "sign_out" });

    if (!isServer()) {
      localStorage.removeItem("userId");
    }
  }

  function setAuthToken(tokenObj: IAuthState): void {
    authDispatch({
      type: "set_auth_token",
      payload: tokenObj?.token ?? ""
    });
  }

  useEffect(() => {
    if (
      typeof localStorage.getItem("userId") === "string" &&
      localStorage.getItem("userId") !== authState.userId
    ) {
      authDispatch({
        type: "set_auth_token",
        payload: localStorage.getItem("userId")!
      });
    }
  }, [authState]);

  return (
    <AuthContext.Provider
      value={{
        // token: authState.token,
        // userId: authState.userId,
        authState: {
          token: authState.token,
          userId: authState.userId
        },
        setAuthToken,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function authReducer(state: IAuthState, action: AuthAction): IAuthState {
  switch (action.type) {
    case "set_auth_token":
      return {
        token: action.payload,
        userId: state.userId
      };

    case "set_user_id":
      return {
        token: state.token,
        userId: action.payload
      };

    case "sign_in":
      return {
        token: action.payload.token,
        userId: action.payload.userId
      };

    case "sign_out":
      return {
        token: undefined,
        userId: undefined
      };

    default:
      return {
        token: state.token,
        userId: state.userId
      };
  }
}

function initAuth(initialAuthState: IAuthState) {
  return initialAuthState;
}

export { AuthProvider as default, useAuth };
