import AuthController from './controllers/AuthController';
import './index.less';

document.addEventListener('DOMContentLoaded', () => {
    const foo = async () => {
        try {
            await AuthController.singin({ login: 'admin12345', password: 'Andrew123' });
            console.log(`success 2`);
        } catch (err) {
            console.log(`err 2`);
        }
    };

    void foo();
});
