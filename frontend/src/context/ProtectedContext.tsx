import { createContext, useContext, type ReactNode } from "react";
import type { IUser } from "../utils/types";

type ProtectedContextType = {
  user: IUser
};

const ProtectedContext = createContext<ProtectedContextType | undefined>(undefined);

export function ProtectedContextProvider({ children, user}: { children: ReactNode, user: IUser  }) {

  return (
    <ProtectedContext.Provider value={{user}}>
    {children}
    </ProtectedContext.Provider>
  )
}


export function useProtectedContext() {
  const context = useContext(ProtectedContext);
  if (!context) {
    throw new Error("useProtectedContext must be used within a ProtectedContextProvider");
  }
  return context;
}
