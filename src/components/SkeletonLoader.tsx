import React from 'react';

const SkeletonLoader: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid" role="status" aria-live="polite" aria-busy="true">
      {Array.from({ length: count }).map((_, i) => (
        <div className="card" key={i} style={{ opacity: 0.6 }}>
          <div style={{ width: 64, height: 64, borderRadius: 999, background: 'var(--border)' }} />
          <div style={{ width: '100%' }}>
            <div style={{ height: 12, background: 'var(--border)', marginBottom: 8, width: '60%' }} />
            <div style={{ height: 12, background: 'var(--border)', width: '40%' }} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(SkeletonLoader);
