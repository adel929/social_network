import React from "react";
import css from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = (props) => {
    return (
        <header className={css.header}>
            <div className={css.nameTextHeader}>Social network</div>
            <div className={css.loginBlock}>
                {props.isAuth
                    ? <div className={css.loginAccount}>{props.login} - <button onClick={props.logout} className={css.btnLogOut} >Log out</button> </div>
                    : <NavLink to={'/login'} className={css.btnLogin}>Login</NavLink>}
            </div>
        </header>
    );
};

export default Header;
