import { instance, APIResponceType } from './api';
import { ProfileType, PhotosType } from '../types/types';

type SavePhotoResponceDataType = {
    photos: PhotosType
}

export const profileAPI = {
    getProfile (userId: number) {
        return instance.get<ProfileType>(`profile/`+ userId).then(res => res.data)
    },
    getStatus (userId: number) {
        return instance.get<string>(`profile/status/` + userId).then(res => res.data)
    },
    updateStatus (status: string) {
        return instance.put<APIResponceType>(`profile/status`, {status: status}).then(res => res.data)
    },
    savePhoto (photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile)
        return instance.put<APIResponceType<SavePhotoResponceDataType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data)
    },
    saveProfile(profile: ProfileType) {
        return instance.put<APIResponceType>(`profile`, profile).then(res => res.data)
    }
}