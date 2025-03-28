import { Navigate, Outlet } from 'react-router-dom';
import Header from './Header';
import { isAuthenticated } from '../../utils/auth';

export default function Layout() {
  return !isAuthenticated() ? (
    <main className="flex flex-col w-full h-screen">
      <Header />
      <Outlet />
    </main>
  ) : (
    <Navigate to="/" replace />
  );
}
