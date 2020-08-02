import { UserType } from './../types/types';
import { usersAPI } from "../API/api";
import { updateObjectInArray } from "../utils/object-helper";
import { Dispatch } from 'redux';
import { AppStateType } from './redux-store';
import { ThunkAction } from 'redux-thunk';

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";


let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalItemsCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, //array of users id
};

type InitialState = typeof initialState

const usersReducer = (state = initialState, action: ActionTypes): InitialState => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray (state.users, action.userId, "id", {followed: true})
            };
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray (state.users, action.userId, "id", {followed: false})
            };
        case SET_USERS: {
            return { ...state, users: [...state.users, ...action.users] };
        }
        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage };
        }
        case SET_TOTAL_USERS_COUNT: {
            return { ...state, totalItemsCount: action.count };
        }
        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching };
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        default:
            return state;
    }
};

type ActionTypes = FollowSuccessActionType | 
                   UnllowSuccessActionType | 
                   SetUsersActionType | 
                   SetCurrentPageActionType | 
                   SetTotalItemsCountActionType | 
                   ToggleIsFetchingActionType | 
                   ToggleFollowingProgressActionType

type FollowSuccessActionType = {
    type: typeof FOLLOW
    userId: number
}
type UnllowSuccessActionType = {
    type: typeof UNFOLLOW
    userId: number
}
type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
type SetTotalItemsCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    count: number
}
type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}

export const followSuccess = (userId: number): FollowSuccessActionType => ({ type: FOLLOW, userId });
export const unfollowSuccess = (userId: number): UnllowSuccessActionType => ({ type: UNFOLLOW, userId });
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalItemsCount = (totalItemsCount: number): SetTotalItemsCountActionType => ({ type: SET_TOTAL_USERS_COUNT, count: totalItemsCount });
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionType => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId });

type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const requestUsers = (page: number, pageSize: number): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));
        let data = await usersAPI.getUsers(page, pageSize)
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalItemsCount(data.totalCount));
    }
}

const _followUnfollowFlow = async (dispatch: DispatchType, 
                                   userId: number, 
                                   apiMethod: any, 
                                   actionCreator: (userId: number) => FollowSuccessActionType | UnllowSuccessActionType) => {
    dispatch(toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    };
    dispatch(toggleFollowingProgress(false, userId));
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);
    }
};

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
    }
}

export default usersReducer;
