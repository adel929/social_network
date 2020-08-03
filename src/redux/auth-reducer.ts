import { authAPI, securityAPI, ResultCodeEnum, ResultCodeForCaptcha } from "../API/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
};

export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
};


type SetAuthUserDataActionPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean | null
}

type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: SetAuthUserDataActionPayloadType
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({ 
    type: SET_USER_DATA, payload: 
    { userId, email, login, isAuth } 
});

type GetCaptchaUrlSuccessActionType = {
    type: typeof SET_USER_DATA
    payload: {captchaUrl: string}
}

export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => ({ 
    type: SET_USER_DATA, payload: { captchaUrl } 
});

export const getAuthUserData = () => async(dispatch: any) => {
    let Data = await authAPI.me();
            if (Data.resultCode === ResultCodeEnum.Success) {
                let { id, login, email } = Data.data;
                dispatch(setAuthUserData(id, email, login, true));
            }
}

export const getCaptchaUrl = () => async (dispatch: any) => {
    const Data = await securityAPI.getCaptchaURL();
    const captchaUrl = Data.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
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

export const logout = () => async (dispatch: any) => {
    let Data = await authAPI.logout()
            if (Data.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
}

export default authReducer;
