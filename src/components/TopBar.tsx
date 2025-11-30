import { NavLink } from 'react-router-dom';

export function TopBar() {
  const base =
    'px-4 py-2 rounded-full transition-colors will-change-auto duration-300';
  const active = 'text-blue-500 bg-blue-100/90';
  const inactive = 'text-gray-300 hover:bg-gray-700';

  return (
    <nav className="py-4 px-6 flex fixed inset-x-0">
      <ul className="flex ml-auto font-medium gap-3">
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
            to="/socket"
          >
            Socket tester
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              `${base} ${isActive ? active : inactive}`
            }
            to="/stats"
          >
            Stats
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
