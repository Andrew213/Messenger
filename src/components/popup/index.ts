import Block from '@/core/Block';
import tmp from './tmp';

interface PopupProps {
    children: Block;
    className?: string;
}
export default class Popup extends Block<PopupProps> {
    protected render() {
        return this.compile(tmp, this.props);
    }
}
