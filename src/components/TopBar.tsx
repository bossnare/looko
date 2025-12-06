import { NavLink } from 'react-router-dom';

export function TopBar() {
  const base =
    'px-6 md:px-4 font-medium py-3 md:py-2 rounded-full transition-colors will-change-auto duration-300';
  const active = 'text-blue-600 font-black bg-blue-600/20';
  const inactive = 'text-gray-300 hover:bg-gray-900';

  return (
    <nav className="sticky inset-x-0 top-0 flex justify-center px-6 py-4 md:justify-end">
      <ul className="flex gap-3">
        <li>
          <NavLink
            className={({ isActive }) =>
              `${base} ${isActive ? active : inactive}`
            }
            to="/"
          >
            App
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              `${base} ${isActive ? active : inactive}`
            }
            to="/chat"
          >
            AI Chat
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              `${base} ${isActive ? active : inactive}`
            }
            to="/socket"
          >
            Socket chat test
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
