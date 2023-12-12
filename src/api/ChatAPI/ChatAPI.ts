import { IUser } from '../AuthAPI/interfaces';
import API from '../api';
import { IChatAddUser, IChatCreate, IChatDelete, IChatsList } from './interfaces';

export default class ChatAPI extends API {
    constructor() {
        super('/chats');
    }

    public create(data: IChatCreate) {
        return this.http.post('/', { data: JSON.stringify(data) });
    }

    public deleteChat(data: IChatDelete) {
        return this.http.delete('/', { data: JSON.stringify(data) });
    }

    public getChatUsers(chatId: number) {
        return this.http.get<IUser[]>(`/${chatId}/users`);
    }

    public requestMessageToken(chatId: number) {
        return this.http.post<{ token: string }>(`/token/${chatId}`);
    }

    public addUsersToChat(data: IChatAddUser) {
        return this.http.put('/users', { data: JSON.stringify(data) });
    }

    public deleteUsersFromChat(data: IChatAddUser) {
        return this.http.delete('/users', { data: JSON.stringify(data) });
    }

    public getChatsList() {
        return this.http.get<IChatsList>('/');
    }

    public requestChatUsers(chatId: number) {
        return this.http.get(`/${chatId}/users`);
    }
}
