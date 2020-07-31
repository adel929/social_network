import React from "react";
import css from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import userImg from "../../images/user.png";
import usersImg from "../../images/users.png";
import messImg from "../../images/message.png";
import musicImg from "../../images/music.png";
import settingImg from "../../images/setting.png";
import newsImg from "../../images/news.png";

const Navbar = props => {
  return (
    <nav className={css.nav}>
      <div className={css.item}>
        <NavLink to="/profile" activeClassName={css.active}>
        <img src={userImg} className={css.profile}/>Profile
        </NavLink>
      </div>
      <div className={css.item}>
        <NavLink to="/dialogs" activeClassName={css.active}>
          <img src={messImg} className={css.message} /> Messages
        </NavLink>
      </div>
      <div className={css.item}>
        <NavLink to="/users" activeClassName={css.active}>
          <img src={usersImg} className={css.users} /> Users
        </NavLink>
      </div>
      <div className={css.item}>
        <NavLink to="/news" activeClassName={css.active}>
          <img src={newsImg} className={css.news} />  News
        </NavLink>
      </div>
      <div className={css.item}>
        <NavLink to="/music" activeClassName={css.active}>
          <img src={musicImg} className={css.music} />  Music
        </NavLink>
      </div>
      <div className={css.item}>
        <NavLink to="/setting" activeClassName={css.active}>
          <img src={settingImg} className={css.setting} />  Setting
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
