import { IChat } from '@/api/ChatAPI/interfaces';
import Block from '@/core/Block';
import tmp from './tmp';
import store from '@/store';
import ContextMenu from '@/components/contextMenu';
import Button from '@/components/button';
import ChatsController from '@/controllers/ChatsController';

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
            events: {
                contextmenu: (e: MouseEvent) => {
                    e.stopPropagation();
                    e.preventDefault();
                    const element = e.currentTarget as HTMLElement;
                    const allContextMenus = document.querySelectorAll('.contextMenu');
                    allContextMenus.forEach(el => {
                        (el as HTMLElement).style.display = 'none';
                    });

                    document.addEventListener('click', e => {
                        // при клике в любом месте окна браузера
                        const target = e.target as HTMLElement; // находим элемент, на котором был клик
                        if (!target.closest('.contextMenu')) {
                            allContextMenus.forEach(el => {
                                (el as HTMLElement).style.display = 'none';
                            });
                        }
                    });

                    (element.children[1] as HTMLElement).style.display = 'block';
                },
            },
        });
    }

    protected init(): void {
        this.children.contextMenu = new ContextMenu({
            options: [
                new Button({
                    type: 'none',
                    classNames: 'contextMenu__btn contextMenu__btn-addUser',
                    text: 'Добавить пользователя',
                    events: {
                        click: e => {
                            e.stopPropagation();
                            const allContextMenus = document.querySelectorAll('.contextMenu');
                            allContextMenus.forEach(el => {
                                (el as HTMLElement).style.display = 'none';
                            });
                            const popup = document.querySelector('.addUser') as HTMLDivElement;
                            popup?.classList.add('popup-active');
                            store.setState({
                                currentChatId: this.props.id,
                            });
                        },
                    },
                }),
                new Button({
                    type: 'none',
                    classNames: 'contextMenu__btn contextMenu__btn-deleteUser',
                    text: 'Удалить пользователя',
                    events: {
                        click: e => {
                            e.stopPropagation();
                            const allContextMenus = document.querySelectorAll('.contextMenu');
                            allContextMenus.forEach(el => {
                                (el as HTMLElement).style.display = 'none';
                            });
                            const popup = document.querySelector('.users') as HTMLDivElement;
                            popup.classList.add('popup-active');
                            store.setState({
                                currentChatId: this.props.id,
                            });
                        },
                    },
                }),
                new Button({
                    type: 'none',
                    classNames: 'contextMenu__btn contextMenu__btn-delete',
                    text: 'Удалить чат',
                    events: {
                        click: e => {
                            e.stopPropagation();
                            ChatsController.delete({ chatId: this.props.id });
                        },
                    },
                }),
            ],
        });
    }

    protected render(): DocumentFragment {
        return this.compile(tmp, this.props);
    }
}
