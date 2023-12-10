/* eslint-disable @typescript-eslint/no-misused-promises */
import { IUser } from './api/AuthAPI/interfaces';
import AuthController from './controllers/AuthController';
import './index.less';
import MainPage from './pages/MainPage';
import ProfilePage from './pages/ProfilePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/loginPage';
import Router from './router/Router';
import router from './router/Router';

export enum Routes {
    LoginPage = '/',
    SignUpPage = '/sign-up',
    ProfilePage = '/profile',
    MainPage = '/main',
}

document.addEventListener('DOMContentLoaded', () => {
    router
        .setUnprotectedPaths(['/'])
        .onRoute(async () => {
            try {
                const user = await AuthController.fetchUser();
                if ((user as IUser).id) {
                    Router.go(Routes.MainPage);
                }
            } catch (err) {
                console.log(err);
            }
        })
        .use(Routes.LoginPage, LoginPage)
        .use(Routes.SignUpPage, SignUpPage)
        .use(Routes.ProfilePage, ProfilePage)
        .use(Routes.MainPage, MainPage)
        .start();
});
