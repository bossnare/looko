import './index.css';

import { TopBar } from './components/TopBar';
import { AppRoutes } from './Routes';

export function App() {
  return (
    <div className="bg-linear-to-b from-transparent to-[#242424] min-h-screen">
      <TopBar />
      <AppRoutes />
    </div>
  );
}

export default App;
