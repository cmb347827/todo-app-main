'use strict'; 

$(window).resize(function(){
	location.reload();
});

const tasksDiv = document.getElementById("all-tasks");
const newTaskTextArea = document.getElementById('enter-task');
const completedBtn = document.getElementById('js-completed-btn');
const activeBtn = document.getElementById('js-active-btn');

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
  //user presses enter key , 
  if (event.key === 'Enter') {
      //on user presses the enter key in 'create a new todo' textarea, get the new todo textarea value.
     let newTaskValue = newTaskTextArea.value;
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

completedBtn.addEventListener('click',()=>{
   completedTasks=[];
   taskActions('completed-tasks',isChecked,completedTasks);
   completedTasks=JSON.parse(localStorage.getItem("completed-tasks"));
   updateTaskContainer(completedTasks);
});

const isChecked=(inputEl)=>inputEl.checked;
const isNotChecked=(inputEl)=>!inputEl.checked;

activeBtn.addEventListener('click',()=>{
    activeTasks=[];
    taskActions('active-tasks',isNotChecked,activeTasks);
    activeTasks = JSON.parse(localStorage.getItem("active-tasks"));
    updateTaskContainer(activeTasks);
});

const updateTaskContainer = (data) => {
    console.log('in update',data);
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
                        <div class="d-flex bg-white" id="${taskId}">
                          <input onchange='setRemoveChecked(event)' class="form-check-input" type="checkbox" ${which} >
                          <textarea class="form-control">${task}</textarea>
                        </div>
                 `)
          }
        
      );
    }else{
       //reload full task list

    }
    
  };
  
  
$(window).on('load',function(){
    clearLocalStorage();
	  updateTaskContainer(taskData);
    
   
});