import { Route, Routes } from 'react-router-dom';
import { NotFound } from './components/NotFound';
import { SocketTester } from './components/SocketTester';
import { VibesGenerator } from './components/VibesGenerator';
import { ChatModel } from './components/ChatModel';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<VibesGenerator />} />
      <Route path="/socket" element={<SocketTester />} />
      <Route path="/chat" element={<ChatModel />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
