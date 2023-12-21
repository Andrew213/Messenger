import './styles.less';

const tmp = `
  <div class="message message-{{sendType}}">
        <div class="message__inner message__inner-{{sendType}}">
            <span class="message__text">
              {{content}}
            </span>
            <span class="message__date message__date-{{sendType}}">{{time}}</span>
        </div>
    </div>
`;

export default tmp;
