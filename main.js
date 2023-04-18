import './style.css'
import viteLogo from '/vite.svg'
import TaskComponent from './src/taskComponent'
import FormComponent from './src/FormComponent'

//ВСЁ ЧТО ОТНОСИТСЯ К КОНТЕЙНЕРУ СПИСКА ДЕЛ
const selector='listcontainer';
const container = document.querySelector(`[data-id="${selector}"]`);
const formcontainer=container.parentNode;

let TaskArray=[];
GetDataFromStorage();
let TaskToRender;
RenderAllTasks2(TaskArray);



function GetDataFromStorage() {
  let arr=localStorage.getItem('TaskArray');
  if (arr===null){
      localStorage.setItem('TaskArray', JSON.stringify(TaskArray));        
  } else{
    TaskArray = JSON.parse(arr);
  }    
}

function RenderAllTasks2(Tasks) {
  container.innerHTML='';
  Tasks.forEach(element => RenderTask(element));
}

function RenderTask(Task) {  
  TaskToRender=new TaskComponent(Task.id, Task.title, Task.description, ClickCallback, DeleteCallback, EditCallback);
  container.appendChild(TaskToRender.Render());
}

function reRenderTask(TargetIndex, Task) {
  let newTask=new TaskComponent(Task.id, Task.title, Task.description, ClickCallback, DeleteCallback, EditCallback); 
  newTask=newTask.Render(); 
  const oldchild = container.children[TargetIndex];
  container.replaceChild(newTask, oldchild);
}

function ClickCallback(task_id){
  //Выбранный элемент
  // let parent=document.querySelector(`[data-id="task_${task_id}"]`).parentNode;
  // let chosenElement=document.querySelector(`[data-id="task_${task_id}"]`);
  // let chosenElementIndex = Array.prototype.indexOf.call(parent.children, chosenElement);
  // console.dir(chosenElementIndex);
}

function DeleteCallback(task_id){
  TaskArray=TaskArray.filter(tas=>tas.id!==task_id);
  localStorage.setItem('TaskArray', JSON.stringify(TaskArray));
  console.log(task_id+' deleted');
  RenderAllTasks2(TaskArray);
}

function EditCallback(task_id){
  //Выбранный таск
  let chosenElement=document.querySelector(`[data-id="task_${task_id}"]`);

  //передаём значения из выбранного таска в форму
  formcontainer.querySelector('#input_field_title').value = chosenElement.querySelector(`[data-id="task_title"]`).innerText;
  formcontainer.querySelector('#input_field_description').value = chosenElement.querySelector(`[data-id="task_description"]`).innerText;

  formcontainer.querySelector('#input_change').onclick=()=>{
    ConfirmationClick(task_id)
  };
}

function ConfirmationClick(id) {
  let EditedTask = TaskArray.find(item => item.id == id);
  let EditedIndex = TaskArray.indexOf(EditedTask);  
  
  EditedTask.title=NewForm.titleValue;
  EditedTask.description=NewForm.descriptionValue;

  TaskArray[EditedIndex]=EditedTask;
  localStorage.setItem('TaskArray', JSON.stringify(TaskArray));
  reRenderTask(EditedIndex, EditedTask);  
  formcontainer.querySelector('#input_change').onclick=null;  
  ClearForm();
}

//Новая форма, как компонент
let NewForm=new FormComponent(FormAdd, FormChange);

function FormAdd() {
  const TaskToPush={id:Date.now(), title:formcontainer.querySelector('#input_field_title').value, description:formcontainer.querySelector('#input_field_description').value}
  TaskArray.push(TaskToPush);
  localStorage.setItem('TaskArray', JSON.stringify(TaskArray));
  RenderTask(TaskToPush);
  ClearForm(); 
}

function FormChange() {
  console.log('FormChange')
}

function ClearForm() {
  formcontainer.querySelector('#input_field_title').value='';
  formcontainer.querySelector('#input_field_description').value='';  
}

formcontainer.prepend(NewForm.Render());