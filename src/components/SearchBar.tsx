import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch, setPage } from '../app/uiSlice';
import type { RootState } from '../app/store';
import useDebouncedValue from '../hooks/useDebouncedValue';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const current = useSelector((s: RootState) => s.ui.search);
  const [params] = useSearchParams();
  const [local, setLocal] = useState(current);

  // Read from URL on first mount
  useEffect(() => {
    const q = params.get('search') ?? '';
    if (q !== current) {
      dispatch(setSearch(q));
      setLocal(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const debounced = useDebouncedValue(local, 300);

  const location = useLocation();
  useEffect(() => {
    // Only run when on /users (not on /user/:id)
    if (!location.pathname.startsWith('/users')) return;
    dispatch(setSearch(debounced));
    dispatch(setPage(1));
    const search = debounced ? `?search=${encodeURIComponent(debounced)}&page=1` : `?page=1`;
    navigate({ pathname: '/users', search }, { replace: true });
  }, [debounced, dispatch, navigate, location.pathname]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocal(e.target.value);
  }, []);

  return (
    <div className="search" aria-label="Search users">
      <input
        type="text"
        placeholder="Search by name or email…"
        value={local}
        onChange={onChange}
        aria-label="Search"
      />
    </div>
  );
};

export default React.memo(SearchBar);
