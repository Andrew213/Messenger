import './styles.less';

const tmp = `
<div class="addUser">
    {{{btnClose}}}
    {{{selectUser}}}
</div>
`;

const userOptionTmp = `
<li class="addUser__item">
{{{btn}}}
</li>
`;

const selectOptionTmp = `
<div class="govnocode">
  <span class="addUser__text"><span class="addUser__title">Логин: </span> {{login}}</span>
  <span class="addUser__text"><span class="addUser__title">Имя: </span> {{first_name}}</span>
  <span class="addUser__text"><span class="addUser__title">Фамилия: </span> {{second_name}}</span>
</div>
  `;

export { tmp, userOptionTmp, selectOptionTmp };
