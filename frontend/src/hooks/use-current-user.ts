import {useEffect, useState} from 'react';
import {User} from '@/service/schema/user';
import {getCurrentUser} from '@/service/auth';
import {isTokenValid, loadToken} from '@/lib/utils';

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = loadToken();
    if (isTokenValid(token)) {
      getCurrentUser()
      .then(setUser)
      .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return {user, loading};
}
