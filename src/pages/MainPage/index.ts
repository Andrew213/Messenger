/* eslint-disable @typescript-eslint/no-unsafe-argument */
import Block from '@/core/Block';
import tmp from './tmp';
import ChatsList from './components/chatsList';
import AuthController from '@/controllers/AuthController';
import Router from '@/router/Router';
import { IUser } from '@/api/AuthAPI/interfaces';

export default class MainPage extends Block {
    protected init(): void {
        this.children.chatsList = new ChatsList({});
    }
    protected async componentDidMount() {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        const user = (await AuthController.fetchUser()) as IUser;

        if (!user.id) {
            Router.go('/');
        }
    }
    protected render(): DocumentFragment {
        return this.compile(tmp, this.props);
    }
}
