import ChatAPI from '@/api/ChatAPI/ChatAPI';
import store from '@/store';

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
            if (err instanceof XMLHttpRequest) {
                alert({ text: err.response.reason, type: 'error', delay: 3000 });
            }
            return err;
        }
    }
}

export default new ChatsController();
