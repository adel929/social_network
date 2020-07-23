import React from "react";
import css from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

const Navbar = props => {
  return (
    <nav className={css.nav}>
      <div className={css.item}>
        <NavLink to="/profile" activeClassName={css.active}>
          Profile
        </NavLink>
      </div>
      <div className={css.item}>
        <NavLink to="/dialogs" activeClassName={css.active}>
          Messages
        </NavLink>
      </div>
      <div className={css.item}>
        <NavLink to="/users" activeClassName={css.active}>
          Users
        </NavLink>
      </div>
      <div className={css.item}>
        <NavLink to="/news" activeClassName={css.active}>
          News
        </NavLink>
      </div>
      <div className={css.item}>
        <NavLink to="/music" activeClassName={css.active}>
          Music
        </NavLink>
      </div>
      <div className={css.item}>
        <NavLink to="/setting" activeClassName={css.active}>
          Setting
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
