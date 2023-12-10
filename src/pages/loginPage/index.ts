/* eslint-disable @typescript-eslint/no-unsafe-argument */
import Block from '@/core/Block';
import tmp from './tmp';
import Modal from '@/components/modal';
import FormClass from '@/components/form';
import Button from '@/components/button';
import Router from '@/router/Router';
// import AuthController from '@/controllers/AuthController';
import { ISignInData } from '@/api/AuthAPI/interfaces';
import AuthController from '@/controllers/AuthController';

class LoginInnerClass extends Block {
    protected init(): void {
        this.children.btnCreate = new Button({
            type: 'link',
            text: 'Создать',
            events: {
                click: () => {
                    Router.go('/sign-up');
                },
            },
            classNames: 'login__btn login__btn_create',
        });
        this.children.form = new FormClass({
            onSuccess: async (data: ISignInData) => {
                await AuthController.singin(data);
            },
            class: 'login__form',
            inputs: [
                {
                    classNames: 'login__input',
                    name: 'login',
                    required: true,
                    label: 'Логин',
                    inputProps: {
                        placeholder: 'Логин',
                    },
                    rules: [
                        {
                            message: 'Длина: 3-20 символов',
                            rule: /^.{3,20}$/,
                        },
                        {
                            message: 'Должна быть буква или цифра',
                            rule: /^(?=.*[a-zA-Z])(?=.*\d).{3,20}$/,
                        },
                        {
                            message: 'Допустимые символы: _- и латиница',
                            rule: /^[a-zA-Z0-9_-]+$/,
                        },
                    ],
                },
                {
                    classNames: 'login__input',
                    name: 'password',
                    required: true,
                    label: 'Пароль',
                    inputProps: {
                        placeholder: 'Пароль',
                        type: 'password',
                    },
                    rules: [
                        {
                            message: 'Длина: 8-40 символов',
                            rule: /^.{8,40}$/,
                        },

                        {
                            message: 'Хотя бы 1 заглавная буква и цифра',
                            rule: /^(?=.*[A-Z])(?=.*\d).+$/,
                        },
                    ],
                },
            ],
            btnSubmit: new Button({
                type: 'primary',
                text: 'Войти',
                wrapperClassName: 'login__btn',
                classNames: 'login__btn_enter',
                arrow: true,

                buttonProps: {
                    type: 'submit',
                },
            }),
        });
    }
    protected render() {
        return this.compile(tmp, this.props);
    }
}

export default class LoginPage extends Block {
    protected init(): void {
        this.children.loginInner = new Modal({
            children: new LoginInnerClass({}),
        });
    }

    protected render() {
        return this.compile(`{{{loginInner}}}`, this.props);
    }
}
