import React from "react";
import css from "./DialogItem.module.css";
import { NavLink } from "react-router-dom";
import DialogAva from "./DialogAva/DialogAva";

const DialogItem = props => {
  return (
    <div className={css.dialog + " " + css.active}>
      <NavLink to={"/dialogs/" + props.id}>
        {props.name}
        <DialogAva />
      </NavLink>
    </div>
  );
};

export default DialogItem;
