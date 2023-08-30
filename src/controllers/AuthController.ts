import AuthAPI from '@/api/AuthAPI/AuthAPI';
import { ISignInData, ISignUpData } from '@/api/AuthAPI/interfaces';
import alert from '@/components/alert';
import store from '@/store';

class AuthController {
    private api = new AuthAPI();

    async singin(data: ISignInData) {
        try {
            await this.api.singin(data);
            // Router.go(Routes.Messenger);
            // this.fetchUser();

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

    // async logout() {
    //     try {
    //         await this.api.logout();
    //         alert({ text: 'Вышли успешно', type: 'success', delay: 3000 });
    //         router.go('/');
    //         store.setState({ user: null });
    //     } catch (err) {
    //         if (err instanceof XMLHttpRequest) {
    //             alert({ text: err.response.reason, type: 'error', delay: 3000 });
    //         }
    //     }
    // }

    async fetchUser() {
        try {
            const user = await this.api.getUser();
            if (user.id) {
                alert({ text: 'Юзер в системе', type: 'success', delay: 3000 });
                store.setState({
                    user,
                });
            }
        } catch (err) {
            if (err instanceof XMLHttpRequest) {
                alert({ text: err.response.reason, type: 'error', delay: 3000 });
            }
        }
    }
}

export default new AuthController();
