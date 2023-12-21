/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import Block from '@/core/Block';
import tmp from './tmp';
import Button from '@/components/button';
import store from '@/store';
import Router from '@/router/Router';
import UserAva from '@/components/avatar';
import Input from '@/components/input';
import ChatsController from '@/controllers/ChatsController';
import Chat from '../chat';
import AuthController from '@/controllers/AuthController';
import Popup from '@/components/popup';
import Modal from '@/components/modal';
import AddUserClass from '../addUserPopup';
import DeleteUserPopup from '../deleteUserPopup';

export default class Chats extends Block {
    protected init(): void {
        this.children.btnAddChat = new Button({
            type: 'link',
            text: 'Добавить чат',
            events: {
                click: () => {
                    const popup = document.querySelector('.addChat') as HTMLElement;
                    popup.classList.add('popup-active');
                },
            },
        });
        // this.children.addChatPopup = new Popup({
        //     children: new Modal({ children: new AddChatClass({}) }),
        //     className: 'addChat',
        // });

        this.children.addUserPopup = new Popup({
            children: new Modal({ children: new AddUserClass({}) }),
            className: 'addUser',
        });

        this.children.deleteUserPopup = new Popup({
            children: new Modal({ children: new DeleteUserPopup({}) }),
            className: 'users',
        });

        this.children.inputSearch = new Input({
            classNames: 'chatsList__input',
            inputProps: {
                placeholder: 'Поиск',
            },
        });
    }

    protected componentDidMount(): void {
        ChatsController.getChatsList();
        AuthController.fetchUser();

        store.subscribe(state => {
            this.children.profileBtn = new UserAva({
                url: store.state.user?.avatar || '',
                onClick: () => {
                    Router.go('/profile');
                },
            });
            if (state.chatsList?.length) {
                this.setProps({
                    show: true,
                    chatsList: state.chatsList.map(chat => new Chat(chat)),
                });
            } else {
                this.setProps({
                    show: false,
                });
            }
        });
    }

    protected render() {
        return this.compile(tmp, this.props);
    }
}
