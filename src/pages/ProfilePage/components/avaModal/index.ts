/* eslint-disable @typescript-eslint/no-unsafe-argument */
import Block from '@/core/Block';
import tmp from './tmp';
import FormClass from '@/components/form';
import Button from '@/components/button';
// import UserController from '@/controllers/UserController';

class AvatarModal extends Block {
    protected init(): void {
        this.children.form = new FormClass({
            class: 'file__form',
            onSuccess({ avatar }) {
                const formData = new FormData();
                formData.append('avatar', avatar);
                // UserController.changeAvatar(formData);
            },
            inputs: [
                {
                    wrapperClassName: 'file__link',
                    classNames: 'file__link',

                    // ВЫРОВНЯТЬ ЕБУЧУЮ МОДАЛКУ ПО ЦЕНТРУ (ИННЕР)

                    events: {
                        change: e => {
                            const el = e.target as HTMLInputElement;
                            if (el.files?.length) {
                                this.setProps({
                                    fileName: el.files[0].name,
                                });
                            }
                        },
                    },
                    inputProps: {
                        type: 'file',
                        accept: 'image/jpeg, image/png',
                        id: 'upload-photo',
                        name: 'avatar',
                    },
                },
            ],
            btnSubmit: new Button({
                wrapperClassName: 'file__btn',
                classNames: 'file__btn',
                text: 'Поменять',
                type: 'default',
                buttonProps: {
                    type: 'submit',
                },
            }),
        });

        this.children.btnClose = new Button({
            type: 'none',
            classNames: 'file__btn popup-close',
            text: 'X',
            events: {
                click: () => {
                    const popup = document.querySelector('.loadFile') as HTMLElement;
                    popup.classList.remove('popup-active');
                },
            },
        });

        this.children.button = new Button({
            wrapperClassName: 'file__btn',
            classNames: 'file__btn',
            text: 'Поменять',
            type: 'default',
            disabled: true,
            buttonProps: {
                type: 'submit',
            },
        });
    }

    protected render() {
        return this.compile(tmp, this.props);
    }
}

export default AvatarModal;
