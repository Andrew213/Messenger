export interface IMessage {
    chat_id: number;
    content: string;
    file: any;
    id: number;
    is_read: boolean;
    time: string;
    type: string;
    user_id: number;
}
