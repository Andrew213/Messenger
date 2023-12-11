/* eslint-disable @typescript-eslint/no-unsafe-argument */
import Block from '@/core/Block';
import tmp from './tmp';
import Modal from '@/components/modal';
import FormClass from '@/components/form';
import Button from '@/components/button';
import Router from '@/router/Router';
import AuthController from '@/controllers/AuthController';
import { ISignUpData } from '@/api/AuthAPI/interfaces';
// import AuthController from '@/controllers/AuthController';

class SignUpPageInner extends Block {
    protected init(): void {
        this.children.form = new FormClass({
            onSuccess(data: ISignUpData) {
                void AuthController.singup(data);
            },
            class: 'registration__form',
            inputs: [
                {
                    classNames: 'registration__input',
                    name: 'email',
                    required: true,
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
                    classNames: 'registration__input',
                    name: 'login',
                    required: true,
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
                            rule: /^(?=.*[a-zA-Z])(?=.*\d).{3,20}$/,
                        },
                        {
                            message: 'Допустимые символы: _- и латиница',
                            rule: /^[a-zA-Z0-9_-]+$/,
                        },
                    ],
                },
                {
                    classNames: 'registration__input',
                    name: 'first_name',
                    required: true,
                    wrapperClassName: 'inputWrapper',
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
                    classNames: 'registration__input',
                    name: 'second_name',
                    required: true,
                    wrapperClassName: 'inputWrapper',
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
                    classNames: 'registration__input',
                    name: 'display_name',
                    wrapperClassName: 'inputWrapper',
                    inputProps: {
                        placeholder: 'Имя в чате',
                    },
                    label: 'Имя в чате',
                },
                {
                    classNames: 'registration__input',
                    name: 'phone',
                    wrapperClassName: 'inputWrapper',
                    inputProps: {
                        placeholder: 'Телефон',
                        type: 'tel',
                    },
                    label: 'Телефон',
                    rules: [
                        {
                            rule: /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/,
                            message: '10-15 цифр',
                        },
                    ],
                },
                {
                    required: true,
                    classNames: 'registration__input',
                    name: 'password',
                    wrapperClassName: 'inputWrapper',
                    inputProps: {
                        placeholder: 'Пароль',
                        type: 'password',
                    },
                    label: 'Пароль',
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
                {
                    required: true,
                    classNames: 'registration__input',
                    name: 'passwordRepeat',
                    wrapperClassName: 'inputWrapper',
                    inputProps: {
                        placeholder: 'Повторите пароль',
                        type: 'password',
                    },
                    label: 'Повторите пароль',
                },
            ],
            btnSubmit: new Button({
                type: 'primary',
                text: 'Зарегистрироваться',
                classNames: 'registration__btn registration__btn_login',
                arrow: true,
                buttonProps: {
                    type: 'submit',
                },
            }),
        });

        this.children.btnEnter = new Button({
            type: 'link',
            text: 'Войти',
            classNames: 'registration__btn registration__btn_enter',
            events: {
                click: () => {
                    Router.back();
                },
            },
            buttonProps: {
                type: 'submit',
            },
        });
    }
    protected render() {
        return this.compile(tmp, this.props);
    }
}

export default class SignUpPage extends Block {
    protected init(): void {
        this.children.signupInner = new Modal({
            children: new SignUpPageInner({}),
        });
    }
    protected render() {
        return this.compile(`{{{signupInner}}}`, this.props);
    }
}
