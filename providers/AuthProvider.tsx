'use client';

import { IAuthUser } from '@/interfaces/authUser';
import { createContext, useState } from 'react';

// context for user data
export const AuthContext = createContext('' as unknown as IAuthUser);

// provider component
export const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<string>(''); // user state( name, etc )

  // function to set the user data
  const setAuthUser = (userData: any) => {
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
