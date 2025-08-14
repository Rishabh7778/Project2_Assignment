import React, { useEffect } from 'react';
import { fetchAllUsers, fetchUser } from './utils/api';

export default function TestApi() {
  useEffect(() => {
    fetchAllUsers()
      .then((res) => console.log('fetchAllUsers result:', res))
      .catch((err: unknown) => console.error('fetchAllUsers error:', err));

    fetchUser(1)
      .then((res) => console.log('fetchUser result:', res))
      .catch((err: unknown) => console.error('fetchUser error:', err));
  }, []);

  return <div>Test API — check the console</div>;
}
