import AuthAPI from '@/api/AuthAPI.ts/AuthAPI';
import { ISignInData } from '@/api/AuthAPI.ts/interfaces';

class AuthController {
    private api = new AuthAPI();
    async singin(data: ISignInData) {
        try {
            await this.api.singin(data);
            // router.go(Routes.Messenger);
            // this.fetchUser();
            console.log('SUCCESS');
            // alert({ text: 'Вход выполнен', type: 'success', delay: 3000 });
        } catch (err) {
            console.log('ERROR');
            // if (err instanceof XMLHttpRequest) {
            // alert({ text: err.response.reason, type: 'error', delay: 3000 });
            // }
        }
    }
}

export default new AuthController();
