import * as React from 'react';
import TaskDescription from './TaskDescription';


class ToDo extends React.Component {
  public render() {
    return (
      <div className="todo todo-full-width show-todo">
      <div className="task-content">
        <div className="heading">
          <div className="heading-left m-r-10 p-l-10">
            <input className="list-rename-input" size={20} maxLength={20}/>
          </div>
          <div className="heading-right">
            <i className="fa fa-trash-o delete-list-icon"/>
            <button className="sort-button">
            <i className="fa fa-exchange fa-rotate-90"/>Sort
          </button>
          </div>
        </div>
        <ul className="tasks m-y-auto"><li className="task add-task-li"><i className="fa fa-plus plus-icon"/><input maxLength={255} className="add-input m-y-auto" placeholder="Add a task"/><button className="add-button">Add</button></li></ul>
        </div>
        <TaskDescription/>
      </div>
    );
  }
}
export default ToDo;
