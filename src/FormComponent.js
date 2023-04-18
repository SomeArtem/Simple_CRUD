class FormComponent {
    constructor(AddHandler, ChangeHandler){
      this.AddHandler=AddHandler;
      this.ChangeHandler=ChangeHandler;
      //
      this.titleValue='';
      this.descriptionValue='';
    }
  
    Render(){
      const form=document.createElement('div');
      form.innerHTML=`    
      <div class="input_group">
        <label for="input_title">title: </label>
        <input id="input_field_title" type="text" name="input_title" id="input_title">
      </div>
      <div class="input_group">
        <label for="input_description">description: </label>
        <input id="input_field_description" type="text" name="input_description" id="input_description">
      </div>
      <div class="input_group">
        <button id="input_add">Добавить</button>
        <button id="input_change">Изменить</button>
      </div>`
      form.classList.add('form');
      const titleinput = form.querySelector('#input_field_title');
      const descriptioninput = form.querySelector('#input_field_description');
      const addButton = form.querySelector('#input_add');
      const changeButton = form.querySelector('#input_change');
      addButton.onclick=()=>this.AddClick();
      changeButton.onclick=()=>this.ChangeClick();
      titleinput.onchange=()=>this.TitleChange(titleinput.value);
      descriptioninput.onchange=()=>this.DescriptChange(descriptioninput.value);
  
      return form;
    }
    AddClick(){    
      this.AddHandler();
    }
    ChangeClick(){    
      this.ChangeHandler();
    }
    TitleChange(text){
      this.titleValue=text;
    }
    DescriptChange(text){
      this.descriptionValue=text;
    }
  
}

export default FormComponent;