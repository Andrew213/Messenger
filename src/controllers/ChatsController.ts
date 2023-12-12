import ChatAPI from '@/api/ChatAPI/ChatAPI';
import store from '@/store';
import alert from '@/components/alert';
import { IChatAddUser, IChatDelete } from '@/api/ChatAPI/interfaces';

class ChatsController {
    private api = new ChatAPI();

    public async getChatsList() {
        try {
            const chatsList = await this.api.getChatsList();
            store.setState({
                chatsList,
            });
            return chatsList;
        } catch (err) {
            return err;
        }
    }

    public async addUsersToChat(data: IChatAddUser) {
        try {
            await this.api.addUsersToChat(data);
            alert({ text: 'Пользователь добавлен', type: 'success', delay: 3000 });
            const popup = document.querySelector('.addUser') as HTMLDivElement;
            popup.classList.remove('popup-active');
            await this.getChatsList();
        } catch (err) {
            if (err instanceof XMLHttpRequest) {
                alert({ text: err.response.reason, type: 'error', delay: 3000 });
            }
        }
    }

    public async delete(data: IChatDelete) {
        try {
            await this.api.deleteChat(data);
            alert({ text: 'Чат удалён', type: 'success', delay: 3000 });
            await this.getChatsList();
        } catch (err) {
            if (err instanceof XMLHttpRequest) {
                alert({ text: err.response.reason, type: 'error', delay: 3000 });
            }
        }
    }

    public async getChatUsers(chatID: number) {
        try {
            const response = await this.api.getChatUsers(chatID);
            return response;
        } catch (err) {
            if (err instanceof XMLHttpRequest) {
                alert({ text: err.response.reason, type: 'error', delay: 3000 });
            }
            return err;
        }
    }

    public async deleteUsersFromChat(data: IChatAddUser) {
        try {
            await this.api.deleteUsersFromChat(data);
            alert({ text: 'Пользователь удалён', type: 'success', delay: 3000 });
            const popup = document.querySelector('.users') as HTMLDivElement;
            popup.classList.remove('popup-active');
            await this.getChatsList();
        } catch (err) {
            if (err instanceof XMLHttpRequest) {
                alert({ text: err.response.reason, type: 'error', delay: 3000 });
            }
        }
    }
}

export default new ChatsController();
