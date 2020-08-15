import { UserType } from './../types/types';
import { usersAPI } from "../API/api";
import { updateObjectInArray } from "../utils/object-helper";
import { Dispatch } from 'redux';
import { AppStateType, InferActionTypes } from './redux-store';
import { ThunkAction } from 'redux-thunk';


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
        case 'FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: true })
            };
        case 'UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: false })
            };
        case 'SET_USERS': {
            return { ...state, users: [...state.users, ...action.users] };
        }
        case 'SET_CURRENT_PAGE': {
            return { ...state, currentPage: action.currentPage };
        }
        case 'SET_TOTAL_USERS_COUNT': {
            return { ...state, totalItemsCount: action.count };
        }
        case 'TOGGLE_IS_FETCHING': {
            return { ...state, isFetching: action.isFetching };
        }
        case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
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
}
type ActionTypes = InferActionTypes<typeof action>


export const action = {
    followSuccess: (userId: number) => ({ type: 'FOLLOW', userId } as const),
    unfollowSuccess:  (userId: number) => ({ type: 'UNFOLLOW', userId } as const),
    setUsers: (users: Array<UserType>) => ({ type: 'SET_USERS', users } as const),
    setCurrentPage: (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', currentPage } as const),
    setTotalItemsCount: (totalItemsCount: number) => ({ type: 'SET_TOTAL_USERS_COUNT', count: totalItemsCount } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({ type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const)
}


type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const requestUsers = (page: number, pageSize: number): ThunkType => {
    return async (dispatch, getState) => {

        dispatch(action.toggleIsFetching(true));
        dispatch(action.setCurrentPage(page));
        let data = await usersAPI.getUsers(page, pageSize)
        dispatch(action.toggleIsFetching(false));
        dispatch(action.setUsers(data.items));
        dispatch(action.setTotalItemsCount(data.totalCount));
    }
}

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any,
    actionCreator: (userId: number) => ActionTypes) => {
    dispatch(action.toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    };
    dispatch(action.toggleFollowingProgress(false, userId));
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), action.followSuccess);
    }
};

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), action.unfollowSuccess);
    }
}

export default usersReducer;
