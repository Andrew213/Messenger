import './styles.less';

const buttonTmp = `
  {{#if children}}
 <button {{{buttonProps}}} class="{{type}} {{classNames}} button">{{{children}}}</button>
  {{/if}}
{{#if arrow}}
   {{#if href}}
  <a {{{buttonProps}}} class="{{type}} {{classNames}} button" href="{{href}}">{{text}}
     <span class="icon">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 0.984375L17.0156 9L9 17.0156L7.59375 15.6094L13.1719 9.98438H0.984375V8.01562H13.1719L7.59375 2.39062L9 0.984375Z" fill="white"></path>
      </svg></span>
  </a>
  {{else}}
  <button class="{{type}} {{classNames}} button button-arrow">
      {{text}}
      <span class="icon">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 0.984375L17.0156 9L9 17.0156L7.59375 15.6094L13.1719 9.98438H0.984375V8.01562H13.1719L7.59375 2.39062L9 0.984375Z" fill="white"></path>
      </svg></span>
  </button>
  {{/if}}
{{else}}
 {{#if href}}
  <a class="{{type}} {{classNames}} button" href="{{href}}">{{text}}</a>
  {{else}}
 <button {{{buttonProps}}} class="{{type}} {{classNames}} button">{{text}}</button>
  {{/if}}
{{/if}}
`;

export default buttonTmp;
