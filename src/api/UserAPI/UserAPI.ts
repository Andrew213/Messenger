import API from '../api';
import { IUserGet, IUserPut } from './interfaces';

export default class UserAPI extends API {
    constructor() {
        super('/user');
    }

    changeProfile(data: IUserPut) {
        return this.http.put<IUserGet>('/profile', { data: JSON.stringify(data) });
    }

    // changePassword(data: IPassword) {
    //     return this.http.put('/password', { data });
    // }

    changeAvatar(data: FormData) {
        return this.http.put('/profile/avatar', { data, headers: {} });
    }

    getUserById(id: number) {
        return this.http.get<IUserGet>(`/${id}`);
    }

    getUsersByLogin(login: string) {
        return this.http.post<IUserGet[]>(`/search`, { data: JSON.stringify({ login }) });
    }
}
