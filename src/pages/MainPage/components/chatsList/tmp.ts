import ic from '@/assets/svg/empty.svg';
import './styles.less';

const tmp = `
<aside class="chatsList">
<div class="chatsList__header">
{{{inputSearch}}}

    <div class="chatsList__headerInner">
        {{{btnAddChat}}}
        {{{profileBtn}}}
    </div>
</div>
<div class="chatsList__inner">
{{#if show}}
  <ul class="chatsList__list">
    {{#each chatsList}}
      {{{this}}}
    {{/each}}
  </ul>
{{else}}
<img  class="chatsList__empty" src=${ic} width="57">
{{/if}}
</div>
{{{addChatPopup}}}
{{{addUserPopup}}}
{{{deleteUserPopup}}}
</aside>
`;

export default tmp;
