import { Route, Routes } from 'react-router-dom';
import { VibesGenerator } from './components/VibesGenerator';
import { SocketTester } from './components/SocketTester';
import { NotFound } from './components/NotFound';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<VibesGenerator />} />
      <Route path="/socket" element={<SocketTester />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
