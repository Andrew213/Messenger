import './styles.less';
import ic from '@/assets/img/logo.png';

// const tmp = `
// {{{modal}}}
// `;

const tmp = `
   <div class="login">
    <img src="${ic}" alt="лого мессенджера">
    {{{form}}}
    <div class="login__footer">
        <span class="login__text">
            Нет аккаунта?
        </span>
        {{{btnCreate}}}
    </div>
</div>
`;

export default tmp;
