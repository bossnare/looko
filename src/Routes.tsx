import { Route, Routes } from 'react-router-dom';
import { NotFound } from './components/NotFound';
import { SocketTester } from './components/SocketTester';
import { VibesGenerator } from './components/VibesGenerator';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<VibesGenerator />} />
      <Route path="/socket" element={<SocketTester />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
