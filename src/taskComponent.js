class TaskComponent{
    constructor (id, title, description, clickHandler, deleteHandler, editHandler){
        this.id=id;
        this.title=title;
        this.description=description;
        this.clickHandler=clickHandler;        
        this.deleteHandler=deleteHandler;        
        this.editHandler=editHandler;        
    };

    Render(){
        let taskComponent=document.createElement('div');
        //визуальный шаблон
        let TaskTemplate=`    
        <div data-id="task_title" class="task_title">${this.title}</div>
        <div data-id="task_description" class="task_description">${this.description}</div>
        <button data-id="task_delete" class="task_delete">Удалить</button>
        <button data-id="task_edit" class="task_edit">Редактировать</button>`;

        taskComponent.innerHTML=TaskTemplate;
        taskComponent.classList.add('task')
        taskComponent.setAttribute("data-id", `task_${this.id}`);
        taskComponent.onclick = ()=> this.Idbyclick(this.id);

        
        //слушатель на кнопку Удалить
        taskComponent.querySelector(`[data-id="task_delete"]`).onclick=()=> this.DeleteById(this.id);
        //слушатель на кнопку Редактировать
        taskComponent.querySelector(`[data-id="task_edit"]`).onclick=()=> this.EditById(this.id);

        return taskComponent;
    }

    Idbyclick(IdOfThisElement){
        this.clickHandler(IdOfThisElement);
    }

    DeleteById(id){
        this.deleteHandler(id);
    }

    EditById(id){
        this.editHandler(id);
    }

}


export default TaskComponent;