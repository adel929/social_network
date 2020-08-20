import { profileAPI } from './../API/profile-api';
import { stopSubmit } from "redux-form";
import { PostType, ProfileType, PhotosType } from "../types/types";
import { AppStateType } from "./redux-store";
import { Dispatch } from "react";
import { ThunkAction } from "redux-thunk";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";


let initialState = {
    posts: [
        { id: 1, message: "Hi how you", likesCount: 12 },
        { id: 2, message: "Its my first", likesCount: 21 },
        { id: 3, message: "hi hi", likesCount: 22 },
        { id: 4, message: "my first", likesCount: 11 },
        { id: 5, message: "world", likesCount: 14 },
        { id: 6, message: "krike", likesCount: 2 }
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "",
    newPostText: ""
}

export type InitialStateType = typeof initialState


const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 7,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }
        }

        case SET_STATUS: {
            return { ...state, status: action.status }
        }

        case SET_USER_PROFILE: {
            return { ...state, profile: action.profile }
        }

        case DELETE_POST: {
            return { ...state, posts: state.posts.filter(p => p.id != action.postId) }
        }

        case SAVE_PHOTO_SUCCESS: {
            return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType }
        }

        default:
            return state;
    }
}

type ActionTypes = AddPostActionCreatorActionType |
                   SetUserProfileActionType |
                   SetStatusActionType |
                   DeletePostActionType |
                   SavePhotoSuccessActionType

type AddPostActionCreatorActionType ={
    type: typeof ADD_POST
    newPostText: string
}
type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
type DeletePostActionType = {
    type: typeof DELETE_POST
    postId: number
}
type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}

export const addPostActionCreator = (newPostText: string): AddPostActionCreatorActionType => ({ type: ADD_POST, newPostText });
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({ type: SET_USER_PROFILE, profile });
export const setStatus = (status: string): SetStatusActionType => ({ type: SET_STATUS, status });
export const deletePost = (postId: number): DeletePostActionType => ({ type: DELETE_POST, postId });
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({ type: SAVE_PHOTO_SUCCESS, photos })

type GetStateType = () => AppStateType
type DispatchType = Dispatch<AppStateType>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const getUserProfile = (userId: number) => async (dispatch: any) => {
    const data = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(data));
}

export const getStatus = (userId: number) => async (dispatch: any) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(setStatus(data));
}

export const updateStatus = (status: string) => async (dispatch: any) => {
    try {
    let data = await profileAPI.updateStatus(status);
    
    if (data.resultCode === 0) {
        dispatch(setStatus(status));
    }
} catch(error) {
    //
}
};

export const savePhoto = (file: PhotosType) => async (dispatch: any) => {
    let data = await profileAPI.savePhoto(file);
    
    if (data.resultCode === 0) {
        dispatch(savePhotoSuccess(data.data.photos));
    }
};

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId;
    const data = await profileAPI.saveProfile(profile);

    if (data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        dispatch(stopSubmit("edit-profile", { _error: data.messages[0] }));
        return Promise.reject(data.messages[0]);
    }
};

export default profileReducer;
