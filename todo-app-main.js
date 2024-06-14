'use strict'; 

$(window).resize(function(){
	location.reload();
});

const tasksDiv = document.getElementById("all-tasks");
const newTaskTextArea = document.getElementById('enter-task');
const itemsLeft=document.getElementById('js-items-left');
const completedBtn = document.getElementById('js-completed-btn');
const activeBtn = document.getElementById('js-active-btn');
const clearCompleted = document.getElementById('js-delete-completed-btn');
const allBtn=document.getElementById('js-all-btn');
const lightBtn=document.getElementById('js-light-btn');
const darkBtn = document.getElementById('js-dark-btn');
const html =document.querySelector('html');

let taskData = JSON.parse(localStorage.getItem("tasks")) || [];
let activeTasks=  [];
let completedTasks=  [];

function saveToStorage(){
    //whenever the messages are updated , will be saved in local storage.
    localStorage.setItem('tasks',JSON.stringify(taskData));//to json string
}
function loadFromStorage(){
	taskData = JSON.parse(localStorage.getItem('tasks'));  //to js object
}
function clearLocalStorage(){
   localStorage.clear();
}
function uuidv4() {
	return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
	  (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
	);
}


newTaskTextArea.addEventListener('keydown', (event) => {
  const regex = /\S/;
  //prevents the user from entering nothing 
  let passed = regex.test(newTaskTextArea.value);
  //user presses enter key , 
  if (event.key === 'Enter' && passed) {
      //on user presses the enter key in 'create a new todo' textarea, get the new todo textarea value.
        const newTaskValue =newTaskTextArea.value.trim();
        if(newTaskValue){
            const newTask ={
                taskId: Date.now(),
                task: newTaskValue,
                checked: false,
            }
            taskData.unshift(newTask);
            newTaskTextArea.value='';
            localStorage.setItem("tasks", JSON.stringify(taskData));  //change to saveToStorage();
            updateTaskContainer(taskData);
        }
        
  }
});

function getInputArray(which){
  const remainderArray=taskData.filter(which); 
  if(remainderArray){
     return remainderArray;
  }else{
    
  }
}

function taskActions(key,which,arr){
    let remainingInputArray= getInputArray(which);
    if(remainingInputArray.length >0 ){
      remainingInputArray.forEach(input=>{
          arr.push(input);
      });
      localStorage.setItem(key, JSON.stringify(arr));
    }else{
      //the last task should be either removed from active or completed tasks, whichever was updated
      arr=[];
      localStorage.setItem(key, JSON.stringify(arr));
    }
    
}

function setRemoveChecked(event){
    taskData.forEach((task)=>{
        if(task.taskId===Number(event.currentTarget.parentElement.id)){
            if(task.checked){
               //task was checked, uncheck it
               (event.currentTarget).setAttribute('checked',false);
               task.checked=false;
            }else{
               //set the checked inputs check property in taskData (task) to checked
               (event.currentTarget).setAttribute('checked',true);
               task.checked=true;
            }
        }
    });
    localStorage.setItem('tasks', JSON.stringify(taskData));
    console.log('taskdata',taskData);
}


allBtn.addEventListener('click',(e)=>{
   e.currentTarget.setAttribute('aria-selected','true');
   updateTaskContainer(taskData);
   e.currentTarget.blur();
});


completedBtn.addEventListener('click',(e)=>{
   e.currentTarget.setAttribute('aria-selected','true');
   completedTasks=[];
   taskActions('completed-tasks',isChecked,completedTasks);
   completedTasks=JSON.parse(localStorage.getItem("completed-tasks"));
   updateTaskContainer(completedTasks);
   e.currentTarget.blur();
});

const isChecked=(inputEl)=>inputEl.checked;
const isNotChecked=(inputEl)=>!inputEl.checked;

activeBtn.addEventListener('click',(e)=>{
    e.currentTarget.setAttribute('aria-selected','true');
    activeTasks=[];
    taskActions('active-tasks',isNotChecked,activeTasks);
    activeTasks = JSON.parse(localStorage.getItem("active-tasks"));
    updateTaskContainer(activeTasks);
    e.currentTarget.blur();
});

const clearTodo=()=>{
    taskData=taskData.filter((task)=>{
        if(task.checked===false){
          return task;
        }
    });
    localStorage.setItem("tasks", JSON.stringify(taskData));
}

clearCompleted.addEventListener('click',(e)=>{
    e.currentTarget.setAttribute('aria-selected','true');
    completedTasks=[];
    localStorage.setItem('completed-tasks', JSON.stringify('completed-tasks'));
    clearTodo();
    updateTaskContainer(completedTasks);
    e.currentTarget.blur();
});

const updateTaskContainer = (data) => {
    itemsLeft.textContent = activeTasks.length;
    let which;
    tasksDiv.innerHTML = "";
    if(data){
      data.forEach(
          ({ taskId, task ,checked}) => {
                   if(checked){
                    which='checked';
                   }else{
                    which='';
                   }
                  (tasksDiv.innerHTML += `
                        <div class="d-flex bg-white " id="${taskId}">
                          <label class='visually-hidden'>Check or uncheck task</label>
                          <input onchange='setRemoveChecked(event)' class="form-check-input" type="checkbox" ${which} >
                          <textarea class="form-control">${task}</textarea>
                        </div>
                 `)
          }
        
      );
    }
    
};
lightBtn.addEventListener('click',()=>{
    if($(darkBtn).hasClass('hide')){
      $(darkBtn).removeClass('hide');
      $(lightBtn).addClass('hide');
    }
    if($(lightBtn).hasClass('show')){
      $(lightBtn).removeClass('show');
      $(darkBtn).addClass('show');
    }
    if($(html).hasClass('dark')){
      $(html).removeClass('dark');
      $(html).addClass('light');
    }
      darkBtn.disable=false;
      darkBtn.setAttribute('aria-hidden','false');
      darkBtn.setAttribute('aria-disabled','false');

      lightBtn.disable=true;
      lightBtn.setAttribute('aria-hidden','true');
      lightBtn.setAttribute('aria-disabled','true');
});

darkBtn.addEventListener('click',()=>{  //has hide.
      if($(lightBtn).hasClass('hide')){
        $(lightBtn).removeClass('hide');
        $(darkBtn).addClass('hide');
      }
      if($(darkBtn).hasClass('show')){
        $(darkBtn).removeClass('show');
        $(lightBtn).addClass('show');
      }
      if($(html).hasClass('light')){
        $(html).removeClass('light');
        $(html).addClass('dark');
      }
       lightBtn.disable=false;
       lightBtn.setAttribute('aria-hidden','false');
       lightBtn.setAttribute('aria-disabled','false');

       $(darkBtn).disable=true;
       darkBtn.setAttribute('aria-hidden','true');
       darkBtn.setAttribute('aria-disabled','true');
});

$(window).on('load',function(){
    clearLocalStorage();
	  updateTaskContainer(taskData);
    Sortable.create(tasksDiv);
    
});