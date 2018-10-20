import * as React from 'react';

import Store from '../model/Store';
import Task from '../model/Task';
import TaskDescription from './TaskDescription';
import Tasks from './Tasks';

class ToDo extends React.Component<{
  listName: string, tasks: Task[], listId: number,
  renameList: (element: React.FormEvent<HTMLInputElement>) => void,
  renameTask: (taskInput: string, activeTaskIndex: number) => void,
  updateNumberOfTasks: (listId: number) => void,
  toggleTaskStatus: (taskId: number) => void,
  toggleTaskImportant: (taskId: number) => void,
  addToDay: (activeTaskIndex: number) => void,
  updateReminder: (taskId: number, inputDate: Date) => void,
  updateDueDate: (taskId: number, inputDate: Date) => void,
  updateRepeat: (taskId: number, inputValue: string) => void,
  updateNote: (taskId: number, inputValue: string) => void
  deleteCurrentList: () => void, deleteCurrentTask: (taskId: number) => void,
}, { taskInputValue: string, activeTaskIndex: number, listId: number, isDescriptionExpanded: boolean }> {


  public static getDerivedStateFromProps(props: any, prevState: any) {
    if (prevState !== undefined && props.listId !== prevState.listId) {
      return {
        activeTaskIndex: -1,
        isDescriptionExpanded : false,
        listId: props.listId,
      };
    }
    return null;
  }
  constructor(props: any) {
    super(props);
    this.state = {
      activeTaskIndex: -1,
      isDescriptionExpanded : false,
      listId: this.props.listId,
      taskInputValue: "",
    };
  }

  public deleteCurrentTask = () => {
    this.props.deleteCurrentTask(this.state.activeTaskIndex);
    this.closeTaskDescriptionWindow();
    this.setState({
      activeTaskIndex: -1
    })
  }
  public addToDay = (): void => {
    this.props.addToDay(this.state.activeTaskIndex);
  }
  public renameTask = (taskInput: string): void => {
    this.props.renameTask(taskInput, this.state.activeTaskIndex);
  }
  public toggleStatus = (event: any) => {
    this.props.toggleTaskStatus(this.getTargetTaskId(event));
    this.openTaskDescriptionWindow();
  }
  public toggleImportant = (event: any) => {
    this.props.toggleTaskImportant(this.getTargetTaskId(event));
    this.openTaskDescriptionWindow();
  }
  public toggleCurrentTaskStatus = () => {
    this.props.toggleTaskStatus(this.state.activeTaskIndex);
  }
  public toggleCurrentTaskImportant = () => {
    this.props.toggleTaskImportant(this.state.activeTaskIndex);
  }
  public updateDueDate = (inputDate: Date) => {
    this.props.updateDueDate(this.state.activeTaskIndex, inputDate);
  }
  public updateReminder = (inputDate: Date) => {
    this.props.updateReminder(this.state.activeTaskIndex, inputDate);
  }
  public updateRepeat = (inputValue: string) => {
    this.props.updateRepeat(this.state.activeTaskIndex, inputValue);
  }
  public updateNote = (inputValue: string) => {
    this.props.updateNote(this.state.activeTaskIndex, inputValue);
  }
  public getTargetTaskId(event: any): number {
    if (event.target.classList.contains("task")) {
      return parseInt((event.target.id).split("task")[1], 10);
    } else {
      return parseInt((event.target.parentElement.id).split("task")[1], 10);
    }
  }
  public openTaskDescriptionWindow = () => {
    this.setState({
      isDescriptionExpanded: true
    })
  }
  public closeTaskDescriptionWindow = () => {
    this.setState({
      isDescriptionExpanded: false
    })
  }
  public handleOnClickTask = (event: any) => {
    const taskElementId = this.getTargetTaskId(event);
    Store.setActiveTask(taskElementId);
    this.openTaskDescriptionWindow();
    this.setState(
      {
        activeTaskIndex: taskElementId,
      }
    );
  }
  public handleInputOnChange = (element: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      taskInputValue: element.currentTarget.value
    })
  }
  public addNewTask = () => {
    if (this.props.listId === -1) {
      alert ("Select a list to add Tasks! :)");
      return;
    }
    const inputText = this.state.taskInputValue;
    Store.addNewTask(this.props.listId, inputText);
    this.props.updateNumberOfTasks(this.props.listId);
    if (inputText !== "") {
      this.setState({
        taskInputValue: ""
      });
    }
  }
  
  public render() {
    const { isDescriptionExpanded, taskInputValue } = this.state;
    const { listName, tasks, deleteCurrentList, renameList } = this.props;
    return (
      <div className="todo todo-full-width show-todo">
        <div className={`task-content ${isDescriptionExpanded ? "" : " task-content-full-width"}`}>
          <div className="heading">
            <div className="heading-left m-r-10 p-l-10">
              <input className="list-rename-input" size={20} maxLength={20} value={listName}
                onChange={renameList} />
            </div>
            <div className="heading-right">
              <i className="fa fa-trash-o delete-list-icon" onClick={deleteCurrentList} />
              <button className="sort-button">
                <i className="fa fa-exchange fa-rotate-90" />Sort
          </button>
            </div>
          </div>
          <ul className="tasks m-y-auto">
            <Tasks tasks={tasks} handleOnClickTask={this.handleOnClickTask} toggleStatus={this.toggleStatus}
              toggleImportant={this.toggleImportant} />
            <li className="task add-task-li">
              <i className="fa fa-plus plus-icon" onClick={this.addNewTask} />
              <input maxLength={255} className="add-input m-y-auto" placeholder="Add a task"
                value={taskInputValue} onChange={this.handleInputOnChange} />
              <button className="add-button">Add</button>
            </li>
          </ul>
        </div>
        <TaskDescription task={this.state.activeTaskIndex !== -1 ? Store.getTaskById(this.props.listId, this.state.activeTaskIndex)
          : new Task(0, "", false, "", new Date(), undefined, undefined, false, false, "")} renameTask={this.renameTask}
          toggleStatus={this.toggleCurrentTaskStatus} toggleImportant={this.toggleCurrentTaskImportant}
          addToDay={this.addToDay} updateDueDate={this.updateDueDate} updateNote={this.updateNote}
          updateReminder={this.updateReminder} updateRepeat={this.updateRepeat}
          isDescriptionExpanded={isDescriptionExpanded}
          closeTaskDescriptionWindow={this.closeTaskDescriptionWindow}
          deleteCurrentTask={this.deleteCurrentTask} />
      </div>
    );
  }
}
export default ToDo;