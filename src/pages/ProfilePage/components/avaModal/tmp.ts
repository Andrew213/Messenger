import './styles.less';

const tmp = `
<div class="file">
    {{{btnClose}}}    
    <span class="file__title">Загрузите файл</span>
    <label for="upload-photo" class="file__text"> Выбрать файл на компьютере</label>
    <span class="file__name">{{fileName}}</span>
   {{{form}}}
</div>
`;
export default tmp;
