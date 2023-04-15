import './style.css'
import viteLogo from '/vite.svg'
import TaskComponent from './src/taskComponent'

//ВСЁ ЧТО ОТНОСИТСЯ К КОНТЕЙНЕРУ СПИСКА ДЕЛ
const selector='listcontainer';
const container = document.querySelector(`[data-id="${selector}"]`);

let TaskArray=[];
GetDataFromStorage();
let TaskToRender;
RenderAllTasks(TaskArray);



function GetDataFromStorage() {
  let arr=localStorage.getItem('TaskArray');
  if (arr===null){
      localStorage.setItem('TaskArray', JSON.stringify(TaskArray));        
  } else{
    TaskArray = JSON.parse(arr);
  }    
}

function RenderAllTasks(Tasks) {
  container.innerHTML='';
  for (let i = 0; i < Tasks.length; i++) {
    TaskToRender=new TaskComponent(Tasks[i].id,Tasks[i].title, Tasks[i].description, ClickCallback, DeleteCallback, EditCallback);
    container.appendChild(TaskToRender.Render()); 
  }    
}

function ClickCallback(task_id){
  //Выбранный элемент
  let chosenElement=document.querySelector(`[data-id="task_${task_id}"]`);
  //chosenElement.style.backgroundColor='red';
}

function DeleteCallback(task_id){
  TaskArray=TaskArray.filter(tas=>tas.id!==task_id);
  localStorage.setItem('TaskArray', JSON.stringify(TaskArray));
  console.log(task_id+' deleted');
  RenderAllTasks(TaskArray);
}

function EditCallback(task_id){
  //Выбранный элемент
  let chosenElement=document.querySelector(`[data-id="task_${task_id}"]`);

  //Поля инпута
  let inputTitleEl=document.getElementById('input_field_title');
  let inputDescriptionEl=document.getElementById('input_field_description'); 
  let inputSave=document.getElementById('input_submit2');

  inputTitleEl.value = chosenElement.querySelector(`[data-id="task_title"]`).innerText;
  inputDescriptionEl.value = chosenElement.querySelector(`[data-id="task_description"]`).innerText;

  inputSave.onclick=()=>{
    let EditedTask = TaskArray.find(item => item.id == task_id);
    let EditedIndex =TaskArray.indexOf(EditedTask)
    console.log(EditedTask, TaskArray.indexOf(EditedTask));
    EditedTask.title=inputTitleEl.value;
    EditedTask.description=inputDescriptionEl.value;

    TaskArray[EditedIndex]=EditedTask;
    localStorage.setItem('TaskArray', JSON.stringify(TaskArray));
    RenderAllTasks(TaskArray);
  }
}




//ВСЁ ЧТО ОТНОСИТСЯ К ФОРМЕ 
let inputTitleEl=document.getElementById('input_field_title');
let inputDescriptionEl=document.getElementById('input_field_description');
let inputSubmit=document.getElementById('input_submit');

inputSubmit.onclick=()=>{
  console.log('ДОБАВЛЯЕМ '+ inputTitleEl.value+' '+inputDescriptionEl.value);
  TaskArray.push({id:Date.now(), title:inputTitleEl.value, description:inputDescriptionEl.value});
  localStorage.setItem('TaskArray', JSON.stringify(TaskArray));
  RenderAllTasks(TaskArray);
  inputTitleEl.value=inputDescriptionEl.value='';
}
