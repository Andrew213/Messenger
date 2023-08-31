import { IUser } from '@/api/AuthAPI/interfaces';
import UserAPI from '@/api/UserAPI/UserAPI';
import { IUserPut } from '@/api/UserAPI/interfaces';
import alert from '@/components/alert';
import store from '@/store';

class UserController {
    private api = new UserAPI();

    async changeAvatar(data: FormData) {
        try {
            const response = await this.api.changeAvatar(data);
            store.setState({
                user: response as IUser,
            });
            document.querySelector('.loadFile')?.classList.remove('popup-active');
            alert({ text: 'Фото изменено', type: 'success', delay: 3000 });

            // return response;
        } catch (err) {
            if (err instanceof XMLHttpRequest) {
                alert({ text: err.response.reason, type: 'error', delay: 3000 });
            }
        }
    }

    // async getUsersByLogin(login: string): Promise<Array<IUserGet> | undefined> {
    //     try {
    //         const response = await this.api.getUsersByLogin(login);
    //         return response;
    //     } catch (err) {
    //         if (err instanceof XMLHttpRequest) {
    //             alert({ text: err.response.reason, type: 'error', delay: 3000 });
    //         }
    //     }
    // }

    async changeUserProfile(data: IUserPut) {
        try {
            const user = await this.api.changeProfile(data);
            if (user.id) {
                store.setState({
                    user,
                });
                alert({ text: 'Данные обновлены', type: 'success', delay: 3000 });
            }
        } catch (err) {
            if (err instanceof XMLHttpRequest) {
                alert({ text: err.response.reason, type: 'error', delay: 3000 });
            }
        }
    }
}

export default new UserController();
