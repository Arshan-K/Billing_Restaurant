import { useState } from "react";
import { logout } from "../services/auth";
import { useNavigate, NavLink } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: "Billing" },
    { to: "/menu", label: "Menu" },
    { to: "/history", label: "History" },
  ];

  return (
    <>
      {/* Floating hamburger (mobile only) */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-white border rounded p-2 shadow"
        aria-label="Open menu"
      >
        ☰
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static z-50
          top-0 left-0 h-full
          w-56 bg-white border-r
          flex flex-col
          transform transition-transform duration-200
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Header (only visible when sidebar is open on mobile) */}
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-bold">Restaurant</h1>
          <button
            onClick={() => setOpen(false)}
            className="md:hidden text-xl"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className="p-2 space-y-1 flex-1">
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2 rounded ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="m-4 text-red-600 text-left"
        >
          Logout
        </button>
      </aside>
    </>
  );
}
