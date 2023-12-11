/* eslint-disable @typescript-eslint/no-unsafe-argument */
import Block from '@/core/Block';
import tmp from './tmp';
import ChatsList from './components/chatsList';
import AuthController from '@/controllers/AuthController';

export default class MainPage extends Block {
    protected init(): void {
        this.children.chatsList = new ChatsList({});
    }
    protected componentDidMount(): void {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        AuthController.fetchUser();
    }
    protected render(): DocumentFragment {
        return this.compile(tmp, this.props);
    }
}
