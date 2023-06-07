"use client";
import { createContext, useReducer, useEffect } from "react";

type StateType = {
  user: any;
  error: string;
  loading: boolean;
};

const INITIAL_STATE: StateType = {
  user: null,
  error: "",
  loading: false,
};

type SetUserAction = {
  type: "set user";
  payload: any;
};

type RemoveUserAction = {
  type: "remove user";
};

type ActionType = SetUserAction | RemoveUserAction;

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "set user":
      return {
        ...state,
        payload: action.payload,
      };
    case "remove user":
      return {
        user: null,
        loading: false,
        error: "",
      };

    default:
      return state;
  }
};

export const AuthContext = createContext<{
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
}>({
  state: INITIAL_STATE,
  dispatch: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    let user;

    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      user = JSON.parse(storedUser);
    }

    dispatch({ type: "set user", payload: user });
  }, [dispatch]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
