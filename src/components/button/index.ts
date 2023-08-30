import Block from '@/core/Block';
import buttonTmp from './tmp';
import { AttributesMap } from '@/utils/AttributesMap';

export interface ButtonProps {
    type: 'default' | 'primary' | 'link' | 'denger' | 'none';
    disabled?: boolean;
    text?: string;
    arrow?: boolean;
    classNames?: string;
    href?: string;
    wrapperClassName?: string;
    buttonProps?: AttributesMap<HTMLButtonElement>;
    children?: unknown;
    events?: Record<string, (e: Event) => void>;
}

export default class Button extends Block<ButtonProps> {
    protected render(): DocumentFragment {
        return this.compile(buttonTmp, this.props);
    }
}
