import { NavLink } from "react-router-dom";

const menu = [
  { name: "Dashboard", path: "/" },
  { name: "Schedule", path: "/schedule" },
  { name: "Queue", path: "/queue" },
  { name: "Patients", path: "/patients" }
];

export default function Sidebar() {
  return (
    <aside
      className="
        bg-white border-r w-64
        hidden md:block
        min-h-screen
        p-4
      "
    >
      <nav className="space-y-2">
        {menu.map(item => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `
              block px-4 py-2 rounded text-sm font-medium
              ${isActive
                ? "bg-primary text-white"
                : "text-gray-700 hover:bg-gray-100"}
              `
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
