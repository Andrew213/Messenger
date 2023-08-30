import API from '../api';
import { ISignInData, ISignUpData, IUser } from './interfaces';

export default class AuthAPI extends API {
    constructor() {
        super('/auth');
    }

    singin(data: ISignInData) {
        return this.http.post('/signin', { data: JSON.stringify(data) });
    }

    singup(data: ISignUpData): Promise<{ id: number }> {
        return this.http.post('/signup', { data: JSON.stringify(data) });
    }

    logout() {
        return this.http.post('/logout');
    }

    getUser() {
        return this.http.get<IUser>('/user');
    }
}
