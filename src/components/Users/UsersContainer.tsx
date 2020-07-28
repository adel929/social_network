import React from "react";
import { connect } from "react-redux";
import Users from "./Users";
import {
  follow,
  unfollow,
  setCurrentPage,
  toggleFollowingProgress,
  requestUsers
} from "../../redux/users-reducer";
import Preloader from "../common/Preloader/Preloader";
import { compose } from "redux";
import {
  getUsers,
  getPageSize,
  getTotalItemsCount,
  getCurrentPage,
  getIsFetching,
  getFollowingInProgress
} from "../../redux/users-selectors"
import { UserType } from "../../types/types";
import { AppStateType } from "../../redux/redux-store";

type MapStatePropsType = {
  currentPage: number
  pageSize: number
  isFetching: boolean
  totalItemsCount: number
  users: Array<UserType>
  followingInProgress: Array<number>
}

type MapDispatchPropsType = {
  getUsers: (currentPage: number, pageSize: number) => void
  unfollow: (userId: number) => void
  follow: (userId: number) => void
}

type OwnPropsType = {
  pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    const {currentPage, pageSize} = this.props;
    this.props.getUsers(currentPage, pageSize);
  }

  onPageChanged = (pageNumber: number) => {
    const {pageSize} = this.props;
    this.props.getUsers(pageNumber, pageSize);
  };

  render() {
    return <>
        <h2>{this.props.pageTitle}</h2>
        {this.props.isFetching ? <Preloader /> : null}
        <Users totalItemsCount={this.props.totalItemsCount}
               pageSize={this.props.pageSize}
               currentPage={this.props.currentPage}
               onPageChanged={this.onPageChanged}
               users={this.props.users}
               follow={this.props.follow}
               unfollow={this.props.unfollow}
               followingInProgress={this.props.followingInProgress}
        />
      </>
  }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalItemsCount: getTotalItemsCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType> (
        mapStateToProps, {
        follow,
        unfollow,
        getUsers: requestUsers})
)(UsersContainer)