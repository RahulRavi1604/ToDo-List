import * as React from 'react';

import Store from '../model/Store';
import Task from '../model/Task';
import TaskDescription from './TaskDescription';
import Tasks from './Tasks';

class ToDo extends React.Component<{ listName : string , tasks: Task[], listId : number, 
   renameList : (element: React.FormEvent<HTMLInputElement>) => void,
   updateNumberOfTasks : (listId : number) => void, toggleTaskStatus : (taskId : number) => void },
    {taskInputValue : string, activeTaskIndex : number}> {

  constructor(props:any) {
    super(props);
    this.state = {
      activeTaskIndex : 0,
      taskInputValue : "",
    };
  }
  public renameTask = () => {
    alert("Rename Task");
  }
  public toggleStatus = (event : any) => {
    const taskId = this.getTargetTaskId(event);
    this.props.toggleTaskStatus(taskId);
  }
  public toggleImportant = () => {
    alert("Important Button CLick");
  }
  public getTargetTaskId(event : any) : number {
    if (event.target.classList.contains("task")) {
      return parseInt((event.target.id).split("task")[1],10);
     } else {
      return parseInt((event.target.parentElement.id).split("task")[1],10);
     }
  }
  public handleOnClickTask = (event : any) => {
      const taskElementId = this.getTargetTaskId(event);
      Store.setActiveTask(taskElementId);
      this.setState ( 
        {activeTaskIndex : taskElementId}
      );
  }
  public handleInputOnChange = (element: React.FormEvent<HTMLInputElement>) => {
    this.setState ( {
      taskInputValue : element.currentTarget.value
    })
  }
  public addNewTask = () => {
    const inputText = this.state.taskInputValue;
    Store.addNewTask(this.props.listId,inputText);
    this.props.updateNumberOfTasks(this.props.listId);
    if (inputText !== "") {
      this.setState({
        taskInputValue: ""
      });
    }
  }
  public render() {
    return (
      <div className="todo todo-full-width show-todo">
        <div className="task-content">
          <div className="heading">
            <div className="heading-left m-r-10 p-l-10">
              <input className="list-rename-input" size={20} maxLength={20} value={this.props.listName}
                     onChange = {this.props.renameList}/>
            </div>
            <div className="heading-right">
              <i className="fa fa-trash-o delete-list-icon" />
              <button className="sort-button">
                <i className="fa fa-exchange fa-rotate-90" />Sort
          </button>
            </div>
          </div>
          <ul className="tasks m-y-auto">
          <Tasks tasks = {this.props.tasks} handleOnClickTask= {this.handleOnClickTask} toggleStatus = {this.toggleStatus}
             toggleImportant = {this.toggleImportant}/>
            <li className="task add-task-li">
              <i className="fa fa-plus plus-icon" onClick = {this.addNewTask}/>
              <input maxLength={255} className="add-input m-y-auto" placeholder="Add a task"
               value = {this.state.taskInputValue} onChange = {this.handleInputOnChange}/>
              <button className="add-button">Add</button>
            </li>
          </ul>
        </div>
        <TaskDescription task= {this.props.tasks[this.state.activeTaskIndex]} renameTask= {this.renameTask} 
        toggleStatus = {this.toggleStatus} toggleImportant = {this.toggleImportant} />
      </div>
    );
  }
}
export default ToDo;