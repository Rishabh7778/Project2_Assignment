import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import QueryProvider from '../providers/QueryProvider';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementation((url: any) => {
    if (String(url).includes('/api/users?page=')) {
      return Promise.resolve(new Response(JSON.stringify({ page:1, per_page:6, total:0, total_pages:1, data: [] }))) as any;
    }
    return Promise.reject(new Error('unknown'));
  });
});

afterEach(() => {
  (global.fetch as jest.Mock).mockRestore?.();
});

test('toggles theme and writes localStorage', async () => {
  const setItemSpy = jest.spyOn(window.localStorage.__proto__, 'setItem');
  render(
    <Provider store={store}>
      <QueryProvider>
        <MemoryRouter initialEntries={['/users']}>
          <App />
        </MemoryRouter>
      </QueryProvider>
    </Provider>
  );

  const btn = screen.getByRole('button', { name: /toggle theme/i });
  fireEvent.click(btn);
  expect(setItemSpy).toHaveBeenCalledWith('theme', 'dark');
  fireEvent.click(btn);
  expect(setItemSpy).toHaveBeenCalledWith('theme', 'light');
});
