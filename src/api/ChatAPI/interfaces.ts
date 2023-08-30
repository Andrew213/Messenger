import { IUser } from '../AuthAPI/interfaces';

export interface IChatCreate {
    title: string;
}

export interface IChatDelete {
    chatId: number;
}

export interface IChatAddUser {
    users: number[];
    chatId: number;
}

export interface IChat {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    last_message: {
        user: IUser;
        time: string;
        content: string;
    };
}

export type IChatsList = Array<IChat>;
