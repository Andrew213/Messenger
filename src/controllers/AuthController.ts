import AuthAPI from '@/api/AuthAPI/AuthAPI';
import { ISignInData, ISignUpData } from '@/api/AuthAPI/interfaces';
import alert from '@/components/alert';
import Router from '@/router/Router';
import store from '@/store';
import { Routes } from '..';

class AuthController {
    private api = new AuthAPI();

    async singin(data: ISignInData) {
        try {
            await this.api.singin(data);
            Router.go(Routes.MainPage);
            await this.fetchUser();
            alert({ text: 'Вход выполнен', type: 'success', delay: 3000 });
        } catch (err) {
            if (err instanceof XMLHttpRequest) {
                alert({ text: err.response.reason, type: 'error', delay: 3000 });
            }
        }
    }

    async singup(data: ISignUpData) {
        try {
            const response = await this.api.singup(data);
            if (response.id) {
                alert({ text: 'Вы успешно зарегестрировались', type: 'success', delay: 3000 });
            }
        } catch (err) {
            if (err instanceof XMLHttpRequest) {
                alert({ text: err.response.reason, type: 'error', delay: 3000 });
            }
        }
    }

    async logout() {
        try {
            await this.api.logout();
            alert({ text: 'Вышли успешно', type: 'success', delay: 3000 });
            Router.go('/');
            store.setState({ user: null });
        } catch (err) {
            if (err instanceof XMLHttpRequest) {
                alert({ text: err.response.reason, type: 'error', delay: 3000 });
            }
        }
    }

    async fetchUser() {
        try {
            const user = await this.api.getUser();
            if (user.id) {
                store.setState({
                    user,
                });
            }
            return user;
        } catch (err) {
            if (err instanceof XMLHttpRequest) {
                alert({ text: err.response.reason, type: 'error', delay: 3000 });
            }
            return err;
        }
    }
}

export default new AuthController();
