import * as React from 'react';

import Task from '../model/Task';

class TaskDescription extends React.Component<{
  task: Task, renameTask: (taskInput: string) => void,
  toggleStatus: (event: any) => void, toggleImportant: (event: any) => void, addToDay: () => void
  , updateReminder: (inputDate: Date | null) => void, updateDueDate: (inputDate: Date | null) => void,
  updateRepeat: (inputValue: string) => void, updateNote: (inputValue: string) => void,
  isDescriptionExpanded: boolean, closeTaskDescriptionWindow: () => void
  , deleteCurrentTask: () => void
}
  , { taskInputValue: string, noteLetterCount: number }> {

  constructor(props: any) {
    super(props);
    this.state = {
      noteLetterCount: 150,
      taskInputValue: "",
    };
  }

  public renameTask = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const taskInput = event.currentTarget.value;
    this.setState({
      taskInputValue: taskInput
    })
    this.props.renameTask(taskInput);
  }
  public updateDueDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value !== "") {
      this.props.updateDueDate(new Date(event.currentTarget.value));
    } else {
      this.props.updateDueDate(null);
    }
  }
  public updateReminder = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value !== "") {
      this.props.updateReminder(new Date(event.currentTarget.value));
    } else {
      this.props.updateReminder(null);
    }
  }
  public updateRepeat = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.updateRepeat(event.currentTarget.value);
  }
  public updateNote = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.props.updateNote(event.currentTarget.value);
    this.setState({
      noteLetterCount: 150 - this.props.task.getNote().length
    });
  }
  public convertDateFormat = (inputDate: Date) => {
    if (inputDate != null) {
      let day = inputDate.getDate().toString();
      day = day.length === 1 && day !== "0" ? 0 + day : day;
      let month = (inputDate.getMonth() + 1).toString();
      month = month.length === 1 && month !== "0" ? 0 + month : month;
      const year = inputDate.getFullYear().toString();
      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
    } else {
      return "";
    }
  }
  public render() {
    const { noteLetterCount } = this.state;
    const { addToDay, deleteCurrentTask, closeTaskDescriptionWindow, isDescriptionExpanded, task, toggleImportant, toggleStatus } = this.props;
    return (
      <div className={`task-description${isDescriptionExpanded ? " desc-open" : ""}`}>
        <div className="card task-details">
          <i className={"task-status" + (task.isCompleted() ? " fa fa-check-circle" : " fa fa-circle-thin")} onClick={toggleStatus} />
          <textarea className="task-text" value={task.getName()} onChange={this.renameTask} maxLength={70}/>
          <i className={"task-important" + (task.isImportant() ? " fa fa-star" : " fa fa-star-o")} onClick={toggleImportant} />
        </div>
        <div className="card add-to-day">
          <button onClick={addToDay}>
            <i className="fa fa-sun-o" />
            <p className="m-l-20 add-to-day-button"> {task.isAddedToDay() ?
              "Added To Day " + this.convertDateFormat(new Date()) : "Add To Day"}</p>
          </button>
        </div>
        <div className="card settings">
          <div className="add-reminder-date">
            <i className="fa fa-clock-o" />
            <p className="m-l-20">Remind Me</p>
            <input value={task.getReminderDate() === undefined ?
              " " : this.convertDateFormat(task.getReminderDate()!)}
              type="date" id="reminder-date-picker" className="reminder-date-picker" onChange={this.updateReminder} />
          </div>
          <div className="add-due-date">
            <i className="fa fa-calendar" />
            <p className="m-l-20">Add due date</p>
            <input value={!task.getDueDate() ? " " : this.convertDateFormat(task.getDueDate()!)}
              type="date" id="due-date-picker" className="due-date-picker" onChange={this.updateDueDate} />
          </div>
          <div className="add-repeat">
            <i className="fa fa-repeat" />
            <p className="m-l-20">Repeat</p>
            <select value={task.getRepeat()} onChange={this.updateRepeat} className="repeat-selection">
              <option value="">None</option>
              <option value="Daily">Daily</option>
              <option value="Every Week">Every Week</option>
              <option value="Every Month">Every Month</option>
              <option value="Every Year">Every Year</option>
            </select>
          </div>
        </div>
        <div className="letter-count">{noteLetterCount} characters remaining</div>
        <textarea value={task.getNote()} className="note-card" placeholder="Add a note" maxLength={150}
          onChange={this.updateNote} />
        <div className="bottom-settings">
          <button className="toggle-slider"><i className="fa fa-arrow-right" onClick={closeTaskDescriptionWindow} />
          </button>
          <p>Created On {this.convertDateFormat(task.getCreatedDate())}</p>
          <button className="delete-task"><i className="fa fa-trash-o" onClick={deleteCurrentTask} />
          </button>
        </div>
      </div>
    );
  }
}
export default TaskDescription;
