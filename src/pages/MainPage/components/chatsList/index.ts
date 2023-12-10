/* eslint-disable @typescript-eslint/no-unsafe-argument */
import Block from '@/core/Block';
import tmp from './tmp';
import Button from '@/components/button';
import store from '@/store';
import Router from '@/router/Router';
import { Routes } from '@/index';
import UserAva from '@/components/avatar';
import Input from '@/components/input';
import ChatsController from '@/controllers/ChatsController';
import Chat from '../chat';

export default class ChatsList extends Block {
    protected init(): void {
        this.children.btnAddChat = new Button({
            type: 'primary',
            text: 'Добавить чат',
            classNames: 'chatsList__headerBtn',
            events: {
                click: () => {
                    console.log(123);
                },
            },
        });

        this.children.inputSearch = new Input({
            classNames: 'chatsList__input',
            inputProps: {
                placeholder: 'Поиск',
            },
        });
    }

    protected async componentDidMount() {
        await ChatsController.getChatsList();
        store.subscribe(state => {
            console.log(`state `, state);
            this.children.profileBtn = new UserAva({
                url: store.state.user?.avatar || '',
                onClick: () => {
                    Router.go(Routes.ProfilePage);
                },
            });

            if (state.chatsList?.length) {
                this.setProps({
                    show: true,
                    chatsList: state.chatsList.map(chat => new Chat(chat)),
                });
            }
        });
    }
    render() {
        return this.compile(tmp, this.props);
    }
}
