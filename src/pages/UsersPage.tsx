import React, { useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { type UsersApiResponse, type User, fetchUsers } from '../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../app/store';
import UserCard from '../components/UserCard';
import Pagination from '../components/Pagination';
import SkeletonLoader from '../components/SkeletonLoader';
import { setPage, setSearch } from '../app/uiSlice';
import { useSearchParams } from 'react-router-dom';

const UsersPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [params] = useSearchParams();
  const page = useSelector((s: RootState) => s.ui.page) ?? 1;
  const search = useSelector((s: RootState) => s.ui.search) ?? '';

  // Sync URL params with Redux
useEffect(() => {
  const p = Number(params.get('page') || '1'); 
  const q = params.get('search') || '';
  if (p !== page) dispatch(setPage(p));
  if (q !== search) dispatch(setSearch(q));
}, [dispatch, params])

  const { data, isLoading, error, isError } = useQuery<UsersApiResponse, Error>({
    queryKey: ['users', page],
    queryFn: () => fetchUsers(page),
    staleTime: 5000,
    retry: 1,
  });

  const users = (data as unknown as UsersApiResponse | undefined)?.data ?? [];

  const filtered: User[] = useMemo(() => {
    if (!users.length) return [];
    if (!search.trim()) return users;
    const q = search.toLowerCase();
    return users.filter((u: User) =>
      `${u.first_name} ${u.last_name}`.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
    );
  }, [users, search]);

  return (
    <div className="container mx-auto p-4">
      {isError && (
        <div className="text-red-700 p-4 bg-red-100 rounded-md" role="alert">
          Failed to load users: {error?.message || 'Unknown error'}
        </div>
      )}

      {isLoading && <SkeletonLoader />}

      {!isLoading && !users.length && !isError && (
        <div className="text-gray-500 text-center py-4">No users (empty response)</div>
      )}

      {!isLoading && users.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
            {filtered.map((u: User) => <UserCard key={u.id} user={u} />)}
          </div>

          <Pagination totalPages={(data as unknown as UsersApiResponse)?.total_pages ?? 1} />
        </>
      )}
    </div>
  );
};

export default React.memo(UsersPage);