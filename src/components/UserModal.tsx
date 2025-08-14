import React, { useEffect, useMemo, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '../utils/api';
import { useModal } from '../hooks/useModal';

const UserModal: React.FC = () => {
  const { id } = useParams<'id'>();
  const navigate = useNavigate();
  const onClose = () => navigate(-1);

  const { data, isLoading, error } = useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUser(Number(id)),
    enabled: !!id,
    staleTime: 5000,
  });

  const { backdropRef } = useModal(onClose);

  const firstFocusable = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (id) firstFocusable.current?.focus();
  }, [id]);

  const content = useMemo(() => {
    if (isLoading) return <div>Loading…</div>;
    if (error) return <div>Failed to load user.</div>;
    if (!data) return null;

    const { avatar, email, first_name, last_name } = data.data;
    return (
      <>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
          <img
            src={avatar}
            alt={`${first_name} ${last_name}`}
            style={{ width: 72, height: 72, borderRadius: 999 }}
          />
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: 'black' }}>
              {first_name} {last_name}
            </div>
            <div style={{ color: 'black' }}>{email}</div>
          </div>
        </div>
        <p style={{ marginTop: 8, lineHeight: 1.5, color: 'gray' }}>
          This is a demo detail modal pulled from <code>reqres.in</code>.
          You can deep-link directly to this route.
        </p>
      </>
    );
  }, [data, error, isLoading]);

  return (
    <div
      ref={backdropRef}
      className="modal-backdrop"
      onClick={onClose} // close when backdrop is clicked
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="user-modal-title"
        onClick={e => e.stopPropagation()} // prevent modal click from closing
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 id="user-modal-title" style={{ margin: 0, color: 'black' }}>User Details</h2>
          <button
            ref={firstFocusable}
            onClick={onClose}
            aria-label="Close"
          >
            ✖
          </button>
        </div>
        <div style={{ marginTop: 12 }}>{content}</div>
      </div>
    </div>
  );
};

export default UserModal;