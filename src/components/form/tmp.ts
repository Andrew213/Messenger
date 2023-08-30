import './styles.less';
const formTmp = `
<form class="form {{class}}">
{{#each inputs}}
  {{{this}}}
{{/each}}
{{{btnSubmit}}}
</form>`;

export default formTmp;
