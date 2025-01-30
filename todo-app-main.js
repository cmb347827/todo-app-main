'use strict'; 

$(window).resize(function(){
	location.reload();
});

const tasksDiv = document.getElementById("all-tasks");
const newTaskTextArea = document.getElementById('enter-task');
const itemsLeft=document.getElementById('js-items-left');
const completedBtn = document.getElementById('js-completed-btn');
const activeBtn = document.getElementById('js-active-btn');
/*const clearCompletedNodeList = document.getElementsByClassName('js-delete-completed-btn');
const clearCompleted = Array.from(clearCompletedNodeList);*/

const allBtn=document.getElementById('js-all-btn');
const lightBtn=document.getElementById('js-light-btn');
const darkBtn = document.getElementById('js-dark-btn');
const html =document.querySelector('html');
const errBlank= document.getElementById('blank-error'); 
const mobileClear=document.getElementById('mobile-clear');
const largescreenClear=document.getElementById('largescreen-clear');
let viewType='taskData';

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

let defaultTasks =[
      {
        taskId: '',
        task: 'Complete online JS course',
        checked: true,
      },{
        taskId: '',
        task: 'Jog around the park 3x',
        checked: false,
      },{
        taskId: '',
        task: '10 minute meditation',
        checked: false,
      },{
        taskId: '',
        task: 'read for 1 hour',
        checked: false,
      },{
        taskId: '',
        task: 'pick up groceries',
        checked: false,
      },{
        taskId: '',
        task: 'complete todo app on frontend mentor',
        checked: false,
      }
]

function loadDefault(){
    defaultTasks= defaultTasks.reverse();
    defaultTasks.forEach(task=>{
          //create a new task object
          const newTask ={
              taskId: uuidv4(),
              task: task.task,
              checked: task.checked,
          }
          //add the new task to the taskData array
          taskData.unshift(newTask);
          localStorage.setItem("tasks", JSON.stringify(taskData));  //change to saveToStorage();
    });
}

const setView=(currentview)=>{
    viewType=currentview;
};


const addTaskByView=(newtask)=>{
    //add the new task to the taskData array
    taskData.unshift(newtask);
    localStorage.setItem("tasks", JSON.stringify(taskData));

    //viewType is either default taskData or set by the user clicking 'active', 'completed', and 'all' buttons.
    if(viewType==='activeTasks'){
        activeTasks.unshift(newtask);
        localStorage.setItem('active-tasks',JSON.stringify(activeTasks));
        updateTaskContainer(activeTasks);
    }else if(viewType==='completedTasks'){
        newtask.checked=true;
        completedTasks.unshift(newtask);
        localStorage.setItem('completed-tasks',JSON.stringify(completedTasks));
        updateTaskContainer(completedTasks);
    }else if(viewType==='taskData'){                          
        updateTaskContainer(taskData); 
    }
}

newTaskTextArea.addEventListener('keydown', (event) => {
  const regex = /\S/;
  //prevents the user from entering nothing 
  let passed = regex.test(newTaskTextArea.value);

  //user presses enter key 
  if (event.key === 'Enter' && passed) {
        //if the user has tried to enter a blank task earlier, remove the error message.
        if($('#blank-error').hasClass('show-error')){
            $('#blank-error').removeClass('show-error');
            $('#blank-error').addClass('hide-error');
        }
        //on user presses the enter key in 'create a new todo' textarea, get the new todo textarea value.
        const newTaskValue =newTaskTextArea.value.trim();
        if(newTaskValue){
            //create a new task object
            const newTask ={
                taskId: uuidv4(),
                task: newTaskValue,
                checked: false,
            }
            //clear the #enter-task textarea
            newTaskTextArea.value='';
            //add the new task, works whether user is viewing the 'active' tasks, 'completed' tasks, or all tasks.
            addTaskByView(newTask);
        }
  }else if(event.key ==='Enter' && !passed){
     //the user has pressed enter while the #enter-task textarea is blank, show an error message.
     if($('#blank-error').hasClass('hide-error')){
        $('#blank-error').removeClass('hide-error');
        $('#blank-error').addClass('show-error');
     }
  }
});

function getInputArray(which){
  //return the input task array (either active or completed)
  const remainderArray=taskData.filter(which); 
  if(remainderArray){
     return remainderArray;
  }
}

function taskActions(key,which,arr){
    let remainingInputArray= getInputArray(which);
    //below code will update either the active or completed arrays with the new task.
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
function updateTask(event){
   //update taskData(all), plus or active or completed with the newly updated task when once entered task value changes. 
    taskData.forEach((task)=>{
        if(task.taskId===event.currentTarget.parentElement.id){
           task.task = event.currentTarget.value;
        }
    });
    if(viewType==='activeTasks'){
        activeTasks.forEach((task)=>{
          if(task.taskId===event.currentTarget.parentElement.id){
             task.task = event.currentTarget.value;
          }
        });
        localStorage.setItem("active-tasks", JSON.stringify(activeTasks)); 
   } else if(viewType==='completedTasks'){
        completedTasks.forEach((task)=>{
          if(task.taskId===event.currentTarget.parentElement.id){
            task.task = event.currentTarget.value;
          }
        });
        localStorage.setItem("completed-tasks", JSON.stringify(completedTasks)); 
   }
   localStorage.setItem("tasks", JSON.stringify(taskData));
}

function setRemoveChecked(event){
    //deals with checking/unchecking a task  and will update activeTasks or completedTasks once active or completed buttons are clicked as checked attribute is used.
    taskData.forEach((task)=>{
    
        if(task.taskId===event.currentTarget.parentElement.id){    
              //found the current checked/unchecked task in taskData
              if(task.checked){
                //task was checked, uncheck it
                (event.currentTarget).setAttribute('checked',false); 
                task.checked=false;
              }else{
                //task was unchecked, check it.
                //set the checked inputs check property in taskData (task) to checked
                (event.currentTarget).setAttribute('checked',true);
                task.checked=true;
              }
            
        }
    });
    localStorage.setItem('tasks', JSON.stringify(taskData));
    //displays the number of active tasks
    const activeArr= taskData.filter(isNotChecked);
    itemsLeft.textContent = activeArr.length;
}



function deleteTask(e){
   //delete the task (when x is clicked to right of task)
   //works whether the user is viewing all tasks, 'active' tasks, or 'completed' tasks
   taskData= taskData.filter(task=>!(task.taskId===e.currentTarget.parentElement.id));
   localStorage.setItem('tasks', JSON.stringify(taskData));  
   if(viewType==='taskData'){                                     
      //update shown list with the task deleted
      updateTaskContainer(taskData);                                                                 
    } else if(viewType==='activeTasks'){
        activeTasks= activeTasks.filter(task=>!(task.taskId===e.currentTarget.parentElement.id));
        localStorage.setItem('active-tasks', JSON.stringify(activeTasks));                                       
        //update shown list with the task deleted
        updateTaskContainer(activeTasks); 
    } else if(viewType==='completedTasks'){
        completedTasks= completedTasks.filter(task=>!(task.taskId===e.currentTarget.parentElement.id));
        localStorage.setItem('completed-tasks', JSON.stringify(completedTasks));                                       
        //update shown list with the task deleted
        updateTaskContainer(completedTasks); 
    }
}
  


allBtn.addEventListener('click',(e)=>{
   //setView sets viewType to the current tasks, in this case taskData or after the user presses the all button.
   setView('taskData');
   //update list to show all tasks in taskData
   updateTaskContainer(taskData);
});


completedBtn.addEventListener('click',(e)=>{
   //setView sets viewType of completedTasks as the user pressed the 'completed' button
   setView('completedTasks');
   //set completedTasks to empty array , to avoid adding to end from possible earlier getItem calls.
   completedTasks=[];
   //check to see which tasks are completed and update completedTasks
   taskActions('completed-tasks',isChecked,completedTasks);
   completedTasks=JSON.parse(localStorage.getItem("completed-tasks"));
   //update list shown with newly fetched completedTasks
   updateTaskContainer(completedTasks);
});

const isChecked=(inputEl)=>inputEl.checked;
const isNotChecked=(inputEl)=>!inputEl.checked;

activeBtn.addEventListener('click',(e)=>{
    //setView sets viewType to activeTasks as the user pressed the 'active' button
    setView('activeTasks');
    //set activeTasks to empty array , to avoid adding to end from possible earlier getItem calls.
    activeTasks=[];
    //check to see which tasks are active and update activeTasks
    taskActions('active-tasks',isNotChecked,activeTasks);
    activeTasks = JSON.parse(localStorage.getItem("active-tasks"));
    //update list shown with newly fetched activeTasks
    updateTaskContainer(activeTasks);
});

const clearTodo=()=>{
    taskData=taskData.filter((task)=>{
        if(task.checked===false){
          return task;
        }
    });
    localStorage.setItem("tasks", JSON.stringify(taskData));
}

[...document.querySelectorAll('.js-delete-completed-btn')].forEach(btn=>btn.addEventListener('click',(e)=>{
    //setView sets viewType to completedTasks as the user pressed the 'Clear Completed' button and should show the empty completed on updateTaskContainer.
    setView('completedTasks');
    //set completedTasks to empty array first
    completedTasks=[];
    localStorage.setItem('completed-tasks', JSON.stringify('completed-tasks'));
    //in clearTodo() filter out checked tasks and update taskData.
    clearTodo();
    //update list shown with completed removed
    updateTaskContainer(completedTasks);
}));

const updateTaskContainer = (data) => {
    //displays the number of active tasks
    const activeArr= taskData.filter(isNotChecked);
    itemsLeft.textContent = activeArr.length;
    

    let which; let whichStyle;
    tasksDiv.innerHTML = "";
    if(data){
      data.forEach(
          ({ taskId, task ,checked}) => {
                   if(checked){
                    //whichStyle='text-decoration-line:line-through';
                    which='checked';
                   }else{
                    whichStyle={};
                    which='';
                   }
                  (tasksDiv.innerHTML += `
                        <div class="d-flex align-items-center ps-1 pt-1" id="${taskId}">
                          <input aria-label='Check or uncheck input checkbox to task'  onchange='setRemoveChecked(event)' class="form-check-input checkbox-round" type="checkbox" ${which} >
                           <label class='visually-hidden'>Check or uncheck task</label>
                          <textarea title='add task' style='${whichStyle}' onchange='updateTask(event)' class="form-control">${task}</textarea>
                          <button title='delete task' onclick='deleteTask(event)' type='button' class='delete-task btn'><svg  class='cross' xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg></button>
                        </div>
                        <hr class='bottom-hr'>
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
    taskData=[];
    loadDefault();
    
    let items = document.querySelector('#all-tasks');  
    Sortable.create(items, {      
        animation: 150,               
        group: "tasks",      
        store: {          
           set:(sortable) => {              
              const order = sortable.toArray();              
              localStorage.setItem(sortable.options.group.name, order.join('|'));          
           },          
           //get list order       
           get: (sortable) => {              
             const order = localStorage.getItem(sortable.options.group.name);              
             return order ? order.split('|') : [];          
            }      
        }  
    });  
    
    updateTaskContainer(taskData);
  
});
