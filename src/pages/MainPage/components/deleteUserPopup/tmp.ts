import './styles.less';
import ic from '@/assets/svg/empty.svg';

const tmp = `
<div class="users">
    {{{btnClose}}}
    {{#if show}}
    <ul class="users__list">
    {{#each users}}
        <li class="users__item">
        {{{this}}}
        </li>    
    {{/each}}
    </ul>   
    {{else}}
    <img  class="users__empty" src=${ic} width="100">
{{/if}}    
</div>
`;

const userTmp = `
<div class="user">
<div class="user__inner">
  <span class="user__text"><span class="user__title">Логин: </span> {{login}}</span>
  <span class="user__text"><span class="user__title">Имя: </span> {{first_name}}</span>
  <span class="user__text"><span class="user__title">Фамилия: </span> {{second_name}}</span>
</div>
{{{btnDelete}}}
</div>
`;

export { tmp, userTmp };
