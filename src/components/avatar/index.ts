import Block from '@/core/Block';
import tmp from './tmp';
import noAva from '@/assets/svg/defaultAva.svg';
import Button from '../button';

interface IUserAva {
    url?: string;
    onClick?: (e: MouseEvent) => void;
    className?: string;
}

export const getUserAva = (url?: string) => {
    return url ? `https://ya-praktikum.tech/api/v2/resources${url}` : noAva;
};

export default class UserAva extends Block<IUserAva> {
    protected init(): void {
        this.children.button = new Button({
            type: 'none',
            classNames: 'ava',
            children: `<img class="ava__img ${this.props.className || ''}" src="${getUserAva(
                this.props.url
            )}" alt="аватарка юзера" >`,
            events: {
                click: (e: MouseEvent) => {
                    this.props.onClick && this.props.onClick(e);
                },
            },
        });
    }

    protected render(): DocumentFragment {
        return this.compile(tmp, this.props);
    }
}
