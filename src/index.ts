/* eslint-disable @typescript-eslint/no-misused-promises */
import AuthController from './controllers/AuthController';
import './index.less';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/loginPage';
import router from './router/Router';

document.addEventListener('DOMContentLoaded', () => {
    router
        .setUnprotectedPaths(['/'])
        .onRoute(async () => {
            try {
                await AuthController.fetchUser();
                //   router.go(Routes.Messenger);
            } catch (err) {
                console.log(err);
            }
        })
        .use('/', LoginPage)
        .use('/sign-up', SignUpPage)
        .start();
});
