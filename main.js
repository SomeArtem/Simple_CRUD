import './style.css'
import viteLogo from '/vite.svg'
import TaskComponent from './src/taskComponent'

//ВСЁ ЧТО ОТНОСИТСЯ К КОНТЕЙНЕРУ СПИСКА ДЕЛ
const selector='listcontainer';
const container = document.querySelector(`[data-id="${selector}"]`);

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
  inputTitleEl.value = chosenElement.querySelector(`[data-id="task_title"]`).innerText;
  inputDescriptionEl.value = chosenElement.querySelector(`[data-id="task_description"]`).innerText;

  inputChange.onclick=()=>{
    let EditedTask = TaskArray.find(item => item.id == task_id);
    let EditedIndex = TaskArray.indexOf(EditedTask);
    // console.log('EditedTask',EditedTask);
    
    EditedTask.title=inputTitleEl.value;
    EditedTask.description=inputDescriptionEl.value;

    TaskArray[EditedIndex]=EditedTask;
    localStorage.setItem('TaskArray', JSON.stringify(TaskArray));
    //RenderAllTasks2(TaskArray);
    reRenderTask(EditedIndex, EditedTask)
  }
}




//ВСЁ ЧТО ОТНОСИТСЯ К ФОРМЕ 
let inputChange=document.getElementById('input_change');
let inputTitleEl=document.getElementById('input_field_title');
let inputDescriptionEl=document.getElementById('input_field_description');
let inputAdd=document.getElementById('input_add');

inputAdd.onclick=()=>{
  const TaskToPush={id:Date.now(), title:inputTitleEl.value, description:inputDescriptionEl.value}
  TaskArray.push(TaskToPush);
  localStorage.setItem('TaskArray', JSON.stringify(TaskArray));
  RenderTask(TaskToPush);
  ClearForm();  
}

function ClearForm() {
  inputTitleEl.value='';
  inputDescriptionEl.value='';  
}
