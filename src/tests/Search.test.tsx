import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import QueryProvider from '../providers/QueryProvider';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

const users = {
  page: 1, per_page: 6, total: 2, total_pages: 1,
  data: [
    { id: 1, email: 'john@reqres.in', first_name: 'John', last_name: 'Smith', avatar: 'x' },
    { id: 2, email: 'amy@reqres.in', first_name: 'Amy', last_name: 'Wong', avatar: 'y' },
  ],
};

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementation((url: any) => {
    const u = String(url);
    if (u.includes('/api/users?page=')) {
      return Promise.resolve(new Response(JSON.stringify(users))) as any;
    }
    if (u.match(/\/api\/users\/\d+$/)) {
      const id = Number(u.split('/').pop());
      const found = users.data.find(d => d.id === id)!;
      return Promise.resolve(new Response(JSON.stringify({ data: found }))) as any;
    }
    return Promise.reject(new Error('unknown url')) as any;
  });
});

afterEach(() => {
  (global.fetch as jest.Mock).mockRestore?.();
});

test('filters users after typing', async () => {
  render(
    <Provider store={store}>
      <QueryProvider>
        <MemoryRouter initialEntries={['/users']}>
          <App />
        </MemoryRouter>
      </QueryProvider>
    </Provider>
  );

  const input = screen.getByRole('textbox', { name: /search/i });
  fireEvent.change(input, { target: { value: 'john' } });

  await waitFor(async () => {
    const john = await screen.findByText(/john smith/i);
    expect(john).toBeInTheDocument();
    const amy = screen.queryByText(/amy wong/i);
    expect(amy).toBeNull();
  });
});
