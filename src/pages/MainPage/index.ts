/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import Block from '@/core/Block';
import tmp from './tmp';
import ChatsList from './components/chatsList';
import AuthController from '@/controllers/AuthController';
import Router from '@/router/Router';
import { IUser } from '@/api/AuthAPI/interfaces';
import store from '@/store';
import MessageController, { IMessage } from '@/controllers/MessageController';
import Message from './components/message';
import Input from '@/components/input';
import Button from '@/components/button';
import { getUserAva } from '@/components/avatar';
import ChatsController from '@/controllers/ChatsController';

const tooltipTmp = `
            <div class="main__tooltip">
            <img class="main__usersImg {{className}}" src="{{src}}" alt="аватарка юзера" >
            <span class="main__tooltipData main__tooltip-text">{{text}}</span>
            <span class="main__tooltipData main__tooltip-btn">{{{btn}}}</span>
            </div>
`;

class TooltipClass extends Block {
    protected render() {
        return this.compile(tooltipTmp, this.props);
    }
}

export default class MainPage extends Block {
    protected init(): void {
        this.children.chatsList = new ChatsList({});

        this.children.inputSend = new Input({
            classNames: 'main__input',
            events: {
                keypress: (e: KeyboardEvent) => {
                    if (e.key === 'Enter') {
                        const currElement = (e.currentTarget as Element).querySelector('.input') as HTMLInputElement;

                        const message = currElement.value;

                        if (message.trim()) {
                            MessageController.sendMessage(currElement.value);
                        }
                        currElement.value = '';
                    }
                },
            },
        });
    }
    protected async componentDidMount() {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        const user = (await AuthController.fetchUser()) as IUser;

        if (!user.id) {
            Router.go('/');
        }

        store.subscribe(state => {
            if (state?.messages?.length) {
                this.setProps({
                    show: true,
                    currentChatId: state?.currentChatId,
                    messages: state.messages.map((message: IMessage) => {
                        return new Message({
                            content: message.content,
                            user_id: message.user_id,
                            time: message.time,
                        });
                    }),
                    chatUsers: state?.chatsUsers?.map(user => {
                        return new Button({
                            type: 'none',
                            classNames: 'main__usersBtn',
                            children: new TooltipClass({
                                className: this.props.className || '',
                                src: getUserAva(user.avatar),
                                text: user.first_name,
                                btn: new Button({
                                    type: 'none',
                                    text: 'Удалить',

                                    events: {
                                        click: async () => {
                                            await ChatsController.deleteUsersFromChat({
                                                users: [user.id],
                                                chatId: state.currentChatId as number,
                                            });

                                            const chatsUsers = (await ChatsController.getChatUsers(
                                                state.currentChatId as number
                                            )) as IUser[];

                                            store.setState({ chatsUsers });
                                        },
                                    },
                                }),
                            }),
                        });
                    }),
                });
            } else {
                this.setProps({
                    show: false,
                });
            }
        });
    }

    protected render(): DocumentFragment {
        return this.compile(tmp, this.props);
    }
}
