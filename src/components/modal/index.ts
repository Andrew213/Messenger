import Block from '@/core/Block';
import modalTmp from './tmp';

interface ModalProps {
    children?: Block | Block[];
}

export default class Modal extends Block<ModalProps> {
    protected render(): DocumentFragment {
        return this.compile(modalTmp, this.props);
    }
}
