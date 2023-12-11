import Button from '@/components/button';
import Dropdown from '@/components/dropDown';
import UserController from '@/controllers/UserController';
import Block from '@/core/Block';
import { selectOptionTmp, tmp, userOptionTmp } from './tmp';
import { IUser } from '@/api/AuthAPI/interfaces';

class UserOption extends Block {
    protected render() {
        return this.compile(selectOptionTmp, this.props);
    }
}

interface IUserOptions {
    login: string;
    first_name: string;
    second_name: string;
    id: number;
    onClick?: (e: MouseEvent) => void;
}
class UserOptionClass extends Block<IUserOptions> {
    protected init(): void {
        this.children.btn = new Button({
            classNames: 'addUser__itemBtn',
            type: 'none',
            children: new UserOption(this.props),
            events: {
                click: () => {
                    (document.querySelector('.dropdown__input')?.querySelector('.input') as HTMLInputElement).value =
                        '';
                    // const popup = document.querySelector('.dropdown__list');
                    // popup.classList.remove('active');
                    // ChatController.addUsersToChat({
                    //     users: [this.props.id],
                    //     chatId: store.state.currentChatId as number,
                    // });
                },
            },
        });
    }

    protected render() {
        return this.compile(userOptionTmp, this.props);
    }
}

export default class AddUserClass extends Block {
    protected init(): void {
        this.children.selectUser = new Dropdown({
            className: 'userDropdown',
            onSearch: async (value: string) => {
                if (value.trim()) {
                    const users = await UserController.getUsersByLogin(value.trim());

                    if (users?.length) {
                        this.setProps({
                            users,
                        });
                    }
                } else {
                    this.setProps({
                        users: [],
                    });
                }
                // if (this.getContent()!.querySelector('.input')) {
                //     (this.getContent()!.querySelector('.input') as HTMLInputElement).focus();
                // }
            },
        });
        this.children.btnClose = new Button({
            type: 'none',
            text: 'X',
            classNames: 'addUser__btn popup-close',
            events: {
                click: () => {
                    this.setProps({
                        users: [],
                    });
                    (this.getContent()!.querySelector('.input') as HTMLInputElement).value = '';
                    const popup = document.querySelector('.addUser') as HTMLDivElement;
                    popup.classList.remove('popup-active');
                },
            },
        });
    }

    public componentDidUpdate() {
        const userDropDown = this.children.selectUser as Block;
        if (this.props?.users?.length > 0) {
            userDropDown.setProps({
                active: this.props.users.length ? 'active' : '',
                options: this.props.users.map(
                    (user: IUser) =>
                        new UserOptionClass({
                            login: user.login,
                            first_name: user.first_name,
                            second_name: user.second_name,
                            id: user.id,
                        })
                ),
            });
        } else {
            userDropDown.setProps({
                active: '',
            });
        }
    }

    protected render() {
        return this.compile(tmp, this.props);
    }
}
