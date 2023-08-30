import styles from './styles.module.less';

const modalTmp = `
<div class="${styles.modal}">
    <div class="${styles.modal__inner}">
    {{{children}}}
    </div>
</div>
`;

export default modalTmp;
