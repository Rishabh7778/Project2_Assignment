import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { User } from '../utils/api';

const UserCard: React.FC<{ user: User }> = ({ user }) => {
  const location = useLocation();
  return (

    <Link
      to={`/user/${user.id}`}
      state={{ background: location }}
      className="card"
    >
      <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} loading="lazy" />
      <div>
        <div className="nameclass" style={{ fontWeight: 600, color: 'gray' }}>{user.first_name} {user.last_name}</div>
        <div className="emailclass" style={{ color: 'var(--muted)', fontSize: 14 }}>{user.email}</div>
      </div>
    </Link>
  );
};

export default React.memo(UserCard);
