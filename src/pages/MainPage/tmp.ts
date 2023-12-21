import ic from '@/assets/svg/empty.svg';
import './styles.less';

const tmp = `
   <div class="wrapper">
    <main class="main">
      {{{chatsList}}}
    <div class="main__chat">
      <div class="main__header">
        <span class="main__text">Участники чата:</span>
        <ul class="main__usersList">
              {{#each chatUsers}}
                  <li class="main__usersItem">
                  {{{this}}}
                  </li>
              {{/each}}    
        </ul>
      </div>
            <div class="main__content">
            <span class="main__date">19 июня</span>
            <div class="main__contentInner">
          {{#if show}}
              {{#each messages}}
                  {{{this}}}
              {{/each}}
         {{else}}
            <img  class="chats__empty" src=${ic}  width="57">
          {{/if}}

            </div>
              </div>
              <div class="main__footer">
                {{{inputSend}}}
            </div>
        
        </div>
    </main>
   </div> 
`;

export default tmp;
