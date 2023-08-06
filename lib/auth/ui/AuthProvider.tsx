import { useCurrentUser } from "@lib/auth/data/authHooks";
import { createContext, ReactNode, useContext, useEffect } from "react";

const AuthContext = createContext<
  Partial<ReturnType<typeof useCurrentUser>> 
>({});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const currentUser = useCurrentUser();

  useEffect(() => {
    const interval = setInterval(currentUser.refetch, 1 * 60 * 1000); // 1 minute
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ ...currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
