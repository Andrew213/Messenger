/* eslint-disable @typescript-eslint/no-misused-promises */
import Button from '@/components/button';
import ChatsController from '@/controllers/ChatsController';
import Block from '@/core/Block';
import store from '@/store';
import { tmp, userTmp } from './tmp';
import { IUser } from '@/api/AuthAPI/interfaces';

class UserClass extends Block {
    protected init(): void {
        this.children.btnDelete = new Button({
            type: 'denger',
            text: 'Удалить',
            classNames: 'user__btn',
            events: {
                click: () => {
                    ChatsController.deleteUsersFromChat({
                        users: [this.props.id],
                        chatId: store.state.currentChatId as number,
                    });
                },
            },
        });
    }

    protected render() {
        return this.compile(userTmp, this.props);
    }
}

export default class DeleteUserPopup extends Block {
    protected init(): void {
        this.children.btnClose = new Button({
            type: 'none',
            text: 'X',
            classNames: 'users__btn popup-close',
            events: {
                click: () => {
                    const popup = document.querySelector('.users') as HTMLDivElement;
                    popup.classList.remove('popup-active');
                },
            },
        });
    }

    protected componentDidMount(): void {
        store.subscribe(async state => {
            if (state.currentChatId) {
                const users = (await ChatsController.getChatUsers(state.currentChatId)) as IUser[];

                if (users?.filter(user => user.id !== state.user?.id).length) {
                    this.setProps({
                        show: true,
                        users: users
                            ?.filter(user => user.id !== state.user?.id)
                            .map(
                                user =>
                                    new UserClass({
                                        login: user.login,
                                        first_name: user.first_name,
                                        second_name: user.second_name,
                                        id: user.id,
                                    })
                            ),
                    });
                } else {
                    this.setProps({
                        show: false,
                    });
                }
            }
        });
    }

    protected render() {
        return this.compile(tmp, this.props);
    }
}
