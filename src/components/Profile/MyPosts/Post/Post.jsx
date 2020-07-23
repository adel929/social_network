import React from "react";
import css from "./Post.module.css";

const Post = props => {
  return (
    <div className={css.item}>
      <img src="https://steamuserimages-a.akamaihd.net/ugc/921428922390606987/2C883A46ECD723CD92FCA1719FF706AE09286B71/" />
      {props.massage}
      <div>
        <span>like</span>
        {props.likesCount}
      </div>
    </div>
  );
};

export default Post;
