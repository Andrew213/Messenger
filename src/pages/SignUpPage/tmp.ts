import './styles.less';
import ic from '@/assets/img/logo.png';

const tmp = `
<div class="registration">
<div class="registration__logo">
<img src="${ic}" alt="лого мессенджера">
</div>
<span class="registration__title">
        Регистрация аккаунта
    </span>
    {{{form}}}
    <div class="registration__footer">
        <span class="registration__text">
            Есть аккаунт?
        </span>
       {{{btnEnter}}}
    </div>
</div>
`;

export default tmp;
