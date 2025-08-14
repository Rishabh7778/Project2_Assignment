export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface UsersApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

const API_KEY = 'reqres-free-v1';

export function fetchUsers(page: number): Promise<UsersApiResponse> {
  const url = `https://reqres.in/api/users?page=${page}&per_page=6`;
  console.log('[fetchUsers] fetching:', url);

  return fetch(url, {
    method: 'GET',
    headers: {
      'x-api-key': API_KEY,
      'Content-Type': 'application/json',
    },
  })
    .then(async (res) => {
      console.log('[fetchUsers] status:', res.status, res.statusText);
      if (!res.ok) {
        // read body (if any) for debugging and then throw
        const text = await res.text().catch(() => '<no body>');
        console.error('[fetchUsers] error body:', text);
        throw new Error(`Failed to fetch users: ${res.status} ${res.statusText} - ${text}`);
      }
      return res.json() as Promise<UsersApiResponse>;
    })
    .then((json) => {
      console.log('[fetchUsers] body:', json);
      return json;
    })
    .catch((err) => {
      console.error('[fetchUsers] caught error:', err);
      throw err;
    });
}

export function fetchUser(id: number): Promise<{ data: User }> {
  const url = `https://reqres.in/api/users/${id}`;
  console.log('[fetchUser] fetching:', url);

  return fetch(url, {
    method: 'GET',
    headers: {
      'x-api-key': API_KEY,
      'Content-Type': 'application/json',
    },
  })
    .then(async (res) => {
      console.log('[fetchUser] status:', res.status, res.statusText);
      if (!res.ok) {
        const text = await res.text().catch(() => '<no body>');
        console.error('[fetchUser] error body:', text);
        throw new Error(`Failed to fetch user: ${res.status} ${res.statusText} - ${text}`);
      }
      return res.json() as Promise<{ data: User }>;
    })
    .then((json) => {
      console.log('[fetchUser] body:', json);
      return json;
    })
    .catch((err) => {
      console.error('[fetchUser] caught error:', err);
      throw err;
    });
}