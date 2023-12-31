/* eslint-disable @typescript-eslint/no-unsafe-argument */
import Modal from '@/components/modal';
import Block from '@/core/Block';
import { avatarTmp, tmp } from './tmp';
import Button from '@/components/button';
import store from '@/store';
import Popup from '@/components/popup';
import AvatarModal from './components/avaModal';
import FormClass, { FormProps } from '@/components/form';
import Router from '@/router/Router';
import AuthController from '@/controllers/AuthController';
import { IUser } from '@/api/AuthAPI/interfaces';
import ic from '@/assets/svg/defaultAva.svg';
interface ProfileProps {
    loadfileModal?: Block;
    wrapperClassName?: string;
    display_name?: string;
    src?: string;
}

interface FileBtnProps {
    src: string;
}

class FileBtn extends Block<FileBtnProps> {
    protected render() {
        return this.compile(avatarTmp, this.props);
    }

    componentDidMount(): void {
        store.subscribe(state => {
            if (state.user?.avatar) {
                this.setProps({
                    src: `https://ya-praktikum.tech/api/v2/resources${state.user.avatar}`,
                });
            }
        });
    }
}

class ProfilePageClass extends Block<ProfileProps> {
    avatarUrl = ic;

    init(): void {
        void AuthController.fetchUser();
        this.setProps({
            src: ic,
        });

        this.children.form = new FormClass({
            class: 'profile__form',
            // onSuccess(data) {
            //     UserController.changeUserProfile(data as IUserPut);
            // },
            inputs: [
                {
                    classNames: 'profile__input',
                    name: 'email',

                    inputProps: {
                        placeholder: 'Email',
                        type: 'email',
                    },
                    label: 'Email',
                    rules: [
                        {
                            rule: /^[a-zA-Z0-9_.-]+@[a-zA-Z]+(\.[a-zA-Z]+)+$/,
                            message: 'Невалидный email',
                        },
                    ],
                },
                {
                    classNames: 'profile__input',
                    name: 'login',
                    inputProps: {
                        placeholder: 'Логин',
                    },
                    label: 'Логин',
                    rules: [
                        {
                            message: 'Длина: 3-20 символов',
                            rule: /^.{3,20}$/,
                        },
                        {
                            message: 'Должна быть буква или цифра',
                            rule: /^(?!-|_)(?!.*(?:-|_){2})[a-zA-Z0-9_-]{3,20}(?<!-|_)$/,
                        },
                        {
                            message: 'Допустимые символы: _- и латиница',
                            rule: /^[a-zA-Z0-9_-]+$/,
                        },
                    ],
                },
                {
                    name: 'first_name',
                    classNames: 'profile__input',

                    inputProps: {
                        placeholder: 'Имя',
                    },
                    label: 'Имя',
                    rules: [
                        {
                            rule: /^[А-ЯЁа-яёA-Za-z]+$/,
                            message: 'Латиница или кириллица и без символов',
                        },
                        {
                            rule: /^[А-ЯЁA-Z][А-ЯЁа-яёa-z]*$/,
                            message: 'Первая буква должна быть заглавной',
                        },
                    ],
                },
                {
                    name: 'second_name',
                    classNames: 'profile__input',

                    inputProps: {
                        placeholder: 'Фамилия',
                    },
                    label: 'Фамилия',
                    rules: [
                        {
                            rule: /^[А-ЯЁа-яёA-Za-z]+$/,
                            message: 'Латиница или кириллица и без символов',
                        },
                        {
                            rule: /^[А-ЯЁA-Z][А-ЯЁа-яёa-z]*$/,
                            message: 'Первая буква должна быть заглавной',
                        },
                    ],
                },
                {
                    name: 'display_name',
                    classNames: 'profile__input',

                    inputProps: {
                        placeholder: 'Имя в чате',
                    },
                    label: 'Имя в чате',
                },
                {
                    name: 'phone',
                    classNames: 'profile__input',
                    inputProps: {
                        placeholder: 'Телефон',
                        type: 'tel',
                    },
                    label: 'Телефон',
                    rules: [
                        {
                            rule: /^\+?\d{10,15}$/,
                            message: '10-15 цифр',
                        },
                    ],
                },
            ],
            btnSubmit: new Button({
                type: 'primary',
                text: 'Сохранить',
                wrapperClassName: 'profile__btnWrapper',
                classNames: 'profile__btn profile_data',
                buttonProps: {
                    type: 'submit',
                },
            }),
        });

        this.children.buttonChangePass = new Button({
            type: 'default',
            text: 'Изменить пароль',
            wrapperClassName: 'profile__btnWrapper',
            classNames: 'profile__btn profile__btn_password',
        });
        this.children.buttonLogout = new Button({
            type: 'denger',
            text: 'Выйти',
            events: {
                click: () => {
                    void AuthController.logout();
                },
            },
            wrapperClassName: 'profile__btnWrapper',
            classNames: 'profile__btn profile__btn_logout',
        });

        this.children.buttonBack = new Button({
            type: 'link',
            text: 'Назад',
            events: {
                click: () => {
                    Router.back();
                },
            },
            wrapperClassName: 'profile__btnWrapper',
            classNames: 'profile__btn profile__btn_back',
        });

        this.children.buttonAva = new Button({
            type: 'none',
            classNames: 'profile__avatar',
            children: new FileBtn({ src: ic }),
            events: {
                click: () => {
                    const popup = document.querySelector('.loadFile') as HTMLElement;
                    popup.classList.add('popup-active');
                },
            },
        });
    }

    componentDidMount(): void {
        store.subscribe(state => {
            (this.children.form as Block<FormProps>).props.inputs.forEach(({ name }) => {
                if (state.user) {
                    this.setProps({
                        display_name: state.user.display_name || state.user.first_name,
                    });
                    const currentEl = this.getContent()!.querySelector(`[name='${name}']`) as HTMLInputElement;

                    if (currentEl) {
                        currentEl.value = state.user[name as keyof Omit<IUser, 'id'>];
                    }
                }
            });
        });
    }

    protected render() {
        return this.compile(tmp, this.props);
    }
}

export default class ProfilePage extends Block {
    protected init(): void {
        this.children.render = new Modal({
            children: new ProfilePageClass({}),
            loadfileModal: new Popup({
                children: new Modal({
                    children: new AvatarModal({}),
                }),
                className: 'loadFile',
            }),
            // changePassModal: changePassPopup,
        });
    }

    protected render() {
        return this.compile(`{{{render}}}`, this.props);
    }
}
