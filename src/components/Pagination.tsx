import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { setPage } from '../app/uiSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';

type Props = { totalPages: number };

const Pagination: React.FC<Props> = ({ totalPages }) => {
  const page = useSelector((s: RootState) => s.ui.page);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const set = useCallback((p: number) => {
    const q = params.get('search');
    const search = new URLSearchParams();
    if (q) search.set('search', q);
    search.set('page', String(p));
    
    navigate({ pathname: '/users', search: `?${search.toString()}` });
    dispatch(setPage(p));
  }, [dispatch, navigate, params]);
  

  const pages = useMemo(() => {
    const arr = [];
    for (let i = 1; i <= totalPages; i++) arr.push(i);
    return arr;
  }, [totalPages]);

  return (
    <div className="pagination" role="navigation" aria-label="Pagination">
      <button onClick={() => set(Math.max(1, page - 1))} disabled={page <= 1} aria-label="Previous page">Prev</button>
      {pages.map(p => (
        <button
          key={p}
          onClick={() => set(p)}
          aria-current={p === page ? 'page' : undefined}
          aria-label={`Page ${p}`}
          style={{ fontWeight: p === page ? 700 : 400 }}
        >
          {p}
        </button>
      ))}
      <button onClick={() => set(Math.min(totalPages, page + 1))} disabled={page >= totalPages} aria-label="Next page">Next</button>
    </div>
  );
};

export default React.memo(Pagination);
