import React, {FC} from "react";
import css from "./users.module.css";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import { UserType } from "../../types/types";

type PropsType = {
  totalItemsCount: number
  pageSize: number
  currentPage: number
  users: Array<UserType>
  followingInProgress: Array<number>
  unfollow: (userId: number) => void
  follow: (userId: number) => void
  onPageChanged: (pageNumber: number) => void
}

let Users: FC<PropsType> = ({currentPage, totalItemsCount, pageSize, onPageChanged, users, ...props}) => {
  return (
    <div className={css.content}>
      <Paginator
        currentPage={currentPage}
        totalItemsCount={totalItemsCount}
        pageSize={pageSize}
        onPageChanged={onPageChanged}
      />
      <div>
        {users.map((u) => (
          <User
            user={u}
            followingInProgress={props.followingInProgress}
            key={u.id}
            unfollow={props.unfollow}
            follow={props.follow}
          />
        ))}
      </div>
    </div>
  );
};

export default Users;
