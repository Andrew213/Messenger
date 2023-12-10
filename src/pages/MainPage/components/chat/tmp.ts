import './styles.less';
import ic from '@/assets/svg/defaultAva.svg';
const tmp = `
<li class="chat {{active}}">
<button class="chat__btn">
    <div class="chat__body">
       {{#if avatar}}
        <img src="https://ya-praktikum.tech/api/v2/resources{{avatar}}" alt="аватарка юзера" width="57">
          {{else}}
        <img src=${ic} alt="аватарка юзера" width="57">
          {{/if}}

        <div class="chat__bodyText">
        <span class="chat__name">
            {{title}}
        </span>
        {{#if last_message}}
          <div class="chat__innerText">
            <div class="chat__text"><span class="chat__text-owner">{{owner}}</span> <span class="chat__text-message">{{last_message}}</span></div>
        </div>
        {{/if}}
    </div>
    </div>
    {{#if unread_count}}
    <div class="chat__newCount" >{{unread_count}}</div>
    {{/if}}
  </button>
  {{{contextMenu}}}
</li>

`;

export default tmp;
