import { IMessage } from '@/controllers/MessageController';
import Block from '@/core/Block';
import tmp from './tmp';
import store from '@/store';

interface IMessageProps extends Partial<IMessage> {
    sendType?: 'from' | 'to';
}

class Message extends Block<IMessageProps> {
    constructor(props?: IMessageProps) {
        let time = '';
        if (props?.time) {
            const date = new Date(props?.time);
            const memoizedHours = date.getHours();
            const memoizedMinutes = date.getMinutes();
            const hours = memoizedHours >= 10 ? memoizedHours : `0${memoizedHours}`;
            const minutes = memoizedMinutes >= 10 ? memoizedMinutes : `0${memoizedMinutes}`;
            time = `${hours}:${minutes}`;
        }

        super({
            ...props,
            time,
            sendType: props?.user_id === store.state.user?.id ? 'to' : 'from',
        });
    }

    protected render(): DocumentFragment {
        return this.compile(tmp, this.props);
    }
}

export default Message;
