'use client';

import AuthContext from "@/context/AuthContext";
import React, {ReactNode, useEffect, useState} from "react";
import {isTokenValid, loadToken} from "@/lib/utils";
import {usePathname, useRouter} from "next/navigation";

const AuthProvider: React.FC<{ children: ReactNode }> = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();
  const currentPath = usePathname();

  useEffect(() => {
    if (isTokenValid(loadToken())) {
      setIsAuthenticated(true);
      if (currentPath.includes("signin")) {
        router.push("/");
      }
    } else {
      setIsAuthenticated(false);
      !currentPath.includes("signin") && router.push("/signin");
    }
  }, [currentPath, router]);

  return (
    <AuthContext.Provider value={{isAuthenticated}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
