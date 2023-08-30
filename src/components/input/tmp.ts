import './styles.less';

const inputTmp = `
{{#if label}}
<div class="container {{classNames}}">
    <div class="text">
      {{label}}
    </div>
     <input name="{{name}}" {{{inputProps}}} value="{{value}}" class="input"/>
     {{#if message}}
        <span class="input__errorMessage">{{message}}</span>
     {{/if}}
</div>
  {{else}}
  <div class="container {{classNames}}">
      <input {{{inputProps}}} name="{{name}}"  autocomplete="off"  value="{{value}}" class="input"/>
     {{#if message}}
        <span class="input__errorMessage">{{message}}</span>
     {{/if}}
  </div>
{{/if}}
`;

export default inputTmp;
