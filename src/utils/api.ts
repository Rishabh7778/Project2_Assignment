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


export async function fetchAllUsers(): Promise<User[]> {
  let allUsers: User[] = [];
  for (let p = 1; p <= 2; p++) { // reqres.in has only 2 pages
    const url = `https://reqres.in/api/users?page=${p}&per_page=6`;
    console.log('[fetchUsers] fetching:', url);

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '<no body>');
      throw new Error(`Failed to fetch users: ${res.status} ${res.statusText} - ${text}`);
    }

    const json: UsersApiResponse = await res.json();
    allUsers = [...allUsers, ...json.data];
  }
  return allUsers;
}

export async function fetchUser(id: number): Promise<{ data: User }> {
  const url = `https://reqres.in/api/users/${id}`;
  console.log('[fetchUser] fetching:', url);

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'x-api-key': API_KEY,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '<no body>');
    throw new Error(`Failed to fetch user: ${res.status} ${res.statusText} - ${text}`);
  }

  return res.json();
}
