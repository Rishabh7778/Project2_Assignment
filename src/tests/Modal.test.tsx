import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import QueryProvider from '../providers/QueryProvider';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import App from '../App';

const mockUser = {
  data: { id: 1, email: 'george.bluth@reqres.in', first_name: 'George', last_name: 'Bluth', avatar: 'x' }
};
const mockUsers = {
  page: 1, per_page: 6, total: 12, total_pages: 2,
  data: [mockUser.data]
};

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementation((url: any) => {
    const u = String(url);
    if (u.includes('/api/users?page=')) {
      return Promise.resolve(new Response(JSON.stringify(mockUsers))) as any;
    }
    if (u.includes('/api/users/1')) {
      return Promise.resolve(new Response(JSON.stringify(mockUser))) as any;
    }
    return Promise.reject(new Error('unknown url')) as any;
  });
});

afterEach(() => {
  (global.fetch as jest.Mock).mockRestore?.();
});

test('opens modal on /user/:id', async () => {
  render(
    <Provider store={store}>
      <QueryProvider>
        <MemoryRouter initialEntries={[{ pathname: '/user/1', state: { backgroundLocation: { pathname: '/users' } } as any }]}>
          <App />
        </MemoryRouter>
      </QueryProvider>
    </Provider>
  );

  const heading = await screen.findByRole('heading', { name: /user details/i });
  expect(heading).toBeInTheDocument();

  const close = screen.getByRole('button', { name: /close/i });
  expect(close).toBeInTheDocument();
});
