/* eslint-disable @typescript-eslint/no-unsafe-argument */
import Block from '@/core/Block';
import tmp from './tmp';
import ChatsList from './components/chatsList';

export default class MainPage extends Block {
    protected init(): void {
        this.children.chatsList = new ChatsList();
    }
    protected render(): DocumentFragment {
        return this.compile(tmp, this.props);
    }
}
