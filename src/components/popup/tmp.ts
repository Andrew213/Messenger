import './styles.less';

const tmp = `
<div class="popup {{className}}">
    <div class="popup__dialog">
        <div class="popup__content">
            {{{children}}}
        </div>
    </div>
</div>
    `;

export default tmp;
