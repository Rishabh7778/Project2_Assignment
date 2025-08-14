// src/TestApi.tsx
import React, { useEffect } from 'react';
import { fetchUsers, fetchUser } from './utils/api';

export default function TestApi() {
  useEffect(() => {
    fetchUsers(1)
      .then((res) => console.log('fetchUsers result:', res))
      .catch((err) => console.error('fetchUsers error:', err));

    fetchUser(1)
      .then((res) => console.log('fetchUser result:', res))
      .catch((err) => console.error('fetchUser error:', err));
  }, []);

  // return <div>Test API — check the console</div>;
}
