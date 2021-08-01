import axios from 'axios';
import { useEffect, useState } from 'react';
import { User } from '../context/user';

const localStorageKey = 'auth';

export const saveToken = (token: string) => {
  localStorage.setItem(localStorageKey, token);
};

export const clearToken = () => {
  localStorage.removeItem(localStorageKey);
};

export const getToken = () => {
  return localStorage.getItem(localStorageKey);
};

const getTokenPayload = (token: string) => {
  return JSON.parse(atob(token.split('.')[1]));
};

export const hasToken = () => {
  const token = getToken();

  if (!token) return false;

  try {
    const tokenPayload = getTokenPayload(token);

    return !!tokenPayload.id && !!tokenPayload.email;
  } catch {
    return false;
  }
};

export const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
});

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>({
    loggedIn: hasToken()
  });

  useEffect(() => {
    (async () => {
      if (user.loggedIn && !user.name) {
        try {
          setLoading(true);
          const { data: userData } = await axios.get('/api/user', getAuthHeaders());
          setUser({
            ...user,
            ...userData
          });
          setLoading(false);
        } catch {
          setLoading(false);
          clearToken();
          setUser({ loggedIn: false });
        }
      }
    })();
  }, [user, user.loggedIn]);
  
  return { user, setUser, loading };
};
