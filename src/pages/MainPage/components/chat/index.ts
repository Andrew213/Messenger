import { IChat } from '@/api/ChatAPI/interfaces';
import Block from '@/core/Block';
import tmp from './tmp';
import store from '@/store';

interface ChatProps extends IChat {
    onClick?: (chtId: number) => void;
    owner?: string;
}

export default class Chat extends Block {
    constructor(props: ChatProps) {
        if (props.last_message) {
            props.owner =
                props.last_message.user.login === store.state.user?.login
                    ? 'Вы:'
                    : `${props.last_message.user.first_name}:`;
        }
        super({
            ...props,
            active: props.id === store.state.currentChatId ? 'active' : '',
            avatar: props.avatar || '',
            last_message: props?.last_message?.content || '',
        });
    }

    protected render(): DocumentFragment {
        return this.compile(tmp, this.props);
    }
}
