import Block from '@/core/Block';
import Input from '../input';
import tmp from './tmp';

interface IDropDown {
    options?: unknown[];
    onSearch?: (value: string) => void;
    className: string;
}

export default class Dropdown extends Block<IDropDown> {
    protected init(): void {
        this.children.input = new Input({
            label: 'Логин пользователя',
            classNames: 'dropdown__input',
            events: {
                input: (e: Event) => {
                    const inputWrapper = e.currentTarget as HTMLDivElement;

                    this.props.onSearch &&
                        this.props.onSearch((inputWrapper.querySelector('.input') as HTMLInputElement).value);
                },
            },
            inputProps: {
                placeholder: 'Поиск',
            },
        });
    }

    protected render() {
        return this.compile(tmp, this.props);
    }
}
