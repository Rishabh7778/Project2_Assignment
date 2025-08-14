import React, { useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { type User, fetchAllUsers } from '../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../app/store';
import UserCard from '../components/UserCard';
import Pagination from '../components/Pagination';
import SkeletonLoader from '../components/SkeletonLoader';
import { setPage, setSearch } from '../app/uiSlice';
import { useSearchParams } from 'react-router-dom';

const USERS_PER_PAGE = 6;

const UsersPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [params] = useSearchParams();

  const page = useSelector((s: RootState) => s.ui.page) ?? 1;
  const search = useSelector((s: RootState) => s.ui.search) ?? '';

  // Sync URL params with Redux on first mount
  useEffect(() => {
    const p = Number(params.get('page') || '1');
    const q = params.get('search') || '';
    if (p !== page) dispatch(setPage(p));
    if (q !== search) dispatch(setSearch(q));
  }, [dispatch, params]);

  // Fetch ALL users from API (both pages)
  const { data, isLoading, error, isError } = useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: fetchAllUsers,
    staleTime: 5000,
    retry: 1,
  });

  // Filter users by search
  const filtered = useMemo(() => {
    if (!data) return [];
    if (!search.trim()) return data;
    const q = search.toLowerCase();
    return data.filter((u) =>
      `${u.first_name} ${u.last_name}`.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
    );
  }, [data, search]);


  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * USERS_PER_PAGE;
    return filtered.slice(start, start + USERS_PER_PAGE);
  }, [filtered, page]);

  return (
    <div className="container mx-auto p-4">
      {isError && (
        <div className="text-red-700 p-4 bg-red-100 rounded-md" role="alert">
          Failed to load users: {error?.message || 'Unknown error'}
        </div>
      )}

      {isLoading && <SkeletonLoader />}

      {!isLoading && !paginatedUsers.length && !isError && (
        <div className="text-gray-500 text-center py-4">No users found</div>
      )}

      {!isLoading && paginatedUsers.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
            {paginatedUsers.map((u) => (
              <UserCard key={u.id} user={u} />
            ))}
          </div>

          <Pagination totalPages={Math.ceil(filtered.length / USERS_PER_PAGE)} />
        </>
      )}
    </div>
  );
};

export default React.memo(UsersPage);
