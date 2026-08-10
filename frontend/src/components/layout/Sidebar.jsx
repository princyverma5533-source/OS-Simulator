import { algorithms } from "../../data/algorithms";
import { NavLink } from "react-router-dom";

function Sidebar({ isOpen }) {
  return (
    <aside className={`sidebar ${isOpen ? "sidebar--open" : "sidebar--collapsed"}`}>
      <div className="sidebar__header">
        <span className="sidebar__label">Modules</span>
        <span className="sidebar__count">{algorithms.length}</span>
      </div>

      <ul className="sidebar__nav">
        {algorithms.map((algorithm) => {
          const Icon = algorithm.icon;

          return (
            <li key={algorithm.title}>
              <NavLink className={({ isActive }) => `sidebar__link ${isActive ? "sidebar__link--active" : ""}`} to={algorithm.href} title={algorithm.title}>
                <Icon />
                <span>{algorithm.title}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default Sidebar;
