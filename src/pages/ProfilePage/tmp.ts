import './styles.less';

const tmp = `
 <div class="profile">
   {{{buttonAva}}}
    <span class="profile__title">
          {{display_name}}
    </span>
    {{{form}}}
    {{{buttonChangePass}}}
    {{{buttonLogout}}}
    {{{buttonBack}}}
    {{{avatarModal}}}
 </div>
`;

const avatarTmp = `
<div>
     <img src="{{src}}" alt="user avatar", width="130" class="profile__avatar-img"/>
    <span class="profile__avatar-text">
        Изменить фото
      </span>
</div>
`;

export { tmp, avatarTmp };
