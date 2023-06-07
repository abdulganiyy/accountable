import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export default function useUser() {
  const {
    state: { loading, user, error },
  } = useContext(AuthContext);

  return {
    user,
    loading,
    error,
  };
}
