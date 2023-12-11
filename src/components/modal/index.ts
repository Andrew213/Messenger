import Block from '@/core/Block';
import modalTmp from './tmp';

export default class Modal extends Block {
    protected render(): DocumentFragment {
        return this.compile(modalTmp, this.props);
    }
}
