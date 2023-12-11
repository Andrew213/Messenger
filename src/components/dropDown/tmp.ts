import './styles.less';

const tmp = `
<div class="dropdown {{className}}">
    <div class="dropdown__content">
    {{{input}}}
    <ul class="dropdown__list {{active}}">
        {{#each options}}
            {{{this}}}
        {{/each}}    
    </ul>
    </div>
</div>
`;

export default tmp;
