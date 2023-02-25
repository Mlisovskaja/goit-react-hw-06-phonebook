import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const ContactsPage = lazy(() => import('./ContactsPage'));
const NotFoundPage = lazy(() => import('./NotFoundPage'));

const UserRoutes = () => {
  return (
    <Suspense fallback={<p>...loading</p>}>
      <Routes>
        <Route path="/" element={<ContactsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default UserRoutes;
