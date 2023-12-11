import './styles.less';

const tmp = `
    <div id="contextMenu" class="contextMenu" style="display: none"> 
        <ul class="contextMenu__list"> 
        {{#each options}}
        <li class="contextMenu__item">{{{this}}}</li> 
        {{/each}}         
        </ul> 
    </div> 
`;

export default tmp;
