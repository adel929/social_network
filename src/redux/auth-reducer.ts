import { ResultCodeEnum, ResultCodeForCaptcha } from "../API/api";
import {stopSubmit} from "redux-form";
import { authAPI } from "../API/auth-api";
import { securityAPI } from "../API/security-api";
import { BaseThunkType, InferActionTypes } from "./redux-store";


let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
};



const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/auth/SET_USER_DATA':
        case 'SN/auth/GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
};

export const actions = {
     setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({ 
        type: 'SN/auth/SET_USER_DATA', payload: 
        { userId, email, login, isAuth } 
    } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({ 
        type: 'SN/auth/GET_CAPTCHA_URL_SUCCESS', payload: { captchaUrl } 
    } as const)
}

export const getAuthUserData = (): ThunkType => async(dispatch) => {
    let meData = await authAPI.me();
            if (meData.resultCode === ResultCodeEnum.Success) {
                let { id, login, email } = meData.data;
                dispatch(actions.setAuthUserData(id, email, login, true));
            }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaURL();
    const captchaUrl = data.url;
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe, captcha)
            if (data.resultCode === ResultCodeEnum.Success) {
                dispatch(getAuthUserData())
            } else {
                if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
                    dispatch(getCaptchaUrl())
                }
                let message = data.messages.length > 0 ? data.messages[0]: "Some error";
                dispatch(stopSubmit("login", {_error: message}))
            }
}

export const logout = (): ThunkType => async (dispatch) => {
    let meData = await authAPI.logout()
            if (meData.data.resultCode === 0) {
                dispatch(actions.setAuthUserData(null, null, null, false))
            }
}

export default authReducer;

export type InitialStateType = typeof initialState
type ActionsType = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | ReturnType<typeof stopSubmit>>