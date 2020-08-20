import {instance} from './api';

type GetCaptchaUrlResponceType = {
    url: string
}

export const securityAPI ={
    getCaptchaURL() {
        return instance.get<GetCaptchaUrlResponceType>(`security/get-captcha-url`).then(res => res.data);
    },
} 