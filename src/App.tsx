import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import UsersPage from './pages/UsersPage';
import { ErrorBoundary } from './components/ErrorBoundary';
import ThemeToggle from './components/ThemeToggle';

const UserModal = lazy(() => import('./components/UserModal'));

function App() {
  const location = useLocation();
  const background = location.state?.background;

  return (
    <>
      <header className="container header">
        <h1 style={{ margin: 0, fontSize: 20 }}>Users</h1>
        <SearchBar />
        <ThemeToggle />
      </header>

      <ErrorBoundary>
        <Suspense fallback={<div className="container">Loading…</div>}>
          {/* Main routes */}
          <Routes location={background || location}>
            <Route path="/" element={<Navigate to="/users" replace />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/user/:id" element={<UserModal />} />
          </Routes>

          {background && (
            <Routes>
              <Route path="/user/:id" element={<UserModal />} />
            </Routes>
          )}
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App;
