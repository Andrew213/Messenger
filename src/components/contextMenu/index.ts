import Block from '@/core/Block';
import tmp from './tmp';

interface IContextMenu {
    options: Block[];
}

export default class ContextMenu extends Block<IContextMenu> {
    protected render() {
        return this.compile(tmp, this.props);
    }
}
